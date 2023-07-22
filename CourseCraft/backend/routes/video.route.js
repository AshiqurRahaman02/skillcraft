const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const VideoModel = require("../models/video.model");

const videoRouter = express.Router();

// post video

videoRouter.post("/upload/video", async (req, res) => {
	try {
		const { name, description, category, adminID, creatorName, email } =
			req.body;
		const { image, video } = req.files;

		const videoResult = await uploadVideoToCloudinary(video);
		const imageResult = await uploadImageToCloudinary(image);

		console.log(`Uploaded`);
		const adminObjectId = mongoose.Types.ObjectId.isValid(adminID)
			? new mongoose.Types.ObjectId(adminID)
			: null;

		console.log(adminObjectId);
		const newVideo = new VideoModel({
			name,
			videoURL: videoResult.url,
			thumbnailURL: imageResult.url,
			description,
			category,
			adminID: adminObjectId,
			creatorName,
		});

		console.log("newVideo");

		// Save the video object to the database
		const savedVideo = await newVideo.save();

		const utcTimestamp = videoResult.created_at;
		const istTime = convertUTCtoIST(utcTimestamp);

		const text = `Dear ${creatorName},

        Congratulations! Your video has been successfully uploaded to our platform. We're thrilled to have your valuable content on board.
        
        Video Details:
        Video Name: ${name}
        Category: ${category}
        Created At: ${istTime}

        Check your video: ${videoResult.url}
        
        Your video is now live and visible to our community. We believe your content will inspire, educate, and entertain our audience, and we can't wait to see the engagement it receives.
        
        If you have any questions or need any assistance with managing your videos or courses, feel free to reach out to our support team at support@skilcraft.com. We're here to help you make the most of your experience on our platform.
        
        Thank you for choosing our platform to share your expertise with the world. We value your contribution to our community and look forward to seeing more exciting content from you in the future.
        
        Keep up the great work!
        
        Best regards,
        The Skilcraft Team`;

		// Construct the email details
		let details = {
			from: "admin@skilcraft.com",
			to: email,
			subject: "Video uploaded successfully",
			text: text,
		};

		// Send the email
		const emailResponse = await sendEmail(details);
		console.log("Email sent:", emailResponse);

		res.status(201).json({
			isError: false,
			message: "Video uploaded successfully",
			video: savedVideo,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ isError: true, message: error.message });
	}
});
function uploadVideoToCloudinary(file) {
	return new Promise((resolve, reject) => {
		cloudinary.v2.uploader.upload(
			file.tempFilePath,
			{ resource_type: "video" },
			(error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			}
		);
	});
}
function uploadImageToCloudinary(file) {
	return new Promise((resolve, reject) => {
		cloudinary.v2.uploader.upload(file.tempFilePath, (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
}
async function sendEmail(details) {
	const response = await fetch(
		"https://tiny-lime-jay-coat.cyclic.app/send-email",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(details),
		}
	);

	const data = await response.json();
	return data;
}
function convertUTCtoIST(timestamp) {
	const dateObj = new Date(timestamp);

	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, "0");
	const day = String(dateObj.getDate()).padStart(2, "0");
	let hours = dateObj.getHours();
	const minutes = String(dateObj.getMinutes()).padStart(2, "0");
	const seconds = String(dateObj.getSeconds()).padStart(2, "0");
	let amOrPm = "AM";

	if (hours >= 12) {
		amOrPm = "PM";
		hours %= 12;
	}

	hours = String(hours).padStart(2, "0");

	const istTimestamp = `Time: ${hours}:${minutes}:${seconds} ${amOrPm}\nDate: ${day}-${month}-${year}`;
	return istTimestamp;
}

// get single video
videoRouter.get("/get/video/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const video = await VideoModel.findById(id);

		res.status(200).json({ isError: false, video });
	} catch (error) {
		res.status(500).json({ isError: true, message: error.message });
	}
});

// get all videos
videoRouter.get("/get/video", async (req, res) => {
	try {
		const videos = await VideoModel.find({ courseID: null });

		res.status(200).json({ isError: false, videos });
	} catch (error) {
		res.status(500).json({ isError: true, message: error.message });
	}
});

// get all admin videos
videoRouter.get("/get/videos/:adminId", async (req, res) => {
	try {
		const { adminId } = req.params;
		const videos = await VideoModel.find({
			adminID: adminId,
			courseID: null,
		});

		res.status(200).json({ isError: false, videos });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			isError: true,
			message: "Error retrieving videos",
		});
	}
});

