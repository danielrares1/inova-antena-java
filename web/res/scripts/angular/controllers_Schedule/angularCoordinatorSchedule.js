var Coordinatormodule = angular.module("Coordinatormodule", ['angularUtils.directives.dirPagination', 'angular-input-stars', 'ngFileUpload']);

Coordinatormodule.run(['$rootScope', '$window', function ($rootScope, $window) {

        $rootScope.ctx_path = $window.ctx_path;
        $rootScope.idUnit = $window.idUnit;
        function onStart() {
            setTimeout(function () {
                $('#itemContent_loader').addClass('hidden');
                $('#itemContent_section').removeClass('hidden');
                $('#item_evaluations').removeClass('hidden');
            }, 1000);
        }
        ;
        onStart();

    }]);




Coordinatormodule.controller('controllerUnitEvent', function ($scope, $http, $compile, $rootScope, postService, getService, $timeout) {
    $scope.unit = {presence: "false"};
    $scope.openEvent = function (sUnitEvent, refuse) {
        sUnitEvent.refuse = refuse;
        $scope.BackUp = angular.copy(sUnitEvent);
//        $scope.BackUp.date = new Date(parseInt($scope.BackUp.date)); 
//        alert("teste" + $scope.BackUp.date);
        $scope.selectUnitEvent = $scope.BackUp;
//        alert( $scope.selectevent.name);            
    };
    $rootScope.acceptEvent = function (selectUnitEvent) {
        $rootScope.audience = selectUnitEvent;
        $rootScope.audience.number = null;
        $("#modalGeralUnit").modal("show");
    };
    $rootScope.audiences = function (audience) {
        $rootScope.audienceMessShow = false;
        if (audience.number > 0) {
            var dados = {unit_event_id: audience.id, eventid: audience.event_id, unitpublic: audience.number, eventname: audience.name, uniteventname: audience.unit.name, action: "acceptUnitEvents"};
            var url = $rootScope.ctx_path + "/data/schedule/coordinator.jsp";
            postService.query(dados, url).then(function (re) {
                $("#modalGeralUnit").modal("hide");
                if (re.data.aux === "1") {
                    modal_success(re.data.re);
                } else {
                    modal_success(re.data.re);
                }
            }).catch(function (data) {
                $("#modalGeralUnit").modal("hide");
                modal_error();
            });
        } else {
            $(".modal-body #audienceMess").text("O público deve ser maior que zero.");
            $(".modal-body #audienceMess").attr("class", "alert alert-danger");
            $rootScope.audienceMessShow = true;
            $timeout(function () {
                $rootScope.audienceMessShow = false;
            }, 3000);
        }
    };
    $rootScope.sendJus = function (unitSelect) {
        if (unitSelect.justification) {
            var dados = {event_id: unitSelect.event_id, event_name: unitSelect.name, unit_name: unitSelect.unit.name, unit_event_id: unitSelect.id, justification: unitSelect.justification, action: "recuseUnitEvents"};
            var url = $rootScope.ctx_path + "/data/schedule/coordinator.jsp";
            $("#loader").css("display", "block");
            postService.query(dados, url).then(function (re) {
                $("#modalRefuseEvent").modal("hide");
                $("#loader").css("display", "none");
                if (re.data.aux === "1") {
                    modal_success(re.data.re);
                } else {
                    modal_success(re.data.re);
                }
            }).catch(function () {
                $("#modalRefuseEvent").modal("hide");
                $("#loader").css("display", "none");
                modal_error();
            });
        }
    };
    $scope.recuseEvent = function (selectUnitEvent) {
        $("#modalRefuseEvent").modal("show");
        $rootScope.unitSelect = selectUnitEvent;
    };
    $scope.openSupport = function (support, refuse, whoSelected) {
        support.refuse = refuse;
        support.whoSelected = whoSelected;
        $scope.BackUp = angular.copy(support);
        $scope.selectSupportEvent = $scope.BackUp;
    };
    var sup = {};
    $scope.acceptSupport = function (support) {
        sup = support;
        $("#supLoad").css("display", "none");
        $("#acceptSupport p").text("Aceita o apoio " + support.support + " da empresa " + support.company.name + "?");
        $("#acceptSupport").modal("show");
    };
    acceptSupport = function () {
        var dados = {support_id: sup.support_id, support: sup.support, theme: sup.theme, event_date: sup.event_date, company_name: sup.company.name, company_email: sup.company.email, unit: sup.unit, coordinator_name: sup.coordinator.name, coordinator_email: sup.coordinator.email, event_id: sup.event_id, action: "acceptSupport"};
        var url = $rootScope.ctx_path + "/data/schedule/coordinator.jsp";
        $("#supLoad").css("display", "block");
        postService.query(dados, url).then(function (response) {
            $("#acceptSupport").modal("hide");
            $("#supLoad").css("display", "none");
            if (response.data.aux === "1") {
                modal_success(response.data.re);
            } else {
                modal_success(response.data.re);
            }
        }).catch(function (data) {
            $("#supLoad").css("display", "none");
            modal_error();
        });
    };
    $scope.refuseSupport = function (support) {
        $rootScope.supSelected = support;
        $("#modalRefuseSupport").modal("show");
    };
    $("#reLoader").css("display", "none");
    $rootScope.sendJusSup = function (supSelected) {
        if (supSelected.justification) {
            var dados = {support_id: supSelected.support_id, support: supSelected.support,
                theme: supSelected.theme, event_date: supSelected.event_date, company_name: supSelected.company.name,
                company_email: supSelected.company.email, unit: supSelected.unit,
                coordinator_name: supSelected.coordinator.name, coordinator_email: supSelected.coordinator.email,
                justification: supSelected.justification, event_id: supSelected.event_id, action: "refuseSupport"};
            var url = $rootScope.ctx_path + "/data/schedule/coordinator.jsp";
            $("#reLoader").css("display", "block");
            postService.query(dados, url).then(function (re) {
                $("#modalRefuseSupport").modal("hide");
                $("#reLoader").css("display", "none");
                if (re.data.aux === "1") {
                    modal_success(re.data.re);
                } else {
                    modal_success(re.data.re);
                }
            }).catch(function () {
                $("#modalRefuseSupport").modal("hide");
                $("#reLoader").css("display", "none");
                modal_error();
            });
        }
    };

//    $scope.att = function () {        
//        $rootScope.getUnitEvents();
//        $rootScope.getUnitConfirmedEvents();
//        $rootScope.getUnitCompletedEvents();
//    };

    $rootScope.getNoEvaluations = function () {
        var url = $rootScope.ctx_path + "/data/schedule/coordinator.jsp?action=getNoEvaluations";
        getService.query(url).then(function (re) {
            if (re.data.re) {
                $rootScope.nEvaluationsError = re.data.re;
            } else {
                $rootScope.nEvaluations = re.data.nEvaluations;
            }
        }).catch(function (data) {
            modal_error();
        });
    };
    $rootScope.getNoEvaluations();
    $scope.selectAtt = function (att) {
        $scope.attSol();
    };
    $scope.attSol = function () {
        $rootScope.getUnitEvents();
        $('#item-request-event').addClass('active in');
        $("#attER").removeAttr("class");
        $("#attEC").removeAttr("class");
        $("#attSup").removeAttr("class");
        $("#attSupCon").removeAttr("class");
        $("#attSupConclu").removeAttr("class");
//        $("#attSol").prop("class", "active");
    };
    $scope.attSup = function () {
        $('#item-request-support').removeClass('active in');
        $('#item-request-support').addClass('active in');
        $rootScope.getUnitEventsSupportProposal();
    };
    $scope.attEC = function () {
        $('#item-confirmed-event').removeClass('active in');
        $('#item-confirmed-event').addClass('active in');
        $rootScope.getUnitConfirmedEvents();
    };
    $scope.attER = function () {
        $('#item-last-event').removeClass('active in');
        $('#item-last-event').addClass('active in');
        $rootScope.getUnitCompletedEvents();

    };
    $scope.attAv = function () {
        $('#item-evaluation-event').removeClass('active in');
        $('#item-evaluation-event').addClass('active in');
        $rootScope.getUnitAvaluetionEvents();
    };
    $scope.attED = function () {
        $rootScope.getEditUnit();
    };
    $scope.attSupCon = function () {
        $('#item-request-support').removeClass('active in');
        $('#item-request-support').addClass('active in');
        $rootScope.getUnitEventsConfirmedSupport();
    };
    $scope.attSupConclu = function () {
        $('#item-request-support').removeClass('active in');
        $('#item-request-support').addClass('active in');
        $rootScope.getUnitEventsConcludedSupport();
    };
});

