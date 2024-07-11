const config = {
  pageTitle: "liva voigt",
  categories: [
    {
      name: "liva voigt",
      images: [
        {
          description: "bsp bild horizontal",
          url: "./assets/photo/barcelona/bspbildhorizontal.jpg",
        },
        {
          description: "blendung exhib",
          url: "./assets/exhibitions/blendung/img_4697.jpg",
        },
      ],
      subcategories: [],
    },
    {
      name: "photo",
      subcategories: [
        {
          name: "barcelona",
          content: {
            text: null,
            images: [
              {
                description: "bsp bild vertikal 2",
                url: "./assets/photo/barcelona/bsp2bildervertikal.png",
              },
              {
                description: "bsp bild horizontal",
                url: "./assets/photo/barcelona/bspbildhorizontal.jpg",
              },
              {
                description: "bsp bild vertikal",
                url: "./assets/photo/barcelona/bspbildvertikal.jpg",
              },
            ],
          },
        },
        {
          name: "zookies",
          content: {
            text: null,
            images: [
              {
                description: "zookies first imgage",
                url: "./assets/photo/zookies/dscf9865-3.jpg",
              },
            ],
          },
        },
      ],
    },
    {
      name: "exhibitions",
      subcategories: [
        {
          name: "blendung",
          content: {
            text: null,
            images: [
              {
                description: "zookies first imgage",
                url: "./assets/photo/zookies/dscf9865-3.jpg",
              },
            ],
          },
        },
      ],
    },
    {
      name: "publications",
      subcategories: [
        {
          name: "my hands need to see what my eyes cant feel",
          content: {
            text: null,
            images: [
              {
                description: "zookies first imgage",
                url: "./assets/photo/zookies/dscf9865-3.jpg",
              },
            ],
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
      a.onclick = () => {
        loadCarousel(category.images); // Load images on click
        const allMenuItems = navList.querySelectorAll(".active");
        allMenuItems.forEach((menuItem) => menuItem.classList.remove("active"));
        a.className = "active";
      };
    }

    const submenu = document.createElement("ul");
    submenu.className = "submenu";
    category.subcategories.forEach((sub) => {
      const subLi = document.createElement("li");
      const subA = document.createElement("a");
      subA.href = "#";
      subA.textContent = sub.name;
      subA.onclick = () => {
        loadCarousel(sub.content.images); // Load images on click
        const allMenuItems = navList.querySelectorAll(".active");
        allMenuItems.forEach((menuItem) => menuItem.classList.remove("active"));
        subA.className = "active";
      };
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
        applyMenuState();
      }, (submenuItems.length + 1) * animationDelaySubmenuItems);
    }
  });
}
