const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const CourseModel = require("../models/course.model");
const VideoModel = require("../models/video.model");

const courseRouter = express.Router();

// Create a new Course
courseRouter.post("/create/course", async (req, res) => {
	try {
		const { name, description, price, category, adminID, creatorName } =
			req.body;
		const { image } = req.files;

		const imageResult = await uploadImageToCloudinary(image);

		console.log(`Uploaded`);
		const adminObjectId = mongoose.Types.ObjectId.isValid(adminID)
			? new mongoose.Types.ObjectId(adminID)
			: null;

		console.log(adminObjectId);
		const newCourse = new CourseModel({
			name,
			thumbnailURL: imageResult.url,
			price,
			description,
			category,
			adminID: adminObjectId,
			creatorName,
		});

		console.log("newVideo");

		// Save the video object to the database
		const savedCourse = await newCourse.save();

		res.status(201).json({
			isError: false,
			message: "Course created successfully",
			video: savedCourse,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ isError: true, message: error.message });
	}
});
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

// update the course
courseRouter.put("/update/:courseId", async (req, res) => {
	try {
		const { courseId } = req.params;
		const { name, description, category, price } = req.body;

		const updatedCourse = await CourseModel.findByIdAndUpdate(
			courseId,
			{ name, description, category, price },
			{ new: true }
		);

		if (!updatedCourse) {
			return res
				.status(404)
				.json({ isError: true, message: "Course not found" });
		}

		res.status(200).json({
			isError: false,
			message: "Course updated successfully",
			updatedCourse,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ isError: true, message: "Error updating course" });
	}
});

// delete the course
courseRouter.delete("/courses/:courseId", async (req, res) => {
	try {
	  const { courseId } = req.params;
  
	  const deletedCourse = await CourseModel.findByIdAndDelete(courseId);
  
	  if (!deletedCourse) {
		return res.status(404).json({ isError: true, message: "Course not found" });
	  }
  
	  // Find all videos associated with the deleted course and set their courseID to null
	  await VideoModel.updateMany({ courseID: courseId }, { $set: { courseID: null } });
  
	  res.status(200).json({ isError: false, message: "Course deleted successfully" });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ isError: true, message: "Error deleting course" });
	}
  });
  

module.exports = {
	courseRouter,
};
