// const db = require('../../db/connection');

$(() => {
  //HIDE QUESTION FOMR AS DEFAULT
  $('#quiz-question-form').hide();

  let quiz_id;

  $('#quiz-info-form').on('submit', function(event) {
    event.preventDefault();

    const $formData = $(this).serialize();


    $.ajax({
      method: 'POST',
      url: '/api/quizzes',
      data: $formData
    }).then((newQuiz) => {
      //QUIZ FORM SLIDEUP AFTER SUBMISSION
      $('#quiz-info-form').slideUp();
      //QUESTIONS CREATION FORM SLIDEDOWN UPON QUIZ FORM SUBMISSION
      $('#quiz-question-form').slideDown();
      console.log(newQuiz)
      quiz_id = newQuiz.id;
    }).catch((err) => {
      console.log(err.message);
    })
  })

  $('#quiz-question-form').submit(function(event) {
    event.preventDefault();

    console.log(quiz_id);
    const $formData = $(this).serialize();

    $.ajax({
      method: 'POST',
      url: `/api/quizzes/${quiz_id}/questions`,
      data: $formData
    }).then((res) => {
      console.log('result from question handler: ', res);
      //CLEAR FORM AFTER EACH QUESTIONS SUBMISSION
      $('.question-form').val('');
      // res.status(200);

    }).catch((err) => {
      console.log(err);
      // res.status(500).send();
    })
  })
});
