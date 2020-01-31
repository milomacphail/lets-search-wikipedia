/*$(document).ready(function() {
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
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + q + "&limit=10&namespace=0&format=json&origin=*&utf8=&format=json";
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
});*/

function submit(){
  const q = document.getElementById('query').value;

  const url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + q + "&limit=10&namespace=0&format=json&origin=*&utf8=&format=json";
  
  fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data);
      data[1].forEach(function(item){
        const listItem = document.createElement('li');
        listItem.innerHTML = item;
        listItem.className = 'orderedItem';
        let textBody = document.createTextNode("");
        let paragraph = document.createElement('p');
        paragraph.className = "paragraphText";
        let header = document.createElement("h1");
        header.className = 'bigHeaderText';
        listItem.appendChild(header);
        paragraph.appendChild(textBody);
        listItem.appendChild(paragraph);
        document.getElementById("returned").appendChild(listItem);
      });

      let returnedItem = document.getElementById("returned");
      let allReturnedItems = returnedItem.getElementsByTagName("p");
      for(var i = 0; i < allReturnedItems.length; i++)
      {
        tags[i].innerHTML = data[2][index];
      }

      let headers = returnedItem[i].innerHTML = `<a href = ${data[3][i]}>${data[3][i]}</a>;`;
      for(var i = 0; i < headers.length; i++)
      {
        tags[i].innerHTML = data[2][index];
      }
    });
}

