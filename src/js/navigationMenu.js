async function main() {
  hideContent();
  const config = await loadConfig();
  var menuItems = config.categories.length;
  var menuOpen = [true].concat(new Array(menuItems - 1).fill(false));
  generateMenu(config.categories, menuOpen);
  preloadFirstImage(config);
  addHoverListeners(menuOpen);

  setTimeout(() => {
    displayContent();
  }, 1000);
}
main();

async function loadConfig() {
  try {
    const response = await fetch("./siteConfig.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const config = await response.json();
    return config;
  } catch (error) {
    console.error("Failed to fetch config:", error);
  }
}

function generateMenu(categories, menuOpen) {
  const navList = document.querySelector(".nav-list");
  if (!navList) {
    return;
  }
  navList.innerHTML = ""; // Clear existing menu items if any
  loadCarousel(categories[0]);

  categories.forEach((category, index) => {
    const li = document.createElement("li");
    if (index == 0) {
      li.className = "menu-item active";
    } else {
      li.className = "menu-item";
    }
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = category.name;
    a.className = "toggle-submenu";

    if (category.images != null) {
      a.classList.add("clickable");
      a.onclick = () => {
        var menuItems = document.querySelectorAll(".menu-item");
        if (menuItems[index].querySelectorAll(".closing").length > 0) {
          return;
        }
        loadCarousel(category); // Load images on click
        const allMenuItems = navList.querySelectorAll(".active");
        allMenuItems.forEach((menuItem) => menuItem.classList.remove("active"));
        a.classList.add("active");
        a.href="javascript:void(0);";
        menuOpen[index] = true;
        /*         var menuOpen = [true].concat(
          new Array(menuItems.length - 1).fill(false)
        ); */
        applyMenuState(menuOpen);
      };
    }

    const submenu = document.createElement("ul");
    submenu.className = "submenu";
    category.subcategories.forEach((sub) => {
      const subLi = document.createElement("li");
      const subA = document.createElement("a");
      subA.href = "#";
      subA.textContent = sub.name;
      subA.classList.add("clickable");
      subA.onclick = () => {
        var menuItems = document.querySelectorAll(".menu-item");
        if (menuItems[index].querySelectorAll(".closing").length > 0) {
          return;
        }
        loadCarousel(sub.content); // Load images on click
        const allMenuItems = navList.querySelectorAll(".active");
        allMenuItems.forEach((menuItem) => menuItem.classList.remove("active"));
        subA.classList.add("active");
        subA.href="javascript:void(0);";
        // TODO: collapse all other submenues
        /*         var menuOpen = [true].concat(
          new Array(menuItems.length - 1).fill(false)
        ); */
        /*         var menuOpen = new Array(menuItems.length); */
        menuOpen[index] = true;
        applyMenuState(menuOpen);
      };
      subLi.appendChild(subA);
      submenu.appendChild(subLi);
    });

    li.appendChild(a);
    li.appendChild(submenu);
    navList.appendChild(li);
  });
}

// TODO: outsource hideContent code
function displayContent() {
  document.body.style.opacity = 1;
}

function hideContent() {
  document.body.style.transition = "none"; // Temporarily disable the transition
  document.body.offsetHeight; // Force reflow to ensure the transition is really disabled
  document.body.style.opacity = "0"; // Change opacity without transition
  setTimeout(() => {
    document.body.style.transition = "opacity 0.8s ease-in-out"; // Re-enable the transition for next time
  }, 0); // Re-enable after the opacity change has taken effect
}

function addHoverListeners(menuOpen) {
  document.querySelectorAll(".toggle-submenu").forEach((item, index) => {
    item.addEventListener("mouseover", function () {
      menuOpen[index] = true;
      applyMenuState(menuOpen);
    });
  });

  document.querySelectorAll(".menu-item").forEach((item, index) => {
    item.addEventListener("mouseleave", function () {
      menuOpen[index] = false;
      applyMenuState(menuOpen);
    });
  });
}

/* document.querySelectorAll(".toggle-submenu").forEach((item, index) => {
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
}); */

function applyMenuState(menuOpen) {
  if (!menuOpen) {
    return;
  }

  applyOpenedItems(menuOpen);
  applyClosedItems(menuOpen);
}

function applyOpenedItems(menuOpen) {
  if (!menuOpen) {
    return;
  }

  var menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item, index) => {
    if (!menuOpen[index]) {
      return;
    }

    //let parentElement = item.parentElement;
    let submenu = item.querySelector(".submenu");
    let submenuItems = submenu.querySelectorAll("li");
    let animationDelaySubmenuItems = 200;

    let submenuItemsNames = submenu.querySelectorAll("li a"); // Select all <a> elements within <li> items
    for (let item of submenuItemsNames) {
      if (item.classList.contains("active")) {
        return true; // Return true as soon as one active <a> item is found
      }
    }

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
        }, animationDelaySubmenuItems * index);
      });

      setTimeout(() => {
        submenu.classList.remove("opening");
        submenu.classList.add("active-submenu");
        applyMenuState(menuOpen);
      }, (submenuItems.length + 1) * animationDelaySubmenuItems);
    }
  });
}

function applyClosedItems(menuOpen) {
  var menuToggles = document.querySelectorAll(".toggle-submenu");

  menuToggles.forEach((item, index) => {
    if (menuOpen[index]) {
      return;
    }
    let parentElement = item.parentElement;
    let submenu = parentElement.querySelector(".submenu");
    let submenuItems = submenu.querySelectorAll("li");
    let animationDelaySubmenuItems = 200;

    let submenuItemsNames = submenu.querySelectorAll("li a"); // Select all <a> elements within <li> items
    for (let item of submenuItemsNames) {
      if (item.classList.contains("active")) {
        return true; // Return true as soon as one active <a> item is found
      }
    }

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
        applyMenuState(menuOpen);
      }, (submenuItems.length + 1) * animationDelaySubmenuItems);
    }
  });
}

// TODO: is this necessary
const preloadFirstImage = (config) => {
  // Preload an image by creating a new Image object and setting its source
  const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
  };

  // Loop through each category in the config
  config.categories.forEach((category) => {
    // Preload the first image of the category if available
    if (category.images && category.images.length > 0) {
      preloadImage(category.images[0].url);
    }

    // Check for subcategories and preload the first image of each
    if (category.subcategories && category.subcategories.length > 0) {
      category.subcategories.forEach((subcategory) => {
        if (
          subcategory.content &&
          subcategory.content.images &&
          subcategory.content.images.length > 0
        ) {
          preloadImage(subcategory.content.images[0].url);
        }
      });
    }
  });
};

// Call the function with the provided config
