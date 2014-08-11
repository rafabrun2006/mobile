/**
 * Created by Bruno on 09/08/14.
 */

App.factory('Fbase', function ($firebase, fbURL) {
    return $firebase(new Firebase(fbURL)).$asArray();
});

App.controller('Main', function ($log, $scope, $location) {

    var session = localStorage.getItem('session');
    $scope.session = angular.fromJson(session);

    if ($scope.session) {

    } else {
        window.location.href = '#cadastro';
    }

});

App.controller('Cadastro', function ($log, $scope, $location, Fbase, fbURL) {

    $scope.Pessoa = {
        email: '',
        senha: ''
    };

    localStorage.setItem('data', $scope.Pessoa);

    $scope.novoRegistro = function () {

        var Fire = new Firebase(fbURL);
        var SimpleLogin = new FirebaseSimpleLogin(Fire, function (error, user) {
        });

        SimpleLogin.createUser($scope.Pessoa.email, $scope.Pessoa.senha, function (error, user) {
            if (error === null) {

                localStorage.setItem('session', JSON.stringify(user));

                alert('Usuario criado com sucesso');
                window.location.href = '#main';
            } else {
                $log.info("Erro ao tentar criar o usuario", error);
            }
        });
    };

    $scope.esqueciMinhaSenha = function () {
        if ($scope.Pessoa.email) {
            alert('Enviamos um email para a sua caixa com informações de como proceder para recuperar sua senha.')
        }
    };

});