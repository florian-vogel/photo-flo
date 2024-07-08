var menuItems = document.querySelectorAll(".menu-item");
var menuOpen = [true].concat(new Array(menuItems.length - 1).fill(false));

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

document.querySelectorAll(".toggle-submenu").forEach((item, index) => {
  item.addEventListener("mouseover", function () {
    console.log("index: ", index, ", true");
    menuOpen[index] = true;
    applyMenuState();
  });
});

document.querySelectorAll(".menu-item").forEach((item, index) => {
  item.addEventListener("mouseleave", function () {
    console.log("index: ", index, ", false");
    menuOpen[index] = false;
    applyMenuState();
  });
});

function applyMenuState() {
  applyOpenedItems();
  applyClosedItems();
}

var menuItems = document.querySelectorAll(".menu-item");

function applyOpenedItems() {
  menuItems.forEach((item, index) => {
    if (!menuOpen[index]) {
      return;
    }

    //let parentElement = item.parentElement;
    let submenu = item.querySelector(".submenu");
    let submenuItems = submenu.querySelectorAll("li");
    let animationDelaySubmenuItems = 200;

    if (
      submenu.classList.contains("opening") ||
      submenu.classList.contains("closing")
    ) {
      return;
    }

    if (!submenu.classList.contains("active-submenu")) {
      submenu.classList.add("opening");
      let submenuHeight = submenuItems.length * 15; // Example height per item
      submenu.style.maxHeight = `${submenuHeight}px`;

      submenuItems.forEach((item, index) => {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = 1; // Trigger CSS transition
        }, animationDelaySubmenuItems * (index));
      });

      setTimeout(() => {
        submenu.classList.remove("opening");
        submenu.classList.add("active-submenu");
        applyMenuState();
      }, (submenuItems.length + 1) * animationDelaySubmenuItems);
    }
  });
}

var menuToggles = document.querySelectorAll(".toggle-submenu");

function applyClosedItems() {
  menuToggles.forEach((item, index) => {
    if (menuOpen[index]) {
      return;
    }
    let parentElement = item.parentElement;
    let submenu = parentElement.querySelector(".submenu");
    let submenuItems = submenu.querySelectorAll("li");
    let animationDelaySubmenuItems = 200;

    if (
      submenu.classList.contains("opening") ||
      submenu.classList.contains("closing")
    ) {
      return;
    }

    if (submenu.classList.contains("active-submenu")) {
      submenu.classList.remove("active-submenu");
      submenu.classList.add("closing");
      submenu.style.maxHeight = "0";

      submenuItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = 0; // Trigger CSS transition
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }, animationDelaySubmenuItems * (submenuItems.length - index - 1));
      });

      setTimeout(() => {
        submenu.classList.remove("closing");
        applyMenuState();
      }, (submenuItems.length + 1) * animationDelaySubmenuItems);
    }
  });
}
