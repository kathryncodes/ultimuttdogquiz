//Declare All Global Variables
let breedList, imgUrl, selectedBreed, correctAnswer, selectedButton,correctOption;
let answerOptions = [];
const image = document.body.querySelector("#dog-img");
const optionA = document.body.querySelector(".A")
const optionB = document.body.querySelector(".B")
const optionC = document.body.querySelector(".C")
const optionD = document.body.querySelector(".D")
const submit = document.body.querySelector(".submit");
const optionBtns = document.body.querySelectorAll(".option");
const message = document.body.querySelector(".message");
const next = document.querySelector(".next");
const startQuiz = document.body.querySelector("#start-btn");
const nav = document.body.querySelector("nav");
const quizData = document.body.querySelector(".quiz-data");
const landing = document.body.querySelector(".landing")

//Fetch the breed list once window is loaded.

window.addEventListener('load', (event) => {
    getBreeds();
});

const getBreeds = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();

    const breeds = data.message;
    breedList = Object.keys(breeds)
}

//Randomly selects a dog image, and gets the image url and breed name
const getDog = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const dogImg = await response.json();

    imgUrl = dogImg.message;

    selectedBreed = imgUrl.slice(30, imgUrl.indexOf("/", 30));

    formatBreeds();
}

//Format breed spelling and creates array of answer options
const formatBreeds = () => {
    //Format Selected Breed
    if(selectedBreed.includes("-")){
        selectedBreed = selectedBreed.split("-").reverse().join(" ");
    }

    //Create Answer Options Array
    //get random breeds for MC options
    for(let i=0; i < 3; i++){
        let random = Math.floor(Math.random() * breedList.length);
        let randomBreed = breedList[random];
        if(randomBreed == selectedBreed || answerOptions.includes(randomBreed)){
            answerOptions.push(breedList[random + 1]);
        } else{
            answerOptions.push(randomBreed);
        }

    }
    //add selected breed to answer options
    answerOptions.push(selectedBreed);

    // Format most sub-breeds in Answer Option Array
    for(let answer of answerOptions){
        if(answer.includes("-")){
            answer = answer.split("-").reverse().join(" ");
        }
    }

    //shuffle the answer options
    shuffle(answerOptions);

    //trigger Display All
    displayAll();
}

//Fisher Yates shuffle stolen from the Internet :)
const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
}

//displays all data on the DOM
const displayAll = () => {
     //sets the src of the image tag
     image.src = imgUrl

     //changes the text for the option buttons
     //Slight delay to allow image to be loaded
      setTimeout(() => {
        optionA.textContent = answerOptions[0];
        optionB.textContent = answerOptions[1];
        optionC.textContent = answerOptions[2];
        optionD.textContent = answerOptions[3]; 
        //triggers isCorrect function that handles the selection and submission of answer
        //this must be in the setTimeout function otherwise the isCorrect function fires before the proper answers are displayed (found out the hard way :)
        isCorrect();
      }, 500)
     
}

//handles the selection of option buttons, submission and checks if answer is correct
const isCorrect = () => {
    //get the index of the correct answer in the answerOptions array
    correctOption = answerOptions.indexOf(selectedBreed)


    //gets the actual button that has the right answer
    switch(correctOption){
        case 0:
            correctAnswer = optionA;
            break;
        case 1:
            correctAnswer = optionB;
            break;
        case 2:
            correctAnswer = optionC;
            break;
        case 3: 
            correctAnswer = optionD;
            break;
        }
    

    //deselect button function to avoid multiple buttons being selected simultaneously
    var deselect = () => {
        optionBtns.forEach(option => option.classList.remove("selected"));
    }

    //click event for each option button
    optionBtns.forEach(option => option.addEventListener("click", () => {
        deselect();
        option.classList.add("selected");
    }));
    

    //messages for correct or incorrect answer
    let correctMessage = `That's paws-itively correct!`;
    let wrongMessage = `Dog-gone it! The correct answer is ${selectedBreed}`
    

    //submit button event that compares selection to the correct answer and displays the corresponding message
    submit.addEventListener("click", () => {
    selectedButton = document.body.querySelector(".selected");
        if(selectedButton.textContent == correctAnswer.textContent){
            selectedButton.classList.add("correct")
            message.innerText = correctMessage;
        } else{
            selectedButton.classList.add("wrong")
            message.innerText = wrongMessage;
        }
    })

}

//function to reset all the variables needed for the next question
const clearAll = () => {
    selectedBreed = "";
    randomBreed = "";
    answerOptions = [];
    message.textContent = "";
    optionBtns.forEach(option => option.classList = " ");
}

//resets variables and triggers the getDog function for the next question
next.addEventListener("click", () => {
    clearAll();
    getDog();
});

//triggers the getDog function for the first question
startQuiz.addEventListener("click", function(){
    getDog();
    //add delay so that dog image can load
    setTimeout(() => {
    nav.style.opacity = 1;
    quizData.style.display = "flex";
    landing.style.display = "none";
    }, 500)
})
