$(function() {
  // draw Directories page
  $.getJSON('json/getDirectories.json', function(data) {
    $.each(data.response.directories, function(i, item) {
      var list = "<li class='nav__item'>" + "<a href='#' class='link' id='" + item.id + "'>" + "<span class='underline'>" + "<span>" + item.name + "</span>" + "</span>" + "</a>" + "</li>"
      $(list).appendTo("#menu ul");
    });
  });

// draw Directory page
  $.getJSON('json/getDirectory.json', function(data) {
    $.each(data.response.directory.fields, function(i, item) {
      var rowHead = "<th>" + item.name + "</th>"
      $(rowHead).appendTo("#dir-table thead");
    });
    $.each(data.response.directory.items, function(i, item) {
      var tblBody = "<tr class='row'>" + "<td class='err-name'>" + "<a href='#' class='link' id='" + item.id + "'>" + "<span class='underline'>" + "<span>" + item.name + "</span>" + "</span>" + "</a>" + "</td>" + "<td>" + item.weight + "</td>" + "<td>" + item.point + "</td>" + "<td>" + item.endDate + "</td>" + "</tr>"
      $(tblBody).appendTo("#dir-table tbody");
    });

    $("#search").keyup(function() {
      var value = this.value.toLowerCase().trim();
      $("table").find("tr").each(function(index) {
        var id = $(this).find("td").text().toLowerCase().trim();
        $(this).toggle(id.indexOf(value) !== -1);
      });
    });
  });

// draw Entry page
  $.getJSON('json/getEntry.json', function(data) {
    $.each(data.response.entry.items, function(i, item) {
      var disabled = item.id === 'name' ? 'disabled' : '';
      var field = item.type === 'TEXTAREA' ? "<textarea rows=4 id=" + item.id + ">" + item.value + "</textarea>" : item.type === 'SELECT' ? "<select id='" + item.id + "'></select>" : "<input value='" + item.value + "' type='text'  id= '" + item.id + "'" + disabled + "/>"
      var tblBody = "<div class='row'>" + "<label class='entry-title'>" + item.name + "</label>" + field + "</div>"
      $(tblBody).appendTo("#entry-table");

// draw Select box
      if (item.values !== undefined) {
        var options = '';
        for (var i = 0; i < item.values.length; i++) {
          var selected = item.values[i].selected === true ? 'selected' : '';
          options += "<option value='" + item.values[i].id + "'" + selected + ">" + item.values[i].name + "</option>";
        }
        $("#units").html(options);
        $("#units").parent('.row').addClass('selectBox');
      }

// datepicker iptions
      $('#endDate').datepicker({
        showOn: "button",
        buttonImage: "img/date.png",
        dateFormat: 'dd.mm.yy',
        buttonImageOnly: true,
        buttonText: "Дата"
      })
    });
  });
});
