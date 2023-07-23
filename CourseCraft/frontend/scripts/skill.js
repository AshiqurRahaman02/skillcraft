var allVideos = [];
function generateRandomViewsArray(length) {
	const views = [];
	for (let i = 0; i < length; i++) {
		const randomNumber = Math.floor(Math.random() * 100); // Generate a random number between 0 and 9999
		const viewUnit = Math.random() < 0.5 ? "k" : "M"; // Randomly choose between "k" and "M"
		views.push(randomNumber + viewUnit);
	}
	return views;
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

var likeButton = document.getElementById("like-button");
var commentButton = document.getElementById("comment-button");
var commentInput = document.getElementById("comment-input");
var submitCommentButton = document.getElementById("submit-comment");
var likeCount = document.getElementById("like-count");
var comments = document.querySelector(".comment-section");

likeButton.addEventListener("click", function () {
	let like = likeCount.innerText;
	likeCount.innerHTML = +(++like);
	console.log(typeof like);
});

const skillsData = [
	"HTML",
	"CSS",
	"JavaScript",
	"Python",
	"Java",
	"React",
	"Node.js",
	"MongoDB",
	"SQL",
	"AWS",
	"Machine Learning",
	"Data Science",
	"Blockchain",
	"UI/UX Design",
	"Android Development",
	"iOS Development",
	"Flutter",
	"Swift",
	"C#",
	"C++",
];

// Function to display skills with checkboxes in the sidebar
function displaySkills() {
	const skillList = document.getElementById("skillList");

	// Create a Set to store unique skill names
	const uniqueSkills = new Set();

	// Loop through the skillsData array and add unique skill names to the Set
	skillsData.forEach((skill) => uniqueSkills.add(skill));

	// Clear the existing skill list
	skillList.innerHTML = "";

	// Loop through the unique skills and create checkboxes with labels for each
	uniqueSkills.forEach((skill) => {
		const listItem = document.createElement("li");
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = skill; // Give a common name to all checkboxes so you can easily handle them as a group if needed
		checkbox.value = skill;
		listItem.appendChild(checkbox);

		const label = document.createElement("label");
		label.textContent = skill;
		listItem.appendChild(label);

		skillList.appendChild(listItem);
	});
}

// Call the function to display skills when the page loads
displaySkills();
// skill.js

// ... (existing code) ...

// Function to filter skills based on the search input
function filterSkills() {
	const searchInput = document.getElementById("searchInput");
	const filterValue = searchInput.value.toLowerCase();

	const skillList = document.getElementById("skillList");
	const skills = skillList.getElementsByTagName("li");

	for (let i = 0; i < skills.length; i++) {
		const label = skills[i].getElementsByTagName("label")[0];
		const skillName = label.textContent.toLowerCase();

		if (skillName.includes(filterValue)) {
			skills[i].style.display = "flex";
		} else {
			skills[i].style.display = "none";
		}
	}
}

// ... (existing code) ...

const parent = document.getElementById("parent");

getvideos();
function getvideos() {
	const urlParams = new URLSearchParams(window.location.search);

	// Get the categories from the URL
	const categories = urlParams.getAll("cat");

	fetchVideosByCategories(categories);
}

function fetchVideosByCategories(categories) {
	console.log(categories);
	const url = `https://cobalt-blue-shrimp-suit.cyclic.app/video/get/byCategories?categories=${categories}`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			displayVideos(data.videos);
		})
		.catch((error) => {
			console.error(error);
		});
}

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

function displayVideos(data) {
	console.log(data);

	const videos = shuffleArray(data);

	const viewsArray = generateRandomViewsArray(50);

	let html = "";

	videos.forEach((video) => {
		let views = viewsArray[Math.floor(Math.random() * viewsArray.length)];
		let days = Math.floor(Math.random() * 7);

		html += `
    <div class="video"   onclick="openVideo('${video._id}')">
    <div class="video__thumbnail">
      <img src="${video.thumbnailURL}" alt="" />
    </div>
    <div class="video__details">
      <div class="author">
        <img src="http://aninex.com/images/srvc/web_de_icon.png" alt="" />
      </div>
      <div class="title">
        <h3>${video.name}</h3>
        <a href="#">${video.creatorName}</a>
        <span>${views} Views • ${days} days Ago</span> 
        <div id="like-comment-section">
          <ul class="like-comment-list">
            <li class="like-section">
              <i class="title-icon fas fa-thumbs-up" id="like-button"></i> <span id="like-count">${video.likes}</span>
            </li>
            <li class="comment-section" id="comment-button">
              <i class="title-icon fas fa-comments"></i> <span id="like-count">${video.comments.length}</span>
            </li>
          </ul>
          </ul>
      </div>

      
      </div>
    </div>
  </div> 
    `;
	});

	if (html.length == 0) {
		html = "No Video Available for this Skill";
	}
	parent.innerHTML = html;
}
function openVideo(id) {
	let url = "../pages/video.html?id=" + id;
	window.location.href = url;
}

setTimeout(() => {
	let cat = [];
	const url = `https://cobalt-blue-shrimp-suit.cyclic.app/video/get/byCategories?categories=${cat}`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			allVideos = data.videos;
			console.log(allVideos);
		})
		.catch((error) => {
			console.error(error);
		});
}, 10000);

let filters = {};
document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
	checkbox.addEventListener("change", (e) => {
		filters[checkbox.name] = checkbox.checked;
		// main.innerHTML = `
		//     <div class="lds-roller">
		//     <div></div>
		//     <div></div>
		//     <div></div>
		//     <div></div>
		//     <div></div>
		//     <div></div>
		//     <div></div>
		//     <div></div>
		//   </div>
		//     `;
		applyFilters();
	});
});

function applyFilters() {
	console.log(filters);
	let flag = false;
	for (let key in filters) {
		if (filters[key]) {
			flag = true;
			console.log(key);
		}
	}
	if (flag) {
		let filterVideos = allVideos.filter((cls) => {
			for (let key in filters) {
				let skill = key.toUpperCase();
				if (filters[key] && cls.category.toUpperCase() == skill) {
					return cls;
				}
			}
		});
		console.log(filterVideos);
		displayVideos(filterVideos);
	} else {
		displayVideos(allVideos);
	}
}
