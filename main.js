// main vars
  let theInput = document.querySelector(".get-repos input");
  let getButton = document.querySelector(".get-button");
  let spanLen = document.querySelector(".show-len");
  let resposData = document.querySelector(".show-data .data");

//https://api.github.com/users/WaseemWisa/repos


getButton.onclick = function () {
  getRepos();
  resposData.innerHTML = ""
}

//Get Repos Function
function getRepos() {
  if (theInput.value  == "") {
    spanLen.innerHTML = `Write Valid UserName`;
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
    .then(res =>  res.json()) 
    .then(data => {
      if (data.length == 0) {
        spanLen.innerHTML = `No Repos To Show`
      } else {
        console.log(data);
        spanLen.innerHTML = `Repos: ${data.length} Repo`
        //fetch data
        data.forEach(repo => {
          let mainDiv = document.createElement("div");
          let repoName = document.createTextNode(repo.name);

          mainDiv.appendChild(repoName);

          let theUrl = document.createElement("a"); 
          let theUrlText = document.createTextNode("visit");

          theUrl.appendChild(theUrlText); 

          theUrl.href = `https://api.github.com/users/${theInput.value}/${repo.name}`; 
          theUrl.setAttribute('target', '_blank')

          mainDiv.appendChild(theUrl)

          let startSpan = document.createElement("span");
          let startText = document.createTextNode(`Start ${repo.stargazers_count}`);

          startSpan.appendChild(startText);
          mainDiv.className = "repo-box";

          resposData.appendChild(mainDiv)
        })
      }
    })
  }
}