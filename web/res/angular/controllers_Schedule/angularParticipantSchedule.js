var participantModule = angular.module('participantModule', ['angularUtils.directives.dirPagination', 'angular-input-stars']);

var getMaterial;
var getMaterialSize;

participantModule.run(['$rootScope', '$window', function ($rootScope, $window) {

        $rootScope.ctx_path = $window.ctx_path;
    }]);

participantModule.factory('postService', ['$http', function ($http) {
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

participantModule.controller('controllerParticipantEvent', function ($scope, $http, $rootScope, postService) {



    $scope.reload = function () {
        window.scrollTo(0, 0);
        location.reload();
    };

    $scope.att = function () {
    };


    $rootScope.getNEvaluations = function () {
        $scope.nEvaluations = [];
        $http.get($rootScope.ctx_path + "/data/schedule/participant.jsp?action=evaluationPending")
                .then((response) => {
                    if (!!response.data.re && response.data.pending_count > 0) {
                        $scope.nEvaluations = null;
                    } else {
                        $scope.nEvaluations = response.data.pending_count;
                        $().removeClass('hidden');

                    }
                }).catch((re) => {
            $scope.nEvaluations = null;
            $rootScope.viewN = false;
        });
    };
    $rootScope.getNEvaluations();
});
participantModule.controller('controllerEventsParticipantRegistered', function ($scope, $http, $rootScope, postService, $timeout) {
    $scope.x = 'event';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.participantEvents = [];
    $scope.availableEvents = [];
    $scope.qtdPage = 20;
    $scope.totalParticipantEvents = 0;
    $scope.searchEvents = "";
    $scope.queryBy = "";
    var event_id;
    var unit_event_id;
    var event_theme;
    var lastPage = 1;
    $scope.selectQtd = function (qtd) {
        $scope.qtdPage = qtd;
        getResultsPage(lastPage);
        $scope.pagination.current = 1;
    };
    $scope.isUnsubscribe = false;
    $scope.unsubscribe = function (participantEvent) {
        event_id = participantEvent.event_id;
        unit_event_id = participantEvent.id;
        event_theme = participantEvent.theme;
        $("#unsubscribeAlert>p").text("Deseja realmente anular sua inscrição no evento " + event_theme + "?");
        $("#unsubscribeParticipant").modal("show");
    };
    $scope.unsubscribeParticipant = function () {
        $scope.isUnsubscribe = true;
        var url = $rootScope.ctx_path + "/data/schedule/participant.jsp";
        var selecionado = {event_id: event_id, unit_event_id: unit_event_id, event_theme: event_theme, action: "unsubscribeParticipant"};
        postService.query(selecionado, url).then(function (re) {
            $scope.isUnsubscribe = false;
            $("#unsubscribeParticipant").modal("hide");
            if (re.data.re) {
                modal_success(re.data.re);
            } else {
                modal_success(re.data.erro);
            }
            getResultsPage(lastPage);
            $rootScope.getParticipantAvailableEvents();
        }).catch(function (data) {
            $scope.isUnsubscribe = false;
            $("#unsubscribeParticipant").modal("hide");
            modal_error();
        });
    };
    $scope.pagination = {
        current: 1
    };
    $scope.pageChanged = function (newPage) {
        getResultsPage(newPage);
    };
    $scope.search = function () {
        getResultsPage(1);
    };
    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalParticipantEvents < $scope.participantEventsSize)) {
            $scope.totalParticipantEvents = (parseInt($scope.totalParticipantEvents) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $scope.loading = true;
        if ($rootScope.isPunished === "true") {
            $scope.loading = false;
            $scope.selectError = 'Se estava inscrito em algum eveto, a sua incrição foi anulada.';
        } else {
            $http.get($rootScope.ctx_path + "/data/schedule/participant.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchEvents + "&action=getEventsParticipantRegistered&after=" + 0)
                    .then((response) => {
                        if (!!response.data.re) {
                            $scope.participantEvents = null;
                            $scope.participantEventsSize = null;
                            $scope.selectError = response.data.re;
                            this.getMaterial = null;
                        } else {
                            $scope.participantEvents = response.data.participantEvents;
                            $scope.participantEventsSize = response.data.participantEvents[0]["size"];
                            $scope.selectError = null;

                            this.getMaterial = response.data.participantEvents;
                            this.getMaterialSize = response.data.participantEvents[0]["size"];
                        }
                        $scope.loading = false;
                    }).catch((re) => {
                $scope.participantEvents = null;
                $scope.participantEventsSize = 0;
                $scope.selectError = 'Falha ao trazer dados';
                $scope.loading = false;
            });
        }

    }
    ;
    $rootScope.getParticipantEvents = function () {
        getResultsPage(1);
    };
    $rootScope.getParticipantEvents();

});
participantModule.controller('controllerMaterialListEvent', function ($scope, $http, $rootScope, postService, $timeout) {
    $scope.x = 'event';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.materialEvents = [];
    $scope.availableEvents = [];
    $scope.qtdPage = 20;
    $scope.totalParticipantEvents = 0;
    var lastPage = 1;
    $scope.searchEvents = "";
    $scope.queryBy = "";
    $scope.selectQtd = function (qtd) {
        $scope.qtdPage = qtd;
        getResultsPage(lastPage);
        $scope.pagination.current = 1;
    };
    getResultsPage(1);
    $scope.isUnsubscribe = false;
    $scope.pagination = {
        current: 1
    };
    $scope.pageChanged = function (newPage) {
        getResultsPage(newPage);
    };
    $scope.search = function () {
        getResultsPage(1);
    };
    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalParticipantEvents < $scope.participantEventsSize)) {
            $scope.totalParticipantEvents = (parseInt($scope.totalParticipantEvents) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $scope.loading = true;
        $http.get($rootScope.ctx_path + "/data/schedule/participant.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchEvents + "&action=getMaterialEvents&after=" + 0)
                .then((response) => {
                    if (!!response.data.re) {
                        $scope.materialEvents = null;
                        $scope.participantEventsSize = null;
                        $scope.selectError = response.data.re;
                    } else {
                        $scope.materialEvents = response.data.materialEvents;
                        $scope.participantEventsSize = response.data.materialEvents[0]["size"];
                        $scope.selectError = null;
                    }
                    $scope.loading = false;
                }).catch((re) => {
            $scope.materialEvents = null;
            $scope.participantEventsSize = 0;
            $scope.selectError = 'Falha ao trazer dados';
            $scope.loading = false;
        });
    }
    ;
    $rootScope.getParticipantEvents = function () {
        getResultsPage(1);
    };
});
participantModule.controller('controllerEventsParticipated', function ($scope, $http, $rootScope) {
    $scope.x = 'event';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.participantEvents = [];
    $scope.availableEvents = [];
    $scope.participantAfterEvents = [];
    $scope.qtdPage = 20;
    $scope.totalParticipantAfterEvents = 0;
    var lastPage = 1;
    $scope.searchEvents = "";
    $scope.queryBy = "";
    $scope.selectQtd = function (qtd) {
        $scope.qtdPage = qtd;
        getResultsPage(lastPage);
        $scope.pagination.current = 1;
    };
    getResultsPage(1);
    $scope.pagination = {
        current: 1
    };
    $scope.pageChanged = function (newPage) {
        getResultsPage(newPage);
    };
    $scope.search = function () {
        getResultsPage(1);
    };

    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalParticipantAfterEvents < $scope.ParticipantAfterEventsSize)) {
            $scope.totalParticipantAfterEvents = (parseInt($scope.totalParticipantAfterEvents) + parseInt($scope.qtdPage));
        }
        $scope.loading = true;
        lastPage = pageNumber;
        $http.get($rootScope.ctx_path + "/data/schedule/participant.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchEvents + "&action=getEventsParticipated")
                .then((response) => {
                    if (!!response.data.re) {
                        $scope.selectError = response.data.re;
                        $scope.ParticipantAfterEventsSize = 0;
                        $scope.participantAfterEvents = null;

                    } else {
                        $scope.selectError = null;
                        $scope.participantAfterEvents = response.data.participantEvents;
                        $scope.ParticipantAfterEventsSize = response.data.participantEvents[0].size;
                    }
                    $scope.loading = false;
                }).catch((re) => {
            $scope.participantAfterEvents = null;
            $scope.ParticipantAfterEventsSize = 0;
            $scope.selectError = 'Falha ao trazer dados';
            $scope.loading = false;
        });
    }
    ;

    $rootScope.getParticipantAfterEvents = function () {
        getResultsPage(1);
    };

    $rootScope.whereEvaluation = 0;

    $rootScope.changeEvaluation = function () {
        $rootScope.whereEvaluation = 1;
    };
    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL;
    }
    ;

    $scope.gerarPDF = function (user_name, event_theme, unit, duration, date, rg, manager_name) {
        if (event_theme.length > 39){
                event_theme = event_theme.substring(0, 36) + "...";
        }
        var time = duration;
        monName = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
        var doc = new jsPDF();
        now = new Date;
        var imgC = getBase64Image(document.getElementById("imageid"));
        doc.addImage(imgC, 'JPEG', 0, 0, 210, 296);
        doc.setFontSize(15);
        doc.setFont('Arial');
        doc.setFontType('normal');
        doc.setTextColor(054, 054, 054);
        doc.text(86, 120, user_name, null, 90);
        doc.text(95, 265, rg, null, 90);
        doc.text(104, 275, manager_name, null, 90);
        doc.text(95, 187, 'Evento ' + event_theme, null, 90);
        doc.text(104, 142, time + 'min(s)', null, 90);
        doc.text(115, 273, unit, null, 90);
        doc.text(104, 70, date, null, 90);
        doc.text(141, 210, 'Praia Grande', null, 90);
        doc.text(141, 165, now.getDate().toString(), null, 90);
        doc.text(141, 137, monName[now.getMonth() ], null, 90);
        doc.text(141, 93, now.getFullYear().toString(), null, 90);
        doc.save('certificado-'+ event_theme +'.pdf');
    };
});

