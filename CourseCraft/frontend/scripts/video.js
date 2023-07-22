var video = {
	adminID: "64b8cfc31a909908e2165c79",
	category: "CSS",
	comments: [],
	courseID: null,
	creatorName: "Ashik ",
	description: "Start learning Css",
	likes: 0,
	name: "Learn Css ",
	thumbnailURL:
		"http://res.cloudinary.com/dpeycb3s4/image/upload/v1689996671/r6ulmv3bpdsmehfkr5aa.jpg",
	videoURL:
		"http://res.cloudinary.com/dpeycb3s4/video/upload/v1689996668/t7i1p8ue06l42vnvxdfr.mp4",
	__v: 0,
	_id: "64bb4d7c68c5abe7bbf2f569",
};

const commentsArray = [
	{ user: "Ashik", comment: "This is a good video!" },
	{ user: "Alice Smith", comment: "Great content! Keep it up!" },
	{ user: "Bob Johnson", comment: "I learned a lot from this video." },
	{ user: "Emily Brown", comment: "Amazing tutorial, thank you!" },
	{ user: "Michael Lee", comment: "This is exactly what I needed." },
	{ user: "Sophia Wang", comment: "I love your videos!" },
	{ user: "David Kim", comment: "You explain things so well." },
	{ user: "Olivia Chen", comment: "This helped me a lot." },
	{ user: "William Liu", comment: "Very clear and concise." },
	{ user: "Ava Gupta", comment: "You're doing a great job!" },
	{ user: "James Patel", comment: "I can't wait for the next one." },
	{ user: "Emma Nguyen", comment: "I've been looking for this information." },
	{ user: "Noah Wilson", comment: "Thanks for sharing your knowledge." },
	{ user: "Isabella Miller", comment: "This is so helpful, thanks!" },
	{ user: "Ethan Anderson", comment: "You're an awesome teacher!" },
];

function shuffleArray(arr) {
	const shuffledArray = [...arr];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [
			shuffledArray[j],
			shuffledArray[i],
		];
	}
	return shuffledArray;
}

const userDetails = JSON.parse(localStorage.getItem("userInfo")) || null;

if (userDetails) {
	document.getElementById("userName").innerText =
		userDetails.name[0].toUpperCase() +
		userDetails.name.split("").splice(1).join("");
}

const redirect = () => {
	if (userDetails) {
		window.location.href = "../pages/account.html";
	} else {
		window.location.href = "../pages/signin.html";
	}
};

const bottomNavDiv = document.querySelector("#bottomNav>div");

const shearchBtn = document.querySelector("#topNav>div:nth-child(3)>button");
shearchBtn.addEventListener("click", () => {
	bottomNavDiv.innerHTML = `
                                <ion-icon name="search-outline"></ion-icon>
                                <input type="search" placeholder="What do you want to learn?" />
                                
                            `;
	document.querySelector("#bottomNav").style.display = "block";
});

const hideBottomNav = () => {
	document.querySelector("#bottomNav").style.display = "none";
};

const showSkills = () => {
	bottomNavDiv.innerHTML = `
                                <a href="../pages/skills.html?cat=JAVASCRIPT"><img src="../images/javascript.svg" alt=""><span>JAVASCRIPT</span></a>
                                <a href="../pages/skills.html?cat=NODE.JS"><img src="../images/nodejs.svg" alt=""><span>NODE.JS</span></a>
                                <a href="../pages/skills.html?cat=PYTHON"><img src="../images/python-5.svg" alt=""><span>PYTHON</span></a>
                                <a href="../pages/skills.html?cat=REACT"><img src="../images/react-1.svg" alt=""><span>REACT</span></a>
                                <a href="../pages/skills.html?cat=AWS"><img src="../images/aws-2.svg" alt="" id="aws"><span>AWS</span></a>
                                <a href="../pages/skills.html?cat=C++"><img src="../images/c.svg" alt=""><span>C++</span></a>
                                <a href="../pages/skills.html?cat=HTML"><img src="../images/html-1.svg" alt="" id="aws"><span>HTML</span></a>
                                <a href="../pages/skills.html?cat=CSS"><img src="../images/css-3.svg" alt=""><span>CSS</span></a>
                                <a href="../pages/skills.html?cat=Tailwind CSS"><img src="../images/tailwind-css-2.svg" alt="" id="aws"><span> Tailwind CSS</span></a>
                                <a href="../pages/skills.html"><span>SEE MORE</span><ion-icon name="arrow-forward-outline"></ion-icon></a>
                            `;
	document.querySelector("#bottomNav").style.display = "block";
};
const showCourses = () => {
	bottomNavDiv.innerHTML = `
                                <a href=""><img src="../images/web.svg" alt=""><span>WEB DEVELOPMENT</span></a>
                                <a href=""><img src="../images/photoshop.svg" alt=""><span>PHOTOSHOP CC</span></a>
                                <a href=""><img src="../images/ai.svg" alt=""><span>AI DEVELOPMENT</span></a>
                                <a href=""><img src="../images/tailwind-css-2.svg" alt="" id="aws"><span> Tailwind CSS</span></a>
                                <a href=""><span>SEE MORE</span><ion-icon name="arrow-forward-outline"></ion-icon></a>
                            `;
	document.querySelector("#bottomNav").style.display = "block";
};
const showPlans = () => {
	bottomNavDiv.innerHTML = `
                                <h1>
                                    <span>BASIC PLAN : $100/ MONTH</span>
                                    <span>STANDARD PLAN : $1000/ YEAR</span>
                                    <span>1 MONTH FREE TRAIL</span>
                                </h1>
                            `;
	document.querySelector("#bottomNav").style.display = "block";
};

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id") || 1;
getVideo(id);

