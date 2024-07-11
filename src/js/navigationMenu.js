const config = {
  pageTitle: "liva voigt",
  categories: [
    {
      name: "liva voigt",
      images: ["./assets/berlin_at_night/bspbildhorizontal.jpg"],
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
