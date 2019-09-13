var portalModule = angular.module("ngApp", ["angularUtils.directives.dirPagination"]);
//Variáveis Globais;

var ctx_path;
var eventsCard_backup;
var latitude = "";
var longitude = "";
var cards_total = 0;
var logged;

portalModule.factory('postService', ['$http', function ($http) {
        return {
            query: function (selecionado, url) {
                var serializedData = $.param(selecionado);
                return  $http({
                    method: 'POST',
                    url: url,
                    data: serializedData,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }});
            }
        };
    }]);


portalModule.factory('getService', ['$http', function ($http) {
        return {
            query: function (url) {
                return $http.get(url);
            }
        };
    }]);

portalModule.controller('controllerSchedule', function ($scope, $http, $timeout) {
//    declaração de variáveis locais.
    var eventsCard = [];
    var moreCardsToAdd = [];
    $scope.loadingCaroussel = true;
    $scope.searchEvent = "";
    $scope.queryBy = "";
    $scope.callBack = function () {
        getEventsCard();
    };

    var offset = 0;
    $scope.geo = true;
    var count = 0;
    $scope.searchKeyPress = function (keyEvent) {
        if (!!$scope.search && keyEvent.which == 13) {
            getEventsCard();
        }
        ;
    };
    //Chamar função dos cards.
    getEventsCard();

    // PEGAR EVENTOS PRÓXIMOS com a localização lat e long
    $scope.getLocation = function () {
        $('#section_cards').addClass('invisible');
        $scope.loadingCaroussel = true;
        if (count === 0) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                modal_error("Falha ao tentar pegar a localização.");
                $scope.loadingCaroussel = false;
            }
        } else {
            showPosition(null);
        }

    };
    //Pega os cards anterior a pesquisa via lat e long. Sem fazer mais uma requisição.
    $scope.getPreviousCards = function () {
        $('#section_cards').addClass('invisible');
        $scope.loadingCaroussel = true;
        $scope.geo = true;
        getCards(eventsCard_backup, false);
        $scope.loadingCaroussel = false;
    };
    function showPosition(position) {
        if (count === 0) {
            //adiciona as variáveis globais os valores e cria um backup com os cards antigos e chama os com localização.
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.eventsCard_backup = eventsCard;
            getEventsCard();
            $scope.geo = false;
            count++;
        } else {
            getCards(eventsCard, false);
            $scope.loadingCaroussel = false;
            $scope.geo = false;
        }
    }

    function showError(error) {
        var error_msg;
        switch (error.code) {
            case error.PERMISSION_DENIED:
                error_msg = "Você não aceitou compartilhar sua localização."
                break;
            case error.POSITION_UNAVAILABLE:
                error_msg = "Sua localização não está disponível."
                break;
            case error.TIMEOUT:
                error_msg = "Houve muita demora para pegar sua localização."
                break;
            case error.UNKNOWN_ERROR:
                error_msg = "Um erro desconhecido ocorreu."
                break;
        }
        modal_error(error_msg);
        $scope.loadingCaroussel = false;
    }
    // PEGAR EVENTOS PRÓXIMOS FIM;
    function moreEventsCard() {
        offset = offset + 10;
        $http.get(ctx_path + "/data/schedule/anybody.jsp?action=getEventsCard&latitude=" + this.latitude + "&longitude=" + this.longitude + "&search=" + $scope.searchEvent + "&queryBy=" + $scope.queryBy + "&offset=" + offset)
                .then((response) => {
                    $scope.error = null;
                    moreCardsToAdd = response.data.EventsCard;
                    this.eventsCard_backup = eventsCard.concat(moreCardsToAdd);
                    $scope.error = response.data.aux;
                    //TRUE pois é pra add cards e não recriar o carrousel
                    getCards(moreCardsToAdd, true);

                }).catch(function (response) {
            modal_error();
            $scope.loadingCaroussel = false;
        });
    }
    ;

    function getEventsCard() {
        $scope.loadingCaroussel = true;
        $scope.error = null;
        var url = ctx_path + "/data/schedule/anybody.jsp?action=getEventsCard&latitude=" + this.latitude + "&longitude=" + this.longitude + "&search=" + $scope.searchEvent + "&queryBy=" + $scope.queryBy;
        $http.get(url)
                .then((response) => {
                    eventsCard = null;
                    eventsCard = response.data.EventsCard;
                    $scope.error = response.data.aux;
                    $('#btn-geo').removeClass('hidden');
                    if (!eventsCard) {
                        offset = 0;
                        $('.btn-carousel').css('display', 'none');
                    } else {
                        getCards(eventsCard, false);
                    }
                    $scope.loadingCaroussel = false;
                }).catch(function (error) {
            modal_error();
        });
    }
    ;

    if ($scope.loadingCaroussel === true) {
        $('#btn-carousel-left').hide();
        $('#btn-carousel-right').hide();
    } else {
        $('#btn-carousel-left').show();
        $('#btn-carousel-right').show();
    }

    if (document.getElementById('btn-carousel-left').hasAttribute('disabled')) {

        $('#btn-carousel-left').css('color', '#d3dde5');
    }

    $scope.nextItem = function () {
        $('.owl-carousel').trigger('next.owl.carousel', [300]);
        $('#btn-carousel-left').css('color', '#647584').prop("disabled", false);
        if ($('.owl-stage').children().last().hasClass('active')) {

            if (cards_total - 10 > offset) {
                moreEventsCard();
            } else {
                $('#btn-carousel-right').css('color', '#d3dde5').prop("disabled", true);
            }
        }
    };

    $scope.prevItem = function () {
        $('.owl-carousel').trigger('prev.owl.carousel', [300]);
        $('#btn-carousel-right').css('color', '#647584').removeAttr('disabled');

        if ($('.owl-stage').children().first().hasClass('active')) {

            $('#btn-carousel-left').css('color', '#d3dde5').attr('disabled', 'true');

        }
    };

    $('.owl-carousel').on("dragged.owl.carousel", function () {
        $('#btn-carousel-left').css('color', '#647584').removeAttr('disabled');
        if ($('.owl-stage').children().first().hasClass('active')) {

            $('#btn-carousel-right').css('color', '#647584').removeAttr('disabled');
            $('#btn-carousel-left').css('color', '#d3dde5').attr('disabled', 'true');
        }

        if ($('.owl-stage').children().last().hasClass('active')) {

            if (cards_total - 10 > offset) {
                moreEventsCard();
            } else {
                $('#btn-carousel-right').css('color', '#d3dde5').attr('disabled', 'true');
            }

        }
    });
});

