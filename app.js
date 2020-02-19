/* eslint-disable strict */


let startButton = document.getElementById('start-btn');
startButton.addEventListener('click', beginQuiz);
const nextButton = document.getElementById('nxt btn');
const questionContainerElement=document.getElementById('question-container');
const questionElement= document.getElementById('question');
const answerButtonsElement= document.getElementById('answer-btns');
let currentQuestionIndex = 0;




function beginQuiz() {
  
  startButton.classList.add('hide');
  questionContainerElement.classList.remove('hide');
  nextQuestion();
  
  
}

function nextQuestion() {
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;      
    showQuestion();
    render();
  });
}
function showQuestion(question){
  questionElement.innerText= question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText= answer.text;
    button.classList.add('btn');
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', checkAnswer);
    answerButtonsElement.appendChild(button);
  });
}
function render(){
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild); 
  }
}

function checkAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if(store.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText= 'restart';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if(correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const store = [
  // 5 or more questions are required
  {
    question: 'How does Daenerys Targaryen command her dragons to breathe fire?',
    answers: [
      {text: 'Valor Morghulis', correct: false},
      {text: 'Khaleesi', correct: false},
      {text: 'Drogo', correct: false},
      {text: 'Dracarys', correct: true}
    ]
      
  },
  {
    question: 'Who is the Three-eyed Raven',
    answers: [
      {text: 'Bran', correct: true},
      {text: 'Hodor', correct: false},
      {text: 'Sansa', correct: false},
      {text: 'Jon', correct: false}
    ]
      
  },
  {
    question: 'Jaime Lannister lost his: ',
    answers: [
      {text: 'hand', correct: true},
      {text: 'head', correct: false},
      {text: 'arm', correct: false},
      {text: 'leg', correct: false}
    ]
      
  },
  {
    question: 'Cersei Lannister was romantically in love with her: ',
    answers: [
      {text: 'twin brother', correct: true},
      {text: 'father', correct: false},
      {text: 'cousin', correct: false},
      {text: 'son', correct: false}
    ]
      
  },
  {
    question: 'Sansa\'s favorite food is: ',
    answers: [
      {text: 'pork pie', correct: false},
      {text: 'lemon cake', correct: true},
      {text: 'pigeon pie', correct: false},
      {text: 'direwolf bread', correct: false}
    ]
      
  }
    
];

