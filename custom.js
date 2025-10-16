/* === CUSTOM CLEVERCEL - Etiquetas de descuento con variables === */

(function () {
  // === CONFIGURACIÓN ===
  const DISCOUNT_THRESHOLDS = {
    low: 8, // Hasta este valor (inclusive)
    medium: 18,
    high: 30,
    // Mayor que "high" => extra
  };

  const CLASSES = [
    "discount--low",
    "discount--medium",
    "discount--high",
    "discount--extra",
  ];

  // === FUNCIONES ===
  function applyClass(el, pct) {
    el.classList.remove(...CLASSES);

    if (pct <= DISCOUNT_THRESHOLDS.low) {
      el.classList.add("discount--low");
    } else if (pct <= DISCOUNT_THRESHOLDS.medium) {
      el.classList.add("discount--medium");
    } else if (pct <= DISCOUNT_THRESHOLDS.high) {
      el.classList.add("discount--high");
    } else {
      el.classList.add("discount--extra");
    }

    el.dataset.discountApplied = "1";
    el.dataset.discountLast = String(pct);
  }

  function parsePct(text) {
    const m = (text || "").replace(/\s+/g, " ").match(/(\d+(?:[.,]\d+)?)\s*%/i);
    return m ? parseFloat(m[1].replace(",", ".")) : null;
  }

  function scanAll() {
    const labels = document.querySelectorAll(".product-label--sale");
    labels.forEach((el) => {
      const pct = parsePct(el.textContent);
      if (pct == null) return;

      const prev = el.dataset.discountLast
        ? parseFloat(el.dataset.discountLast)
        : null;
      if (prev !== null && prev === pct && el.dataset.discountApplied === "1")
        return;

      applyClass(el, pct);
    });
  }

  function boot() {
    scanAll();

    window.addEventListener("load", scanAll);
    document.addEventListener("shopify:section:load", scanAll);
    document.addEventListener("shopify:section:select", scanAll);
    document.addEventListener("shopify:section:deselect", scanAll);
    document.addEventListener("shopify:section:reorder", scanAll);

    const observer = new MutationObserver(() => {
      if (observer._raf) cancelAnimationFrame(observer._raf);
      observer._raf = requestAnimationFrame(scanAll);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Permite llamar manualmente desde consola
    window.recolorSaleLabels = scanAll;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
