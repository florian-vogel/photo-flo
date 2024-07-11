const config = {
  pageTitle: "liva voigt",
  categories: [
    {
      name: "liva voigt",
      images: ["./assets/photo/barcelona/bspbildhorizontal.jpg", "./assets/exhibitions/blendung/img_4697.jpg"],
      subcategories: [],
    },
    {
      name: "photo",
      subcategories: [
        {
          name: "barcelona",
          content: {
            text: null,
            images: ["./assets/berlin_at_night/IMG_4697.JPG"],
          },
        },
      ],
    },
  ],
};

document.title = config.pageTitle; // Set the page title

function generateMenu(categories) {
  const navList = document.querySelector(".nav-list");
  navList.innerHTML = ""; // Clear existing menu items if any
  loadCarousel(categories[0].images);

  categories.forEach((category) => {
    const li = document.createElement("li");
    li.className = "menu-item";
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = category.name;
    a.className = "toggle-submenu";

    const submenu = document.createElement("ul");
    submenu.className = "submenu";
    category.subcategories.forEach((sub) => {
      const subLi = document.createElement("li");
      const subA = document.createElement("a");
      subA.href = "#";
      subA.textContent = sub.name;
      subA.onclick = () => loadCarousel(sub.content.images); // Load images on click
      subLi.appendChild(subA);
      submenu.appendChild(subLi);
    });

    li.appendChild(a);
    li.appendChild(submenu);
    navList.appendChild(li);
  });
}

generateMenu(config.categories);




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