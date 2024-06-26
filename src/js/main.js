document.addEventListener("DOMContentLoaded", function () {
  const swup = new Swup(); // initializes Swup

  fetch("config.json")
    .then((response) => response.json())
    .then((config) => {
      // Loop through all elements with a 'data-config' attribute
      document.querySelectorAll("[data-config]").forEach((element) => {
        const key = element.getAttribute("data-config");
        if (config[key]) {
          if (element.tagName.toLowerCase() === "title") {
            document.title = config[key];
          } else {
            element.textContent = config[key];
          }
        }
      });
    })
    .catch((error) => console.error("Failed to load configuration:", error));
});

document.querySelectorAll('.toggle-submenu').forEach(item => {
    item.addEventListener('click', function() {
        const submenu = this.nextElementSibling;
        if (submenu.classList.contains('active-submenu')) {
            submenu.classList.add('closing');
            setTimeout(() => {
                submenu.classList.remove('active-submenu', 'closing');
                submenu.style.maxHeight = '0';
            }, 500); // Match the longest animation delay and duration
        } else {
            submenu.classList.add('active-submenu');
            submenu.style.maxHeight = '100px'; // Or the max height needed
        }
    });
});
