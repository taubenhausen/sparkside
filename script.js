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

// ============================================================
// Counter Animation (Entziffer-Zahlen)
// .sn HTML is e.g.:  40<span>+</span>
// We animate only the leading text node, preserving the span.
// ============================================================
(function () {
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animateCounter(textNode, target, duration) {
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased   = easeOutExpo(progress);
      textNode.nodeValue = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
      else textNode.nodeValue = target;
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var snEls = document.querySelectorAll(".stat .sn");
    if (!snEls.length) return;

    var triggered = false;

    var counters = Array.from(snEls).map(function (el) {
      // First child text node holds the number
      var textNode = null;
      for (var i = 0; i < el.childNodes.length; i++) {
        if (el.childNodes[i].nodeType === 3) { textNode = el.childNodes[i]; break; }
      }
      var target = parseInt((textNode ? textNode.nodeValue : el.textContent).replace(/\D/g, ""), 10) || 0;
      if (textNode) textNode.nodeValue = "0"; // reset to 0 before animating
      return { textNode: textNode, target: target };
    });

    if (!("IntersectionObserver" in window)) {
      counters.forEach(function (c) { if (c.textNode) c.textNode.nodeValue = c.target; });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          observer.disconnect();
          counters.forEach(function (c, i) {
            setTimeout(function () {
              if (c.textNode) animateCounter(c.textNode, c.target, 1500);
            }, i * 140);
          });
        }
      });
    }, { threshold: 0.5 });

    var statsSection = document.querySelector(".stats");
    if (statsSection) observer.observe(statsSection);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCounters);
  } else {
    initCounters();
  }
})();

// ============================================================
// Reliable video autoplay via IntersectionObserver (global)
// ============================================================
(function () {
  function initVideoAutoplay() {
    // Target both .vid-autoplay videos AND inline autoplay videos in .wi-img
    var videos = document.querySelectorAll(".vid-autoplay video, .wi-img video");
    if (!videos.length) return;

    if (!("IntersectionObserver" in window)) {
      videos.forEach(function (v) { v.play().catch(function(){}); });
      return;
    }

    videos.forEach(function (video) {
      // Skip videos already handled by inline scripts
      if (video.id && (video.id === "bar-vid-promo" || video.id === "bar-vid-reel")) return;

      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.play().catch(function () {});
          } else {
            e.target.pause();
          }
        });
      }, { threshold: 0.25 }).observe(video);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVideoAutoplay);
  } else {
    initVideoAutoplay();
  }
})();
