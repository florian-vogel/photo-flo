let currentCategory = []; // Initialize an empty array for images
var imgElement = document.getElementById("carouselImage");
const descriptionElement = document.getElementById("imageDescription");
const categoryDescriptionElement = document.getElementById(
  "categoryDescription"
);

function loadCarousel(category) {
  currentCategory = category; // Set the new image array
  currentIndex = 0; // Reset index to start from the first image
  categoryDescriptionElement.style.opacity = 0;
  categoryDescriptionElement.classList.remove("fade-in");

  changeImage("stay");
}

function preloadImages(index) {
  images = currentCategory.images;
  const nextIndex = (index + 1) % images.length;
  const prevIndex = (index - 1 + images.length) % images.length;

  const nextImage = new Image(); // Creates a new Image object
  nextImage.src = images[nextIndex].url; // Sets the source of the next image to preload

  const prevImage = new Image(); // Creates another new Image object
  prevImage.src = images[prevIndex].url; // Sets the source of the previous image to preload
}

// TODO: still jumping
function changeImage(direction = "forward") {
  imgElement.classList.remove("fade-in");
  currentIndex =
    direction === "forward"
      ? (currentIndex + 1) % currentCategory.images.length
      : direction === "backward"
      ? (currentIndex - 1 + currentCategory.images.length) % images.length
      : currentIndex;

  const imgContainer = imgElement.parentNode;
  const hiddenImgElement = document.createElement("img");
  //hiddenImgElement.addEventListener("click", () => changeImage("forward"));
  hiddenImgElement.style.display = "none";
  descriptionElement.style.opacity = 0;
  descriptionElement.classList.remove("fade-in");

  // Append the hidden image to the same container as the visible image
  imgContainer.appendChild(hiddenImgElement);

  const newImg = new Image();
  newImg.onload = () => {
    setTimeout(() => {
      imgElement.style.display = "none";
      hiddenImgElement.style.display = "inline";
      //imgElement.src = newImg.src;
      hiddenImgElement.src = newImg.src;
      //imgElement.classList.add("fade-in");
      hiddenImgElement.style.opacity = 0;
      setTimeout(() => {
        hiddenImgElement.classList.add("fade-in");
        descriptionElement.classList.add("fade-in");
        categoryDescriptionElement.classList.add("fade-in");

        document.getElementById("buttonLeft").style.width = hiddenImgElement.width/2;
        document.getElementById("buttonRight").style.width = hiddenImgElement.width/2;
        document.getElementById("buttonLeft").style.height = hiddenImgElement.height + 23;
        document.getElementById("buttonRight").style.height = hiddenImgElement.height + 23;
      }, 100);
      imgElement = hiddenImgElement;
      descriptionElement.innerText =
        currentCategory.images[currentIndex].description;

      let categoryDescription = currentCategory.description;
      if (categoryDescription) {
        categoryDescriptionElement.innerText = categoryDescription;
      } else {
        categoryDescriptionElement.innerText = "";
      }
    }, 800);
  };
  newImg.src = currentCategory.images[currentIndex].url;

  preloadImages(currentIndex);
}

document
  .getElementById("buttonLeft")
  ?.addEventListener("click", () => changeImage("forward"));

document
  .getElementById("buttonRight")
  ?.addEventListener("click", () => changeImage("backward"));
