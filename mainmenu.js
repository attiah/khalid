function loaddata() {
    $('#menudata').empty();
    $('<li>').append('<a href="javascript:call()" class="ui-btn ui-btn-icon-right ui-icon-phone" style="text-align:right">مساعدة</a>').appendTo('#menudata');
    $('<li>').append('<a href="javascript:logout()"  class="ui-btn ui-btn-icon-right ui-icon-user"  style="text-align:right">تسجيل خروج</a>  ').appendTo('#menudata');
    $('#menudata').listview().listview('refresh');
}
function call() {
    window.location = "call.html";
}
function logout() {
    window.location = "index.html";
}
