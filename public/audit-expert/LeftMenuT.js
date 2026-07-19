// 说明 ：js相当于通用的，写的时候注意其它 页面
//外事导航 根据sourcetype判断来源
var WaiShiSourcetype = '';
var SourcePage = $.getUrlParam("Source");//来源首页（特殊版）
var JumpUrl = $.getUrlParam("JumpUrl");//来源地址（特殊版）
var sPageStyleType = pageStyleType;//首页版本：1简洁版（默认），2青春版，3透明版； 
var watchIframeScroll = 0;
var MenuTimer = null;
var MenuScrollTopTimer = null;
// 只有菜单的第二个菜单加小图标提示
//function addSmallIcon(obj, tit) {
//    var appendIconTips = $('<span class="icon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjExREUzOTQzMTM0QzExRUE4MEQyRDc1MTVGMTZDQkYxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjExREUzOTQ0MTM0QzExRUE4MEQyRDc1MTVGMTZDQkYxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTFERTM5NDExMzRDMTFFQTgwRDJENzUxNUYxNkNCRjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTFERTM5NDIxMzRDMTFFQTgwRDJENzUxNUYxNkNCRjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4z+I6FAAAGuklEQVR42uyd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"><div class="tips">' + tit + '</div></span>')
//    $(obj).addClass("liTipsItem");
//    $(obj).find("a").append(appendIconTips)
//}
$(function () {
    var SchoolCode = $("#SchoolCodeVlue").val();
    //是否显示东北师范 学生根据身份证号弹出提示语弹出框
    if (SchoolCode == "2045" && UserTypeInfo == 4 && ($.isEmpty(IdCardInfo))) {
        if (sessionStorage.getItem("ShowDaoYuModelCache") != "1") {
            $('#ShowDaoYuModel').modal({
                keyboard: false,
                show: true
            });
            sessionStorage.setItem("ShowDaoYuModelCache", "1");
        }
    }

    $("#sidebar-collapse").on("click", function () {
        $("#menu_style").getNiceScroll(0).resize();
    })
    //首页版本：1简洁版（默认），2青春版，3透明版； 
    if (sPageStyleType != "1" && !($.isEmpty(JumpUrl))) {
        var FormMainHomeWebVersionUrl = decodeURIComponent($.getUrlParam("JumpUrl"));
        $("#iframe").attr("src", FormMainHomeWebVersionUrl);
    }
    //$("#myShowMenuModel").modal().on('hidden.bs.modal', function () {
    //    window.location.reload();
    //});
    if ("undefined" != typeof (SourceCAFA)) {//美院相关
        // 左侧导航进来页面 默认展开
        $("#sidebar-collapse").click()
    }
    // 缓存学校编码
    localStorage.setItem('SchoolCodeVlue', $("#SchoolCodeVlue").val());
    var sSchooolCode = localStorage.getItem("SchoolCodeVlue");
    //暂存是否是老师还是学生  1 6是老师其它是学生
    localStorage.setItem('UserTypeVlue', $("#UserTypeVlue").val());
    var UserTypeVlue = localStorage.getItem("UserTypeVlue");
    var cid = $('#nav_list> li>.submenu');
    // 只有菜单的第二个菜单加小图标提示
    //var cidChildLi = $('#nav_list > li').eq(1).find("ul.submenu > li");
    //cidChildLi.each(function (j, curEle) {
    //    if ($(curEle).parents("li").data("fncode") == '0101') {//只有文教项目才要加提示
    //        var childlinkName = $(curEle).find("a").attr("name");
    //        var childlinkTit = $(curEle).find("a").attr("title");
    //        if (childlinkName.indexOf('ProjectReport.do?IsPlatform=2') !== -1 || childlinkTit.indexOf('项目总结查询') !== -1) {//项目总结查询
    //            addSmallIcon(curEle, '项目总结在此查询修改')
    //        } else if (childlinkName.indexOf('ProjectReport.do?IsPlatform=1') !== -1 || childlinkTit.indexOf('平台总结查询') !== -1) {//平台总结查询
    //            addSmallIcon(curEle, '平台总结在此查询修改')
    //        } else if (childlinkName.indexOf('ProjectSummarySndList') !== -1 || childlinkTit.indexOf('往年(2019前)总结查询') !== -1) {//往年总结查询
    //            addSmallIcon(curEle, '往年(2019前)总结在此查询修改')
    //        } else if (childlinkName.indexOf('ReceptionAuditList.do') !== -1 || childlinkTit.indexOf('报销查询') !== -1) {//报销查询
    //            addSmallIcon(curEle, '报销申请在此查询修改')
    //        }
    //        else if (childlinkName.indexOf('ReceptionSummaryList.do') !== -1 || childlinkTit.indexOf('总结来访专家查询') !== -1) {//总结来访专家查询
    //            addSmallIcon(curEle, '总结来访专家在此查询');
    //            $(curEle).addClass("liTipsItem4");
    //        }
    //    }
    //});
    $("#menu_style").niceScroll({
        // ========== 滚动条样式 ==========
        cursorcolor: "#aeaeae",       // 滚动条颜色
        cursorwidth: "4px",           // 滚动条宽度
        cursorborderradius: "4px",   // 圆角
        cursorborder: "none",        // 无边框
        cursoropacitymin: 0.3,       // 不滚动时透明度
        cursoropacitymax: 0.8,       // 滚动时透明度

        // ========== 行为 ==========
        autohidemode: true,          // 不滚动自动隐藏
        scrollspeed: 60,             // 滚动速度
        mousescrollstep: 40,         // 滚轮步幅
        smoothscroll: true,          // 平滑滚动
        hwacceleration: true,        // 硬件加速
        enablemousewheel: true,      // 启用滚轮
        enablekeyboard: true,        // 启用方向键
        sensitiverail: true,         // 点击轨道可滚动

        // ========== 轨道 ==========
        background: "#f1f1f1",       // 轨道背景色
        railalign: "right",          // 滚动条靠右
        railpadding: { top: 5, right: 0, left: 0, bottom: 5 }
    });
    //是否显示隐藏菜单滚动条
    if (SchoolCode == "2025") {
        $("#menu_style").getNiceScroll().show();
    } else {
        $("#menu_style").getNiceScroll().hide();
    }
 
    //滚动后的回调方法，可以查看滑动值
    //$("#menu_style").getNiceScroll(0).scrollend(function (e) {
    //    console.error(e,e.end)
    //    // TODO
    //});
    //一级菜单点击方法
    $(" #nav_list > li > a.dropdown-toggle").on('click', function () {
        
        var functionCode = $(this).data("fncode");
        var thUrl = $(this).data("url");
        //跳转至外部链接（别人的系统）
        if (thUrl && thUrl.indexOf("LeftMenuT.do") == -1) {
            if ($.trim(thUrl).toLowerCase() == "dialog") {//包含‘dialog’显示弹出框
                showMenuModel(functionCode);
                return false;
            } else {//跳转至外部链接
                parent.window.open(thUrl, '_blank');
                return false;
            }
        }
        if ("undefined" != typeof (SourceCAFA)) {//跳转至美院页面
            $("#firstHome").attr("href", "CAFALeftMenuT.do");
        } else if (sPageStyleType != "1") {
            $("#firstHome").attr("href", "MainHome.do");
        }
        var navLiLendth = $(" #nav_list > li").length;
        if ($(this).parent("li").hasClass("active")) {
            $(this).parent("li").removeClass("active");
            $(this).parent("li").removeClass("open");
            $(this)[0].click();
        }
        //$("#menu_style").getNiceScroll(0).resize();
        if ($(this).parent("li").siblings().hasClass("open") || $(this).parent("li").siblings().hasClass("active")) {
            $(this).parent("li").siblings().removeClass("open");
            $(this).parent("li").siblings().removeClass("active");
            $(this).parent("li").siblings().find(".submenu").hide();
            $(".hasThreeMenu,.ChildThreeMenu").removeClass("cur");
            //最后一个点击 滚动到头部
            if ($(this).parent("li").index() == navLiLendth - 1) {
                var iframeSrcAttr = $("#iframe").attr("src").toLowerCase();
                if (iframeSrcAttr && iframeSrcAttr.includes("mainhome.do")) {
                    var childIframeLastLink = $("#iframe").contents().find("a[data-functioncode='0211']")[0];
                    if ($(childIframeLastLink).length > 0) {
                        $(childIframeLastLink).trigger("click");
                    }
                }
                $("#menu_style").getNiceScroll(0).doScrollTop(10000, 1); // 滚动至底部
            }
        }
        //菜单滚动条resize
        MenuTimer = setTimeout(function () {
            $("#menu_style").getNiceScroll(0).resize();
        }, 10);
        clearTimeout(clearTimeout);

    })
    cid.each(function (i, domEle) {
        $(this).attr('id', "Sort_link_" + i);
    });
    //左侧导航折叠之后再次点击菜单展开导航
    $('#menu_style > ul>li').click(function () {
        if (!($('this').parents('.sidebar').hasClass('menu-min'))) {
            $('#menu_style').parents('.sidebar').removeClass('menu-min');
        }
    });
    //中国外交学院2098 加中英文
    fnReplaceText(sSchooolCode, UserTypeVlue);
  
    if (SchoolCode == "2010")
    {//额外检查
        CheckShowUserLackInfo();
    }

    $("#R_StaffName").bind("input propertychange", function (event) {
        getAutoCompleteStaffNameData("R_StaffName", "R_StaffCode");
    });

    //$.each($(".submenu"), function () {
    //    var $aobjs = $(this).children("li");
    //    var rowCount = $aobjs.length;
    //    var divHeigth = $(this).height();
    //    $aobjs.height(divHeigth / rowCount);
    //});
    //初始化宽度、高度
    $("#main-container").height($(window).height() - 110);
    $("#iframe").height($(window).height() - 157);
    $(".sidebar").height($(window).height() - 104);
    var thisHeight = $("#nav_list").height($(window).outerHeight() - 157);
    $(".submenu").height();
    $("#nav_list").children(".submenu").css("height", thisHeight);
    //当文档窗口发生改变时 触发
    $(window).resize(function () {
        $("#main-container").height($(window).height() - 110);
        $("#iframe").height($(window).height() - 157);
        $(".sidebar").height($(window).height() - 104);
        var thisHeight = $("#nav_list").height($(window).outerHeight() - 157);
        $(".submenu").height();
        $("#nav_list").children(".submenu").css("height", thisHeight);
    });
    //左边导航子级a标签点击事件
    $(document).on('click', '.iframeurl', function () {
        if ("undefined" != typeof (SourceCAFA)) {//美院相关
            $("#firstHome").parent("li").removeClass("firstHome");//去掉左边导航 的‘首页’当前状态 
            $("#firstHome").attr("href", "CAFALeftMenuT.do");
        } else if (sPageStyleType != "1") {
            $("#firstHome").parent("li").removeClass("firstHome");//去掉左边导航 的‘首页’当前状态 
            $("#firstHome").attr("href", "MainHome.do");
        }
        var cid = $(this).attr("name");
        var cname = $(this).attr("title");
        var fname = $(this).parents("ul").siblings("a").attr("title");
        $("#iframe").attr("src", cid).ready();
        //中间内容 顶部面包屑展示方法
        fnBreadcrumbs(fname, cname, cid);
        $(".hasThreeMenu,.ChildThreeMenu").removeClass("cur");
        //获取 ts,UserToken,FunctionCode值
        if (cid) {
            fnGetTsUserTokenFnCode(cid);
        }
    });
    //三级子菜单列表点击方法
    $(".ChildThreeMenu > li > a").on('click', function () {
        if ("undefined" != typeof (SourceCAFA)) {//美院相关
            $("#firstHome").parent("li").removeClass("firstHome");//去掉左边导航 的‘首页’当前状态 
            $("#firstHome").attr("href", "CAFALeftMenuT.do");
        } else if (sPageStyleType != "1") {
            $("#firstHome").parent("li").removeClass("firstHome");//去掉左边导航 的‘首页’当前状态 
            $("#firstHome").attr("href", "MainHome.do");
        }
        var cid = $(this).attr("name");
        var cname = $(this).attr("title");
        var fname = $(this).parents("ul").siblings("a").attr("title");
        $("#iframe").attr("src", cid).ready();
        //中间内容 顶部面包屑展示方法
        fnBreadcrumbs(fname, cname, cid);
        $(this).parent().addClass("cur").siblings().removeClass("cur");
        if ($(".ChildThreeMenu > li").hasClass("active")) {
            $(".ChildThreeMenu > li").removeClass("active")
        }
        //获取 ts,UserToken,FunctionCode值
        if (cid) {
            fnGetTsUserTokenFnCode(cid)
        }
    })

    $('#nav_list,.link_cz').find('li.home').on('click', function () {
        //$('#nav_list,.link_cz').find('li.home').removeClass('active');
        $(this).addClass('active').siblings().removeClass('active');
        //if ("undefined" != typeof (SourceCAFA)) {//美院相关
        //    $("#firstHome").attr("href", "CAFALeftMenuT.do");//让左边导航第一个a标签点击
        //}
    });

 


    //初始化获取首页传的地址
    var sIframeAddreess = "";
    var getTwoUrl = $("#nav_list > li.active > ul.submenu > li.active > a").attr("name");//获取二级菜单url
    var getThreeUrl = $("#nav_list > li.active > ul.submenu > li > ul.ChildThreeMenu > li.active > a").attr("name");//获取三级菜单 url
    if ($("#nav_list > li.active > ul.submenu > li").hasClass("active")) {
        sIframeAddreess = getTwoUrl;
    } else {
        sIframeAddreess = getThreeUrl;
        $("#nav_list > li.active > ul.submenu > li > ul.ChildThreeMenu > li.active").trigger("click");
        $("#nav_list > li.active > ul.submenu > li > ul.ChildThreeMenu > li.active").parent().siblings("a").addClass("cur");
        $("#nav_list > li.active > ul.submenu > li > ul.ChildThreeMenu > li.active").parent().addClass("cur");
    }
    if (sIframeAddreess) document.getElementById('iframe').src = sIframeAddreess;
    //刷新当前界面
    $('#shuaxin').click(function () {
        $('#iframe').get(0).contentWindow.location.reload(true);
    })
    //获取iframe的url
    var iframeUrl = $("#iframe").attr("src");
    var iframeName = $('a[name="' + iframeUrl + '"]').attr("title");
    var iframeParents = $('a[name="' + iframeUrl + '"]').parents("ul").siblings("a").attr("title");
    //中间内容 顶部面包屑展示方法
    fnBreadcrumbs(iframeParents, iframeName, iframeUrl);
    //首页侧边栏收起
    if (iframeUrl === 'MainHome.do' || iframeUrl === 'CAFAMainHome.do') { //MainHome.do:默认；CAFAMainHome.do:中央美院
        $(".Current_page").parents("ul").removeClass("breadcrumb");
        $('#sidebar').addClass('menu-min');
        $('#sidebar-collapse').children('i').addClass('icon-youkuohao');
        $('#sidebar-collapse').children('i').removeClass('icon-cebianlan');
    }
    else if (iframeUrl.search('InterStudent/StudentInfoStep.do') != -1) {
        $(".Current_page").parents("ul").removeClass("breadcrumb");
        $('#sidebar').addClass('menu-min');
        $('#sidebar-collapse').children('i').addClass('icon-cebianlan');
        $('#sidebar-collapse').children('i').removeClass('icon-youkuohao');
    } else {
        $(".Current_page").parents("ul").addClass("breadcrumb");
        $('#sidebar').removeClass('menu-min');
        $('#sidebar-collapse').children('i').addClass('icon-cebianlan');
        $('#sidebar-collapse').children('i').removeClass('icon-youkuohao');
    };
    fnGetTsUserTokenFnCode(iframeUrl);
    clearTimeout(MenuScrollTopTimer);
    MenuScrollTopTimer = setTimeout(function () {
        setMenuScrollTop();
    }, 50);

    //外部系统跳转至外事系统 pc、mobile 跳转方法
    externalJumpHandler();

});

