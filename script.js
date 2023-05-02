const imagesList = document.querySelector(".img-block");
const errorMessage = document.querySelector(".error-message");
let searchQuery = "random";
let pageIndex = 1;
const key = "-rK4_QnSddGUzXgQzCh_QvWocUezO43ev-oD2iA-4Dc";

async function fetchdata() {
  try {
    const request = `https://api.unsplash.com/search/photos?client_id=${key}&page=${pageIndex}&per_page=30&query=${searchQuery}`;

    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json(); // conversion des data en json
    console.log(data);

    if (!data.total) {
      imagesList.textContent = "";
      throw new Error("Aucune image correspondante.");
    }

    createImages(data.results);
  } catch (error) {
    errorMessage.textContent = `${error}`;
  }
}

fetchdata();

function createImages(data) {
  data.forEach((img) => {
    const newImg = document.createElement("img");
    newImg.src = img.urls.small;
    imagesList.appendChild(newImg);
  });
}

const options = { rootMargin: "50%" };

const observer = new IntersectionObserver(intersect, options);
const infiniteMarker = document.querySelector(".infinite-marker");
observer.observe(infiniteMarker);

function intersect(entries) {
  if (window.scrollY > window.innerHeight && entries[0].isIntersecting) {
    pageIndex++;
    fetchdata();
  }
}

const input = document.querySelector("#search-bar");
console.log(input);
const form = document.querySelector("form");

form.addEventListener("submit", search);

function search(e) {
  e.preventDefault();
  imagesList.textContent = "";
  if (!input.value) {
    errorMessage.textContent = "Aucun résultat.";
    return;
  }
  errorMessage.textContent = "";
  searchQuery = input.value;
  pageIndex = 1;
  fetchdata();
}

const scrollUp = document.querySelector(".scroll-to-top");
scrollUp.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
