function searchSkills() {
    var searchTerm = document.getElementById("search").value;
    var skillList = document.getElementById("skill-list");
    var skillDetailsList = document.getElementById("skill-detail-list");
  
    skillDetailsList.innerHTML = "";
  
    for (var i = 0; i < skillList.children.length; i++) {
      var skill = skillList.children[i];
      var skillName = skill.children[0].value;
  
      if (skillName.toLowerCase().includes(searchTerm.toLowerCase())) {
        skillDetailsList.innerHTML += "<li><img src='skill-images/" + skillName + ".png' alt='" + skillName + "'>" + skillName + "</li>";
      }
    }
  }
  
  document.getElementById("search").addEventListener("keyup", searchSkills);
  