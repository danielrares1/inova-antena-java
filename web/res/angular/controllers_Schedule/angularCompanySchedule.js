var CompanyModule = angular.module("CompanyModule", ["angularUtils.directives.dirPagination"]);

CompanyModule.run(['$rootScope', '$window', function ($rootScope, $window) {

        $rootScope.ctx_path = $window.ctx_path;
    }]);
CompanyModule.factory('postService', ['$http', function ($http) {
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
CompanyModule.factory('getService', ['$http', function ($http) {
        return {
            query: function (url) {
                return $http.get(url);
            }
        };
    }]);
CompanyModule.controller('ControllerCompanyEvent', ['$scope', '$rootScope', 'getService', 'postService', '$timeout', function ($scope, $rootScope, getService, postService, $timeout) {

        $rootScope.openEvent = function (event, whoSelected) {
            $rootScope.selectUnitEvent = event;
            $rootScope.selectUnitEvent.whoSelected = whoSelected;
            var url = $rootScope.ctx_path + "/data/schedule/company.jsp?action=getEventDetail&event_id=" + event.id;
            getService.query(url).then((response) => {
                $rootScope.unitInform = response.data.eventDetails;
            });
        };
        $rootScope.openSupport = function (event, whoSelected) {
            $rootScope.selectSupportedEvent = event;
            $rootScope.selectSupportedEvent.whoSelected = whoSelected;
        };
        $scope.isSupport = false;
        var unitEventSupport = [];
        var supportArray = ["0", "1", "2", "3"];
        var supportObject = {"objectArray": []};
        var aux = 0;
        var ind = 0;
        $scope.getUnitEvent = function (unit_Event_id, sup, support, i) {
            aux = 0;
            for (var i = 0; i < supportArray.length; i++) {
                if (unitEventSupport.indexOf(unit_Event_id + " " + supportArray[i]) > -1) {
                    if (sup == false && support == "") {
                        supportObject.objectArray.push({"unit_id": unit_Event_id, "support": supportArray[i]});
                    }
                    unitEventSupport.splice(unitEventSupport.indexOf(unit_Event_id + " " + supportArray[i]), 1);
                }
            }
            for (i in supportObject.objectArray) {
                if (supportObject.objectArray[i].unit_id == unit_Event_id) {
                    ++aux;
                    if (aux == 1) {
                        ind = i;
                    }
                }
            }
            if (aux > 1) {
                delete supportObject.objectArray[ind];
            }
            if (support) {
                supportObject.objectArray.push({"unit_id": unit_Event_id, "support": support});
                unitEventSupport.push(unit_Event_id + " " + support);
            } else {
                if (sup) {
                    var i = 0;
                    for (i in supportObject.objectArray) {
                        if (supportObject.objectArray[i].unit_id == unit_Event_id) {
                            unitEventSupport.push(unit_Event_id + " " + supportObject.objectArray[i].support);
                            delete supportObject.objectArray[i];
                        }
                    }
                }
            }
            if (unitEventSupport.length > 0) {
                $scope.isSupport = true;
            } else {
                $scope.isSupport = false;
            }
        };
        $scope.acceptSupport = function (event_id) {
            if (unitEventSupport.length > 0) {
                var selecionado = {unitSupport: unitEventSupport.toString(), event_id: event_id, action: "sendSupport"};
                var url = $rootScope.ctx_path + "/data/schedule/company.jsp";
                postService.query(selecionado, url).then(function (response) {
                    if (response.data.aux === "1") {
                        $scope.isSupport = false;
                        modal_success();
                    } else {
                        //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                        modal_error();
                    }
                }).catch(function (data) {
                    //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                    modal_error();
                });
            }
        };
        $scope.selectAtt = function (att) {
            if (att === '0') {
                $rootScope.attAllEvents();
                delete $scope.sup;
                delete $rootScope.unitInform;
                unitEventSupport = [];
            }
            if (att === '1') {
                $rootScope.attSupportProposalEvents();
            }
            if (att === '2') {
                $rootScope.attSupportDisabledEvents();
            }
            if (att === '3') {
                $rootScope.attSupportRefusedEvents();
            }
            if (att === '4') {
                $rootScope.attConfirmedEventsSupport();
            }
            if (att === '5') {
                $rootScope.attConcludedEventsSupport();
            }
        };
        $rootScope.attAllEvents = function () {
            $rootScope.getListAllEvents();
            $('#item-request-events').addClass('active in');
            $('#item-support-event').removeClass('active in');
            delete $scope.sup;
            delete $rootScope.unitInform;
            unitEventSupport = [];
        };
        $rootScope.attSupportProposalEvents = function () {
            $rootScope.getSupportProposalEvents();
            $('#item-view-event').removeClass('active in');
            $('#item-support-proposal-events').addClass('active in');
        };
        $rootScope.attSupportDisabledEvents = function () {
            $rootScope.getSupportDisabledEvents();
            $('#item-view-event').removeClass('active in');
            $('#item-support-disabled').addClass('active in');
        };
        $rootScope.attSupportRefusedEvents = function () {
            $rootScope.getSupportRefused();
            $('#item-view-event').removeClass('active in');
            $('#item-support-refused').addClass('active in');
        };
        $rootScope.attConfirmedEventsSupport = function () {
            $rootScope.getConfirmedEventsSupport();
            $('#item-view-event').removeClass('active in');
            $('#item-support-confirmed').addClass('active in');
        };
        $rootScope.attConcludedEventsSupport = function () {
            $rootScope.getConcludedEventsSupport();
            $('#item-view-event').removeClass('active in');
            $('#item-support-concluded').addClass('active in');
        };
        $rootScope.attActivitiesSupport = function () {
            $rootScope.geActivitiesSupport();
        };
    }]);
CompanyModule.controller('ControllerListAllEvents', ['$scope', '$rootScope', 'getService', function ($scope, $rootScope, getService) {
        $scope.x = 'event';
        $scope.myOrderBy = false;
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
            $scope.x = x;
        };
        $scope.enterpriseEvents = [];
        $scope.qtdPage = 20;
        $scope.totalEnterpriseEvents = 0;
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
        $scope.callBack = function () {
            getResultsPage(1);
        };
        function getResultsPage(pageNumber) {
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalEnterpriseEvents < $scope.enterpriseEventsSize)) {
                $scope.totalEnterpriseEvents = (parseInt($scope.totalEnterpriseEvents) + parseInt($scope.qtdPage));
            }
            lastPage = pageNumber;
            var url = $rootScope.ctx_path + "/data/schedule/company.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchEvents + "&action=getCompanyEvents";
            getService.query(url)
                    .then((response) => {
                        if (!response.data.companyEvents) {
                            $scope.selectError = response.data.re;
                            $scope.enterpriseEvents = null;
                            $scope.enterpriseEventsSize = null;
                        } else {
                            $scope.enterpriseEvents = response.data.companyEvents;
                            $scope.selectError = null;
                            $scope.enterpriseEventsSize = response.data.companyEvents[0]["size"];
                        }
                    });
        }
        $rootScope.getListAllEvents = function () {
            getResultsPage(1);
        };
    }]);
