

function borrow(id) {
    document.getElementById("bid").value = id;
    send('borrow');
}

function send(mode) {
    try {
        var id = document.getElementById("bid").value;
        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/coding/allbook.ashx",
            data: { mode: mode, id: id },
            success: function (text) {
                
                var obj = JSON.parse(text);
                if (obj.message != "")
                    toast(obj.message);
                $('#alldata').empty();
                var i = 0;
                for (i = 0; i < obj.rows.length; i++)
                    $('<li style="text-align:right">').append('<h2> ' + obj.rows[i].title + '</h2><h2> ' + obj.rows[i].Name + '</h2><h2>' + obj.rows[i].Phone + '</h2> <div data-role="controlgroup" data-type="horizontal"><a href="javascript:borrow(\'' + obj.rows[i].bookid + '\')" class="ui-btn  ui-shadow  ">استعارة</a> </div>').appendTo('#alldata');

                var reqsbtn = "<br><hr><br><a style='text-align:center;' href='javascript:window.location = \"bookRequest.html\"' class='ui-btn ui-btn-inline ui-corner-all'>طلبات الاستعارة</a>";
                $('<li>').append(reqsbtn).appendTo('#alldata');
                $('#alldata').listview().listview('refresh');

            },
            error: function (text) { toast(text); }
        });
    }
    catch (e) { toast(e); }
}

//========================================
