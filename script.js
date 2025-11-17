document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    once: true,
  });

  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".header__nav");
  const navItems = document.querySelectorAll(".header__nav-item");
  const body = document.body;

  const closeMenu = () => {
    burger.classList.remove("active");
    nav.classList.remove("active");
    body.style.overflow = "";
  };

  burger.addEventListener("click", function () {
    this.classList.toggle("active");
    nav.classList.toggle("active");
    body.style.overflow = this.classList.contains("active") ? "hidden" : "";
  });

  navItems.forEach((item) => {
    item.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (e) => {
    if (
      !nav.contains(e.target) &&
      !burger.contains(e.target) &&
      nav.classList.contains("active")
    ) {
      closeMenu();
    }
  });

  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          closeMenu();
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
      } else {
        closeMenu();
      }
    });
  });

  ymaps.ready(function () {
    const map = new ymaps.Map("map", {
      center: [53.902735, 27.554676],
      zoom: 16,
      controls: ["zoomControl", "fullscreenControl"],
    });

    const placemark = new ymaps.Placemark(
      [53.902735, 27.554676],
      {
        balloonContent:
          "<strong>ООО «Делософт»</strong><br>г. Минск, ул. Немига, дом 5, пом. 61",
      },
      {
        preset: "islands#yellowDotIcon",
      }
    );

    map.geoObjects.add(placemark);
    map.behaviors.disable("scrollZoom");
  });
});
