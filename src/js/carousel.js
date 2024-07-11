const images = [
    "./assets/berlin_at_night/bsp2bildervertikal.png",
    "./assets/berlin_at_night/bspbildhorizontal.JPG",
    "./assets/berlin_at_night/bspbildvertikal.JPG",
];

let currentIndex = 0;

const imgElement = document.getElementById('carouselImage');
imgElement.addEventListener('load', function() {
    this.classList.add('fade-in');
});

function changeImage(forward = true) {
    imgElement.classList.remove('fade-in'); // Remove the class to reset opacity to 0
    setTimeout(() => {
        currentIndex = forward ? (currentIndex + 1) % images.length : (currentIndex - 1 + images.length) % images.length;
        imgElement.src = images[currentIndex];
    }, 800); // Delay the src update to allow the fade out effect
}

document.getElementById('carouselImage').addEventListener('click', () => changeImage(true));
document.getElementById('prevButton').addEventListener('click', () => changeImage(false));
