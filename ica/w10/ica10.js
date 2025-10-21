// Used to be a quote generator, so names are not updated

let triviaBtn = document.querySelector('#js-new-quote').addEventListener('click', newTrivia);

let answerBtn = document.querySelector('#js-tweet').addEventListener('click', newAnswer);

let current = { // Table to store trivia questions and answers
    question: "",
    answer: "",
};

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";


// Function definitions

async function newTrivia() { // Fetch quote, called getQuote() in documentation; asynchronous functions run without stopping control flow
    try { // Attempt to execute; the catch below will trigger upon erroring instead of breaking the JavaScript
        const response = await fetch(endpoint) // Wait for the data from the endpoint to be collected, and store if it is found
        if (!response.ok) { // If the response is not valid or doesn't exist
            throw Error(response.statusText);
        }
        const json = await response.json(); // Wait for the response to resolve before assignment

        displayTrivia(json["question"]); // Look for a particular index from the API site

        current.question = json["question"]; // Store the API data for later use in newAnswer()
        current.answer = json["answer"];
    } catch (e) {
        console.log(e);
        alert('Failed to retrieve trivia!');
    }
}

function displayTrivia(question) { // Called displayQuote in documentation
    const questionText = document.querySelector('#js-quote-text');
    const answerText = document.querySelector('#js-answer-text');
    questionText.textContent = question;
    answerText.textContent = "";
}

function newAnswer() {
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent = current.answer;
}


newTrivia() // Generate trivia on refresh/load, after all other blocks have run