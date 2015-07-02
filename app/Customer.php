<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customers';

    protected $fillable = [
        'last_name',
        'first_name',
        'email'
    ];

    public function transactions()
    {
        return $this->hasMany('App\Transaction');
    }
}
