function borrow(id, no) {
    document.getElementById("bid").value = id;
    document.getElementById("no").value = no;
    send('borrow');
}

function send(mode) {
    try {
        var id = document.getElementById("bid").value;
        var no = document.getElementById("no").value;
        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/coding/bookRequest.ashx",
            data: { mode: mode, id: id, no: no },
            success: function (text) {
                var obj = JSON.parse(text);
                if (obj.message != "")
                    toast(obj.message);
                $('#alldata').empty();
                var i = 0;
                for (i = 0; i < obj.rows.length; i++)
                    $('<li style="text-align:right">').append('<h2> ' + obj.rows[i].title + '</h2><h2> طُلب بواسطة: ' + obj.rows[i].rname + '</h2><h2>رقم جواله: ' + obj.rows[i].rphone + '</h2> <div data-role="controlgroup" data-type="horizontal"><a href="javascript:borrow(\'' + obj.rows[i].bookid + '\',2)" class="ui-btn ui-btn-inline ui-shadow  ">قبول</a> <a href="javascript:borrow(\'' + obj.rows[i].bookid + '\',0)" class="ui-btn ui-btn-inline ui-shadow  ">رفض</a> </div>').appendTo('#alldata');


                $('<li>').append(reqsbtn).appendTo('#alldata');
                $('#alldata').listview().listview('refresh');

            },
            error: function (text) { toast(text); }
        });
    }
    catch (e) { toast(e); }
}

//========================================
