{!! Form::model($user, [
    'route' => $user->exists ? ['user.update', $user->id] : 'user.store',
    'method' => $user->exists ? 'PUT' : 'POST'
]) !!}
    <div class="form-group">
        <label for="" class="control-label">Name</label>
        {!! Form::text('name', null, ['class' => 'form-control', 'id' => 'name']) !!}
    </div>

    <div class="form-group">
        <label for="" class="control-label">Email</label>
        {!! Form::email('email', null, ['class' => 'form-control', 'id' => 'email']) !!}
    </div>
{!! Form::close() !!}