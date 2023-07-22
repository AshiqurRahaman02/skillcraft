// ..................................... SCRIPT ...................................... //

if (!userDetails) {
	window.location.href = "../pages/signin.html";
}
const userID = userDetails._id;
const email = userDetails.email;
const userName = userDetails.name;

var activeSection = "";

const params = new URLSearchParams(window.location.search);

const activeParam = params.get("active"); // "video"

if (activeParam === "video") {
	displayVideos();
	console.log("Video is active.");
} else if (activeParam === "some_other_value") {
	console.log("Some other value is active.");
} else {
	console.log("Default state.");
	displayAccount()
	
}
function displayAccount() {
	if (activeSection !== "account") {
		document.getElementById("account").style.display = "block";
		activeSection = "account";

		document.getElementById("videos").style.display = "none";
		document.getElementById("subscribe").style.display = "none";
		document.getElementById("plans").style.display = "none";
		document.getElementById("notifications").style.display = "none";

	}
}

function displayVideos() {
	if (activeSection !== "videos") {
		document.getElementById("videos").style.display = "block";
		activeSection = "videos";
		
		document.getElementById("account").style.display = "none";
		document.getElementById("subscribe").style.display = "none";
		document.getElementById("plans").style.display = "none";
		document.getElementById("notifications").style.display = "none";

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
}
function displayAllVideos(data) {
	console.log(data);
	data.reverse()
	let html = "";

	data.forEach((video) => {
		let title = video.name;
        let maxLength = 14;
        if (title.length > maxLength) {
            title = title.substring(0, maxLength) + "...";
        }
		html += `
              <div class="video_box" >
                <div class="video_thumbnail"  onclick="openVideo('${video._id}')">
                  <img src="${video.thumbnailURL}" alt="" />
                </div>
                <div class="video_nameAndbtn">
                  <div>
                    <h2 class="titleName">
                      <span>${title}</span>
                    </h2>
                    <p class="totalLikes">Likes: <span>${video.likes}</span></p>
                    <p class="totalComments">
                      Total Comments: <span>${video.comments.length}</span>
                    </p>
                  </div>
                  <div>
                    <button class="my-button" onclick="updateVideo(${video._id})">Edit</button>
                    <br />
                    <button class="my-button" onclick="deleteVideo('${title}','${video._id}')">Delete</button>
                  </div>
                </div>
              </div>
            `;
	});

	document.getElementById("parent").innerHTML = html;
}
function openVideo(id) {
	let url = "../pages/video.html?id=" + id;
	window.location.href = url;
}
async function deleteVideo(title,id) {
	if(confirm(`Are you sure you want to delete ${title}`)){
		try {
			const response = await fetch(`http://localhost:8080/video/delete/${id}`, {
			  method: "DELETE",
			});
		
			const data = await response.json();
		
			if (response.ok) {
			  console.log(data.message);
			  window.location.reload();

			} else {
			  console.error(data.message); 
			}
		  } catch (error) {
			console.error("Error:", error);
		  }
	}else{
		return;
	}
  }
  
  function logout(){
	window.localStorage.removeItem("userInfo");
	window.localStorage.removeItem("token");
	window.location.href = "../pages/signin.html"
  }

function displaySubscribers() {
	if (activeSection !== "subscribe") {
		document.getElementById("subscribe").style.display = "block";
		activeSection = "subscribe";
		
		document.getElementById("account").style.display = "none";
		document.getElementById("videos").style.display = "none";
		document.getElementById("plans").style.display = "none";
		document.getElementById("notifications").style.display = "none";
	}
}

function displayPlans() {
	if (activeSection !== "plans") {
		document.getElementById("plans").style.display = "block";
		activeSection = "plans";
		
		document.getElementById("account").style.display = "none";
		document.getElementById("subscribe").style.display = "none";
		document.getElementById("videos").style.display = "none";
		document.getElementById("notifications").style.display = "none";
	}
}

function displayNotifications() {
	if (activeSection !== "notifications") {
		document.getElementById("notifications").style.display = "block";
		activeSection = "notifications";
		
		document.getElementById("account").style.display = "none";
		document.getElementById("subscribe").style.display = "none";
		document.getElementById("plans").style.display = "none";
		document.getElementById("videos").style.display = "none";
	}
}


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

	if (image && video && name && description && category) {
		const formData = new FormData();
		formData.append("image", image);
		formData.append("video", video);
		formData.append("name", name);
		formData.append("description", description);
		formData.append("category", category);
		formData.append("adminID", userID);
		formData.append("creatorName",userName );
		formData.append("email", email);

		document.getElementById("popup").style.filter = "blur(20px)";
		document.querySelector(".pro").style.display = "block";

		setTimeout(() => {}, 5000);
		setTimeout(() => {
			confirm(`Video uploaded successfully.
		You will receive an email notification when your video goes live. It usually takes less than a minute.`);
			uploadFinalVideo(formData);
		}, 10000);
	} else {
		alert("Please enter valid information");
	}
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
