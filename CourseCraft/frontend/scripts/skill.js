const menu = document.querySelector('#menu');
console.log(menu);
const sidebar = document.querySelector('.sidebar');
console.log(sidebar);

menu.addEventListener('click', function () {
  sidebar.classList.toggle('show-sidebar');
}); 

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
