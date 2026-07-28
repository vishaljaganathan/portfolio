const set1 = [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "None of these"], correct: 0 },
    { question: "Which of the following tag is used for inserting the largest heading in HTML?", options: ["<h3>", "<h1>", "<h5>", "<h6>"], correct: 1 },
    { question: "Which CSS property controls the text size?", options: ["font-style", "text-style", "font-size", "text-size"], correct: 2 },
    { question: "What does CSS stand for?", options: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"], correct: 1 },
    { question: "Inside which HTML element do we put the JavaScript?", options: ["<scripting>", "<js>", "<script>", "<javascript>"], correct: 2 },
    { question: "How do you create a function in JavaScript?", options: ["function = myFunction()", "function myFunction()", "function:myFunction()", "create myFunction()"], correct: 1 },
    { question: "Which of the following is not a reserved word in JavaScript?", options: ["interface", "throws", "program", "short"], correct: 2 },
    { question: "Which HTML attribute is used to define inline styles?", options: ["class", "style", "font", "styles"], correct: 1 },
    { question: "How do you add a comment in a CSS file?", options: ["/* this is a comment */", "// this is a comment", "<!-- this is a comment -->", "' this is a comment"], correct: 0 },
    { question: "Which property is used to change the background color?", options: ["bgcolor", "color", "background-color", "bg-color"], correct: 2 },
    { question: "How to write an IF statement in JavaScript?", options: ["if i = 5 then", "if i == 5 then", "if (i == 5)", "if i = 5"], correct: 2 },
    { question: "How does a FOR loop start?", options: ["for (i <= 5; i++)", "for (i = 0; i <= 5)", "for i = 1 to 5", "for (i = 0; i <= 5; i++)"], correct: 3 },
    { question: "Which event occurs when the user clicks on an HTML element?", options: ["onchange", "onclick", "onmouseclick", "onmouseover"], correct: 1 },
    { question: "What is the correct HTML for adding a background color?", options: ["<body bg=\"yellow\">", "<body style=\"background-color:yellow;\">", "<background>yellow</background>", "<body color=\"yellow\">"], correct: 1 },
    { question: "Choose the correct HTML element to define important text:", options: ["<b>", "<i>", "<strong>", "<important>"], correct: 2 },
    { question: "How do you select an element with id 'demo' in CSS?", options: [".demo", "#demo", "demo", "*demo"], correct: 1 },
    { question: "Which method is used to write text directly to the HTML document output in JS?", options: ["document.write()", "console.log()", "window.alert()", "document.output()"], correct: 0 },
    { question: "Which of the following is true about variable naming conventions in JavaScript?", options: ["Variables can start with a number", "Variables cannot contain spaces", "Variables are not case sensitive", "Variables must start with a letter only"], correct: 1 },
    { question: "How can you make a numbered list in HTML?", options: ["<ul>", "<dl>", "<ol>", "<list>"], correct: 2 },
    { question: "Which operator is used to assign a value to a variable?", options: ["*", "-", "=", "x"], correct: 2 }
];

