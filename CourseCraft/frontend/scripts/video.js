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
                                <a href=""><img src="../images/javascript.svg" alt=""><span>JAVASCRIPT</span></a>
                                <a href=""><img src="../images/nodejs.svg" alt=""><span>NODE.JS</span></a>
                                <a href=""><img src="../images/python-5.svg" alt=""><span>PYTHON</span></a>
                                <a href=""><img src="../images/react-1.svg" alt=""><span>REACT</span></a>
                                <a href=""><img src="../images/aws-2.svg" alt="" id="aws"><span>AWS</span></a>
                                <a href=""><img src="../images/c.svg" alt=""><span>C++</span></a>
                                <a href=""><img src="../images/html-1.svg" alt="" id="aws"><span>HTML</span></a>
                                <a href=""><img src="../images/css-3.svg" alt=""><span>CSS</span></a>
                                <a href=""><img src="../images/tailwind-css-2.svg" alt="" id="aws"><span> Tailwind CSS</span></a>
                                <a href=""><span>SEE MORE</span><ion-icon name="arrow-forward-outline"></ion-icon></a>
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
		if (ele._id !== video._id) {
			html += `<div onclick="openVideo('${ele._id}')">
                    <img src="${ele.thumbnailURL}" alt="">
                    <div>
                        <h3>${ele.name}</h3>
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

function openVideo(id) {
	let url = "../pages/video.html?id=" + id;
	window.location.href = url;
}
