$(function () {
    loadpeople('display');
});

function loadpeople(action) {
    var id = document.getElementById("idno").value;
    $.ajax({
        type: "POST",
        url: "http://www.tnaskills.com/coding/getPeople.ashx",
        data: { action: action, id: id },
        success: function (text) {
            try {

                var jsonvar = JSON.parse(text);
                $('#listpeople').empty();
                var i = 0;
                for (i = 0; i < jsonvar.rows.length; i++) {
                    var data = " <table style='width:100% ; text-align:right; direction:rtl' cellspacing='3' border='0'> ";
                    data += "<tr><td rowspan='2' style='width:120px; height:80px;'>";
                    data += "<img src='Image/" + jsonvar.rows[i].ImageName + "' width='120' height='80'  onclick='javascript:ShowProfile(\"" + jsonvar.rows[i].IDno + "\")'/>  </td> ";
                    data += "<td style='width:auto;text-align:right; vertical-align:middle;padding-top:20px; margin-top:20px; '>";
                    data += "<h2  onclick='javascript:ShowProfile(\"" + jsonvar.rows[i].IDno + "\")'>" + jsonvar.rows[i].Name + "</h2></td></tr>";
                    data += "<tr><td style='width:auto;text-align:right'> <a href='javascript:sendreq(\"" + jsonvar.rows[i].IDno + "\")' class='ui-btn  ui-shadow ui-corner-all'>أضف كصديق</a>  </td></tr></table> ";
                    $('<li data-icon="false" style="text-align:right;">').append(data).appendTo('#listpeople');
                }
                $('#listpeople').listview().listview('refresh');

            } catch (ex) {
                document.getElementById("nomore").innerHTML = "<h4 style='text-align:center'>لا يوجد المزيد من الأصدقاء لإضافتهم</h4>";
                $('#listpeople').empty();
            }
        },
        error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
    });
}


//===================
function sendreq(id) {
    document.getElementById("idno").value = id;
    loadpeople('add');
}