// get all coursesVideo
videoRouter.get("/get/coursesVideo/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const videos = await VideoModel.find({ courseID: id });

		res.status(200).json({ isError: false, videos });
	} catch (error) {
		res.status(500).json({ isError: true, message: error.message });
	}
});

// get by categories
videoRouter.get("/get/byCategories", async (req, res) => {
	const categories = req.query.categories;

	try {
		let videos;
		if (categories) {
			const categoryArray = categories.split(",");

			videos = await VideoModel.find({ category: { $in: categoryArray } });
		} else {
			videos = await VideoModel.find();
		}

		res.status(200).json({ isError: false, videos });
	} catch (error) {
		res.status(500).json({
			isError: true,
			message: "Error fetching videos",
			error: error.message,
		});
	}
});

// add coursesVideo
videoRouter.put("/update/video/:videoId", async (req, res) => {
	const videoId = req.params.videoId;
	const { courseID } = req.body;

	try {
		const updatedVideo = await VideoModel.findByIdAndUpdate(
			videoId,
			{ courseID: courseID ? mongoose.Types.ObjectId(courseID) : null },
			{ new: true }
		);

		if (!updatedVideo) {
			return res
				.status(404)
				.json({ isError: true, message: "Video not found" });
		}

		res.status(200).json({
			isError: false,
			video: updatedVideo,
			message: "Video added to Course",
		});
	} catch (error) {
		res.status(500).json({ isError: true, message: error.message });
	}
});

// add from courses
videoRouter.put("/removeCourse/:videoId", async (req, res) => {
	try {
		const { videoId } = req.params;

		const video = await VideoModel.findById(videoId);

		if (!video) {
			return res
				.status(404)
				.json({ isError: true, message: "Video not found" });
		}

		video.courseID = null;
		await video.save();

		res.status(200).json({
			isError: false,
			message: "CourseID updated to null for the video",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			isError: true,
			message: "Error updating courseID",
		});
	}
});

// update details
videoRouter.put("/update/details/:videoId", async (req, res) => {
	const videoId = req.params.videoId;
	const { name, description, category } = req.body;

	try {
		const updatedVideo = await VideoModel.findByIdAndUpdate(
			videoId,
			{
				name,
				description,
				category,
			},
			{ new: true }
		);

		if (!updatedVideo) {
			return res
				.status(404)
				.json({ isError: true, message: "Video not found" });
		}

		res.status(200).json({
			isError: false,
			message: "Video updated successfully",
			video: updatedVideo,
		});
	} catch (error) {
		res.status(500).json({ isError: true, message: error.message });
	}
});

// update like
videoRouter.put("/update/like/:videoId", async (req, res) => {
	const videoId = req.params.videoId;
	const { action } = req.body;

	try {
		const video = await VideoModel.findById(videoId);

		if (!video) {
			return res
				.status(404)
				.json({ isError: true, message: "Video not found" });
		}

		if (action === "increment") {
			video.likes++;
		} else if (action === "decrement") {
			video.likes--;
		} else {
			return res
				.status(400)
				.json({ isError: true, message: "Invalid action" });
		}

		const updatedVideo = await video.save();

		res.status(200).json({
			isError: false,
			message: "Likes updated successfully",
			video: updatedVideo,
		});
	} catch (error) {
		res.status(500).json({ isError: true, message: error.message });
	}
});

// post comment
videoRouter.put("/post/comment/:videoId", async (req, res) => {
	const videoId = req.params.videoId;
	const { comment } = req.body;

	try {
		const video = await VideoModel.findById(videoId);

		if (!video) {
			return res
				.status(404)
				.json({ isError: true, message: "Video not found" });
		}

		video.comments.push(comment);

		const updatedVideo = await video.save();

		res.status(201).json({
			isError: false,
			message: "Comment posted successfully",
			video: updatedVideo,
		});
	} catch (error) {
		res.status(500).json({ isError: true, message: error.message });
	}
});

// delete the video
videoRouter.delete("/delete/:videoId", async (req, res) => {
	const videoId = req.params.videoId;

	try {
		const deletedVideo = await VideoModel.findByIdAndDelete(videoId);

		if (!deletedVideo) {
			return res
				.status(404)
				.json({ isError: true, message: "Video not found" });
		}

		res.status(200).json({
			isError: false,
			message: "Video deleted successfully",
		});
	} catch (error) {
		res.status(500).json({ isError: true, message: error.message });
	}
});

module.exports = {
	videoRouter,
};
