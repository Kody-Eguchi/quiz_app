$(() => {

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
})
