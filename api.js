const catalogue = document.querySelector(".catalog");
const catalogueUsers = document.querySelector(".catalog__users");

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

//const mapPhotos = async (album, albumItem) => {
//const picture = document.createElement("img");

//};

const mapAlbums = (album, userItem) => {
  const albums = document.createElement("ul"); // нужно зааппендить в albums каждую picture
  albums.innerHTML = album.title;
  albums.classList.add("catalog__item");
  userItem.appendChild(albums);
  const onSubscribeUsers = () => {
    albums.classList.toggle("active");
  };
  const onPhotoSubscribe = async () => {
    return await getPhotos(album.id);
  };

  userItem.addEventListener("click", onSubscribeUsers);
  albums.addEventListener("click", onPhotoSubscribe); // получаем фото с id album
};

const mapListUsers = async ({ id, name }) => {
  const userAlbums = await getAlbums(id); // здесь лежит массив с альбомами
  console.log(userAlbums);
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
