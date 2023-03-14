$(() => {
  const pathname = window.location.pathname.split('/')
  const quiz_id = pathname[pathname.length - 1]

  $.ajax({
    method: 'GET',
    url: `http://localhost:8080/api/questions/${quiz_id}/questions`
  })
  .then(data => {
    console.log(data);
  })
})
