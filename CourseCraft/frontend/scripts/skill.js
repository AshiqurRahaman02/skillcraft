var allVideos = []
function generateRandomViewsArray(length) {
  const views = [];
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * 100); // Generate a random number between 0 and 9999
    const viewUnit = Math.random() < 0.5 ? "k" : "M"; // Randomly choose between "k" and "M"
    views.push(randomNumber + viewUnit);
  }
  return views;
}




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

// submitCommentButton.addEventListener("click", function() {
//   var comment = commentInput.value;
//   comments.innerHTML += "<li>" + comment + "</li>";
//   commentInput.value = "";
// });

//sidebar code
// skill.js

// Sample array of skill names (you can replace it with your actual data)
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
  console.log(categories)
	const url = `http://localhost:8080/video/get/byCategories?categories=${categories}`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
      displayVideos(data.videos)
		})
		.catch((error) => {
			console.error(error);
		});
}

function shuffleArray(arr) {
  const shuffledArray = [...arr];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}


function displayVideos(data){
  console.log(data)


  const videos = shuffleArray(data);
  
  const viewsArray = generateRandomViewsArray(50);

  let html = '';

  videos.forEach ((video) => {
    let views = viewsArray[Math.floor(Math.random() * viewsArray.length)]
    let days = Math.floor(Math.random() * 7)
    html+= `
    <div class="video">
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
    `
  })

  parent.innerHTML = html
}


setTimeout(()=>{
  let cat =[]
  const url = `http://localhost:8080/video/get/byCategories?categories=${cat}`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
      allVideos = data.videos
      console.log(allVideos)
		})
		.catch((error) => {
			console.error(error);
		});
},10000)


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
      console.log(key)
    }
  }
  if (flag) {
    let filterVideos = allVideos.filter((cls) => {
      for (let key in filters) {
        let skill = key.toUpperCase()
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