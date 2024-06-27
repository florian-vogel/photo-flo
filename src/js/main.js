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

document.querySelectorAll(".toggle-submenu").forEach((item) => {
  item.addEventListener("click", function() {
    let parentElement = this.parentElement;
    let submenu = parentElement.querySelector(".submenu");
    let submenuItems = submenu.querySelectorAll("li");
    let animationDelaySubmenuItems = 200;

    if (submenu.classList.contains("opening") || submenu.classList.contains("closing")) {
      return;
    }

    if (submenu.classList.contains("active-submenu")) {
      submenu.classList.remove("active-submenu");
      submenu.classList.add("closing");
      submenu.style.maxHeight = "0";

      submenuItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = 0; // Trigger CSS transition
        }, animationDelaySubmenuItems * (submenuItems.length - index));
      });

      setTimeout(() => {
        submenu.classList.remove("closing");
      }, (submenuItems.length + 1) * animationDelaySubmenuItems);
    } else {
      submenu.classList.add("opening");
      let submenuHeight = submenuItems.length * 25; // Example height per item
      submenu.style.maxHeight = `${submenuHeight}px`;

      submenuItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = 1; // Trigger CSS transition
        }, animationDelaySubmenuItems * (index + 1));
      });

      setTimeout(() => {
        submenu.classList.remove("opening");
        submenu.classList.add("active-submenu");
      }, submenuItems.length * animationDelaySubmenuItems);
    }
  });
});
