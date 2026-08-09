$(function () {
    // 缓存学校编码
    var sSchooolCode = localStorage.getItem("SchoolCodeVlue");
    //暂存是否是老师还是学生  1 6是老师其它是学生
    var UserTypeVlue = localStorage.getItem("UserTypeVlue");
    //中国外交学院2098 加中英文
    fnReplaceText(sSchooolCode, UserTypeVlue);
    //清除'使用帮助'参数缓存(mainhome不显示’用户操作手册‘)
    sessionStorage.removeItem("CacheUseHelpParams");
    //目前只有石油华东大学有我的消息助手 
    if (typeof (messageShow) != "undefined" && messageShow == 1) {
        //我的消息助手 
        getMyMessageData()
    }
})
//中国外交学院2098 加中英文
function fnReplaceText(sSchooolCode, UserTypeVlue) {
    try {
        if (sSchooolCode === '2098' && UserTypeVlue !== '1' && UserTypeVlue !== '6') {
            var oMainHomeRightMore = $(".MainHomeRightMore");//更多
            var oNotice = $("#Notice");//通知公告
            var oPendingMatters = $("#PendingMatters");//待办事宜
            oMainHomeRightMore.each(function (i, cur) {
                $(cur).text("更多 More")
            });
            oNotice.text("通知公告 Announcement");
            oPendingMatters.text("待办事宜 Pending Matters");
            //国际交流管理事务
            var mainHomeList = $(".mainHomeList_01");
            var mainHomeLink = $(".mainHomeLink_01");
            mainHomeList.find("span.widget-caption > span").append(' International Exchange and Management Affairs');
            mainHomeLink.attr("title", "国际学生交流管理 International Student Exchange Management");
            mainHomeLink.find(".cardContent > span").append(' International Student Exchange Management');
            //右边子菜单 
            $("div[id^='rightMainHomeList']").each(function (i, cur) {
                var rMainHomeList_one = $(cur).find(".widget-caption span");
                var rMainHomeList_two = $(cur).find(".cards a.card");
                var rMainHomeList_twoText = rMainHomeList_two.find(".cardContent span");
                $.trim(rMainHomeList_one.text()) === '综合事务' ? rMainHomeList_one.append(" Integrated affairs") : "";
                $.trim(rMainHomeList_one.text()) === '基础模块' ? rMainHomeList_one.append(" Basic block") : "";
                $.trim(rMainHomeList_two.attr("title")) === '模板下载' ? rMainHomeList_two.attr("title", "模板下载Download the template") : "";
                $.trim(rMainHomeList_two.attr("title")) === '个人中心' ? rMainHomeList_two.attr("title", "个人中心Personal center") : "";
                $.trim(rMainHomeList_twoText.text()) === '模板下载' ? rMainHomeList_twoText.append(" Download the template") : "";
                $.trim(rMainHomeList_twoText.text()) === '个人中心' ? rMainHomeList_twoText.append(" Personal center") : "";
            })
        }
    } catch (e) {
        ;
    }
}
//菜单列表点击跳转列表页面方法
function fnJumpListPage(obj, url) {
    var functionCode = $(obj).data("functioncode");
    //跳转至外部链接（别人的系统）
    if (url && url.indexOf("LeftMenuT.do") == -1) {
        if ($.trim(url).toLowerCase() == "dialog") {//包含‘dialog’显示弹出框
            // showMenuModel(functionCode);
            parent.showMenuModel(functionCode);
            return false;
        } else {//跳转至外部链接
            parent.window.open(url, '_blank');
            return false;
        }
    }
    var fncode = url.split("?")[1].substr(13);
    fnGetTsUserToken(function (result) {
        var ts = result.ExtInfo;
        var userToken = result.ExtInfo2;
        var jsonObj = { ts: ts, userToken: userToken, FunctionCode: fncode };
        sessionStorage.setItem("CacheUseHelpParams", JSON.stringify(jsonObj));
    });
   
    //  $('#nav_list > li[data-fncode="0102"]', window.parent.document).click()
    //$('a[name="' + iframeUrl + '"]');
    $("#g-userHelp").show();
    parent.location = url;
  
}
//公示查看
function ShowPublicInfo(objurl) {
    var modalTrigger = new $.zui.ModalTrigger({
        type: "ajax", url: objurl + "&r=" + Math.random(),
        width: 860,
        title: '公示信息',
        onHide: function () {
        }
    });
    modalTrigger.show();
}
//我的消息助手 
function getMyMessageData() {
    laytplFunc('../Common/GetMessageList.do?v=' + Math.random(),
        {
            pageSize: 6,
            currentPageIndex: 1,
            IsClose: 0
        },
        '#MyMessageBox', 'MyMessageBoxApptemplate',
        function (list) {
        });
}


