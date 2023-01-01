let country = "in";

let apiKey = "68484bd6c0dc41fd9fcaa8143b68408b";

const xhr = new XMLHttpRequest();

xhr.open(
  "GET",
  `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`,true
);
xhr.onprogress = function () {
  let progress = document.getElementById("progress");
  progress.innerText = "Letest News Fatching...";
};

xhr.onload = function () {
  let html = "";
  let json = JSON.parse(this.responseText);
  let parent = document.getElementById("parent");
  let progress = document.getElementById("progress");
  if (this.status == 200) {
    progress.innerText = "";
    json["articles"].forEach((element, index) => {
      html += `<div>
                <p>
                    <button
                    class="title btn-primary"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample${index}"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                    >${element.title}</button>
                </p>
                <div class="collapse" id="collapseExample${index}">
                    <div class="card card-body">${element.description}<a href="${element.url}" 
                    target="_blank">Raed more..</a></div>
                </div>
                </div>`;
              });
    parent.innerHTML = html;
    let footer = document.getElementById('footer');
    footer.style = `visibility: visible;`
    
  } 
  else if (this.status==404) {
    progress.innerText = "Something Wrong in server currently news not found";
  }
  else if(this.status == 500){
    progress.innerText = `Internal Server Error`;
  }
  else{
    progress.innerText = `Internal Server Error`;

  }
};
xhr.send();
