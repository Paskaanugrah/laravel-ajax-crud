$("#datatable").DataTable({
    responsive : true,
    processing : true,
    serverSide : true,
    ajax : "/table/user",
    columns : [
        {data: 'DT_RowIndex', name: 'id'},
        {data: 'name', name: 'name'},
        {data: 'email', name: 'email'},
        {data: 'action', name: 'action'}
    ]
});