// ..................................... SCRIPT ...................................... //
const userDetails = JSON.parse(localStorage.getItem("userInfo")) || null;

if (userDetails) {
	document.getElementById("userName").innerText =
		userDetails.name[0].toUpperCase() +
		userDetails.name.split("").splice(1).join("");

	document.querySelector(".profile_pic_div > h2").innerHTML = `${userDetails.tag}`
}else{
	window.location.href = "../pages/signin.html";
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


if (!userDetails) {
	window.location.href = "../pages/signin.html";
}
const userID = userDetails._id;
const email = userDetails.email;
const userName = userDetails.name;
document.getElementById("name").innerText = userName
document.getElementById("email").innerText = email
console.log(userName)
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
		fetch(`https://gleaming-stockings-bull.cyclic.app/video/get/videos/${userID}`)
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
			const response = await fetch(`https://gleaming-stockings-bull.cyclic.app/video/delete/${id}`, {
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

	const title = document.getElementById("title").value;
	const description = document.getElementById("description").value;
	const category = document.getElementById("category").value;

	if (image && video && title && description && category) {
		const formData = new FormData();
		formData.append("image", image);
		formData.append("video", video);
		formData.append("name", title);
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
		console.log(image , video , title , description , category)
		alert("Please enter valid information");
	}
}

async function uploadFinalVideo(formData) {
	try {
		const response = await fetch("https://gleaming-stockings-bull.cyclic.app/video/upload/video", {
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