const set2 = [
    { question: "What does XML stand for?", options: ["eXtra Modern Link", "eXtensible Markup Language", "Example Markup Language", "X-Markup Language"], correct: 1 },
    { question: "Which tag is used to create a hyperlink?", options: ["<a>", "<img>", "<dl>", "<link>"], correct: 0 },
    { question: "In CSS, what is the correct option to select all <p> elements?", options: ["p { }", ".p { }", "#p { }", "<p> { }"], correct: 0 },
    { question: "What is the default value of the position property?", options: ["relative", "fixed", "absolute", "static"], correct: 3 },
    { question: "Which built-in method returns the length of the string in JavaScript?", options: ["length()", "size()", "index()", "length"], correct: 3 },
    { question: "Which operator is used to compare both value and type in JavaScript?", options: ["==", "=", "===", "!="], correct: 2 },
    { question: "How do you round the number 7.25, to the nearest integer?", options: ["Math.rnd(7.25)", "Math.round(7.25)", "round(7.25)", "rnd(7.25)"], correct: 1 },
    { question: "How to specify an image in HTML?", options: ["<image src=\"url\">", "<img href=\"url\">", "<img src=\"url\">", "<pic src=\"url\">"], correct: 2 },
    { question: "Which property is used to change the font of an element?", options: ["font-family", "font-weight", "font-style", "font-variant"], correct: 0 },
    { question: "How do you make each word in a text start with a capital letter?", options: ["text-transform:capitalize", "text-transform:uppercase", "transform:capitalize", "text-style:capital"], correct: 0 },
    { question: "JavaScript is a ___ -side programming language.", options: ["Client", "Server", "Both Client and Server", "None"], correct: 2 },
    { question: "Which array method adds new items to the end of an array?", options: ["push()", "pop()", "shift()", "add()"], correct: 0 },
    { question: "Which HTML attribute specifies an alternate text for an image?", options: ["title", "src", "alt", "longdesc"], correct: 2 },
    { question: "Which character is used to indicate an end tag?", options: ["*", "^", "<", "/"], correct: 3 },
    { question: "How do you group selectors in CSS?", options: ["Separate with a comma", "Separate with a space", "Separate with a plus sign", "Group them in brackets"], correct: 0 },
    { question: "What is the correct syntax for referring to an external script called 'xxx.js'?", options: ["<script href=\"xxx.js\">", "<script name=\"xxx.js\">", "<script src=\"xxx.js\">", "<script file=\"xxx.js\">"], correct: 2 },
    { question: "How do you find the number with the highest value of x and y?", options: ["Math.max(x, y)", "Math.ceil(x, y)", "top(x, y)", "ceil(x, y)"], correct: 0 },
    { question: "What will the code 'Boolean(10 > 9)' evaluate to?", options: ["NaN", "false", "true", "undefined"], correct: 2 },
    { question: "Which property is used to center text in CSS?", options: ["text-align", "align-text", "center-text", "text-center"], correct: 0 },
    { question: "How can you open a link in a new tab/browser window?", options: ["<a href=\"url\" target=\"_new\">", "<a href=\"url\" target=\"_blank\">", "<a href=\"url\" new>", "<a href=\"url\" target=\"new_window\">"], correct: 1 }
];

const set3 = [
    { question: "What is the correct HTML element for inserting a line break?", options: ["<br>", "<lb>", "<break>", "<newline>"], correct: 0 },
    { question: "How can you make a bulleted list?", options: ["<ol>", "<ul>", "<dl>", "<list>"], correct: 1 },
    { question: "Which CSS property controls the text color?", options: ["text-color", "color", "font-color", "text-style"], correct: 1 },
    { question: "What is the correct CSS syntax for making all the <p> elements bold?", options: ["p {text-size:bold;}", "p {font-weight:bold;}", "<p style=\"text-size:bold;\">", "p {style:bold;}"], correct: 1 },
    { question: "How do you display hyperlinks without an underline?", options: ["a {decoration:no-underline;}", "a {text-decoration:none;}", "a {underline:none;}", "a {text-decoration:no-underline;}"], correct: 1 },
    { question: "Is JavaScript case-sensitive?", options: ["Yes", "No", "Only for variables", "Only for functions"], correct: 0 },
    { question: "How to declare a variable in JavaScript?", options: ["v carName;", "variable carName;", "let carName;", "declare carName;"], correct: 2 },
    { question: "Which event occurs when a user focuses on an element?", options: ["onmouseclick", "onfocus", "onhover", "onchange"], correct: 1 },
    { question: "Which HTML element is used to specify a footer for a document or section?", options: ["<bottom>", "<footer>", "<section>", "<nav>"], correct: 1 },
    { question: "Which CSS property is used to create space around elements, outside of any defined borders?", options: ["padding", "spacing", "margin", "border-spacing"], correct: 2 },
    { question: "Which JavaScript method is used to remove the last element from an array?", options: ["pop()", "shift()", "slice()", "remove()"], correct: 0 },
    { question: "How can you detect the client's browser name?", options: ["client.navName", "navigator.appName", "browser.name", "window.browser"], correct: 1 },
    { question: "Which HTML5 element is used to draw graphics via scripting?", options: ["<svg>", "<graphic>", "<canvas>", "<draw>"], correct: 2 },
    { question: "How do you make a list that lists its items with squares?", options: ["list-type: square;", "list-style-type: square;", "type: square;", "list-style: square;"], correct: 1 },
    { question: "What is the default display value of a <div> element?", options: ["inline", "block", "inline-block", "flex"], correct: 1 },
    { question: "Which operator is used to determine if a specific property exists in an object?", options: ["has", "exists", "in", "contains"], correct: 2 },
    { question: "Which function of an Array object calls a function for each element in the array?", options: ["forEach()", "every()", "forEvery()", "each()"], correct: 0 },
    { question: "What does the z-index property in CSS do?", options: ["Changes width", "Changes stack order", "Changes zoom level", "Changes opacity"], correct: 1 },
    { question: "How do you add a multi-line comment in JavaScript?", options: ["// comment //", "/* comment */", "<!-- comment -->", "** comment **"], correct: 1 },
    { question: "What is the correct syntax for a JavaScript 'while' loop?", options: ["while (i <= 10)", "while i = 1 to 10", "while (i <= 10; i++)", "until (i <= 10)"], correct: 0 }
];

