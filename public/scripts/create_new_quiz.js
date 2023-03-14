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
      quiz_id = newQuiz.id;
    }).catch((err) => {
      res.status(500).send(err);
    })
  })

  $('#quiz-question-form').submit(function(event) {
    event.preventDefault();

    const $formData = $(this).serialize();

    $.ajax({
      method: 'POST',
      url: `/api/quizzes/${quiz_id}`,
      data: $formData
    }).then((res) => {
      //CLEAR FORM AFTER EACH QUESTIONS SUBMISSION
      $('.question-form').val('');
      // res.status(200);

    }).catch((err) => {
      res.status(500).send(err);
      // res.status(500).send();
    })
  })
});