portalModule.controller('controllerSearch', function ($scope, $http, postService, $rootScope) {

    $scope.showFilter = $('#selectTypeSearch').change(function () {
        if ($('#selectTypeSearch').val() === '1') {
            $('.filter-teacher').fadeOut(200);
        } else {
            $('.filter-teacher').fadeIn(200);
        }
    });


});

portalModule.controller('controllerRegister', function ($scope, postService) {
    $scope.register = {
        p: 'pf'
    };
    var action = '';
    var dados;
    $scope.addUser = (data) => {
        if (data.p == 'pj') {
            action = "registerPj";
            dados = {action: action, email: data.email, name: data.name, phone: data.phone, pass: data.pass, rg: data.rg, cpf: data.cpf, cnpj: data.cnpj, razao: data.razao, empresa: data.empresa, cpass: data.cpass};
        } else {
            action = "registerPf";
            dados = {action: action, email: data.email, name: data.name, phone: data.phone, pass: data.pass, bdate: data.bdate, rg: data.rg, cpf: data.cpf, cpass: data.cpass};
        }
        var url = ctx_path + "/data/portal/users.jsp";
        postService.query(dados, url).then(function (re) {
           modal_success('O usuário ' + data.name + ' foi cadastrado.');            
        }).catch(function () {
            modal_error("Falha cadastrar usuário, tente novamente.");
        });
    };

});

