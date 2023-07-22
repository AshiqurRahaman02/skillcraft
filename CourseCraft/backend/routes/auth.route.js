const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt"); 
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRouter = express.Router();

var userDetails;

// github API endpoint

// const github_client_id = process.env.github_client_id;
// const github_clint_secret = process.env.github_client_secret;

const client_id = "e969e0187a8b8ce20b01";
const clint_secret = "a309e562fad6aec85d60784c224e7e0159109741";

authRouter.get("/github", async (req, res) => {
	const { code } = req.query;
	console.log(code);
	const accessToken = await fetch(
		"https://github.com/login/oauth/access_token",
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"content-type": "application/json",
			},
			body: JSON.stringify({
				client_id: client_id,
				client_secret: clint_secret,
				code: code,
			}),
		}
	).then((res) => res.json());
	console.log(accessToken);

	const user = await fetch("https://api.github.com/user", { 
		method: "GET",
		headers: {
			Authorization: "Bearer " + accessToken.access_token,
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));

	console.log(user);
    userDetails = user

	res.send("Sign in with github successfully");
});

// google API endpoint




const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const GOOGLE_CLIENT_ID =
	"608771081220-on5gm9g8uhhek2ednjcnieqvcl5iif98.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:8080/auth/google/callback",
			passReqToCallback: true,
		},
		async function (request, accessToken, refreshToken, profile, done) {
            userDetails = profile

            let email = profile._json.email;
            let name = profile._json.name;
            let password = profile._json.given_name
            let user = await UserModel.findOne({ email });
            if(!user){
                bcrypt.hash(password, 5, async (err, hash) => {
                    const user = new UserModel({ email, password: hash, name });
                    console.log(user);
                    await user.save();
                });
            }
            return done(null, profile);
		}
	)
);

authRouter.get(
	"/google",
	passport.authenticate("google", { scope: ["email", "profile"] })
);

authRouter.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "/auth/google/success",
		failureRedirect: "/auth/google/failure",
        session: false
	}),
    function (req,res){
        console.log(req.user)
        res.redirect("/")
    }
);
authRouter.get('/google/success', (req, res) => {
    res.send(userDetails)
  }) 
  authRouter.get('/profile', (req, res) => res.send(userProfile));





module.exports = {
	authRouter,
};