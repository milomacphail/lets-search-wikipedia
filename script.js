var search = document.getElementById('search');
var submitBtn = document.getElementById('submitBtn');
var query = search.value;

var api = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=15&gsrsearch="

var url = ''; // Set url from outside addEventListener function

submitBtn.addEventListener('click', function (e) {

  $("#results").empty(); // Clear search results

  e.preventDefault();

  if (search.value === '') { // If search bar is empty
    search.classList.add('animated', 'heartbeat', 'alert'); // Add the alert class

    setTimeout(function () { // Remove alert after animation complete
      search.classList.remove('animated', 'heartbeat', 'alert');
    }, 750);
  }

  else {

    var apiUrl = api + "%27" + search.value.replace(/[\s]/g, '_') + "%27"; // Replace whitespaces with underscores

    // console.log(apiUrl);
    // console.log('User Query:', search.value); // Log the users search query
    search.value = ''; // Clear search bar
    url = apiUrl; // Set url to apiUrl
    results(apiUrl); // Call results, passing in the apiUrl

  }

});

function results(url) {

  $.ajax({
    url: url,
    success: function (result) {

      //console.log('Result:', result); // Returns full result object
      //console.log('Pages:', result.query.pages); // Returns result pages within result object

      for (var i in result.query.pages) { // Loop through all pages within result object

        // console.log(result.query.pages[i].title);
        var results = document.getElementById('results');
        var resultsLi = document.createElement('li'); // Create li element for all page titles

        resultsLi.className = 'singleResult'; // Add class to all li elements
        resultsLi.style.display = 'none'; // Hide li by default
        resultsLi.innerHTML = '<p>' + result.query.pages[i].title.toLowerCase() + '</p>'; // Add title text to lis
        results.appendChild(resultsLi); // Append lis to results div

        $(resultsLi).wrap(function () { // Wrap li with corresponding wiki url
          return '<a target="_blank" href="https://en.wikipedia.org/wiki/' + result.query.pages[i].title + '"></a>';
        });

        $(resultsLi).fadeIn(1000); // Fade in hidden lis
      }

    }
  });
};

