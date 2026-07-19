var _secret0 = "77643AE57A1A983E92BAE186711AE461";
var _secret1 = "EASTELITE";
var pubCurSchoolCode = localStorage.getItem("SchoolCodeVlue");//当前学校shoolcode
var noEnSchoolCodeValArr = ["2031"];//不需要英文提示的学校
var pubNoDataTips = "暂未查询到符合条件的数据<br/>No qualified data has been queried yet"; //没数据内容的提示
if (pubCurSchoolCode) {
    if (noEnSchoolCodeValArr.indexOf(pubCurSchoolCode) != -1) {//不需要英文提示的学校
        pubNoDataTips = "暂未查询到符合条件的数据"
    }
}
//详情页面插入在iframe里面时，查看图片弹出层不能fixed(外事年报，合作伙伴，外事搜索 )；
var $paratsDetailIframeId = $("#detailIframe", parent.document);//父级id
var addressUrl = location.href.toLowerCase();
// 1. 初始化请求下拉数据计数器和 loading 显示
var ajaxRequestCount = 0;
//loading动画Html
var oLoadingAnimateHtml = ' <div class="LoadingBox" id="LoadingBox01">\n' +
    '        <div class="LoadingBox-cont">\n' +
    '            <div class="pic"></div>\n' +
    '            <p class="text">正在加载数据...</p>\n' +
    '        </div>\n' +
    '    </div>';