//我的消息助手 跳转方法
function fnJumpMessagePage(addressUrl, params) {
    if (addressUrl) { //特殊判断         
        if (addressUrl == "BenRenQueRen" && SchoolCodeInfoCheck == "2063") {
            var promiseTrigger = new $.zui.ModalTrigger({
                type: "ajax",
                width: "80%",
                url: "../StaffAbroad_2063/StepPromiseInfo.do?applyCode=" + params.Code + "&staffCode=" + params.SndCode + "&token=" + params.TokenKey,
                title: '本人确认',
                hidden: function () {
                    // location.reload();
                }
            });
            promiseTrigger.show();
        }
        else if (SchoolCodeInfoCheck == "2085") {
            if (addressUrl == "adminConfirm") {
                var returnUrl = "../StaffAbroad_2085/ListMyGroupInfo.do?ts=" + params.ts + "&userToken=" + params.userToken;
                localStorage.setItem("StepGroupMemberInfoReturnUrl", returnUrl);
                location = "../StaffAbroad_2085/StepGroupMemberInfo.do?applyCode=" + params.Code + "&staffCode=" + params.SndCode + "&token=" + params.TokenKey;
            }
            else if (addressUrl == "BefromConfirm") {
                location = "../StaffAbroad_2085/ApplyMilestone.do?applyCode=" + params.Code + "&TokenKey=" + params.TokenKey;
            }
        }

        else if (addressUrl == "WBApplyGroupReport" && SchoolCodeInfoCheck == "2015") {
            location = "../StaffAbroad_2015/WBApplyGroupReport.do?applyCode=" + params.Code + "&staffCode=" + params.SndCode + "&approvalNo=&TokenKey=" + params.TokenKey;
        }
        else if (addressUrl == "ApplyYearSumary" && SchoolCodeInfoCheck == "2015") {
            location = "../StaffAbroad_2015/ApplyYearSumary.do?groupCode=" + params.Code + "&AttachmentCataloryID=" + params.SndCode + "&TokenKey=" + params.TokenKey;
        }
        else if (addressUrl.includes("ApplyDetail") && SchoolCodeInfoCheck == "2063") {
            fnLoadingShow();
            $.ajax({
                url: '../Common/LogInfoHaveClose.do?v=' + Math.random(),
                type: "GET",
                data: params,
                dataType: "JSON",
                complete: function () {
                    fnLoadingHide();
                    location = addressUrl;
                    //location = "../StudentAbroad_2063/ApplyDetail.do?applyCode=" + params.Code + "&token=" + params.TokenKey + "&TokenKey=" + params.TokenKey + "&functionCode=0218";

                },
                success: function (rs) {
                },
                error: function (e) {
                }
            });
        }
        else {
            location = addressUrl;
        }
    }
    else {
        fnLoadingShow();
        $.ajax({
            url: '../Common/LogInfoHaveRead.do?v=' + Math.random(),
            type: "GET",
            data: params,
            dataType: "JSON",
            //async: false,
            //请求完成时，不管成功还是失败
            complete: function () {
                fnLoadingHide();
                location = addressUrl
            },
            success: function (rs) {
            },
            error: function (e) {
            }
        });
    }
}

//微信发布跳转方法  （说明 ：有点问题，在其它学校出来的话，菜单少的话，会出不来；）
function fnJumpWeixin(curObj, json) {
    // var $fatherEle = $("#nav_list", parent.document);
    var name = json.name;
    var fnCode = json.fnCode;
    var curofftop = parent.$(window.parent.document).find("#nav_list > li[data-fncode='" + fnCode + "']").data("offtop");
    parent.$(window.parent.document).find("#nav_list > li[data-fncode='0225']").addClass("open");
    parent.$(window.parent.document).find("#nav_list > li[data-fncode='0225'] .submenu").show();
    parent.$(window.parent.document).find("#nav_list > li[data-fncode='0225'] a[name^='" + name + "' ]").click();
    parent.$(window.parent.document).find("#menu_style").getNiceScroll(0).resize();
    parent.$(window.parent.document).find("#menu_style").getNiceScroll(0).doScrollTop(curofftop - 100, -1); // 滚动至底部
}


//我的消息助手 跳转更多
function fnJumpMoreList(curObj, json) {
    debugger
    // var $fatherEle = $("#nav_list", parent.document);
    var name = json.name;
    var fnCode = json.fnCode;
    var curofftop = parent.$(window.parent.document).find("#nav_list > li[data-fncode='" + fnCode + "']").data("offtop");
    parent.$(window.parent.document).find("#nav_list > li[data-fncode='" + fnCode + "']").addClass("open");
    parent.$(window.parent.document).find("#nav_list > li[data-fncode='" + fnCode + "'] .submenu").show();
    parent.$(window.parent.document).find("#nav_list > li[data-fncode='" + fnCode + "'] a[name^='" + name + "' ]").click();
    parent.$(window.parent.document).find("#menu_style").getNiceScroll().resize();
    parent.$(window.parent.document).find("#menu_style").getNiceScroll(0).doScrollTop(curofftop, -1); // 滚动至底部
}