$(function () {
    loaddata();
    $("#MainMenu").enhanceWithin().popup();
    loadpeople('display');
});

//=================== add friend 

function loadpeople(action) {
    var id = document.getElementById("idno").value;
    $.ajax({
        type: "POST",
        url: "http://www.tnaskills.com/coding/FriendList.ashx",
        data: { action: action, id: id },
        success: function (text) {
            try {
                var jsonvar = JSON.parse(text);
                $('#listpeople').empty();
                var i = 0;
                for (i = 0; i < jsonvar.rows.length; i++) {
                    var data = "<table style='width:100%; text-align:right; direction:rtl cellspacing='3' border='0'>";
                    data += "<tr><td rowspan='2' style='width:120px; height:80px;'>";
                    data += "<img src='Image/" + jsonvar.rows[i].ImageName + "' width='120' height='80' /></td>";
                    data += "<td style='width:auto;text-align:right; vertical-align:middle;padding-top:20px; margin-top:20px;'>";
                    data += "<h2>" + jsonvar.rows[i].Name + "</h2></td></tr>";
                    data += "<tr><td style='width:auto;text-align:right'><a href='javascript:accept(\"" + jsonvar.rows[i].FromMember + "\", 2)' class='ui-btn ui-shadow ui-corner-all'>إلغاء الصداقة</a></td></tr></table>";
                    $('<li  style="text-align:right;">').append(data).appendTo('#listpeople');
                }
                var btns = "<br><hr><br><a style='text-align:right;' href='javascript:window.location = \"addfriend.html\"' class='ui-btn ui-btn-inline ui-icon-plus ui-btn-icon-right'>أضف أصدقاء</a>";
                btns += " <a style='text-align:right;' href='javascript:window.location = \"friendrequest.html\"' class='ui-btn ui-btn-inline ui-icon-check ui-btn-icon-right'>طلبات الصداقة</a>";
                $('<li  style="text-align:right;">').append(btns).appendTo('#listpeople');
                $('#listpeople').listview().listview('refresh');


            } catch (ex) {

                document.getElementById("nofriends").innerHTML = "<h3 style='text-align:center'>لا يوجد لديك أصدقاء</h3>";
                var data = "<a style='text-align:right;' href='javascript:window.location = \"addfriend.html\"' class='ui-btn ui-btn-inline ui-icon-plus ui-btn-icon-right'>أضف أصدقاء</a>";
                data += " <a style='text-align:right;' href='javascript:window.location = \"friendrequest.html\"' class='ui-btn ui-btn-inline ui-icon-check ui-btn-icon-right'>طلبات الصداقة</a>";

                $('<li  style="text-align:right;">').append(data).appendTo('#listpeople');

                $('#listpeople').listview().listview('refresh');
                
            }
        },
        error: function (msg) { toast('لا يوجد اتصال بالانترنت'); }
    });
}

//===================
function accept(id, no) {
    document.getElementById("idno").value = id;
    if (no == "1") loadpeople('accept');
    if (no == "2") loadpeople('deny');
    location.reload();
}