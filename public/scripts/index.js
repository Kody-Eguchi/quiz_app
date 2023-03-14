const createQuizElement = function(quiz) {
  // variables from user object to be used in object
  const name = quiz.name;
  const category = quiz.category;
  const description = quiz.description;
  const numOfQuestions = quiz.num_of_question;

  // new quiz article
  const newArticle = $("<article class='quizDisplay'>");

  // quiz header elements
  const newHeader = $("<header class='quizHeader'>");
  const newHeaderDiv = $("<div>");
  const newQuizCategory = $(`<span class='quizCategory'>`).text(`${category}`);
  const newQuizName = $("<p class='quizName'>").text(`${name}`);

  newHeaderDiv.append(newQuizName);
  newHeaderDiv.append(newQuizCategory);
  newHeader.append(newHeaderDiv);

  // quiz body elements
  // added quiz description for css
  const newQuizDescriptionP = $("<p class='quizDescription'>").text(`${description}`);

  // quiz footer elements
  const newFooter = $("<footer class='QuizFooter'>");
  // const newFooterP = $("<p>").text(`${quizDate}`);
  const newFooterDiv = $("<div>");
  // changed it to dynamic 
  const newQuizNumOfQuestions = $("<p class='quizNumOfQuestions'>").text( `Total Questions: ${numOfQuestions}`);
  const newQuizCreatorName = $("<p class='quizCreatorName'>").text(`Created By: Dave`);
  const newShareBtnDiv = $("<div><i class='bi bi-share-fill'></i></div>")

  newFooterDiv.append(newQuizCreatorName);
  newFooterDiv.append(newQuizNumOfQuestions);
  newFooter.append(newFooterDiv);
  newFooterDiv.append(newShareBtnDiv);


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
  console.log('test')
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
  })
});
