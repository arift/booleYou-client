 
$(function() {
    //populate our years select box

    for (i = new Date().getFullYear(); i > 1900; i--){
      $('#years').append($('<option />').val(i).html(i));
    }
    //populate our Days select box
    updateNumberOfDays();

    //"listen" for change events
    $('#years, #months').change(function(){
      updateNumberOfDays();
    });

  });

//function to update the days based on the current values of month and year
function updateNumberOfDays(){
  var dayValue = $("#days").val();
  $('#days').html('');
  month = $('#months').val();
  year = $('#years').val();
  days = daysInMonth(month, year);

  for(i=1; i < days+1 ; i++){
    if(i == dayValue) {
      $('#days').append('<option selected="selected" value="' + dayValue + '">' + dayValue + '</option>');
    }
    else {
      $('#days').append($('<option />').val(i).html(i));
  }
  }



}

//helper function
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
