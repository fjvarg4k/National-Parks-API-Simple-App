const baseURL = 'https://developer.nps.gov/api/v1/parks';
const npApiKey = // Enter your api key


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  $('.resultsDiv').css('display', 'block');
  for (let i = 0; i < responseJson.data.length; i++) {
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
       <p>${responseJson.data[i].description}</p>
       <a href="${responseJson.data[i].url}" target="_blank">Visit website</a>`
    );
  }
}

function getParks(query, maxResults=10) {
  const params = {
    api_key: npApiKey,
    q: query,
    maxResults
  };

  const queryString = formatQueryParams(params);
  const url = `${baseURL}?${queryString}`;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#error-message').text(`Something went wrong: ${err.message}`)
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#search-park-input').val();
    const maxResults = $('#max-results-input').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);
