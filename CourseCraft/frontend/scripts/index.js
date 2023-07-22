const userDetails = JSON.parse(localStorage.getItem("userInfo")) || null;

if (userDetails) {
	document.getElementById("userName").innerText =
		userDetails.name[0].toUpperCase() +
		userDetails.name.split("").splice(1).join("");
}

const redirect = () => {
	if (userDetails) {
		window.location.href = "./pages/account.html";
	} else {
		window.location.href = "./pages/signin.html";
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
                                <a href="./pages/skills.html?cat=JAVASCRIPT"><img src="./images/javascript.svg" alt=""><span>JAVASCRIPT</span></a>
                                <a href="./pages/skills.html?cat=NODE.JS"><img src="./images/nodejs.svg" alt=""><span>NODE.JS</span></a>
                                <a href="./pages/skills.html?cat=PYTHON"><img src="./images/python-5.svg" alt=""><span>PYTHON</span></a>
                                <a href="./pages/skills.html?cat=REACT"><img src="./images/react-1.svg" alt=""><span>REACT</span></a>
                                <a href="./pages/skills.html?cat=AWS"><img src="./images/aws-2.svg" alt="" id="aws"><span>AWS</span></a>
                                <a href="./pages/skills.html?cat=C++"><img src="./images/c.svg" alt=""><span>C++</span></a>
                                <a href="./pages/skills.html?cat=HTML"><img src="./images/html-1.svg" alt="" id="aws"><span>HTML</span></a>
                                <a href="./pages/skills.html?cat=CSS"><img src="./images/css-3.svg" alt=""><span>CSS</span></a>
                                <a href="./pages/skills.html?cat=Tailwind CSS"><img src="./images/tailwind-css-2.svg" alt="" id="aws"><span> Tailwind CSS</span></a>
                                <a href="./pages/skills.html"><span>SEE MORE</span><ion-icon name="arrow-forward-outline"></ion-icon></a>
                            `;
	document.querySelector("#bottomNav").style.display = "block";
};
const showCourses = () => {
	bottomNavDiv.innerHTML = `
                                <a href="#"><img src="./images/web.svg" alt=""><span>WEB DEVELOPMENT</span></a>
                                <a href="#"><img src="./images/photoshop.svg" alt=""><span>PHOTOSHOP CC</span></a>
                                <a href="#"><img src="./images/ai.svg" alt=""><span>AI DEVELOPMENT</span></a>
                                <a href="#"><img src="./images/tailwind-css-2.svg" alt="" id="aws"><span> Tailwind CSS</span></a>
                                <a href="#"><span>SEE MORE</span><ion-icon name="arrow-forward-outline"></ion-icon></a>
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