// getVideo("64bb930940206df54cf027af")
function getVideo(id) {
	const url = `http://localhost:8080/video/get/video/${id}`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			video = data.video;
			displayVideo(video);
		})
		.catch((error) => {
			console.error("Error fetching videos:", error);
		});
}

// displayVideo(video)
function displayVideo(video) {
	document.querySelector("video").src = video.videoURL;
	document.querySelector(".category").innerHTML = video.category;
	document.querySelector(".creatorName").innerHTML = video.creatorName;
	document.querySelector(".about").innerHTML = video.description;
	document.querySelector(".title").innerHTML = video.name;
	document.querySelector(".likes").innerHTML = video.likes;
	document.querySelector(".comment").innerHTML = video.comments.length;

	let comments = shuffleArray(commentsArray);

	displayComments(comments);
	getRelatableVideo(video.category);
}

function getRelatableVideo(skill) {
	const url = `http://localhost:8080/video/get/byCategories?categories=${skill}`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			displayRelatableVideo(data.videos);
		})
		.catch((error) => {
			console.error("Error fetching videos:", error);
		});
}

function displayRelatableVideo(data) {
	let html = ``;

	data.forEach((ele) => {
		let title = ele.name;
		let maxLength = 35;
		if (title.length > maxLength) {
			title = title.substring(0, maxLength) + "...";
		}
		if (ele._id !== video._id) {
			html += `<div onclick="openVideo('${ele._id}')">
                    <img src="${ele.thumbnailURL}" alt="">
                    <div>
                        <h3>${title}</h3>
						<p>By <span>${ele.creatorName}</span></p>
                        <p>Likes <span>${ele.likes}</span></p>
                    </div>
                </div>
            `;
		}
	});
	if (html.length == 0) {
		html += "No Relatable Videos Available";
	}

	document.querySelector("#relatable>div").innerHTML = html;
}

function displayComments(comments) {
	let html = ``;

	comments.forEach((comment) => {
		html += `<h3 style="margin-bottom: 0px;">${comment.comment}</h3><span>by ${comment.user}</span>`;
	});
	if (html.length == 0) {
		html += "No Relatable Videos Available";
	}

	document.querySelector(".comment").innerHTML = comments.length;
	document.querySelector("#comment").innerHTML = html;
}

function openVideo(id) {
	let url = "../pages/video.html?id=" + id;
	window.location.href = url;
}

function shareVideo() {
	document.getElementById("share").style.display = "none";
	document.getElementById("copy").style.display = "block";
}

function copyLink() {
	let link = window.location.href;

	navigator.clipboard.writeText(link).then(
		function () {
			confirm("Link copied");
		},
		function () {
			confirm("Failed to copy link");
		}
	);
}

function addComment() {
	let comment = document.querySelector("#commentInput").value;
	if (comment.length > 0) {
		let com = {
			user: userName,
			comment: comment,
		};

		commentsArray.push(com);

		let totalComments = document.querySelector(".comment").innerText;
		document.querySelector(".comment").innerHTML = ++totalComments;
		confirm("Comment added");
	} else {
		confirm("Please enter a comment");
	}
}
