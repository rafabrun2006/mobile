/**
 * Created by Bruno on 09/08/14.
 */

var url = '';

App.factory('Fbase', function ($firebase, fbURL) {
    return $firebase(new Firebase(fbURL)).$asArray();
});

App.controller('Main', function ($log, $scope, $location) {

    if (localStorage.getItem('session')) {
        var session = localStorage.getItem('session');
        $scope.session = angular.fromJson(session);
    }

    if ($scope.session) {
        $log.info('data');
    } else {
        window.location.assign('#login');
    }

});

App.controller('Cadastro', function ($log, $scope, $location, Fbase, fbURL) {

    $scope.Pessoa = {
        email: 'rafaelbruno@gmail.com',
        senha: 'ranelore'
    };

    localStorage.setItem('data', $scope.Pessoa);

    $scope.novoRegistro = function () {

        var Fire = new Firebase(fbURL);
        var SimpleLogin = new FirebaseSimpleLogin(Fire, function (error, user){});

        SimpleLogin.createUser($scope.Pessoa.email, $scope.Pessoa.senha, function (error, user) {
            if (error === null) {

                localStorage.setItem('session', JSON.stringify(user));

                alert('Usuario criado com sucesso');
                window.location.assign('#main');

            } else {
                $log.info(error.error.code);
                switch (error.error.code) {
                    case 'EMAIL_TAKEN':
                        alert('Este registro já se encontra em nossa base de dados');
                        break;
                }
            }
        });
    };

    $scope.esqueciMinhaSenha = function () {
        if ($scope.Pessoa.email) {
            alert('Enviamos um email para a sua caixa com informações de como proceder para recuperar sua senha.')
        }
    };

    $scope.back = function(){
        $log.info('#' + url);
        window.location.assign('#' + url);
    };

});

App.controller('Login', function($log, $scope, fbURL){
    $scope.cadastro = function(){
        url = window.location.hash;
        window.location.assign('#cadastro');
    }
});