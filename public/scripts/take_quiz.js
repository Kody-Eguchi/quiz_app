const createQuestionElement = function(questionObj) {
  // variables from user object to be used in object
  const name = questionObj.name;
  const category = questionObj.category;
  const numOfQuestions = questionObj.num_of_question;
  const question = questionObj.question;
  const option1 = questionObj.option_1;
  const option2 = questionObj.option_2;
  const option3 = questionObj.option_3;
  const option4 = questionObj.option_4;


  // new question article
  const newArticle = $("<article class='questionDisplay'>");

  // question header elements
  const newHeader = $("<header class='questionHeader'>");
  const newHeaderDiv = $("<div>");
  const newQuestionCategory = $(`<span class='questionCategory'>`).text(`${category}`);
  const newQuestionName = $("<p class='questionName'>").text(`${name}`);

  newHeaderDiv.append(newQuestionName);
  newHeaderDiv.append(newQuestionCategory);
  newHeader.append(newHeaderDiv);

  // question body elements
  // added question description for css
  const newQuestionContainer = $("<div class='question-container'>");
  const newQuestion = $("<p class='new-question'>").text(`${question}`);
  const newAnswerList = $("<ul class='answer-list'>");
  //ANSWER - OPTION1
  const newAnswerOne = $("<li>");
  const newAnswerOneInput = $("<input type='radio' name='answer' id='option-1' class='answer'>");
  const newAnswerOneLabel = $("<label for='option-1'>").text(`${option1}`);
  //ANSWER - OPTION2
  const newAnswerTwo = $("<li>");
  const newAnswerTwoInput = $("<input type='radio' name='answer' id='option-2' class='answer'>");
  const newAnswerTwoLabel = $("<label for='option-2'>").text(`${option2}`);
  //ANSWER - OPTION3
  const newAnswerThree = $("<li>");
  const newAnswerThreeInput = $("<input type='radio' name='answer' id='option-3' class='answer'>");
  const newAnswerThreeLabel = $("<label for='option-3'>").text(`${option3}`);
  //ANSWER - OPTION4
  const newAnswerFour = $("<li>");
  const newAnswerFourInput = $("<input type='radio' name='answer' id='option-4' class='answer'>");
  const newAnswerFourLabel = $("<label for='option-4'>").text(`${option4}`);

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

  // question footer elements
  const newFooter = $("<footer class='questionFooter'>");
  // const newFooterP = $("<p>").text(`${questionDate}`);
  const newFooterDiv = $("<div>");
  // changed it to dynamic
  const newQuestionNumOfQuestions = $("<p class='questionNumOfQuestions'>").text( `Total Questions: ${numOfQuestions}`);
  const newQuestionCreatorName = $("<p class='questionCreatorName'>").text(`Created By: Dave`);
  // const newShareBtnDiv = $("<div><i class='bi bi-share-fill'></i></div>")

  newFooterDiv.append(newQuestionCreatorName);
  newFooterDiv.append(newQuestionNumOfQuestions);
  newFooter.append(newFooterDiv);
  // newFooterDiv.append(newShareBtnDiv);


  // adding new elements to article
  newArticle.append(newHeader);
  newArticle.append(newQuestionContainer);
  newArticle.append(newFooter);

  return newArticle;
};

const renderQuestionElement = function(questionArr) {
  for (const question of questionArr) {
    const $question = createQuestionElement(question);
    $('.all-questions-container').append($question);
  }
}

$(() => {
  const pathname = window.location.pathname.split('/')
  const quiz_id = pathname[pathname.length - 1]

  $.ajax({
    method: 'GET',
    url: `http://localhost:8080/api/questions/${quiz_id}`
  })
  .then(data => {
    console.log(data.questions);
    renderQuestionElement(data.questions);
  })
})
