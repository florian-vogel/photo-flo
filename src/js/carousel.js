let images = []; // Initialize an empty array for images
const imgElement = document.getElementById('carouselImage');

function loadCarousel(newImages) {
  images = newImages; // Set the new image array
  currentIndex = 0; // Reset index to start from the first image
  imgElement.src = images[currentIndex]; // Load the first image
  imgElement.classList.add("fade-in"); // Add fade-in to ensure the first image animates in
}

function changeImage(forward = true) {
  imgElement.classList.remove("fade-in");
  setTimeout(() => {
    currentIndex = forward
      ? (currentIndex + 1) % images.length
      : (currentIndex - 1 + images.length) % images.length;
    imgElement.src = images[currentIndex];
    imgElement.classList.add("fade-in");
  }, 800);
}

document
  .getElementById("carouselImage")
  .addEventListener("click", () => changeImage(true));
document
  .getElementById("prevButton")
  .addEventListener("click", () => changeImage(false));
