


// YOUTUBE API KEY: AIzaSyAjhjKeolN-DQeLeaN8ztuWhYfu1biu82E
// EXAMPLE CHANNEL ID: UCQ9STd0zeHrrQGJQEuvhuTw (Bismuth)








// Variable setup

// Basics
var docCount = 10; // Amount of results to return
var authorSearch = false; // Search authors instead of books?

// Page elements to track
const searchBar = document.getElementById('js-search')

searchBar.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent automatic form submission on hitting enter
        searchSubmit(); // Auto-submit on enter press
    }
});

var resultCounter = document.getElementById('js-result-counter')




// Function definitions


// Fetch data from the Youtube API (asynchronous to enable smooth functioning and web requests)
async function searchTitle(input) {
    try {
        // Clear existing search results
        document.getElementsByClassName("results")[0].innerHTML = ''

        // Fetch from Youtube servers
        const response = await fetch(('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + docCount + '&order=viewCount&q=' + input + '&type=video&key=AIzaSyAjhjKeolN-DQeLeaN8ztuWhYfu1biu82E'), {
            method: 'GET'
        });

        // If the response is not valid or doesn't exist, throw an error caught in the catch block
        if (!response.ok) {
            throw Error(response.statusText);
        }

        const json = await response.json();
        jsonStorage = JSON.stringify(json, null, 2);

        console.log(json) // Temporary log

        // Convert JSON data to new divs
        for (let i = 0; i < Math.min(docCount, json.items.length); i++)
        {
            var newResultDiv = document.createElement('div');
            newResultDiv.classList.add("result-array");
            newResultDiv.ariaLabel = ("Search result");
            document.getElementsByClassName("results")[0].appendChild(newResultDiv);

            var newResultDivTitle = document.createElement('div');
            newResultDivTitle.textContent = json.items[i].snippet.title;
            newResultDivTitle.classList.add("result-array-title");
            document.getElementsByClassName("result-array")[i].appendChild(newResultDivTitle);

            var newResultDivAuthor = document.createElement('div');
            newResultDivAuthor.textContent = ("By: " + json.items[i].snippet.channelTitle);
            newResultDivAuthor.classList.add("result-array-author");
            document.getElementsByClassName("result-array")[i].appendChild(newResultDivAuthor);

            var newResultDivThumbnail = document.createElement('div');
            newResultDivThumbnail.innerHTML = `
                <a href="https://www.youtube.com/watch?v=` + json.items[i].id.videoId + `"><img src="${json.items[i].snippet.thumbnails.high.url}"></img></a>
            `
            newResultDivThumbnail.classList.add("result-array-video");
            document.getElementsByClassName("result-array")[i].appendChild(newResultDivThumbnail);
        }


        // Change background color to indicate success
        document.body.style.backgroundColor = "#4f2f3aff";
    } catch(e) {
        console.log(e);
        alert('Error detected. Check the log.');
        document.body.style.backgroundColor = "#7a533fff";
    }
}


// Submit search queries when submit button is clicked; the button is set up in its HTML to run this
function searchSubmit() {
    var input = searchBar.value;

    // Catch empty inputs
    if (input.length === 0) {
        alert("Type a title!");
        return
    }
    else {
        searchTitle(searchBar.value);

        // Change background color to indicate active fetching
        document.body.style.backgroundColor = "#7a3f46ff";
    }
}