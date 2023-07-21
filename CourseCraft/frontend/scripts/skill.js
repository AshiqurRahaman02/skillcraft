// const menu = document.querySelector('#menu');
// console.log(menu);
// const sidebar = document.querySelector('.sidebar');
// console.log(sidebar);

// menu.addEventListener('click', function () {
//   sidebar.classList.toggle('show-sidebar');
// }); 

var likeButton = document.getElementById("like-button");
var commentButton = document.getElementById("comment-button");
var commentInput = document.getElementById("comment-input");
var submitCommentButton = document.getElementById("submit-comment");
var likeCount = document.getElementById("like-count");
var comments = document.querySelector(".comment-section");

likeButton.addEventListener("click", function() {
  let like=likeCount.innerText
  likeCount.innerHTML=+(++like) 
 console.log(typeof(like)) 
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
    checkbox.name = "skills"; // Give a common name to all checkboxes so you can easily handle them as a group if needed
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
