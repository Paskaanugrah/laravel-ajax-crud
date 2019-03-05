// This script is to show the modal view
$('body').on('click', '.modal-show', function (event) {
    event.preventDefault();
    // console.log(event);
    var me = $(this),
        url = me.attr('href');
        title = me.attr('title');

    $('#modal-title').text(title);
    $('#modal-btn-save').removeClass('hide').text(me.hasClass('edit') ? 'Update' : 'Create');

    $.ajax({
      url: url,
      dataType: 'html',
      success: function(res) {
          $('#modal-body').html(res);
      }  
    })

    $('#modal').modal('show');
})

// This script is to save the inputed data
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
            $('#modal').modal('hide');
            $('#datatable').DataTable().ajax.reload();

            if (method == 'POST') {
                swal({
                    type: 'success',
                    title: 'Success',
                    text: 'Data has been saved!'
                });
            } else if (method == 'PUT') {
                swal({
                    type: 'success',
                    title: 'Success',
                    text: 'Data has been updated!'
                });
            }
        },
        error: function (xhr) {
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

// This script is to show the delete warning and process the delete function
$('body').on('click', '.btn-delete', function (e) {
    e.preventDefault();

    var me = $(this),
        url = me.attr('href'),
        title = me.attr('title'),
        csrf_token = $('meta[name="csrf-token"]').attr('content');

    swal({
        title : 'Are you sure want to delete ' + title + ' ?',
        text : 'You won\'t be able to revert this!',
        type : 'warning',
        showCancelButton : true,
        confirmButtonColor: 'bluesky',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    '_method': 'DELETE',
                    '_token': csrf_token
                },
                success: function (res) {
                    $('#datatable').DataTable().ajax.reload();
                    swal({
                        type: 'success',
                        title: 'Success!',
                        text: 'Data has been deleted!'
                    });
                },
                error: function (xhr) {
                    swal({
                        type: 'error',
                        title: 'Oops..',
                        text: 'Something went wrong!'
                    });
                }
            });
        }
    });
});

//This script is to show the data on db
$('body').on('click', '.btn-show', function (e) {
    e.preventDefault();

    var me = $(this),
        url = me.attr('href'),
        title = me.attr('title');

    $('#modal-title').text(title);
    $('#modal-btn-save').addClass('hide');

    $.ajax({
        url: url,
        dataType: 'html',
        success: function (res) {
            $('#modal-body').html(res);
        }
    })

    $('#modal').modal('show');
})