///Função para transformar o array em card
function getCards(array, cardAdd) {
    var eventTheme = "", unitName = "", msgUnits = "", i = 0, btnCartao = "", eventListed = null;
    var eventId = [];

    if (!cardAdd) {
        $('.owl-carousel').empty();
    }

    array.forEach(function (item) {
        eventListed = false;
        for (i = 0; i < eventId.length; i++) {
            if (item.event_id === eventId[i]) {
                eventListed = true;
            }
        }
        if (eventListed === false) {

            if (item.event_theme.length > 20) {
                eventTheme = item.event_theme.substring(0, 20) + ' ...';
            } else {
                eventTheme = item.event_theme.substring(0, 20);
            }

            if (item.units_count > 1) {
                msgUnits = item.units_count + ' unidades';
            } else {
                if (item.unit_name.length > 25) {
                    unitName = item.unit_name.substring(0, 25) + ' ...';
                } else {
                    unitName = item.unit_name.substring(0, 25);
                }
                msgUnits = unitName;
            }

            if (item.inscriptions_closed) {
                btnCartao = '<button id="btn-blocked" style="cursor:pointer">ENCERRADO</button>';
            } else if (item.units_full) {
                btnCartao = '<button id="btn-blocked" style="cursor:pointer">LOTADO</button>';
            } else {
                btnCartao = '<button id="btn-cartao" style="cursor:pointer">+ DETALHES</button>';
            }


            if (item.tech_area_name.length > 18) {
                item.tech_area_name = item.tech_area_name.substring(0, 20) + '...';
            } else {
                item.tech_area_name = item.tech_area_name.substring(0, 20);
            }

            if (item.manager_name.length > 18) {
                item.manager_name = item.manager_name.substring(0, 20) + '...';
            } else {
                item.manager_name = item.manager_name.substring(0, 20);
            }
            this.cards_total = item.size;

            if (cardAdd) {

                $('.owl-carousel').owlCarousel('add', `                         
                            <div class="item owl-theme cartaowl">
                            <a href="event-schedule.jsp?event=` + item.event_id + ` ">
                                <div class="cartao">
                                    <div class="cartao-img">
                                       <img src="ByteArray?aba=agenda&thumb=true&id=` + item.event_id + `" alt="Banner Evento"></img>
                                 </div>
                                    <div class="cartao-title">
                                        <span title="` + item.event_theme + `" id="event-theme" >` + eventTheme + `</span>
                                    </div>
                                    <ul  class="cartao-desc">
                                        <li class="text-"><span id="cartao-icon" class="glyphicon glyphicon-user" aria-hidden="true"></span><span class="text-capitalize">` + item.manager_name.toLowerCase() + `</span></li>
                                        <li><span id="cartao-icon" class="glyphicon glyphicon-cog" aria-hidden="true"></span><span class="text-capitalize">` + item.tech_area_name.toLowerCase() + `</span></li>
                                        <li title="` + item.unit_name + `"><span id="cartao-icon" class="glyphicon glyphicon-home" aria-hidden="true"></span>` + msgUnits + `</li>
                                  </ul>
                                    <div class="cartao-btn">
                                        ` + btnCartao + `
                                    </div>
                                
                                </div>
                                </a>
                            </div>`);
            } else {
                $('.owl-carousel').append(`                         
                            <div class="item owl-theme cartaowl">
                <a href="event-schedule.jsp?event=` + item.event_id + ` ">
                                <div class="cartao">
                                    <div class="cartao-img">
                                       <img src="ByteArray?aba=agenda&thumb=true&id=` + item.event_id + `" alt="Banner Evento"></img>
                                    </div>
                                    <div class="cartao-title">
                                        <span title="` + item.event_theme + `" id="event-theme">` + eventTheme + `</span>
                                    </div>
                                    <ul  class="cartao-desc">
                                        <li><span id="cartao-icon" class="glyphicon glyphicon-user" aria-hidden="true"></span><span class="text-capitalize"> ` + item.manager_name.toLowerCase() + `</span></li>
                                        <li><span id="cartao-icon" class="glyphicon glyphicon-cog" aria-hidden="true"></span><span class="text-capitalize"> ` + item.tech_area_name.toLowerCase() + `</span></li>
                                        <li title="` + item.unit_name + `"><span id="cartao-icon" class="glyphicon glyphicon-home" aria-hidden="true"></span> ` + msgUnits + `</li>
                                    </ul>
                                    <div class="cartao-btn">
                                        ` + btnCartao + `
                                    </div>
                                </div>
                    </a>

                            </div>`);

            }
            eventId.push(item.event_id);
        }
    });

    if (cardAdd) {

        $('.owl-carousel').trigger('refresh.owl.carousel');
    } else {
        $(function () {
            $('.owl-carousel').trigger('refresh.owl.carousel');
            $('.owl-carousel').data('owl.carousel').initialize();
        });
        $('#btn-carousel-left').css('color', '#d3dde5').attr('disabled', 'true').css('display', 'inline-block');
        $('#btn-carousel-right').css('color', '#647584').removeAttr('disabled').css('display', 'inline-block');
        if ($('.owl-stage').children().last().hasClass('active')) {
            $('#btn-carousel-right').css('color', '#d3dde5').attr('disabled', 'true');

        }
        if ($('.owl-stage').children().first().hasClass('active')) {
            $('#btn-carousel-left').css('color', '#d3dde5').attr('disabled', 'true');

        }
        $('#section_cards').removeClass('invisible');
    }
}

portalModule.controller('controllerProblem', function ($scope, $http, $timeout, postService, $window) {
    $scope.link_input = false;
    $scope.archive_input = false;
    $scope.problem;
    $scope.loading = false;

    $scope.change_link = function () {
        $scope.link_input = !$scope.link_input;
        delete $scope.problem.links;
    };

    $scope.change_archive = function () {
        $scope.archive_input = !$scope.archive_input;
        $scope.problem.archives = null;
    };
    $scope.emptyFields = function () {
        $("#titulo-tema").val('');
        $("#desc-tema").val('');
    };
    $scope.sendProblemERROR = function () {
        $("#infoModal").show();
        $("#infoSuport").empty();
        $("#eInfoButton").removeClass('invisible');
        $("#eInfoMessage").empty();
        $("#eInfoMessage").append("Cadastre a sua empresa para realizar esta ação.");
    };
    $scope.sendProblem = function (problem) {
        ctx_path = $window.ctx_path;
        var data = "";
        var url = "";
        $scope.loading = true;
        data = {"action": 'addProblem', "problem_title": problem.title, "problem_desc": problem.desc};
        url = ctx_path + "/data/open-projects/company-problems.jsp";
        postService.query(data, url).then(function (re) {
            if (!re.data.aux) {
                //Em caso de Sucesso
                modal_success();
                delete $scope.problem;
            } else {
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                modal_error();
            }
            $scope.loading = false;
        }).catch(function () {
            $scope.loading = false;
            //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
            modal_error();
        });

    };
});