//html转码（编辑页面输入input,显示用字符展示）
var htmlUtil = {
    htmlEncode: function (html) {
        //1.首先动态创建一个容器标签元素，如DIV
        var temp = document.createElement("div");
        //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
        (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
        //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
        var output = temp.innerHTML;
        temp = null;
        return output;
    },
    htmlDecode: function (text) {
        //1.首先动态创建一个容器标签元素，如DIV
        var temp = document.createElement("div");
        //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
        temp.innerHTML = text;
        //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    }
};
$(function () {
    //获取schoolInfo functionCode
    GetConfigData();
})
//将"&amp;"转义字符转成"&" 方法add 20221117 
function replaceEscape(str) {
    if (str) {
        return str.replace(/&amp;/g, "&");
    }
    return "";
};
var common = {
    /**
      * 编辑页面初始化loding效果
      * @param {formId} form表单id
      * @param {exceptIds} 不需要select的id, 以逗号分隔，如“xx,xx”
      * @param {millisecond} 定时器毫秒数，默认为1000毫秒
      */
    fnInitLoading: function (option) {
        fnLoadingShow();
        var defatltOpt = {
            formId: "",
            exceptIds: "",
            millisecond: 500
        };
        var newOpt = $.extend(defatltOpt, option);
        var exceptArr = [];
        if (!$.isEmpty(newOpt.exceptIds)) {
            exceptArr = newOpt.exceptIds.split(",");
        }
        var arr = [];
        $(newOpt.formId).find("select").each(function (i, cur) {
            var attrVal = $(cur).attr("attrvalue");
            var ParentDisplay = $(cur).parent().css("display");
            var isParentShow = ParentDisplay == "block";//父级显示，才执行
            if (cur.id && isParentShow && !($.isEmpty(attrVal))) {
                if (!$.isEmpty(exceptArr)) {
                    if (exceptArr.indexOf(cur.id) < 0) {
                        arr.push({ id: cur.id, value: 0 });
                    }
                }
                else {
                    arr.push({ id: cur.id, value: 0 });
                }
            }
        });
        var timer = null;
        var maxCloseTime = 0;
        clearInterval(timer);
        try {
            timer = setInterval(function () {
                var j = 0;
                $.each(arr, function (i, cur) {
                    if (cur.value == 0) {
                        var optionLen = $("#" + cur.id + " >option").length;
                        if (optionLen > 0) {
                            cur.value = 1;
                        }
                    }
                    else {
                        j++;
                    }
                })
                maxCloseTime = maxCloseTime + newOpt.millisecond;
                if (j == arr.length || maxCloseTime > 6000) {//millisecond秒后自动关闭
                    fnLoadingHide();
                    clearInterval(timer);
                }
            }, newOpt.millisecond);
        } catch (e) {
            fnLoadingHide();
        }
    },
    initAll: function (options) {
    },
    selectEvent: function (e) {
        var targetId = e.data.targetId;
        if (targetId) $(targetId).val($(this).val());
        // 处理事件
        if (e.data.event && e.data.event.length > 0) {
            var sId = $(this).val();// 选择的值
            var text = $(this).find("option:selected").text()
            for (var i = 0; i < e.data.event.length; i++) {
                var eObj = e.data.event[i];
                var id = eObj.id;
                var tId = eObj.targetId;
                var tIdArr = tId.split(",");
                if ("!readonly" == eObj.type) {
                    if (id == sId) {
                        for (var j = 0; j < tIdArr.length; j++) {
                            $(tIdArr[j]).removeAttr("readonly").css("background-color", "#fff");
                        }
                    } else {
                        for (var j = 0; j < tIdArr.length; j++) {
                            $(tIdArr[j]).val("").attr("readonly", true).css("background-color", "#e0e0e0");
                        }
                    }
                } else if ("show" == eObj.type) {
                    if (id == sId) {
                        for (var j = 0; j < tIdArr.length; j++) {
                            $(tIdArr[j]).show();
                        }
                    } else {
                        for (var j = 0; j < tIdArr.length; j++) {
                            $(tIdArr[j]).hide();
                        }
                    }
                } else if ("showAndRequired" == eObj.type) {
                    if (id == sId) {
                        for (var j = 0; j < tIdArr.length; j++) {
                            var $input = $(tIdArr[j].replace("Div", ""));
                            $input.attr("datatype", "*");
                            $(tIdArr[j]).show();
                        }
                    } else {
                        for (var j = 0; j < tIdArr.length; j++) {
                            var $input = $(tIdArr[j].replace("Div", ""));
                            $input.val("").removeAttr("datatype");
                            $(tIdArr[j]).hide();
                        }
                    }
                } else if ("hide" == eObj.type) {
                    if (id == sId) {
                        for (var j = 0; j < tIdArr.length; j++) {
                            $(tIdArr[j]).hide();
                        }
                    } else {
                        for (var j = 0; j < tIdArr.length; j++) {
                            $(tIdArr[j]).show();
                        }
                    }
                } else if ("clean" == eObj.type) {
                    if (id == sId) {
                        for (var j = 0; j < tIdArr.length; j++) {
                            $(tIdArr[j]).val("");
                        }
                    }
                } else if ("cleanA" == eObj.type) {
                    if (id != sId) {
                        for (var j = 0; j < tIdArr.length; j++) {
                            $(tIdArr[j]).val("");
                        }
                    }
                } else if ("changeSelect" == eObj.type) {
                    for (var j = 0; j < tIdArr.length; j++) {
                        var inputs = $(tIdArr[j] + " :input[name*='vti-']");
                        var index = $(this).prop('selectedIndex');
                        if (index > -1) {
                            inputs.val("");
                            var input = inputs.eq(index);
                            if (input) {
                                input.val(1);
                            }
                        }
                    }
                } else if ("reset" == eObj.type) {
                    for (var j = 0; j < tIdArr.length; j++) {
                        try {
                            $(tIdArr[j]).val("");
                            $(tIdArr[j]).trigger("select2:updated");
                            $(tIdArr[j] + " :input[name*='vti-']").val("");
                            $(tIdArr[j]).change();
                        } catch (e) {
                        }
                    }
                } else if ("!disabled" == eObj.type) {
                    if (id == sId) {
                        for (var j = 0; j < tIdArr.length; j++) {
                            $(tIdArr[j]).removeAttr("disabled").css("background-color", "#fff");
                        }
                    } else {
                        for (var j = 0; j < tIdArr.length; j++) {
                            $(tIdArr[j]).val("").attr("disabled", true).css("background-color", "#e0e0e0");
                        }
                    }
                } else if ("cascade" == eObj.type) {
                    for (var j = 0; j < tIdArr.length; j++) {
                        var u = eObj.url;
                        if (!u) {
                            u = "../Dict/GetProvinceCity.do?isRoot=false&cityProvinceCode=" + sId;
                        } else {
                            var reg = /[\u4e00-\u9fa5]/g;
                            if (reg.test(sId)) {//含有中文则需要编码
                                sId = encodeURIComponent(sId);
                            }
                            u += sId;
                        }
                        try {
                            $(tIdArr[j]).select2().select2("destroy");
                        } catch (e) {
                        }
                        $(tIdArr[j]).empty();
                        common.initSelect({
                            id: tIdArr[j],
                            url: u,
                            value: eObj.value,
                            customRequired: eObj.customRequired
                        });
                    }
                } else if ("custom" == eObj.type) {
                    if (eObj.fun)
                        eObj.fun(sId, text);
                }
            }
        }
    },
    /**
     * 初始化select控件<br>
     * 如果是多选，只需要在select元素上添加 multiple=""
     *
     * @author cmh
     * @since 2016-03-23 16:28:23
     * @version 1.0
     * @param options 参数，例如 {id:"#selectId"}
     */
    initSelect: function (options) {
       
        var that = this;
        // 默认参数
        var defaults = {
            id: "#selectId", // 控件主键
            value: "", // 控件默认值
            width: "auto", // 控件宽度 
            targetId: null,
            change: that.selectEvent, // 事件
            url: null, // 数据
            data: null, // 参数
            event: null, // 自定义事件 数组 []
            cache: false, // 是否缓存，缓存数据需要ajax同步
            valueField: "id",
            tree: false,
            defSel: false,//指定选择某项
            defIndex: 0,
            icon: null,
            templateResult: null,
            templateSelection: null,
            customRequired: false, //自定义必选项,默认为false,如果为true,则如果有数据则设置为必选,无数据,则非必选
            callback: null,
            dropdownParent:$("body")
        };
        var opts = $.extend(defaults, options);
        var isSelectInParent = $(opts.id).isInParent('.modal-content');//下拉是否在弹出框里面
        var placeholder = $(opts.id).attr("placeholder");
        var maxSelectionLength = $(opts.id).attr("maxSelectionLength");
        if (isSelectInParent) {
            opts.dropdownParent = $(opts.id).parents('.modal-content').get(0);
        };
        if (!placeholder) placeholder = "";
        if (opts.url) {
            if (that.initSelectCache) opts.cache = true;
            var cache = $("body").data(opts.url);
            if (opts.cache) {
                if (cache) {
                    datacall(cache);
                } else {
                    $.ajaxSettings.async = false;
                    $.getJSON(opts.url, opts.data, datacall);
                    $.ajaxSettings.async = false;
                }
            } else {
                if ("array" === $.type(opts.url)) {
                    datacall(opts.url);
                } else {
                    ajaxRequestCount++;
                    $.ajax({
                        url: opts.url,
                        data: opts.data,
                        dataType: opts.dataType || 'json',
                        success: function (data) {
                            datacall(data);
                        },
                        error: function (err) {
                            console.error('请求失败:', err);
                        },
                        // 3. 请求完成（成功/失败）后执行的回调（关键）
                        complete: function () {
                            // 计数器-1
                            ajaxRequestCount--;
                            // 检查是否所有请求都完成（计数器为0）
                            if (ajaxRequestCount <= 0) {
                                fnLoadingHide()
                            }
                        }
                    });



                    //$.getJSON(opts.url, opts.data, function (data) {
                    //    try {
                    //        datacall(data);
                    //    } catch (e) {
                    //    }
                    //});
                }
            }
            function datacall(d) {
                
                if (d) {
                    if (!cache) $("body").data(opts.url, d);
                    $(opts.id).empty();
                    var multiple = $(opts.id).attr("multiple");
                    if (multiple != "multiple") {
                        $(opts.id).append("<option></option>");
                    }
                    if (opts.defSel) {
                        opts.value = d[opts.defIndex][opts.valueField];
                    }
                    for (var i = 0; i < d.length; i++) {
                        if (!$.isEmpty(d[i].text)) {
                            var vStr = "";
                            var thdValue = "";
                            if (opts.value === d[i][opts.valueField]) vStr = "selected=\"selected\"";
                            if (opts.tree) {
                                if (d[i].pid) vStr += " parent=\"" + d[i].pid + "\"";
                                if (d[i].style) vStr += "style=\"" + d[i].style + "\"";
                                if (d[i].disabled) vStr += " disabled=\"" + d[i].disabled + "\"";
                                if (d[i].css) vStr += " css=\"" + d[i].css + "\"";
                            }
                            if (d[i].thdValue) thdValue = "thdValue='" + d[i].thdValue + "'";
                            var option = "<option value=\"" + d[i][opts.valueField] + "\" " + vStr + "  " + thdValue + " >" + d[i].text + "</option>";
                            $(opts.id).append(option);
                        }
                       
                    }
                    if (opts.customRequired) {
                        if (d.length == 0 || (d.length == 1 && d[0][opts.valueField] == "")) {
                            $(opts.id).removeAttr("datatype");
                        } else {
                            $(opts.id).attr("datatype", "*");
                        }
                    }
                    after(d);
                }
            }
        } else {
            after(null);
        }
        function after(d) {
            var defaultValue = $(opts.id).attr("attrvalue");
            if (!opts.value && defaultValue != "") {
                opts.value = defaultValue;
            }
            // 赋值
            if (opts.value) {
                if (opts.targetId) $(opts.targetId).val(opts.value);
                $(opts.id).val(opts.value);
            } else if (opts.targetId) {
                $(opts.id).val($(opts.targetId).val());
            }
            // 绑定事件
            $(opts.id).bind("change", {
                id: opts.id,
                value: opts.value,
                targetId: opts.targetId,
                event: opts.event
            }, opts.change);
            $(opts.id).trigger("change");// 触发一次
            $(opts.id).on("select2:close", function () {
                $(opts.id).trigger("blur")
            });//关闭时触发校验
            // 获取自定义宽度
            var w = $(opts.id).attr("width");
            if (w) opts.width = w;
            if ("auto" == opts.width) {
                var w = $("input.col-xs-10.col-sm-5:first").width();
                if (w) {
                    opts.width = w + "%";
                } else {
                    opts.width = "100%";
                }
            }
            try {
                var config = {
                    data: opts.data,
                    language: 'zh-CN',
                    width: opts.width,
                    placeholder: placeholder,
                    allowClear: true,
                    icon: opts.icon,
                    dropdownParent: opts.dropdownParent,
                };
                if (opts.templateResult)
                    config.templateResult = opts.templateResult;
                if (opts.templateSelection)
                    config.templateSelection = opts.templateSelection;
                if (maxSelectionLength)
                    config.maximumSelectionLength = maxSelectionLength;
                if (opts.tree) {
                    $(opts.id).select2tree(config);
                } else {
                    $(opts.id).select2(config);
                    //					try{$(opts.id).next(".select2-container").css("width", w);}catch(e){alert(e.message);}
                }
            } catch (e) {
                alert(e.message);
            }
            opts.callback && opts.callback(d);
        }
        return opts.cache;
    },
    loadFormData: function (form, obj, otherObj) {
        var f = null;
        if ((typeof form) === "object") {
            f = form;
        }
        if ((typeof form) === "string") {
            f = document.getElementById(form);
        }
        obj = obj || {};
        for (var n in obj) {
            try {
                if (f[n]) {
                    f[n].value = obj[n];
                    //					f[n].readonly = true;
                }
            } catch (e) {
            }
        }
        otherObj = otherObj || {};
        for (var other in otherObj) {
            if (obj[otherObj[other]] && f[other] && (typeof otherObj[other]) == "string") {
                f[other].value = obj[otherObj[other]];
            }
        }
    },
    loadingShow: function (callback) {

        var loadding = '<div id="loadingDiv" style="position: absolute;top: 0;left: 0;opacity: 0.5;width: 100%;height: 100%;z-index: 100000000001;background-color: #333333;">'
            + '<div id="loadingImage" class="icon icon-spin icon-spinner-indicator"></div></div>';
        $("body").append(loadding);
        $("#loadingImage").css({ top: window.screen.availHeight / 3 + $(window.top.document).scrollTop() });
        //增加延时操作，解决弹出层不显示的问题
        if (callback) {
            setTimeout(callback, 200);
        }
    },
    loadingHide: function () {
        $("#loadingDiv").remove();
    },
    disableFormData: function (formId) {
        $('input,select,textarea', $("#" + formId)).not('input[type=hidden]').attr('disabled', true).css("background-color", "#e5e5e5");
        // $('input,select,textarea', $("#" + formId)).not('input[type=hidden]').css({ "background-color": "#fff" });
    },
    initDateTimePicker: function () {
        $('.datetimepicker').each(function () {
            var id = $(this).attr("id");
            var format = $(this).attr("data-format");
            $("#" + id).datetimepicker({
                format: format,
                minView: 2,
                autoclose: true,
                pickerPosition: 'bottom-right'
            }).on('changeDate', function (ev) {
                $(this).trigger('blur');
            });
            $(this).attr("autocomplete", "off");
        });
    }
};
var pageRedirect = {
    StartDo: function (options) {
        var that = this;
        // 默认参数
        var defaults = {
            PageIndex: 1, // 控件主键
            TabHref: "applyDataTable",
            SessionName: "listpage",
            ListPageUrl: '',
            RedirecteUrl: null,
            type: 1,
            step: "",
            RequestUrl: "../SystemSetting/PageRedirectService.do"
        };
        var opts = $.extend(defaults, options);
        var requestUrl;
        var IsSend = true;
        var sendData;
        if (opts.type == 1) {  //type=1表示从list页面往详情页跳转，type=2表示从详情页往list页回跳
            try {
                var $li = $("#nav_tab").find(".active");
                var a = $li.find("a");
                var href = $(a).attr("href");
                if (typeof href != undefined) {
                    opts.TabHref = href;
                }
            } catch (e) {
            }
            ;
        } else if (opts.type == 2) {
            //requestUrl = "../SystemSetting/GoLispage.do";
            //sendData = { SessionName: opts.SessionName }
        } else {
            IsSend = false;
        }
        if (IsSend && opts.RequestUrl) {
            $.ajax({
                url: opts.RequestUrl,
                data: {
                    PageIndex: opts.PageIndex,
                    TabHref: opts.TabHref,
                    SessionName: opts.SessionName,
                    type: opts.type,
                    step: opts.step
                },
                type: "POST",
                dataType: "json",
                async: false,
                success: function (data) {
                    callback(data)
                },
                error: function (e) {
                    bootbox.alert({ message: "页面转向异常！", size: 'small' });
                }
            });
        } else {
            bootbox.alert({ message: "页面转向参数不正确！", size: 'small' });
        }
        function callback(data) {
            if (data != null) {
                if (data.success == "y") {
                    if (opts.type == 1) {
                        //alert(data.SessionId);
                        //alert(data.SessionName);
                        //alert(data.ListPageUrl);
                        location = opts.RedirecteUrl + "&pageName=" + data.SessionName;
                    } else if (opts.type == 2) {
                        //alert(data.SessionName);
                        //alert(data.ListPageUrl);
                        location = data.ListPageUrl
                        // alert(data.ListPageUrl);
                    }
                } else {
                    bootbox.alert({ message: "页面转向错误！", size: 'small' });
                }
            } else {
                bootbox.alert({ message: "data is null", size: 'small' });
            }
        }
    },
    setCookie: function (come, myurl) {
        var comeobj = this.buildUrl(come);
        var myobj = this.buildUrl(myurl);
        if (comeobj.newUrl && myobj.methodName) {
            if (comeobj.methodName != myobj.methodName) {
                $.cookie(myobj.methodName, comeobj.newUrl);
                //$("body").append("<input type='hidden' id='pageRediredirectCookieName' value='" + myobj.methodName + "' />");
            }
        }
    },
    buildUrl: function (url) {
        var reg = /^http:\/\/.*\/(\w+)\/(\w+)\.(\w+)(.*)/;
        var o = new Object();
        if (reg.test(url)) {
            o.handlerName = RegExp.$1 ? RegExp.$1 : "";
            o.methodName = RegExp.$2 ? RegExp.$2 : "";
            o.suffix = RegExp.$3 ? RegExp.$3 : "";
            o.queryString = RegExp.$4 ? RegExp.$4 : "";
            o.newUrl = "";
            if (o.handlerName && o.methodName)
                o.newUrl = "../" + o.handlerName + "/" + o.methodName + ".do" + o.queryString;
        }
        return o;
    },
    goBack: function (myurl) {
        var myobj = this.buildUrl(myurl);
        if (myobj.methodName) {
            var url = $.cookie(myobj.methodName);
            if (url)
                location = url;
        }
    }
};
var processManager = {
    initProcess: function (options) {
        var that = this;
        // 默认参数
        var defaults = {
            applyid: "",
            staffid: "",
            masterUrl: "",
            clickUrl: "",
            data: null,
            callback: null,
            isUseClickUrl: false
        };
        var opts = $.extend(defaults, options);
        var clickUrlPara = "";
        if (opts.applyid != "" && opts.masterUrl != "" && opts.clickUrl != "") {
            if (opts.data) {
                var sArray = []
                for (var key in opts.data) {
                    sArray.push("" + key + "=" + opts.data[key] + "")
                }
                if (sArray.length > 0) {
                    clickUrlPara = sArray.join("&");
                }
            }
            getApplyInfoPro(opts.applyid, opts.staffid, opts.data, opts.callback, clickUrlPara);
        }
        function getApplyInfoPro(applyid, staffid, data, callback, clickUrlPara) {
            if (applyid == "" && data == null) {
                $("#wiredWrap").find("li:first").addClass("active");
            } else {
                if (data) {
                    if (!data.applyCode)
                        data.applyCode = applyid;
                    if (!data.staffCode)
                        data.staffCode = staffid;
                } else {
                    data = new Object();
                    data.applyCode = applyid;
                    data.staffCode = staffid;
                }
                $.ajax({
                    url: opts.masterUrl,
                    type: "POST",
                    data: data,
                    dataType: "json",
                    async: false,
                    success: function (rs) {
                        var prors = rs.process;
                        if (prors != undefined && prors != "") {
                            var rsArray = prors.split(",");
                            var steps = $("#steps").val();
                            var isNoRequired = $("#isNoRequired").val();
                            //当前正在编辑的步骤，默认最大值，用于判断是在判断的步骤之前还是之后
                            var activeIndex = $("#wiredWrap").find("li").length - 1;
                            $("#wiredWrap").find("li").each(function (index, element) {
                                var complete = false;
                                if (steps == $(this).attr("data-target")) {
                                    activeIndex = index;
                                }
                                //已完成
                                if (rsArray[index] == "1") {
                                    $(this).addClass("complete");
                                    complete = true;
                                } else {
                                    //先根据此步骤后有没有完成的，如果有，则此步骤也置成完成
                                    for (var i = index + 1; i < rsArray.length; i++) {
                                        if (rsArray[i] == "1") {
                                            complete = true;
                                            break;
                                        }
                                    }
                                    //然后如果仍是未完成状态，判断当前正在编辑步骤是在此步骤之前还是之后，如果是之后，则置成完成状态
                                    if (!complete && activeIndex > index) {
                                        complete = true;
                                    }
                                    //如果已完成，则设置已完成的状态
                                    if (complete && isNoRequired) {
                                        $(this).addClass("complete norequired");
                                    } else {
                                        //如果未完成，则设置未完成的状态
                                        $(this).removeClass("complete");
                                    }
                                }
                                if (steps == $(this).attr("data-target")) {
                                    $(this).addClass("active");
                                    $(this).removeClass("norequired");
                                } else {
                                    $(this).removeClass("active");
                                }
                                //已完成的绑定点击事件
                                if (complete) {
                                    var s = $(this).attr("data-target");
                                    var url = $(this).attr("data-href");
                                    $(this).find(".step").bind("click", function () {
                                        var myurl = "";
                                        if (clickUrlPara && opts.isUseClickUrl) {
                                            myurl = opts.clickUrl + "?step=" + s + "&" + clickUrlPara;
                                        } else if (url) {
                                            myurl = url;
                                        } else if (!opts.clickUrl) {
                                            myurl = s + ".do?applyCode=" + applyid + "&staffCode=" + staffid + "&step=" + s + "&token=" + token;
                                        } else
                                            myurl = opts.clickUrl + "?applyCode=" + applyid + "&staffCode=" + staffid + "&step=" + s + "&token=" + token;
                                        if (myurl) {
                                            location = myurl;
                                        }
                                    });
                                } else {
                                    $(this).find(".step").unbind("click");
                                }
                            });
                        }
                    }
                });
            }
        }
    },
    getNextUrl: function (para) {
        var next = $("#nextStepBaseUrl").val();
        //if (para)
        //    return next + "?" + para;
        //else
        return next;
    },
    getPreviousUrl: function (para) {
        var next = $("#previousStepBaseUrl").val();
        //if (para)
        //    return next + "?" + para;
        //else
        return next;
    }
};
var processManagerNew = {
    
    initProcess: function (options) {
        var that = this;
        // 默认参数
        var defaults = {
            checkParameter: {},
            handlerName: "",
            clickParameter: {},
            async: true,
            ajaxName: "getApplyFillProcess.do"
        };
        var opts = $.extend(defaults, options);
        var stepArray = [];
        $("#wiredWrap").find("li").each(function (index, element) {
            var tStep = $(this).attr("data-target");
            if (stepArray.indexOf(tStep) == -1)
                stepArray.push(tStep);
        });
        opts.checkParameter.steps = stepArray.join(",");
        return {
            check: function () {
                $.ajax({
                    url: opts.handlerName + "/" + opts.ajaxName,
                    type: "POST",
                    data: opts.checkParameter,
                    dataType: "json",
                    async: opts.async,
                    success: function (rs) {
                        var prors = rs.process;
                        if (prors) {
                            var rsArray = prors.split(",");
                            var steps = $("#steps").val();//页面名
                            var isNoRequired = $("#isNoRequired").val();
                            //当前正在编辑的步骤，默认最大值，用于判断是在判断的步骤之前还是之后
                            var activeIndex = $("#wiredWrap").find("li").length - 1;
                            try {
                                $("#wiredWrap").find("li").each(function (index, element) {
                                    var complete = false;
                                    if (steps == $(this).attr("data-target")) {
                                        activeIndex = index;
                                    }
                                    //已完成
                                    if (rsArray[index] == "1") {
                                        $(this).addClass("complete");
                                        complete = true;
                                    } else {
                                        //先根据此步骤后有没有完成的，如果有，则此步骤也置成完成
                                        for (var i = index + 1; i < rsArray.length; i++) {
                                            if (rsArray[i] == "1") {
                                                complete = true;
                                                break;
                                            }
                                        }
                                        //然后如果仍是未完成状态，判断当前正在编辑步骤是在此步骤之前还是之后，如果是之后，则置成完成状态
                                        if (!complete && activeIndex > index) {
                                            complete = true;
                                        }
                                        //如果已完成，则设置已完成的状态
                                        if (complete && isNoRequired) {
                                            $(this).addClass("complete norequired");
                                        } else {
                                            //如果未完成，则设置未完成的状态
                                            $(this).removeClass("complete");
                                        }
                                    }
                                    if (steps == $(this).attr("data-target")) {
                                        $(this).addClass("active");
                                        $(this).removeClass("norequired");
                                    } else {
                                        $(this).removeClass("active");
                                    }
                                    //已完成的绑定点击事件
                                    if (complete) {
                                        var paraArray = [];
                                        for (var key in opts.clickParameter) {
                                            paraArray.push("" + key + "=" + opts.clickParameter[key]);
                                        }
                                        var queryStr = paraArray.join("&");
                                        var s = $(this).attr("data-target");
                                        $(this).find(".step").bind("click", function () {
                                            location = "../" + opts.handlerName + "/" + s + ".do?" + queryStr;
                                        });
                                    } else {
                                        $(this).find(".step").unbind("click");
                                    }
                                });
                            } catch (e) {
                                console.error(e);
                            }
                        }
                    }
                });
            }
        };
    },
    getUrl: function (opts) {
        var stepObj = [];
        var paraArray = [];
        for (var key in opts.clickParameter) {
            paraArray.push("" + key + "=" + opts.clickParameter[key]);
        }
        var queryStr = paraArray.join("&");
        var steps = $("#steps").val();
        $("#wiredWrap").find("li").each(function (index, element) {
            var tStep = $(this).attr("data-target");
            var url = "../" + opts.handlerName + "/" + tStep + ".do?" + queryStr;
            var o = {
                isCur: steps == tStep,
                url: url,
            }
            stepObj.push(o);
        });
        for (var i = 0; i < stepObj.length; i++) {
            if (stepObj[i].isCur) {
                var oo = {
                    cur: stepObj[i].url,
                    next: i < stepObj.length - 1 ? stepObj[i + 1].url : null,
                    previous: i > 0 ? stepObj[i - 1].url : null
                }
                return oo;
            }
        }
        return null;
    }
}
var paging = {
    initAll: function (options) {
    },
    initData: function (options) {
        var that = this;
        // 默认参数
        var defaults = {
            id: "#pagination", // 控件主键
            href: "#applyDataTable",
            templateId: "appTemplate",
            currentPageIndex: 1,
            pageSize: 1,
            stepID: 0,  //审批步骤ID
            type: 0,  //0，待审；1：同意；2拒绝
            url: null, // 数据
            data: null, // 参数
            event: null, // 自定义事件 数组 []
            cache: false, // 是否缓存，缓存数据需要ajax同步
            callback: null,
            visiblePages: 10,
            totalPages: 0
        };
        var opts = $.extend(defaults, options);
        var $pagination = $(opts.id);
        var defaultOpts = {
            first: "首页",
            prev: "上一页",
            next: "下一页",
            last: "末页",
            initiateStartPageClick: false,
            onPageClick: function (evt, page) {
                getData(page, opts.pageSize, opts.url, opts.href, opts.templateId);
            }
        };
        //$pagination.twbsPagination(defaultOpts);
        getData(opts.currentPageIndex, opts.pageSize, opts.url, opts.href, opts.templateId);
        function getData(page, size, url, href, templateId) {
            var rawData = { currentPageIndex: page, pageSize: size, stepID: opts.stepID, type: opts.type };
            var tplEle = document.getElementById(templateId);//模板id值正确时
            var contEleLen = $(href).length;
            //当页面存在div时 并且有模板script id
            if (tplEle && contEleLen > 0) {
                var prevElelen = $(href).prev().find("th").length > 0 ? $(href).prev().find("th").length : $(href).prev().find("td").length;
                $.ajax({
                    url: url,
                    type: "POST",
                    data: $.extend(rawData, opts.data),
                    dataType: "JSON",
                    async: false,
                    cache: false,
                    success: function (rs) {
                        $(href).html("");
                        if (rs.DataList && rs.DataList.length > 0) {
                            var gettpl = document.getElementById(templateId).innerHTML;
                            laytpl(gettpl).render(rs, function (html) {
                                $(href).html(html);
                            });
                            $('[data-toggle="tooltip"]').tooltip({
                                tipClass: "tooltip-info",
                                title: function () {
                                    return $(this).text()
                                }
                            });
                            $('[data-toggle="tooltip"][content]').on("click", function () {
                                var content = $(this).attr("content");
                                (new $.zui.ModalTrigger({
                                    custom: "<div style='width:100%;word-break: break-all;word-wrap: break-word;'>" + content + "</div>",
                                    title: "提示信息"
                                })).show();
                            });
                            var totalpagess = Math.ceil((rs.RecordCount / size));
                            //var currentPage = $pagination.twbsPagination('getCurrentPage');
                            $pagination.twbsPagination('destroy');
                            $("#currentPageIndex").val(rs.CurrentPageIndex);
                            $pagination.twbsPagination($.extend({}, defaultOpts, {
                                startPage: rs.CurrentPageIndex,
                                totalPages: totalpagess,
                                last: "共" + rs.RecordCount + "条," + totalpagess + "页"
                            }));
                        } else {
                            $(href).html('<tr><td colspan="' + prevElelen + '" class="text-center">' + pubNoDataTips + '</td></tr>')
                            $pagination.twbsPagination('destroy');
                        }
                    },
                    error: function (e) {
                        bootbox.alert({
                            message: "查询异常！",
                            size: 'small'
                        });
                    }
                });
            }
        }
    },
    emptyText: function (text) {
        //var html = "<hr />";
        //html += "<div class=\"tab-pane fade active in\">";
        var html = " <div class=\"widget-main pd-0\">";
        html += "<p>" + text + "</p>";
        //html += "</div>";
        html += "</div>";
        return html;
    },
    getCurrentPageIndex: function () {
        var index = 0;
        var currentPage = $("#pagination").twbsPagination('getCurrentPage');
        if (currentPage != null)
            index = parseInt(currentPage);
        return index;
    },
    getCurrentTabID: function () {
        var $li = $("#nav_tab").find(".active");
        var a = $li.find("a");
        var href = $(a).attr("href");
        return href;
    },
    getCurrentStepID: function () {
        return $(paging.getCurrentTabID()).attr("stepid");
    },
    getCurrentType: function () {
        return $(paging.getCurrentTabID()).attr("type");
    }
};
/**
 * 工具类的jquery扩展
 * @author cmh
 * @version 2014-07-31 上午10:00:50
 */
(function ($) {
    $.extend({
        // 使用方法：$.u.xx();
        u: {
            version: function () {
                return "工具类 v1.0";
            },
            toString: function () {
                return $.u.version();
            },
            alert: function (options) {
                // 默认参数
                var defaults = {
                    title: "提示",
                    content: "提示",
                    icon: "alert.gif"
                };
                var opts = $.extend(defaults, options);
                if ($.type(options) == "string") {
                    opts.content = options;
                }
                window.top.$.dialog({
                    icon: opts.icon,
                    time: 3,
                    top: 100,
                    follow: document.getElementById(opts.follow),
                    title: opts.title,
                    content: opts.content,
                    cancel: false
                });
            },
            cache: function (key, value) {
                var bind = "body";
                if (window.top.$(bind).length == 0) bind = "frameset";
                if (value && null != value) {
                    window.top.$(bind).data(key, value);
                } else {
                    return window.top.$(bind).data(key);
                }
            },
            removeCache: function (key) {
                var bind = "body";
                if (window.top.$(bind).length == 0) bind = "frameset";
                return window.top.$(bind).removeData(key);
            },
            checked: function (name, value, flag) {
                // 全选/取消/反选   例如： $.u.checked("name");
                if (!flag) flag = ",";
                $("input[name=" + name + "]").each(function () {
                    if (!value) {
                        if (!this.checked) this.checked = true; else this.checked = false;
                    } else {
                        var vArr = value.split(flag);
                        for (var i = 0; i < vArr.length; i++) {
                            if (vArr[i].trim() == this.value.trim()) {
                                if (!this.checked) this.checked = true; else this.checked = false;
                            }
                        }
                    }
                });
            },
            change: function (name, value, flag) {
                if (name && value) {
                    if (!flag) flag = ",";
                    $("input[name=" + name + "]").each(function () {
                        var vArr = value.split(flag);
                        for (var i = 0; i < vArr.length; i++) {
                            if (vArr[i].trim() == this.value.trim()) {
                                this.checked = true;
                                $("input[name=" + name + "][value=" + this.value + "]").change();
                            }
                        }
                    });
                }
            },
            getCheckedValue: function (name, flag) {
                var r = "";
                if (!flag) flag = ",";
                var strArray = [];
                $("input[name=" + name + "]").each(function () {
                    if (this.checked) {
                        //r += this.value + flag;
                        strArray.push(this.value);
                    }
                });
                if (strArray.length > 0)
                    r = strArray.join(flag);
                //   if (r.length > 0 && r.lastIndexOf(flag)) r = r.substring(0, r.length - 1);
                return r;
            },
            setCheckedValue: function (name, value, flag) {
                if (name && value) {
                    if (!flag) flag = ",";
                    eval("var re=/" + flag + "/");
                    if (re.test(value)) {
                        var vArr = value.split(flag);
                        $("input[name=" + name + "]").each(function () {
                            for (var i = 0; i < vArr.length; i++) {
                                if (vArr[i].trim() == this.value.trim()) {
                                    this.checked = true;
                                } else {
                                    this.checked = false;
                                }
                            }
                        });
                    } else {
                        $("input[name=" + name + "]").each(function () {
                            if (value == this.value) {
                                this.checked = true;
                            } else {
                                this.checked = false;
                            }
                        });
                    }
                }
            },
            //deepCopy: function (source) {
            //    //对象和数组的深拷贝 
            //    var result;
            //    for (var key in source) {
            //        result[key] = typeof source[key] === 'object' ? $.u.deepCopy(source[key]) : source[key];
            //    }
            //    return result;
            //}
            //深拷贝
            deepCopy: function (obj) {
                if (typeof obj !== 'object') return;
                var newObj = obj instanceof Array ? [] : {};
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
                    }
                }
                return newObj;
            },
            //数组去重
            unique: function (arr) {
                var newArr = [];
                for (var i = 0; i < arr.length; i++) {
                    if (newArr.indexOf(arr[i]) == -1) {
                        newArr.push(arr[i])
                    }
                }
                return newArr;
            },
        },
        //_local: {//缓存方法
        //    /**
        //    * localStorage
        //    * @调用：_local.set('access_token', '123456', 5000);
        //    * @调用：_local.get('access_token');
        //    *    //_local.set("logindata",result.data,(new Date().getTime() + 1000*60*60*24));//过期时间是最后一个参数  这里设置一天 ；
        //    // var getHour = 1000*60*60 //设置一小时为单位
        //    // _local.set("logindata",result.data,(getHour * 24));//设置一天的过期时间
        //    //  _local.set("logindata",result.data);//设置一天的过期时间
        //    */
        //    //存储,可设置过期时间
        //    set: function (key, value, expires) {
        //        var params = { key, value, expires };
        //        if (expires) {
        //            // 记录何时将值存入缓存，毫秒级
        //            var data = Object.assign(params, { startTime: new Date().getTime() });
        //            localStorage.setItem(key, JSON.stringify(data));
        //        } else {
        //            if (Object.prototype.toString.call(value) == '[object Object]') {
        //                value = JSON.stringify(value);
        //        }
        //            if (Object.prototype.toString.call(value) == '[object Array]') {
        //                value = JSON.stringify(value);
        //        }
        //            localStorage.setItem(key, value);
        //        }
        //        },
        //    //取出
        //            get: function(key) {
        //        var item = localStorage.getItem(key);
        //        // 先将拿到的试着进行json转为对象的形式
        //        try {
        //            item = JSON.parse(item);
        //        } catch (error) {
        //            // eslint-disable-next-line no-self-assign
        //            item = item;
        //        }
        //        // 如果有startTime的值，说明设置了失效时间
        //        if (item && item.startTime) {
        //            var date = new Date().getTime();
        //            // 如果大于就是过期了，如果小于或等于就还没过期
        //            if (date -item.startTime > item.expires) {
        //                localStorage.removeItem(item);
        //                return false;
        //            } else {
        //                return item.value;
        //            }
        //        } else {
        //            return item;
        //        }
        //            },
        //    // 删除
        //    remove: function (key) {
        //        localStorage.removeItem(key);
        //    },
        //    // 清除全部
        //    clear: function () {
        //        localStorage.clear();
        //    }
        //},
        _session: {
            get: function (key) {
                var data = sessionStorage[key];
                if (!data || data === "null") {
                    return null;
                }
                return JSON.parse(data).value;
            },
            set: function (key, value) {
                var data = {
                    value: value
                }
                sessionStorage[key] = JSON.stringify(data);
            },
            // 删除
            remove: function (key) {
                sessionStorage.removeItem(key);
            },
            // 清除全部
            clear: function () {
                sessionStorage.clear();
            }
        },
        //cooike
        cookieNew: {
            set: function (name, value, time) {
                document.cookie = name + '=' + value + '; max-age=' + time;
                return this;
            },
            remove: function (name) {
                return this.setCookie(name, '', -1);
            },
            get: function (name, callback) {
                var allCookieArr = document.cookie.split('; ');
                for (var i = 0; i < allCookieArr.length; i++) {
                    var itemCookieArr = allCookieArr[i].split('=');
                    if (itemCookieArr[0] === name) {
                        return itemCookieArr[1]
                    }
                }
                return undefined;
            }
        },
        //查询列表页面搜索框 显示历史搜索记录 自定义autocomplate输入框
        custAutocomplete: {
            //设置输入框值
            setData: function (id) {
                var curIdVal = $.sanitizeInput($("#" + id));
                if (curIdVal && typeof custAutocompleteOption !== 'undefined') {
                    var arr = $.isEmpty($.zui.store.get(custAutocompleteOption.cacheName)) ? [] : $.zui.store.get(custAutocompleteOption.cacheName);
                    arr.unshift(curIdVal);
                    arr = $.u.unique(arr);
                    arr.splice(6);
                    $.zui.store.set(custAutocompleteOption.cacheName, arr);
                }
            },
            //点击输入框方法
            shuru: function (curObj) {
                if (typeof custAutocompleteOption !== 'undefined') { 
                    var data = $.isEmpty($.zui.store.get(custAutocompleteOption.cacheName)) ? [] : $.zui.store.get(custAutocompleteOption.cacheName);
                    var selectHtml = ''
                    var curVal = $.sanitizeInput($(curObj));
                    if ($.isEmpty(curVal) && data.length > 0) {
                        selectHtml += "<ul class=\"MockSelect\">";
                        $.each(data, function (i, n) {
                            selectHtml += "<li onclick=\"$.custAutocomplete.fnSelctData(this,event)\">" + n + "</li>";
                        })
                        selectHtml += "</ul>";
                        $(curObj).after(selectHtml)
                     }
                }
            },
            //下拉选项点击方法
            fnSelctData: function (obj, event) {
                event.stopPropagation();
                var curVal = $(obj).text();
                $(".custAutocomplete").val(curVal);
                $(obj).parent(".MockSelect").remove();
            },
            //点击其它区域下拉框消失
            clickHide: function () {
                if (typeof custAutocompleteOption !== 'undefined') {
                    $(document).click(function (event) {
                        var eo = $(event.target);
                        if (eo.attr("id") != custAutocompleteOption.inputID)
                            $(".MockSelect").remove()
                    })
                }
            }
        }
    });
    // 使用方法：$.xx();
    //转换int，错误数据显示0
    $.toInt = function (str) {
        if (typeof str == "undefined" || str == null || str == "" || isNaN(parseInt(str))) {
            return 0;
        } else {
            return parseInt(str);
        }
    }
    //转换浮点数，错误数据显示0
    $.toFloat = function (str) {
        if (typeof str == "undefined" || str == null || str == "" || isNaN(parseFloat(str))) {
            return 0;
        } else {
            return $.toFixed(str, 2);
        }
    }
    //转换成XX.XX为小数，默认两位
    $.toFixed = function (str, length) {
        length = arguments.length > 1 ? length : 2;
        if (typeof str == "undefined" || str == null || str == "" || isNaN(parseFloat(str))) {
            return 0;
        } else {
            return parseFloat(parseFloat(str).toFixed(length));
        }
    }
    // 格式化时间
    $.getformatTime = function (time, fmt) {
        var date1 = new Date("1900-01-01");
        var date2 = new Date(time);
        if (date2 <= date1) {
            return "";
        }
        var date = eval('new Date(' + time.replace(/\d+(?=-[^-]+$)/,
            function (a) {
                return parseInt(a, 10) - 1;
            }).match(/\-?\d+/g) + ')');
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "H+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        if (fmt.indexOf("2040-01-01") != -1 || fmt.indexOf("1900") != -1) {
            return "";
        }
        return fmt;
    }
    //获得url地址参数 
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURIComponent(r[2]);
        return null; //返回参数值
    }
    //获取url参数（放在标签里的属性）
    /**
     *
     * @param val :url地址
     * @param name ：需要获取字段的名字
     */
    $.getStrUrlVal = function (val, name) {
        var newVal = "?" + val.split("?")[1];
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = newVal.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }
    $.getMd5Value = function (key) {
        return hex_md5(_secret0 + _secret1 + key);
    }
    //add 20211018 详情导航返回按扭方法
    $.fnDetailGoBack = function () {
        var fnCode = $.getStrUrlVal(parent.location.href, "functionCode");//没有值代表是从首页代办点进来的，有值代表从列表点进来的（解决返回至首页后 会返回到登录页面情况）
        if (!($.isEmpty(fnCode))) {
            fnLoadingShow();
            setInterval("window.history.go(-1)", 200)//有锚点 ，需要多返回几次
        } else {
            parent.location.href = parent.location.href
        }
    }
    //是否为空
    $.isEmpty = function (v) {
        switch (typeof v) {
            case 'undefined':
                return true;
            case 'string':
                if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
                break;
            case 'boolean':
                if (!v) return true;
                break;
            case 'number':
                if (0 === v || isNaN(v)) return true;
                break;
            case 'object':
                if (null === v || v.length === 0) return true;
                for (var i in v) {
                    return false;
                }
                return true;
        }
        return false;
    }
    //获取对象键名转成数组
    $.getObjectKeys = function (obj) {
        // 处理 null/undefined（避免后续遍历报错）
        if (obj === null || typeof obj !== 'object') {
            throw new TypeError('参数必须是对象');
        }

        var keys = [];
        // 遍历对象的所有可枚举属性
        for (var key in obj) {
            // 只保留对象自身的属性（排除继承的属性，如 toString 等）
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    }
    //对象转数组,result结果为[{name:'xx',value:'xx'}]
    $.objectToArray = function (obj) {
        var result = [];
        var keyArr = $.getObjectKeys(obj);
        $.each(keyArr, function (i, key) {
            result.push({
                name: key,
                value: obj[key]
            });
        });
        return result
    }


    // 防抖函数  func:执行方法，wait:1000 时间   onchange="debounce(xxhandler, 1500)(params)
    $.debounce = function (func, wait) {
        var timeout;
        return function () {
            var that = this; // 函数的执行上下文
            var args = [].slice.call(arguments); // 函数的参数转成数组
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function () {
                func.apply(that, args); // 这里的this是函数调用时的上下文
            }, wait);
        }
    }
    // 节流函数1  func:执行方法，wait:1000 时间  onclick="throttle1(xxhandler(), 2000)(params)"
    $.throttle1 = function (func, wait) {
        var flag = true;
        return function () {
            var that = this;
            var args = [].slice.call(arguments);
            if (flag) {
                flag = false;
                func.apply(that, args);
                setTimeout(function () {
                    flag = true;
                }, wait)
            }
        }
    }
    // 节流函数2 func:执行方法，wait:1000 时间  onclick="throttle2(xxhandler(), 2000)"
    $.throttle2 = function (func, wait) {
        var pre = 0;
        return function () {
            var now = Date.now();
            var that = this;
            var args = [].slice.call(arguments);
            if (now - pre > wait) {
                pre = now;
                func.apply(that, args);
            }
        }
    }
})(jQuery);
/**
 * 照片剪裁工具 弹出窗口
 * @param {} option
 *  eg :  onclick="openPhotoWindow({funCode:'0102'});"
 */