participantModule.controller('controllerParticipantAvailableEvent', function ($scope, $http, $rootScope, postService) {
    $scope.x = 'event';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.availableEvents = [];
    $scope.qtdPage = 20;
    $scope.totalParticipantAvailableEvents = 0;
    var lastPage = 1;
    $scope.searchEvents = "";
    $scope.queryBy = "";
    $scope.selectQtd = function (qtd) {
        $scope.qtdPage = qtd;
        getResultsPage(lastPage);
        $scope.pagination.current = 1;
    };
    onStart();
    //Ao iniciar.
    function onStart() {
        setTimeout(function () {
            $('#itemContent_loader').addClass('hidden');
            $('#itemContent_section').removeClass('hidden');
            $('#item_evaluations').removeClass('hidden');
        }, 1000);
    }

    $scope.pagination = {
        current: 1
    };
    $scope.pageChanged = function (newPage) {
        getResultsPage(newPage);
    };
    $scope.search = function () {
        getResultsPage(1);
    };

    $scope.inscription = function (unit_event_id, eventTheme, event_id) {
        var dados = {action: "inscription", unit_event_id: unit_event_id, event_id: event_id, eventTheme: eventTheme};
        $scope.loading_modal = true;
        var url = "";
        var url = $rootScope.ctx_path + "/data/schedule/participant.jsp";
        postService.query(dados, url).then(function (response) {
            if (!!response.data.error) {
                $("#errorInscription").modal("show");
            } else {
                $("#successInscription").modal("show");
            }
            $scope.loading_modal = false;
        }).catch(function () {
            $scope.loading_modal = false;
            modal_error();
        });
    };

    $scope.openInscription = function (sParticipantAvailableEvents) {
        $scope.BackUp = angular.copy(sParticipantAvailableEvents);
        $scope.selectAvailableEvents = $scope.BackUp;
        $("#inscriptionEvents").modal('show');
    };


    $scope.openEvent = function (sParticipantEvent) {
        $scope.BackUp = angular.copy(sParticipantEvent);
        $scope.selectParticipantEvent = $scope.BackUp;
    };

    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalParticipantAvailableEvents < $scope.availableEventsSize)) {
            $scope.totalParticipantAvailableEvents = (parseInt($scope.totalParticipantAvailableEvents) + parseInt($scope.qtdPage));
        }
        $scope.loading = true;
        lastPage = pageNumber;
        $rootScope.isPunished = true;
        $http.get($rootScope.ctx_path + "/data/schedule/participant.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchEvents + "&action=getParticipantAvailableEvents")
                .then((response) => {
                    if (!!response.data.re) {
                        $scope.availableEvents = null;
                        $scope.availableEventsSize = 0;
                        $scope.selectError = response.data.re;
                        $rootScope.isPunished = false;
                    } else {
                        $rootScope.isPunished = response.data.availableEvents[0].isPunished;
                        $rootScope.selectPunishment = "Se estava incrito em alugum evento, as suas incrições foram anuladas por faltar a eventos.";
                        $scope.selectError = null;
                        $scope.availableEvents = response.data.availableEvents;
                        $scope.availableEventsSize = response.data.availableEvents[0]["size"];
                    }
                    $scope.loading = false;
                }).catch((re) => {
            $scope.availableEvents = null;
            $scope.availableEventsSize = 0;
            $scope.selectError = 'Falha ao trazer dados';
            $scope.loading = false;
        });
    }
    ;

    $rootScope.getParticipantAvailableEvents = function () {
        getResultsPage(1);
    };
    $rootScope.getParticipantAvailableEvents();
});

