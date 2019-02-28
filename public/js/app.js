$('body').on('click', '.modal-show', function (event) {
    event.preventDefault();

    var me = $(this),
        url = me.attr('href');
        title = me.attr('title');

    $('#modal-title').text(title);
    $('#modal-btn-save').text('Create');

    $.ajax({
      url: url,
      dataType: 'html',
      success: function(res) {
          $('#modal-body').html(res);
      }  
    })

    $('#modal').modal('show');
})