CompanyModule.controller('ControllerSupportProposalEvents', ['$scope', '$rootScope', 'getService', 'postService', 'warningServicePost', function ($scope, $rootScope, getService, postService, warningServiceGet) {
        $scope.x = 'thema';
        $scope.myOrderBy = false;
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
            $scope.x = x;
        };
        $scope.proposalEvents = [];
        $scope.qtdPage = 20;
        $scope.totalProposalEvents = 0;
        var lastPage = 1;
        $scope.searchProposals = "";
        $scope.queryBy = "";
        $scope.selectQtd = function (qtd) {
            $scope.qtdPage = qtd;
            getResultsPage(lastPage);
            $scope.pagination.current = 1;
        };
        $scope.disableSupport = function (proposalEvent) {
            $scope.supportSelected = {};
            $scope.supportSelected.support_id = proposalEvent.support_id;
            $scope.supportSelected.unit_event_id = proposalEvent.unit_event_id;
            $scope.supportSelected.support = proposalEvent.support;
            $scope.supportSelected.event_id = proposalEvent.event_id;
            $("#modalDisableSupport").modal("show");
        };
        $scope.sendJus = function (supportSelected) {
            var selecionado = {support_id: supportSelected.support_id, unitEventId: supportSelected.unit_event_id,
                support: supportSelected.support, justification: supportSelected.justification, event_id: supportSelected.event_id, action: "disableSupport"};
            var url = $rootScope.ctx_path + "/data/schedule/company.jsp";
            postService.query(selecionado, url).then(function (response) {
                if (response.data.aux === "1") {
                    $("#modalDisableSupport").modal("hide");
                    modal_success();
                    getResultsPage(lastPage);
                } else {
                    $("#modalDisableSupport").modal("hide");
                    //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                    modal_error();
                    getResultsPage(lastPage);
                }
            }).catch(function (data) {
                modal_error();
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalProposalEvents < $scope.proposalEventsSize)) {
                $scope.totalProposalEvents = (parseInt($scope.totalProposalEvents) + parseInt($scope.qtdPage));
            }
            lastPage = pageNumber;
            var url = $rootScope.ctx_path + "/data/schedule/company.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchProposals + "&action=getSupportProposalEvents";
            getService.query(url)
                    .then((response) => {
                        if (!response.data.proposalEvents) {
                            $scope.selectError = response.data.re;
                            $scope.proposalEvents = null;
                            $scope.proposalEventsSize = null;
                        } else {
                            $scope.proposalEvents = response.data.proposalEvents;
                            $scope.selectError = null;
                            $scope.proposalEventsSize = response.data.proposalEvents[0]["size"];
                        }
                    });
        }
        $rootScope.getSupportProposalEvents = function () {
            getResultsPage(1);
        };
    }]);
