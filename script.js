// Menu toggle on phones and highlighting of the section in view (T09, CR-02)
document.addEventListener("DOMContentLoaded", function () {
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("site-nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close" : "Menu";
    });
    // Close the phone menu after choosing a section
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "Menu";
      });
    });
  }
  // Highlight the menu item of the section on screen
  var links = document.querySelectorAll('.nav a[href^="#"]');
  if (!("IntersectionObserver" in window) || !links.length) return;
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && byId[e.target.id]) {
        links.forEach(function (a) { a.classList.remove("active"); a.removeAttribute("aria-current"); });
        byId[e.target.id].classList.add("active");
        byId[e.target.id].setAttribute("aria-current", "true");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) obs.observe(s); });
});
