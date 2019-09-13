/* global ctx */

var userModule = angular.module("angularAPP", []);
userModule.factory('postService', ['$http', function ($http) {
        return{
            query: function (selecionado, url) {
                var serializedData = $.param(selecionado);
                return $http({
                    method: 'POST',
                    url: url,
                    data: serializedData,
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                });
            }
        };
    }]);
userModule.factory('getService', ['$http', function ($http) {
        return {
            query: function (url) {
                return $http.get(url);
            }
        };
    }]);
userModule.controller("editController", function ($scope, postService) {
    $('#form_edit').removeClass('invisible');
    var user = user_json;
    if (user.birthdate != "") {
        user.birthdate = new Date(user.birthdate + "T00:00:00");
    }
    if (user.company_create_date != "") {
        user.company_create_date = new Date(user.company_create_date + "T00:00:00");
    }
    $scope.user = user;
    if (!user.name && !!user.company_name) {
        $scope.user_type = "juridica";
    }
    ;
    if (!user.company_name && !!user.name) {
        $scope.user_type = "fisica";
    }
    ;
    if (!!user.name && !!user.company_name) {
        $scope.user_type = "ambas";
    }

    $scope.edit_account_submit = function (user) {
        var dados;
        $scope.loading = true;

        if (!!user.name && !user.company_name) {
            var bdate = new Date(user.birthdate).toJSON();
            dados = {"action": 'editUser', "email": user.email, "name": user.name, "phone": user.phone, "cpf": user.cpf, "rg": user.rg, "bdate": bdate, "link_linkedin": user.link_linkedin, "link_twitter": user.link_twitter, "link_facebook": user.link_facebook, "link_curriculo": user.link_curriculo};
        }
        if (!user.name && !!user.company_name) {
            var cCreateDate = new Date(user.company_create_date).toJSON();
            dados = {"action": 'editEmpresa', "email": user.email, "phone_company": user.phone_company, "link_linkedin_company": user.link_linkedin_company, "link_twitter_company": user.link_twitter_company, "link_facebook_company": user.link_facebook_company, "company_name": user.company_name, "cnpj": user.cnpj, "company_create_date": cCreateDate};
        }
        if (!!user.name && !!user.company_name) {
            var bdate = new Date(user.birthdate).toJSON();
            var cCreateDate = new Date(user.company_create_date).toJSON();
            dados = {"action": 'edit_user_and_company', "email": user.email, "phone_company": user.phone_company, "link_linkedin_company": user.link_linkedin_company, "link_twitter_company": user.link_twitter_company, "link_facebook_company": user.link_facebook_company, "company_name": user.company_name, "cnpj": user.cnpj, "company_create_date": cCreateDate, "name": user.name, "phone": user.phone, "cpf": user.cpf, "rg": user.rg, "bdate": bdate, "link_linkedin": user.link_linkedin, "link_twitter": user.link_twitter, "link_facebook": user.link_facebook, "link_curriculo": user.link_curriculo};
        }
        var url = ctx + "/data/portal/users.jsp";
        postService.query(dados, url)
                .then(function (response) {
                    if (response.data.val == 1)
                    {
                        modal_success("Atualizado com sucesso.");
                        $scope.edit_account_form_company.$setPristine();
                        $scope.edit_account_form_company.$setUntouched();
                        $scope.edit_account_form_company.$setSubmitted();
                        

                    } else if (response.data.val == 2)
                    {
                        $("#errorRegister").modal('show');
                    }
                    $scope.loading = false;
                })
                .catch(function (error) {
                    modal_error();
                    $scope.loading = false;
                });

    };

    $scope.phoneInput = function (phone) {
        if (phone.length < 13) {
            $(".phone").css("border-color", "red");
        } else {
            $(".phone").css("border-color", "#66afe9");
        }
    };

    $scope.phone_companyInput = function (phone) {
        if (phone.length < 13) {
            $(".phone_company").css("border-color", "red");
        } else {
            $(".phone_company").css("border-color", "#66afe9");
        }
    };

    $scope.rgInput = function (rg) {
        if (rg.length < 9) {
            $(".rg").css("border-color", "red");
        } else {
            $(".rg").css("border-color", "#66afe9");
        }
    };

    $scope.cpfInput = function (cpf) {
        if (cpf.length < 14) {
            $(".cpf").css("border-color", "red");
        } else {
            $(".cpf").css("border-color", "#66afe9");
            console.log(cpf);
            if (!TestaCPF(cpf)) {
                $(".cpf").css("border-color", "red");
            }
        }
    };

    $scope.cnpjInput = function (cnpj) {
        if (cnpj.length < 18) {
            $(".cnpj").css("border-color", "red");
        } else {
            $(".cnpj").css("border-color", "#66afe9");
            if (!testaCNPJ(cnpj)) {
                $(".cnpj").css("border-color", "red");
            }
        }
    };


    $(".phone").click(function () {
        jQuery("input.phone")
                .mask("(99) 9999-99999")
                .focusout(function (event) {
                    var target, phone, element;
                    target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                    phone = target.value.replace(/\D/g, '');
                    element = $(target);
                    element.unmask();
                    if (phone.length > 10) {
                        element.mask("(99) 99999-9999");
                    } else {
                        element.mask("(99) 9999-9999");
                    }
                });
    });
    $(".phone").select(function () {
        jQuery("input.phone")
                .mask("(99) 9999-99999")
                .focusout(function (event) {
                    var target, phone, element;
                    target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                    phone = target.value.replace(/\D/g, '');
                    element = $(target);
                    element.unmask();
                    if (phone.length > 10) {
                        element.mask("(99) 99999-9999");
                    } else {
                        element.mask("(99) 9999-9999");
                    }
                });
    });

    function TestaCPF(strCPF) {
        var Soma;
        var Resto;
        Soma = 0;
        strCPF = strCPF.replace(".", "").replace(".", "").replace("-", "");
        if (["00000000000", "11111111111", "22222222222", "33333333333", "44444444444", "55555555555", "66666666666", "77777777777", "88888888888", "99999999999"].indexOf(strCPF) >= 0)
            return false;
        for (i = 1; i <= 9; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11))
            Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)))
            return false;
        Soma = 0;
        for (i = 1; i <= 10; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11))
            Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11)))
            return false;
        return true;
    }

    function testaCNPJ(c) {
        var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        if ((c = c.replace(/[^\d]/g, "")).length != 14)
            return false;

        if (/0{14}/.test(c))
            return false;

        for (var i = 0, n = 0; i < 12; n += c[i] * b[++i])
            ;
        if (c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
            return false;

        for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++])
            ;
        if (c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
            return false;

        return true;
    }
});
