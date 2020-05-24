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

const mapPhotos = (photo, albums) => {
  const picture = document.createElement("img");
  picture.src = photo.url;
  picture.alt = photo.title;
  albums.appendChild(picture);
  albums.addEventListener("click");
};

const mapAlbums = (album, userItem) => {
  const albums = document.createElement("li"); // нужно зааппендить в albums каждую picture
  albums.innerHTML = album.title;
  albums.classList.add("catalog__item");
  userItem.appendChild(albums);
  const photoBlock = document.createElement("ul");
  albums.appendChild(photoBlock);
  const onSubscribeUsers = () => {
    albums.classList.toggle("active");
  };

  userItem.addEventListener("click", onSubscribeUsers);
  albums.addEventListener("click", async (e) => {
    e.stopPropagation();
    if (!photoBlock.classList.contains("active")) {
      const photos = await getPhotos(album.id); // получаем фото с id album
      photos.forEach((photo) => {
        const photoWrapper = document.createElement("li");
        photoWrapper.classList.add("albums__image");
        const favouriteButton = document.createElement("button");
        favouriteButton.classList.add("button");
        photoWrapper.dataset.photoId = photo.id;
        const image = document.createElement("img");
        photoBlock.appendChild(photoWrapper);
        photoWrapper.appendChild(favouriteButton);
        photoWrapper.appendChild(image);
        image.src = photo.thumbnailUrl;
        image.title = photo.title;
      });
      if (photoBlock.classList.contains("non_active")) {
        photoBlock.classList.remove("non_active");
      }
      photoBlock.classList.add("active");
    } else {
      photoBlock.classList.remove("active");
      photoBlock.classList.add("non_active");
    }
  });
};

const mapListUsers = async ({ id, name }) => {
  const userAlbums = await getAlbums(id); // здесь лежит массив с альбомами
  console.log(userAlbums);
  const userItem = document.createElement("ul");
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
