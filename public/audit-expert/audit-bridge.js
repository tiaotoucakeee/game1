/**
 * 审核工作台静态外壳桥接 — 替换 LeftMenuT.js 后端依赖
 */
(function () {
  var STORAGE_KEY = "cuc-arg-game-state";
  var SESSION_KEY = "audit-session-active";
  var COLLEGE_HOME = "/anima";

  var ROUTES = {
    "/audit/dashboard": ["首页"],
    "/audit/graduates": ["毕业生档案审核", "优秀毕业生名单"],
    "/audit/student": ["毕业生档案审核", "学生档案查询"],
    "/audit/lab": ["资源与项目", "实验室申请记录"],
    "/audit/project": ["资源与项目", "学生项目查询"],
    "/audit/submit": ["审核结论", "提交审核意见"],
  };

  var MENU = [
    { path: "/audit/dashboard", title: "首页", icon: "icon-shouye", home: true },
    {
      title: "毕业生档案审核",
      icon: "icon-xuesheng",
      items: [
        { path: "/audit/graduates", title: "优秀毕业生名单" },
        { path: "/audit/student", title: "学生档案查询" },
      ],
    },
    {
      title: "资源与项目",
      icon: "icon-daiban",
      items: [
        { path: "/audit/lab", title: "实验室申请记录" },
        { path: "/audit/project", title: "学生项目查询" },
      ],
    },
    {
      title: "审核结论",
      icon: "icon-xitong",
      items: [{ path: "/audit/submit", title: "提交审核意见" }],
    },
  ];

  function getRoute() {
    var params = new URLSearchParams(window.location.search);
    return params.get("route") || "/audit/dashboard";
  }

  function isSectionActive(item, activePath) {
    if (!item.items) return false;
    return item.items.some(function (sub) {
      return sub.path === activePath;
    });
  }

  function buildNav(activePath) {
    var html = "";
    MENU.forEach(function (item) {
      if (item.path) {
        var on = activePath === item.path;
        html +=
          '<li class="' +
          (on ? "active open" : "") +
          '"><a href="javascript:void(0)" class="iframeurl" data-path="' +
          item.path +
          '" title="' +
          item.title +
          '"><i class="iconfont ' +
          item.icon +
          '"></i><span class="menu-text">' +
          item.title +
          "</span></a></li>";
        return;
      }

      if (!item.items || !item.items.length) return;

      var open = isSectionActive(item, activePath);
      html += '<li class="' + (open ? "open active" : "") + '">';
      html +=
        '<a href="javascript:void(0)" class="dropdown-toggle" title="' +
        item.title +
        '"><i class="iconfont ' +
        item.icon +
        '"></i><span class="menu-text">' +
        item.title +
        '</span><b class="arrow1 iconfont icon-xiala"></b></a>';
      html += '<ul class="submenu">';
      item.items.forEach(function (sub) {
        var subOn = sub.path === activePath;
        html +=
          '<li class="home' +
          (subOn ? " active" : "") +
          '"><a href="javascript:void(0)" class="iframeurl" data-path="' +
          sub.path +
          '" title="' +
          sub.title +
          '"><i class="iconfont icon-youkuohao"></i>' +
          sub.title +
          "</a></li>";
      });
      html += "</ul></li>";
    });
    return html;
  }

  function updateSidebarLayout() {
    var collapsed = jQuery("#sidebar").hasClass("menu-min");
    var $icon = jQuery("#sidebar-collapse i");
    if (collapsed) {
      $icon.removeClass("icon-youkuohao").addClass("icon-cebianlan");
    } else {
      $icon.removeClass("icon-cebianlan").addClass("icon-youkuohao");
    }
    resizeIframe();
  }

  function toggleSidebar() {
    jQuery("#sidebar").toggleClass("menu-min");
    updateSidebarLayout();
  }

  function renderBreadcrumb(path) {
    var crumbs = ROUTES[path] || ["首页"];
    var html =
      '<li><i class="iconfont icon-zhuye"></i><a href="javascript:void(0)" data-path="/audit/dashboard">首页</a></li>';
    crumbs.forEach(function (c, i) {
      if (i === 0 && c === "首页") return;
      html += "<li>" + c + "</li>";
    });
    jQuery("#breadcrumbList, .breadcrumbs_ul").first().html(html);
  }

  function resizeIframe() {
    var $iframe = jQuery("#iframe");
    if (!$iframe.length) return;
    var navH = jQuery(".navbar").outerHeight() || 70;
    var footer = jQuery(".footerInfo").outerHeight() || 30;
    var crumbs = jQuery(".breadcrumbs").outerHeight() || 41;
    var h = Math.max(360, jQuery(window).height() - navH - crumbs - footer);
    jQuery("#main-container, #sidebar, #nav_list, #menu_style").css({ height: "auto", minHeight: 0 });
    $iframe.height(h);
  }

  window.myframe = {
    initIframeHeight: resizeIframe,
  };

  function iframeSrcForRoute(path) {
    if (path === "/audit/dashboard") {
      return "/audit-expert/MainHome-arg.html";
    }
    return path + "?embed=1";
  }

  function loadRoute(path, pushParent) {
    if (pushParent && window.parent !== window) {
      window.parent.postMessage({ type: "audit-nav", path: path }, window.location.origin);
      return;
    }
    renderBreadcrumb(path);
    jQuery("#nav_list").html(buildNav(path));
    bindNav();
    jQuery("#iframe").attr("src", iframeSrcForRoute(path));
    resizeIframe();
  }

  function bindNav() {
    jQuery(document)
      .off("click.auditBridge", ".iframeurl")
      .on("click.auditBridge", ".iframeurl", function (e) {
        e.preventDefault();
        loadRoute(jQuery(this).data("path"), true);
      });
    jQuery("#breadcrumbList, .breadcrumbs_ul")
      .off("click.auditBridge")
      .on("click.auditBridge", "a[data-path]", function (e) {
        e.preventDefault();
        loadRoute(jQuery(this).data("path"), true);
      });
    jQuery("#nav_list")
      .off("click.auditBridge", ".dropdown-toggle")
      .on("click.auditBridge", ".dropdown-toggle", function (e) {
        e.preventDefault();
        var $li = jQuery(this).parent();
        if (jQuery("#sidebar").hasClass("menu-min")) {
          jQuery("#sidebar").removeClass("menu-min");
          updateSidebarLayout();
          jQuery("#nav_list > li").removeClass("open");
          $li.addClass("open");
          return;
        }
        var wasOpen = $li.hasClass("open");
        jQuery("#nav_list > li").removeClass("open");
        if (!wasOpen) {
          $li.addClass("open");
        }
      });
  }

  function logout() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var s = JSON.parse(raw);
        s.auditLoggedIn = false;
        s.auditRememberUntil = null;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      }
      sessionStorage.removeItem(SESSION_KEY);
    } catch (err) {}
    (window.top || window).location.href = COLLEGE_HOME;
  }

  jQuery(function () {
    jQuery("#ProductName").text("数字媒体中心审核工作台");
    jQuery("#ProductNameEn").text("Digital Media Center Audit Workbench");
    jQuery(".g-userinfo-dropdown a").first().contents().filter(function () {
      return this.nodeType === 3;
    }).first().replaceWith("临时审核员");
    jQuery(".g-userinfo .li02 a, #logoutBtn").attr("href", "javascript:void(0)").off("click").on("click", function (e) {
      e.preventDefault();
      logout();
    });
    jQuery("#shuaxin").off("click").on("click", function () {
      var src = jQuery("#iframe").attr("src");
      jQuery("#iframe").attr("src", src);
    });
    jQuery("#sidebar-collapse, #menu-toggler").off("click").on("click", function (e) {
      e.preventDefault();
      toggleSidebar();
    });

    bindNav();
    updateSidebarLayout();
    jQuery("body").removeClass("navbar-fixed breadcrumbs-fixed");
    loadRoute(getRoute(), false);
    jQuery(window).on("resize", resizeIframe);
    jQuery("#iframe").on("load", resizeIframe);

    window.addEventListener("message", function (e) {
      if (e.origin !== window.location.origin) return;
      var data = e.data;
      if (data && data.type === "audit-route" && data.path) {
        loadRoute(data.path, false);
      }
      if (data && data.type === "audit-nav" && data.path) {
        loadRoute(data.path, true);
      }
      if (
        data &&
        (data.type === "cuc-audit-terminal-unlocked" || data.type === "cuc-game-state-sync") &&
        window.parent &&
        window.parent !== window
      ) {
        window.parent.postMessage(data, window.location.origin);
      }
    });

    // 阻止原版 ajax 跳转
    jQuery.ajax = function () {
      return jQuery.Deferred().reject().promise();
    };
  });
})();