CompanyModule.controller('ControllerSupportDisabledEvents', ['$scope', '$rootScope', 'getService', 'postService', 'warningServicePost', function ($scope, $rootScope, getService, postService, warningServiceGet) {
        $scope.x = 'thema';
        $scope.myOrderBy = false;
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
            $scope.x = x;
        };
        $scope.disabledEventsProposal = [];
        $scope.qtdPage = 20;
        $scope.totalDisabledEventsProposal = 0;
        var lastPage = 1;
        $scope.searchDisabled = "";
        $scope.queryBy = "";
        $scope.selectQtd = function (qtd) {
            $scope.qtdPage = qtd;
            getResultsPage(lastPage);
            $scope.pagination.current = 1;
        };
        $scope.updateDisabledSupport = function (disabledEvent) {
            $scope.updateSupport = {};
            $scope.updateSupport.support_id = disabledEvent.support_id;
            $scope.updateSupport.unit_event_id = disabledEvent.unit_event_id;
            $scope.updateSupport.support = disabledEvent.support;
            $scope.updateSupport.event_id = disabledEvent.event_id;
            $("#updateDisabledSupport").modal("show");
        };
        $scope.upSupport = function (updateSupport) {
            var selecionado = {support_id: updateSupport.support_id, unitEventId: updateSupport.unit_event_id,
                support: updateSupport.support, event_id: updateSupport.event_id, action: "updateDisabledSupport"};
            var url = $rootScope.ctx_path + "/data/schedule/company.jsp";
            postService.query(selecionado, url).then(function (response) {
                if (response.data.aux === "1") {
                    $("#updateDisabledSupport").modal("hide");
                    modal_success(response.data.re);
                    getResultsPage(lastPage);
                } else {
                    $("#updateDisabledSupport").modal("hide");
                    modal_success(response.data.re);
                }
            }).catch(function (data) {
                modal_error();
            });
        };
        var support_id;
        var unit_event_id;
        var support;
        var event_id;
        $scope.deleteDisabledSupport = function (disabledEvent) {
            support_id = disabledEvent.support_id;
            unit_event_id = disabledEvent.unit_event_id;
            support = disabledEvent.support;
            event_id = disabledEvent.event_id;
            var frase = "Você deseja excluir o apoio " + support + "?";
            $("#deleteDisabledSupport").modal("show");
            $("#deleteSupport p").empty().append(frase);
        };
        deleteSupport = function () {
            var selecionado = {support_id: support_id, unitEventId: unit_event_id,
                support: support, event_id: event_id, action: "deleteDisabledSupport"};
            var url = $rootScope.ctx_path + "/data/schedule/company.jsp";
            postService.query(selecionado, url).then(function (response) {
                getResultsPage(lastPage);
                $("#deleteDisabledSupport").modal("hide");
                modal_success(response.data.re);

            }).catch(function (data) {
                modal_error();
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalDisabledEventsProposal < $scope.disabledEventsProposalSize)) {
                $scope.totalDisabledEventsProposal = (parseInt($scope.totalDisabledEventsProposal) + parseInt($scope.qtdPage));
            }
            lastPage = pageNumber;
            var url = $rootScope.ctx_path + "/data/schedule/company.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchDisabled + "&action=getSupportDisabledEvents";
            getService.query(url)
                    .then((response) => {
                        if (!response.data.disabledEventsProposal) {
                            $scope.selectError = response.data.re;
                            $scope.disabledEventsProposal = null;
                            $scope.disabledEventsProposalSize = null;
                        } else {
                            $scope.disabledEventsProposal = response.data.disabledEventsProposal;
                            $scope.selectError = null;
                            $scope.disabledEventsProposalSize = response.data.disabledEventsProposal[0]["size"];
                        }
                    });
        }
        $rootScope.getSupportDisabledEvents = function () {
            getResultsPage(1);
        };
    }]);
