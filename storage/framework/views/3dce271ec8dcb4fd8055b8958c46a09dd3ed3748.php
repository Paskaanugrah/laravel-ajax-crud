<?php echo Form::model($user, [
    'route' => 'user.store',
    'method' => 'POST'
]); ?>

    <div class="form-group">
        <label for="" class="control-label">Name</label>
        <?php echo Form::text('name', null, ['class' => 'form-control', 'id' => 'name']); ?>

    </div>

    <div class="form-group">
        <label for="" class="control-label">Email</label>
        <?php echo Form::email('email', null, ['class' => 'form-control', 'id' => 'email']); ?>

    </div>
<?php echo Form::close(); ?>