Coordinatormodule.controller('controllerListEventUnit', function ($scope, $http, $compile, $rootScope, postService) {
    $scope.x = 'event';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.unitEvents = [];
    $scope.qtdPage = 20;
    $scope.totalUnitEvents = 0;
    var lastPage = 1;
    $scope.searchEvents = "";
    $scope.queryBy = "";
    $scope.selectQtd = function (qtd) {
        $scope.qtdPage = qtd;
        getResultsPage(lastPage);
        $scope.pagination.current = 1;
    };
    getResultsPage(1);
//    $rootScope.getUnitEvents = function () {
//      alert($rootScope.idUnit); action=getManagerEvents&id="+$rootScope.codigoInscricao
    $scope.pagination = {
        current: 1
    };
    $scope.pageChanged = function (newPage) {
        getResultsPage(newPage);
    };
    $scope.callBack = function () {
        getResultsPage(1);
    };
    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalUnitEvents < $scope.unitEventsSize)) {
            $scope.totalUnitEvents = (parseInt($scope.totalUnitEvents) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $http.get($rootScope.ctx_path + "/data/schedule/coordinator.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchEvents + "&action=getUnitEvents")
                .then((response) => {
                    $rootScope.viewU = false;
                    if (!response.data.unitEvents) {
                        $scope.selectError = response.data.re;
                        $scope.unitEvents = null;
                        $scope.unitEventsSize = null;
                        $rootScope.viewU = true;
                    } else {
                        $scope.unitEvents = response.data.unitEvents;
                        $scope.selectError = null;
                        $scope.unitEventsSize = response.data.unitEvents[0]["size"];
                        $rootScope.viewU = false;
                    }
                });
    }
//    };
    $rootScope.getUnitEvents = function () {
        getResultsPage(1);
    };

});

