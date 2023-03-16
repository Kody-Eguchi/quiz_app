const createQuizResultElement = function(quizResultObj) {
  // variables from user object to be used in object
  const NumOfCorrectAnswers = quizResultObj.number_of_correct_answer;
  const NumOfIncorrectAnswers = quizResultObj.number_of_wrong_answer;
  const result = quizResultObj.result;
  const numOfAttempt = quizResultObj.num_of_attempt;

  // new quiz article
  const newArticle = $("<article class='quiz-result-display'>");

  // quiz header elements
  const newHeader = $("<header class='quiz-header'>");
  const newHeaderDiv = $("<div>");
  const newHeaderP = $(`<p class='header-p'>`).text('Your score');

  newHeaderDiv.append(newHeaderP);
  newHeader.append(newHeaderDiv);

  // quiz body elements
  // added quiz description for css
  const newBodyDiv = $("<div class='quiz-result-info'>")
  const newResult = $("<p class='quiz-result'>").text(`You scored ${result}%`);
  const newNumOfCorrectAnswers = $("<p class='quiz-correct-answers'>").text(`You got ${NumOfCorrectAnswers} questions right!`);
  const newNumOfIncorrectAnswers = $("<p class='quiz-incorrect-answers'>").text(`You got ${NumOfIncorrectAnswers} questions wrong!`);

  newBodyDiv.append(newResult);
  newBodyDiv.append(newNumOfCorrectAnswers);
  newBodyDiv.append(newNumOfIncorrectAnswers);

  // quiz footer elements
  const newFooter = $("<footer class='quiz-result-footer'>");
  const newFooterDiv = $("<div>");
  // changed it to dynamic
  const newNumOfAttempt = $('<p class="num-attept">').text(`Number of Attempt: ${numOfAttempt}`);

  newFooterDiv.append(newNumOfAttempt);
  newFooter.append(newFooterDiv);


  // adding new elements to article
  newArticle.append(newHeader);
  newArticle.append(newBodyDiv);
  newArticle.append(newFooter);

  return newArticle;
};

const createShareBtnElement = function(para){
  const newUrlBox = $(`<input id='urlBox' value=${para}>`)
  $('.share-btn-container').append(newUrlBox);
};



$(() => {
  const pathname = window.location.pathname.split('/');
  const quizId = pathname[pathname.length - 1];


  const shareUrl = `http://localhost:8080/show_quiz_results/${quizId}`;
  createShareBtnElement(shareUrl);
  $('#urlBox').hide();


  //SHARE URL BUTTON
  $('#share-btn').click(function(e){
    e.preventDefault();
    $('#urlBox').toggle();
    // window.open(shareUrl);

});




  $.ajax({
    method: 'GET',
    url: '/api/quiz_results',
  })
    .then(data => {
      console.log(data.rows);
    })
    .catch(err => {
      console.log('Error: ', err);
    })




  $.ajax({
    method: 'GET',
    url: `/api/quiz_results/${quizId}`
  })
    .then(quizResultObj => {
      // console.log(quizResultObj[0]);
      const $quizResultDisplay = createQuizResultElement(quizResultObj[0]);
      $('.quiz-result-display-container').append($quizResultDisplay);
    })
    .catch(err => {
      console.log('Error: ', err);
    })
})
