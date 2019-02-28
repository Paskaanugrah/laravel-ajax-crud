$('body').on('click', '.modal-show', function (event) {
    event.preventDefault();
    console.log(event);
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

$('#modal-btn-save').click( function (event) {
    event.preventDefault();

    var form = $('#modal-body form'),
        url = form.attr('action'),
        method = $('input[name=_method]').val() == undefined ? 'POST' : 'PUT';
        $('.help-block').remove();
        $('.form-group').removeClass('has-error');
        
        $.ajax({
            url: url,
            method: method,
            data: form.serialize(),
            success: function(res) {
                form.trigger('reset');
                $('modal').modal('hide');
                $('#datatable').DataTable().ajax.reload();

                swal({
                    type: 'success',
                    title: 'Success',
                    text: 'Data has been saved!'
                });
            },
            error: function (xhr) {res
                var res = xhr.responseJSON;
                if ($.isEmptyObject(res) == false) {
                    $.each(res.errors, function (key,value) {
                        $('#' + key)
                         .closest('.form-group')
                         .addClass('has-error')
                         .append('<span class="help-block"><strong>' + value + '</strong></span>')
                    })
                }
            }
        })
})