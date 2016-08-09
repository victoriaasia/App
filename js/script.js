
$(function() {
  $.getJSON('json/getDirectories.json', function(data) {
       $.each(data.response.directories, function(i, item) {
          var list = "<li class='nav__item'>" + "<a href='#" + item.id + "'" + "class='link'>" + "<span class='underline'>" + "<span>" + item.name + "</span>" + "</span>" + "</a>" + "</li>"
           $(list).appendTo("#menu ul");
     });

   });


   $.getJSON('json/getDirectory.json', function(data) {

     $.each(data.response.directory.fields, function(i, item) {
       var rowHead = "<th>" + item.name + "</th>"
        $(rowHead).appendTo("#dir-table thead");
   });

       $.each(data.response.directory.items, function(i, item) {
         var tblBody = "<tr class='row'>" +
         "<td class='err-name'>" + "<a href='#' class='link'>" + "<span class='underline'>" + "<span>" + item.name + "</span>" + "</span>" + "</a>" + "</td>" +
          "<td>" + item.weight + "</td>" +
          "<td>" + item.point + "</td>" +
          "<td>" + item.endDate + "</td>" +
          "</tr>"
            $(tblBody).appendTo("#dir-table tbody");
   });

});


$.getJSON('json/getEntry.json', function(data) {

    $.each(data.response.entry.items, function(i, item) {
      var tblBody = "<div class='row'>" +

      "<label class='entry-title'>" + item.name + "</label>"

      + "<input value='" + item.value + "' type= '" + item.type + "' id= '" + item.id + "' />" +

       "</div>"

         $(tblBody).appendTo("#entry-table");
});

//  var listItems = '<option></option>';
//
//     for (var i = 0; i < data.response.entry.items.values.length; i++) {
//            listItems += "<option value='" + data.response.entry.items.values[i].name + "' selected='" + data.response.entry.items.values[i].selected + "'>" + data.response.entry.items.values[i].name + "</option>";
//        }
//
//        $("#units").html(listItems);

});

});


$("#search").keyup(function() {
        var value = this.value.toLowerCase().trim();

        $("table").find("tr").each(function(index) {
            var id = $(this).find("td").text().toLowerCase().trim();
            $(this).toggle(id.indexOf(value) !== -1);
        });
    });
