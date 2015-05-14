
function test() {
    try {
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var cat = document.getElementById("cat").value;
        var note = document.getElementById("note").value;
        var author = document.getElementById("author").value;

        if (name == "") {
            toast("أدخل اسم الكتاب");
            return false;
        }

        if (cat == "") {
            toast("أدخل التصنيف");
            return false;
        }

        if (author == "") {
            toast("أدخل اسم المؤلف");
            return false;
        }

        if (note == "") {
            toast("أدخل وصف للكتاب");
            return false;
        }

        return true;
    }
    catch (e) { toast(e); }
}

//---------------- clear
function clear() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("cat").value = "";
    document.getElementById("author").value = "";
    document.getElementById("note").value = "";
    document.getElementById("chk").checked = false;
}

function add() {
    if (test())
        send('new');
}

function save() {
    if (document.getElementById("id").value == "") {
        toast("يجب تحديد الكتاب اولا");
    }

    if (test())
        send('update');
}

function Delete() {
    var answer = confirm('هل أنت متاكد؟');
    if (answer)
        send('delete');
}

function send(mode) {
    try {
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var cat = document.getElementById("cat").value;
        var author = document.getElementById("author").value;
        var note = document.getElementById("note").value;
        var chk = 0;

        if (document.getElementById("chk").checked)
            chk = 1;

        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/coding/book.ashx",
            data: { mode: mode, id: id, name: name, cat: cat, author: author, note: note, chk: chk },
            success: function (text) {
                var obj = JSON.parse(text);
                if (obj.message != "")
                    toast(obj.message);
                $('#alldata').empty();
                var i = 0;
                for (i = 0; i < obj.rows.length; i++)
                    $('<li>').append('<a style="text-align:right" href="javascript:list(\'' + obj.rows[i].bookid + '\',\'' + obj.rows[i].title + '\',\'' + obj.rows[i].author + '\',\'' + obj.rows[i].category + '\',\'' + obj.rows[i].state + '\',\'' + obj.rows[i].description + '\')" class="ui-btn ui-btn-icon-right ui-icon-minus "> ' + obj.rows[i].title + '</a> ').appendTo('#alldata');
                
                $('#alldata').listview().listview('refresh');

            },
            error: function (text) { toast(text); }
        });
    }
    catch (e) { toast(e); }
}

//========================================

function list(id, name, author, cat, state, note) {
    document.getElementById("id").value = id;
    document.getElementById("name").value = name;
    document.getElementById("author").value = author;
    document.getElementById("cat").value = cat;
    document.getElementById("note").value = note;

    if (state == "0")
        document.getElementById("chk").checked = true;
    else
        document.getElementById("chk").checked = false;
}