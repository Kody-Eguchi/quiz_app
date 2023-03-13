// const db = require('../../db/connection');

$(() => {

  let quiz_id;

  $('#quiz-info-form').on('submit', function(event) {
    event.preventDefault();

    const $formData = $(this).serialize();


    $.ajax({
      method: 'POST',
      url: '/api/quizzes',
      data: $formData
    }).then((newQuiz) => {
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
    }).catch((err) => {
      console.log(err.message);
    })
  })
});
