/** MainHome 静态首页 — 卡片点击通知父级 shell 导航 */
(function () {
  function nav(path) {
    if (window.parent !== window) {
      window.parent.postMessage({ type: "audit-nav", path: path }, window.location.origin);
    } else {
      window.location.href = path;
    }
  }

  jQuery(function () {
    jQuery(document).on("click", "a[data-path]", function (e) {
      e.preventDefault();
      nav(jQuery(this).data("path"));
    });

    jQuery(document).on("click", "a[data-notice='1']", function (e) {
      e.preventDefault();
    });
  });
})();
