const STORE = {
  // 5 or more questions are required
  questions: [
    {
      question: 'How does Daenerys Targaryen command her dragons to breathe fire?',
      answers: [
        'Valor Morghulis',
        'Khaleesi',
        'Drogo',
        'Dracarys'
      ],
      correctAnswer: 'Dracarys'
    },
    {
      question: 'Who is the Three-eyed Raven',
      answers: [
        'Bran',
        'Hodor',
        'Sansa',
        'Jon'
      ],
      correctAnswer: 'Bran'
    },
    {
      question: 'Jaime Lannister lost his: ',
      answers: [
        'hand',
        'head',
        'arm',
        'leg'
      ],
      correctAnswer: 'hand'
    },
    {
      question: 'Cersei Lannister was romantically in love with her: ',
      answers: [
        'twin brother',
        'father',
        'cousin',
        'son'
      ],
      correctAnswer: 'twin brother'
    },
    {
      question: 'Sansa\'s favorite food is: ',
      answers: [
        'pork pie',
        'lemon cake',
        'pigeon pie',
        'direwolf bread'
      ],
      correctAnswer: 'lemon cake'
    }

  ],

  answerFeedback: false,
  num: 0,
  score: 0
};
//event listener for start click
function startClick() {
  $('main').on('click', '#begin-btn', function () {
    $(location).attr('href', renderQuiz);
  });
}
//generates html for start screen
function generateStartScreen() {
  $('main').html(`
  <header id="start-screen">
    <h1>Test Your Game of Thrones Knowledge</h1>
  </header>

  <div id "start-screen-btn-div">
      <button id = "begin-btn">BEGIN</button> 
    </div>
  
`);
}
//generates html for quiz questions and answers
function generateQuiz(currentQuestion) {
  return `
      <div class="outer-box-question">
      <div class="inner-box-question">
      <header class="score-board">
        <ul>
          <p>
              Question ${STORE.num + 1} of ${STORE.questions.length} 
          </p> 
          <p>
              Your Current Score is ${STORE.score}
          </p>
        <ul>
      </header>
      <section class="question-number">${currentQuestion.question}</section>
      <form class="question-form">  
            ${currentQuestion.answers
    .map((answer, index) => {
      return `<input id="answer${index}" name="quesion-container" type="radio" value="${answer}" required />
                <label id="btn-answers" for="answer${index}">${answer}</label>
                <br>`;
    })
    .join('')}
              <button type="next" id="next-btn">SUBMIT</button>
          </form>
          </div>
          </div>
  </section> 
  `;
//defines currentQuestion
}
function currentQuestion() {
  return STORE.questions[STORE.num];
}
//renders quiz for correct question
function renderQuiz() {
  let html = generateQuiz(currentQuestion());
  $('main').html(html);

}
//renders feedback for choices
function renderFeedback() {
  if (STORE.answerFeedback === true) {
    $('main').html(generateIfCorrect());
  } else if (STORE.answerFeedback === false) {
    $('main').html(generateIfWrong());

  }
}
//generates correct feedback html
function generateIfCorrect() {
  return `
  <div class="outer-box-answers">
  <section class="inner-box-answers">
  <form>
  ${scoreBoard()}   
  <p>That was correct</p>
  ${generateNextButton()}
  </section>
  </div>
  `;
}
//generates wrong feedback html
function generateIfWrong() {
  return `
    <div class="outer-box-answers">
    <section class="inner-box-answers">
      <form>
          <p>The correct answer was "${
  STORE.questions[STORE.num].correctAnswer
}"</p>
        
          ${generateNextButton()}
      </form>
    </section>
    `;
  //function to call the next button
} function generateNextButton(){
  return `
      <button id="next-question">Next</button>
      `;
}


function scoreBoard() {
 
  return `<div class='outer-score-div'>
      <div class='inner-score-div'>
      <p>Your current Score is ${STORE.score}</p> 
      </div>
      </div>`;
  
  
}

function handleSubmit() {
  $('main').on('submit', 'form', function (e) {
    e.preventDefault();

    let choice = $('input[type="radio"]:checked').val();
    handleChoice(choice);
  });
}
function handleChoice(choice) {
  if (choice === STORE.questions[STORE.num].correctAnswer) {
    STORE.answerFeedback = true;
    STORE.score += 1;
  } else {
    STORE.answerFeedback = false;
  }
  renderFeedback();
}
function handleNext(currentQuestion) {
  $('main').on('click', '#next-question', function (e) {
    STORE.num++;
    if (STORE.num >= STORE.questions.length) {
      generateResults();
    } else {
      event.preventDefault();
      renderQuiz();
    }
  });
}


function generateResults() {
  $('main').html(`Your final score is ${STORE.score}
  <div id="go-back-btn">
  <button id="goBack">Restart Quiz</button>
  </div>`);
}
function reset(){
  $('main').on('click', '#goBack', function (e) {
    generateStartScreen();
    location.reload();
    return false;
  });
}


function loadQuiz() {
  handleNext();
  startClick();
  renderFeedback();
  generateStartScreen();
  handleSubmit();
  scoreBoard();
  generateQuiz(currentQuestion());

  reset();
}
$(loadQuiz);