function openPhotoWindow(option) {
    var newO = {};
    var dptO = {
        schoolCode:"",
        funCode: "",//模块code
        ratio: "56",//75% : 4比3  fixed：固定(fixed354*472)   56%：6比19（默认）
        minSize:0,//最小尺寸
        maxSize: 0,//最大尺寸
        elemId: ""
    }
    newO = $.extend({}, dptO);
    if (!$.isEmpty(option)) {
        newO = $.extend(dptO, option);
    }
    //AspectRatio 75% : 4比3  fixed342*450：固定   56%：6比19（默认）
    var AspectRatio = newO.ratio;//设置第一个参数的默认值为56%
    var _ctx = "/";
    //if (ctx) { _ctx = ctx; }
    //使用跨域参数
    var checkArguments = ";domain=" + location.hostname + ";path=" + _ctx;
    var url = "../Photo/SecurityUploadFileImage.do?t=" + Math.random() + "&AspectRatio=" + AspectRatio + "&funCode=" + newO.funCode + "&minSize=" + newO.minSize + "&maxSize=" + newO.maxSize;
    var params = url + "&checkArguments=" + checkArguments;
    // 获取屏幕可用宽度
    var screenWidth = window.screen.availWidth;
    // 获取屏幕可用高度
    var screenHeight = window.screen.availHeight;
    window.open(replaceEscape(htmlUtil.htmlEncode(params)), '照片剪裁工具', 'height=' + screenHeight + ',width=' + screenWidth + ',z-look=yes,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no');
    var loop = setInterval(function () {
        var localPhoto = localStorage.getItem("localPhoto");
        if (localPhoto) {
            imageShow(localPhoto, newO.elemId);
            localStorage.removeItem("localPhoto");
            clearInterval(loop);
        }
    }, 1000);
}
/**
 * 回显照片
 * @param {} localPhoto 照片全路径
 */
function imageShow(localPhoto, elemId) {
    $.ajax({
        url: "../StudentExchange/PhotoCheck.do",
        data: {
            path: localPhoto,
            attId: ""
        },
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            var msg = "";
            if (data.success == "y") {
                if ($.isEmpty(elemId)) {
                    if (localPhoto != null && localPhoto != "") {
                        $("#photo").attr('src', "" + data.PhotoUrl + "");
                        $("#photourl").val("~/attachment/student/photo/" + data.photoName);
                    }
                    if (data.isCheckedPass != 0) {
                        msg = "<img src='" + data.warningImage + "' style='width:30px;'>" + htmlUtil.htmlEncode($("#jc1").val());
                        $("#isCheckedPass").val(0);
                        $("#failReason").val(data.msg);
                    } else {
                        msg = "<img src='" + data.goodImage + "' style='width:30px;'>" + htmlUtil.htmlEncode($("#jc2").val());
                        $("#isCheckedPass").val(1);
                        $("#failReason").val("");
                    }
                } else {
                    //列表中上传图片
                    if (localPhoto != null && localPhoto != "") {
                        $("#" + elemId).attr('src', "" + data.PhotoUrl + "");
                    }
                }
               
            } else {
                if ($.isEmpty(elemId)) {
                    msg = "<img src='" + data.warningImage + "' style='width:30px;'>" + htmlUtil.htmlEncode($("#jc3").val()) + data.msg;
                    $("#PhotoUrl").val("");
                    $("#isCheckedPass").val("");
                    $("#failReason").val("");
                } else {
                    //列表中上传图片
                    $("#" + elemId).attr('src', "");
                }
            }
            $("#file-list").empty().append(msg);
           
        },
        error: function (e) {
            alert(e);
        }
    });
}
//撤销当前任务操作
function submitDrawBack(applyid, workItemID) {
    bootbox.confirm({
        size: "small",
        message: "您确定撤销提交吗？",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> 取消'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> 确定'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "lhProcessController.do?taskDrawBack",
                    data: {
                        applyid: applyid,
                        workItemID: workItemID
                    },
                    type: "POST",
                    dataType: "JSON",
                    success: function (data) {
                        if (data.success) {
                            bootbox.alert({
                                message: "撤销提交成功！", size: 'small', callback: function () {
                                    location = location;
                                }
                            });
                        } else {
                            bootbox.alert({
                                message: data.message, size: 'small'
                            });
                        }
                    },
                    error: function () {
                        bootbox.alert({
                            message: "撤销提交异常！", size: 'small'
                        });
                    }
                });
            }
        }
    });
}
function converJsonDate(jsondate) {
    //var dateMilliseconds = parseInt(jsondate.replace(/\D/igm, ""));
    ////实例化一个新的日期格式，使用1970 年 1 月 1 日至今的毫秒数为参数
    //var newdate = new Date(dateMilliseconds);
    //return newdate;
    var re = /-?\d+/;
    var m = re.exec(jsondate);
    var d = new Date(parseInt(m[0]));
    return d;
}
document.onkeydown = function (event) {
    var target, code, tag;
    if (!event) {
        event = window.event; //针对ie浏览器
        target = event.srcElement;
        code = event.keyCode;
        if (code == 13) {
            tag = target.tagName;
            if (tag == "TEXTAREA") {
                return true;
            } else {
                return false;
            }
        }
    } else {
        target = event.target; //针对遵循w3c标准的浏览器，如Firefox
        code = event.keyCode;
        if (code == 13) {
            tag = target.tagName;
            if (tag == "INPUT") {
                return false;
            } else {
                return true;
            }
        }
    }
};
function iframeInnerRedirectTo(url) {
    // $("#contentIframe", parent.document).attr("src", url);
    location.href = url;
}
/**
 *
 * @param url ：请求地址
 * @param data ：传过来的参数
 * @param href ：div id
 * @param templateId : script 里面的id
 * @param callback :回调
 */
function laytplFunc(url, data, href, templateId, callback) {
    var tplEle = document.getElementById(templateId);//模板id值正确时
    var contEleLen = $(href).length;
    //当页面存在div时 并且有模板script id
    if (tplEle && contEleLen > 0) {
        var prevElelen = $(href).prev().find("th").length > 0 ? $(href).prev().find("th").length : $(href).prev().find("td").length;
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            dataType: "JSON",
            async: false,
            cache: false,
            success: function (rs) {
                $(href).html("");
                // 附件信息页面：加载附件信息
                if (rs.DataList && rs.DataList.length > 0) {
                    var gettpl = document.getElementById(templateId).innerHTML;
                    laytpl(gettpl).render(rs, function (html) {
                        $(href).html(html);
                        if (callback) {
                            callback(rs.DataList);
                        }
                    });
                    $('[data-toggle="tooltip"]').tooltip({
                        tipClass: "tooltip-info",
                        title: function () {
                            return $(this).text()
                        }
                    });
                    $('[data-toggle="tooltip"][content]').on("click", function () {
                        var content = $(this).attr("content");
                        (new $.zui.ModalTrigger({
                            custom: "<div style='width:100%;word-break: break-all;word-wrap: break-word;'>" + content + "</div>",
                            title: "提示信息"
                        })).show();
                    });
                } else {
                    if (callback) {
                        callback([]);
                    }
                }
              
            },
            error: function (e) {
            }
        });
    }
}
/**
 *
 * @param url ：请求地址
 * @param data ：传过来的参数
 * @param href ：div id
 * @param templateId : script 里面的id
 * @param callback :回调
 */
