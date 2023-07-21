// ..................................... SCRIPT ...................................... //

if (!userDetails) {
	window.location.href = "../pages/signin.html";
}
const userID = userDetails._id;
const email = userDetails.email;
const name = userDetails.name;

var activeSection = "account";

function displayAccount() {
	if (activeSection !== "account") {
		hideAllDivs();
		document.getElementById("account").style.display = "block";
		activeSection = "account";
		markActiveDiv(event.target);
	}
}

function displayVideos() {
	if (activeSection !== "videos") {
		hideAllDivs();
		document.getElementById("videos").style.display = "block";
		activeSection = "videos";
		markActiveDiv(event.target);
	}

	// get user video
	fetch(`http://localhost:8080/video/get/videos/${userID}`)
		.then((response) => response.json())
		.then((data) => {
			displayAllVideos(data.videos);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}
function displayAllVideos(data) {
  console.log(data);
	let html = "";

	data.forEach((video) => {
		html += `
              <div class="video_box">
                <div class="video_thumbnail">
                  <img src="${video.thumbnailURL}" alt="" />
                </div>
                <div class="video_nameAndbtn">
                  <div>
                    <h2 class="titleName">
                      Title:<span>${video.name}</span>
                    </h2>
                    <p class="totalLikes">Likes: <span>${video.likes}</span></p>
                    <p class="totalComments">
                      Total Comments: <span>${video.comments.length}</span>
                    </p>
                  </div>
                  <div>
                    <button class="my-button" onclick="updateVideo(${video._id})">Edit</button>
                    <br />
                    <button class="my-button" onclick="deleteVideo(${video._id})">Delete</button>
                  </div>
                </div>
              </div>
            `;
	});

  document.getElementById("parent").innerHTML = html
}

function displaySubscribers() {
	if (activeSection !== "subscribe") {
		hideAllDivs();
		document.getElementById("subscribe").style.display = "block";
		activeSection = "subscribe";
		markActiveDiv(event.target);
	}
}

function displayPlans() {
	if (activeSection !== "plans") {
		hideAllDivs();
		document.getElementById("plans").style.display = "block";
		activeSection = "plans";
		markActiveDiv(event.target);
	}
}

function displayNotifications() {
	if (activeSection !== "notifications") {
		hideAllDivs();
		document.getElementById("notifications").style.display = "block";
		activeSection = "notifications";
		markActiveDiv(event.target);
	}
}

function hideAllDivs() {
	var divs = document.querySelectorAll("#section_2 > div");
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.display = "none";
	}
}

function markActiveDiv(target) {
	var divs = document.querySelectorAll(".profile_details_div");
	for (var i = 0; i < divs.length; i++) {
		divs[i].classList.remove("active");
	}
	target.classList.add("active");
}

displayAccount();

var image = null;
var video = null;

function handleImageChange(event) {
	const file = event.target.files?.[0];
	if (file) {
		console.log(file);
		const reader = new FileReader();
		reader.onloadend = () => {
			image = reader.result;
			document.querySelector("#img").src = `${image}`;
		};
		reader.readAsDataURL(file);
	} else {
		console.log("Couldn't find file " + file);
	}
}

function handleVideoChange(event) {
	const file = event.target.files?.[0];
	if (file) {
		const reader = new FileReader();
		reader.onloadend = () => {
			video = reader.result;
			document.querySelector("video").src = `${reader.result}`;
		};
		reader.readAsDataURL(file);
	} else {
		console.log("Couldn't find file " + file);
	}
}


async function uploadVideo() {
  event.preventDefault();

	const imageInput = document.getElementById("image");
	const image = imageInput.files[0];

	const videoInput = document.getElementById("video");
	const video = videoInput.files[0];

	const name = document.getElementById("name").value;
const description = document.getElementById("description").value;
const category = document.getElementById("category").value;

	const formData = new FormData();
	formData.append("image", image);
	formData.append("video", video);
	formData.append("name", name);
	formData.append("description", description);
	formData.append("category", category);
	formData.append("adminID", userID);
	formData.append("creatorName", name);
	formData.append("email", email);

	console.log(formData);

	await uploadFinalVideo(formData);
}

async function uploadFinalVideo(formData) {
	try {
		const response = await fetch("http://localhost:8080/video/upload/video", {
			method: "POST",
			body: formData,
		});
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error("Error:", error);
	}
}

const uploadBtn = document.querySelector("#upload");
uploadBtn.addEventListener("click", () => {
	popup.classList.add("openpopup");
	document.querySelector("main").style.filter = "blur(20px)";
});

function closePopup() {
	document.getElementById("popup").classList.remove("openpopup");
	document.querySelector("main").style.filter = "blur(0px)";
}
