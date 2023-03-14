const createQuestionElement = function(questionObj) {
  // variables from user object to be used in object
  const name = questionObj.name;
  const category = questionObj.category;
  const description = questionObj.description;
  const numOfQuestions = questionObj.num_of_question;
  const question = questionObj.question;
  const option1 = questionObj.option_1;
  const option2 = questionObj.option_2;
  const option3 = questionObj.option_3;
  const option4 = questionObj.option_4;


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



$(() => {
  const pathname = window.location.pathname.split('/')
  const quiz_id = pathname[pathname.length - 1]

  $.ajax({
    method: 'GET',
    url: `http://localhost:8080/api/questions/${quiz_id}/questions`
  })
  .then(data => {
    console.log(data.questions);
  })
})