function laytplFuncNew(options) {
    var defaults = {
        url: '',
        type: "POST",
        data: null,
        async: true,
        href: '#dataListContainer',
        templateId: 'appTemplate',
        callback: null,
        callback2: null
    };
    var opts = $.extend(defaults, options);
    var tplEle = document.getElementById(opts.templateId);//模板id值正确时
    var contEleLen = $(opts.href).length;
    //如果父级是table，就在table增加类
    if ($(opts.href).parent("table").length > 0) {
        $(opts.href).parent("table").addClass("haveLoadingAnimateBox");
    } else {//否则在本身加样式
        $(opts.href).addClass("haveLoadingAnimateBox");
    }
    //当页面存在div时 并且有模板script id
    if (tplEle && contEleLen > 0) {
        var prevElelen = $(opts.href).prev().find("th").length > 0 ? $(opts.href).prev().find("th").length : $(opts.href).prev().find("td").length;
        $.ajax({
            url: opts.url,
            type: opts.type,
            data: opts.data,
            dataType: "JSON",
            async: opts.async,
            cache: false,
            //发送之前
            beforeSend: function () {
                $(opts.href).append("<div data-loading=\"正在加载中...\" class=\"load-indicator loading\"></div>");
            },
            complete: function () {
                $(".load-indicator", $(opts.href)).remove();
                //如果父级是table，就在table删除类
                if ($(opts.href).parent("table").length > 0) {
                    $(opts.href).parent("table").removeClass("haveLoadingAnimateBox");
                } else {//否则在本身加样式
                    $(opts.href).removeClass("haveLoadingAnimateBox");
                }
            },
            success: function (rs) {
                 
                var json = {
                    count: 0,
                    DataList: []
                };
                $(opts.href).html("");
                if (rs && opts.callback2) {
                    opts.callback2(rs);
                }
                if (rs.ObjParams && rs.ObjParams.length > 0) {
                    json.DataList = rs.ObjParams;
                }
                if (rs.DataList && rs.DataList.length > 0) {
                    json.DataList = rs.DataList;
                }
                //if (rs.StudentExchangeProjectFieldInfoList && rs.StudentExchangeProjectFieldInfoList.length > 0) {
                //    json.DataList = rs.StudentExchangeProjectFieldInfoList;
                //}
                if (rs && rs.length > 0 && Array.isArray(rs)) {
                    json.DataList = rs;
                }
                if (json.DataList && json.DataList.length > 0) {
                    json.count = json.DataList.length;
                }
                var gettpl = document.getElementById(opts.templateId).innerHTML;
                laytpl(gettpl).render(json, function (html) {
                    $(opts.href).html(html);
                    if (opts.callback) {
                        opts.callback(rs.DataList);
                    }
                });
                $('[data-toggle="tooltip"]').tooltip({
                    tipClass: "tooltip-info",
                    title: function () {
                        return $(this).text()
                    }
                });
                $('[data-toggle="tooltip"][content]').on("click", function () {
                    var content = $(this).attr("content");
                    (new $.zui.ModalTrigger({
                        custom: "<div style='width:100%;word-break: break-all;word-wrap: break-word;'>" + content + "</div>",
                        title: "提示信息"
                    })).show();
                });
            },
            error: function (e) {
            }
        });
    }
}
var mylaytpl = {
    recordCount: 0,
    initData: function (options) {
        var that = this;
        // 默认参数
        var defaults = {
            id: "#dataListContainer", // html容器ID
            templateId: "appTemplate",
            url: null, // 数据
            data: null, // 参数
            page: 1,
            recPerPage: 10,
            cache: false, // 是否缓存，缓存数据需要ajax同步
            callback: null
        };
        var opts = $.extend(defaults, options);
        var tplEle = document.getElementById(opts.templateId);//模板id值正确时
        var contEleLen = $(opts.id).length;
        //当页面存在div时 并且有模板script id
        if (tplEle && contEleLen > 0) {
            var prevElelen = $(opts.id).prev().find("th").length > 0 ? $(opts.id).prev().find("th").length : $(opts.id).prev().find("td").length;
            $.ajax({
                url: opts.url,
                type: "POST",
                data: opts.data,
                dataType: "JSON",
                async: false,
                cache: false,
                success: function (rs) {
                    $(opts.id).html("");
                    if (rs.DataList && rs.DataList.length > 0) {
                        var gettpl = document.getElementById(opts.templateId).innerHTML;
                        laytpl(gettpl).render(rs, function (html) {
                            $(opts.id).html(html);
                        });
                        $('[data-toggle="tooltip"]').tooltip({
                            tipClass: "tooltip-info",
                            title: function () {
                                return $(this).text()
                            }
                        });
                        $('[data-toggle="tooltip"][content]').on("click", function () {
                            var content = $(this).attr("content");
                            (new $.zui.ModalTrigger({
                                custom: "<div style='width:100%;word-break: break-all;word-wrap: break-word;'>" + content + "</div>",
                                title: "提示信息"
                            })).show();
                        });
                        $('[data-toggle="popover"]').popover({
                            content: function () {
                                var a = $(this).attr("id");
                                return a;
                            },
                            html: true,
                            trigger: 'hover',
                            tipClass: "tipc",
                            placement: "auto"
                        });
                    }
                    if (opts.callback != null && opts.callback != undefined) {
                        opts.callback(rs);
                    }
                },
                error: function (e) {
                }
            });
        }
        //  getdata(opts.page);
        function getdata(page) {
            $('#pageContainer').empty();
            opts.data.currentPageIndex = page;
            var opts = $.extend(defaults, options);
            var tplEle = document.getElementById(opts.templateId);//模板id值正确时
            var contEleLen = $(opts.id).length;
            //当页面存在div时 并且有模板script id
            if (tplEle && contEleLen > 0) {
                var prevElelen = $(opts.id).prev().find("th").length > 0 ? $(opts.id).prev().find("th").length : $(opts.id).prev().find("td").length;
                $.ajax({
                    url: opts.url,
                    type: "POST",
                    data: opts.data,
                    dataType: "JSON",
                    async: false,
                    cache: false,
                    success: function (rs) {
                        $(opts.id).html("");
                        if (rs.DataList && rs.DataList.length > 0) {
                            var gettpl = document.getElementById(opts.templateId).innerHTML;
                            laytpl(gettpl).render(rs, function (html) {
                                $(opts.id).html(html);
                                if (opts.callback != null && opts.callback != undefined) {
                                    opts.callback(rs);
                                }
                            });
                            $('[data-toggle="tooltip"]').tooltip({
                                tipClass: "tooltip-info",
                                title: function () {
                                    return $(this).text()
                                }
                            });
                            $('[data-toggle="tooltip"][content]').on("click", function () {
                                var content = $(this).attr("content");
                                (new $.zui.ModalTrigger({
                                    custom: "<div style='width:100%;word-break: break-all;word-wrap: break-word;'>" + content + "</div>",
                                    title: "提示信息"
                                })).show();
                            });
                        } else {
                            $(opts.id).html('<tr><td colspan="' + prevElelen + '" class="text-center">' + pubNoDataTips + '</td></tr>')
                        }
                    },
                    error: function (e) {
                    }
                });
            }
        }
        function getPage(page, RecordCount, recPerPage) {
            $('#pageContainer').html('<ul class="pager" id="myPager" data-elements="size_menu"></ul>');
            $('#myPager').pager({
                lang: "zh_cn",
                page: page,
                recTotal: RecordCount,
                recPerPage: recPerPage,
                onPageChange: function (state, oldState) {
                    if (state.page !== oldState.page && oldState.page != undefined) {
                        getdata(state.page);
                    }
                }
            });
        }
    },
}
var lyhNewPaging = {
    initData: function (options) {
        var that = this;
        // 默认参数
        var defaults = {
            tab: "#attInfoTable",//table容器ID
            id: "#dataListContainer", // html容器ID
            templateId: "appTemplate",
            pageContainer: "pageContainer",
            countUrl: null, // 返回总数据接口
            dataUrl: null,  //列表数据接口
            tableColCount: 0, //table thead th 数量 
            data: null, // 参数
            cache: false, // 是否缓存，缓存数据需要ajax同步
            jsonCookieName: null,
            jsonCookieOptions: null,
            noDataDsplayMode: false, // 无数据时显示的内容， 默认为false表格形式，true为div形式显示
            callback2: null, //返回rs,根据rs可以进行其他处理
            pageSizeOptions: [10, 20, 30, 50, 100],
            callback: function (url, data, dataContainer, templateName, callback) {
                getlptContent(url, data, dataContainer, templateName, callback);
            } //默认为采用模板的方式，
        };
        var opts = $.extend(defaults, options);
        if (opts.tableColCount <= 0)
            opts.tableColCount = $(opts.tab).find("th").length;
        var data = this.getJsonCookie(opts.jsonCookieName, opts.data);
        if (opts.jsonCookieName)
            getPaging(opts.countUrl, opts.dataUrl, data, opts.id, opts.pageContainer, opts.templateId, opts.callback, function (data) {
                var cookieValue = JSON.stringify(data)
                if (opts.jsonCookieOptions)
                    $.cookie(options.jsonCookieName, cookieValue, opts.jsonCookieOptions);
                else
                    $.cookie(options.jsonCookieName, cookieValue);
            }, opts.callback2, opts.pageSizeOptions);
        else
            getPaging(opts.countUrl, opts.dataUrl, data, opts.id, opts.pageContainer, opts.templateId, opts.callback, null, opts.callback2, opts.pageSizeOptions);
        function getPaging(url, url2, data, dataContainer, pageContainer, templateName, callback, setCookie, callback2, pageSizeOptions) {
           
            var page = pageContainer + "page";
            $("#" + pageContainer).empty();
            $.ajax({
                url: url,
                type: "POST",
                data: data,
                dataType: "JSON",
                //请求之前
                beforeSend: function(xhr){
                    fnLoadingShow();
                },
                //请求完成时，不管成功还是失败
                complete: function () {
                    fnLoadingHide();
                },
                cache: false,
                success: function (rs) {
                    if (rs.RecordCount) {
                        if (parseInt(rs.RecordCount) > 0) {
                            $("#" + pageContainer).html('<ul class="pager" id="' + page + '"></ul>');
                            $("#" + page).pager({
                                lang: "zh_cn",
                                page: data.currentPageIndex,
                                recTotal: rs.RecordCount,
                                recPerPage: data.pageSize,
                                elements: 'first_icon, prev_icon, pages, next_icon, last_icon, page_of_total_text, items_range_text, total_text,size_menu',
                                menuDirection: 'dropup',
                                pageSizeOptions: pageSizeOptions,//	每页数目菜单选项
                                onPageChange: function (state, oldState) {
                                    //如果页码、数目选项变化时，change才有用；
                                    if ((state.page != oldState.page && oldState.page != undefined) || (state.recPerPage != oldState.recPerPage && oldState.recPerPage != undefined)) {
                                        //lang: "zh_cn",
                                        data.currentPageIndex = state.page;
                                        data.pageSize = state.recPerPage;
                                        if (setCookie)
                                            setCookie(data);
                                        if (callback)
                                            callback(url2, data, dataContainer, templateName, callback2);
                                    }
                                }
                            });
                            if (callback)
                                callback(url2, data, dataContainer, templateName, callback2);
                        } else {
                            if (opts.noDataDsplayMode) {
                                $(dataContainer).html("<div class='NodataBox'>" + pubNoDataTips + "</div>");
                            } else {
                                $(dataContainer).html("<td  style='text-align: center;' colspan='" + opts.tableColCount + "'>" + pubNoDataTips + "</td>");
                            }
                        }
                    } else {
                        if ($("#serchCount-num").length > 0) $("#serchCount-num").text("0") //校级项目列表SchoolProject/ProjectList.do 搜索结果 “为你搜索到0个符合要求的项目”
                        if (opts.noDataDsplayMode) {
                            $(dataContainer).html("<div class='NodataBox'>" + pubNoDataTips + "</div>");
                        } else {
                            $(dataContainer).html("<td  style='text-align: center;' colspan='" + opts.tableColCount + "'>" + pubNoDataTips + "</td>");
                        }
                    }
                },
                error: function (e) {
                }
            });
        }
        function getlptContent(url, data, dataContainer, templateName, callback) {
            //fnLoadingShow();
            var opts = $.extend(defaults, options);
            var tplEle = document.getElementById(templateName);//模板id值正确时
            var contEleLen = $(dataContainer).length;
            //当页面存在div时 并且有模板script id
            if (tplEle && contEleLen > 0) {
                var prevElelen = $(dataContainer).prev().find("th").length > 0 ? $(dataContainer).prev().find("th").length : $(dataContainer).prev().find("td").length;
                $.ajax({
                    url: url,
                    type: "POST",
                    data: data,
                    dataType: "JSON",
                    //请求之前
                    beforeSend: function (xhr) {
                        fnLoadingShow();
                    },
                    //请求完成时，不管成功还是失败
                    complete: function () {
                        fnLoadingHide();
                    },
                    cache: false,
                    success: function (rs) {
                        $(dataContainer).html("");
                        if (rs.DataList && rs.DataList.length > 0) {
                            var gettpl = document.getElementById(templateName).innerHTML;
                            laytpl(gettpl).render(rs, function (html) {
                                $(dataContainer).html(html);
                            });
                            if (callback) {
                                callback(rs);
                            }
                            $('[data-toggle="tooltip"]').tooltip({
                                tipClass: "tooltip-info",
                                title: function () {
                                    return $(this).text()
                                }
                            });
                            $('[data-toggle="tooltip"][content]').on("click", function () {
                                var content = $(this).attr("content");
                                (new $.zui.ModalTrigger({
                                    custom: "<div style='width:100%;word-break: break-all;word-wrap: break-word;'>" + content + "</div>",
                                    title: "提示信息"
                                })).show();
                            });
                        }
                        else {
                            $(dataContainer).html('<tr><td colspan="' + prevElelen + '" class="text-center">' + pubNoDataTips + '</td></tr>')
                        }
                    },
                    error: function (e) {
                    }
                });
            } else {
                // $("#LoadingBox01").remove();
            }
        }
    },
    setJsonCookie: function (name, data, options) {
        if (name) {
            if (data) {
                var cookieValue = JSON.stringify(data)
                if (options)
                    $.cookie(name, cookieValue, options);
                else
                    $.cookie(name, cookieValue);
            } else
                $.cookie(name, null, options);
        }
    },
    getJsonCookie: function (name, defaultData) {
        var cookie = $.cookie(name);
        if (cookie) {
            defaultData = JSON.parse(cookie);
        }
        return defaultData;
    }
}
function disableFormData(formId) {
    $('input,select,textarea', $("#" + formId)).not('input[type=hidden]').attr('disabled', true);
    //	$('input,select,textarea',$("#" + formId)).not('input[type=hidden]').css({"background-color":"#fff"});
}
var searchCommon = {
    start: function (options) {
        var that = this;
        var defaults = {
            url: null,
            data: null,
            formId: null,
            async: true,
            specialHandleReturnValue: null,
            batchHandle: function (ele, value) {
                var tagName = ele[0].tagName.toLowerCase();
                if (tagName == "select") {
                    if (!ele.hasClass('DisabledCover')) {
                        ele.val(value).trigger("change");
                    }
                } else if (ele.hasClass("datetimepicker")) {
                    if (!ele.hasClass('DisabledCover')) {
                        var date = converJsonDate(value);
                        ele.val(date.format("yyyy-MM-dd")).trigger("change");
                    }
                } else {
                    if (!ele.hasClass('DisabledCover')) {
                        ele.val(value);
                    }
                }
            },
            filter: null,
            isHidden: false,
        };
        //options合并到defaults中
        var opts = $.extend(defaults, options);
        if (opts.url && opts.data && opts.formId) {
            $.ajax({
                url: opts.url,
                data: opts.data,
                type: "POST",
                dataType: "json",
                async: opts.async,
                success: function (rs) {
                    if (rs.success == "y") {
                        var PhotoUrl = rs.ObjParams.PhotoUrl;//返回的图片路经
                        var rootPath = localStorage.getItem("CachRootPath");
                        //照片上传未上传提示
                        if (!($.isEmpty(PhotoUrl))) {
                            $("#photo").attr('src', "" + PhotoUrl + "");
                            var msg = '';
                            msg += '<img src="' + rootPath + 'Plug-in/sino/photo/dh.png" style="width:30px;">';
                            msg += '提示：上传成功。';
                            $("#file-list").empty().append(msg);
                        }
                        searchCommon.SetFormEmlemtsValue(opts.formId, rs.ObjParams, opts.specialHandleReturnValue, opts.batchHandle, opts.filter, opts.isHidden);
                    } else
                        bootbox.alert({
                            message: rs.msg, size: 'small'
                        });
                },
                error: function (e) {
                    bootbox.alert({
                        message: "查询信息异常！", size: 'small'
                    });
                }
            });
        }
    },
    SetFormEmlemtsValue: function (formId, o, specialHandle, batchHandle, filter, isHidden) {
        var formElements = $('input,select,textarea', $("#" + formId)).not('input[type=hidden]');
        if (isHidden)
            formElements = $('input,select,textarea', $("#" + formId));
        formElements.each(function () {
            var $this = $(this);
            var aname = $this.attr("name");
            var mapname = $this.attr("mapName");
            var isFilter = false;
            if (aname) {
                if (filter) {
                    if (filter.indexOf(aname) > -1)
                        isFilter = true;
                }
                if (!isFilter) {
                    for (var key in o) {
                        if (mapname && key.toLowerCase() == mapname.toLowerCase()) {
                            if (specialHandle && specialHandle[aname]) {
                                specialHandle[aname]($this, o[key]);
                                break;
                            } else if (batchHandle) {
                                batchHandle($this, o[key]);
                                break;
                            } else {
                                if (!$this.hasClass('DisabledCover')) {
                                    $this.val(o[key]);
                                }
                                break;
                            }
                        } else if (!mapname && key.toLowerCase() == aname.toLowerCase()) {
                            if (specialHandle && specialHandle[aname]) {
                                specialHandle[aname]($this, o[key]);
                                break;
                            } else if (batchHandle) {
                                batchHandle($this, o[key]);
                                break;
                            } else {
                                if (!$this.hasClass('DisabledCover')) {
                                    $this.val(o[key]);
                                }
                                break;
                            }
                        }
                    }
                }
            }
        });
    }
}
/**
 * 设置表单的元素只读或禁用
 */
function blankFormData(formId) {
    $('select,textarea', $("#" + formId)).val('');
    $('input[type=\'text\']', $("#" + formId)).val('');
    $('select', $("#" + formId)).val('');
}
/**
 * 隐藏变更按钮
 */
function hideEditButton(tableId, eleId) {
    $("#" + eleId).css({ "display": "none" });
    $("#" + tableId + " tr :last-child").remove();
}
var myTools = {
    deleteData: function (options) {
        var that = this;
        // 默认参数
        var defaults = {
            msg: "确认删除吗？", // 提示消息
            url: "",
            data: null, // 参数
            async: true,
            cache: false, // 是否缓存，缓存数据需要ajax同步
            callback: null,
            bootboxSize: "small"
        };
        var opts = $.extend(defaults, options);
        del(opts);
        function del(o) {
            bootbox.confirm({
                size: "small",
                message: o.msg,
                buttons: {
                    cancel: {
                        label: '<i class="fa fa-times"></i> 取消/Cancel',
                        className: 'btn-danger'
                    },
                    confirm: {
                        label: '<i class="fa fa-check"></i> 确定/Confirm',
                        className: 'btn-success'
                    }
                },
                callback: function (result) {
                    if (result) {
                        fnLoadingShow();
                        $.ajax({
                            url: o.url,
                            data: o.data,
                            type: "POST",
                            dataType: "json",
                            async: o.async,
                            complete: function () {
                                fnLoadingHide();
                            },
                            // success: function (rs) {
                            //     if (o.callback) {
                            //         o.callback(rs);
                            //     }
                            //     else if (rs == null) {
                            //         bootbox.alert({ message: "信息异常！", size: 'small' });
                            //     } else {
                            //         if (rs.success == "y") {
                            //
                            //             bootbox.alert({
                            //                 message: rs.msg, size: 'small', callback: function () {
                            //                     if (o.callback != null && o.callback != undefined)
                            //                         o.callback(rs);
                            //                 }
                            //             });
                            //         } else {
                            //             bootbox.alert({ message: rs.msg, size: 'small' });
                            //         }
                            //     }
                            // },
                            success: function (rs) {
                                if (rs == null) {
                                    bootbox.alert({
                                        message: "信息异常！", size: 'small'
                                    });
                                } else {
                                    if (rs.success == "y") {
                                        bootbox.alert({
                                            message: rs.msg, size: opts.bootboxSize, callback: function () {
                                                if (o.callback != null && o.callback != undefined)
                                                    o.callback(rs);
                                            }
                                        });
                                    }
                                    else {
                                        bootbox.alert({
                                            message: rs.msg, size: opts.bootboxSize
                                        });
                                    }
                                }
                            },
                            error: function (e) {
                                bootbox.alert({
                                    message: "信息异常！", size: 'small'
                                });
                            }
                        });
                    }
                }
            });
        }
    },
    getJsonFile: function (localAddr, callBack) {
        $.getJSON(localAddr, "", function (data) {
            if (callBack)
                callBack(data);
        });
    },
    setElementLanguage: function (localAddr, pageIdentifier, language) {
        this.getJsonFile(localAddr, function (data) {
            var o = null;
            for (var i = 0; i < data.stepManager.length; i++) {
                var d = data.stepManager[i];
                if (d.stepIdentifier == pageIdentifier) {
                    o = d;
                    break;
                }
            }
            if (o) {
                for (var i = 0; i < o.properties.length; i++) {
                    var property = o.properties[i];
                    var lan = "";
                    switch (language) {
                        case "CN":
                            lan = property.propertyDescriptionCN;
                            break;
                        case "EN":
                            lan = property.propertyDescriptionEN;
                            break;
                    }
                    var ele = $("" + property.htmlTag + "[name='" + property.propertyName + "']");
                    if (ele) {
                        var htmlTag = d.htmlTag;
                        if (language != "CN") {
                            ele.prev().text(lan);
                            if (htmlTag == "select")
                                ele.prop("placeholder", "please select " + lan)
                            else
                                ele.prop("placeholder", "please input " + lan)
                        }
                    }
                }
            }
        })
    }
}
function temporarySave(formid, callback) {
    var jsonData = $("#" + formid).serializeArray();
    var url = $("#" + formid).attr("action");
    if (jsonData && url) {
        $.ajax({
            url: url,
            type: "POST",
            data: jsonData,
            dataType: "JSON",
            async: false,
            cache: false,
            success: function (rs) {
                if (callback) {
                    callback(rs);
                }
                else if (rs.success == "y") {
                    alert("保存成功!");
                }
            },
            error: function (e) {
                alert("保存失败!");
            }
        });
    } else {
        alert("缺少必要参数!");
    }
}
function temporarySave2(formid, data, callback) {
    //var jsonData = $("#" + formid).serializeArray();
    var url = $("#" + formid).attr("action");
    if (data && url) {
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            dataType: "JSON",
            async: false,
            cache: false,
            success: function (rs) {
                if (callback)
                    callback(rs);
                else {
                    alert("保存成功!");
                }
            },
            error: function (e) {
                alert("保存失败!");
            }
        });
    } else {
        alert("缺少必要参数!");
    }
}
function Base64() {
    // private property  
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // public method for encoding  
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }
    // public method for decoding  
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }
    // private method for UTF-8 encoding  
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }
    // private method for UTF-8 decoding  
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
//======在edge浏览器里面禁用 百度编辑器上传图片、连接和附件功能======start
if (fnIEVersion() == 'edge') {//edge浏览器配置-删除了 'simpleupload', 'attachment'，links
    var uEditorConfig = {
        toolbars: [[
            'fullscreen', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'fontfamily', 'fontsize', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify'
        ]]
    }
} else {//其它浏览器配置
    var uEditorConfig = {
        toolbars: [[
            'fullscreen', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'fontfamily', 'fontsize', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'simpleupload'
        ]]
    }
}
//======在edge浏览器里面禁用 百度编辑器上传图片、连接和附件功能======end
var myAutoComplted = {
    initCommon: function (options) {
        var that = this;
        // 默认参数
        var defaults = {
            targetId: null,
            url: null, // 数据
            limit: 10,
            cache: false,
            data: null, // 参数
            callback: null
        };
        var opts = $.extend(defaults, options);
        $("#" + opts.targetId).bind("input propertychange", function (event) {
            $(this).autocompleter({
                // marker for autocomplete matches
                highlightMatches: true,
                // object to local or url to remote search
                source: opts.url,
                //source: source,
                // custom template
                template: '{{ label }}',
                //<span>({{ hex }})</span>
                // show hint
                hint: false,
                // abort source if empty field
                empty: true,
                // max results
                limit: opts.limit,
                cache: opts.cache,
                combine: function () {
                },
                callback: function (value, index, selected) {
                    opts.callback(value, index, selected);
                }
            });
        });
        $("#" + opts.targetId).blur(function () {
            $(this).autocompleter("destroy");
        });
    },
    initCooperative: function (regionName, targetId) {
        if (!regionName)
            regionName = "";
        var url = "../Dict/GetCooperativeNameInfoListByMultiRegionName.do?MultiRegionName=" + regionName + "";
        alert(url);
        this.initCommon({
            targetId: targetId, url: url, callback: function (value, index, selected) {
                $("#" + targetId).val(selected.label);
            }
        });
    }
}
function getAutoCompleteDataBySource(Urltext, AAgencyNameCN) {
    ClearAutoComplete(AAgencyNameCN);
    $('#' + AAgencyNameCN).autocompleter({
        // marker for autocomplete matches
        highlightMatches: true,
        // object to local or url to remote search
        source: Urltext + "?text=" + $("#" + AAgencyNameCN).val(),
        //source: source,
        // custom template
        template: '{{ label }}',
        //<span>({{ hex }})</span>
        // show hint
        hint: false,
        // abort source if empty field
        empty: true,
        // max results
        limit: 10,
        cache: false,
        combine: function () {
        },
        callback: function (value, index, selected) {
            if (selected) {
                //$('.icon').css('background-color', selected.hex);
                $("#" + AAgencyNameCN).val(selected.label);
            }
        }
    });
}

