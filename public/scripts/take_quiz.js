const createAllQuestionsContainerHeader = function (questionObj) {
  const name = questionObj.name;
  const category = questionObj.category;

    // question header elements
    const newHeader = $("<header class='questionsHeader'>");
    const newHeaderDiv = $("<div class='header-div'>");
    const newQuestionCategory = $(`<span class='question-category'>`).text(`Category: ${category}`);
    const newQuestionName = $("<p class='question-name'>").text(`Quiz: ${name}`);


    newHeaderDiv.append(newQuestionName);
    newHeaderDiv.append(newQuestionCategory);
    newHeader.append(newHeaderDiv);
  return newHeader;
}

const createAllQuestionsContainerFooter = function (questionObj) {
  const numOfQuestions = questionObj.num_of_question;

    // question footer elements
  const newFooter = $("<footer class='question-footer'>");

  // const newFooterP = $("<p>").text(`${questionDate}`);
  const newFooterDiv = $("<div class='question-footer-div'>");
  // changed it to dynamic
  const newQuestionNumOfQuestions = $("<p class='question-num-of-questions'>").text( `Total Questions: ${numOfQuestions}`);

  newFooterDiv.append(newQuestionNumOfQuestions);
  newFooter.append(newFooterDiv);

  return newFooter;
}

const createQuestionElement = function(questionObj) {
  // variables from user object to be used in object
  const question_id = questionObj.id;
  const question = questionObj.question;
  const option1 = questionObj.option_1;
  const option2 = questionObj.option_2;
  const option3 = questionObj.option_3;
  const option4 = questionObj.option_4;

  // new question article
  const newArticle = $("<article class='question-display'>");

  // question body elements
  // added question description for css
  const newQuestionContainer = $("<div class='question-container'>");
  const newQuestion = $("<p class='new-question'>").text(`${question}`);
  const newAnswerList = $("<ul class='answer-list'>");
  //ANSWER - OPTION1
  const newAnswerOne = $("<li>");
  const newAnswerOneInput = $(`<input type='radio' name=${question_id} class='answer-option-1' value=${option1}>`);
  const newAnswerOneLabel = $("<label for='option-1'>").text(`  ${option1}`);
  //ANSWER - OPTION2
  const newAnswerTwo = $("<li>");
  const newAnswerTwoInput = $(`<input type='radio' name=${question_id} class='answer-option-2' value=${option2}>`);
  const newAnswerTwoLabel = $("<label for='option-2'>").text(`  ${option2}`);
  //ANSWER - OPTION3
  const newAnswerThree = $("<li>");
  const newAnswerThreeInput = $(`<input type='radio' name=${question_id} class='answer-option-3' value=${option3}>`);
  const newAnswerThreeLabel = $("<label for='option-3'>").text(`  ${option3}`);
  //ANSWER - OPTION4
  const newAnswerFour = $("<li>");
  const newAnswerFourInput = $(`<input type='radio' name=${question_id} class='answer-option-4' value=${option4}>`);
  const newAnswerFourLabel = $("<label for='option-4'>").text(`  ${option4}`);

  newAnswerOne.append(newAnswerOneInput);
  newAnswerOne.append(newAnswerOneLabel);

  newAnswerTwo.append(newAnswerTwoInput);
  newAnswerTwo.append(newAnswerTwoLabel);

  newAnswerThree.append(newAnswerThreeInput);
  newAnswerThree.append(newAnswerThreeLabel);

  newAnswerFour.append(newAnswerFourInput);
  newAnswerFour.append(newAnswerFourLabel);

  newAnswerList.append(newAnswerOne);
  newAnswerList.append(newAnswerTwo);
  newAnswerList.append(newAnswerThree);
  newAnswerList.append(newAnswerFour);

  newQuestionContainer.append(newQuestion);
  newQuestionContainer.append(newAnswerList);
  // newFooterDiv.append(newShareBtnDiv);


  // adding new elements to article
  newArticle.append(newQuestionContainer);

  return newArticle;
};


const renderQuestionElement = function(questionArr) {
  const $header = createAllQuestionsContainerHeader(questionArr[0]);
  $('.all-questions-container').append($header);
  for (const question of questionArr) {
    const $question = createQuestionElement(question);
    $('.all-questions-container').append($question);
  }
  const $footer = createAllQuestionsContainerFooter(questionArr[0]);
  $('.all-questions-container').append($footer);
};

const createShareBtnElement = function(para){
  const newUrlBox = $(`<input id='urlBox' value=${para}>`)
  $('#show-url-box').append(newUrlBox);
};




$(() => {
  const pathname = window.location.pathname.split('/')
  const quiz_id = pathname[pathname.length - 1]
  $('#quiz-result-form').attr("action", `/quiz_results/${quiz_id}`)


  const shareUrl = `http://localhost:8080/take_quiz/${quiz_id}`;
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
    url: `http://localhost:8080/api/questions/${quiz_id}`
  })
  .then(data => {
    renderQuestionElement(data.questions);
  })

  $("#submit-quiz").on('click', function(e) {
    // e.preventDefault();
    // window.location.href = 'http://localhost:8080/show_quiz_results/6';
  });



})
