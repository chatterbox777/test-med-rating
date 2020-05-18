const usersUrl = "https://json.medrating.org/users/";
const albomsUrl = "https://json.medrating.org/albums?userId=3";

const catalogue = document.querySelector(".catalog__name");

catalogue.addEventListener("click", answer);

async function answer() {
  let response = await fetch(usersUrl);
  let users = await response.json();
  console.log(users);
  usersData = users.map((user) => {
    let userName = user.name;
    let nameLi = document.createElement("li");
    nameLi.innerHTML = userName;
    catalogue.appendChild(nameLi);
  });
}
