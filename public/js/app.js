var app = angular.module('app', ['ngRoute']);

app.config(function configure($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'CustomersCtrl',
            templateUrl: './templates/customers.html'
        })
        .when('/customer/:id', {
            controller: 'CustomerCtrl',
            templateUrl: './templates/customer.html'
        }).
        otherwise({ redirect: '/' });
});

app.factory('Data', function Data($http) {
    return {
        getCustomers: function getCustomers() {
            return $http.get('/api/customers');
        },
        getCustomer: function getCustomer(id) {
            return $http.get('/api/customers/' + id);
        },
        addCustomer: function addCustomer(data) {
            return $http.post('/api/customers', data);
        },
        removeCustomer: function removeCustomer(id) {
            return $http.delete('/api/customers/' +id);
        },
        getTransactions: function getTransactions(id) {
            return $http.get('/api/transactions/index?id=' + id);
        },
        addTransaction: function addTransaction(data) {
            return $http.post('/api/transactions/index', data);
        },
        removeTransaction: function removeTransaction(id) {
            return $http.delete('/api/transactions/index/' + id);
        }
    }
});

app.controller('CustomersCtrl', function($scope, Data) {
    Data.getCustomers().success(function(data) {
        $scope.customers = data;
    });
    $scope.newCustomer = { name: '', email: '' };
    $scope.addCustomer = function addCustomer() {
        var names = $scope.newCustomer.name.split(' ');
        Data.addCustomer({ first_name: names[0], last_name: names[1], email: $scope.newCustomer.email })
            .success(customerAddSuccess)
            .error(customerAddError);
    }
    function customerAddSuccess(data) {
        $scope.error =null;
        $scope.customers.push(data);
        $scope.newCustomer = { name: '', email: '' };
    }
    function customerAddError(data) {
        $scope.error = data;
    }
    $scope.removeCustomer = function removeCustomer(id) {
        if (confirm('Do you really want to remove this customer?')) {
            Data.removeCustomer(id).success(customerRemoveSuccess);
        }
    }
    function customerRemoveSuccess(data) {
        var i = $scope.customers.length;
        while(i--) {
            if ($scope.customers[i].id == data) {
                $scope.customers.splice(i, 1);
            }
        }
    }
});

app.controller('CustomerCtrl', function($scope, $routeParams, Data) {
    Data.getCustomer($routeParams.id).success(function(data) {
        $scope.customer = data;
    });
    Data.getTransactions($routeParams.id).success(function(data) {
        $scope.transactions = data;
        $scope.sum = 0;
        for (var k in data) {
            $scope.sum += parseFloat(data[k].amount);
        }
    });
    $scope.newTransaction = { name: '', amount: 0 };
    $scope.addTransaction = function addTransaction() {
        $scope.newTransaction.customer_id = $scope.customer.id;
        Data.addTransaction($scope.newTransaction)
            .success(transactionAddSuccess)
            .error(transactionAddError);
    };
    function transactionAddSuccess(data) {
        $scope.error = null;
        data.amount = parseFloat(data.amount);
        $scope.transactions.push(data);

        $scope.sum += data.amount;
        $scope.newTransaction = {
            name: '',
            amount: ''
        };
    }
    function transactionAddError(data) {
        $scope.error = data;
    }
    $scope.removeTransaction = function removeTransaction(id) {
        if (confirm('Do you really want to remove transaction?')) {
            Data.removeTransaction(id).success(transactionRemoveSuccess);
        }
    }
    function transactionRemoveSuccess(data) {
        var i = $scope.transactions.length;
        while(i--) {
            if($scope.transactions[i].id == data) {
                $scope.sum -= $scope.transactions[i].amount;
                $scope.transactions.splice(i, 1);
            }
        }
    }
});


