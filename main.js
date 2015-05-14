var id;
$(function () {
    loaddata();
    $("#MainMenu").enhanceWithin().popup();
    loadsection();
    getpost('list', '');
});

function show() {
    try {
        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/coding/findid.ashx",
            data: {},
            success: function (text) {
                try {
                    ShowProfile(text);
                } catch (ex) { }
            },
            error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
        });

    }
    catch (e) { toast(e); }

}
function sendpost() {
    try {
        var input = document.getElementById("txtpost").value;
        if (input == "") return;
        getpost('add', input, 0);
        document.getElementById('txtpost').setAttribute('placeholder', 'اكتب تحديثة جديدة هنا...');
    }
    catch (e) { alert(e); }
}
//=====================
function getpost(mode, input, pid) {
    try {

        var filter = document.getElementById("cmbs").value;
        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/coding/post.ashx",
            data: { mode: mode, pid: pid, input: input, filter: filter },
            success: function (text) {
                try {

                    var arr = text.split("/??/");
                    $('#listtime').empty();
                    var i = 0;
                    for (i = 1; i < arr.length; i++) {
                        // alert(arr[i]);
                        var d = arr[i].split("/++/");
                        var data = "<table style='width:100% ; text-align:right; direction:rtl' cellspacing='1' border='0'>";
                        data += "<tr><td style='width:120px; height:80px; vertical-align:top;' rowspan='3'>";
                        data += " <img src='Image/" + d[4] + "' width='120' height='100' onclick='javascript:ShowProfile(\"" + d[1] + "\")'/></td> ";
                        data += " <td style='width:auto;text-align:right; vertical-align:top;font-family :Tahoma, Arial,Verdana, Helvetica ; font-size :13pt;font-weight:normal;' onclick='javascript:ShowProfile(\"" + d[1] + "\")'>" + d[2] + "</td></tr>";
                        data += " <tr><td style='width:auto;text-align:right; vertical-align:top; font-family :Tahoma, Arial,Verdana, Helvetica ; font-size :11pt;font-weight:normal;color:black;'>" + d[3] + "</td></tr>";
                        data += " <tr><td style='width:auto;text-align:left; vertical-align:top; font-family :Tahoma, Arial,Verdana, Helvetica ; font-size :10pt;color:gray; font-weight:normal;'>" + d[5] + "</td></tr></table>";
                        //======== reply ====
                        var arr1 = d[6].split("/!!/");
                        var j = 0;
                        for (j = 1; j < arr1.length; j++) {
                            var h = arr1[j].split("/--/");
                            data += "<table style='width:100% ; text-align:right; direction:rtl' cellspacing='3' border='0'>";
                            data += "<tr><td style='width:60px; height:60px; vertical-align:top;' rowspan='3'></td>";
                            data += "<td style='width:60px; height:60px; vertical-align:top;' rowspan='3'>";
                            data += "<img src='Image/" + h[3] + "' width='60' height='60' /></td>";
                            data += "<td style='width:auto;text-align:right; vertical-align:top; '>" + h[1] + "</td></tr>";
                            data += "<tr><td style='width:auto;text-align:right; vertical-align:top; color:black;'>" + h[2] + "</td></tr>";
                            data += "<tr><td style='width:auto;text-align:left; vertical-align:top; font-family :Tahoma, Arial,Verdana, Helvetica ; font-size :10pt;color:gray; font-weight:normal;' >" + h[4] + " </td></tr></table><hr/>";
                        }
                        data += "<table style='width:100% ; text-align:right; direction:rtl' cellspacing='3' border='0'>";
                        data += "<tr><td style='width:auto;'>";
                        data += " <textarea name='txtpost" + i + "' id='txtpost" + i + "' placeholder='...اكتب تعليقك' style='text-align:right;width:100%'></textarea>";
                        data += "</td><td style='width:40px;'>";
                        data += "  <a href='javascript:sendreply(\"" + i + "\",\"" + d[0] + "\")' class=ui-btn   ui-icon-check ui-btn-icon-right  ui-btn-inline'>ارسال</a>";
                        data += "</td></tr></table>";

                        $('<li data-icon="false" style="text-align:right;">').append(data).appendTo('#listtime');
                    }
                    $('#listtime').listview().listview('refresh');
                    document.getElementById("txtpost").value="";
                } catch (ex) { $('#listtime').empty(); }
            },
            error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
        });
    }
    catch (e) { }
}
function sendreply(id, pid) {

    var input = document.getElementById("txtpost" + id).value;
    if (input == "") return;
    getpost('reply', input, pid);
}

//=================
function loadsection() {
    $.ajax({
        type: "POST",
        url: "http://www.tnaskills.com/coding/getsection.ashx",
        data: {},
        success: function (text) {
            try {

                var jsonvar = JSON.parse(text);

                $('#cmbs').empty();
                $('#cmbs').append('<option value="عام">عام</option>');
                $('#cmbs').append('<option value="اصدقائي">اصدقائي</option>');
                for (i = 0; i < jsonvar.rows.length; i++) {
                    var item = jsonvar.rows[i].SubjectID + ' - ' + jsonvar.rows[i].SectionID;
                    $('#cmbs').append('<option value="' + item + '">' + item + '</option>');

                }
                $("#cmbs").selectmenu('refresh', true);

            } catch (ex) { }
        },
        error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
    });
}

