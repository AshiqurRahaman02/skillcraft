const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRouter = express.Router();

//register route
userRouter.post("/register", async (req, res) => {
	const { email, password, name } = req.body;
	try {
		bcrypt.hash(password, 5, async (err, hash) => {
			if (err) throw err;
			const user = new UserModel({ email, password: hash, name });
			console.log(user);
			await user.save();
			res.status(201).send({ message: "User registered successfully" });
		});
	} catch (error) {
		res.status(404).send({ message: error.message });
	}
});

//login route
userRouter.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		let user = await UserModel.findOne({ email });
		bcrypt.compare(password, user.password, (err, result) => {
			if (result) {
				res.status(200).send({
					message: "Welcome Back to our website",
					token: jwt.sign(
						{ userId: user._id },
						process.env.jwt_secret_key
					),
					user,
				});
			}else{
                res.status(401).send({ message: "Invalid password" });
            }
		});
	} catch (error) {
		console.log(error);
		res.status(404).send({ message: error.message });
	}
});

// Change password route
userRouter.post("/change_password", async (req, res) => {
	const { email, oldPassword, newPassword } = req.body;
	try {
		let user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(404).send({ message: "User not found" });
		}

		bcrypt.compare(oldPassword, user.password, async (err, result) => {
			if (result) {
				const hashedNewPassword = await bcrypt.hash(newPassword, 5);
				user.password = hashedNewPassword;
				await user.save();
				res.status(200).send({ message: "Password updated successfully" });
			} else {
				res.status(401).send({ message: "Invalid old password" });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal server error" });
	}
});

// Forgot password route
userRouter.post("/forgot_password", async (req, res) => {
	const { email } = req.body;
	try {
		let user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(404).send({ message: "User not found" });
		}

		const temporaryPassword = Math.random().toString(36).slice(-8);

		const hashedTemporaryPassword = await bcrypt.hash(temporaryPassword, 10);
		user.password = hashedTemporaryPassword;
		await user.save();


		// res.status(200).send({
		// 	message: "Temporary password sent to your email",
		// });
        res.status(200).send({
			message: "Your password has been changed successfully",
            password: temporaryPassword
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal server error" });
	}
});

//delete route
userRouter.delete("/delete/:id", async (req, res) => {
	try {
		const user = await UserModel.findByIdAndDelete(req.params.id);
		res.status(200).send({ message: "User deleted successfully" });
	} catch (error) {
		res.status(404).send({ message: error.message });
	}
});

module.exports = {
	userRouter,
};
