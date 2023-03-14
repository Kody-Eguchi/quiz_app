$(() => {

  $('#login-form').on('submit', function(event) {
    event.preventDefault();

    const $formData = $(this).serialize();

    $.ajax({
      method: 'POST',
      url: '/login',
      data: $formData
    }).catch((err) => {
      res.status(500).send(err);
    })
  })
})