portalModule.controller('controllerEnterprise', function ($scope, $http, $timeout, $window, getService) {
    var lastPage = 1;
    $scope.qtdPage = 10;
    $scope.total = 0;
    var by = 'ASC';
    $(document).ready(function () {
        $scope.getProblems(1);
    });
    $scope.getProblems = function (pageNumber, orderBy) {
        $(".loader3").css('display', 'block');
        $("#table-problem").hide();
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.total < $scope.problemListSize)) {
            $scope.total = (parseInt($scope.total) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $scope.problemList = "";
        $scope.problemListSize = "";
        $scope.problemListError = "";
        ctx_path = $window.ctx_path;
        if (orderBy !== 'name' && orderBy !== 'agent_confirmation') { //Se orderBy for vazio, fica = name
            orderBy = 'name';
        }
        var url = ctx_path + "/data/open-projects/company-problems.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&action=getEnterpriseProblems" + "&queryBy=" + orderBy + "&by=" + by;
        getService.query(url).then(function (response) {
            if (response.data.problemList[0].aux === "1") {
                $scope.problemList = response.data.problemList;
                $scope.problemListSize = response.data.problemList[0].size;
                $("#table-problem").show();
                $(".loader3").css('display', 'none');
            } else if (response.data.problemList[0].aux === "2") {
                $(".loader3").css('display', 'none');
                $("#no-project").css('display', 'block');
            } else if (response.data.problemList[0].aux === "3") {
                $("#no-project").css('display', 'block');
                $(".loader3").css('display', 'none');
            } else {
                $(".loader3").css('display', 'none');
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                modal_error();
            }
        }).catch(() => {
            $(".loader3").css('display', 'none');
            //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
            modal_error();
        });
    };
    $scope.selectQtd = function (qtd) {
        $scope.qtdPage = qtd;
        getProblems(lastPage);
        $scope.pagination.current = 1;
    };
    $scope.pagination = {
        current: 1
    };
    $scope.pageChanged = function (newPage) {
        $scope.getProblems(newPage);
    };
    $scope.sortTable = function (field) {
        $scope.pagination.current = 1;
        if (by === 'ASC') { //Mexe as setas e inverte o ASC/DESC do ORDER BY.
            by = 'DESC';
            if (field === 'theme') {
                $scope.getProblems(1, 'name');
                $(".theme-arrow").removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-top");
            } else {
                $scope.getProblems(1, 'agent_confirmation');
                $(".status-arrow").removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-top");
            }
        } else {
            by = 'ASC';
            if (field === 'theme') {
                $scope.getProblems(1, 'name');
                $(".theme-arrow").removeClass("glyphicon-triangle-top").addClass("glyphicon-triangle-bottom");
            } else {
                $scope.getProblems(1, 'agent_confirmation');
                $(".status-arrow").removeClass("glyphicon-triangle-top").addClass("glyphicon-triangle-bottom");
            }
        }
    };

    $scope.showDescription = function (problem) {
        $("#modal-problemTitle").empty();
        $("#modal-problemSendDate").empty();
        $("#modal-problemDescription").empty();
        $("#modal-problemStatus").empty();
        $("#modal-problemTitle").append("<b>Nome:</b> " + problem.name);
        if (problem.agent_confirmation === "true") {
            status = 'aceito';
        } else if (problem.agent_confirmation === "false") {
            status = 'negado';
        } else {
            status = 'em avaliação';
        }
        date = problem.creation_date.split("/");
        date[2] = date[2].split(" ", 2);
        problem.creation_date = date[2][0] + "/" + date[1] + "/" + date[0];

        $("#modal-problemDescription").append("<b>Descrição:</b> " + problem.description);
        $("#modal-problemSendDate").append("<b>Data de envio:</b> " + problem.creation_date + " às " + date[2][1]);
        $("#modal-problemStatus").append("<b>Status:</b> " + status);
        $("#showDescription").show();
    };
});

function getBaseUrl() {
    var re = new RegExp(/^.*\//);
    return re.exec(window.location.href);
}

    