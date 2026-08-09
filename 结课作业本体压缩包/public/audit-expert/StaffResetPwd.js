function fnFilterString(obj) {
    var a = $(obj).val();
    return a == 'passw0rd' || a == 'password1' || a == 'password2' || a == 'password12' || a == 'password123' || a == 'myspace1' || a == 'qq123456' || a == 'admin123' || a == 'trustno1' || a == 'blink182' || a == '1q2w3e' || a == '1q2w3e4r' || a == '1q2w3e4r5t' || a == '18atcskd2w' || a == '3rjs1la7qe' || a == 'admin888' || a == 'wang1234' || a == 'Qwerty' || a == 'Monkey' || a == 'Letmein' || a == 'Dragon' || a == 'Baseball' || a == 'Iloveyou' || a == 'Master' || a == 'Sunshine' || a == 'Ashley' || a == 'Bailey' || a == 'Shadow' || a == 'Superman' || a == 'Qazwsx' || a == 'Michael' || a == 'abc123' || a == 'a1b2c3' || a == 'aaa111' || a == '123qwe' || a == 'p@ssword' || a == 'a1s2d3' || a == 'qwe1234' || a == 'qwe123'
}
var minPwlength = 8;
function CheckPasswordSecurity(obj) {
    if (typeof(minLength)!="undefined" && minLength > 0)
    {
        minPwlength = minLength;
    }
    var passVal = $(obj).val();
    var a = passVal;
    if (passVal.length < minPwlength) {
        return false;
    } else if (fnFilterString(obj)) {
        return false;
    } else if (passVal.length >= minPwlength && passVal.length <= 30) {
        var reg = /^[0-9]{6,30}$|^[a-z]{6,30}$|^[A-Z]{6,30}$|^[!@#$%^&*()_-]{6,30}$/; 
        var reg1 = /^[A-Za-z]{6,30}$|^[a-z0-9]{6,30}$|^[A-Z0-9]{6,30}$|^[A-Z!@#$%^&*()_-]{6,30}$|^[a-z!@#$%^&*()_-]{6,30}$|^[0-9!@#$%^&*()_-]{6,30}$/;
        var reg2 = /^[A-Za-z0-9!@#$%^&*()_-]{6,30}$/;  
        if (passVal.match(reg)) {
            $("#password-grade1").addClass("change");
            return false;
        }
        else if (passVal.match(reg1)) {
            $("#password-grade1").addClass("change");
            $("#password-grade2").addClass("change");
        }
        else if (passVal.match(reg2)) {
            $("#password-grade1").addClass("change");
            $("#password-grade2").addClass("change");
            $("#password-grade3").addClass("change");
        }
    } 
    else {
        $("#password-grade1").removeClass("change");
        $("#password-grade2").removeClass("change");
        $("#password-grade3").removeClass("change");
        return false;
    }
}
    function pwdCompareCheck(obj) {
        fnVerificationPwd(obj);
    }
    function fnVerificationPwd(obj) {
        var a = $(obj).val();
        if (fnFilterString(obj)) {
            bootbox.alert({
                message: "密码设置过于简单！", size: 'small', callback: function () {
                    $(obj).val("");
                    $("#password-grade1").removeClass("change");
                    $("#password-grade2").removeClass("change");
                    $("#password-grade3").removeClass("change");
                },
            });
            return false;
        }
        if (a.length < minPwlength) {
            bootbox.alert({ message: "密码长度不能少于" + minPwlength + "位！", size: 'small' });
            return false;
        }
        if (a.length > 30 ) {
            bootbox.alert({ message: "密码长度不能超过30位！", size: 'small' });
            return false;
        }
        var reg = /^(?![a-zA-Z0-9]+$)(?![a-zA-Z]+$)(?![0-9]+$).{8,29}$/;
        if (!a || !a.match(reg)) {
            bootbox.alert({
                message: "密码必须是数字、字母和特殊字符组合，长度不能少于" + minPwlength + "位！您的密码过于简单！/The password must be a combination of numbers and letters and must not be less than " + minPwlength + " digits long! Your password is too simple!", size: 'small', callback: function () {
                    $(obj).val("");
                    $("#password-grade1").removeClass("change");
                    $("#password-grade2").removeClass("change");
                    $("#password-grade3").removeClass("change");
                }
            });
            return false;
        }
    }
