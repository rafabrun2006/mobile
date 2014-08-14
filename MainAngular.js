/**
 * Created by Bruno on 09/08/14.
 */

var url = '';

App.factory('Fbase', function ($firebase, fbURL) {
    return $firebase(new Firebase(fbURL)).$asArray();
});

App.factory('FbaseSimpleLogin', function (fbURL) {
    var Fire = new Firebase(fbURL);

    return new FirebaseSimpleLogin(Fire, function (error, user) {
    });
});

App.factory('Pessoa', function () {
    return Pessoa = {
        email: '',
        senha: ''
    };
});

App.controller('Main', function ($log, $scope, $location) {

    if (localStorage.getItem('session')) {
        var session = localStorage.getItem('session');
        $scope.session = angular.fromJson(session);
    }

    if ($scope.session) {
        $log.info('data');
    } else {
        $log.info('usuario nao logado');
        window.location.assign('#login');
    }

    $scope.logout = function () {
        navigator.app.exitApp();
    }

});

App.controller('Cadastro', function ($log, $scope, $location, Fbase, FbaseSimpleLogin, Pessoa) {

    $scope.Pessoa = Pessoa;

    localStorage.setItem('data', $scope.Pessoa);

    $scope.novoRegistro = function () {

        var result = FbaseSimpleLogin.createUser($scope.Pessoa.email, $scope.Pessoa.senha, function (error, user) {
            if (error === null) {

                localStorage.setItem('session', JSON.stringify(user));

                alert('Usuario criado com sucesso');
                window.location.assign('#main');

            } else {
                $log.debug('Conta ja registrada na base de dados');
                switch (result._detail.code) {
                    case 'EMAIL_TAKEN':
                        alert('Esta conta já esta registrada.');
                        break;
                }
            }
        });
    };

    $scope.back = function () {
        $log.info(url);
        window.location.assign(url);
    };

});

App.controller('Login', function ($log, $scope, FbaseSimpleLogin, Pessoa) {

    $scope.Pessoa = Pessoa;

    $scope.login = function () {

        if ($scope.Pessoa.email && $scope.Pessoa.senha) {
            FbaseSimpleLogin.login('password', {
                email: Pessoa.email,
                password: Pessoa.senha,
                rememberMe: true
            }).then(function (response) {

                localStorage.setItem('session', JSON.stringify(response));
                window.location.href = '/';

            }).catch(function (response) {
                alert('Usuário ou Senha incorreto(s)');
            });
        } else {
            alert('Preencha os campos Email e Senha');
        }

    };

    $scope.cadastro = function () {
        url = '#login';
        window.location.assign('#cadastro');
    };

    $scope.esqueciMinhaSenha = function () {
        $log.info('Funcao esqueci minha senha');
        if ($scope.Pessoa.email) {
            alert('Enviamos um email para a sua caixa com informações de como proceder para recuperar sua senha.')
        } else {
            alert('Preencha o email cadastrado em sua conta');
        }
    };

});