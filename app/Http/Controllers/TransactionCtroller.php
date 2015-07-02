<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Transaction;
use Illuminate\Http\Request;

use Input;
use Response;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class TransactionCtroller extends Controller
{
    public function getIndex()
    {
        $id = Input::get('id');
        return Customer::findOrFail($id)->transactions;
    }

    public function postIndex(Request $request)
    {
        if ($request->has('name', 'amount')) {
            if ($request->get('name') == '' || $request->get('amount') == '') {
                return Response::make('You need to fill all fields', 400);
            }
            $transaction = new Transaction;
            $transaction->customer_id = $request->get('customer_id');
            $transaction->name = $request->get('name');
            $transaction->amount = $request->get('amount');
            $transaction->save();
            return $transaction;
        } else {
            return Response::make('You need to fill all fields', 400);
        }
    }

    public function deleteIndex($id)
    {
        $transaction = Transaction::find($id);
        $transaction->delete();

        return $id;
    }
}