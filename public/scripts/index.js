const createQuizElement = function(quiz) {
  // variables from user object to be used in object
  const quizId = quiz.id;
  const userId = quiz.creator_id;
  const name = quiz.name;
  const category = quiz.category;
  const description = quiz.description;
  const numOfQuestions = quiz.num_of_question;

  // new quiz article
  const newArticle = $("<article class='quizDisplay'>");

  // quiz header elements
  const newHeader = $("<header class='quizHeader'>");
  const newHeaderDiv = $("<div>");
  const newQuizCategory = $(`<span class='quizCategory'>`).text(`Category: ${category}`);
  const newQuizName = $("<p class='quizName'>").text(`${name}`);

  newHeaderDiv.append(newQuizName);
  newHeaderDiv.append(newQuizCategory);
  newHeader.append(newHeaderDiv);

  // quiz body elements
  // added quiz description for css
  const newQuizDescriptionP = $("<p class='quizDescription'>").text(`${description}`);

  // quiz footer elements
  const newFooter = $("<footer class='quizFooter'>");
  // const newFooterP = $("<p>").text(`${quizDate}`);
  const newFooterDiv = $("<div>");
  // changed it to dynamic
  const newQuizNumOfQuestions = $("<p class='quizNumOfQuestions'>").text( `Total Questions: ${numOfQuestions}`);
  const newQuizCreatorName = $("<p class='quizCreatorName'>").text(`Creator ID: ${userId}`);
  const newShareBtn = $(`<i class="fa-solid fa-share" class="share-btn">`);
  const newUrlBox = $(`<input class='urlBox' value="http://localhost:8080/take_quiz/${quizId}">`);
  const newRedirecBtn = $(`<a href="http://localhost:8080/take_quiz/${quizId}">`);
  const newTakeQuizIcon = $('<i class="fa-solid fa-pencil">');

  newFooterDiv.append(newQuizCreatorName);
  newFooterDiv.append(newQuizNumOfQuestions);
  newRedirecBtn.append(newTakeQuizIcon);
  newFooterDiv.append(newRedirecBtn);
  newFooterDiv.append(newShareBtn);
  newFooter.append(newFooterDiv);
  newFooter.append(newUrlBox);

  newShareBtn.click(function(e){
    newUrlBox.toggle();
  });


  // adding new elements to article
  newArticle.append(newHeader);
  newArticle.append(newQuizDescriptionP);
  newArticle.append(newFooter);

  return newArticle;
};

const appendToBody = function(quizElement) {
  $('.quiz-container').append(quizElement)
};






$(() => {

  $.ajax({
    method: 'GET',
    url: '/api/quizzes'
  })
  .done((response) => {
    console.log(response)
    for (const quiz of response.quizzes) {
      const quizElement = createQuizElement(quiz)
      appendToBody(quizElement);
    }

    $('.urlBox').hide();
  })
});
