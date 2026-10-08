const BASE_URL = "https://pixabay.com/api";
const API_KEY = "57858678-67382c4b464c8a2e39be7462b";

const photosList = document.querySelector(".photos-list");
const photosBtn = document.querySelector(".photos-btn");
let page = 1;
let pageLimit = 10;

photosBtn.addEventListener("click", async () => {
  try {
    const photos = await fetchPhoto();
    renderPhoto(photos);

    page += 1;

    if (page > 1) {
      photosBtn.textContent = "Load more";
    }
  } catch (e) {
    console.error(e);
  }
});

async function fetchPhoto() {
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      editors_choice: "true",
      page: page,
      per_page: pageLimit,
    });

    const response = await fetch(`${BASE_URL}/?${params}`);

    if (!response.ok) {
      throw new Error("smth went wrong with fetching photos");
    }

    const data = await response.json();
    return data.hits;
  } catch (e) {
    console.error(e);
  }
}

function renderPhoto(photos) {
  const markup = photos
    .map((photo) => {
      return `<li>
  <img src="${photo.webformatURL}" alt="${photo.views} views">
</li>`;
    })
    .join("");
  photosList.insertAdjacentHTML("beforeend", markup);
}
