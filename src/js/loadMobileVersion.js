function checkWidth() {
  const currentPath = window.location.pathname;
  if (window.innerWidth < 1100 || isMobileOrTablet()) {
    if (!currentPath.includes("mobile.html")) {
      window.location.href = "mobile.html";
    }
  } else {
    if (!currentPath.includes("index.html")) {
      window.location.href = "index.html";
    }
  }
}

function isMobileOrTablet() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  const isMobi =
    /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet|Phone/i.test(
      userAgent
    );
  console.log(isMobi);
  return isMobi;
}

window.onload = checkWidth;
window.onresize = checkWidth;
