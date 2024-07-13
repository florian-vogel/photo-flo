let images = []; // Initialize an empty array for images
const imgElement = document.getElementById("carouselImage");
const descriptionElement = document.getElementById("carouselDescription");

function loadCarousel(newImages) {
  images = newImages; // Set the new image array
  currentIndex = 0; // Reset index to start from the first image
  //imgElement.src = images[currentIndex].url; // Load the first image
  descriptionElement.innerText = images[currentIndex].description;
  changeImage('stay');
}

function changeImage(direction = "forward") {
  imgElement.classList.remove("fade-in");
  setTimeout(() => {
    currentIndex =
      direction == "forward"
        ? (currentIndex + 1) % images.length
        : direction == "backward"
        ? (currentIndex - 1 + images.length) % images.length
        : currentIndex;
    imgElement.src = images[currentIndex].url;
    imgElement.classList.add("fade-in");
    descriptionElement.innerText = images[currentIndex].description;
  }, 800);
}

document
  .getElementById("carouselImage")
  .addEventListener("click", () => changeImage('forward'));
document
  .getElementById("prevButton")
  .addEventListener("click", () => changeImage('backward'));