//右边菜单点击后，左边菜单回到当前的主菜单的位置  (右边菜单点击后调用)
function setMenuScrollTop() {
    var scroll = $("#menu_style").getNiceScroll(0);
    var $box = $("#menu_style");
    var nav_listLiLength = $('#nav_list > li').length;
    var navScrollTop = 0;
    for (var i = 0; i < nav_listLiLength; i++) {
        if ($('#nav_list > li').eq(i).hasClass('active')) {
            //$("#menu_style").scrollTop(i * 42);
            navScrollTop = i * 42;
        }
    }
    $box.animate({ scrollTop: navScrollTop }, 100);
    scroll.resize();
}

//中国外交学院2098 加中英文
function fnReplaceText(sSchooolCode, UserTypeVlue) {
    try {
        if (sSchooolCode === '2098' && UserTypeVlue !== '1' && UserTypeVlue !== '6') {
            var oRefresh = $("#shuaxin");//刷新 
            var oFirstHome = $("#firstHome");//左边第一个菜单 首页
            var oLogOut = $("#LogOut");//退出登录
            //面包屑 首页
            var oBreadcrumbs = $("#breadcrumbs");
            var breadcrumbsChildFirst = oBreadcrumbs.find("ul li:first-of-type");
            var breadcrumbsChildFirstText = $.trim(breadcrumbsChildFirst.text());
            oRefresh.html("刷新当前界面/Refresh the current interface");
            oFirstHome.attr("title", "首页<br>Homepage");
            oFirstHome.find("span.menu-text").html("首页<br>Homepage");
            oLogOut.html("<i></i>退出系统 Log out");
            //是否是‘首页’还是‘个人资料提交’
            breadcrumbsChildFirstText === '首页' ? breadcrumbsChildFirst.html("" + "<i class=\"iconfont icon-zhuye\"></i>\n" + "<a href=\"LeftMenuT.do\">首页<br>Homepage</a>") : breadcrumbsChildFirst.html("" + "<i class=\"iconfont icon-zhuye\"></i>\n" + "<a href=\"LeftMenuT.do\">个人资料提交<br>Submission of personal data</a>");
            //左侧菜单栏 
            var leftMenuLi = $("#nav_list > li");
            var oTwoMenuText = {
                tit1: '留学生报名申请查询<br>Application inquiry for international student',
                tit2: '留学生接机申请查询<br>Pick-up application inquiry for international student',
                tit3: '留学生住宿记录查询<br>Accommodation record Query for international Student',
                tit4: '模板文件管理<br>Template file management',
                tit5: '通知公告查询<br>Announcement inquiry',
                tit6: '密码修改<br>Change Password',
            }
            $(leftMenuLi).each(function (i, cur) {
                var oDropdownLink = $(cur).find(".dropdown-toggle");
                var oDropdownLinkTit = $.trim($(oDropdownLink).attr("title"));
                var oMenuText = $(cur).find(".menu-text");
                var oMenuCont = $.trim($(oMenuText).text());
                var oMenuTwoUl = $(cur).find(".submenu");
                var oMenuTwoUlLi = $(oMenuTwoUl).find("li");
                $(oMenuTwoUlLi).each(function (i, oCur) {
                    var oMenuTwoUlLink = $(oCur).find("a[id^='inner']");
                    var oMenuTwoUlLinkText = $.trim($(oMenuTwoUlLink).text());
                    oMenuTwoUlLinkText === '留学生报名申请查询' ? $(oMenuTwoUlLink).html(oTwoMenuText.tit1).attr("title", oTwoMenuText.tit1) : '';
                    oMenuTwoUlLinkText === '留学生接机申请查询' ? $(oMenuTwoUlLink).html(oTwoMenuText.tit2).attr("title", oTwoMenuText.tit2) : '';
                    oMenuTwoUlLinkText === '留学生住宿记录查询' ? $(oMenuTwoUlLink).html(oTwoMenuText.tit3).attr("title", oTwoMenuText.tit3) : '';
                    oMenuTwoUlLinkText === '模板文件管理' ? $(oMenuTwoUlLink).html(oTwoMenuText.tit4).attr("title", oTwoMenuText.tit4) : '';
                    oMenuTwoUlLinkText === '通知公告查询' ? $(oMenuTwoUlLink).html(oTwoMenuText.tit5).attr("title", oTwoMenuText.tit5) : '';
                    oMenuTwoUlLinkText === '密码修改' ? $(oMenuTwoUlLink).html(oTwoMenuText.tit6).attr("title", oTwoMenuText.tit6) : '';
                })
                oMenuCont == '国际学生交流管理' ? oMenuText.append("<br>International Student Exchange Management") : '';
                oMenuCont == '模板下载' ? oMenuText.append("<br>Download the template") : '';
                oMenuCont == '外事动态' ? oMenuText.append("<br>Foreign Affairs") : '';
                oMenuCont == '个人中心' ? oMenuText.append("<br>Personal center") : '';
                oDropdownLinkTit == '国际学生交流管理' ? $(oDropdownLink).attr("title", "国际学生交流管理<br>International Student Exchange Management") : '';
                oDropdownLinkTit == '模板下载' ? $(oDropdownLink).attr("title", "模板下载<br>Download the template") : '';
                oDropdownLinkTit == '外事动态' ? $(oDropdownLink).attr("title", "外事动态<br>Foreign Affairs") : '';
                oDropdownLinkTit == '个人中心' ? $(oDropdownLink).attr("title", "个人中心<br>Personal center") : '';
            });
        }
    } catch (e) {
    }
}

