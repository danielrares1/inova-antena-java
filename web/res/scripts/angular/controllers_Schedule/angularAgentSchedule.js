var Agentmodule = angular.module("Agentmodule", ["angularUtils.directives.dirPagination"]);

Agentmodule.run(['$rootScope', '$window', function ($rootScope, $window) {

        $rootScope.ctx_path = $window.ctx_path;
    }]);

Agentmodule.factory('postService', ['$http', function ($http) {
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
Agentmodule.factory('getService', ['$http', function ($http) {
        return {
            query: function (url) {
                return $http.get(url);
            }
        };
    }]);

Agentmodule.controller('controllerAgentEvent', function ($scope, $http, $compile, $rootScope, postService) {
    $scope.units = [];
    $rootScope.btn = true;

    $scope.getProjetos = function () {
        alert('sada');
        $('#itemContent_loader').addClass('hidden');
        $('#itemContent_section').removeClass('hidden');
    };
    onStart();
    //Ao iniciar.
    function onStart() {
        setTimeout(function () {
            $('#itemContent_loader').addClass('hidden');
            $('#itemContent_section').removeClass('hidden');
//            $('#item_evaluations').removeClass('hidden');
        }, 1000);
    }
    $scope.openEvent = function (sAgentEvent, from) {
        btn = true;
        delete $scope.units;
        $scope.units = [];
        $('#back-event').attr('href', '#' + from);
        //BACK UP DO OBJETO
        $scope.BackUp = angular.copy(sAgentEvent);
        $scope.selectAgentEvent = $scope.BackUp;
        ///RECEBE RESOURCES EM JSON E ADICIONA AO SCOPE
//        if (!!$scope.selectAgentEvent.resources) {
//            $scope.selectAgentEvent.resources = JSON.parse(sAgentEvent.resources);
//        } else {
        $scope.selectAgentEvent.resources = {"projector": false, "acoustic": false, "computer": false, "chair": false, "table": false, "other": false, "other_text": ""};
//        }        

        var value = $scope.selectAgentEvent.unit.name;
        var count = 0;
        angular.forEach(value, function (item) {
            //Coloca as unidades em um array.            
            $scope.units.push({'name': item, 'data': $scope.selectAgentEvent.unit.data[count], 'hours': $scope.selectAgentEvent.unit.hours[count++]});
        });



//        alert( $scope.selectevent.name);            
    };
    $scope.acceptEvent = function () {
        var tech_id = $scope.selectAgentEvent.tech_area.id;
        var id = $scope.selectAgentEvent.id;
        var emailManager = $scope.selectAgentEvent.manager_id.email;
        var event_theme = $scope.selectAgentEvent.theme;
        $scope.loadingAccept = true;
        var dados = {action: "acceptAgentEvents", id: id, emailManager: emailManager, event_theme: event_theme, tech_id: tech_id};
        var url = $rootScope.ctx_path + "/data/schedule/agent.jsp";
        postService.query(dados, url).then(function (re) {
            $scope.loading = false;
            $("#success-accept-event").modal('show');
        }).catch(function () {
            $scope.loading = false;
            //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
               modal_error();
        });
    };
    $scope.reload = function () {
        window.scrollTo(0, 0);
        location.reload();
    };
    $scope.recuseEvent = function () {
        $scope.justification = "";
        $("#refuse-event").modal('show');
    };
    $scope.sendJus = function () {
        var id = $scope.selectAgentEvent.id;
        var emailManager = $scope.selectAgentEvent.manager_id.email;
        var justification = $scope.justification;
        var event_theme = $scope.selectAgentEvent.theme;
        $("#loader").css("display", "block");
        var dados = {action: "recuseAgentEvents", id: id, justification: justification, emailManager: emailManager, event_theme: event_theme};
        var url = $rootScope.ctx_path + "/data/schedule/agent.jsp";
        postService.query(dados, url).then(function (re) {
            $("#refuse-event").modal('hide');
            $("#loader").css("display", "none");
            $("#success-accept-event").modal('show');

        }).catch(function () {
            $("#refuse-event").modal('hide');
            $("#loader").css("display", "none");
            //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
               modal_error();

        });
    };
    $scope.disableEvent = function () {
        $scope.justificationD = "";
        $("#disable-eventA").modal("show");
    };
    $scope.sendJusD = function () {
        var id = $scope.selectAgentEvent.id;
        var emailManager = $scope.selectAgentEvent.manager_id.email;
        var justification = $scope.justificationD;
        var event_theme = $scope.selectAgentEvent.theme;
        $("#loader").css("display", "block");
        var dados = {action: "disableAgentEvents", id: id, justification: justification, emailManager: emailManager, event_theme: event_theme};
        var url = $rootScope.ctx_path + "/data/schedule/agent.jsp";
        postService.query(dados, url).then(function (re) {
            $("#disable-eventA").modal("hide");
            $("#loader").css("display", "none");
            $("#success-accept-event").modal('show');
        }).catch(function () {
            $("#disable-eventA").modal("hide");
            $("#loader").css("display", "none");
            //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
               modal_error();
        });

    };
    $scope.changeTech = function () {
        var tech_id = $scope.selectAgentEvent.tech_area.id;
        var id = $scope.selectAgentEvent.id;
        var emailManager = $scope.selectAgentEvent.manager_id.email;
        var event_theme = $scope.selectAgentEvent.theme;
        var dados = {action: "changeTech", id: id, tech_id: tech_id, emailManager: emailManager, event_theme: event_theme};
        $("#loader").css("display", "block");
        var url = $rootScope.ctx_path + "/data/schedule/agent.jsp";
        postService.query(dados, url).then(function (re) {
            $("#content-modal center").empty();
            $("#tittle-modal h4").empty();
            $("#content-modal center").append('O Eixo Tecnológico do evento foi alterado com sucesso');
            $("#tittle-modal h4").append('Sucesso');
            $("#loader").css("display", "none");
            $("#modalGeral").modal("show");
        }).catch(function () {
            $("#content-modal center").empty();
            $("#tittle-modal h4").empty();
            $("#content-modal center").append('ERRO na alteração do Eixo Tecnológico  do evento');
            $("#tittle-modal h4").append('ERRO');
            $("#loader").css("display", "none");
            $("#modalGeral").modal("show");
        });
    };
    $http.get($rootScope.ctx_path + "/data/select-dropdown.jsp?action=areaTech")
            .then(function (response) {
                $scope.areaArray = [];
                $scope.areaArray = response.data.areaArray;
            });
    $rootScope.att = function () {
        $scope.editEventForm.$setPristine();
        $rootScope.getEvents();
        $rootScope.btn = true;
    };
});
//Controler que lista os eventos que precisam de validação;
Agentmodule.controller('controllerListEventAgent', function ($scope, $rootScope, getService) {
    var url = window.location.search.replace("?", "");
    var items = url.split("&");
    var array = {
        'id': items[0]
    };
    var id = array.id;
    //Criação de variáveis para ordenar as tabelas
    $scope.x = 'event';
    $scope.myOrderBy = false;
    //Função Angular que ordena a tabela.
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.users = [];
    $scope.totalEvents = 0;
    $scope.qtdPage = 20;
    $scope.searchEvents = "";
    $scope.queryBy = "";
    $scope.agentEvents = [];
    var lastPage = 1;
    //Função Angular que mostra a quantidade selecionada
    $scope.selectQtd = function (qtd) {
        $scope.qtdPage = qtd;
        getAgentEvents(1);
        $scope.pagination.current = 1;
    };

    //pagination pertencente ao dir pagination, mudar de páginas.
    $scope.pagination = {
        current: 1
    };
    //Função para o dir-paginate quando muda a página, chama a nova página.
    $scope.pageChanged = function (newPage) {
        getAgentEvents(newPage);
    };
    //Função para chamar a tabela novamente.
    $scope.callBack = function () {
        getAgentEvents(1);
    };

    $rootScope.getEvents = function () {
        getAgentEvents(1);
    };

    getAgentEvents(1);
    function getAgentEvents(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalEvents < $scope.eventsSize)) {
            $scope.totalEvents = (parseInt($scope.totalEvents) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;

        $scope.isLoading = true;
        var url = $rootScope.ctx_path + "/data/schedule/agent.jsp?action=getAgentEvents&limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchEvents;
        getService.query(url).then((response) => {
            $scope.isLoading = false;
            if (!response.data.agentEvents) {
                $scope.selectError = response.data.re;
                $scope.agentEvents = null;
                $scope.eventsSize = null;
                $rootScope.eventsWaiting = 0;
            } else {
                $scope.selectError = null;
                $scope.agentEvents = response.data.agentEvents;
                $scope.eventsSize = response.data.agentEvents[0]["size"];
                $rootScope.eventsWaiting = response.data.agentEvents[0]["size"];
            }
            $('#itemContent_loader').addClass('hidden');
            $('#itemContent_section').removeClass('hidden');

        }).catch((re) => {
            $scope.isLoading = false;
            $scope.agentEvents = null;
            $scope.eventsSize = null;
            $rootScope.eventsWaiting = 0;
            $scope.selectError = "Não foi possível trazer os dados.";
            $('#itemContent_loader').addClass('hidden');
            $('#itemContent_section').removeClass('hidden');


        });
    }
    ;

});
//Controller que lista os eventos validados;
Agentmodule.controller('controllerListConfirmedEventAgent', function ($scope, getService, $rootScope) {
    $rootScope.btnBackTo = function () {
        $rootScope.getEvents();
        $rootScope.btn = true;
    };
    var url = window.location.search.replace("?", "");
    var items = url.split("&");
    var array = {
        'id': items[0]
    };
    var id = array.id;
    //Criação de variáveis para ordenar as tabelas
    $scope.x = 'event';
    $scope.myOrderBy = false;
    //Criação de variáveis.
    $scope.totalEvents = 0;
    $scope.qtdPage = 50;
    $scope.searchConfirmedEvent = "";
    $scope.queryBy = "";
    $scope.agentConfirmedEvents = [];
    var lastPage = 1;
    //Função Angular que ordena a tabela.
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    //Função Angular que mostra a quantidade selecionada
    $scope.selectQtd = function (qtd) {
        $scope.qtdPage = qtd;
        $scope.pagination.current = 1;
    };

    //pagination pertencente ao dir pagination, mudar de páginas.
    $scope.pagination = {
        current: 1
    };
    //Função para o dir-paginate quando muda a página, chama a nova página.
    $scope.pageChanged = function (newPage) {
        getAgentConfirmedEvents(newPage);
    };
    //Função para chamar a tabela novamente.
    $scope.callBack = function () {
        getAgentConfirmedEvents(1);
    };

    $rootScope.getEventsConfirmed = function () {
        getAgentConfirmedEvents(1);
    };
    getAgentConfirmedEvents(1);
    function getAgentConfirmedEvents(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalEvents < $scope.eventsSize)) {
            $scope.totalEvents = (parseInt($scope.totalEvents) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $scope.isLoading = true;
        var url = $rootScope.ctx_path + "/data/schedule/agent.jsp?action=getAgentConfirmedEvents&limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchConfirmedEvent;
        getService.query(url).then((response) => {
            $scope.isLoading = false;
            if (!response.data.agentConfirmedEvents) {
                $scope.selectError = response.data.re;
                $scope.agentConfirmedEvents = null;
                $scope.eventsSize = null;

            } else {
                $scope.selectError = null;
                $scope.agentConfirmedEvents = response.data.agentConfirmedEvents;
                $scope.eventsSize = response.data.agentConfirmedEvents[0].size;
            }
        }).catch((re) => {
            $scope.agentConfirmedEvents = null;
            $scope.eventsSize = null;
            $scope.selectError = "Não foi possível trazer os dados.";
            $scope.isLoading = false;
        });
    }
    ;
});

//Controller que lista os eventos conpletados;
Agentmodule.controller('controllerListReprovedEventAgent', function ($scope, getService, $rootScope) {
    var url = window.location.search.replace("?", "");
    var items = url.split("&");
    var array = {
        'id': items[0]
    };
    var id = array.id;
    //Criação de variáveis para ordenar as tabelas.
    $scope.x = 'event';
    $scope.myOrderBy = false;
    //Criação de variáveis.    
    $scope.totalEvents = 0;
    $scope.qtdPage = 50;
    $scope.searchReprovedEvent = "";
    $scope.queryBy = "";
    $scope.agentReprovedEvents = [];
    var lastPage = 1;
    //Função Angular que ordena a tabela.
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    //Função Angular que mostra a quantidade selecionada por página.
    $scope.selectQtd = function (qtd) {
        $scope.qtdPage = qtd;
        getAgentReprovedEvents(1);
        $scope.pagination.current = 1;
    };

    //pagination pertencente ao dir pagination, mudar de páginas.
    $scope.pagination = {
        current: 1
    };
    //Função para o dir-paginate quando muda a página, chama a nova página.
    $scope.pageChanged = function (newPage) {
        getAgentReprovedEvents(newPage);
    };
    //Função para chamar a tabela novamente.
    $scope.callBack = function () {
        getAgentReprovedEvents(1);
    };

    $rootScope.getAgentReprovedEvents = function () {
        getAgentReprovedEvents(1);
    };
    getAgentReprovedEvents(1);
    function getAgentReprovedEvents(pageNumber) {
//      alert($rootScope.idAgent); action=getManagerEvents&id="+$rootScope.codigoInscricao
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalEvents < $scope.eventsSize)) {
            $scope.totalEvents = (parseInt($scope.totalEvents) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;

        $scope.isLoading = true;
        var url = $rootScope.ctx_path + "/data/schedule/agent.jsp?action=getAgentReprovedEvents&limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchReprovedEvent;
        getService.query(url).then((response) => {
            $scope.isLoading = false;
            if (!response.data.agentReprovedEvents) {
                $scope.agentReprovedEvents = "";
                $scope.selectError = response.data.re;
                $scope.eventsSize = null;

            } else {
                $scope.agentReprovedEvents = response.data.agentReprovedEvents;
                $scope.eventsSize = response.data.agentReprovedEvents[0].size;
                $scope.selectError = null;
            }
        }).catch((re) => {
            $scope.agentReprovedEvents = null;
            $scope.eventsSize = null;
            $scope.selectError = "Não foi possível trazer os dados.";
            $scope.isLoading = false;
        });
    }
    ;
});
Agentmodule.controller('controllerActivities', function ($scope, $rootScope, getService) {
    $scope.x = 'name';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.activitiesList = [];
    $scope.qtdPage = 8;
    $scope.total = 0;
    var lastPage = 1;
    $scope.search = "";
    $scope.queryBy = "";
    $scope.act;
    $scope.events = {};
    $scope.event = {'id': -1, 'name': "Todos os Eventos"};

    $scope.selectQtd = function (qtd) {
        $scope.qtdPage = qtd;
        getResultsPage(lastPage);
        $scope.pagination.current = 1;
    };
    $scope.pagination = {
        current: 1
    };
    $scope.pageChanged = function (newPage) {
        getResultsPage(newPage);
    };
    $scope.callBack = function () {
        getResultsPage(1);
    };

    $scope.openActivity = function (activity) {
        $scope.act = activity;
        $("#activity_modal").modal('show');
    };

    $scope.closeModal = function () {
        delete $scope.act;
        $("#activity_modal").modal('hide');
    };
    getResultsPage(1);
    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalEvents < $scope.activitiesListSize)) {
            $scope.total = (parseInt($scope.total) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $scope.loading = true;
        var url = $rootScope.ctx_path + "/data/schedule/agent.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.search + "&action=getActivities";
        getService.query(url).then(function (response) {
            if (!response.data.re) {
                $scope.selectError = null;
                $scope.activitiesList = response.data.activitiesList;
                $scope.activitiesListSize = response.data.activitiesList[0].size;
            } else {
                $scope.activitiesList = null;
                $scope.activitiesError = response.data.re;
                $scope.selectError = "Não possui atividades recentes.";
                $scope.activitiesListSize = 0;
            }
            $scope.loading = false;

        }).catch((re) => {

            $scope.activitiesList = null;
            $scope.activitiesListSize = null;
            $scope.selectError = "Não foi possível trazer os dados.";
            $scope.loading = false;
        });
    }
    ;

    var url = $rootScope.ctx_path + "/data/select-dropdown.jsp?&action=myEvents&actor=a";
    getService.query(url).then(function (response) {
       if (!!response.data.error) {
            $scope.events = response.data.error;
            $scope.event = {'id': -2};
        } else {
            $scope.events = response.data.event_list;
        }
    });

});


function hideProblem() {
    $('#item-solicitaçao-projetos').hide();
    $('#item-view-problem').hide();
}

function backProblemReq() {
    $("#item-view-problem").fadeOut(200);
    $("#item-view-problem").removeClass('active in');

    $("#item-solicitaçao-projetos").show();
    $("#item-solicitaçao-projetos").fadeIn(200);
    $("#item-solicitaçao-projetos").addClass('active in');
}
;

Agentmodule.controller('controllerConfirmProject', function ($scope, $rootScope, $http, $timeout, $window, postService) {
    $scope.testModal = function () {
        alert('a');
        $(".row-btn-project").show();
        $(".loader3").show();
    };

    $scope.confirmPendingProblem = function () {
        $(".row-btn-project").hide();
        $(".loader3").show();
        ctx_path = $window.ctx_path;
        $scope.project_id = $("#project-id").val();
        $scope.project_name = $(".project-name").val();
        $scope.justification = $("#project-justification").val();
        $scope.company_email = $("#project-company_email").val();
        if ($scope.justification === 'undefined' || $scope.justification === '' || $scope.justification === null) {
            $scope.justification = '';
        }
        var data = {id: $scope.project_id, project_name: $scope.project_name, justification: $scope.justification, company_email: $scope.company_email, action: 'agentUpdateProject'};
        var url2 = ctx_path + "/data/open-projects/company-problems.jsp";
        postService.query(data, url2).then(function (response) {

            if (response.data.aux === "3") {
                $("#text-input").empty();
                $("#text-input").append('Você aceitou o projeto com sucesso!');
                $("#text-title").empty();
                $("#text-title").css('color', 'green');
                $("#text-title").append('Projeto aceito');
                $("#btn-exit-action").hide();
                $("#success-action").modal('toggle');
                $(".loadingMiddle").hide();
                $(".loader3").hide();
                $(".row-btn-project").show();
            } else if (response.data.aux === "4") {
                $("#text-input").append('Ocorreu um erro ao confirmar o projeto!');
                $("#text-title").empty();
                $("#text-title").css('color', '#FF0000');
                $("#text-title").append('Ocorreu um erro');
                $("#btn-exit-action").hide();
                $("#success-action").modal('toggle');
                $(".loader3").hide();
                $(".row-btn-project").show();
            }
        }).catch(() => {
            $("#text-input").append('Ocorreu um erro ao confirmar o projeto!');
            $("#text-title").empty();
            $("#text-title").css('color', '#FF0000');
            $("#text-title").append('Ocorreu um erro');
            $("#btn-exit-action").hide();
            $("#success-action").modal('toggle');
            $(".loader3").hide();
            $(".row-btn-project").show();

        });

        setTimeout(function () {
            $("#success-action").modal('toggle');
            $rootScope.getProblems(1);
            $rootScope.callBackRegisteredProblem();
            backProblemReq();
        }, 5000);
    };

});

Agentmodule.controller('controllerRefuseProject', function ($scope, $rootScope, $http, $timeout, $window, postService) {
    $rootScope.refuseProblem = function () {
        $('.body-success').css('height', $(".body-just").height());
        $('.body-denied').css('height', $(".body-just").height());
        $('.body-error').css('height', $(".body-just").height());
        $(".just-title").fadeOut();
        $(".body-just").fadeTo(400, 0, function () {
            $(".body-just").hide();
            $(".loadingMiddle").hide();
            $(".body-success").fadeTo(1000, 1, function () {
                $('.loadingMiddle').show();
                $rootScope.refuseProblemAction();

            });
        });
        $rootScope.refuseProblemAction = function () {
            ctx_path = $window.ctx_path;
            $scope.project_id = $("#project-id").val();
            $scope.project_name = $(".project-name").val();
            $scope.justification = $("#project-justification").val();
            $scope.company_email = $("#project-company_email").val();
            var data = {company_email: $scope.company_email, project_name: $scope.project_name, id: $scope.project_id, justification: $scope.justification, action: 'agentUpdateProject'};
            var url1 = ctx_path + "/data/open-projects/company-problems.jsp";
            postService.query(data, url1).then(function (response) {

                if (response.data.aux === "1") {
                    $(".body-success").fadeTo(1000, 0, function () {
                        $(".body-success").hide();
                        $('.loadingMiddle').hide();
                        $('.body-denied').css('display', 'table');
                        $('.body-denied').fadeTo(1000, 1, function () {
                        });
                    });
//                    $rootScope.getProblems(1);

                } else if (response.data.aux === "2") {
                    $(".body-success").fadeTo(1000, 0, function () {
                        $(".body-success").hide();
                        $('.loadingMiddle').hide();
                        $('.body-error').css('display', 'table');
                        $('.body-error').fadeTo(1000, 1, function () {
                        });
                    });
                    
                }

            }).catch(() => {
                $(".body-success").fadeTo(1000, 0, function () {
                        $(".body-success").hide();
                        $('.loadingMiddle').hide();
                        $('.body-error').css('display', 'table');
                        $('.body-error').fadeTo(1000, 1, function () {
                        });
                    });
                  

            });

            setTimeout(function () {
                $('#refuse-project').modal('toggle');
                $('.body-denied').css('display', 'none');
                $('.body-error').css('display', 'none');
                $('.just-title').show();
                $('#project-justification').val('');
                $('#project-name').val('');
                $('.body-just').fadeTo(1,1, function () {
                    $('.body-just').show();
                });
                $rootScope.callBackRegisteredProblem();
                $rootScope.callBackProblem();
                backProblemReq();
            }, 6000);
        };
    };
});

Agentmodule.controller('controllerRegisteredProjects', function ($scope, $rootScope, $window, getService) {
    var lastPage = 1;
    $scope.qtdPage = 10;
    $scope.total = 0;
    var by = 'ASC';


    $(document).ready(function () {
        $rootScope.getRegisteredProblems(1);
    });

    $rootScope.callBackRegisteredProblem = function () {
        $rootScope.getRegisteredProblems(1);
    };

    $rootScope.getRegisteredProblems = function (pageNumber, orderBy) {
        $("#no-registered-project").css('display', 'none');
        $(".loader3").css('display', 'block');
        $("#table-registeredProblemAgent").hide();
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.total < $scope.registeredProblemListSize)) {
            $scope.total = (parseInt($scope.total) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $scope.registeredProblemList = "";
        $scope.registeredProblemListSize = "";
        $scope.registeredProblemListError = "";
        ctx_path = $window.ctx_path;
        if (orderBy !== 'name' && orderBy !== 'agent_confirmation') { //Se orderBy for vazio, fica = creation_date
            orderBy = 'creation_date';
        }
        if ($scope.searchRegisteredProblem === undefined) {
            $scope.searchRegisteredProblem = '';
        }
        var url = ctx_path + "/data/open-projects/company-problems.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&action=getEnterpriseRegisteredProblemsAsAgent" + "&queryBy=" + orderBy + "&by=" + by + "&like=" + $scope.searchRegisteredProblem;
        getService.query(url).then(function (response) {
            if (response.data.registeredProblemList[0].aux === "1") {
                $scope.registeredProblemList = response.data.registeredProblemList;
                $scope.registeredProblemListSize = response.data.registeredProblemList[0].size;
                $("#no-registered-project").css('display', 'none');
                $("#table-registeredProblemAgent").show();
                $(".loader3").css('display', 'none');
            } else if (response.data.registeredProblemList[0].aux === "2") {
                $(".loader3").css('display', 'none');
                $("#no-registered-project").css('display', 'block');
            } else if (response.data.registeredProblemList[0].aux === "3") {
                $("#no-registered-project").css('display', 'block');
                $(".loader3").css('display', 'none');
            } else {
                $(".loader3").css('display', 'none');
                $("#ErrorModal").show();
                $("#eWarningError").empty();
                $("#eWarningError").append("Erro ao buscar projetos abertos.");
                setTimeout(function () {
                    $("#ErrorModal").hide();
                }, 2000);
            }
        }).catch(() => {
            $(".loader3").css('display', 'none');
            $("#ErrorModal").show();
            $("#eWarningError").empty();
            $("#eWarningError").append("Erro ao buscar projetos abertos.");
            setTimeout(function () {
                $("#ErrorModal").hide();
            }, 2000);
        });
    };
    $scope.selectQtdRe = function (qtd) {
        $scope.qtdPage = qtd;
        $rootScope.getRegisteredProblems(lastPage);
        $scope.paginationRegistered.current = 1;
    };
    $scope.paginationRegistered = {
        current: 1
    };
    $scope.pageChangedRe = function (newPage) {
        $rootScope.getRegisteredProblems(newPage);
    };
    $scope.sortTable = function (field) {
        $scope.paginationRegistered.current = 1;
        if (by === 'ASC') { //Mexe as setas e inverte o ASC/DESC do ORDER BY.
            by = 'DESC';
            if (field === 'theme') {

                $rootScope.getRegisteredProblems(1, 'name');
                $(".theme-arrow").removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-top");
            } else {

                $rootScope.getRegisteredProblems(1, 'agent_confirmation');
                $(".status-arrow").removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-top");
            }
        } else {
            by = 'ASC';
            if (field === 'theme') {
                $rootScope.getRegisteredProblems(1, 'name');
                $(".theme-arrow").removeClass("glyphicon-triangle-top").addClass("glyphicon-triangle-bottom");
            } else {
                $rootScope.getRegisteredProblems(1, 'agent_confirmation');
                $(".status-arrow").removeClass("glyphicon-triangle-top").addClass("glyphicon-triangle-bottom");
            }
        }
    };
});


Agentmodule.controller('controllerOpenProjects', function ($scope, $rootScope, $http, $timeout, $window, getService) {

    $scope.goProblemReq = function (problem) {
        $(".project-razao-social").empty();
        $(".project-email").empty();
        $(".project-phone").empty();

        $("#item-solicitaçao-projetos").fadeOut(200);
        $("#item-solicitaçao-projetos").removeClass('active in');
        $("#item-view-problem").fadeIn(200);
        $("#item-view-problem").addClass('active in');
        $("#item-view-problem").show();

        $(".project-name").attr("value", problem.name);
        $("#project-id").attr("value", problem.project_id);
        $("#project-company_email").attr("value", problem.company_email);
        $(".project-description").attr("placeholder", problem.description);
        nDate = $scope.formatDate(problem.creation_date);
        $(".project-creation-date").attr("value", nDate);
        $(".project-razao-social").append(problem.company_company_name);
        $(".project-email").append(problem.company_email);
        $(".project-phone").append(problem.company_phone);
        $scope.project = problem;


    };

    var lastPage = 1;
    $scope.qtdPage = 10;
    $scope.total = 0;
    var by = 'ASC';

    $scope.formatDate = function (nDate) {
        date = nDate.split("/");
        date[2] = date[2].split(" ", 2);
        nDate = date[2][0] + "/" + date[1] + "/" + date[0];

        return nDate;
    };

    $(document).ready(function () {
        $rootScope.getProblems(1);
    });

    $rootScope.callBackProblem = function () {
        $rootScope.getProblems(1);
    };

    $rootScope.getProblems = function (pageNumber, orderBy) {

        $(".loader3").css('display', 'block');
        $("#table-problemAgent").hide();
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.total < $scope.problemListSize)) {
            $scope.total = (parseInt($scope.total) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $scope.problemList = "";
        $scope.problemListSize = "";
        $scope.problemListError = "";
        ctx_path = $window.ctx_path;
        if (orderBy !== 'name' && orderBy !== 'creation_date') { //Se orderBy for vazio, fica = creation_date
            orderBy = 'creation_date';
        }
        if ($scope.searchPendingProblem === undefined) {
            $scope.searchPendingProblem = '';
        }
        var url = ctx_path + "/data/open-projects/company-problems.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&action=getEnterpriseProblemsAsAgent" + "&queryBy=" + orderBy + "&by=" + by + "&like=" + $scope.searchPendingProblem;
        getService.query(url).then(function (response) {
            if (response.data.problemList[0].aux === "1") {
                $scope.problemList = response.data.problemList;
                $scope.problemListSize = response.data.problemList[0].size;
                $("#no-project").css('display', 'none');
                $("#table-problemAgent").show();
                $(".loader3").css('display', 'none');
            } else if (response.data.problemList[0].aux === "2") {
                $(".loader3").css('display', 'none');
                $("#no-project").css('display', 'block');
            } else if (response.data.problemList[0].aux === "3") {

                $("#no-project").css('display', 'block');
                $(".loader3").css('display', 'none');
            } else {

                $(".loader3").css('display', 'none');
                $("#ErrorModal").show();
                $("#eWarningError").empty();
                $("#eWarningError").append("Erro ao buscar projetos abertos.");
                setTimeout(function () {
                    $("#ErrorModal").hide();
                }, 2000);
            }
        }).catch(() => {

            $(".loader3").css('display', 'none');
            $("#ErrorModal").show();
            $("#eWarningError").empty();
            $("#eWarningError").append("Erro ao buscar projetos abertos.");
            setTimeout(function () {
                $("#ErrorModal").hide();
            }, 2000);
        });
    };
    $scope.selectQtd = function (qtd) {
        $scope.qtdPage = qtd;
        $rootScope.getProblems(lastPage);
        $scope.pagination.current = 1;
    };
    $scope.pagination = {
        current: 1
    };
    $scope.pageChanged = function (newPage) {
        $rootScope.getProblems(newPage);
    };
    $scope.sortTable = function (field) {
        $scope.pagination.current = 1;
        if (by === 'ASC') { //Mexe as setas e inverte o ASC/DESC do ORDER BY.
            by = 'DESC';
            if (field === 'theme') {
                $rootScope.getProblems(1, 'name');
                $(".theme-arrow").removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-top");
            } else {
                $rootScope.getProblems(1, 'creation_date');
                $(".status-arrow").removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-top");
            }
        } else {
            by = 'ASC';
            if (field === 'theme') {
                $rootScope.getProblems(1, 'name');
                $(".theme-arrow").removeClass("glyphicon-triangle-top").addClass("glyphicon-triangle-bottom");
            } else {
                $rootScope.getProblems(1, 'creation_date');
                $(".status-arrow").removeClass("glyphicon-triangle-top").addClass("glyphicon-triangle-bottom");
            }
        }
    };
});