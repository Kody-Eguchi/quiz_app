// Client facing scripts here
$(() => {


  $(() => {


    $('#signup-form').submit(function(e){
      const $formData = $(this).serialize();
      $.ajax({
        method: 'POST',
        url: '/users',
        data: $formData
      })
    })


  });



});
