(function() {
  const myQuestions = [
    {
      question: "The highest mountain in the world is:", 
      answers: {
        a: "Mont Blanc", 
        b: "Mont Everest", 
        c: "Kilimanjaro", 
        d: "Aconcagua"
      },
      correctAnswer: "b"
    },
    {
      question: "Which fruit doesn't grow on trees:", 
      answers: {
        a: "Mango", 
        b: "Banana", 
        c: "Orange", 
        d: "Pineapple"
      },
      correctAnswer: "d"
    },
    {
      question: "What is the distance between Earth and Sun:", 
      answers: {
        a: "384 400 km", 
        b: "778 000 500 km", 
        c: "149 600 000 km", 
        d: "40 008 km"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the most popualar browser:", 
      answers: {
        a: "Chrome", 
        b: "Firefox", 
        c: "Safari", 
        d: "IE/Edge"
      },
      correctAnswer: "a"
    },
  ];



  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }



  function progress() {
    var prg = document.getElementById('progress');
    var percent = document.getElementById('percentCount');
    var counter = 5;
    var progress = 25;
    var id = setInterval(frame, 50);

    function frame() {
      if(progress == 500 && counter == 100) {
        clearInterval(id);
      }
      else {
        progress += 5;
        prg.style.width = progress + 'px';
        percent.innerHTML = counter + '%';
      }
    }
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();
  progress();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();