Coordinatormodule.controller('ControllerUnitEventsSupportProposal', function ($scope, $http, $compile, $rootScope, postService) {
    $scope.x = 'support';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.supportProposals = [];
    $scope.qtdPage = 20;
    $scope.totalSupportProposals = 0;
    var lastPage = 1;
    $scope.searchSupports = "";
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
    $scope.callBack = function () {
        getResultsPage(1);
    };
    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalSupportProposals < $scope.supportProposalsSize)) {
            $scope.totalSupportProposals = (parseInt($scope.totalSupportProposals) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $http.get($rootScope.ctx_path + "/data/schedule/coordinator.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchSupports + "&action=getUnitEventsSupportProposal")
                .then((response) => {
                    $rootScope.viewPro = false;
                    if (!response.data.supportProposal) {
                        $scope.selectError = response.data.re;
                        $scope.supportProposals = null;
                        $scope.supportProposalsSize = null;
                        $rootScope.viewPro = true;
                    } else {
                        $scope.supportProposals = response.data.supportProposal;
                        $scope.selectError = null;
                        $scope.supportProposalsSize = response.data.supportProposal[0]["size"];
                        $rootScope.viewPro = false;
                    }
                });
    }
    $rootScope.getUnitEventsSupportProposal = function () {
        getResultsPage(1);
    };
});
Coordinatormodule.controller('ControllerUnitEventsConfirmedSupport', function ($scope, $http, $rootScope) {
    $scope.x = 'support';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.confirmedSupports = [];
    $scope.qtdPage = 20;
    $scope.totalConfirmedSupports = 0;
    var lastPage = 1;
    $scope.searchConfirmedSupports = "";
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
    $scope.callBack = function () {
        getResultsPage(1);
    };
    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalConfirmedSupports < $scope.confirmedSupportsSize)) {
            $scope.totalConfirmedSupports = (parseInt($scope.totalConfirmedSupports) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $http.get($rootScope.ctx_path + "/data/schedule/coordinator.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchConfirmedSupports + "&action=getUnitEventsConfirmedSupport")
                .then((response) => {
                    $rootScope.viewProCon = false;
                    if (!response.data.confirmedSupports) {
                        $scope.selectError = response.data.re;
                        $scope.confirmedSupports = null;
                        $scope.confirmedSupportsSize = null;
                        $rootScope.viewProCon = true;
                    } else {
                        $scope.confirmedSupports = response.data.confirmedSupports;
                        $scope.selectError = null;
                        $scope.confirmedSupportsSize = response.data.confirmedSupports[0]["size"];
                        $rootScope.viewProCon = false;
                    }
                });
    }
    $rootScope.getUnitEventsConfirmedSupport = function () {
        getResultsPage(1);
    };
});
Coordinatormodule.controller('ControllerUnitEventsConcludedSupport', function ($scope, $http, $rootScope) {
    $scope.x = 'support';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.concludedSupports = [];
    $scope.qtdPage = 20;
    $scope.totalConcludedSupports = 0;
    var lastPage = 1;
    $scope.searchConcludedSupports = "";
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
    $scope.callBack = function () {
        getResultsPage(1);
    };
    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalConcludedSupports < $scope.concludedSupportsSize)) {
            $scope.totalConcludedSupports = (parseInt($scope.totalConcludedSupports) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $http.get($rootScope.ctx_path + "/data/schedule/coordinator.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchConcludedSupports + "&action=getUnitEventsConcludedSupport")
                .then((response) => {
                    $rootScope.viewProConcluded = false;
                    if (!response.data.concludedSupports) {
                        $scope.selectError = response.data.re;
                        $scope.concludedSupports = null;
                        $scope.concludedSupportsSize = null;
                        $rootScope.viewProConcluded = true;
                    } else {
                        $scope.concludedSupports = response.data.concludedSupports;
                        $scope.selectError = null;
                        $scope.concludedSupportsSize = response.data.concludedSupports[0]["size"];
                        $rootScope.viewProConcluded = false;
                    }
                });
    }
    $rootScope.getUnitEventsConcludedSupport = function () {
        getResultsPage(1);
    };
});

