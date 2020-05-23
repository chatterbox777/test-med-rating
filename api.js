const catalogue = document.querySelector(".catalog");
const catalogueUsers = document.querySelector(".catalog__users");
let userNameLi = []; // здесь после маппинга полученного объекта с users будет храниться каждый ul c именем user

catalogueUsers.addEventListener("click", userResponse);

// эта функция возвращает массив юзеров
function getUsers() {
  const usersUrl = "https://json.medrating.org/users/";
  return fetch(usersUrl).then((response) => response.json());
}
// эта функция возвращает массив альбомов
function getAlbums(id) {
  const albumsUrl = `https://json.medrating.org/albums?userId=${id}`;
  return fetch(albumsUrl).then((response) => response.json());
}

function getPhotos(id) {
  const photosUrl = `https://json.medrating.org/photos?albumId=${id}`;
  return fetch(photosUrl).then((response) => response.json());
}

const mapAlbums = (album, userItem) => {
  const albums = document.createElement("ul");
  albums.innerHTML = album.title;
  albums.classList.add("catalog__item");
  userItem.appendChild(albums);
  const onSubscribeUsers = () => {
    albums.classList.toggle("active");
  };
  userItem.addEventListener("click", onSubscribeUsers);
};

const mapListUsers = async ({ id, name }) => {
  const userAlbums = await getAlbums(id);
  const userItem = document.createElement("li");
  const userName = document.createElement("p");
  userName.innerHTML = name;
  userItem.appendChild(userName);
  userItem.classList.add("catalog__user");
  catalogue.appendChild(userItem);

  userAlbums.forEach((album) => mapAlbums(album, userItem));
};

async function userResponse() {
  const usersResponse = await getUsers();
  usersResponse
    .filter((user) => user.name)
    .forEach((user) => mapListUsers(user));
}

userResponse();
