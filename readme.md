## Laravel And Angular

Larave向angular提供api，angular前端路由实现以及想后台交互

<code>api路由如下:</code>

```php
Route::get('/', function () {
    return view('home');
});
Route::group(['prefix' => 'api'], function() {
    Route::resource('customers', 'CustomerController', ['only' => ['index', 'store', 'show', 'destroy']]);
    Route::controller('transactions', 'TransactionCtroller');
});
```
