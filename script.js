$(document).ready(function() {
  $('.form').submit(function(){
    $('#res').html(" ");
    callWikipedia();
    return false;
  });

  $('#search').click(function(){
    $('#res').html(" ");
    callWikipedia();
  });
  function callWikipedia(){
    var q = $('#query').val();
    var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+q+"&callback=?";
    $.ajax({
      url:url,
      type: 'POST',
      dataType: 'jsonp',
      success: function(result){
        var data = result.query.pages;
        render(data);
      },
      error: function(err){
        console.log(err);
        alert('Oops something went wrong! Please try again.');
      }
    });
  }

  function render(data){
    var pageurl="http://en.wikipedia.org/?curid=";
    for(var i in data){
      $('#res').append("<div id='resultdiv'><a target='_blank' href='"+pageurl+data[i].pageid+"'><p>"+data[i].title+"</p><p>"+data[i].extract+"</p></a></div>");
    }
  }
});