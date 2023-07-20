// scripts for design
var x = document.getElementById("signin");
var y = document.getElementById("signup");
var z = document.getElementById("btn");
function signup() {
	x.style.left = "-400px";
	y.style.left = "50px";
	z.style.left = "110px";
}
function signin() {
	x.style.left = "50px";
	y.style.left = "450px";
	z.style.left = "0";
}

//for expressions
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
const onlyCharactersRegex = /^[a-zA-Z]+$/;
const lowerUpperAndNumberRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
const lowerUpperNumberSpecialRegex =
	/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=]).+$/;

// all inputs
const signinEmail = document.getElementById("signin-email");
const signinPassword = document.getElementById("signin-password");
const signupName = document.getElementById("signup-name");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");

let validSigninEmail = false;
let validSigninPassword = false;
let validSignupName = false;
let validSignupEmail = false;
let validSignupPassword = false;

// debounce function
function debounce(func, delay) {
	let timeoutId;

	return function (...args) {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
}

//checking email validity
const handlesigninEmail = () => {
	if (emailRegex.test(signinEmail.value)) {
		validSigninEmail = true;
		signinEmail.style.borderBottom = "3px solid green";
	} else {
		validSigninEmail = false;
		signinEmail.style.borderBottom = "3px solid red";
	}
};
signinEmail.addEventListener("input", debounce(handlesigninEmail, 1000));

const handlesignupEmail = () => {
	if (emailRegex.test(signupEmail.value)) {
		validSignupEmail = true;
		signupEmail.style.borderBottom = "3px solid green";
	} else {
		validSignupEmail = false;
		signupEmail.style.borderBottom = "3px solid red";
	}
};
signupEmail.addEventListener("input", debounce(handlesignupEmail, 1000));

// checking password validity
const handlesigninPassword = () => {
	let password = signinPassword.value;
	if (password.length >= 8) {
		if (lowerUpperNumberSpecialRegex.test(password)) {
			validSigninPassword = true;
			console.log("green");
			signinPassword.style.borderBottom = "3px solid green";
		} else if (lowerUpperAndNumberRegex.test(password)) {
			validSigninPassword = true;
			console.log("orange");
			signinPassword.style.borderBottom = "3px solid orange";
		} else if (onlyCharactersRegex.test(password)) {
			validSigninPassword = false;
			console.log("red");
			signinPassword.style.borderBottom = "3px solid red";
		}
	} else {
		validSigninPassword = false;
		signinPassword.style.borderBottom = "3px solid red";
	}
};
signinPassword.addEventListener("input", debounce(handlesigninPassword, 1000));

const handlesignupPassword = () => {
	let password = signupPassword.value;
	if (password.length >= 8) {
		if (lowerUpperNumberSpecialRegex.test(password)) {
			validSignupPassword = true;
			console.log("green");
			signupPassword.style.borderBottom = "3px solid green";
		} else if (lowerUpperAndNumberRegex.test(password)) {
			validSignupPassword = true;
			console.log("orange");
			signupPassword.style.borderBottom = "3px solid orange";
		} else if (onlyCharactersRegex.test(password)) {
			validSignupPassword = false;
			console.log("red");
			signupPassword.style.borderBottom = "3px solid red";
		}
	} else {
		validSignupPassword = false;
		signupPassword.style.borderBottom = "3px solid red";
	}
};
signupPassword.addEventListener("input", debounce(handlesignupPassword, 1000));

// checking name validity
const handlesignupName = () => {
	let name = signupName.value;
	if (name.length >= 5) {
		if (onlyCharactersRegex.test(name)) {
			validSignupName = true;
			signupName.style.borderBottom = "3px solid green";
		} else {
			validSignupName = false;
			signupName.style.borderBottom = "3px solid red";
		}
	} else {
		validSignupName = false;
		signupName.style.borderBottom = "3px solid red";
	}
};
signupName.addEventListener("input", debounce(handlesignupName, 1000));

// signup click handler
let signupBtn = document.getElementById("signup-btn");
signupBtn.addEventListener("click", (e) => {
	e.preventDefault();

	if (validSignupName && validSignupEmail && validSignupPassword) {
		popup.classList.add("openpopup");

		let otp = document.getElementById("otp");
		let otpNumber = Math.floor(1000 + Math.random() * 9000);
		let details = {
			from: "admin@skilcraft.com",
			to: signupEmail.value,
			subject: "Your OTP Verification Code",
			text: `Dear ${signupName.value}, 
			\n 
			\n 
			\n 
			Thank you for signing up with Skill Craft. To complete your registration, please enter the following OTP (One-Time Password) within the next 10 minutes: 
			\n 
			OTP: ${otpNumber} 
			\n 
			\n 
			\n 
			\n 
			Please do not share this OTP with anyone, as it is used for verification purposes only.`,
		};

		fetch("https://tiny-lime-jay-coat.cyclic.app/send-email", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(details),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
		otp.innerText = "Check your Email for OPT";
		// otp.innerText = otpNumber;

		let otpButton = document.getElementById("otpButton");
		otpButton.addEventListener("click", (e) => {
			let i1 = document.getElementById("otpInput1");
			let i2 = document.getElementById("otpInput2");
			let i3 = document.getElementById("otpInput3");
			let i4 = document.getElementById("otpInput4");

			let otpInput = i1.value + i2.value + i3.value + i4.value;

			if (otpInput == otpNumber) {
				popup.innerHTML = `
                    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><span>Loading</span></div>
                    `;
				signUpFunction();
			} else {
				document.querySelector("#otpInput>h3").innerHTML = "WRONG OPT";
				document.querySelector("#otpInput>h3").style.color = "red";
			}
		});
	} else {
		console.log(validSignupName, validSignupEmail, validSignupPassword);
		if (!validSignupName) {
			customAlert(
				false,
				"Please enter a valid name",
				"Name only contain Letter and at least five letter"
			);
		} else if (!validSignupEmail) {
			customAlert(false, "Please enter a valid email", "");
		} else {
			customAlert(
				false,
				"Please create a strong password",
				"Password should contain upper,lowercase and numbers"
			);
		}
	}
});

function signUpFunction() {
	let newUser = {
		email: signupEmail.value,
		password: signupPassword.value,
		name: signupName.value,
	};
	popup.innerHTML = `<h1>OTP VARIFICATION</h1>
	<h3>YOUR OTP IS:- <span id="otp">0000</span></h3>

	<div id="otpInput">
		<h3>Enter Your OTP</h3>
		<input type="number" id="otpInput1" maxlength="1"/>
		<input type="number" id="otpInput2" maxlength="1"/>
		<input type="number" id="otpInput3" maxlength="1"/>
		<input type="number" id="otpInput4" maxlength="1"/>
	</div>
	<button id="otpButton">Submit</button>`;
	popup.classList.remove("openpopup");

	fetch("http://localhost:8080/user/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newUser),
	})
		.then((res) => res.json())
		.then((res) => {
			if (!res.isError) {
				customAlert(true, `${res.message}`, "Please Login in our website");
			} else {
				customAlert(false, `${res.message}`, "Please Login in our website");
			}
		})
		.catch((err) => console.log(err));
}

// for signin function
let signinBtn = document.getElementById("signin-btn");
signinBtn.addEventListener("click", (e) => {
	e.preventDefault();

	if (validSigninEmail && validSigninPassword) {
		popup.classList.add("openpopup");

		let otp = document.getElementById("otp");
		let otpNumber = Math.floor(1000 + Math.random() * 9000);
		let details = {
			from: "admin@skilcraft.com",
			to: signupEmail.value,
			subject: "Your OTP Verification Code",
			text: `Dear ${signupName.value}, 
			\n 
			\n 
			\n 
			Thank you for signing up with Skill Craft. To complete your registration, please enter the following OTP (One-Time Password) within the next 10 minutes: 
			\n 
			OTP: ${otpNumber} 
			\n 
			\n 
			\n 
			\n 
			Please do not share this OTP with anyone, as it is used for verification purposes only.`,
		};

		fetch("https://tiny-lime-jay-coat.cyclic.app/send-email", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(details),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
		otp.innerText = "Check your Email for OPT";
		// otp.innerText = otpNumber;

		let otpButton = document.getElementById("otpButton");
		otpButton.addEventListener("click", (e) => {
			let i1 = document.getElementById("otpInput1");
			let i2 = document.getElementById("otpInput2");
			let i3 = document.getElementById("otpInput3");
			let i4 = document.getElementById("otpInput4");

			let otpInput = i1.value + i2.value + i3.value + i4.value;

			if (otpInput == otpNumber) {
				popup.innerHTML = `
                    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><span>Loading</span></div>
                    `;
				signInFunction();
			} else {
				document.querySelector("#otpInput>h3").innerHTML = "WRONG OPT";
				document.querySelector("#otpInput>h3").style.color = "red";
			}
		});
	} else {
		console.log(validSignupEmail, validSignupPassword);
		if (!validSigninEmail) {
			customAlert(false, "Please enter a valid email", "");
		} else {
			customAlert(
				false,
				"Please create a strong password",
				"Password should contain upper,lowercase and numbers"
			);
		}
	}
});

function signInFunction() {
	let user = {
		email: signinEmail.value,
		password: signinPassword.value,
	};

	fetch("http://localhost:8080/user/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((res) => res.json())
		.then((res) => {
			popup.innerHTML = `<h1>OTP VARIFICATION</h1>
	<h3>YOUR OTP IS:- <span id="otp">0000</span></h3>

	<div id="otpInput">
		<h3>Enter Your OTP</h3>
		<input type="number" id="otpInput1" maxlength="1"/>
		<input type="number" id="otpInput2" maxlength="1"/>
		<input type="number" id="otpInput3" maxlength="1"/>
		<input type="number" id="otpInput4" maxlength="1"/>
	</div>
	<button id="otpButton">Submit</button>`;
			popup.classList.remove("openpopup");
			if (!res.isError) {
				localStorage.setItem("token", res.token);
				let user = res.user;
				localStorage.setItem("userInfo", JSON.stringify(user));
				customAlert(
					true,
					`${res.message}`,
					"You will redirect to Home page in 3s"
				);
				setTimeout(function () {
					window.location.href = "../index.html";
				}, 3000);
			} else {
				customAlert(false, `${res.message}`, "");
			}
		})
		.catch((err) => {
			console.log(err);
			customAlert(false, `${err.message}`, "");
		});
}

// for forget password
function forgetPassword(e) {
	e.preventDefault();

	if (validSigninEmail) {
		popup.classList.add("openpopup");

		let otp = document.getElementById("otp");
		let otpNumber = Math.floor(1000 + Math.random() * 9000);
		let details = {
			from: "admin@skilcraft.com",
			to: signinEmail.value,
			subject: "Your OTP Verification Code",
			text: `Dear User, 
			\n 
			\n 
			\n 
			Thank you for signing up with Skill Craft. To complete your registration, please enter the following OTP (One-Time Password) within the next 10 minutes: 
			\n 
			OTP: ${otpNumber} 
			\n 
			\n 
			\n 
			\n 
			Please do not share this OTP with anyone, as it is used for verification purposes only.`,
		};

		fetch("https://tiny-lime-jay-coat.cyclic.app/send-email", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(details),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
		otp.innerText = "Check your Email for OPT";
		// otp.innerText = otpNumber;

		let otpButton = document.getElementById("otpButton");
		otpButton.addEventListener("click", (e) => {
			let i1 = document.getElementById("otpInput1");
			let i2 = document.getElementById("otpInput2");
			let i3 = document.getElementById("otpInput3");
			let i4 = document.getElementById("otpInput4");

			let otpInput = i1.value + i2.value + i3.value + i4.value;

			if (otpInput == otpNumber) {
				popup.innerHTML = `
                    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><span>Loading</span></div>
                    `;
				forgetPasswordFunction();
			} else {
				document.querySelector("#otpInput>h3").innerHTML = "WRONG OPT";
				document.querySelector("#otpInput>h3").style.color = "red";
			}
		});
	} else {
		console.log(validSignupEmail, validSignupPassword);
		if (!validSigninEmail) {
			customAlert(false, "Please enter a valid email", "");
		}
	}
}

function forgetPasswordFunction() {
	let user = {
		email: signinEmail.value,
	};

	fetch("http://localhost:8080/user/forgot_password", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((res) => res.json())
		.then((res) => {
			popup.innerHTML = `<h1>OTP VARIFICATION</h1>
	<h3>YOUR OTP IS:- <span id="otp">0000</span></h3>

	<div id="otpInput">
		<h3>Enter Your OTP</h3>
		<input type="number" id="otpInput1" maxlength="1"/>
		<input type="number" id="otpInput2" maxlength="1"/>
		<input type="number" id="otpInput3" maxlength="1"/>
		<input type="number" id="otpInput4" maxlength="1"/>
	</div>
	<button id="otpButton">Submit</button>`;
			popup.classList.remove("openpopup");
			if (!res.isError) {
				sendTempPassword(`${res.password}`, `${res.message}`);
			} else {
				customAlert(false, `${res.message}`, "");
			}
		})
		.catch((err) => {
			console.log(err);
			customAlert(false, `${err.message}`, "");
		});
}

function sendTempPassword(password, message) {
	let details = {
		from: "admin@skilcraft.com",
		to: signinEmail.value,
		subject: "Your OTP Verification Code",
		text: `Dear User, 
		\n 
		\n 
		\n 
		Thank you for signing up with Skil Craft. As part of our security measures, we have generated a temporary password for you. Please find your temporary password below:
		\n 
		Temporary Password: ${password} 
		\n 
		\n 
		\n 
		\n 
		Please remember that this temporary password is valid for a limited time only. We recommend logging in and changing your password as soon as possible.`,
	};

	fetch("https://tiny-lime-jay-coat.cyclic.app/send-email", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(details),
	})
		.then((res) => res.json())
		.then((data) => {
			customAlert(
				true,
				`${message}`,
				`Your Temporary Password sent successfully to your email address`
			);
		})
		.catch((err) => {
			console.log(err);
		});
}

//custom alert function
const button = document.querySelector("button"),
	toast = document.querySelector(".toast");
(closeIcon = document.querySelector(".close")),
	(progress = document.querySelector(".progress"));

let timer1, timer2;

function customAlert(type, message1, message2) {
	let icon = document.querySelector("#icon");
	if (type) {
		icon.innerHTML = `<i class="fas fa-solid fa-check check"></i>`;
	} else {
		icon.innerHTML = `<i class="fa-solid fa-x uncheck"></i>`;
	}
	document.querySelector(".text-1").innerHTML = `${message1}`;
	document.querySelector(".text-2").innerHTML = `${message2}`;
	toast.style.visibility = "visible";
	toast.classList.add("active");
	progress.classList.add("active");

	timer1 = setTimeout(() => {
		toast.classList.remove("active");
	}, 5000); //1s = 1000 milliseconds

	timer2 = setTimeout(() => {
		progress.classList.remove("active");
	}, 5300);
}

closeIcon.addEventListener("click", () => {
	toast.classList.remove("active");

	setTimeout(() => {
		progress.classList.remove("active");
	}, 300);

	clearTimeout(timer1);
	clearTimeout(timer2);
});

// for otp input
const otpInputs = document.querySelectorAll("#otpInput input");
otpInputs.forEach((input, index) => {
	input.addEventListener("input", (event) => {
		const currentInput = event.target;
		const maxLength = parseInt(currentInput.getAttribute("maxlength"), 10);

		if (currentInput.value.length >= maxLength) {
			if (index < otpInputs.length - 1) {
				otpInputs[index + 1].focus();
			}
		}
	});

	input.addEventListener("keydown", (event) => {
		if (event.key === "Backspace" && input.value.length === 0 && index > 0) {
			otpInputs[index - 1].focus();
		}
	});
});

//for showing passwords and hiding passwords
const showPassword = document.querySelector("#eye>ion-icon:nth-child(2)");
const hidePassword = document.querySelector("#eye>ion-icon:nth-child(1)");

showPassword.addEventListener("click", function () {
	document.querySelector("#signin-password").setAttribute("type", "text");

	showPassword.style.display = "none";
	hidePassword.style.display = "block";
});
hidePassword.addEventListener("click", function () {
	document.querySelector("#signin-password").setAttribute("type", "password");

	showPassword.style.display = "block";
	hidePassword.style.display = "none";
});

const show = document.querySelector("#show");
const hide = document.querySelector("#hide");

show.addEventListener("click", function () {
	document.querySelector("#signup-password").setAttribute("type", "text");

	show.style.display = "none";
	hide.style.display = "block";
});
hide.addEventListener("click", function () {
	document.querySelector("#signup-password").setAttribute("type", "password");

	show.style.display = "block";
	hide.style.display = "none";
});
