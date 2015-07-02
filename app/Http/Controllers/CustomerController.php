<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;

use Input;
use Validator;
use Response;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class CustomerController extends Controller
{
    public function index()
    {
        return Customer::all();
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            [
                'first_name' => $request->get('first_name'),
                'last_name' => $request->get('last_name'),
                'email' => $request->get('email'),
            ],
            [
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required|email'
            ]
        );
        if ($validator->fails()) {
            return Response::make('Please check your input.', 400);
        } else {
            $customer = Customer::create($request->all());
            return $customer;
        }
    }

    public function show($id)
    {
        return Customer::find($id);
    }

    public function destroy($id)
    {
        $customer = Customer::find($id);
        $customer->delete();
        return $id;
    }
}
