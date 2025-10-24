let entryBtn = document.querySelector('#js-new-entry').addEventListener('click', newEntry);
let answerBtn = document.querySelector('#js-answer').addEventListener('click', newAnswer);

let current = { // Table to store trivia questions and answers
    image: "",
    answer: "",
    description: "",
};

var currentImage = null;
var currentAnswer = null;


// Function definitions

async function newEntry() {
    try {
        // Clear any existing images
        if (currentImage) { 
            document.getElementsByClassName("quotes")[0].innerHTML = ''
            currentImage = null;
            currentAnswer = null;
        }

        // Wait for the data from the endpoint (RNG for entry ID) to be collected, and store if it is found
        const response = await fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/entry/" + (Math.floor(Math.random() * 79) + 84))

        // If the response is not valid or doesn't exist, throw an error caught in the catch block
        if (!response.ok) {
            throw Error(response.statusText);
        }

        // Wait for the response to resolve before assignment
        const json = await response.json();

        // Store the API data for later use
        console.log(Object.values(json.data))

        current.image = Object.values(json.data)[6];
        current.answer = (Object.values(json.data)[7]).toUpperCase();
        current.description = Object.values(json.data)[2];

        // Display the data
        displayTrivia();

    } catch (e) {
        console.log(e);
        alert('Error found!');
    }
}

function displayTrivia() {
    // Dynamically create an image element that represents the question subject, pulled from the API
    var image = document.createElement('img');
    image.alt = 'A randomized Hyrule monster.';
    image.src = current.image;
    image.classList.add("quote-image");

    currentImage = document.getElementsByClassName("quotes")[0].appendChild(image)

    // Unlike the old function, the answer divs don't exist yet.
}

function newAnswer() {
    if (!currentAnswer) {
        var answer = document.createElement('div');
        answer.textContent = current.answer;
        answer.classList.add("quote-text");
        currentAnswer = document.getElementsByClassName("quotes")[0].appendChild(answer)

        var desc = document.createElement('div');
        desc.textContent = current.description;
        desc.classList.add("quote-text");
        document.getElementsByClassName("quotes")[0].appendChild(desc)
    }
}

// Not run with the rest of them, but button inputs can trigger it.
function changeBG(c) {
    document.body.style.backgroundColor = c;
}


newEntry() // Generate entry on refresh/load, after all other blocks have run