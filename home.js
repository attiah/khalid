var id;
$(function () {
    loaddata();
    $("#MainMenu").enhanceWithin().popup();
});

function loaddata() {
    $('#menudata').empty();
    $('<li>').append('<a href="javascript:home()" class="ui-btn ui-btn-icon-right ui-icon-home"  style="text-align:right">الرئيسية </a>').appendTo('#menudata');
    $('<li>').append('<a href="javascript:call()"  class="ui-btn ui-btn-icon-right ui-icon-phone"  style="text-align:right">اتصل بنا</a>  ').appendTo('#menudata');
    $('#menudata').listview().listview('refresh');
}
function home() {
    window.location = "index.html";
}
function contact() {
    window.location = "contact.html";
}
function call() {
    window.location = "call.html";
}
function forget() {
    window.location = "forget.html";
}

//================= login
function testuser() {
    try {
        id = document.getElementById("id").value;
        var pass = document.getElementById("pass").value;
        if (id == "") {
            toast("من فضلك أدخل رقم المستخدم");
            return;
        }
        if (pass == "") {
            toast("من فضلك أدخل كلمة المرور");
            return;
        }
        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/coding/login.ashx",
            data: { id: id, pass: pass },
            success: function (text) {
                try {
                    var jsonvar = JSON.parse(text);
                    if (jsonvar.op == "0") {
                        toast(jsonvar.message);
                    }
                    else {
                        toast(jsonvar.message);
                        window.location = "home.html";
                    }

                } catch (ex) { toast(ex); }
            },
            error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
        });

    }
    catch (e) { toast(e); }

}
//------------- get pass

function getpass() {
    try {
        var id = document.getElementById("idno").value;
        var phone = document.getElementById("phone").value;
        if (id == "") {
            toast("من فضلك أدخل رقمك الجامعي");
            return;
        }
        if (phone == "") {
            toast("من فضلك أدخل رقم الجوال ");
            return;
        }
        if (phone.length != 10) {
            alert("ادخل رقم الجوال من  10 ارقام");
            return;
        }
        if (phone.substring(0, 2) != "05") {
            alert("يجب ان يبدا الجوال بـ 05");
            return;
        }
        var exp = /^[0-9|]+$/;

        if (!exp.test(phone)) {
            alert("يجب ان يكون رقم الجوال من ارقام فقط ");
            return;
        }
        if (!exp.test(id)) {
            alert("يجب ان يكون رقمك الجامعي  من ارقام فقط ");
            return;
        }
        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/coding/login.ashx",
            data: { id: id, phone: phone },
            success: function (text) {
                try {
                    var jsonvar = JSON.parse(text);
                } catch (ex) { toast(ex); }
            },
            error: function (msg) { toast(msg); }
        });

    }
    catch (e) { toast(e); }

}

