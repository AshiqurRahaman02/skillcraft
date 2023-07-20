const express = require("express");
const VideoModel = require("../models/video");

const videoRouter = express.Router();

videoRouter.post("/upload/video", async (req, res) => {
	const {
		name,
		videoURL,
		thumbnailURL,
		description,
		category,
		adminID,
		creatorName,
		courseID,
	} = req.body;

	try {
		// Create a new video object using the videoSchema
		const video = new VideoModel({
			name,
			videoURL,
			thumbnailURL,
			description,
			category,
			adminID: mongoose.Types.ObjectId(adminID), // Convert the string adminID to a valid ObjectId
			creatorName,
			courseID: courseID ? mongoose.Types.ObjectId(courseID) : null, // Convert the string courseID to a valid ObjectId or set to null if not provided
		});

		// Save the video object to the database
		const savedVideo = await video.save();

		res.status(201).json({
			isError: false,
			message: "Video uploaded successfully",
			video: savedVideo,
		});
	} catch (error) {
		res.status(500).json({ isError: true, message: error.message });
	}
});

module.exports = {
	userRouter,
};