CompanyModule.controller('ControllerSupportRefusedEvents', ['$scope', '$rootScope', 'getService', 'postService', function ($scope, $rootScope, getService, postService) {
        $scope.x = 'thema';
        $scope.myOrderBy = false;
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
            $scope.x = x;
        };
        $scope.refusedEvents = [];
        $scope.qtdPage = 20;
        $scope.totalRefusedEvents = 0;
        var lastPage = 1;
        $scope.searchRefused = "";
        $scope.queryBy = "";
        $scope.selectQtd = function (qtd) {
            $scope.qtdPage = qtd;
            getResultsPage(lastPage);
            $scope.pagination.current = 1;
        };
        $scope.updateRefusedSupport = function (refusedEvent) {
            $scope.updateRefused = {};
            $scope.updateRefused.support_id = refusedEvent.support_id;
            $scope.updateRefused.unit_event_id = refusedEvent.unit_event_id;
            $scope.updateRefused.support = refusedEvent.support;
            $scope.updateRefused.event_id = refusedEvent.event_id;
            $("#updateRefusedSupport").modal("show");
        };
        $scope.upRefused = function (updateRefused) {
            var selecionado = {support_id: updateRefused.support_id, unitEventId: updateRefused.unit_event_id,
                support: updateRefused.support, event_id: updateRefused.event_id, action: "updateRefusedSupport"};
            var url = $rootScope.ctx_path + "/data/schedule/company.jsp";
            postService.query(selecionado, url).then(function (response) {
                if (response.data.aux === "1") {
                    $("#updateRefusedSupport").modal("hide");
                    modal_success(response.data.re);

                    getResultsPage(lastPage);
                } else {
                    $("#updateRefusedSupport").modal("hide");
                    modal_success(response.data.re);

                }
            }).catch(function (data) {
                modal_error();
            });
        };
        var support_id;
        var unit_event_id;
        var support;
        var event_id;
        $scope.deleteRefusedSupport = function (disabledEvent) {
            support_id = disabledEvent.support_id;
            unit_event_id = disabledEvent.unit_event_id;
            support = disabledEvent.support;
            event_id = disabledEvent.event_id;
            var frase = "Você deseja excluir o apoio " + support + "?";
            $("#deleteRefusedSupport").modal("show");
            $("#deleteRefSupport p").empty().append(frase);
        };
        deleteReSupport = function () {
            var selecionado = {support_id: support_id, unitEventId: unit_event_id,
                support: support, event_id: event_id, action: "deleteDisabledSupport"};
            var url = $rootScope.ctx_path + "/data/schedule/company.jsp";
            postService.query(selecionado, url).then(function (response) {
                getResultsPage(lastPage);
                $("#deleteRefusedSupport").modal("hide");
                modal_success(response.data.re);
            }).catch(function (data) {
                modal_error();
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalRefusedEvents < $scope.refusedEventsSize)) {
                $scope.totalRefusedEvents = (parseInt($scope.totalRefusedEvents) + parseInt($scope.qtdPage));
            }
            lastPage = pageNumber;
            var url = $rootScope.ctx_path + "/data/schedule/company.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchRefused + "&action=getSupportRefusedEvents";
            getService.query(url)
                    .then((response) => {
                        if (!response.data.refusedEventsProposal) {
                            $scope.selectError = response.data.re;
                            $scope.refusedEvents = null;
                            $scope.refusedEventsSize = null;
                        } else {
                            $scope.refusedEvents = response.data.refusedEventsProposal;
                            $scope.selectError = null;
                            $scope.refusedEventsSize = response.data.refusedEventsProposal[0]["size"];
                        }
                    });
        }
        $rootScope.getSupportRefused = function () {
            getResultsPage(1);
        };
    }]);
