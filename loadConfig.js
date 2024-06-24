document.addEventListener("DOMContentLoaded", function () {
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