$(function () {
    $("input").each(function () {
        $(this).attr("autocomplete", "off");
    });
})
function ClearAutoComplete(AgencyId) {
    $('#' + AgencyId).autocompleter("destroy");
}
function getAutoCompleteData(RegionCode, AAgencyNameCN, AAgencyName) {
    ClearAutoComplete(AAgencyNameCN);
    var regionCode = "";
    if ($("#" + RegionCode).length > 0)
        regionCode = $("#" + RegionCode).val()
    var nametext = $("#" + AAgencyNameCN).val();
    $('#' + AAgencyNameCN).autocompleter({
        // marker for autocomplete matches
        highlightMatches: true,
        // object to local or url to remote search
        source: "../Dict/GetCooperativeNameInfoList.do?topN=10&regionCode=" + regionCode + "&name=" + nametext,
        //source: source,
        // custom template
        template: '{{ label }}',
        //<span>({{ hex }})</span>
        // show hint
        hint: false,
        // abort source if empty field
        empty: true,
        // max results
        limit: 10,
        cache: false,
        combine: function () {
        },
        callback: function (value, index, selected) {
            if (selected) {
                if (!$.isEmpty(AAgencyNameCN)) {
                    $("#" + AAgencyNameCN).val(selected.label);
                }
                if (!$.isEmpty(AAgencyName)) {
                    $("#" + AAgencyName).val(selected.NameEN);
                }
            } else {
                if (!$.isEmpty(AAgencyNameCN)) {
                    $("#" + AAgencyNameCN).val('');
                }
                if (!$.isEmpty(AAgencyName)) {
                    $("#" + AAgencyName).val('');
                }
            }
        }
    });
}
function getAutoCompleteDataByRegionName(RegionCode, AAgencyNameCN, AAgencyName) {
    ClearAutoComplete(AAgencyNameCN);
    var regionCode = "";
    if ($("#" + RegionCode).length > 0)
        regionCode = $("#" + RegionCode).val()
    var nametext = $("#" + AAgencyNameCN).val();
    $('#' + AAgencyNameCN).autocompleter({
        // marker for autocomplete matches
        highlightMatches: true,
        // object to local or url to remote search
        source: "../Dict/GetCooperativeNameInfoListRegionName.do?topN=10&RegionName=" + regionCode + "&name=" + nametext,
        //source: source,
        // custom template
        template: '{{ label }}',
        //<span>({{ hex }})</span>
        // show hint
        hint: false,
        // abort source if empty field
        empty: true,
        // max results
        limit: 10,
        cache: false,
        combine: function () {
        },
        callback: function (value, index, selected) {
            if (selected) {
                //$('.icon').css('background-color', selected.hex);
                $("#" + AAgencyNameCN).val(selected.label);
                $("#" + AAgencyName).val(selected.NameEN);
            } else {
                $("#" + AAgencyName).val("");
                $("#" + AAgencyNameCN).val("");
            }
        }
    });
}
function getAutoCompleteDataEn(RegionCode, AAgencyNameCN, AAgencyName) {
    ClearAutoComplete(AAgencyName);
    var regionCode = "";
    if ($("#" + RegionCode).length > 0)
        regionCode = $("#" + RegionCode).val()
    var nametext = $("#" + AAgencyName).val();
    $('#' + AAgencyName).autocompleter({
        // marker for autocomplete matches
        highlightMatches: true,
        // object to local or url to remote search
        source: "../Dict/GetCooperativeNameInfoListBylanguageType.do?languageType=EN&topN=10&regionCode=" + regionCode + "&name=" + nametext,
        //source: source,
        // custom template
        template: '{{ label }}',
        //<span>({{ hex }})</span>
        // show hint
        hint: false,
        // abort source if empty field
        empty: true,
        // max results
        limit: 10,
        cache: false,
        combine: function () {
        },
        callback: function (value, index, selected) {
            if (selected) {
                //$('.icon').css('background-color', selected.hex);
                $("#" + AAgencyNameCN).val(selected.Name);
                $("#" + AAgencyName).val(selected.NameEN);
            } else {
                $("#" + AAgencyName).val("");
                $("#" + AAgencyNameCN).val("");
            }
        }
    });
}
function getAutoCompleteDataByRegionNameEN(RegionCode, AAgencyNameCN, AAgencyName) {
    ClearAutoComplete(AAgencyName);
    var regionCode = "";
    if ($("#" + RegionCode).length > 0)
        regionCode = $("#" + RegionCode).val()
    var nametext = $("#" + AAgencyName).val();
    $('#' + AAgencyName).autocompleter({
        // marker for autocomplete matches
        highlightMatches: true,
        // object to local or url to remote search
        source: "../Dict/GetCooperativeNameInfoListRegionNameBylanguageType.do?languageType=EN&topN=10&RegionName=" + regionCode + "&name=" + nametext,
        //source: source,
        // custom template
        template: '{{ label }}',
        //<span>({{ hex }})</span>
        // show hint
        hint: false,
        // abort source if empty field
        empty: true,
        // max results
        limit: 10,
        cache: false,
        combine: function () {
        },
        callback: function (value, index, selected) {
            if (selected) {
                //$('.icon').css('background-color', selected.hex);
                $("#" + AAgencyNameCN).val(selected.Name);
                $("#" + AAgencyName).val(selected.NameEN);
            } else {
                $("#" + AAgencyName).val("");
                $("#" + AAgencyNameCN).val("");
            }
        }
    });
}
function CheckPasswordSecurity() {
    var a = document.getElementById("Password").value;
    if (a.length < 6) {
        //document.getElementById("passwordTool").innerHTML = "密码长度不能少于6位";
        //document.getElementById("newPwd").style.display = "inline";
        document.getElementById("password-grade1").style.borderTopColor = "gainsboro";
        document.getElementById("password-grade2").style.borderTopColor = "gainsboro";
        document.getElementById("password-grade3").style.borderTopColor = "gainsboro";
        //document.getElementById('SaveButton').style.display = "none";
    } else if (a == 'passw0rd' || a == 'password1' || a == 'password2' || a == 'password12' || a == 'password123' || a == 'myspace1' || a == 'qq123456' || a == 'trustno1' || a == 'blink182' || a == '1q2w3e' || a == '1q2w3e4r' || a == '1q2w3e4r5t' || a == '18atcskd2w' || a == '3rjs1la7qe' || a == 'admin888' || a == 'wang1234' || a == 'Qwerty' || a == 'Monkey' || a == 'Letmein' || a == 'Dragon' || a == 'Baseball' || a == 'Iloveyou' || a == 'Master' || a == 'Sunshine' || a == 'Ashley' || a == 'Bailey' || a == 'Shadow' || a == 'Superman' || a == 'Qazwsx' || a == 'Michael' || a == 'abc123' || a == 'a1b2c3' || a == 'aaa111' || a == '123qwe' || a == 'p@ssword') {
        //document.getElementById("passwordTool").innerHTML = "密码过于简单";
        //document.getElementById("newPwd").style.display = "inline";
        document.getElementById("password-grade1").style.borderTopColor = "gainsboro";
        document.getElementById("password-grade2").style.borderTopColor = "gainsboro";
        document.getElementById("password-grade3").style.borderTopColor = "gainsboro";
    } else if (a.length >= 6 && a.length <= 30) {
        //document.getElementById("newPwd").innerHTML = "";
        //document.getElementById("newPwd").style.display = "none";
        var reg = /^[0-9]{6,30}$|^[a-z]{6,30}$|^[A-Z]{6,30}$/; //全是数字或全是字母 6-30个字符
        var reg1 = /^[A-Za-z]{6,30}$|^[a-z0-9]{6,30}$|^[A-Z0-9]{6,30}$/; //数字、26个英文字母 6-30个字符
        var reg2 = /^[A-Za-z0-9]{6,30}$/;  // 由数字、26个英文字母或者下划线组成的字符串 6-30个字符
        if (a.match(reg)) {
            document.getElementById("password-grade1").style.borderTopColor = "#FF0033";
            document.getElementById("password-grade2").style.borderTopColor = "gainsboro";
            document.getElementById("password-grade3").style.borderTopColor = "gainsboro";
            //document.getElementById("passwordTool").innerHTML = "密码必须是数字与字母组合";
            //document.getElementById("newPwd").style.display = "inline";
            //document.getElementById('SaveButton').style.display = "none";
        } else if (a.match(reg1)) {
            document.getElementById("password-grade1").style.borderTopColor = "#FF0033";
            document.getElementById("password-grade2").style.borderTopColor = "#0066CC";
            document.getElementById("password-grade3").style.borderTopColor = "gainsboro";
            //  document.getElementById("passwordTool").innerHTML = "(备注：密码必须是数字与字母组合，长度不能少于6位)";
            //document.getElementById('passwordTool').style.display = "none";
            //document.getElementById('SaveButton').style.display = "block";
        } else if (a.match(reg2)) {
            document.getElementById("password-grade1").style.borderTopColor = "#FF0033";
            document.getElementById("password-grade2").style.borderTopColor = "#0066CC";
            document.getElementById("password-grade3").style.borderTopColor = "#99CC33";
            //  document.getElementById("passwordTool").innerHTML = "(备注：密码必须是数字与字母组合，长度不能少于6位)";
            //document.getElementById('SaveButton').style.display = "block";
        }
    } else if (a.length > 30) {
        //document.getElementById("passwordTool").innerHTML = "密码长度大于30位";
        //document.getElementById("newPwd").style.display = "inline";
        document.getElementById("password-grade1").style.borderTopColor = "gainsboro";
        document.getElementById("password-grade2").style.borderTopColor = "gainsboro";
        document.getElementById("password-grade3").style.borderTopColor = "gainsboro";
        //document.getElementById("passwordTool").innerHTML = "密码长度不能超过30位";
        //document.getElementById('SaveButton').style.display = "none";
    }
}
function sysCheckPasswordSecurity() {
    var a = document.getElementById("Password").value;
    if (a.length < 6) {
        //document.getElementById("passwordTool").innerHTML = "密码长度不能少于6位";
        //document.getElementById("newPwd").style.display = "inline";
        $("#password-grade1 span").css('borderTopColor', 'gainsboro');
        $("#password-grade2 span").css('borderTopColor', 'gainsboro');
        $("#password-grade3 span").css('borderTopColor', 'gainsboro');
        return false;
        //document.getElementById('SaveButton').style.display = "none";
    }              //如果是固定密码
    else if (a == 'passw0rd' || a == 'password1' || a == 'password2' || a == 'password12' || a == 'password123' || a == 'myspace1' || a == 'qq123456' || a == 'trustno1' || a == 'blink182' || a == '1q2w3e' || a == '1q2w3e4r' || a == '1q2w3e4r5t' || a == '18atcskd2w' || a == '3rjs1la7qe' || a == 'admin888' || a == 'wang1234' || a == 'Qwerty' || a == 'Monkey' || a == 'Letmein' || a == 'Dragon' || a == 'Baseball' || a == 'Iloveyou' || a == 'Master' || a == 'Sunshine' || a == 'Ashley' || a == 'Bailey' || a == 'Shadow' || a == 'Superman' || a == 'Qazwsx' || a == 'Michael' || a == 'abc123' || a == 'a1b2c3' || a == 'aaa111' || a == '123qwe' || a == 'p@ssword') {
        //document.getElementById("passwordTool").innerHTML = "密码过于简单";
        //document.getElementById("newPwd").style.display = "inline";
        document.getElementById("password-grade1").style.borderTopColor = "gainsboro";
        document.getElementById("password-grade2").style.borderTopColor = "gainsboro";
        document.getElementById("password-grade3").style.borderTopColor = "gainsboro";
        return false;
    } else if (a.length >= 6 && a.length <= 30) {
        //document.getElementById("newPwd").innerHTML = "";
        //document.getElementById("newPwd").style.display = "none";
        var reg = /^[0-9]{6,30}$|^[a-z]{6,30}$|^[A-Z]{6,30}$/; //全是数字或全是字母 6-30个字符
        var reg1 = /^[A-Za-z]{6,30}$|^[a-z0-9]{6,30}$|^[A-Z0-9]{6,30}$/; //数字、26个英文字母 6-30个字符
        var reg2 = /^[A-Za-z0-9]{6,30}$/;  // 由数字、26个英文字母或者下划线组成的字符串 6-30个字符
        if (a.match(reg)) {
            $("#password-grade1 span").css('borderTopColor', '#FF0033');
            $("#password-grade2 span").css('borderTopColor', 'gainsboro');
            $("#password-grade3 span").css('borderTopColor', 'gainsboro');
            //document.getElementById("passwordTool").innerHTML = "密码必须是数字与字母组合";
            return false;
            //document.getElementById("passwordTool").innerHTML = "密码必须是数字与字母组合";
            //document.getElementById("newPwd").style.display = "inline";
            //document.getElementById('SaveButton').style.display = "none";
        } else if (a.match(reg1)) {
            $("#password-grade1 span").css('borderTopColor', '#FF0033');
            $("#password-grade2 span").css('borderTopColor', '#0066CC');
            $("#password-grade3 span").css('borderTopColor', 'gainsboro');
            //document.getElementById("passwordTool").innerHTML = "(备注：密码必须是数字与字母组合，长度不能少于6位)";
            //document.getElementById('passwordTool').style.display = "none";
            //document.getElementById('SaveButton').style.display = "block";
        } else if (a.match(reg2)) {
            $("#password-grade1 span").css('borderTopColor', '#FF0033');
            $("#password-grade2 span").css('borderTopColor', '#0066CC');
            $("#password-grade3 span").css('borderTopColor', '#99CC33');
            //document.getElementById("passwordTool").innerHTML = "(备注：密码必须是数字与字母组合，长度不能少于6位)";
            //document.getElementById('SaveButton').style.display = "block";
        }
    } else if (a.length > 30) {
        //document.getElementById("passwordTool").innerHTML = "密码长度大于30位";
        //document.getElementById("newPwd").style.display = "inline";
        $("#password-grade1 span").css('borderTopColor', 'gainsboro');
        $("#password-grade2 span").css('borderTopColor', 'gainsboro');
        $("#password-grade3 span").css('borderTopColor', 'gainsboro');
        //document.getElementById("passwordTool").innerHTML = "密码长度不能超过30位";
        //document.getElementById('SaveButton').style.display = "none";
        return false;
    }
}
//取消选择专家
function shuaxin() {
    parent.$('#shuaxin').click();
}
//查看附件图片按扭方法
function viewAttPageDetail(settingID, relatedID, token) {
    viewAttTrigger = new $.zui.ModalTrigger({
        type: "ajax",
        width: "800px",
        height: "420px",
        url: "../Attachment/FileDetail3.do?settingID=" + settingID + "&relatedID=" + relatedID + "&token=" + token + '&t=' + Math.random(1000) + "&type=1",
        title: '查看附件',
        shown: function () {
            if ($paratsDetailIframeId.length > 0 && $('.menu-header').length > 0 && addressUrl.indexOf("detail") != -1) { //详情页面左边有浮动导航，并且地址栏包含detail
                fnModalDialogHander();
            }
        },
        onHide: function () {
        }
    });
    viewAttTrigger.show();
}
function downloadAtts(settingID, relatedID, shortName, token) {
    window.open("../Attachment/DownLoadAttachments2.do?settingID=" + settingID + "&relatedID=" + relatedID + "&token=" + token + "&shortName=" + shortName);
}
//假删除
function deleteOtherAtts3(settingID, relatedID, token) {
    bootbox.confirm({
        message: "确认删除吗？",
        size: 'small',
        buttons: {
            confirm: {
                label: '确定/Confirm',
                className: 'btn-success'
            },
            cancel: {
                label: '取消/Cancel',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "../Attachment/DeleteAttachment3.do",
                    type: "POST",
                    data: { "settingID": settingID, "relatedID": relatedID, "token": token },
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (rs) {
                        if (rs.success == "y") {
                            location.reload();
                        } else {
                            bootbox.alert({
                                message: rs.msg, size: 'small'
                            });
                        }
                    },
                    error: function (e) {
                        bootbox.alert({
                            message: "删除异常！", size: 'small'
                        });
                    }
                });
            }
        }
    });
}
function deleteOtherAtts(settingID, relatedID, token) {
    bootbox.confirm({
        message: "确认删除吗？",
        size: 'small',
        buttons: {
            confirm: {
                label: '确定/Confirm',
                className: 'btn-success'
            },
            cancel: {
                label: '取消/Cancel',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "../Attachment/DeleteAttachment2.do",
                    type: "POST",
                    data: { "settingID": settingID, "relatedID": relatedID, "token": token },
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (rs) {
                        if (rs.success == "y") {
                            location.reload();
                        } else {
                            bootbox.alert({
                                message: rs.msg, size: 'small'
                            });
                        }
                    },
                    error: function (e) {
                        bootbox.alert({
                            message: "删除异常！", size: 'small'
                        });
                    }
                });
            }
        }
    });
}
function DeleteAudit(id) {
    DeleteAudit(id, "");
}
function DeleteAudit(id, token) {
    bootbox.confirm({
        message: "您确认要删除此步骤？",
        size: 'small',
        buttons: {
            confirm: {
                label: '确定/Confirm',
                className: 'btn-success'
            },
            cancel: {
                label: '取消/Cancel',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: '../Common/DelCommonAuditInfo.do',
                    data: {
                        auditID: id,
                        auditTable: $("#auditTable").val(),
                        token: token
                    },
                    type: "POST",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        if (data.success == "y") {
                            bootbox.alert({
                                message: data.msg,
                                size: 'small',
                                callback: function () {
                                    location.reload();
                                }
                            });
                        } else {
                            bootbox.alert({
                                message: data.msg, size: 'small'
                            });
                        }
                    },
                    error: function (e) {
                    }
                });
            }
        }
    });
}
//---显示部门变更窗口
function ChangeAgencyCode(auditID, token) {
    var regionTrigger = new $.zui.ModalTrigger({
        type: "ajax",
        url: "../Common/AuditInfoStep.do?auditID=" + auditID + "&token=" + token + "&auditTable=" + $("#auditTable").val() + '&t=' + Math.random(1000),
        title: '步骤修改',
        width: "800px",
        backdrop: 'static',
        index: 1001,
        onHide: function () {
        }
    });
    regionTrigger.show();
};
function getAutoCompleteStaffNameData(StaffName, StaffCode) {
    ClearAutoComplete(StaffName);
    var nametext = $("#" + StaffName).val();
    $('#' + StaffName).autocompleter({
        // marker for autocomplete matches
        highlightMatches: true,
        // object to local or url to remote search
        source: "../Dict/getAutoCompleteStaffOrAgencyData.do?topN=10&name=" + nametext,
        //source: source,
        // custom template
        template: '{{ label }}',
        //<span>({{ hex }})</span>
        // show hint
        hint: false,
        // abort source if empty field
        empty: true,
        // max results
        limit: 10,
        cache: false,
        combine: function () {
        },
        callback: function (value, index, selected) {
            if (selected) {
                $("#" + StaffName).val(selected.label);
                $("#" + StaffCode).val(selected.value);
            } else {
                $("#" + StaffName).val("");
                $("#" + StaffCode).val("");
            }
        }
    });
}
function getAutoCompleteAgencyNameData(AgencyName, AgencyCode) {
    ClearAutoComplete(AgencyName);
    var nametext = $("#" + AgencyName).val();
    $('#' + AgencyName).autocompleter({
        // marker for autocomplete matches
        highlightMatches: true,
        // object to local or url to remote search
        source: "../Dict/getAutoCompleteStaffOrAgencyData.do?topN=10&agencyName=" + nametext,
        //source: source,
        // custom template
        template: '{{ label }}',
        //<span>({{ hex }})</span>
        // show hint
        hint: false,
        // abort source if empty field
        empty: true,
        // max results
        limit: 10,
        cache: false,
        combine: function () {
        },
        callback: function (value, index, selected) {
            if (selected) {
                $("#" + AgencyName).val(selected.label);
                $("#" + AgencyCode).val(selected.value);
            } else {
                $("#" + AgencyName).val("");
                $("#" + AgencyCode).val("");
            }
        }
    });
}
function getCommonLognProgress(code, relateTable, functionCode) {
    var CodeInfoForProgress = $("#CodeInfoForProgress").text();
    if (CodeInfoForProgress)
    {
        $("#CodeInfoForProgress").text(code);
    }

    $.ajax({
        url: 'SystemManager/getCommonLognProgress.do',
        data: {
            code: code,
            tableName: relateTable,
            functionCode: functionCode,
        },
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            var strhtml = '';
            $(data).each(function (i, o) {
                if (i == 0) {
                    strhtml += '<li> <div class="ProjectApplyDetailBadge"><i class="icon icon-circle text-success"></i></div>'
                } else {
                    strhtml += '<li> <div class="ProjectApplyDetailBadge"><i class="icon icon-circle"></i></div>'
                }
                strhtml += '<div class="ProjectApplyDetailPanel">';
                strhtml += ' <div class="ProjectApplyDetailHeading clearfix">';
                strhtml += '<span>' + Date.convertFromJson(o.HandledDate).formatDate("yyyy-MM-dd hh:mm") + '</span>';
                strhtml += '</div>'
                var shoolCode = localStorage.getItem("SchoolCodeVlue");
                if (shoolCode == "2247") {
                    strhtml += '  <div class="ProjectApplyDetailBody">' + o.Title + o.Content + '</div>';
                } else
                {
                    if (o.Title)
                        strhtml += '  <div class="ProjectApplyDetailBody">' + o.Title + '</div>';
                    else
                        strhtml += '  <div class="ProjectApplyDetailBody">' + o.Content + '</div>';
                }
                strhtml += '</div>'
                strhtml += '</li>'
            });
            $('#ProjectApplyDetail').html(strhtml);
        },
        error: function (e) {
        }
    });
}
//获取审批流程信息
function ShowFlowInfo(relatedID, applyCode, relatedTableName, auditTable,callback) {
    var FlowTrigger = new $.zui.ModalTrigger({
        type: "ajax",
        url: "../Common/ShowFlowInfo.do?relatedID=" + relatedID + "&relatedTableName=" + relatedTableName + "&applyCode=" + applyCode + "&auditTable=" + auditTable + '&t=' + Math.random(1000),
        showHeader: true,
        title: '审批流程图',
        backdrop: 'static',
        size: 'fullscreen',
        scrollInside: true,
        index: 1001,
        onHide: function () {
            callback && callback()
        }
    });
    FlowTrigger.show();
}
//获取审批流程信息(新做的-海洋大学使用)
function ShowFlowInfoNew(relatedID, applyCode, relatedTableName, auditTable) {
    //var FlowTrigger = new $.zui.ModalTrigger({
    //    type: "iframe",
    //    url: "../Common/ShowFlowInfoNew.do?relatedID=" + relatedID + "&relatedTableName=" + relatedTableName + "&applyCode=" + applyCode + "&auditTable=" + auditTable + '&t=' + Math.random(1000),
    //    showHeader: true,
    //    title: '审批流程图',
    //    backdrop: 'static',
    //    size: 'fullscreen',
    //    index: 1001,
    //    onHide: function () {
    //    }
    //});
    //FlowTrigger.show();
   location.href = "../Common/ShowFlowInfoNew.do?relatedID=" + relatedID + "&relatedTableName=" + relatedTableName + "&applyCode=" + applyCode + "&auditTable=" + auditTable + '&t=' + Math.random(1000)
}
$(function () {
    if ($(".tableExpandContract").length > 0) {//详情页面进度信息展开收缩
        ExpandContract();
    }
    // 详情信息导航监听滚动效果
    //scrollspyMenuFixed();(暂时废弃)
    //日期插件禁止右键各粘贴
    handleProhibitDate();
    //为中央美术学校单独处理样式
    fnCafaStyle();
    // 工作便签弹出框隐藏时滚动条位置不变
    $('#WorkNotepaperModal').on('hide.zui.modal', function () {
        $('html,body').animate({
            scrollTop: $(window).scrollTop()
        }, 800);
    });
    // safari浏览器选择下拉的时候页面滚动到底部问题
    if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
        $("select").on("change", function () {
            $('html,body').animate({
                scrollTop: $(window).scrollTop()
            }, 800);
        })
    }
    ;
    // 详情页面图文信息 及 一行四列表格 单元格增加自动高度及两列时判断
    fnGraphicInfo();
    //如果没有超过两行查询框 展开、收起按扭隐藏
    isExpandAandCloseBtn();
    try {
        //鼠标划过提示文字效果
        $('[data-toggle="tooltip"]').tooltip({
            tipClass: "tooltip-info",
            title: function () {
                return $(this).text()
            }
        });
    } catch (e) { }
    // 详情页面用iframe插入到外事年报、合作伙伴、搜索页里面不能fiexed问题；
    fnDetailScrollFixed();
})
//详情进度信息加class类tableExpandContract (展开、收缩)
function ExpandContract() {
    var shoolCode = localStorage.getItem("SchoolCodeVlue");
    var excludeSchool = ["2054"];//排除的学校
    var $tableParent = $(".tableExpandContract");
    $tableParent.each(function (i, cur) {
        if (excludeSchool.indexOf("2054") != -1) {
            var curHeight = $(cur).height();
            var btnReadMore = "<div class=\"hide-box\"> <a class=\"btn-readmore\">展开全部<i class=\"icon icon-chevron-down\"></i></a></div>";
            if (curHeight >= (curHeight - 2) && $tableParent.find("tbody tr").length > 0) {
                $(cur).append(btnReadMore);
                $(cur).find(".btn-readmore").on("click", function () {
                    $(cur).toggleClass("on");
                    if ($(cur).hasClass("on")) {
                        $(this).html("收缩全部<i class=\"icon icon-chevron-up\"></i>");
                    } else {
                        $(this).html("展开全部<i class=\"icon icon-chevron-down\"></i>");
                    }
                });
            }
        } else {
            $(cur).css("max-height", "inherit");

        }
    })
}
// =============详情信息导航监听滚动效果 =============start
function scrollspyMenuFixed() {
    if ($('.menuFixedContent').length != 0) {
        $('.menuFixedContent').scrollspy({
            target: '.leftFixedMenu',
            offset: 20
        })
    } else {
    }
}
// ============子iframe按扭点击左边导航自动点击方法 =============start
function handleJumpLink(linkStr) {
    var fatherEle = $("#main-container", parent.document);
    var navList = $(fatherEle).find("#nav_list");
    var navListChild = $(navList).children("li");
    $(navListChild).each(function (i, curEle) {
        if ($(curEle).hasClass("open") || $(curEle).hasClass("active")) {
            $(curEle).find(".submenu > li").each(function (j, cEle) {
                var childNameStr = $(cEle).find("a").attr("name");
                if (linkStr && childNameStr.indexOf(linkStr) !== -1) {
                    $(cEle).find("a")[0].click();
                }
            })
        }
    })
}
//============日期插件禁止右键各粘贴============start
function handleProhibitDate() {
    $('.datetimepicker').each(function (i, curEle) {
        var dataOption = {
            icon: 'warning-sign',
            type: 'danger',
            placement: 'center',
            close: true,
        };
        var myMessager = new $.zui.Messager(dataOption);
        $(curEle).on('paste', function () { //禁止粘贴
            myMessager.show('禁止粘贴,请点击弹出框选择！');
            return false
        });
        $(curEle).on('contextmenu', function () {//禁止右键
            myMessager.show('禁止右键,请点击弹出框选择！');
            return false
        });
    });
}
//============日期插件禁止右键各粘贴============end
//============移动端后台管理相关js============start
/**
 * Creation time:20200212;
 * Author:wanghcao;
 * Project:Mobile
 */