Coordinatormodule.controller('controllerListConfirmedEventUnit', function ($scope, $http, $compile, $rootScope, postService) {
    $scope.x = 'event';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.unitConfirmedEvents = [];
    $scope.qtdPage = 20;
    $scope.totalConfirmedEvents = 0;
    var lastPage = 1;
    $scope.searchConfirmedUnit = "";
    $scope.queryBy = "";
    $scope.selectQtd = function (qtd) {
        $scope.qtdPage = qtd;
        getResultsPage(lastPage);
        $scope.pagination.current = 1;
    };
//    getResultsPage(1);
//    $rootScope.getUnitEvents = function () {
//      alert($rootScope.idUnit); action=getManagerEvents&id="+$rootScope.codigoInscricao
    $scope.participateListing = function (unit_event_id, event_name, event_date) {
        $rootScope.unit_event_id = unit_event_id;
        $rootScope.event_name = event_name;
        $rootScope.event_date = event_date;
        $rootScope.getListPritings();
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
    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalConfirmedEvents < $scope.unitConfirmedSize)) {
            $scope.totalConfirmedEvents = (parseInt($scope.totalConfirmedEvents) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
//    $rootScope.getUnitConfirmedEvents = function () {
//      alert($rootScope.idAgent); action=getManagerEvents&id="+$rootScope.codigoInscricao
        $http.get($rootScope.ctx_path + "/data/schedule/coordinator.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchConfirmedUnit + "&action=getUnitConfirmedEvents")
                .then((response) => {
                    $rootScope.viewCU = false;
                    if (!response.data.unitConfirmedEvents) {
                        $scope.selectError = response.data.re;
                        $scope.unitConfirmedEvents = null;
                        $scope.unitConfirmedSize = null;
                        $rootScope.viewCU = true;
                    } else {
                        $scope.unitConfirmedEvents = response.data.unitConfirmedEvents;
                        $scope.unitConfirmedSize = response.data.unitConfirmedEvents[0]["size"];
                        $scope.selectError = null;
                        $rootScope.viewCU = false;
                    }
                });
//    };
    }
    $rootScope.getUnitConfirmedEvents = function () {
        getResultsPage(1);
    };

});


Coordinatormodule.controller('controllerListCompletedEventUnit', function ($scope, $http, $compile, $rootScope, postService) {
    $scope.x = 'event';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.unitCompletedEvents = [];
    $scope.qtdPage = 20;
    $scope.totalCompletedEvents = 0;
    var lastPage = 1;
    $scope.searchCompletedEvents = "";
    $scope.queryBy = "";
    $scope.selectQtd = function (qtd) {
        $scope.qtdPage = qtd;
        getResultsPage(lastPage);
        $scope.pagination.current = 1;
    };
//    getResultsPage(1);
    $scope.participateListing = function (unit_event_id, event_name, event_date) {
        $rootScope.unit_event_id = unit_event_id;
        $rootScope.event_name = event_name;
        $rootScope.event_date = event_date;
        $rootScope.getListPresence();
    };
    $scope.shiftAvaliation = function (id, event_id) {
        $rootScope.getSpecificAvaliation(id, event_id);
        $("#attER").removeAttr("class");
        $("#attAV").prop("class", "active");
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
    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalCompletedEvents < $scope.unitCompletedSize)) {
            $scope.totalCompletedEvents = (parseInt($scope.totalCompletedEvents) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
//    $rootScope.getUnitCompletedEvents = function () {
//      alert($rootScope.idAgent); action=getManagerEvents&id="+$rootScope.codigoInscricao
        $http.get($rootScope.ctx_path + "/data/schedule/coordinator.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchCompletedEvents + "&action=getUnitCompletedEvents")
                .then((response) => {
                    $rootScope.viewComU = false;
                    if (!response.data.unitCompletedEvents) {
                        $scope.selectError = response.data.re;
                        $rootScope.viewComU = true;
                        $scope.unitCompletedEvents = null;
                        $scope.unitCompletedSize = null;
                    } else {
                        $scope.unitCompletedEvents = response.data.unitCompletedEvents;
                        $scope.unitCompletedSize = response.data.unitCompletedEvents[0]["size"];
                        $scope.selectError = null;
                        $rootScope.viewComU = false;
                    }
                });

//    };
    }
    $rootScope.getUnitCompletedEvents = function () {
        getResultsPage(1);
    };
});

Coordinatormodule.controller('controllerListAvaluationEventUnit', function ($scope, $http, $compile, $rootScope, postService, warningServicePost) {
    $scope.x = 'event';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.unitAvaluationEvents = [];
    $scope.qtdPage = 20;
    $scope.totalAvaluationEvents = 0;
    var lastPage = 1;
    $scope.searchAvaluationEvents = "";
    $scope.queryBy = "";
    $scope.selectQtd = function (qtd) {
        $scope.qtdPage = qtd;
        getResultsPage(lastPage);
        $scope.pagination.current = 1;
    };
    //getResultsPage(1);
    $scope.abreEditar = function (href, schedule, grade) {
        if (grade) {
            $(href).modal('show');
            $scope.BackUp = angular.copy(schedule);
            $scope.unit = $scope.BackUp;
            $scope.unit = {id: $scope.BackUp.unitId, unitGrade: grade};
            $("#includeButtonGra").removeAttr("disabled");
        }
    };
    $rootScope.getSpecificAvaliation = function (id, event_id) {
        $http.get($rootScope.ctx_path + "/data/schedule/coordinator.jsp?id=" + id + "&event_id=" + event_id + "&action=getSpecificAvaliation")
                .then((response) => {
                    $rootScope.viewAvU = false;
                    if (!response.data.specificAvaliation) {
                        $scope.selectError = response.data.re;
                        $rootScope.viewAvU = true;
                        $scope.unitAvaluationEvents = null;
                        $scope.unitAvaluationsSize = null;
                    } else {
                        $scope.unitAvaluationEvents = response.data.specificAvaliation;
                        $scope.unitAvaluationsSize = response.data.specificAvaliation[0]["size"];
                        $scope.selectError = null;
                        $rootScope.viewAvU = false;
                    }
                });
    };
    $scope.fechamodal = function () {
        $("#updateGrade").modal('hide');
        delete $rootScope.unit;
        $scope.gradeForm.$setPristine();
    };
    $scope.unitGrade = function (unit) {
        var selecionado = {id: unit.id, grade: unit.unitGrade, action: 'updateGrade'};
        var url = $rootScope.ctx_path + "/data/schedule/coordinator.jsp";
        postService.query(selecionado, url).then(function (re) {
            warningServicePost.warningBar(re, "#updateGrade", $scope);
            getResultsPage(lastPage);
            $rootScope.getNoEvaluations();
            $("#includeButtonGra").prop("disabled", "true");
        }).catch(function (status) {
            alert("Falha ao executar o post. " + status);
        });
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
    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalAvaluationEvents < $scope.unitAvaluationsSize)) {
            $scope.totalAvaluationEvents = (parseInt($scope.totalAvaluationEvents) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
//    $rootScope.getUnitAvaluetionEvents = function () {
//      alert($rootScope.idAgent); action=getManagerEvents&id="+$rootScope.codigoInscricao
        $http.get($rootScope.ctx_path + "/data/schedule/coordinator.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchAvaluationEvents + "&action=getUnitAvaluationEvents")
                .then((response) => {
                    $rootScope.viewAvU = false;

                    if (!response.data.UnitAvaluationEvents) {
                        $scope.selectError = response.data.re;
                        $rootScope.viewAvU = true;
                        $scope.unitAvaluationEvents = null;
                        $scope.unitAvaluationsSize = null;
                    } else {
                        $scope.unitAvaluationEvents = response.data.UnitAvaluationEvents;
                        $scope.unitAvaluationsSize = response.data.UnitAvaluationEvents[0]["size"];
                        $scope.selectError = null;
                        $rootScope.viewAvU = false;
                    }
                });
    }
    ;
    $rootScope.getUnitAvaluetionEvents = function () {
        getResultsPage(1);
    };
});

Coordinatormodule.controller('ControllerListPresence', function ($scope, $http, $rootScope, postService, warningServicePost, $timeout, Upload) {
    $scope.x = 'name';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.participates = [];
    $scope.qtdPage = 20;
    $scope.totalParticipates = 0;
    var lastPage = 1;
    $scope.searchPresenceList = "";
    $scope.queryBy = "";
    $scope.selectQtd = function (qtd) {
        $scope.qtdPage = qtd;
        getResultsPage(lastPage);
        $scope.pagination.current = 1;
    };
//    getResultsPage(1);
    var certificate = [];
    $scope.participateCert = function (id, cert) {

        if (certificate.indexOf(id + " true") > -1) {
            certificate.splice(certificate.indexOf(id + " true"), 1);
        } else {
            if (cert) {
                certificate.push(id + " " + cert);
            }
        }
        if (certificate.indexOf(id + " false") > -1) {
            certificate.splice(certificate.indexOf(id + " false"), 1);
        } else {
            if (!cert) {
                certificate.push(id + " " + cert);
            }
        }
    };

    $("#btnJaListado").tooltip();
    var filemsg = "";

    ($("#uploadSignedList").click(function () {
        $("#fileMsg").remove();
        filemsg = 'Nenhum arquivo selecionado.';
        $("#btnPresence").attr("disabled", true);
        $(".upload-btn-wrapper").append("<p id='fileMsg'>" + filemsg + "</p>");

    }));

    $scope.changeSendParticipateList = function () {
        $("#fileMsg").remove();


        var fullPath = document.getElementById('uploadSignedList').value;

        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);

            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
        }

        if (filename === null) {
            filemsg = 'Nenhum arquivo selecionado.';
            $("#btnPresence").attr("disabled", true);

        } else {
            filemsg = 'Arquivo selecionado: <b>' + filename + '</b>';
            $("#btnPresence").removeAttr("disabled");

        }

        $(".upload-btn-wrapper").append("<p id='fileMsg'>" + filemsg + "</p>");
    };

    var unit_event_id;
    var event_id;
    $scope.abreAdd = function (signedList) {
        if (certificate.length) {
            var stringfyArray = JSON.stringify(certificate);
            var data = {presences: stringfyArray, signedList: signedList, unit_event_id: unit_event_id, event_id: event_id};
            var url;

            signedList.upload = Upload.upload({
                url: $rootScope.ctx_path + "/data/schedule/coordinator.jsp?action=updatePresences",
                data: {data},
                method: 'POST',
                headers: {'content-type': undefined}
            });
            signedList.upload.then(function (response) {
                $timeout(function () {
                    signedList.result = response.data;
                });
                if (!!response.data.aux) {
                    $("#listSentSuccess").modal('show');

                    $("#btnPresence").attr("disabled", true);

                } else {
                    $("#listSentError").modal('show');

                }
            });

//                postService.query(url, data).then(function (re) {
//                $("#listSentSuccess").modal('hide');
//                $("#listSentSuccess").modal('show');
//                $timeout(function () {
//                                $("#listSentSuccess").modal("hide");
//                            }, 2000);
//                            alert("teste");
//            }).catch(function () {
//                $("#listSentError").modal('show');
//                $timeout(function () {
//                                $("#listSentError").modal("hide");
//                            }, 3000);
//            });



        }


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
    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalParticipates < $scope.participatesSize)) {
            $scope.totalParticipates = (parseInt($scope.totalParticipates) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $scope.eventParticipateListName = $rootScope.event_name;
        $scope.eventParticipateListDate = $rootScope.event_date;

        $http.get($rootScope.ctx_path + "/data/schedule/coordinator.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchPresenceList + "&action=getListingEvent&unit_event_id=" + $rootScope.unit_event_id)
                .then((response) => {
                    $scope.viewPL = false;

                    if (!response.data.participateList) {
                        $scope.selectError = response.data.re;
                        $scope.participates = null;
                        $scope.participatesSize = null;
                        $scope.viewPL = true;
                    } else {
                        $scope.participates = response.data.participateList;
                        $scope.participatesSize = response.data.participateList[0]["size"];
                        event_id = response.data.participateList[0]["event_id"];
                        unit_event_id = response.data.participateList[0]["unit_event_id"];

                        $scope.selectError = null;
                        $scope.viewPL = false;
                    }
                });
    }
    $rootScope.getListPresence = function () {
        getResultsPage(lastPage);
    };
});
Coordinatormodule.controller('ControllerListPrinting', function ($scope, $http, $rootScope) {
    $scope.x = 'name';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.prints = [];
    $scope.qtdPage = 20;
    $scope.totalParticipates = 0;
    var lastPage = 1;
    $scope.searchPrintingList = "";
    $scope.queryBy = "";
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
    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalParticipates < $scope.printingsSize)) {
            $scope.totalParticipates = (parseInt($scope.totalParticipates) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $scope.eventParticipateListName = $rootScope.event_name;
        $scope.eventParticipateListDate = $rootScope.event_date;
        $http.get($rootScope.ctx_path + "/data/schedule/coordinator.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchPrintingList + "&action=getListingEvent&unit_event_id=" + $rootScope.unit_event_id)
                .then((response) => {
                    $scope.viewPL = false;

                    if (!response.data.participateList) {
                        $scope.selectError = response.data.re;
                        $scope.prints = null;
                        $scope.printingsSize = null;
                        $scope.viewPL = true;
                    } else {
                        $scope.prints = response.data.participateList;
                        $scope.printingsSize = response.data.participateList[0]["size"];
                        $scope.selectError = null;
                        $scope.viewPL = false;
                    }
                });
    }
    $rootScope.getListPritings = function () {
        getResultsPage(lastPage);
    };
});
Coordinatormodule.controller('ControllerEditUnit', function ($scope, $http, $compile, $rootScope, postService, warningServicePost) {
    $rootScope.getEditUnit = function () {
        $scope.checkBox = {projector: false, acoustic: false, computer: false, chair: false, table: false};
        $http.get($rootScope.ctx_path + "/data/schedule/coordinator.jsp?action=getEditUnit")
                .then((response) => {
                    $rootScope.viewEditU = false;
                    $scope.unitEditUnit = [];
                    if (!response.data.unitEditUnit) {
                        $scope.selectError = response.data.re;
                        $rootScope.viewEditU = true;
                    } else {
                        $scope.unitEditUnit = response.data.unitEditUnit;
                        var checkBox = JSON.parse($scope.unitEditUnit.resources);
                        $scope.checkBox = checkBox;
                        if (checkBox.otherR) {
                            $scope.other = true;
                        } else {
                            $scope.other = false;
                        }
                        ;
                        $scope.selectError = null;
                        $rootScope.viewEditU = false;
                    }
                });
    };
    $scope.upUnit = function (unit) {
        var re = JSON.stringify($scope.checkBox);
        var selecionado = {id: unit.unit_id, resources: re, public: unit.public, action: 'updateEventUnit'};
        var url = $rootScope.ctx_path + "/data/schedule/coordinator.jsp";
        postService.query(selecionado, url).then(function (re) {
            warningServicePost.warningBar(re, "", $scope);
            $rootScope.getEditUnit();
        }).catch(function (status) {
            modal_error();
        });
    };
    //$rootScope.getUnitCompletedEvents();
});
Coordinatormodule.controller('controllerActivities', function ($scope, $http, $compile, $rootScope, postService, getService) {
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
        var url = $rootScope.ctx_path + "/data/schedule/coordinator.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.search + "&action=getActivities" + "&event_id=" + $scope.event.id;
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
            $scope.loading = false;

        }).catch(() => {
            $scope.activitiesError = 'Falha ao trazer Dados';
            $scope.activitiesList = null;
            $scope.activitiesListSize = 0;
            $scope.loading = false;
        });
    }

    var url = $rootScope.ctx_path + "/data/select-dropdown.jsp?&action=myEvents&actor=c";
    getService.query(url).then(function (response) {
        if (!!response.data.error) {
            $scope.events = response.data.error;
            $scope.event = {'id': -2};
        } else {
            $scope.events = response.data.event_list;
        }
    });

});