CompanyModule.controller('ControllerConfirmedEventsSupport', ['$scope', '$rootScope', 'getService', 'postService', function ($scope, $rootScope, getService, postService) {
        $scope.x = 'thema';
        $scope.myOrderBy = false;
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
            $scope.x = x;
        };
        $scope.confirmedSuppots = [];
        $scope.qtdPage = 20;
        $scope.totalConfirmedSuppots = 0;
        var lastPage = 1;
        $scope.searchConfirmed = "";
        $scope.queryBy = "";
        $scope.selectQtd = function (qtd) {
            $scope.qtdPage = qtd;
            getResultsPage(lastPage);
            $scope.pagination.current = 1;
        };

        $scope.deleteConfirmedSupport = function (deleteSupports) {
            $scope.deleteConSupport = {};
            $scope.deleteConSupport.support_id = deleteSupports.support_id;
            $scope.deleteConSupport.unit_event_id = deleteSupports.unit_event_id;
            $scope.deleteConSupport.support = deleteSupports.support;
            $scope.deleteConSupport.event_id = deleteSupports.event_id;
            var frase = "Você deseja excluir o apoio " + $scope.deleteConSupport.support + "?";
            $("#deleteConfirmedSupport").modal("show");
            $("#h3ConfirmedDelete").empty().append(frase);
        };
        $scope.deleteConfirSupport = function (deleteConSupport) {
            var selecionado = {support_id: deleteConSupport.support_id, unitEventId: deleteConSupport.unit_event_id,
                support: deleteConSupport.support, justification: deleteConSupport.justification, event_id: deleteConSupport.event_id, action: "deleteConfirmedSupport"};
            var url = $rootScope.ctx_path + "/data/schedule/company.jsp";
            postService.query(selecionado, url).then(function (response) {
                getResultsPage(lastPage);
                $("#deleteConfirmedSupport").modal("hide");
                modal_success(response.data.re);
            }).catch(function (data) {
                modal_error();
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalConfirmedSuppots < $scope.confirmedSuppotsSize)) {
                $scope.totalConfirmedSuppots = (parseInt($scope.totalConfirmedSuppots) + parseInt($scope.qtdPage));
            }
            lastPage = pageNumber;
            var url = $rootScope.ctx_path + "/data/schedule/company.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchConfirmed + "&action=getConfirmedEventsSupport";
            getService.query(url)
                    .then((response) => {
                        if (!response.data.confirmedSupports) {
                            $scope.selectError = response.data.re;
                            $scope.confirmedSuppots = null;
                            $scope.confirmedSuppotsSize = null;
                        } else {
                            $scope.confirmedSuppots = response.data.confirmedSupports;
                            $scope.selectError = null;
                            $scope.confirmedSuppotsSize = response.data.confirmedSupports[0]["size"];
                        }
                    });
        }
        $rootScope.getConfirmedEventsSupport = function () {
            getResultsPage(1);
        };
    }]);