// 在列表或者详情页头和底部隐藏
function topAndfootHide() {
    var grandpaEle = $("#grandpaEle", parent.document);
    var mbHeader = $(grandpaEle).find(".Mobile-headerBox");
    var mbFooder = $(grandpaEle).find(".mobile-footer");
    var iframeEle = $(grandpaEle).find("#iframe");
    $(mbHeader).hide();
    $(mbFooder).hide();
    // $(iframeEle).css("height","100vh!important")
    $(iframeEle).addClass("iframeEleHeight")
}
//============移动端后台管理相关js============end
//============为中央美术大学（2035）单独处理样式问题============start
function fnCafaStyle() {
    var schoolMeiYuanBiaoShi = localStorage.getItem("schoolMeiYuanValue");
    if (schoolMeiYuanBiaoShi && schoolMeiYuanBiaoShi == '2035DB') {
        $(".btn").addClass("btn2035");
    }
}
//============为中央美术大学（2035）单独处理样式问题============end
//============获取IE版本函数============start
// 获取IE版本函数
function fnIEVersion() {
    // 取得浏览器的userAgent字符串
    var userAgent = navigator.userAgent;
    // 判断是否为小于IE11的浏览器
    var isLessIE11 = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;
    // 判断是否为IE的Edge浏览器
    var isEdge = userAgent.indexOf('Edge') > -1 && !isLessIE11;
    // 判断是否为IE11浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    if (isLessIE11) {
        var IEReg = new RegExp('MSIE (\\d+\\.\\d+);');
        // 正则表达式匹配浏览器的userAgent字符串中MSIE后的数字部分，，这一步不可省略！！！
        IEReg.test(userAgent);
        // 取正则表达式中第一个小括号里匹配到的值
        var IEVersionNum = parseFloat(RegExp['$1']);
        if (IEVersionNum === 7) {
            // IE7
            return 7
        } else if (IEVersionNum === 8) {
            // IE8
            return 8
        } else if (IEVersionNum === 9) {
            // IE9
            return 9
        } else if (IEVersionNum === 10) {
            // IE10
            return 10
        } else {
            // IE版本<7
            return 6
        }
    } else if (isEdge) {
        // edge
        return 'edge'
    } else if (isIE11) {
        // IE11
        return 11
    } else {
        // 不是ie浏览器
        return -1
    }
}
//============获取IE版本函数============end
// 详情页面图文信息 及 一行四列表格 单元格增加自动高度及两列时判断
function fnGraphicInfo() {
    var $GraphicInfo = $(".g-GraphicInfo");
    var $item = $(".g-GraphicInfo > .g-GraphicInfo-item");
    if ($GraphicInfo.length > 0 && $item.length > 0) {
        $item.each(function (i, cur) {
            var thisH = $(cur).height();
            $("> div", cur).css("height", thisH);
            if ($("> div", cur).length === 2) {
                $("> div:last-of-type", cur).css("width", "81%")
            }
        })
    }

}
// ============顶部搜索更多查询条件收起，展开方法 ============start
/**

 * @author wangchao
 * @time 20200622
 * @param obj：顶部查询收缩展开是否被点击
 * 说明 默认是收起，需要默认展开的可以参考2015学生海外列表  data-istype="1"
 */
function moreConditionsToggle(obj) {
    var arrangement = $(obj).data("arrangement") ? $(obj).data("arrangement") : "horizontal";//vertical折行换行br排，horizontal横排(默认)
    var entext = $(obj).data("entext");//英文提示
    //$(obj).parents(".widget-body").css("overflow", "hidden");
    var eleLen = $("#searchInfoForm > .row:first-of-type > div[class*='-3']").length;
    var eleLen2 = $("#searchInfoForm > .row:first-of-type > div[class*='-2']").length;
    var shouqiinfo = '收起更多查询条件';
    var zhankaiinfo = '展开更多查询条件';
    if (!($.isEmpty(entext))) {
        var brHtml = arrangement == "vertical"?"<br/>":"";
        shouqiinfo = shouqiinfo + brHtml + entext;
        zhankaiinfo = zhankaiinfo + brHtml + entext;
        
    }
    try {
        //也可以从页面传过来（有英文的情况）
        if (!($.isEmpty($(obj).data("shouqiinfo")))) {
            shouqiinfo = $(obj).data("shouqiinfo");
        };
        if (!($.isEmpty($(obj).data("shouqiinfo")))) {
            zhankaiinfo = $(obj).data("zhankaiinfo");
        }
    } catch (err) {
    }
    var gtNum = 0;
    if (eleLen2 > 0 && eleLen2 >= 5) {
        gtNum = 4;
    } else {
        gtNum = 3;
    }
    $('#searchInfoForm > .row:first-of-type').toggleClass("toggleChange");
    if ($('#searchInfoForm > .row:first-of-type').hasClass("toggleChange")) {
        $("#searchInfoForm > .row:first-of-type > div:gt(" + gtNum + ")").show();
        $("#searchInfoForm > .row:first-of-type").css('height', 'inherit');
        $(obj).html(function (n) {
            return '<i class="icon icon-angle-up mg-r-5"></i>' + shouqiinfo;
        })
    } else {
        $("#searchInfoForm > .row:first-of-type").css('height', $("#searchInfoForm > .row:first-of-type > div").height() + 10 + 'px');
        $(obj).html(function (n) {
            return '<i class="icon icon-angle-down mg-r-5"></i>' + zhankaiinfo;
        });
        $("#searchInfoForm > .row:first-of-type > div:gt(" + gtNum + ")").hide();
    }
}
//如果没有超过两行查询框 展开、收起按扭隐藏
function isExpandAandCloseBtn() {
   
    if ($("#searchInfoForm").length > 0) {
        $("#searchInfoForm > .row:first-of-type > div").show();
        // $("#searchInfoForm").parents(".widget-body").css("overflow","hidden");
        var eleLen = $("#searchInfoForm > .row:first-of-type > div[class*='-3']").length;
        var eleLen2 = $("#searchInfoForm > .row:first-of-type > div[class*='-2']").length;
        var gtNum = 0;
        if (eleLen2 > 0 && eleLen2 >= 5) {
            gtNum = 4;
        } else {
            gtNum = 3;
        }
        if ((eleLen > 0 && eleLen <= 4) || (eleLen2 > 0 && eleLen2 <= 5)) {
            $("button[onclick='moreConditionsToggle(this)']").remove();
        }
        var isType = $("#searchInfoForm").data("istype");//默认0收起，1展开
        if (!$.isEmpty(isType) && isType == "1") {//1展开
            $("#searchInfoForm > .row:first-of-type").css('height', 'inherit');
            $("#searchInfoForm > .row:first-of-type > div:gt(" + gtNum + ")").show();
        } else {
            //默认0收起
            $("#searchInfoForm > .row:first-of-type").css('height', $("#searchInfoForm > .row:first-of-type > div").height() + 10 + 'px');
            $("#searchInfoForm > .row:first-of-type > div:gt(" + gtNum + ")").hide();
        }
       
    }
}
// ============顶部搜索更多查询条件收起，展开方法 ============start
// ============详情页面用iframe插入到外事年报、合作伙伴、搜索页里面时，导航弹出框不能fiexed问题============start；
function fnDetailScrollFixed() {
    if ($paratsDetailIframeId.length > 0 && $('.menu-header').length > 0 && addressUrl.indexOf("detail") != -1) {//判断是否从外事系统点击进来的
        //审核功能去掉
        $("#daiAudit").hide().addClass("DetailScrollFixedHide");
        $("a[href='#daiAudit']").parent("li").hide().addClass("DetailScrollFixedHide");
        var currTop = $(parent.window).scrollTop();
        $(parent.window).scrollTop(currTop + 1);
        $(parent.window).scroll(function () {
            var fatherDiv = $('.menu-header').parent("div");
            if (fatherDiv.length > 0) {
                var parentScrollTop = $(parent.window).scrollTop();
                if (parentScrollTop >= 59) {
                    $('.menu-header').parent("div").css({
                        top: $(parent.window).scrollTop() - 80 + 'px'
                    });
                }
            }
        });
        // ,#triggerModal,#myModal
        fnModalDialogHander();
        $('#AduitModal').on('shown.zui.modal', fnModalDialogHander);
        $('#myModal').on('shown.zui.modal', fnModalDialogHander);
    }
}
//弹出框设置样式 
function fnModalDialogHander() {
    $(".modal-dialog").css({
        top: $('.menu-header').parent("div").position().top + 150,
        position: "fixed",
        left: '0',
        right: '0',
        'margin-top': 0
    })
}
// ============详情页面用iframe插入到外事年报、合作伙伴、搜索页里面时，导航弹出框不能fiexed问题============end；
//============进度信息鼠标划过移出效果============start
//显示进度审核人弹出
function ShowThisStepAuditStaff(obj, EabroadAuditID, RelatedIDInfo, FunctionCode) {
    var defaultOpt = {
        PaceInfoUrl: "",
        RealtedTable: ""
    }
    var newOpt = $.extend(defaultOpt, AjaxUrlJson);
    $(obj).find(".g-paceCont").html("");
    $(obj).find(".g-pacePopBox").show();
    $(obj).find(".g-paceCont").html('<div data-loading="" class="load-indicator loading" style="width: 50px; height:50px; background: transparent;position:relative;margin:0 auto"></div>');
    var params = {
        ID: EabroadAuditID,
        RelatedID: RelatedIDInfo,
        RealtedTable: ""
    }
    //页面配置里是否包含 FunctionCode
    if (!(typeof (newOpt.FunctionCode) == "undefined") && !($.isEmpty(newOpt.FunctionCode))) {
        params.FunctionCode = newOpt.FunctionCode;
    }
    if (FunctionCode) {
        params.FunctionCode = FunctionCode;
    }
    if (newOpt.RealtedTable) {
        params.RealtedTable = newOpt.RealtedTable;
    }
    $.ajax({
        url: newOpt.PaceInfoUrl,
        data: params,
        type: "GET",
        dataType: "json",
        success: function (rs) {
            if (rs.success == "y") {
                $(obj).find(".g-paceCont").html("审核人：" + rs.ObjParams);
            }
            else {
                $("#g-paceCont").html("暂无数据！")
            }
        },
        error: function (e) {
        }
    })
}
//隐藏进度审核人弹出
function HideThisStepAuditStaff(obj) {
    $(obj).find(".g-pacePopBox").hide();
}
//============进度信息鼠标划过移出效果============end
//============详情页面局部加loading动画效果============end

//============输入身份证和手机号弹出框============start
//创建新项目
//function fnGreatProject(obj) { 
//    var defaultOpt = $.extend({linkUrl: ''}, CodeAndToken);
//    var newOpt = $.extend(defaultOpt, obj);
//    isShowCheckStaffPop(true, newOpt);
//    sessionStorage.setItem("cacheGreatProjectParams", JSON.stringify(newOpt));
//}
//年度总结上报、验收报告、评估报告按扭
//function fnJumpToAddress(params) {
//    var defaultOpt = {
//        summaryReportID: 0
//    }
//    var newOpt = $.extend(defaultOpt, params);
//    isShowCheckStaffPop(true, CodeAndToken);//CodeAndToken 是写在页面里面的一个对象
//    sessionStorage.setItem("cacheJumpParams", JSON.stringify(newOpt));
//}
//用户实名认证信息确认 弹出框  is :true/false ,data :code,token
//function isShowCheckStaffPop(is, data) {
//    var scode = data.scode;
//    var token = data.token;
//    var addressUrl = '';
//    var myModalTrigger = new $.zui.ModalTrigger({
//        size: 'lg',
//        name: "CheckStaffInfo",
//        title: "用户实名认证信息确认",
//        type: "iframe",
//        height: "420px",
//        className: "checkStaffPop",
//        url: '../SystemManager/CheckStaffInfo.do?scode=' + scode + '&token=' + token + '&v=' + Math.random(),
//    });
//    myModalTrigger.show({
//        loaded: function () {
//            //if (typeof (data.addressUrl) != 'undefined') {
//            //    addressUrl = data.addressUrl;
//            //    if (addressUrl == "MyProjectReportDeclare") {//归口部门总结  年度总结上报
//            //        sessionStorage.setItem("addressUrl", addressUrl);
//            //    }
//            //}
//        },
//        hidden: function () {
//            sessionStorage.removeItem("cacheGreatProjectParams");
//            sessionStorage.removeItem("cacheJumpParams");
//            sessionStorage.removeItem("addressUrl");
//        }
//    });
//}
//创建新项目
function fnGreatProject(obj) {
    var defaultOpt = $.extend({ linkUrl: '' }, CodeAndToken);
    var newOpt = $.extend(defaultOpt, obj);
    location.href = newOpt.linkUrl
}
//年度总结上报、验收报告、评估报告按扭
function fnJumpToAddress(params) {
    var defaultOpt = {
        summaryReportID: 0
    }
    var newOpt = $.extend(defaultOpt, params);
    var newOptStr = JSON.stringify(newOpt);
    if (newOptStr && newOptStr != null) {
        var summaryReportID = JSON.parse(newOptStr).summaryReportID;
        if (summaryReportID == 0 || summaryReportID == 8 || summaryReportID == 9 || summaryReportID == 10 || summaryReportID == 11 || summaryReportID == 12) {
            verifyBeforeJumpHandle(newOptStr);
        } else {
            fnActionDoneToNotice(newOptStr)
        }
    } 
}
function fnActionDoneToNotice(newOptStr) {
    var params = $.extend({}, JSON.parse(newOptStr));
    var link = params.linkUrl;
    var linkParms = '';
    for (k in params) {
        if (k != 'linkUrl') {
            linkParms += "&" + k + "=" + params[k]
        }
    };
    window.location = link + "?" + linkParms.slice(1);
}
function fnActionDoneToEdit(newOptStr) {
    var params = $.extend({}, JSON.parse(newOptStr));
    params.token = params.ptoken;
    var summaryReportID = Number(params.summaryReportID);
    var link = '';
    if (summaryReportID == 10 || summaryReportID == 11) {
        link = "../ProjectSummary/AssessBaseInfoStep.do";
    }
    else if (summaryReportID == 12) {
        link = "../ProjectSummary/AssessReportBaseInfoStep.do";
    }
    else {
        link = "../ProjectSummary/ApplyBaseInfoStep.do";
    }
    var linkParms = '';
    for (k in params) {
        if (k != 'linkUrl') {
            linkParms += "&" + k + "=" + params[k]
        }
    };
    window.location = link + "?" + linkParms.slice(1);
}

function verifyBeforeJumpHandle(newOptStr) {
    var ajaxUrl = "../ProjectSummary/CheckApply.do";
    var params = JSON.parse(newOptStr);
    params.token = params.ptoken;
    delete params.linkUrl;
    var states = '';
    $.ajax({
        url: ajaxUrl,
        data: params,
        type: "POST",
        dataType: "json",
        async: true,
        success: function (data) {
            if (data == null) {
                window.parent.bootbox.alert({ message: "系统异常！", size: 'small' });
            } else {
                if (data.success == "y") {
                    states = data.ExtInfo;
                    if (states == '0') {
                        fnActionDoneToNotice(newOptStr);
                    } else if (states == '1') {
                        fnActionDoneToEdit(newOptStr);
                    }
                }
                else if (data.success == "n" && Number(data.ExtInfo) > 1) {
                    bootbox.alert({ message: data.msg, size: 'small' });
                }
            }
        },
        error: function (e) {
            window.parent.bootbox.alert({ message: "系统异常！", size: 'small' });
        }
    });
}
//============输入身份证和手机号弹出框============end

