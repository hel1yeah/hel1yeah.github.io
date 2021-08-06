// Custom Http Module
function customHttp() {
  return {
    get(url, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open("get", url);
        xhr.addEventListener("load", () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener("error", () => {
          cb(`Error. Status code: ${xhr.status}`, xhr);
        });

        xhr.send();
      } catch (error) {
        cb(error);
      }
    },
    post(url, body, headers, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.addEventListener("load", () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener("error", () => {
          cb(`Error. Status code: ${xhr.status}`, xhr);
        });

        if (headers) {
          Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
          });
        }

        xhr.send(JSON.stringify(body));
      } catch (error) {
        cb(error);
      }
    },
  };
}
// Init http module
const http = customHttp();

const newsServise = (function () {
  const API_KEY = "ac1383186af6465ab7f260580eaf4d8c";
  const API_URL = "https://news-api-v2.herokuapp.com";

  return {
    topHeadLines(country = "us", cb) {
      http.get(
        `${API_URL}/top-headlines?country=${country}&category=science&apiKey=${API_KEY}`,
        cb
      );
    },
    everything(query, cb) {
      http.get(`${API_URL}/everything?q=${query}&apiKey=${API_KEY}`, cb);
    },
  };
})();
//elements

const form = document.forms["newsControls"];
const countrySelect = form.elements["country"];
const serchInput = form.elements["search"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loadNews();
});

//  init selects
document.addEventListener("DOMContentLoaded", function () {
  M.AutoInit();
  loadNews();
});

// load news
function loadNews() {
  showPreloade()
  const country = countrySelect.value;
  const searchText = serchInput.value;

  if (!searchText) {
    newsServise.topHeadLines(country, onGetResponse);
  } else {
    newsServise.everything(searchText, onGetResponse);
  }
}

//function on get response from server
function onGetResponse(err, res) {
  removePreloader()
  if (err) {
    showAlert(err, "error-msg");
    return;
  }
  if (!res.articles.length) {
    // show empty massage
  }
  renderNews(res.articles);
}

//function render news
function renderNews(news) {
  const newsContainer = document.querySelector(".news-container .row");
  if (newsContainer.children.length) {
    clearContainer(newsContainer);
  }
  let fragment = "";

  news.forEach((newsItem) => {
    const el = newsTemlate(newsItem);
    fragment += el;
  });
  console.log(fragment);
  newsContainer.insertAdjacentHTML("afterbegin", fragment);
}

// show massages
function showAlert(msg, type = "succces") {
  M.toast({ html: msg, classes: type });
}
// clear fragment
function clearContainer(container) {
  let child = container.lastElementChild;
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }
}
//news item template
function newsTemlate({ urlToImage, title, url, description }) {
  return `
  <div class="col s12">
    <div class='card'>
      <div class='card-image'>
        <img src='${urlToImage}' />
        <span class='card-title'>${title || ""}</span>
      </div>
      <div class="card-content">
        <p>${description || ""}</p>
      </div>
      <div class='card-action'>
        <a href='${url}' target="_blank">Читать больше</a>
      </div>
    </div>
  </div>
  `;
}

function showPreloade() {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
  <div class="progress">
    <div class="indeterminate"></div>
  </div>
  `
  );
}

function removePreloader() {
  const loader = document.querySelector('.progress');
  if (loader) {
    loader.remove();
  }
}