CompanyModule.controller('ControllerConcludedEventsSupport', ['$scope', '$rootScope', 'getService', 'postService', function ($scope, $rootScope, getService, postService) {
        $scope.x = 'thema';
        $scope.myOrderBy = false;
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
            $scope.x = x;
        };
        $scope.concludedSuppots = [];
        $scope.qtdPage = 20;
        $scope.totalConcludedSuppots = 0;
        var lastPage = 1;
        $scope.searchConcluded = "";
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalConcludedSuppots < $scope.concludedSuppotsSize)) {
                $scope.totalConcludedSuppots = (parseInt($scope.totalConcludedSuppots) + parseInt($scope.qtdPage));
            }
            lastPage = pageNumber;
            var url = $rootScope.ctx_path + "/data/schedule/company.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchConcluded + "&action=getConcludedEventsSupport";
            getService.query(url)
                    .then((response) => {
                        if (!response.data.concludedSuppots) {
                            $scope.selectError = response.data.re;
                            $scope.concludedSuppots = null;
                            $scope.concludedSuppotsSize = null;
                        } else {
                            $scope.concludedSuppots = response.data.concludedSuppots;
                            $scope.selectError = null;
                            $scope.concludedSuppotsSize = response.data.concludedSuppots[0]["size"];
                        }
                    });
        }
        $rootScope.getConcludedEventsSupport = function () {
            getResultsPage(1);
        };
    }]);
CompanyModule.controller('controllerActivities', function ($scope, $http, $compile, $rootScope, postService, getService) {
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
        var url = $rootScope.ctx_path + "/data/schedule/company.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.search + "&action=getActivities" + "&event_id=" + $scope.event.id;
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
    $rootScope.geActivitiesSupport = function () {
        getResultsPage(1);
        var url = $rootScope.ctx_path + "/data/select-dropdown.jsp?&action=myEvents&actor=comp";
        getService.query(url).then(function (response) {
            if (!!response.data.error) {
                $scope.events = response.data.error;
                $scope.event = {'id': -2};
            } else {
                $scope.events = response.data.event_list;
            }
        });
    };
});
CompanyModule.factory('warningServiceGet', ['$timeout', function ($timeout) {
        return {
            warningBar: function (message, id, $scope) {
                $scope.show = true;
                $scope.eventMess = message;
                $(id).animate({scrollTop: 0}, 500);
                $(".modal-body #eventMess").attr("class", "alert alert-danger");
                $timeout(function () {
                    $scope.eventMess = null;
                    $(".modal-body #eventMess").removeClass();
                    $scope.show = false;
                }, 5000);
            }
        };
    }]);
CompanyModule.factory('warningServicePost', ['$timeout', function ($timeout) {
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
CompanyModule.factory("getInterception", ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
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
CompanyModule.factory("postInterception", ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
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
CompanyModule.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push("getInterception");
        $httpProvider.interceptors.push("postInterception");
    }]);