/**
 * @param msg：文字信息
 * @param obj：父级样式或者id ，'.xx'or'#xx'
 */
function fnLoadingShow(msg, obj) {
    var tip = $.isEmpty(msg) ? "正在加载数据..." : msg;
    if ($(obj).length > 0) {
        $(obj).append(oLoadingAnimateHtml);
        $("#LoadingBox01").css("position", "absolute")
    } else {
    $("body").append(oLoadingAnimateHtml);
    }
    $("#LoadingBox01").find(".text").text(tip);
}
function fnLoadingHide() {
    $("#LoadingBox01").remove();
}
//获得页面ts && userToken值
function fnGetTsUserToken(callBack) {
    $.ajax({
        url: '../Common/GetDaiBanOtherData.do',
        data: {
        },
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
//============add 20210524 操作附件相关============start
//上传附件弹出框
function fnUploadAttBatchChild(params) {
    var relatedToken = params.relatedToken;
    var SecurityBatchUploadTrigger;
    //只能上传一个文件(参考南京理工、南京信息工程大学教师出国境附件上传) 
    //使用方法：1需要设置IsMultiple:{{ d.DataList[i].IsMultiple}},UploadedCount:{{ d.DataList[i].UploadedCount}}，2在‘附件管理’设置
    if (typeof (params.IsMultiple) != "udefined") {
        if (!params.IsMultiple && params.UploadedCount > 0) {
            bootbox.alert({ message: '“' + params.AttachmentName + '”只能上传一个文件，请删除后再上传!', size: 'small' });
            return;
        }
    }
    SecurityBatchUploadTrigger = new $.zui.ModalTrigger({
        type: "ajax",
        width: "90%",
        height: "400px",
        //url: "../Attachment/SecurityFileStep2.do?settingID=" + params.settingID + "&relatedID=" + params.relatedID + "&token=" + params.token + "&relatedToken=" + relatedToken + "&relatedTable=" + params.relatedTable + '&t=' + Math.random(1000) + '&SecretTipsIsHide=' + params.SecretTipsIsHide + '&minSize=' + params.minSize + '&IsMultiple=' + params.IsMultiple,
        url: "../Attachment/SecurityFileStep2.do?settingID=" + params.settingID + "&relatedID=" + params.relatedID + "&token=" + params.token + "&relatedToken=" + relatedToken + "&relatedTable=" + params.relatedTable + '&t=' + Math.random(1000) + '&SecretTipsIsHide=' + params.SecretTipsIsHide + '&IsMultiple=' + params.IsMultiple + '&funCode=' + params.funCode,
        title: '批量上传附件',
        onHide: function () {
            AttachmentCallBack(params, null)
        }
    });
    SecurityBatchUploadTrigger.show();
}
//上传附件方法
function SecurityUploadAttBatch(params) { 
    var newOpt = getAttachmentData(params);
    if (newOpt.relatedID != "0" && newOpt.relatedToken) {// 放在第二页or是修改页面
        fnUploadAttBatchChild(newOpt);
    } else {
        fnLoadingShow();
        /*第一页增加附件执行程序 （参照对外经济贸易大学2033 国际交换生 ）StudentToChinaExchange/AddNominationStudent.js*/
        var wait = function (dtd) {
            var dtd = $.Deferred(); //在函数内部，新建一个Deferred对象
            var tasks = function () {
                AttachmentCallBack(newOpt, dtd)
            };
            setTimeout(tasks, 2000);
            return dtd.promise(); // 返回promise对象
        };
        $.when(wait())
        .done(function (params) {//暂存完以后（获取token）执行的回调方法
            fnLoadingHide();
            // var getParams = JSON.parse(sessionStorage.getItem("cacheGetIdToken"));
            newOpt = $.extend(newOpt, params);
            fnUploadAttBatchChild(newOpt);
        })
        .fail(function (msg) {
            fnLoadingHide();
        })
    }
}
//删除附件方法
function SecurityDeleteOtherAtts(params) {
    var yesTips = '是/Yes';
    var noTips = '否/No';
    if (noEnSchoolCodeValArr.indexOf(pubCurSchoolCode) != -1) {//只显示中文不显示英文
        yesTips = '是';
        noTips = '否';
    }
    var newOpt = getAttachmentData(params);
    var ajaxParams = {
        settingID: newOpt.settingID,
        relatedID: newOpt.relatedID,
        token: newOpt.token,
        relatedToken: newOpt.relatedToken,
        relatedTable: newOpt.relatedTable
    }
    bootbox.confirm({
        message: "确认删除吗？<br/>Confirm Delete?",
        size: 'small',
        buttons: {
            confirm: {
                label: yesTips,
                className: 'btn-success'
            },
            cancel: {
                label: noTips,
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "../Attachment/SecurityDeleteAttachment2.do?t=" + Math.random(1000),
                    type: "POST",
                    data: ajaxParams,
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (rs) {
                        AttachmentCallBack(newOpt, null)
                    },
                    error: function (e) {
                        bootbox.alert({
                            message: "删除异常！", size: 'small'
                        });
                    }
                });
            }
        }
    });
};
//查看附件方法
var viewAttTriggerSecurity;
function SecurityViewAttPage(params) {
    //viewUrlName :SecurityFileDetail2修改页面查看名，SecurityFileDetail3查看详情页面名
    var newOpt = getAttachmentData(params);
    //var isEN = "";  //1代表英文
    //if (arguments.length == 4) {
    //    isEN = arguments[3];
    //} 
    viewAttTriggerSecurity = new $.zui.ModalTrigger({
        name: "viewAttTriggerSecurity",
        type: "ajax",
        width: "90%",
        height: "420px",
        url: "../Attachment/" + newOpt.viewUrlName + ".do?settingID=" + newOpt.settingID + "&relatedID=" + newOpt.relatedID + "&token=" + newOpt.token + "&relatedToken=" + newOpt.relatedToken + "&relatedTable=" + newOpt.relatedTable + '&isEN=' + newOpt.isEN + '&type=' + newOpt.type + '&onlyShowID=' + newOpt.onlyShowID + '&LinkType=' + newOpt.LinkType + '&t=' + Math.random(1000),
        title: '查看附件',
        onHide: function () {
            AttachmentCallBack(newOpt, null);
            if ($(".modal-backdrop").length > 0) {
                $(".modal-backdrop").remove();
            }
        }
    });
    viewAttTriggerSecurity.show();
}
//下载附件方法
function SecurityDownloadAtts(params) {
    var newOpt = getAttachmentData(params);
    window.open("../Attachment/SecurityDownLoadAttachments2.do?settingID=" + newOpt.settingID + "&relatedID=" + newOpt.relatedID + "&token=" + newOpt.token + "&shortName=" + newOpt.ShortName + "&relatedToken=" + newOpt.relatedToken + "&relatedTable=" + newOpt.relatedTable);
}
//下载附件模板方法
function SecurityDownloadModelAtts(params) {
    var newOpt = getAttachmentData(params);
    var _that = this;
    window.open("../Attachment/DownLoadOneAttachment.do?SettingID=" + newOpt.SettingID + "&TokenKey=" + newOpt.TokenKey);
}
//下载全部附件方法（详情页面）
function SecurityDownloadAllAtts(params) {
    var newOpt = getAttachmentData(params);
    newOpt.attachMent = '';
    if (newOpt.tableId && typeof (newOpt.tableId) != 'undefined') {
        var arr = [];
        var json = {};
        $("#" + newOpt.tableId).find("tr").each(function (i, cur) {
            var item = $(cur).data("down");
            if (item) {
                //  json.attachMent = item;
                arr.push(item);
            }
        });
        //newOpt.attachMent = JSON.stringify(arr);
        newOpt.attachMent = arr.join(",");
        //  console.error(arr)
    }

    if (newOpt.allType == 2)
        window.open("../" + newOpt.module + "/downloadGroupAllAttrs.do?applyCode=" + newOpt.allApplyCode + "&staffCode=" + newOpt.allStaffCode + "&token=" + newOpt.allAttrTokenKey + "&TokenKey=" + newOpt.allAttrTokenKey + "&relatedTable=" + newOpt.relatedTable + "&AttachmentIdentifer=" + newOpt.attachMent + "&AttachmentCataloryID=" + newOpt.AttachmentCataloryID);
    else
        window.open("../" + newOpt.module + "/downloadAllAttrs.do?applyCode=" + newOpt.allApplyCode + "&staffCode=" + newOpt.allStaffCode + "&token=" + newOpt.allAttrTokenKey + "&TokenKey=" + newOpt.allAttrTokenKey + "&relatedTable=" + newOpt.relatedTable + "&AttachmentIdentifer=" + newOpt.attachMent + "&AttachmentCataloryID=" + newOpt.AttachmentCataloryID);
}
//获取附件参数方法
function getAttachmentData(params) {
    var defaultOptObj = {
        funCode:'',//模块编号 
        LinkType: "",//是否为移动端
        hasParams: false,//是否需要参数 ，默认不需要
        isEN: '',//查看附件是否为英文 1 代表英文
        isReload: false,//是否需要刷新页面(上传、删除 后端foreach渲染没有暂存和ajax的情况下)
        isTempSave: false,//关闭弹出框后是否先执行暂存方法，再刷新页面（c#渲染情况）？
        relatedTable: '',//表名（多数不用传，中医药需要加）
        relatedID: '',
        relatedToken: '',
        AttachmentCataloryID: '',//附件类型-0:全部下载;
        AttachmentIdentifer: '',//附件标识名字
        rendCallback: null,//ajax刷新 回调
        //minSize: 0,//最小上传文件大小（kb）
        settingID: '',
        IsMultiple: 'True',//是否一次上传多个文件数量（默认20个），false为一个
        //multi_selection: 'true',//允许选择多个文件（默认值为 true）
        token: '',
        onlyShowID: "",//仅展示附件的id,多个，英文逗号分隔
        type: '0',//在查看页面弹出框 是否需要删除附件按扭 0需要 1不需要
        SecretTipsIsHide: '1',//上传文件时是否隐藏涉密提示 1显示 ，0 隐藏，（前提得打开涉密提醒功能IsRequireSecurityRemind== ‘1’ ）
        tempCallback: null,//暂存 回调
        tempParams: {//暂存需要的参数 
            code: '',
            type: '',
        }
    };
    var o = $.extend(defaultOptObj, params);
    if ($.isEmpty(o.relatedToken)) {//不传relatedToken情况（南航教师出国境，需要从父级拿 tokenKey值 利用缓存 )
        if ($._session.get('CacheFatherTokenKey')) {
            o.relatedToken = $._session.get('CacheFatherTokenKey');
        }
    }
    return o
}

/**
 *附件操作完成后回调方法
 * @param params 参数
 * @param dtd 延迟对象 有值会优先执行暂存，null会回调刷新页面方法
 */
function AttachmentCallBack(params, dtd) {
    var defaultOptObj = {
        tempCallback: null,//暂存 回调
        rendCallback: null,//ajax刷新 回调
    }
    var newOpt = $.extend(defaultOptObj, params);
    var newTempP = newOpt.tempParams;////暂存需要的参数 
    //非暂存情况，需要重新加载附件的ajax
    if (newOpt.rendCallback != null && dtd == null) {
        if (newOpt.hasParams) {
            newOpt.rendCallback(params)
        } else {
            newOpt.rendCallback()
        }
    } //第一个页面，且是增加附件 需要先暂存后，才能拿到token
    else if (newOpt.tempCallback != null && dtd != null) {
        newOpt.tempCallback(params, dtd);
        // location.reload();//？
    } else if (newOpt.tempCallback != null && newOpt.isTempSave) {//关闭弹出框后是否先执行暂存方法，再刷新页面（c#渲染情况）？ShortVisit/FileListStepExt.js
        newOpt.tempCallback(params);
    }
    else if (newOpt.isReload == true) {//C#渲染列表模式会刷新整个页面
        location.reload();
    }
}
//============add 20210524 操作附件相关============end
//Array.prototype.myForEach = function (func, obj) {
//    var len = this.length;
//    var _this = arguments[1] ? arguments[1] : window;
//    // var _this=arguments[1]||window;
//    for (var i = 0; i < len; i++) {
//        func.call(_this, this[i], i, this)
//    }
//}
//Array.prototype.myFilter = function (func, obj) {
//    var len = this.length;
//    var arr = [];
//    var _this = arguments[1] || window;
//    for (var i = 0; i < len; i++) {
//        func.call(_this, this[i], i, this) && arr.push(this[i]);
//    }
//    return arr;
//}
//Array.prototype.myMap = function (func) {
//    var arr = [];
//    var len = this.length;
//    var _this = arguments[1] || window;
//    for (var i = 0; i < len; i++) {
//        arr.push(func.call(_this, this[i], i, this));
//    }
//    return arr;
//}
//Array.prototype.myEvery = function (func) {
//    var flag = true;
//    var len = this.length;
//    var _this = arguments[1] || window;
//    for (var i = 0; i < len; i++) {
//        if (func.apply(_this, [this[i], i, this]) == false) {
//            flag = false;
//            break;
//        }
//    }
//    return flag;
//}
//Array.prototype.myReduce = function (func, initialValue) {
//    var len = this.length,
//        nextValue,
//        i;
//    if (!initialValue) {
//        // 没有传第二个参数
//        nextValue = this[0];
//        i = 1;
//    } else {
//        // 传了第二个参数
//        nextValue = initialValue;
//        i = 0;
//    }
//    for (; i < len; i++) {
//        nextValue = func(nextValue, this[i], i, this);
//    }
//    return nextValue;
//}
//Function.prototype.myBind = function (target) {
//    var target = target || window;
//    var _args1 = [].slice.call(arguments, 1);
//    var self = this;
//    var temp = function () { };
//    var F = function () {
//        var _args2 = [].slice.call(arguments, 0);
//        var parasArr = _args1.concat(_args2);
//        return self.apply(this instanceof temp ? this : target, parasArr)
//    }
//    temp.prototype = self.prototype;
//    F.prototype = new temp();
//    return F;
//}
//Function.prototype.myCall = function () {
//    var ctx = arguments[0] || window;
//    ctx.fn = this;
//    var args = [];
//    for (var i = 1; i < arguments.length; i++) {
//        args.push(arguments[i])
//    }
//    var result = ctx.fn(...args);
//    delete ctx.fn;
//    return result;
//}
//Function.prototype.myApply = function () {
//    var ctx = arguments[0] || window;
//    ctx.fn = this;
//    if (!arguments[1]) {
//        var result = ctx.fn();
//        delete ctx.fn;
//        return result;
//    }
//    var result = ctx.fn(...arguments[1]);
//    delete ctx.fn;
//    return result;
//}
//返回上一页并刷新 add 2021-11-19
function fnGoReferrer() {
    if (document.referrer.indexOf('?') > -1) {
        window.location.href = replaceEscape(htmlUtil.htmlEncode(document.referrer)) + '&rtime=' + Math.random();
    }
    else {
        window.location.href = replaceEscape(htmlUtil.htmlEncode(document.referrer)) + '?rtime=' + Math.random();
    }
}

/*add 202111203 返回上一页（go(-1)不生效的情况） 直接跳转至相关列表页面 （校级项目）
* @param {listUrl}：查询列表地址; {auditListUrl}：审核列表地址（是否有独立审核列表页面没有为null）; {isAudit}：是否为审核（头部页面里有显示）; 
*/
//function fnGoToListPage(listUrl, auditListUrl, isAudit) {
//    var url = listUrl;
//    if (!($.isEmpty(auditListUrl)) && !($.isEmpty(isAudit)) && isAudit == 'True') {
//        url = auditListUrl
//    };
//    var funCodePage = typeof (funCode) != "undifined" && !($.isEmpty(funCode)) ? funCode : "";
//    $.ajax({
//        url: '../Common/GetDaiBanOtherData.do',
//        data: {},
//        type: "POST",
//        dataType: "json",
//        success: function (result) {
//            var ts = result.ExtInfo;
//            var userToken = result.ExtInfo2;
//            window.location.href = url + "?ts=" + ts + "&userToken=" + userToken + "&functioncode=" + funCodePage
//        },
//        error: function (e) {
//        }
//    });
//}
//add 20220304 增加列表页面查询  按回车建自动查询 
var DocumentScrollTopVal = 0; //避免页面有弹出框 按回车重复搜索；
$(function () {
    $(window).scroll(function () {
        DocumentScrollTopVal = $(document).scrollTop();
    });
    //按回车键自动搜索
    $(document).keydown(function (e) {
        var isShowTriggermodal = false;
        //有弹出框，关闭回车功能
        if ($(".modal").length > 0) {
            if ($(".modal").hasClass("in")) {
                isShowTriggermodal = true
            }
        }
        if ((e.ctrlKey && e.which == 13 || e.which == 13) && DocumentScrollTopVal <= 30) {
            if (($("button[onclick='searchApplyList()']").length > 0) && !isShowTriggermodal) {
                $("button[onclick='searchApplyList()']").trigger("click");
            }
        }
    });
})
//============ add 20221122 百度编辑器，编辑图片后在后面追加内容 ，解决上传图片后不能后续操作的问题 ============ start
var isExecuteSetContentForUedit = false;
function setContentForUedit(isAppendTo, id) {
    UE.getEditor(id).setContent01('&nbsp;', isAppendTo);
}
//工具拦对齐操作点击方法
function UeditorJustifyClick() {
    $("div.edui-for-justifyleft,div.edui-for-justifycenter,div.edui-for-justifyright,div.edui-for-justifyjustify").each(function (i, cur) {
        $(cur).on('click', function () {
            sessionStorage.setItem('isUeditorJustifyClick', '1');
            isExecuteSetContentForUedit = true
        })
    })
}
$(function () {
    UeditorJustifyClick();
})
//============ add 20221122 百度编辑器，编辑图片后在后面追加内容 ，解决上传图片后不能后续操作的问题 ============ end

//======过滤百度编辑器敏感词======start
function fnFilterKeywords(text) {
    // var text = ue.getContentTxt();
    var reg = RegExp(/\b(alert|ontesting|prompt|oncopy|oncut|ondataavailable|ondatasetchanged|ondatasetcomplete|ondblclick|ondeactivate|ondrag|ondragend|ondragenter|ondragleave|ondragover|ondragstart|ondrop|onerror|onerroupdate|onfilterchange|onfinish|onfocus|onfocusin|onfocusout|onhelp|onkeydown|onkeypress|onkeyup|onlayoutcomplete|onload|onlosecapture|onmousedown|onmouseenter|onmouseleave|onmousemove|onmousout|onmouseover|onmouseup|onmousewheel|onmove|onmoveend|onmovestart|onabort|onactivate|onafterprint|onafterupdate|onbefore|onbeforeactivate|onbeforecopy|onbeforecut|onbeforedeactivate|onbeforeeditocus|onbeforepaste|onbeforeprint|onbeforeunload|onbeforeupdate|onblur|onbounce|oncellchange|onchange|onclick|oncontextmenu|onpaste|onpropertychange|onreadystatechange|onreset|onresize|onresizend|onresizestart|onrowenter|onrowexit|onrowsdelete|onrowsinserted|onscroll|onselect|onselectionchange|onselectstart|onstart|onstop|onsubmit|onunload)\b/gi)
    if (!$.isEmpty(text)) {
        if (reg.test(text)) {
            var str = text.match(reg).join(",");
            bootbox.alert({
                message: "提醒：您提交内容中" + str + "属于技术关键字，建议在单词中间加空格或下划线规避。", size: 'small'
            });
        }
    }

}
function fnInitFilterKeywords() {
    try {
        if ($('textarea[class=ueEditorTextarea]').length > 0) {
            $('textarea[class=ueEditorTextarea]').each(function () {
                if ($(this).is(":hidden")) {
                    var id = $(this).attr('id').replace("Html", "");
                    if (!$.isEmpty(id) && typeof (UE) != 'undefined') {
                        UE.getEditor(id).addListener('blur', function (editor) {
                            var curUeText = UE.getEditor(id).getContentTxt();
                            fnFilterKeywords(curUeText);
                        })
                    }
                }
            });
        }
        if ($('textarea[class="form-control"]').length > 0) {
            $('textarea[class="form-control"]').each(function () {
                $(this).on("blur", function () {
                    var curVal = $(this).val();
                    if (!$.isEmpty(curVal)) {
                        fnFilterKeywords(curVal);
                    }
                })
            });
        }
    } catch (error) {
        console.error(error)
    }
}
$(document).ready(function () {
    fnInitFilterKeywords()
});
//======过滤百度编辑器敏感词======end



/**
* 批量下载、导出报表附件方法
* @time 2023-05-11
* @param url下载地址
* @param type 下载文件格式如zip,pdf,xls...
* @param name 下载后的文件名
*/
function fnPubDownReport(url, type, name) {
    fnLoadingShow();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.timeout = 10800000;
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.status == 200) {
            fnLoadingHide();
            var now = new Date();
            var year = now.getFullYear(); //得到年份
            var month = now.getMonth() + 1;//得到月份
            var date = now.getDate();//得到日期
            var fileName = name + "(" + year + "-" + month + "-" + date + ")." + type
            var blob = this.response;
            var a = document.createElement('a');
            var hrefUrl = window.URL.createObjectURL(blob);
            a.href = hrefUrl;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(hrefUrl);
        } else {
            fnLoadingHide();
            bootbox.alert({ message: "系统异常！", size: 'small' });
        }
    }
    xhr.send();
}
/**
* 批量下载、导出报表附件方法
* @time 2024-01-18
* @param url下载地址
* @param type 下载文件格式如zip,pdf,xls...
* @param name 下载后的文件名
* @param dataArr 参数 （arr）
*/
function fnPubDownReportPost(url, type, name, dataArr,nodatetail) {
    var fordata = new FormData();
    $.each(dataArr, function (index, item) {
        fordata.append(item.name, item.value);
    });
    fnLoadingShow();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.timeout = 10800000;
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.status == 200) {
            fnLoadingHide();
            var now = new Date();
            var year = now.getFullYear(); //得到年份
            var month = now.getMonth() + 1;//得到月份
            var date = now.getDate();//得到日期
            var fileName = "";
            if (nodatetail != undefined && nodatetail == true)
                fileName = name + "." + type;
            else
                fileName = name + "(" + year + "-" + month + "-" + date + ")." + type;
            var blob = this.response;
            var a = document.createElement('a');
            var hrefUrl = window.URL.createObjectURL(blob);
            a.href = hrefUrl;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(hrefUrl);
        }
        else if(this.status == 403) {
            fnLoadingHide();
            bootbox.alert({ message: "下载失败或没有数据！", size: 'small' });
        }
        else {
            fnLoadingHide();
            bootbox.alert({ message: "系统异常！", size: 'small' });
        }
    }
    xhr.send(fordata);
}


