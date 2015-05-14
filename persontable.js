var idno = "";
var job = "";
$(function () {
    loaddata();
    $("#MainMenu").enhanceWithin().popup();
    geturl();
    if (job == "2") showtablestudent();
    else showtableinst();
});

function showtablestudent() {
    $.ajax({
        type: "POST",
        url: "http://www.tnaskills.com/coding/studenttable.ashx",
        data: { id: idno },
        success: function (text) {
            try {
                var jsonvar = JSON.parse(text);
                var info = "<h3>" + jsonvar.rows[0].IDno + "</h3>";
                info += "<h3>" + jsonvar.rows[0].studentName + "</h3>";

                var data = "<table style='width:100% ; text-align:right; direction:rtl' cellspacing='1' border='0'>";
                data += "<tr><td style='width:120px; height:80px; vertical-align:top;' rowspan='3'>";
                data += " <img src='Image/" + jsonvar.rows[0].ImageName + "' width='120' height='100' onclick='javascript:ShowProfile(\"" + jsonvar.rows[0].IDno + "\")'/></td> ";
                data += " <td style='width:auto;text-align:right; vertical-align:top;font-family :Tahoma, Arial,Verdana, Helvetica ; font-size :13pt;font-weight:normal;' onclick='javascript:ShowProfile(\"" + jsonvar.rows[0].IDno + "\")'>" + jsonvar.rows[0].studentName + "</td></tr>";
                data += " <tr><td style='width:auto;text-align:right; vertical-align:top; font-family :Tahoma, Arial,Verdana, Helvetica ; font-size :11pt;font-weight:normal;'>" + jsonvar.rows[0].IDno + "</td></tr>";
                data += " </table>";
                document.getElementById("showdata").innerHTML = data;
                $('#listtable').empty();
                var i = 0;
                for (i = 0; i < jsonvar.rows.length; i++) {
                    var data = "<h2>المادة: " + jsonvar.rows[i].SubjectID + " - ";
                    data += jsonvar.rows[i].SubjectName + "<h2>";
                    data += "<h2>الشعبة: " + jsonvar.rows[i].SectionID + "<h2>";
                    data += "<h2>المحاضر: " + jsonvar.rows[i].instructorName + "<h2>";
                    data += "<h2>الزمان: " + jsonvar.rows[i].SectionDays + " - ";
                    data += jsonvar.rows[i].SectionTime + "<h2>";
                    data += "<h2>المكان: " + jsonvar.rows[i].Location + "<h2>";
                    data += "<h2>عدد الساعات: " + jsonvar.rows[i].hourno + "<h2>";
                    $('<li data-icon="false" style="text-align:right;">').append(data).appendTo('#listtable');
                }
                $('#listtable').listview().listview('refresh');

            } catch (ex) { toast(ex); }
        },
        error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
    });
}

//-----------------  
function showtableinst() {


    $.ajax({
        type: "POST",
        url: "http://www.tnaskills.com/coding/insttable.ashx",
        data: { id: idno },
        success: function (text) {
            try {
                var jsonvar = JSON.parse(text);
                var info = "<h3>" + jsonvar.rows[0].InstructorID + "</h3>";
                info += "<h3>" + jsonvar.rows[0].instructorName + "</h3>";
                document.getElementById("showdata").innerHTML = info;
                $('#listtable').empty();
                var i = 0;
                for (i = 0; i < jsonvar.rows.length; i++) {
                    var data = "<h2>" + jsonvar.rows[i].SubjectID + "<h2>";
                    data += "<h2>" + jsonvar.rows[i].SubjectName + "<h2>";
                    data += "<h2>" + jsonvar.rows[i].SectionID + "<h2>";
                    data += "<h2>" + jsonvar.rows[i].Type + "<h2>";
                    data += "<h2>" + jsonvar.rows[i].SectionDays + "<h2>";
                    data += "<h2>" + jsonvar.rows[i].SectionTime + "<h2>";
                    data += "<h2>" + jsonvar.rows[i].Location + "<h2>";
                    data += "<h2>" + jsonvar.rows[i].hourno + "<h2>";

                    $('<li data-icon="false" style="text-align:right;">').append(data).appendTo('#listtable');
                }

                $('#listtable').listview().listview('refresh');
            } catch (ex) { toast(ex); }
        },
        error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
    });
}

//===================


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
            job = arrParamValues[1];
        }
    }
    catch (e) { }
}

