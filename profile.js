$(function () {
    loaddata();
    $("#MainMenu").enhanceWithin().popup();
    geturl();
    profile();
});
var idno = "";
function profile() {
    
    $.ajax({
        type: "POST",
        url: "http://www.tnaskills.com/coding/profile.ashx",
        data: { id: idno },
        success: function (text) {
            try {
                var jsonvar = JSON.parse(text);
                var i = 0;
                for (i = 0; i < jsonvar.rows.length; i++) {
                    var data = "<table style='width: 100%;' cellspacing='3'>";
                    data += " <tr><td style='width:120px; vertical-align:top;' rowspan='3'>";
                    data += " <img alt='" + jsonvar.rows[i].Name + "' width='120' height='90' src='Image/" + jsonvar.rows[i].ImageName + "'/></td> ";
                    data += " <td>" + jsonvar.rows[i].Name + " </td> </tr> ";
                    data += " <tr><td>الرقم الجامعي : " + jsonvar.rows[i].IDno + "</td> </tr> ";
                    data += " <tr> <td> الوظيفة: " + jsonvar.rows[i].jobname + "</td> </tr> ";
                    data += "<tr> <td style='vertical-align:top;' colspan='2'>الجوال: <a href='tel:" + jsonvar.rows[i].Phone + "'>  " + jsonvar.rows[i].Phone + "</a></td></tr>";
                    data += " <tr> <td style='vertical-align:top;' colspan='2'>البريد الالكتروني: <a href='mailto:" + jsonvar.rows[i].Email + "'>" + jsonvar.rows[i].Email + "</td></tr></table>";
                    data += " <a href='javascript:Showtbl(\"" + jsonvar.rows[i].IDno + "\",\"" + jsonvar.rows[i].Job + "\")' class='ui-btn   ui-icon-check ui-btn-icon-right  ui-btn-inline'>الجدول الدراسي</a>";
                    data += " <a href=\"javascript:window.location = 'mybooks.html'\" class='ui-btn ui-icon-check ui-btn-icon-right  ui-btn-inline'>كتبي</a>";
                }
                document.getElementById("showdata").innerHTML = data;
            } catch (ex) { toast(ex); }
        },
        error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
    });
}


//===================
function accept(id, no) {

    document.getElementById("idno").value = id;
    if (no == "1") loadpeople('accept');
    if (no == "2") loadpeople('deny');
}

//================================


function geturl() {
    try {
        var sURL = window.document.URL.toString();
        if (sURL.indexOf("?") > 0) {
            var arrParams = sURL.split("?");

            var arrURLParams = arrParams[1].split("&");

            var arrParamNames = new Array(arrURLParams.length);
            var arrParamValues = new Array(arrURLParams.length);

            var i = 0;
            for (i = 0; i < arrURLParams.length; i++) {
                var sParam = arrURLParams[i].split("=");
                arrParamNames[i] = sParam[0];
                if (sParam[1] != "")
                    arrParamValues[i] = unescape(sParam[1]);
                else
                    arrParamValues[i] = "No Value";
            }
            idno = arrParamValues[0];

        }
    }
    catch (e) { }
}