participantModule.controller('controllerParticipantEvaluationEvent', function ($scope, $http, $rootScope, postService) {
    $scope.evaluationEvents = [];
    $rootScope.getParticipantEvaluationEvents = function () {
        $scope.loading = true;
        $http.get($rootScope.ctx_path + "/data/schedule/participant.jsp?action=getParticipantEvaluationEvents")
                .then((response) => {
                    if (!!response.data.re) {
                        $scope.selectError = response.data.re;
                        $scope.evaluationEvents = null;
                    } else {
                        $scope.selectError = null;
                        $scope.evaluationEvents = response.data.evaluationEvents;
                    }
                    $scope.loading = false;
                }).catch((re) => {
            $scope.evaluationEvents = null;
            $scope.selectError = 'Falha ao trazer dados';
            $scope.loading = false;
        });
    };
    $rootScope.getParticipantEvaluationEvents();

    $scope.selectEvaluation = function (grade, sParticipantEvaluationEvents) {
        $rootScope.gradeEvaluation = grade;
        $scope.BackUp = angular.copy(sParticipantEvaluationEvents);
        $rootScope.selectEvaluationEvents = $scope.BackUp;
        $("#confirmEvaluation").modal('show');
    };

    $rootScope.confirmedEvaluation = function (grade, idUnit_Event, comment) {
        var dados = {action: "sendEvaluationEvents", idUnit_Event: idUnit_Event, grade: grade, comment: comment};
        $scope.loading_confirm = true;
        var url = $rootScope.ctx_path + "/data/schedule/participant.jsp";
        postService.query(dados, url).then(function (re) {
            if (!re.data.re) {
                modal_error();
            } else {
                $("#confirmEvaluation").modal('hide');
                $("#successEvaluation").modal('show');
                $rootScope.getParticipantEvaluationEvents();
                $rootScope.getNEvaluations();
                $rootScope.getParticipantAfterEvents();
                $rootScope.whereEvaluation = 0;
            }
            $scope.loading_confirm = false;
        }).catch(function () {
//            $scope.loading_confirm_evaluation_modal = false;
//            $("#errorEvaluation").modal('show');            
            $scope.loading_confirm = false;
            $rootScope.whereEvaluation = 0;
            modal_error();
        });
    };
    $rootScope.reset = function () {
        $rootScope.gradeEvaluationName = null;
        $rootScope.getParticipantEvaluationEvents();
    };
}
);
participantModule.controller('controllerActivities', function ($scope, $rootScope, getService) {
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
        var url = $rootScope.ctx_path + "/data/schedule/participant.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.search + "&action=getActivities";
        getService.query(url).then(function (response) {
            if (!!response.data.re) {
                $scope.activitiesList = null;
                $scope.activitiesError = response.data.re;
                $scope.activitiesListSize = 0;
            } else {
                $scope.activitiesError = null;
                $scope.activitiesList = response.data.activitiesList;
                $scope.activitiesListSize = response.data.activitiesList[0].size;

            }
            $("#loadConfirmed").css("display", "none");
        });
    }

});

//participantModule.controller('controllerListCompletedEventAgent', function ($scope, $http, $compile, $rootScope, postService) {
//    $rootScope.getAgentCompletedEvents = function () {
////      alert($rootScope.idAgent); action=getManagerEvents&id="+$rootScope.codigoInscricao
//        $http.get($rootScope.ctx_path + "/data/schedule/agent.jsp?action=getAgentCompletedEvents&id=" + $rootScope.idAgent)
//                .then((response) => {
//                    $rootScope.viewCom = false;
//                    $scope.agentCompletedEvents = [];
//                    $scope.agentCompletedEvents = response.data.agentCompletedEvents;
//                    if ($scope.agentCompletedEvents == "") {
//                        $scope.selectError = response.data.re;
//                        $rootScope.viewCom = true;
//                    } else {
//                        $scope.selectError = null;
//                        $rootScope.viewCom = false;
//                    }
//                });
//
//    };
//    $rootScope.getAgentCompletedEvents();
//});
