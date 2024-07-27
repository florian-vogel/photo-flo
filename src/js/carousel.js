let images = []; // Initialize an empty array for images
const imgElement = document.getElementById("carouselImage");
const descriptionElement = document.getElementById("carouselDescription");

function loadCarousel(newImages) {
  images = newImages; // Set the new image array
  currentIndex = 0; // Reset index to start from the first image
  //imgElement.src = images[currentIndex].url; // Load the first image
  descriptionElement.innerText = images[currentIndex].description;
  changeImage("stay");
}

function preloadImages(index) {
  const nextIndex = (index + 1) % images.length;
  const prevIndex = (index - 1 + images.length) % images.length;

  const nextImage = new Image(); // Creates a new Image object
  nextImage.src = images[nextIndex].url; // Sets the source of the next image to preload

  const prevImage = new Image(); // Creates another new Image object
  prevImage.src = images[prevIndex].url; // Sets the source of the previous image to preload
}

/* function changeImage(direction = "forward") {
  imgElement.classList.remove("fade-in");
  setTimeout(() => {
    currentIndex =
      direction == "forward"
        ? (currentIndex + 1) % images.length
        : direction == "backward"
        ? (currentIndex - 1 + images.length) % images.length
        : currentIndex;
    preloadImages(currentIndex);
    imgElement.src = images[currentIndex].url;
    imgElement.classList.add("fade-in");
    descriptionElement.innerText = images[currentIndex].description;
  }, 800);
} */

  // TODO: still jumping
function changeImage(direction = "forward") {
  imgElement.classList.remove("fade-in"); 
  currentIndex =
    direction === "forward"
      ? (currentIndex + 1) % images.length
      : direction === "backward"
      ? (currentIndex - 1 + images.length) % images.length
      : currentIndex;

  const newImg = new Image(); 
  newImg.onload = () => {
    setTimeout(() => {
      imgElement.src = newImg.src; 
      imgElement.classList.add("fade-in"); 
      descriptionElement.innerText = images[currentIndex].description; 
    }, 800);
  };
  newImg.src = images[currentIndex].url; 

  preloadImages(currentIndex); 
}

document
  .getElementById("carouselImage")
  .addEventListener("click", () => changeImage("forward"));

/* TODO: implement prev button */
/* document
  .getElementById("prevButton")
  .addEventListener("click", () => changeImage("backward")); */