/**
* 详情页面头部菜单标题以功能为主
* @time 2023-07-14
*/
//function fnDetailHeaderForTitle() {
//    try {
//        var $menuHeader = $(".menu-header");
//        var $menuList = $menuHeader.next(".menu-list");
//        if ($menuHeader.length > 0 && $menuList.length > 0) {
//            var $breadcrumbs = $(window.parent.document).find("#breadcrumbs");
//            if ($breadcrumbs.length > 0) {
//                var $lastLi = $breadcrumbs.find("ul.breadcrumbs_ul li:eq(1)");
//                var $lastLiText = $lastLi.find("span").text();
//                $menuHeader.text($lastLiText);
//            }

//        }
//    } catch (e) {
//        console.error(e)
//    }
//}
//$(function () {
//    fnDetailHeaderForTitle();
//})

//列表里字段太多展开、收缩更多方法
var fnExpandCollapseText = {
    init: function (options) {
        var that = this;
        // 默认参数
        var defaults = {
            textLen: 50, //字数
            data: "",
            callback:null
        };
        var opts = $.extend(defaults, options);
        var html = '';
        var subjectData = opts.data;
        var len = subjectData ? subjectData.length : 0;
        var isShowThree = len >= opts.textLen ? "threeline_text" : "";
        var isShowBtn = isShowThree == "threeline_text" ? "" : "hide";
        html += '<div title="' + subjectData + '" class="SubjectName-item ' + isShowThree + '">' + subjectData + '</div> ';
        html += '<a  href="javascript:void(0)" onclick="fnExpandCollapseText.clickEle()" class="' + isShowBtn + '"><i class="icon icon-angle-down mg-r-5"></i>展开</a>';
        if (opts.callback) {
            opts.callback
        } else {
            return html
        }
       
    },
    clickEle: function () {
        var $curObj = $(event.target);
        var $prev = $curObj.prev(".SubjectName-item");
        var isShow = $prev.hasClass("threeline_text");
        if (isShow) {
            $prev.removeClass("threeline_text");
            $curObj.html("<i class=\"icon icon-angle-up mg-r-5\"></i>收缩");
        } else {
            $prev.addClass("threeline_text");
            $curObj.html("<i class=\"icon icon-angle-down mg-r-5\"></i>展开");
        }
    },
}

//详情页面展开收缩(参考民政大学教师出国境详情)  默认展开:collapse in   按扭加on
function ExpandCollapseForDetail(obj, id) { //用zui效果
    $(obj).toggleClass("on");
    var isClickFlag = $(obj).hasClass("on");
    var html = isClickFlag ? "<i class=\"icon icon-angle-up mg-r-5\"></i>收缩更多" : "<i class=\"icon icon-angle-down mg-r-5\"></i>展开更多";
    $(obj).html(html);
    $('#' + id).collapse('toggle');
}
function ExpandCollapseCustom(obj, id) { //普通效果
    var isEn = $(obj).data("isen");//是否有英文对照(清华大学有用到)
    $(obj).toggleClass("on");
    var isClickFlag = $(obj).hasClass("on");
    var shouqiMore = $.isEmpty(isEn) ? "收缩更多" : "收缩更多Click to collapse";
    var zhangkaiMore = $.isEmpty(isEn) ? "展开更多" : "展开更多Expand more";
    var html = isClickFlag ? "<i class=\"icon icon-angle-up mg-r-5\"></i>" + shouqiMore + "" : "<i class=\"icon icon-angle-down mg-r-5\"></i>" + zhangkaiMore + "";
    $(obj).html(html);
    if (isClickFlag) {
        $('#' + id).css('display', "block");
    } else {
        $('#' + id).css('display', "none");
    }
}


function fixed2TrimZero(num) {
    if (isNaN(num))
        return "";
    var s = num.toFixed(2) + "";
    s = s.replace(".00", "");
    if (s == "0") {
        return "";
    }
    return s;
}
   

function renderList(opts) {
    var defaults = {
        sourceType: "",//页面来源 1、Edit编辑页面 ,2、Detail详情
        totalFeeId: "",//费用总计id 
        data: null,
        container: 'dataListContainer',
        templateId: 'appTemplate',
        isCalTotal: true,//是否需要计算合计，默认需要
        hjIdx: 1,//合计占几位数（移动几位）（合并单元格）
        heText: "合计",
        callback: null
    };
    var opt = $.extend(defaults, opts);

    var tpl = document.getElementById(opt.templateId).innerHTML;
    laytpl(tpl).render(opt.data, function (html) {
        $("#" + opt.container).html(html);
        if (!opt.isCalTotal)
            return;
        var trCnt = $("#" + opt.container + " tr").length;
        var tdCnt = $($("#" + opt.container + " tr").eq(0).children("td")).length;
        //if (trCnt <= 1)
        //    return;

        var hjTd = [];
        var array = [];
        for (var j = 0; j < tdCnt; j++) {
            if (j < opt.hjIdx) {
                hjTd.push("<td></td>");
            } else if (j == opt.hjIdx) {
                hjTd.push("<td>" + opt.heText + "</td>");
            }
            array.push(0);
        }
        for (var i = 0; i < trCnt; i++) {
            for (var cell = 0; cell < tdCnt; cell++) {
                var data = $("#" + opt.container + " tr").eq(i).children("td").eq(cell).text();
                var arrayData = array[cell];
                if (data && !isNaN(data)) {
                    array[cell] = parseFloat(arrayData) + parseFloat(data);
                }
            }
        }
        for (var hj = 0; hj < array.length; hj++) {
            if (hj > opt.hjIdx) {
                //var v = isNaN(array[hj]) ? "" : array[hj];
                v = array[hj];
                hjTd.push("<td>" + fixed2TrimZero(v) + "</td>");
            }

        }
        $("#" + opt.container).append("<tr id=" + opt.container + "hjtr>" + hjTd.join("") + "<tr>");
        if (opt.sourceType && opt.sourceType.toLowerCase() == "edit" && opt.totalFeeId) {//费用总计 计算
            $(opt.totalFeeId).val(fixed2TrimZero(array[tdCnt - 2]));
        }
        opt.callback && opt.callback();
    });
}

//============详情页面局部加loading动画效果============start
/**
 * 发送前
 * @param sDomId:局部数据容器id
 */
function fnResendShowLoading(sDomId) {
    var objArr = sDomId.split(",");
    $.each(objArr, function (i, cur) {
        if ($("#" + cur).length > 0) {
            var objHtml = "#" + cur;
            //如果父级是table，就在table增加类
            if ($(objHtml).parent("table").length > 0) {
                $(objHtml).parent("table").addClass("haveLoadingAnimateBox");
            } else {//否则在本身加样式
                $(objHtml).addClass("haveLoadingAnimateBox");
            }
            $(objHtml).append("<div data-loading=\"正在加载中...\" class=\"load-indicator loading\"></div>");
            return;
        }
    })

}
/**
 * 发送后
 * @param sDomId:局部数据容器id
 */
function fnSendingSuccessHideLoading(sDomId) {
    var objArr = sDomId.split(",");
    $.each(objArr, function (i, cur) {
        if ($("#" + cur).length > 0) {
            var objHtml = "#" + cur;
            //如果父级是table，就在table增加类
            if ($(objHtml).parent("table").length > 0) {
                $(objHtml).parent("table").removeClass("haveLoadingAnimateBox");
            } else {//否则在本身加样式
                $(objHtml).removeClass("haveLoadingAnimateBox");
            }
            $(".load-indicator", $(objHtml)).remove();
            return;
        }
    })
}
//============详情页面局部加loading动画效果============end


//文本域最多输入多少、已输入多少、最少输入(需要在form验证)、总共多少、剩余多少
function fnInputTextareaBlur(obj) {
    var len = $(obj).val().length;
    var min = 0;
    var max = 0;
    var surplus = 0;//剩余
    var max = $(obj).data("max");
    var isMinShow = $(obj).data("isminshow");
    var isMaxShow = $(obj).data("ismaxshow");
    var isTotalShow = $(obj).data("istotalshow");
    if (!$.isEmpty(isMinShow)) min = $(obj).data("min");
    if (!$.isEmpty(max)) {
        max = $(obj).data("max");
        surplus = Number(max) - len;
    };
    var text1 = "";
    var count = 0;
    var html = '已输入：<span style="color:red;font-weight:bold">' + len + '</span>个字，剩余<span style="color:red;font-weight:bold">' + surplus + '</span>个字';
    if (isTotalShow) {
        text1 = '总共';
        count = max;
    } else if (isMaxShow) {
        text1 = '最多输入';
        count = max;
    } else if (isMinShow) {
        text1 = '最少输入';
        count = min;
    }
    var html1 = '（' + text1 + '<span style="color:red;font-weight:bold">' + count + '</span>个字）';
    html += html1;
    $(obj).next(".showTextareaBox").show().html(html);
}


//============20210128详情页面 查看详情加载iframe 点击方法============start
// iframe自适应高度
function reinitIframe(iframeid) {
    //var iframe = document.getElementById("detailIframe");
    var iframe = document.getElementById(iframeid);
    try {
        var bHeight = iframe.contentWindow.document.body.scrollHeight;
        var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        var height = Math.min(bHeight, dHeight);
        iframe.height = height + 50;
    } catch (ex) {
    }
    setTimeout(function () {
        $("#LoadingBox01").remove();
    }, 1000);
}
// 点击方法 type: 值'tr'为点击整行，值'button'为点击按扭
function fnOpenIframeDetail(obj, type) {
    //var title = $(obj).data("title");
    var curObj;
    var detailsrc = $(obj).data("detailsrc");
    var iframeid = $(obj).data("iframeid");
    var count = 0;
    // 定时触发
    var timer1 = null;
    var timer2 = null;//2秒后清除定时器方法

    if (type == 'tr') {
        count = $(obj).find("td").length;
        curObj = $(obj);
    } else {
        curObj = $(obj).parents("tr");
        var $tr = $(obj).parents("tr");
        count = $tr.find("td").length;
    }
    var ObjIframe = '<td colspan="' + count + '"><iframe id="' + iframeid + '" onload="reinitIframe(' + iframeid + ')" scrolling="no" frameborder="0" style="border: 0; width: 100%; background-color: #FFF;" name="' + iframeid + '" frameborder="0" src="' + detailsrc + '"></iframe></td>';
    $(curObj).next(".IframeDetail").eq(0).toggleClass("on");
    if ($(curObj).next(".IframeDetail").eq(0).hasClass("on")) {
        $(".IframeDetail").removeClass("on").empty();
        $("body").append(oLoadingAnimateHtml);
        $(curObj).next(".IframeDetail").eq(0).show().addClass("on");
        $(curObj).next(".IframeDetail").eq(0).html(ObjIframe);

        //  $(obj).next(".IframeDetail").eq(0).siblings(".IframeDetail").removeClass("on").empty();
        //iframe自适应高度
        window.onresize = function () {
            reinitIframe(iframeid);
        }
        reinitIframe(iframeid);
        // 定时触发
        timer1 = window.setInterval("reinitIframe('" + iframeid + "')", 500);
        //timer2 = window.setTimeout(function () {
        //    window.clearInterval(timer1)
        //}, 30000);
        var CurOffset = $(curObj).offset();
        var CurOffsetTop = CurOffset.top;
        $(window).scrollTop(CurOffsetTop);
    } else {
        $(curObj).next(".IframeDetail").eq(0).hide();
        $(curObj).next(".IframeDetail").eq(0).empty();
        timer2 = window.setTimeout(function () {
            window.clearInterval(timer1);
        }, 1000)

    }
}
//============20210128详情页面 查看详情加载iframe 点击方法============end
//详情页进度信息审核时长
//minutes 分钟数
function minuteFormat(minutes) {
    if (!minutes) {
        return "-";
    }
    const days = Math.floor(minutes / (24 * 60));
    const hours = Math.floor((minutes % (24 * 60)) / 60);
    const remainingMinutes = minutes % 60;

    let result = '';
    if (days > 0) {
        result += `${days}天`;
    }
    if (hours > 0 || days > 0) {
        result += `${hours}小时`;
    }
    if (days === 0) {
        result += `${remainingMinutes}分钟`;
    }

    return result;
}


//获取schoolInfo functionCode
function GetConfigData() {
    $.ajax({
        url: "../Common/GetConfigData.do",
        type: "GET",
        data: {},
        dataType: "JSON",
        cache: true,
        success: function (rs) {
            if (rs.success == "y") {
                if (!$.isEmpty(rs.ExtInfo)) {
                    $("body").addClass("Body-" + rs.ExtInfo)//给body元素增加class类 便于修改风格
                }
            }
        },
        error: function (e) {
        }
    });
}

//过滤输入框xxs漏洞安全字符
// 兼容jQuery环境：先判断jQuery是否存在，避免报错
if (typeof jQuery !== 'undefined' && jQuery) {
    (function ($) {
        "use strict"; // 严格模式，避免全局变量污染

        /**
         * 解码HTML实体（适配jQuery，避免原生DOM内存泄漏）
         * @param {string} str 带HTML实体的字符串
         * @returns {string} 解码后的字符串
         */
        function decodeHtmlEntities(str) {
            // 用jQuery创建临时元素，兼容老版本DOM操作
            var $temp = $('<div/>').html(str);
            var decoded = $temp.text() || '';
            $temp.remove(); // 立即销毁临时元素，避免内存泄漏
            return decoded;
        }

        /**
         * 核心HTML转义逻辑（ES5语法，兼容IE8+）
         * @param {string} str 待转义字符串
         * @param {boolean} allowLineBreak 是否保留换行符
         * @returns {string} 转义后的字符串
         */
        function escapeHtml(str, allowLineBreak) {
            var escapeMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
                '/': '&#x2F;',
                '\\': '&#x5C;',
                '\t': '&#x09;',
                '\r': '&#x0D;'
            };

            // ES5写法：替换危险字符
            var escaped = str.replace(/[&<>"'\/\\\t\r]/g, function (char) {
                return escapeMap[char] || char;
            });

            // 处理换行符
            if (allowLineBreak) {
                escaped = escaped.replace(/\n/g, '<br>');
            } else {
                escaped = escaped.replace(/\n/g, '&#x0A;');
            }
            return escaped;
        }

        /**
         * 核心输入清理方法（适配jQuery）
         * @param {unknown} input 输入值：支持字符串/jQuery对象/原生DOM/数字等
         * @param {Object} options 配置项（ES5兼容写法）
         * @returns {string} 安全字符串
         */
        $.sanitizeInput = function (input, options) {
            // 默认配置（ES5兼容，避免解构）
            var opts = $.extend({}, {
                allowLineBreak: false,
                preventDoubleEscape: true,
                whitelistPattern: null
            }, options);

            // 步骤1：取值处理（兼容jQuery对象/原生DOM/其他类型）
            var cleanStr = '';
            if (input && input.jquery) { // 传入的是jQuery对象
                // 优先取输入框值，否则取文本（适配input/textarea/div等）
                cleanStr = input.is('input, textarea') ? input.val() : input.text();
            } else if (input && typeof input === 'object' && input.nodeType === 1) { // 原生DOM元素
                cleanStr = $(input).is('input, textarea') ? $(input).val() : $(input).text();
            } else if (typeof input === 'string') { // 普通字符串
                cleanStr = $.trim(input); // 用jQuery的trim，兼容老浏览器
            } else if (typeof input === 'number' || typeof input === 'boolean') { // 数字/布尔值
                cleanStr = String(input);
            }

            // 空值直接返回
            if (cleanStr === '') return '';

            // 步骤2：防止双重转义
            if (opts.preventDoubleEscape) {
                cleanStr = decodeHtmlEntities(cleanStr);
            }

            // 步骤3：白名单过滤（优先级最高）
            if (opts.whitelistPattern && opts.whitelistPattern instanceof RegExp) {
                var validChars = [];
                for (var i = 0; i < cleanStr.length; i++) {
                    var char = cleanStr.charAt(i);
                    if (opts.whitelistPattern.test(char)) {
                        validChars.push(char);
                    }
                }
                cleanStr = validChars.join('');
                return escapeHtml(cleanStr, opts.allowLineBreak);
            }

            // 步骤4：通用转义
            return escapeHtml(cleanStr, opts.allowLineBreak);
        };

        /**
         * jQuery实例方法：直接清理元素值/文本（插件常用）
         * 用法：$('#input').sanitize(options) → 清理输入框值并回填
         *       $('#content').sanitize(options).html() → 清理后渲染为安全文本
         */
        $.fn.sanitize = function (options) {
            return this.each(function () {
                var $this = $(this);
                // 清理值/文本
                var safeValue = $.sanitizeInput($this, options);
                // 根据元素类型回填（input/textarea用val，其他用text）
                if ($this.is('input, textarea')) {
                    $this.val(safeValue);
                } else {
                    $this.text(safeValue); // 优先用text，避免解析HTML
                    // 若需保留换行（如评论区），改用html（已转义，安全）
                    if (options && options.allowLineBreak) {
                        $this.html(safeValue);
                    }
                }
            }); 
        };
        /**
       * jQuery实例方法：判断子元素是否在父元素里面
       * 用法：var isInParent = $('#child').isInParent('.parent');
       */
        $.fn.isInParent = function (parentSelector) {
            var $child = this;
            var $parent = $(parentSelector);
            if (!$child.length || !$parent.length) return false;
            // 优先用$.contains，失败则降级用closest
            try {
                return $.contains($parent[0], $child[0]);
            } catch (e) {
                return $child.closest(parentSelector).length > 0;
            }
        };

    })(jQuery);
} else {
    console.warn('jQuery未加载，sanitizeInput方法未初始化');
}

/**
 * 获取年份下拉列表数据源
 * @param {当前年减去年份数} prevNum 
 * @param {当前年加上年份数} nextNum 
 * @param {正否正序} isAsc 
 */
function getYearCodeOptions(prevNum, nextNum, isAsc) {
    var options = [];
    var currentYear = new Date().getFullYear();
    if (isAsc) {
        var startYear = currentYear - prevNum;
        var endYear = currentYear + nextNum;
        for (; startYear <= endYear; startYear++) {
            options.push({ id: startYear, text: startYear });
        }
    }
    else {
        var startYear = currentYear + nextNum;
        var endYear = currentYear - prevNum;
        for (; startYear >= endYear; startYear--) {
            options.push({ id: startYear, text: startYear });
        }
    }
    return options;
}

