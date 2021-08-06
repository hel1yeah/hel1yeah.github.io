const container = document.querySelector('.container');
const form = document.querySelector('form');
const button = document.querySelector('.button-on');
const check = document.querySelector('.check')

button.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('button-on')) {
    createObjUser()
    postUser()
  }
});

check.addEventListener('change', function () {
  if (this.checked) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
});

function createObjUser() {
  let name = document.querySelector('.name');
  let email = document.querySelector('.email');
  let phone = document.querySelector('.phone');
  let website = document.querySelector('.website');
  let objUser = {};
  objUser.name = name.value;
  objUser.email = email.value;
  objUser.phone = phone.value;
  objUser.website = website.value;
  return objUser;
}

function postUser() {
  let xhr = new XMLHttpRequest()
  const URL = 'https://jsonplaceholder.typicode.com/users'
  xhr.open('post', URL)
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.addEventListener("load", accessLoading);
  xhr.addEventListener("error ", errorLoading);

  function accessLoading() {
    const response = JSON.parse(xhr.responseText);
    renderUserFragment(response)
  }
  function errorLoading() {
    console.error(xhr.responseText);
  }
  xhr.send(JSON.stringify(createObjUser()));
}

function renderUserFragment(response) {
  const fragment = document.createDocumentFragment();
  const wrapper__user = document.createElement("div");
  wrapper__user.classList.add("wrapper");
  wrapper__user.setAttribute("data-user-atr", `${response.id}`);

  const h4 = document.createElement("h5");
  h4.classList.add("header-name");
  h4.textContent = `${response.name}`;

  const descr = document.createElement("p");
  descr.classList.add("descr");
  descr.innerHTML = `${response.phone}<br> ${response.email} <br> ${response.website}`;

  wrapper__user.append(h4);
  wrapper__user.append(descr);

  fragment.append(wrapper__user);

  container.append(fragment);
}