//有三级子菜单点击方法
function fnThreeMenu(obj) {
    $(obj).parent().siblings().find(".hasThreeMenu").removeClass("cur");
    $(obj).parent().siblings().find(".ChildThreeMenu").removeClass("cur");
    $(obj).toggleClass("cur");
    //$("#menu_style").getNiceScroll(0).doScrollTop(10000, 1); // 滚动至底部
    if ($(obj).hasClass("cur")) {
        $(obj).next(".ChildThreeMenu").addClass("cur");
    } else {
        $(obj).next(".ChildThreeMenu").removeClass("cur");
    }
    $(obj).next(".ChildThreeMenu").find("li").removeClass("cur");
    //$(obj).next(".ChildThreeMenu").toggleClass("cur");
}

var myframe = {};
myframe.initIframeHeight = function initIframeHeight() {
    // $("#preloader").hide();//加载动画隐藏
    var iframe = $("#iframe");
    iframe.get(0).height = 0;
    var pageHeight = window.innerHeight || document.documentElement.clientHeight;
    var navHeight = $("#sidebar").height() + $("#breadcrumbs").height();
    var height = iframe.contents().find('body').outerHeight(true);
    height = Math.max(height, pageHeight - navHeight);
    if (height > pageHeight - navHeight) {
        iframe.get(0).height = iframe.get(0).parentNode.style.height = height + 30;
    } else {
        iframe.get(0).height = iframe.get(0).parentNode.style.height = height - 20;
    }
    if ($(window.top).scrollTop() !== 0) {
        $("html,body").animate({ scrollTop: 0 }, 1000);
    }
    if ($("#iframe").attr("src") != "MainHome.do") {
        $("#nav_list > li:first").removeClass("open")
    }
    //需要改版的学校  清华Body-2025、南方科技大学Body-2247、成都中医药Body-2207
    var SchoolStyleArr = ["2025","2085","2207","2247"];
    //清华大学 给iframe里的body单独加样式
    if (SchoolStyleArr.includes(SchoolCode) ) {
        var $childBody = $("#iframe").contents().find("body");
        $childBody.addClass("Body-" + SchoolCode);
    }
}
//中间内容 顶部面包屑展示方法
function fnBreadcrumbs(iframeParents, iframeName, iframeUrl) {
    var functionCode = $.getStrUrlVal(iframeUrl, "functioncode");
    var homeText = showEn == "1" ? "首页/Home" : "首页";
    //var link = "undefined" != typeof (SourceCAFA) ? 'CAFALeftMenuT.do' : 'LeftMenuT.do';//SourceCAFA 美院
    var link = "";
    if ("undefined" != typeof (SourceCAFA)) {
        link = "CAFALeftMenuT.do"
    } else if (sPageStyleType != "1") {
        link = "MainHome.do"
    } else {
        link = "LeftMenuT.do";
    }
    var $breadcrumbs = $("#breadcrumbs");
    var $breadcrumbsLiFirst, $breadcrumbsLiTwo, $breadcrumbsLiThree, $breadcrumbsLiCont;
    var sFirstVal = LeftMenuFlag != 1 ? homeText : "个人资料提交"
    $breadcrumbsLiFirst = '<li><i class="iconfont icon-zhuye"></i><a href="' + link + '">' + sFirstVal + '</a></li>';
    $breadcrumbsLiCont = $breadcrumbsLiFirst
    var filterArr = ["2025","2247"];//过滤面包屑英文、空格等学校
    if ('undefined' !== typeof (iframeParents) && iframeParents != '') {
        if (filterArr.includes(SchoolCode)) iframeParents = removeEnglishCharacters(iframeParents);
        $breadcrumbsLiTwo = ' <li class="active" style=" cursor: pointer;" onclick="fnGoCurListPage(\'' + iframeUrl + '\',\'' + functionCode + '\')"><span class="Current_page">' + iframeParents + '</span></li>';
        $breadcrumbsLiCont = $breadcrumbsLiFirst + $breadcrumbsLiTwo;
    }
    if ('undefined' !== typeof (iframeName) && iframeName != '') {
        if (filterArr.includes(SchoolCode)) iframeName = removeEnglishCharacters(iframeName);
        $breadcrumbsLiThree = ' <li class="active" id="parentIframe"><span class="parentIframe">' + iframeName + '</span></li>';
        $breadcrumbsLiCont = $breadcrumbsLiFirst + $breadcrumbsLiTwo + $breadcrumbsLiThree;
    }
    $breadcrumbs.find(".breadcrumbs_ul").html($breadcrumbsLiCont).ready();
}
//过滤除英文、换行符
function removeEnglishCharacters(str) {
    return str.replace(/[a-zA-Z]/g, '').replace(/[\r\n]/g, '').replace(/\ +/g, '').replace(/\//g, '').replace(/<>/g, '').replace(/\(\)/g,'');
    //return str
}


function EnableUserSessionNotTimeOut() {
    $.ajax({
        url: "../Main/EnableUserSessionNotTimeOut.do",
        data: null,
        type: "POST",
        dataType: "json",
        async: true,
        success: function (rs) {
        }
    });
}

//返回外事大数据菜单列表
function fnLinkForeignPage(url) {
    $("#iframe").attr("src", url).ready();
}

//外部系统跳转至外事系统 pc、mobile 跳转方法
function externalJumpHandler() {
    var UrlAddress = decodeURIComponent(location.href);
    var newStr = UrlAddress.split("daibanUrl=")[1];
    if (UrlAddress.indexOf('daiban=1') > -1 && !$.isEmpty(newStr)) {
        //location.href = UrlAddress;
        if (isMoble) {//移动端
            location.href = newStr + "&LinkType=Mobile";
        } else {
            var $FatherIframe = $("#iframe");
            $FatherIframe.attr("src", newStr);
            $("#sidebar").attr("class", "sidebar menu-min");
            $('#sidebar').addClass('menu-min');
            $('#sidebar-collapse').children('i').addClass('icon-youkuohao');
            $('#sidebar-collapse').children('i').removeClass('icon-cebianlan');

        }
    }
}


//============服务助手============start
//type 1为用户手册，2为留言
function fnServerHJump(type) {
    var jsonObj = {};
    var CacheUseHelpParams = sessionStorage.getItem("CacheUseHelpParams");
    if (CacheUseHelpParams) {
        jsonObj = $.extend({}, JSON.parse(CacheUseHelpParams));
        if (type == 1) {
            showServerHelp(jsonObj);
        } else if (type == 2) {
            showLiuyanModel(jsonObj);
        } else if (type == 3) {
            showAizhushouModel(jsonObj);
        }
        
    } else {//当前页为首页 ，并打开模块列表
        showModuleList(type);

    }
   
}
//显示留言板弹出框 
function showLiuyanModel(jsonObj) {
    var title = "", LinkUrl = "";
    if (!$.isEmpty(jsonObj.FunctionName)) {
        title = jsonObj.FunctionName
    } else {
        title = $("#breadcrumbs").find(".Current_page").text();
        LinkUrl = encodeURI($("#iframe").data("src"));
    }
    var liuyanIframeUrl = "../QuestionAnswerManager/AddQuestionAnswer.do?RFunctionCode=" + jsonObj.FunctionCode + "&QuestionRelatedUrl=" + LinkUrl;
    $("#myLiuyanModelIframe").attr("src", liuyanIframeUrl);
    $("#myLiuyanModel").find(".modal-title").html("留言板" + "<span style='color:red'>（" + title + "）</span>");
    $('#myLiuyanModel').modal({
        name: "留言板",
        keyboard: true,
        show: true
    });
}
//关闭留言弹出框 
function closeLiuyanModel() {
    $('#myLiuyanModel .close').click();
}

//显示用户手册弹出框 
function showServerHelp(jsonObj) {
    var title = "";
    if (!$.isEmpty(jsonObj.FunctionName)) {
        title = jsonObj.FunctionName
    } else {
        title = $("#breadcrumbs").find(".Current_page").text();
    }
    $("#myUseHelpModel").find(".modal-title").html("用户操作手册" + "<span style='color:red'>（" + title + "）</span>");
    fnLoadingShow();
    $.ajax({
        url: '../Common/GetUserManualByFunctionCode.do',
        data: jsonObj,
        type: "GET",
        dataType: "json",
        complete: function () {
            fnLoadingHide();
            $('#myUseHelpModel').modal({
                name: "用户操作手册",
                keyboard: true,
                show: true
            });
        },
        success: function (result) {
            if (result.success == "y") {
                var ObjParams = result.ObjParams;
                if (ObjParams) {
                    $("#myUseHelpModel").find(".modal-body").html("<pre>"+ObjParams+"</pre>");
                } else {
                    $("#myUseHelpModel").find(".modal-body").html('<div class="text-center" style="font-size: 16px;padding-top: 57px;">该模块尚未上传用户操作手册！</div>');
                }
            }
        },
        error: function (e) {
        }
    });
}

//ai助手弹出框 
function showAizhushouModel(jsonObj) {
    fnLoadingShow();
    var title = "", LinkUrl = "";
    if (!$.isEmpty(jsonObj.FunctionName)) {
        title = jsonObj.FunctionName
    } else {
        title = $("#breadcrumbs").find(".Current_page").text();
        LinkUrl = encodeURI($("#iframe").data("src"));
    }
    var liuyanIframeUrl = "../AIChatHelper/AIzhushou.do?RFunctionCode=" + jsonObj.FunctionCode + "&QuestionRelatedUrl=" + LinkUrl;
    $("#myAizhushouModelIframe").attr("src", liuyanIframeUrl);
    //$("#myAizhushouModel").find(".modal-title").html("AI助手" + "<span style='color:red'>（" + title + "）</span>");
    $('#myAizhushouModel').modal({
        name: "AI助手",
        keyboard: true,
        show: true
    })
    $('#myAizhushouModel').on('shown.zui.modal', function () {
        fnLoadingHide();
    })
}
//关闭ai助手弹出框 
function closeAizhushouModel() {
    $('#myAizhushouModel .close').click();
}

//显示模块列表
function showModuleList(type) {
    $("#myModuleModel").find(".modal-title").html("模块列表（<span style='color:red'>请选择相关模块</span>）");
    $('#myModuleModel').modal({
        name: "模块列表",
        keyboard: true,
        show: true
    });
    fnLoadingShow();
    $.ajax({
        url: '../Main/GetAllFunctionDashBoardLink.do',
        data: {},
        type: "POST",
        dataType: "json",
        async: false,
        complete: function () {
            fnLoadingHide();
        },
        success: function (rs) {
            $("#dataListContainer").empty();
            if (rs.success == "y") {
                var data = rs.DataList;
                var json = {};
                json.type = type;
                var dataList = [];
                if (data.length > 0) {
                    $.each(data, function (i, n) {
                        if (n.IsValid) {
                            dataList.push(n);
                        }
                    })
                }
              
                json.DataList = dataList;
                var gettpl = document.getElementById("appTemplate").innerHTML;
                laytpl(gettpl).render(json, function (html) {
                    var className ="";
                    var datalen = json.DataList.length;
                    if(datalen >= 5 && datalen <= 10){
                        className = "dialog5to10"
                    }else if(datalen >10 && datalen <=15){
                        className = "dialog10to15"
                    }else if(datalen >15 && datalen <=20){
                        className = "dialog15to20"
                    }else{
                        className = "dialogMax"
                    }
                    $("#myModuleModel .modal-dialog").addClass(className);
                    $("#dataListContainer").html(html);
                });
            }
        },
        error: function (e) {
        }
    });
}
//点击模块方法
function fnOpernModuleHandler(FunctionCode, FunctionName, showModelType) {
    $('#myModuleModel').modal('hide');
    var jsonObj = {};
    fnGetTsUserToken(function (rs) {
        jsonObj = {
            ts: rs.ExtInfo,
            userToken: rs.ExtInfo2,
            FunctionCode: FunctionCode,
            FunctionName: FunctionName,
            showModelType: showModelType
        }
        if (showModelType == 1) {//用户手册
            showServerHelp(jsonObj);
        } else if (showModelType == 2) {//留言板
            showLiuyanModel(jsonObj);
        } else if (showModelType == 3) {//ai助手
            showAizhushouModel(jsonObj);
        }
      
    })


    if (showModelType == 1) {//用户助手 
       
     
    } else if (showModelType == 2) {//留言咨询

    }
}
//获取ts 、usertokne、function
function fnGetTsUserTokenFnCode(url) {
    var fnCode = url.indexOf("functioncode") != -1 ? "functioncode":"functionCode";
    if (url.indexOf(fnCode) != -1) {
       // $("#g-userHelp").show();
        var ts = $.getStrUrlVal(url, "ts");
        var userToken = $.getStrUrlVal(url, "userToken");
        var FunctionCode = $.getStrUrlVal(url, fnCode);
        var jsonObj = { ts: ts, userToken: userToken, FunctionCode: FunctionCode };
        sessionStorage.setItem("CacheUseHelpParams", JSON.stringify(jsonObj));
    } else {
       // $("#g-userHelp").hide();
        sessionStorage.removeItem("CacheUseHelpParams");
    }
}
//获得页面ts && userToken值
function fnGetTsUserToken(callBack) {
    $.ajax({
        url: '../Common/GetDaiBanOtherData.do',
        data: {},
        type: "POST",
        dataType: "json",
        success: function (result) {
            if (result.success == "y") {
                callBack && callBack(result);
            }
        },
        error: function (e) {
        }
    });
}
//============服务助手============end
function GlobalLinkPage(fnCode, alias) {
    try {
        if (!fnCode && !alias) {
            throw new Error("左边菜单fnCode不存在或者data-alias 没有值！！")
        } else {
            var firstli = "#nav_list > li[data-fncode=" + fnCode + "]";
            var submenuChildLi = firstli + "> .submenu > li";
            var hasCurAlias = "#nav_list > li[data-fncode=" + fnCode + "] a[data-alias=" + alias + "]";
            $("#sidebar-collapse > i.iconfont").attr("class", "iconfont icon-cebianlan");
            $("#sidebar").attr("class", "sidebar");
            $(firstli).addClass("open active").siblings().removeClass("open active");
            $(submenuChildLi).addClass("active").siblings().removeClass("active");
            $(firstli + "> .submenu").show;
            if ($(hasCurAlias).parents("ul.ChildThreeMenu").length > 0) {
                $("ul.ChildThreeMenu").removeClass("cur");
                $("ul.ChildThreeMenu > li").removeClass("acitve");
                $(hasCurAlias).parents("ul.ChildThreeMenu").parent(".home").addClass("active").siblings().removeClass("active");
                $(hasCurAlias).parents("ul.ChildThreeMenu").addClass("cur");
                $(hasCurAlias).parents("ul.ChildThreeMenu").prev(".hasThreeMenu").addClass("cur");
                $(hasCurAlias).parent("li").addClass("cur").siblings().removeClass("cur");
            } else {
                $(hasCurAlias).parent(".home").addClass("active").siblings().removeClass("active");
            }
        }
    } catch (e) {
        console.error(e);
    }
}

//获取申报须知数据
function getSBNoticeData(functioncode) {
    $.ajax({
        url: "../SystemManager/getFunctionDetail.do?v=" + Math.random(),
        data: {
            FuncitonCode: functioncode
        },
        type: "GET",
        async:false,
        dataType: "json",
        success: function (data) {
            if (data.success == "y") {
                var newData = JSON.parse(data.info);
                var sInfo = newData.FunctionInfo.ShenQingXuZhi;
                var sTitle = newData.FunctionInfo.Name;
                // $("#myShowMenuTit").html(sTitle + '申报须知');
                $("#myShowMenuTit").html(sTitle);
                if ($.isEmpty(sInfo)) {
                    $("#myShowMenuBody").html('<div class="text-center" style="font-size: 16px;padding-top: 57px;">暂无内容！</div>');
                } else {
                    $("#myShowMenuBody").html(sInfo);
                    if ($("#myShowMenuBody").height() >= 500) {
                        $("#myShowMenuBody").css("overflow-y", "scroll")
                    }
                }
            } else {
                bootbox.alert({ message: "页面异常！", size: 'small' });
            }
        },
        error: function (e) {
            bootbox.alert({ message: "页面异常！", size: 'small' });
        }
    });
}
//点击菜单 包含‘dialog’显示弹出框
function showMenuModel(functioncode) {
    $("#myShowMenuModel").modal().on('shown.bs.modal', function () {
        getSBNoticeData(functioncode);
    });
    $("#myShowMenuModel").modal().on('hidden.bs.modal', function () {
        $("#myShowMenuTit").html('');
        $("#myShowMenuBody").html('');
    });
}
//下拉菜单跳转方法
function fnJumpLeftMenu(FunctionCode, PageName) {
    try {
        var $fatherLi = $("#nav_list > li[data-fncode='" + FunctionCode + "']");
        var $submenu = $fatherLi.find(".submenu");
        var $childEle = $submenu.find("a[name*='" + PageName + "']");
        $fatherLi.addClass("open");
        $submenu.show();
        $childEle.click();
        $("#menu_style").getNiceScroll(0).doScrollTop(960, -1); // 滚动至底部
    } catch (err) {
    }
}
//面包屑跳转方法
function fnGoCurListPage(iframeUrl, functionCode) {
    var $curLink = $('a[name="' + iframeUrl + '"]');
    $curLink.click();
    $curLink.parent().addClass("active");
    $curLink.parents("li[data-fncode=\'" + functionCode + "\']").addClass("open").siblings().removeClass("open");
    $curLink.parents("li[data-fncode=\'" + functionCode + "\']").find("ul.submenu").show();
    $curLink.parents("li[data-fncode=\'" + functionCode + "\']").addClass("open").siblings().find("ul.submenu").hide();
}

//============检查是否要给用户弹窗============start=====
var initUserInfo = {
    show: function () {
        $('#UserInfoModal').modal({
            show: true
        })
    },
    hide: function () {
        $('#UserInfoModal').modal('hide')
    },
}

function CheckShowUserLackInfo() {
    $.ajax({
        url: '../Main/CheckShowUserLackInfoFun.do',
        type: 'POST',
        data: {},
        dataType: "json",
        success: function (rs) {
            if (rs.success == "y") {
                $("#AgencyName").val(rs.ObjFirst_Four);
                $("#Name").val(rs.ObjFirst_One);
                $("#IDCardCode").val(rs.ObjFirst_Three);
                $("#Mobile").val(rs.ObjFirst_Two);
                $("#LoginNetID").val(rs.ObjFirst_Five);

                $("#userCodeForEdit").val(rs.ExtInfo);
                $("#userTokenForEdit").val(rs.ExtInfo2);
                initUserInfo.show();//显示
            }
        },
        error: function (e) {
            bootbox.alert({ message: "加载异常", size: 'small' });
        }
    });
}

function SaveUserLackInfo() {
    var UserLackInfo = {};
    UserLackInfo.Code = $("#userCodeForEdit").val();
    UserLackInfo.TokenKey = $("#userTokenForEdit").val();
    UserLackInfo.Name = $("#Name").val();
    UserLackInfo.IDCardCode = $("#IDCardCode").val();
    UserLackInfo.Mobile = $("#Mobile").val();
    UserLackInfo.LoginNetID = $("#LoginNetID").val();

    if (!UserLackInfo.Name) {
        bootbox.alert({ message: "姓名不能为空", size: 'small' });
        return false;
    }

    if (!UserLackInfo.IDCardCode) {
        bootbox.alert({ message: "身份证号不能为空", size: 'small' });
        return false;
    }

    if (!UserLackInfo.Mobile) {
        bootbox.alert({ message: "移动电话不能为空", size: 'small' });
        return false;
    }

    if (!UserLackInfo.LoginNetID) {
        bootbox.alert({ message: "工号不能为空", size: 'small' });
        return false;
    }

    $.ajax({
        url: '../Main/SaveUserLackInfoFun.do',
        type: 'POST',
        data: UserLackInfo,
        dataType: "json",
        success: function (rs) {
            if (rs.success == "y") {
                initUserInfo.hide();//隐藏
            }
            else
                bootbox.alert({ message: "保存失败", size: 'small' });
        },
        error: function (e) {
            bootbox.alert({ message: "保存异常", size: 'small' });
        }
    }); 
}

//============检查是否要给用户弹窗============end====



// 复旦 9000 oauth2 退出方式
function fnJumpFuDan9000()
{ 
    location = "https://id.fudan.edu.cn/idp/authCenter/GLO?redirectToLogin=true&redirectToUrl=http%3A%2F%2Fgatzj.fudan.edu.cn%2FFUDANGATHome.aspx";
}

function fnJumpFuDan2046() {
    location = "https://id.fudan.edu.cn/idp/authCenter/GLO?redirectToLogin=true&redirectToUrl=http%3A%2F%2Flhdj.fudan.edu.cn%2FFUDANHome.aspx";
}

//-------------------------------------------------切换至学生身份------------------------------------------------------------
function changeToStudentFun()
{
    $("#RelatedInfoShow").click();
}

function changeStudentIdentity()
{
    var StudentCodeInfo = $("#R_StaffCode").val();
    var StudentTokenInfo = $("#R_StaffToken").val();

    if (!StudentCodeInfo || !StudentTokenInfo  ) {
        alert("获取学生信息有误，请重新尝试。");
        return false;
    }

    $.ajax({
        url: './UniformIdentityForSchool/CheckUserGoOnOrNoFor2025.do',
        type: "POST",
        data: { "StudentCode": StudentCodeInfo, "StudentToken": StudentTokenInfo, "StaffCode": "", "TypeInfo": 2 },
        complete: function () {
            fnLoadingHide("正在跳转中...");
        },
        dataType: "JSON",
        success: function (rs) { 
            if (rs.success == "y") {
                var url = rs.ExtInfo;
                location = url;
            } else {
                bootbox.alert({
                    message: rs.msg, size: 'small', callback: function () {
                        alert("非授权操作，请重新登录。");
                        return false;
                    }
                });
            }
        },
        error: function (e) {
            alert("网络错误，请重新登录。");
        }
    });
}

function getAutoCompleteStaffNameData(StaffName, StaffCode) {
    ClearAutoComplete(StaffName);

    var DSAccountInfo = $("#" + StaffName).val();
    var nametext = $("#" + StaffName).val();

    $('#' + StaffName).autocompleter({
        highlightMatches: true,
        source: "../Dict/getAutoCompleteStudentWithAgency.do?top=15&name=" + DSAccountInfo + "&OptionValueType=2",
        template: '{{ label }}',
        hint: false,
        empty: true,
        limit: 10,
        cache: false,
        combine: function () {
        },
        callback: function (value, index, selected) {
            if (selected) {
                $("#" + StaffCode).val(selected.id);
                $("#" + StaffName).val(selected.thdValue);
                $("#R_StaffToken").val(selected.token);
            } else {
                $("#" + StaffCode).val("");
                $("#" + StaffName).val("");
                $("#R_StaffToken").val("");
            }
        }
    });
}

function ClearAutoComplete(AgencyId) {
    $("#" + AgencyId).autocompleter("destroy");
}

//-------------------------------------------------切换至学生身份------------------------------------------------------------