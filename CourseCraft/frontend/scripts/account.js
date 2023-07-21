// ..................................... SCRIPT ...................................... //
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