Coordinatormodule.factory('postService', ['$http', function ($http) {
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

//SERVICE QUE FAZ O GET DE FORMA SIMPLIFICADA
Coordinatormodule.factory('getService', ['$http', function ($http) {
        return {
            query: function (url) {
                return $http.get(url);
            }
        };
    }]);
Coordinatormodule.factory('warningServicePost', ['$timeout', function ($timeout) {
        return {
            warningBar: function (response, id, $scope) {
                if (response.data.re !== null) {
                    $scope.show = true;
                    $scope.eventMess = response.data.re;
                    $(id).animate({scrollTop: 0}, 500);
                    if (response.data.aux === "1") {
                        $(".modal-body #eventMess").attr("class", "alert alert-success");
                    } else {
                        $(".modal-body #eventMess").attr("class", "alert alert-danger");
                    }
                    $timeout(function () {
                        $scope.eventMess = null;
                        $(".modal-body #eventMess").removeClass();
                        $scope.show = false;
                    }, 5000);
                }
            }
        };
    }]);
Coordinatormodule.factory("getInterception", ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
        var xhr = 0;
        function isLoading() {
            return xhr > 0;
        }
        function updateStatus() {
            $rootScope.loadingGet = isLoading();
        }

        return {
            request: function (config) {
                xhr++;
                if (config.method === "GET") {
                    updateStatus();
                }
                return config;
            },
            requestError: function (rejection) {
                xhr--;
                updateStatus();
                $log.error('Request Error: ', rejection);
                return $q.reject(rejection);
            },
            response: function (response) {
                xhr--;
                updateStatus();
                return response;
            },
            responseError: function (rejection) {
                xhr--;
                updateStatus();
                $log.error('Response Error: ', rejection);
                return $q.reject(rejection);
            }
        };
    }]);
Coordinatormodule.factory("postInterception", ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
        var xhr = 0;
        function isLoading() {
            return xhr > 0;
        }
        function updateStatus() {
            $rootScope.loadingPost = isLoading();
        }

        return {
            request: function (config) {
                xhr++;
                if (config.method === "POST") {
                    updateStatus();
                }
                return config;
            },
            requestError: function (rejection) {
                xhr--;
                updateStatus();
                $log.error('Request Error: ', rejection);
                return $q.reject(rejection);
            },
            response: function (response) {
                xhr--;
                updateStatus();
                return response;
            },
            responseError: function (rejection) {
                xhr--;
                updateStatus();
                $log.error('Response Error: ', rejection);
                return $q.reject(rejection);
            }
        };
    }]);
Coordinatormodule.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push("getInterception");
        $httpProvider.interceptors.push("postInterception");
    }]);
