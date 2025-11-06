// Variable setup

// Basics
var docCount = 10; // Amount of results to return
var authorSearch = false; // Search authors instead of books?
var seeJson = false; // See the data used in the webpage?
var jsonStorage = "" // Temporary storage of JSON string for checkbox use

// Page elements to track
const searchBar = document.getElementById('js-search')

searchBar.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent automatic form submission on hitting enter
        searchSubmit(); // Auto-submit on enter press
    }
});

const authorToggle = document.getElementById('js-author-toggle').addEventListener('change', e => {
    authorSearch = e.target.checked
});

const jsonPane = document.getElementById('js-json-toggle').addEventListener('change', e => {
    seeJson = e.target.checked;
    toggleJSONView();
});

var resultCounter = document.getElementById('js-result-counter')




// Function definitions


// Fetch data from the OpenLibrary API (asynchronous to enable smooth functioning and web requests)
async function searchTitle(input) {
    try {
        // Clear existing search results
        document.getElementsByClassName("results")[0].innerHTML = ''
        document.getElementsByClassName("json-content")[0].innerHTML = 'When a query is submitted, this website transmits only the query to the API that it fetches its library data from, with modification based on the other forms of input provided. No personal data, or other kinds of data, are collected or stored long term. This box, if checked upon submission, will display the raw JSON output of the current search, showing all data that the site collects. This box may be very large. Uncheck it to return.'
        document.getElementsByClassName("json-content")[0].style.fontSize = "16px";

        // Fetch from OpenLibrary servers; ternary statement allows search by author instead
        const response = await fetch(('https://openlibrary.org/search' + (authorSearch ? '/authors' : '') + '.json?q=' + input), {
            method: 'GET',
            headers: {
                'User-Agent': 'APITestWeek11 (aare5091@colorado.edu)' // OpenLibrary policy requests the possiblity of contact should high request volume be detected
            }
        });

        // If the response is not valid or doesn't exist, throw an error caught in the catch block
        if (!response.ok) {
            throw Error(response.statusText);
        }

        const json = await response.json();
        jsonStorage = JSON.stringify(json, null, 2);

        // Convert JSON data to new divs
        if (!authorSearch) {
            for (let i = 0; i < Math.min(docCount, json.numFound); i++)
            {
                // Mash together a set of text to be immediately added to the new div; ternary statements here handle exceptions in case of missing tags
                var resultTextTitle = (typeof (json.docs[i].title) != "undefined" ? json.docs[i].title : "[untitled]") + (json.docs[i].subtitle ? (" - " + json.docs[i].subtitle) : "");
                var resultTextAuthor = (typeof (json.docs[i].author_name) != "undefined" ? ("By: " + json.docs[i].author_name.join(", ")) : "unspecified author(s)");

                // Create a new set of divs containing the text
                var newResultDiv = document.createElement('div');
                newResultDiv.classList.add("result-array");
                newResultDiv.ariaLabel = ("Search result");
                document.getElementsByClassName("results")[0].appendChild(newResultDiv);

                var newResultDivTitle = document.createElement('div');
                newResultDivTitle.textContent = resultTextTitle;
                newResultDivTitle.classList.add("result-array-title");
                document.getElementsByClassName("result-array")[i].appendChild(newResultDivTitle);

                var newResultDivAuthor = document.createElement('div');
                newResultDivAuthor.textContent = resultTextAuthor;
                newResultDivAuthor.classList.add("result-array-author");
                document.getElementsByClassName("result-array")[i].appendChild(newResultDivAuthor);
            }
        }
        else {
            for (let i = 0; i < Math.min(docCount, json.numFound); i++) // Prevent overflowing beyond bounds of array with a Math.min operation
            {
                // Similar logic to above, but in a different order and concerning different elements
                var resultTextAuthor = (typeof (json.docs[i].name) != "undefined" ? json.docs[i].name : "[unknown]");
                var resultTextAlts = (typeof (json.docs[i].alternate_names) != "undefined" ? ("AKA: " + json.docs[i].alternate_names.join(", ")) : null);

                // Create a new set of divs containing the text
                var newResultDiv = document.createElement('div');
                newResultDiv.classList.add("result-array");
                document.getElementsByClassName("results")[0].appendChild(newResultDiv);

                var newResultDivTitle = document.createElement('div');
                newResultDivTitle.textContent = resultTextAuthor;
                newResultDivTitle.classList.add("result-array-title");
                document.getElementsByClassName("result-array")[i].appendChild(newResultDivTitle);

                if (resultTextAlts) { // Since it is defined as null if not present, this if statement works
                    var newResultDivAlts = document.createElement('div');
                    newResultDivAlts.textContent = resultTextAlts;
                    newResultDivAlts.classList.add("result-array-author");
                    document.getElementsByClassName("result-array")[i].appendChild(newResultDivAlts);
                }
            }
        }

        // Set the JSON display view
        toggleJSONView()

        // Change background color to indicate success
        document.body.style.backgroundColor = "#2f394f";
    } catch(e) {
        console.log(e);
        alert('Error detected. Check the log.');
        document.body.style.backgroundColor = "#7a3f49ff";
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
        document.body.style.backgroundColor = "#3f527a";
    }
}


// Toggle JSON view
function toggleJSONView() {
    if (seeJson) {
        document.getElementsByClassName("json-content")[0].style.fontSize = "9px";
        document.getElementsByClassName("json-content")[0].innerHTML = "<pre>" + jsonStorage + "</pre>";
        document.getElementsByClassName("app")[0].style.display = "none";
    }
    else {
        document.getElementsByClassName("app")[0].style.display = "grid";
        document.getElementsByClassName("json-content")[0].innerHTML = 'When a query is submitted, this website transmits only the query to the API that it fetches its library data from, with modification based on the other forms of input provided. No personal data, or other kinds of data, are collected or stored long term. This box, if checked upon submission, will display the raw JSON output of the current search, showing all data that the site collects. This box may be very large. Uncheck it to return.'
        document.getElementsByClassName("json-content")[0].style.fontSize = "16px";
    }
}