/* Text-size button: Normal -> Large -> Larger, remembered on this device. Loaded in <head> so the
   saved size applies before the page paints; the button is added to the header once the page loads. */
(function () {
  var KEY = "pd-text-size", names = ["Normal", "Large", "Larger"], root = document.documentElement;
  function get() { try { return parseInt(localStorage.getItem(KEY) || "0", 10) % 3 || 0; } catch (e) { return 0; } }
  function set(n) {
    if (n) root.setAttribute("data-ts", String(n)); else root.removeAttribute("data-ts");
    try { localStorage.setItem(KEY, String(n)); } catch (e) {}
  }
  set(get());
  function addButton() {
    var host = document.querySelector(".top .wrap");
    if (!host || host.querySelector(".ts-btn")) return;
    var b = document.createElement("button");
    b.type = "button"; b.className = "ts-btn";
    b.innerHTML = '<small aria-hidden="true">A</small><span aria-hidden="true">A</span>';
    function label() { var n = get(); b.setAttribute("aria-label", "Text size: " + names[n] + ". Tap for " + names[(n + 1) % 3].toLowerCase() + " text."); b.title = "Text size: " + names[n]; }
    b.addEventListener("click", function () { set((get() + 1) % 3); label(); });
    label();
    var nav = host.querySelector(".nav");
    if (nav && nav.nextSibling) host.insertBefore(b, nav.nextSibling); else host.appendChild(b);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addButton); else addButton();
})();
