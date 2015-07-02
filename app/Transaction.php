<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transactions';

    protected $fillable = [
        'name',
        'amount'
    ];

    public function customer()
    {
        return $this->belongsTo('App\Customer');
    }
}