const allSets = [set1, set2, set3];
let quizData = [];
let currentQuestion = 0;
let score = 0;

// DOM Elements
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const questionCounter = document.getElementById("question-counter");
const scoreDisplay = document.getElementById("score-display");
const progressBar = document.getElementById("progress");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const restartBtn = document.getElementById("restart-btn");

// Event Listeners
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});
restartBtn.addEventListener("click", startQuiz);

function shuffleArray(array) {
    // Optional: Shuffle the questions within the selected set so they don't always appear in the same order
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    
    // Pick a random set from the 3 available sets
    const randomSetIndex = Math.floor(Math.random() * allSets.length);
    // Deep clone the set so shuffling doesn't permanently alter the original arrays
    quizData = JSON.parse(JSON.stringify(allSets[randomSetIndex]));
    quizData = shuffleArray(quizData);
    
    startScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    questionScreen.classList.add("active");
    loadQuestion();
}

function loadQuestion() {
    // Reset state
    nextBtn.classList.add("hidden");
    optionsContainer.innerHTML = "";
    
    // Update progress and counters
    questionCounter.innerText = `Question ${currentQuestion + 1} / ${quizData.length}`;
    scoreDisplay.innerText = `Score: ${score}`;
    progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
    
    // Load question data
    const currentQuizData = quizData[currentQuestion];
    questionText.innerText = currentQuizData.question;
    
    // Create options
    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.addEventListener("click", () => selectOption(button, index));
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedButton, index) {
    const currentQuizData = quizData[currentQuestion];
    const isCorrect = index === currentQuizData.correct;
    
    // Disable all options
    const allOptions = optionsContainer.querySelectorAll(".option");
    allOptions.forEach(option => {
        option.classList.add("disabled");
    });
    
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
        scoreDisplay.innerText = `Score: ${score}`;
    } else {
        selectedButton.classList.add("wrong");
        // Highlight correct answer
        allOptions[currentQuizData.correct].classList.add("correct");
    }
    
    nextBtn.classList.remove("hidden");
    if (currentQuestion === quizData.length - 1) {
        nextBtn.innerText = "Finish Quiz";
    } else {
        nextBtn.innerText = "Next Question";
    }
}

function showResult() {
    questionScreen.classList.remove("active");
    resultScreen.classList.add("active");
    
    finalScore.innerText = score;
    
    if (score === quizData.length) {
        resultMessage.innerText = "Perfect! You're a Web Tech master!";
    } else if (score >= quizData.length * 0.7) {
        resultMessage.innerText = "Great job! You know your stuff.";
    } else if (score >= quizData.length * 0.4) {
        resultMessage.innerText = "Good effort! Keep practicing.";
    } else {
        resultMessage.innerText = "You might need to study more!";
    }
}
