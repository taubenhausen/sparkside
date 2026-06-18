document.addEventListener("DOMContentLoaded", function () {
  // Cursor
  var cur = document.getElementById("cur");
  if (cur) {
    document.addEventListener("mousemove", function (e) {
      cur.style.left = e.clientX + "px";
      cur.style.top = e.clientY + "px";
    });
    document
      .querySelectorAll("a,button,.btn,.wi,.pi,.svi,.ncta,.logo,.tlink,.drw-cta,.fsub,.gal-item,.lb-prev,.lb-next,.lb-close")
      .forEach(function (el) {
        el.addEventListener("mouseenter", function () { cur.classList.add("big"); });
        el.addEventListener("mouseleave", function () { cur.classList.remove("big"); });
      });
  }

  // Burger
  var burg = document.getElementById("burg");
  var drw = document.getElementById("drw");
  if (burg && drw) {
    burg.addEventListener("click", function () {
      burg.classList.toggle("open");
      drw.classList.toggle("open");
    });
    window.closeDrawer = function () {
      burg.classList.remove("open");
      drw.classList.remove("open");
    };
  }

  // Scroll Nav
  var nav = document.getElementById("nav");
  if (nav) {
    window.addEventListener("scroll", function () {
      nav.classList.toggle("sc", window.scrollY > 30);
    }, { passive: true });
  }

  // Reveal Animation
  document.documentElement.classList.add("js");
  var revealItems = document.querySelectorAll(".rv:not(.in)");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07 });
    revealItems.forEach(function (el) { observer.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add("in"); });
  }

  // Gallery Lightbox
  (function () {
    var lb, lbImg, lbCount, gallery = [], idx = 0;

    function buildLb() {
      lb = document.createElement("div");
      lb.className = "lb";
      lb.setAttribute("role", "dialog");
      lb.setAttribute("aria-modal", "true");
      lb.innerHTML =
        '<div class="lb-inner"><img class="lb-img" src="" alt="Vorschau" /></div>' +
        '<button class="lb-close" aria-label="Schliessen">✕</button>' +
        '<button class="lb-prev" aria-label="Zurück">←</button>' +
        '<button class="lb-next" aria-label="Weiter">→</button>' +
        '<div class="lb-count"></div>';
      document.body.appendChild(lb);
      lbImg = lb.querySelector(".lb-img");
      lbCount = lb.querySelector(".lb-count");
      lb.querySelector(".lb-close").addEventListener("click", closeLb);
      lb.querySelector(".lb-prev").addEventListener("click", function () { move(-1); });
      lb.querySelector(".lb-next").addEventListener("click", function () { move(1); });
      lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    }

    function openLb(imgs, i) {
      if (!lb) buildLb();
      gallery = imgs; idx = i;
      show();
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeLb() {
      if (!lb) return;
      lb.classList.remove("open");
      document.body.style.overflow = "";
    }

    function move(dir) {
      idx = (idx + dir + gallery.length) % gallery.length;
      show();
    }

    function show() {
      lbImg.src = gallery[idx];
      lbCount.textContent = (idx + 1) + " / " + gallery.length;
    }

    document.addEventListener("keydown", function (e) {
      if (!lb || !lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    });

    // Init all .gal elements on the page
    document.querySelectorAll(".gal").forEach(function (gal) {
      var imgs = Array.from(gal.querySelectorAll(".gal-item img")).map(function (img) { return img.src; });
      gal.querySelectorAll(".gal-item").forEach(function (item, i) {
        item.addEventListener("click", function () { openLb(imgs, i); });
      });
    });
  })();

  // Portfolio filter tabs
  var tabs = document.querySelectorAll(".pf-tab");
  var items = document.querySelectorAll(".pi[data-cat]");
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var cat = tab.dataset.filter;
        items.forEach(function (item) {
          if (cat === "alle" || (item.dataset.cat && item.dataset.cat.indexOf(cat) !== -1)) {
            item.classList.remove("pf-hidden");
          } else {
            item.classList.add("pf-hidden");
          }
        });
      });
    });
  }
});

// Kontaktformular Demo
function submitForm() {
  alert("Vielen Dank — wir melden uns innerhalb von 24 Stunden.");
}
