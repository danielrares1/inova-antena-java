var Angularmodule = angular.module('Angularmodule', ['angularUtils.directives.dirPagination', 'ngFileUpload']);
Angularmodule.factory('Area', ['$window', function ($w) {
        return {
            area: $w.functionArea
        };
    }]);
Angularmodule.controller('highlightsController', ['$scope', '$timeout', 'getService', 'postService', 'warningServicePost', 'Area', 'Upload', function ($scope, $timeout, getService, postService, warningServicePost, Area, Upload) {
//        var url = window.location.search.replace("?", "");
//        var items = url.split("&");
//        var array = {
//            'id': items[0]
//        };
//        var id = array.id;
        //Criação de variáveis para ordenar as tabelas
        $scope.x = 'title';
        $scope.myOrderBy = false;
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
            $scope.x = x;
        };
        $scope.highlights = [];
        $scope.qtdPage = 50;
        $scope.totalHighlights = 0;
        var lastPage = 1;
        $scope.searchHighlights = "";
        $scope.queryBy = "";
        $scope.selectQtd = function (qtd) {
            $scope.qtdPage = qtd;
            getResultsPage(lastPage);
            $scope.pagination.current = 1;
        };
        $scope.fechamodal = function (x) {
            if (x == 1)
            {
                $("#updateDest").modal('hide');
                $scope.destForm.$setPristine();
                $scope.destForm.$setUntouched();
                delete $scope.dest;
                $scope.picFile = null;
                //location.reload();
            } else if (x == 2)
            {
                $("#includeDest").modal('hide');
                $scope.destForm.$setPristine();
                $scope.destForm.$setUntouched();
                delete $scope.dest;
                $scope.picFile = null;
            } else
            {
                $("#mergeDest").modal('hide');
                delete $scope.dest;
                $scope.mergeForm.$setPristine();
            }

        };
        $scope.apagarCampos = function (dest) {
            $scope.dest.title = '';
            $scope.dest.area = dest.area;
            $scope.dest.url = '';
            $scope.dest.startdate = '';
            $scope.dest.enddate = '';
            $scope.picFile = null;
        };
        getResultsPage(1);
        $scope.abreAdd = function () {
            $scope.show = false;
            delete $scope.dest;
            $("#includeDest").modal("show");
            $scope.dest = {area: Area.area};
            $scope.picFile = null;
        };
        $scope.abreEditar = function (href, dest) {
            $(href).modal("show");
            $scope.show = false;
            $scope.BackUp = angular.copy(dest);
            $scope.BackUp.startdate = new Date(parseInt($scope.BackUp.startdate));
            $scope.BackUp.enddate = new Date(parseInt($scope.BackUp.enddate));
            $scope.dest = $scope.BackUp;
            $scope.picFile = null;
        };
        $scope.addDest = function (dest, file) {
            var selecionado = "";
            if (file !== null) {
                selecionado = {title: dest.title, area: dest.area, url: dest.url, file: file};
                file.upload = Upload.upload({
                    url: '../data/portal/highlights.jsp?action=insert&startdate=' + dest.startdate + '&enddate=' + dest.enddate,
                    data: {selecionado},
                    method: 'POST',
                    headers: {'content-type': undefined}
                });
                file.upload.then(function (re) {
                    $timeout(function () {
                        file.result = re.data;
                    });
                    warningServicePost.warningBar(re, "#includeDest", $scope);
                    getResultsPage(lastPage);
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes                     
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });
            } else {
                selecionado = {title: dest.title, area: dest.area, url: dest.url, startdate: dest.startdate, enddate: dest.enddate, action: 'insert'};
                var url = "../data/portal/highlights.jsp";
                postService.query(selecionado, url).then(function (re) {
                    warningServicePost.warningBar(re, "#includeDest", $scope);
                    getResultsPage(lastPage);
                }).catch(function (status) {
                    alert("Falha ao executar o post. " + status);
                });
            }


        };
        $scope.upDest = function (dest, file) {
            var selecionado = "";
            if (file !== null) {
                selecionado = {id: dest.id, title: dest.title, area: dest.area, url: dest.url, file: file};
                file.upload = Upload.upload({
                    url: '../data/portal/highlights.jsp?action=update&startdate=' + dest.startdate + '&enddate=' + dest.enddate,
                    data: {selecionado},
                    method: 'POST',
                    headers: {'content-type': undefined}
                });
                file.upload.then(function (re) {
                    $timeout(function () {
                        file.result = re.data;
                    });
                    warningServicePost.warningBar(re, "#updateDest", $scope);
                    getResultsPage(lastPage);
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes                     
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });
            } else {
                selecionado = {id: dest.id, title: dest.title, area: dest.area, url: dest.url, startdate: dest.startdate, enddate: dest.enddate, action: 'update'};
                var url = "../data/portal/highlights.jsp";
                postService.query(selecionado, url).then(function (re) {
                    warningServicePost.warningBar(re, "#updateDest", $scope);
                    getResultsPage(lastPage);
                }).catch(function (status) {
                    alert("Falha ao executar o post. " + status);
                });
            }
        };
        var destId;
        $scope.confirmacaoExcluir = function (fimDeFrase, id) {
            destId = id;
            var frase = "Você deseja excluir";
            $("#deleteHighlight").modal('show');
            $("#deleteHighlight p").empty().append(frase + fimDeFrase);
        };
        deleteHighlight = function () {
            var selecionado = {destId: destId, action: 'delete'};
            var url = "../data/portal/highlights.jsp";
            postService.query(selecionado, url).then(function (re) {
                $("#deleteSuccess p").empty().append(re.data.re);
                $("#deleteSuccess").modal("show");
                $timeout(function () {
                    $("#deleteSuccess").modal("hide");
                }, 5000);
                $("#deleteHighlight").modal('hide');
                getResultsPage(lastPage);
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalHighlights < $scope.highlightsSize)) {
                $scope.totalHighlights = (parseInt($scope.totalHighlights) + parseInt($scope.qtdPage));
            }

            lastPage = pageNumber;
            $('#sectionLoadHighlight').hide();
            var url = "../data/portal/highlights.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchHighlights + "&area=" + Area.area;
            getService.query(url).then(function (response) {
                if (response.data.re != null) {
                    $scope.selectError = response.data.re;
                    $scope.highlights = null;
                    $scope.highlightsSize = null;
                } else {
                    $scope.selectError = null;
                    $scope.highlights = response.data.highlights;
                    $scope.highlightsSize = response.data.highlights[0]["size"];
                    $('#sectionLoadHighlight').show();
                }
            });
        }
    }]);
/*
Angularmodule.controller('eventController', ['$scope', 'Upload', 'getService', 'Area', '$timeout', 'getService', 'postService', 'warningServicePost', function ($scope, Upload, getService, Area, $timeout, getService, postService, warningServicePost) {
//        var url = window.location.search.replace("?", "");
//        var items = url.split("&");
//        var array = {
//            'id': items[0]
//        };
//        var id = array.id;
        $scope.aris = [];
        //Criação de variáveis para ordenar as tabelas
        $scope.x = 'title';
        $scope.myOrderBy = false;
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
            $scope.x = x;
        };
        $scope.events = [];
        $scope.qtdPage = 50;
        $scope.totalEvents = 0;
        var lastPage = 1;
        $scope.searchEvents = "";
        $scope.queryBy = "";
        $scope.selectQtd = function (qtd) {
            $scope.qtdPage = qtd;
            getResultsPage(lastPage);
            $scope.pagination.current = 1;
        };
        $scope.fechamodal = function (x) {
            if (x == 1)
            {
                $("#updateEvent").modal('hide');
                $scope.eventForm.$setPristine();
                $scope.eventForm.$setUntouched();
                delete $scope.event;
                $scope.picFile = null;
                location.reload();
            } else if (x == 2)
            {
                $("#includeEvent").modal('hide');
                $scope.eventForm.$setPristine();
                $scope.eventForm.$setUntouched();
                delete $scope.event;
                $scope.picFile = null;
            } else
            {
                $("#mergeEvent").modal('hide');
                delete $scope.dest;
                $scope.mergeForm.$setPristine();
            }

        };
        $scope.apagarCampos = function (event) {
            $scope.event.title = '';
            $scope.event.area = event.area;
            $scope.event.url = '';
            $scope.event.startdate = '';
            $scope.event.enddate = '';
            $scope.picFile = null;
        };
        getResultsPage(1);
        $scope.abreAdd = function () {
            $scope.show = false;
            delete $scope.event;
            $("#includeEvent").modal("show");
            $scope.event = {area: Area.area};
            $scope.picFile = null;
        };
        $scope.abreEditar = function (href, event) {
            $(href).modal("show");
            $scope.show = false;
            $scope.BackUp = angular.copy(event);
            $scope.BackUp.startdate = new Date(parseInt($scope.BackUp.startdate));
            $scope.BackUp.enddate = new Date(parseInt($scope.BackUp.enddate));
            $scope.event = $scope.BackUp;
            $scope.picFile = null;
        };
        $scope.addEvent = function (event, file) {
            var selecionado = "";
            if (file !== null) {
                selecionado = {title: event.title, area: event.area, url: event.url, file: file};
                file.upload = Upload.upload({
                    url: '..//data/portal/events.jsp?action=insert&startdate=' + event.startdate + '&enddate=' + event.enddate,
                    data: {selecionado},
                    method: 'POST',
                    headers: {'content-type': undefined}
                });
                file.upload.then(function (re) {
                    $timeout(function () {
                        file.result = re.data;
                    });
                    warningServicePost.warningBar(re, "#includeEvent", $scope);
                    getResultsPage(lastPage);
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes                     
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });
            } else {
                selecionado = {title: event.title, area: event.area, url: event.url, startdate: event.startdate, enddate: event.enddate, action: 'insert'};
                var url = "..//data/portal/events.jsp";
                postService.query(selecionado, url).then(function (re) {
                    warningServicePost.warningBar(re, "#includeEvent", $scope);
                    getResultsPage(lastPage);
                }).catch(function (status) {
                    alert("Falha ao executar o post. " + status);
                });
            }
        };
        $scope.upEvent = function (event, file) {
            var selecionado = "";
            if (file !== null) {
                selecionado = {id: event.id, title: event.title, area: event.area, url: event.url, file: file};
                file.upload = Upload.upload({
                    url: '..//data/portal/events.jsp?action=update&startdate=' + event.startdate + '&enddate=' + event.enddate,
                    data: {selecionado},
                    method: 'POST',
                    headers: {'content-type': undefined}
                });
                file.upload.then(function (re) {
                    $timeout(function () {
                        file.result = re.data;
                    });
                    warningServicePost.warningBar(re, "#updateEvent", $scope);
                    getResultsPage(lastPage);
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes                     
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });
            } else {
                selecionado = {id: event.id, title: event.title, area: event.area, url: event.url, startdate: event.startdate, enddate: event.enddate, action: 'update'};
                var url = "..//data/portal/events.jsp";
                postService.query(selecionado, url).then(function (re) {
                    warningServicePost.warningBar(re, "#updateEvent", $scope);
                    getResultsPage(lastPage);
                }).catch(function (status) {
                    alert("Falha ao executar o post. " + status);
                });
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalEvents < $scope.eventsSize)) {
                $scope.totalEvents = (parseInt($scope.totalEvents) + parseInt($scope.qtdPage));
            }

            lastPage = pageNumber;
            $('#sectionLoadEvent').hide();
            var url = "..//data/portal/events.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchEvents + "&area=" + Area.area;
            getService.query(url).then(function (response) {
                if (response.data.re != null) {
                    $scope.selectError = response.data.re;
                    $scope.events = null;
                    $scope.eventsSize = null;
                } else {
                    $scope.selectError = null;
                    $scope.events = response.data.events;
                    $scope.eventsSize = response.data.events[0]["size"];
                    $('#sectionLoadEvent').show();
                }

            });
        }
    }]);
*/
Angularmodule.controller('docController', ['$scope', '$timeout', 'getService', 'postService', 'warningServicePost', 'Area', function ($scope, $timeout, getService, postService, warningServicePost, Area) {
//        var url = window.location.search.replace("?", "");
//        var items = url.split("&");
//        var array = {
//            'id': items[0]
//        };
//        var id = array.id;
        //Criação de variáveis para ordenar as tabelas
        $scope.x = 'name';
        $scope.myOrderBy = false;
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
            $scope.x = x;
        };
        $scope.documents = [];
        $scope.qtdPage = 50;
        $scope.totalDocuments = 0;
        var lastPage = 1;
        $scope.searchDocuments = "";
        $scope.queryBy = "";
        $scope.fechamodal = function (x) {
            if (x == 1)
            {
                $("#updateDoc").modal('hide');
                delete $scope.doc;
                $scope.docForm.$setPristine();
            } else if (x == 2)
            {
                $("#includeDoc").modal('hide');
                delete $scope.doc;
                $scope.docForm.$setPristine();
            } else
            {
                $("#mergeDoc").modal('hide');
                delete $scope.doc;
                $scope.mergeForm.$setPristine();
            }

        };
        $scope.selectQtd = function (qtd) {
            $scope.qtdPage = qtd;
            getResultsPage(lastPage);
            $scope.pagination.current = 1;
        };
        $scope.apagarCampos = function (doc) {
            $scope.doc.title = '';
            $scope.doc.area = doc.area;
            $scope.doc.type = doc.type;
            $scope.doc.url = '';
            $scope.doc.description = '';
        };
        getResultsPage(1);
        $scope.abreAdd = function () {
            $scope.show = false;
            delete $scope.doc;
            $("#includeDoc").modal("show");
            $scope.doc = {type: "documento", area: Area.area};
        };
        $scope.abreEditar = function (href, doc) {
            $(href).modal("show");
            $scope.BackUp = angular.copy(doc);
            $scope.doc = $scope.BackUp;
        }
        $scope.addDoc = function (doc) {
            var selecionado = {title: doc.title, area: doc.area, type: doc.type, url: doc.url, description: doc.description, action: 'insert'};
            var url = "../data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                warningServicePost.warningBar(re, "#includeDoc", $scope);
                getResultsPage(lastPage);
            }).catch(function (status) {
                alert("Falha ao executar o post. " + status);
            });
        };
        $scope.upDoc = function (doc) {
            var selecionado = {id: doc.id, title: doc.title, area: doc.area, type: doc.type, url: doc.url, description: doc.description, action: 'update'};
            var url = "../data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                warningServicePost.warningBar(re, "#updateDoc", $scope);
                getResultsPage(lastPage);
            }).catch(function (status) {
                alert("Falha ao executar o post. " + status);
            });
        };
        var docId;
        $scope.confirmacaoExcluir = function (fimDeFrase, id) {
            docId = id;
            var frase = "Você deseja excluir";
            $("#deleteDocument").modal('show');
            $("#deleteDocument p").empty().append(frase + fimDeFrase);
        };
        deleteDocument = function () {
            var selecionado = {docId: docId, action: 'delete'};
            var url = "../data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                $("#deleteSuccess p").empty().append(re.data.re);
                $("#deleteSuccess").modal("show");
                $timeout(function () {
                    $("#deleteSuccess").modal("hide");
                }, 5000);
                $("#deleteDocument").modal('hide');
                getResultsPage(lastPage);
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalDocuments < $scope.documentsSize)) {
                $scope.totalDocuments = (parseInt($scope.totalDocuments) + parseInt($scope.qtdPage));
            }

            lastPage = pageNumber;
            $('#sectionLoadDoc').hide();
            var url = "../data/portal/documents.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchDocuments + "&type=documento" + "&area=" + Area.area;
            getService.query(url).then(function (response) {
                if (response.data.re != null) {
                    $scope.selectError = response.data.re;
                    $scope.documents = null;
                    $scope.documentsSize = null;
                } else {
                    $scope.selectError = null;
                    $scope.documents = response.data.documents;
                    $scope.documentsSize = response.data.documents[0]["size"];
                    $('#sectionLoadDoc').show();
                }

            });
        }
    }]);
Angularmodule.controller('linksController', ['$scope', '$timeout', 'getService', 'postService', 'warningServicePost', 'Area', function ($scope, $timeout, getService, postService, warningServicePost, Area) {
//        var url = window.location.search.replace("?", "");
//        var items = url.split("&");
//        var array = {
//            'id': items[0]
//        };
//        var id = array.id;
        //Criação de variáveis para ordenar as tabelas
        $scope.x = 'title';
        $scope.myOrderBy = false;
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
            $scope.x = x;
        };
        $scope.links = [];
        $scope.qtdPage = 50;
        $scope.totalLinks = 0;
        var lastPage = 1;
        $scope.searchLinks = "";
        $scope.queryBy = "";
        $scope.selectQtd = function (qtd) {
            $scope.qtdPage = qtd;
            getResultsPage(lastPage);
            $scope.pagination.current = 1;
        };
        $scope.fechamodal = function (x) {
            if (x == 1)
            {
                $("#updateLink").modal('hide');
                delete $scope.link;
                $scope.linkForm.$setPristine();
            } else if (x == 2)
            {
                $("#includeLink").modal('hide');
                delete $scope.link;
                $scope.linkForm.$setPristine();
            } else
            {
                $("#mergeLink").modal('hide');
                delete $scope.link;
                $scope.mergeForm.$setPristine();
            }

        };
        $scope.apagarCampos = function (link) {
            $scope.link.title = '';
            $scope.link.area = link.area;
            $scope.link.type = link.type;
            $scope.link.url = '';
            $scope.link.description = '';
        };
        getResultsPage(1);
        $scope.abreAdd = function () {
            $scope.show = false;
            delete $scope.link;
            $("#includeLink").modal("show");
            $scope.link = {type: "link", area: Area.area};
        };
        $scope.abreEditar = function (href, link) {
            $(href).modal("show");
            $scope.BackUp = angular.copy(link);
            $scope.link = $scope.BackUp;
        };
        $scope.addLink = function (link) {
            var selecionado = {title: link.title, area: link.area, type: link.type, url: link.url, description: link.description, action: 'insert'};
            var url = "../data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                warningServicePost.warningBar(re, "#includeLink", $scope);
                getResultsPage(lastPage);
            }).catch(function (status) {
                alert("Falha ao executar o post. " + status);
            });
        };
        $scope.upLink = function (link) {
            var selecionado = {id: link.id, title: link.title, area: link.area, type: link.type, url: link.url, description: link.description, action: 'update'};
            var url = "../data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                warningServicePost.warningBar(re, "#updateLink", $scope);
                getResultsPage(lastPage);
            }).catch(function (status) {
                alert("Falha ao executar o post. " + status);
            });
        };
        var linkId;
        $scope.confirmacaoExcluir = function (fimDeFrase, id) {
            linkId = id;
            var frase = "Você deseja excluir";
            $("#deleteLink").modal('show');
            $("#deleteLink p").empty().append(frase + fimDeFrase);
        };
        deleteLink = function () {
            var selecionado = {docId: linkId, action: 'delete'};
            var url = "../data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                $("#deleteSuccess p").empty().append(re.data.re);
                $("#deleteSuccess").modal("show");
                $timeout(function () {
                    $("#deleteSuccess").modal("hide");
                }, 5000);
                $("#deleteLink").modal('hide');
                getResultsPage(lastPage);
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalLinks < $scope.linksSize)) {
                $scope.totalLinks = (parseInt($scope.totalLinks) + parseInt($scope.qtdPage));
            }

            lastPage = pageNumber;
            $('#sectionLoadLink').hide();
            var url = "../data/portal/documents.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchLinks + "&type=link" + "&area=" + Area.area;
            getService.query(url).then(function (response) {
                if (response.data.re != null) {
                    $scope.selectError = response.data.re;
                    $scope.links = null;
                    $scope.linksSize = null;
                } else {
                    $scope.selectError = null;
                    $scope.links = response.data.links;
                    $scope.linksSize = response.data.links[0]["size"];
                    $('#sectionLoadLink').show();
                }

            });
        }
    }]);
Angularmodule.controller('videosController', ['$scope', '$timeout', 'getService', 'postService', 'warningServicePost', 'Area', function ($scope, $timeout, getService, postService, warningServicePost, Area) {
//        var url = window.location.search.replace("?", "");
//        var items = url.split("&");
//        var array = {
//            'id': items[0]
//        };
//        var id = array.id;
        //Criação de variáveis para ordenar as tabelas
        $scope.x = 'title';
        $scope.myOrderBy = false;
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
            $scope.x = x;
        };
        $scope.videos = [];
        $scope.qtdPage = 50;
        $scope.totalVideos = 0;
        var lastPage = 1;
        $scope.searchVideos = "";
        $scope.queryBy = "";
        $scope.selectQtd = function (qtd) {
            $scope.qtdPage = qtd;
            getResultsPage(lastPage);
            $scope.pagination.current = 1;
        };
        $scope.fechamodal = function (x) {
            if (x == 1)
            {
                $("#updateVideo").modal('hide');
                delete $scope.video;
                $scope.videoForm.$setPristine();
            } else if (x == 2)
            {
                $("#includeVideo").modal('hide');
                delete $scope.video;
                $scope.videoForm.$setPristine();
            } else
            {
                $("#mergeVideo").modal('hide');
                delete $scope.video;
                $scope.mergeForm.$setPristine();
            }

        };
        $scope.apagarCampos = function (video) {
            $scope.video.title = '';
            $scope.video.area = video.area;
            $scope.video.type = video.type;
            $scope.video.url = '';
            $scope.video.description = '';
        };
        getResultsPage(1);
        $scope.abreAdd = function () {
            $scope.show = false;
            delete $scope.video;
            $("#includeVideo").modal("show");
            $scope.video = {type: "video", area: Area.area};
        };
        $scope.abreEditar = function (href, video) {
            $(href).modal("show");
            $scope.BackUp = angular.copy(video);
            $scope.video = $scope.BackUp;
        }
        $scope.addVideo = function (video) {
            var selecionado = {title: video.title, area: video.area, type: video.type, url: video.url, description: video.description, action: 'insert'};
            var url = "../data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                warningServicePost.warningBar(re, "#includeVideo", $scope);
                getResultsPage(lastPage);
            }).catch(function (status) {
                alert("Falha ao executar o post. " + status);
            });
        };
        $scope.upVideo = function (video) {
            var selecionado = {id: video.id, title: video.title, area: video.area, type: video.type, url: video.url, description: video.description, action: 'update'};
            var url = "../data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                warningServicePost.warningBar(re, "#updateVideo", $scope);
                getResultsPage(lastPage);
            }).catch(function (status) {
                alert("Falha ao executar o post. " + status);
            });
        };
        var videoId;
        $scope.confirmacaoExcluir = function (fimDeFrase, id) {
            videoId = id;
            var frase = "Você deseja excluir";
            $("#deleteVideo").modal('show');
            $("#deleteVideo p").empty().append(frase + fimDeFrase);
        };
        deleteVideo = function () {
            var selecionado = {docId: videoId, action: 'delete'};
            var url = "../data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                $("#deleteSuccess p").empty().append(re.data.re);
                $("#deleteSuccess").modal("show");
                $timeout(function () {
                    $("#deleteSuccess").modal("hide");
                }, 5000);
                $("#deleteVideo").modal('hide');
                getResultsPage(lastPage);
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalVideos < $scope.videosSize)) {
                $scope.totalVideos = (parseInt($scope.totalVideos) + parseInt($scope.qtdPage));
            }

            lastPage = pageNumber;
            $('#sectionLoadVideo').hide();
            var url = "../data/portal/documents.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchVideos + "&type=video" + "&area=" + Area.area;
            getService.query(url).then(function (response) {
                if (response.data.re != null) {
                    $scope.selectError = response.data.re;
                    $scope.videos = null;
                    $scope.videosSize = null;
                } else {
                    $scope.selectError = null;
                    $scope.videos = response.data.videos;
                    $scope.videosSize = response.data.videos[0]["size"];
                    $('#sectionLoadVideo').show();
                }
            });
        }
    }]);
Angularmodule.controller('regionsController', ['$scope', '$timeout', 'getService', 'postService', 'warningServicePost', 'warningServiceGet', function ($scope, $timeout, getService, postService, warningServicePost, warningServiceGet) {
//        var url = window.location.search.replace("?", "");
//        var items = url.split("&");
//        var array = {
//            'id': items[0]
//        };
//        var id = array.id;
        //Criação de variáveis para ordenar as tabelas
        $scope.x = 'name';
        $scope.myOrderBy = false;
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
            $scope.x = x;
        };

        $scope.regions = [];
        $scope.totalRegions = 0;
        $scope.qtdPage = 50;
        $scope.searchRegion = "";
        $scope.queryBy = "";



        $scope.selectQtd = function (qtd) {
            $scope.qtdPage = qtd;
            getResultsPage(1);
            $scope.pagination.current = 1;
        };
        getResultsPage(1);
        var lastPage = 1;

        $scope.fechamodal = function (x) {

            if (x == 1)
            {
                $("#includeRegion").modal('hide');
                delete $scope.reg;
                $scope.regionForm.$setPristine();
            } else if (x == 2)
            {
                $("#updateRegion").modal('hide');
                delete $scope.reg;
                $scope.regionForm.$setPristine();
            } else {
                $("#mergeRegions").modal('hide');
                delete $scope.regsMerge;
                $scope.mergeForm.$setPristine();
            }
        };
        var testName;
        $scope.abreAdd = function () {
            $scope.show = false;
            delete $scope.reg;
            $("#includeRegion").modal('show');
            getAI();
        };
        $scope.abreEditar = function (href, Selecionado) {
            $scope.show = false;
            $scope.BackUp = angular.copy(Selecionado);
            $scope.reg = $scope.BackUp;
            $(href).modal('show');
            testName = $scope.BackUp.name;
            getAI();
        };
        //Adicionar Região
        $scope.addRegion = function (reg) {
            var url = "..//data/portal/regions.jsp?action=testarCampos&name=" + reg.name + "&type=insert";
            getService.query(url).then(function (re) {
                if (re.data.erro === "null") {
                    if (re.data.re === "0") {
                        reg.action = "insert";
                        var selecionado = {name: reg.name, ai: reg.ai.id, action: reg.action};
                        var url = "..//data/portal/regions.jsp";
                        postService.query(selecionado, url).then(function (re) {
                            warningServicePost.warningBar(re, "#includeRegion", $scope);
                            getResultsPage(lastPage);
                        }).catch(function (status) {
                            alert("Alguma coisa errada aconteceu com o post. " + status);
                        });
                    } else {
                        var message = "Não foi possível realizar a inserção. Já existe uma região com o nome " + reg.name;
                        warningServiceGet.warningBar(message, "#includeRegion", $scope);
                    }
                } else {
                    var message = re.data.erro;
                    warningServiceGet.warningBar(message, "#includeRegion", $scope);
                }
            }).catch(function (status) {
                alert("Falha ao testar Campos. " + status);
            });
        };
        //Atualizar Região
        $scope.upRegion = function (reg) {
            var url = "..//data/portal/regions.jsp?action=testarCampos&name=" + reg.name + "&ai=" + reg.ai.id + "&testName=" + testName + "&type=update";
            getService.query(url).then(function (re) {
                if (re.data.erro === "null") {
                    if (re.data.re === "0") {
                        reg.action = "update";
                        var selecionado = {id: reg.id, name: reg.name, ai: reg.ai.id, action: reg.action};
                        var url = "..//data/portal/regions.jsp";
                        postService.query(selecionado, url).then(function (re) {
                            warningServicePost.warningBar(re, "#updateRegion", $scope);
                            getResultsPage(lastPage);
                        }).catch(function (status) {
                            alert("Alguma coisa errada aconteceu com o post. " + status);
                        });
                    } else {
                        var message = "Não foi possível realizar a atualização. Já existe uma região com o nome " + reg.name;
                        warningServiceGet.warningBar(message, "#updateRegion", $scope);
                    }
                } else {
                    var message = re.data.erro;
                    warningServiceGet.warningBar(message, "#updateRegion", $scope);
                }
            }).catch(function (status) {
                alert("Falha ao testar Campos. " + status);
            });
        };
        //Excluir Região
        var name;
        $scope.confirmacaoExcluir = function (fimDeFrase, id, n) {
            $scope.idRegion = id;
            name = n;
            var frase = "Você deseja excluir";
            $("#deleteRegion").modal('show');
            $("#deleteRegion p").empty().append(frase + fimDeFrase);
        };
        deleteRegion = function () {
            var selecionado = {id: $scope.idRegion, action: 'delete'};
            var url = "..//data/portal/regions.jsp";
            postService.query(selecionado, url).then(function (re) {
                $("#deleteRegion").modal("hide");
                if (re.data.re === "1") {
                    var message = "Não foi possível deletar região, mas é possível mesclá-la com outra região.";
                    var query = "..//data/portal/regions.jsp?action=selMergeRegion&id=" + $scope.idRegion;
                    getService.query(query).then(function (re) {
                        if (typeof re.data.regions !== "undefined") {
                            $scope.regionsMerge = re.data.regions;
                        } else if (typeof re.data.re !== "undefined") {
                            $scope.regionsMerge = {};
                            message = re.data.re;
                        }
                        $("#mergeRegions").modal("show");
                        $scope.regMerge = {name: name};
                        warningServiceGet.warningBar(message, "#mergeRegions", $scope);
                    });
                } else {
                    $("#deleteSuccess p").empty().append(re.data.re);
                    $("#deleteSuccess").modal("show");
                    $timeout(function () {
                        $("#deleteSuccess").modal("hide");
                    }, 5000);
                    getResultsPage(lastPage);
                }
            }).catch(function (status) {
                alert(status);
            });
        };
        $scope.mergeRegion = function (regMerge) {
            var selecionado = {id: regMerge.region.id, regionMesId: $scope.idRegion, action: 'mergeRegion'};
            var url = "..//data/portal/regions.jsp";
            postService.query(selecionado, url).then(function (re) {
                $("#mergeRegions").modal("hide");
                $("#deleteSuccess p").empty().append(re.data.re);
                $("#deleteSuccess").modal("show");
                $timeout(function () {
                    $("#deleteSuccess").modal("hide");
                }, 5000);
                getResultsPage(lastPage);
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalRegions < $scope.regionSize)) {
                $scope.totalRegions = (parseInt($scope.totalRegions) + parseInt($scope.qtdPage));
            }

            lastPage = pageNumber;

            $('#sectionLoadRegion').hide();
            var url = "..//data/portal/regions.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchRegion;
            getService.query(url).then(function (response) {
                if (response.data.re != null) {
                    $scope.selectError = response.data.re;
                    $scope.regions = null;
                    $scope.regionSize = null;
                } else {
                    $scope.selectError = null;
                    $scope.regions = response.data.regions;
                    $scope.regionSize = response.data.regions[0]["size"];
                    $('#sectionLoadRegion').show();
                }
            });
        }
        ;
        var getAI = function () {
            var url = "..//data/portal/regions.jsp?action=getProfessor";
            getService.query(url).then(function (response) {
                $scope.ais = response.data.professors;
            });
        };
    }]);
Angularmodule.controller('unitsController', ['$scope', '$timeout', 'getService', 'postService', 'warningServicePost', 'warningServiceGet', function ($scope, $timeout, getService, postService, warningServicePost, warningServiceGet) {
//        var url = window.location.search.replace("?", "");
//        var items = url.split("&");
//        var array = {
//            'id': items[0]
//        };
//        var id = array.id;
        //Criação de variáveis para ordenar as tabelas
        $scope.x = 'name';
        $scope.myOrderBy = false;
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
            $scope.x = x;
        };
        $scope.units = [];
        $scope.qtdPage = 50;
        $scope.totalUnits = 0;
        var lastPage = 1;
        $scope.searchUnits = "";
        $scope.queryBy = "";
        $scope.selectQtd = function (qtd) {
            $scope.qtdPage = qtd;
            getResultsPage(lastPage);
            $scope.pagination.current = 1;
        };
        $scope.fechamodal = function (x) {
            if (x == 1)
            {
                $("#updateUnit").modal('hide');
                delete $scope.unit;
                $scope.unitForm.$setPristine();
            } else if (x == 2)
            {
                $("#includeUnit").modal('hide');
                delete $scope.unit;
                $scope.unitForm.$setPristine();
            } else
            {
                $("#mergeUnits").modal('hide');
                delete $scope.unit;
                $scope.mergeForm.$setPristine();
            }
        };
        $scope.apagarCampos = function () {
            $scope.unit.code = '';
            $scope.unit.name = '';
            $scope.unit.address = '';
            $scope.unit.site = '';
            $scope.unit.email = '';
        };
        getResultsPage(1);
        $scope.abreAdd = function () {
            $scope.show = false;
            delete $scope.unit;
            $("#includeUnit").modal("show");
            $("#warnning").css("display", "none");
            $("#unitButton").css("display", "inline");
            $scope.unit = {
                type: 'Fatec'
            };
            getRegion();
            getPrincipal();
        };
        var testName;
        $scope.abreEditar = function (href, unit) {
            $(href).modal("show");
            $scope.BackUp = angular.copy(unit);
            $scope.unit = $scope.BackUp;
            getRegion();
            getPrincipal();
            testName = $scope.BackUp.name;
        };
        $scope.addUnit = function (unit) {
            var url = "../data/portal/units.jsp?action=testarCampos&name=" + unit.name + "&type=insert";
            getService.query(url).then(function (re) {
                if (re.data.erro === "null") {
                    if (re.data.re === "0") {
                        var selecionado = {code: unit.code, type: unit.type, name: unit.name, address: unit.address, site: unit.site, email: unit.email, regionid: unit.region.id, principal: unit.principal.id, action: 'insert'};
                        var url = "../data/portal/units.jsp";
                        postService.query(selecionado, url).then(function (re) {
                            warningServicePost.warningBar(re, "#includeUnit", $scope);
                            getResultsPage(lastPage);
                        }).catch(function (status) {
                            alert("Falha ao executar o post. " + status);
                        });
                    } else {
                        var message = "Não foi possível realizar a inserção. Já existe uma unidade com o nome " + unit.name;
                        warningServiceGet.warningBar(message, "#includeUnit", $scope);
                    }
                } else {
                    var message = re.data.erro;
                    warningServiceGet.warningBar(message, "#includeUnit", $scope);
                }
            }).catch(function (status) {
                alert("Falha ao testar Campos. " + status);
            });
        };
        $scope.upUnit = function (unit) {
            var url = "../data/portal/units.jsp?action=testarCampos&name=" + unit.name + "&testName=" + testName + "&type=update";
            getService.query(url).then(function (re) {
                if (re.data.erro === "null") {
                    if (re.data.re === "0") {
                        var selecionado = {id: unit.id, code: unit.code, type: unit.type, name: unit.name, address: unit.address, site: unit.site, email: unit.email, regionid: unit.region.id, principal: unit.principal.id, action: 'update'};
                        var url = "../data/portal/units.jsp";
                        postService.query(selecionado, url).then(function (re) {
                            warningServicePost.warningBar(re, "#updateUnit", $scope);
                            getResultsPage(lastPage);
                        }).catch(function (status) {
                            alert("Falha ao executar o post. " + status);
                        });
                    } else {
                        var message = "Não foi possível realizar a atualização. Já existe uma unidade com o nome " + unit.name;
                        warningServiceGet.warningBar(message, "#updateUnit", $scope);
                    }
                } else {
                    var message = re.data.erro;
                    warningServiceGet.warningBar(message, "#updateUnit", $scope);
                }
            }).catch(function (status) {
                alert("Falha ao testar Campos. " + status);
            });
        };
        //Testar o valor do campo code
        $scope.testCode = function (code) {
            if (code == null || code == '') {
                $("#unitButton").css("display", "inline");
                $("#warnning").css("display", "none");
            }
            if (code != null && code != '') {
                var url = "../data/portal/units.jsp?code=" + code + "&action=code";
                getService.query(url).then(function (re) {
                    if (re.data.re.ex === true) {
                        $("#warnning").css("display", "block");
                        $("#unitButton").css("display", "none");

                    } else {
                        $("#warnning").css("display", "none");
                        $("#unitButton").css("display", "inline");
                    }
                }).catch(function (status) {
                    alert("Falha ao executar a pesquisa do campo Código. " + status);
                });
            }
        };
        var unitId;
        var name;
        var regionid;
        $scope.confirmacaoExcluir = function (fimDeFrase, id, n, r) {
            unitId = id;
            name = n;
            regionid = r;
            var frase = "Você deseja excluir";
            $("#deleteUnit").modal('show');
            $("#deleteUnit p").empty().append(frase + fimDeFrase);
        };
        deleteUnit = function () {
            var selecionado = {unitId: unitId, action: 'delete'};
            var url = "../data/portal/units.jsp";
            postService.query(selecionado, url).then(function (re) {
                $("#deleteUnit").modal('hide');
                if (re.data.re === "1") {
                    var message = "Não foi possível deletar unidade, mas é possível mesclar com outra unidade.";
                    var query = "../data/portal/units.jsp?action=selMergeUnit&id=" + unitId + "&regionid=" + regionid;
                    getService.query(query).then(function (re) {
                        if (typeof re.data.units !== "undefined") {
                            $scope.unitsMerge = re.data.units;
                        } else if (typeof re.data.re !== "undefined") {
                            $scope.unitsMerge = {};
                            message = re.data.re;
                        }
                        $("#mergeUnits").modal("show");
                        $scope.unitMerge = {name: name};
                        warningServiceGet.warningBar(message, "#mergeUnits", $scope);
                    });
                } else {
                    $("#deleteSuccess p").empty().append(re.data.re);
                    $("#deleteSuccess").modal("show");
                    $timeout(function () {
                        $("#deleteSuccess").modal("hide");
                    }, 5000);
                    getResultsPage(lastPage);
                }
            }).catch(function (status) {
                alert("Falha ao executar o post. " + status);
            });
        };
        $scope.mergeUnit = function (unitMerge) {
            var selecionado = {id: unitMerge.unit.id, unitMesId: unitId, action: 'mergeUnit'};
            var url = "../data/portal/units.jsp";
            postService.query(selecionado, url).then(function (re) {
                $("#mergeUnits").modal("hide");
                $("#deleteSuccess p").empty().append(re.data.re);
                $("#deleteSuccess").modal("show");
                $timeout(function () {
                    $("#deleteSuccess").modal("hide");
                }, 5000);
                getResultsPage(lastPage);
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalUnits < $scope.unitsSize)) {
                $scope.totalUnits = (parseInt($scope.totalUnits) + parseInt($scope.qtdPage));
            }

            lastPage = pageNumber;
            $('#sectionLoadUnit').hide();
            var url = "../data/portal/units.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchUnits;
            getService.query(url).then(function (response) {
                if (response.data.re != null) {
                    $scope.units = null;
                    $scope.unitsSize = null;
                    $scope.selectError = response.data.re;
                } else {
                    $scope.selectError = null;
                    $scope.units = response.data.units;
                    $scope.unitsSize = response.data.units[0]["size"];
                    $('#sectionLoadUnit').show();
                }
            });
        }
        var getRegion = function () {
            var url = "../data/portal/units.jsp?action=getRegion";
            getService.query(url).then(function (response) {
                $scope.regions = response.data.regions;
            });
        };
        var getPrincipal = function () {
            var url = "../data/portal/units.jsp?action=getProfessor";
            getService.query(url).then(function (response) {
                $scope.principals = response.data.professors;
            });
        };
    }]);
Angularmodule.controller('professorsController', ['$scope', '$timeout', 'getService', 'postService', 'warningServicePost', 'warningServiceGet', function ($scope, $timeout, getService, postService, warningServicePost, warningServiceGet) {
//        var url = window.location.search.replace("?", "");
//        var items = url.split("&");
//        var array = {
//            'id': items[0]
//        };
//        var id = array.id;
        //Criação de variáveis para ordenar as tabelas
        $scope.x = 'name';
        $scope.myOrderBy = false;
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
            $scope.x = x;
        };
        $scope.professors = [];
        $scope.qtdPage = 50;
        $scope.totalProfessors = 0;
        var lastPage = 1;
        $scope.searchProfessors = "";
        $scope.queryBy = "";
        $scope.selectQtd = function (qtd) {
            $scope.qtdPage = qtd;
            getResultsPage(lastPage);
            $scope.pagination.current = 1;
        };
        $scope.fechamodal = function (x) {
            if (x == 1)
            {
                $("#updateProfessor").modal('hide');
                delete $scope.professor;
                $scope.professorForm.$setPristine();
            } else if (x == 2)
            {
                $("#includeProfessor").modal('hide');
                delete $scope.professor;
                $scope.professorForm.$setPristine();
            } else
            {
                $("#mergeProfessor").modal('hide');
                delete $scope.professor;
                $scope.mergeForm.$setPristine();
            }
        };
        $scope.apagarCampos = function () {
            $scope.professor.user = '';
            $scope.professor.unit = '';
            $scope.professor.registration = null;
        };
        getResultsPage(1);
        $scope.abreAdd = function () {
            $scope.show = false;
            delete $scope.professor;
            $("#includeProfessor").modal("show");
            $("#war").css("display", "none");
            $("#unitBt").css("display", "inline");
            getUser();
            getUnit();
        };
        var testReg;
        $scope.abreEditar = function (href, professor) {
            $(href).modal('show');
            $scope.BackUp = angular.copy(professor);
            $scope.professor = $scope.BackUp;
            testReg = $scope.BackUp.reg;
            getUser();
            getUnit();
        };
        $scope.addProfessor = function (professor) {
            var selecionado = {userid: professor.user.id, unitid: professor.unit.id, registration: professor.reg, action: 'insert'};
            var url = "..//data/portal/professors.jsp";
            postService.query(selecionado, url).then(function (re) {
                warningServicePost.warningBar(re, "#includeProfessor", $scope);
                getResultsPage(lastPage);
            }).catch(function (status) {
                alert("Falha ao executar o post. " + status);
            });
        };
        $scope.upProfessor = function (professor) {
            var selecionado = {id: professor.id, userid: professor.user.id, unitid: professor.unit.id, registration: professor.reg, action: 'update'};
            var url = "..//data/portal/professors.jsp";
            postService.query(selecionado, url).then(function (re) {
                warningServicePost.warningBar(re, "#updateProfessor", $scope);
                getResultsPage(lastPage);
            }).catch(function (status) {
                alert("Falha ao executar o post. " + status);
            });
        };
        //Testar o valor do campo matrícula
        $scope.testReg = function (reg, type) {
            if (reg == null || reg == '') {
                $("#unitBt").css("display", "inline");
                $("#war").css("display", "none");
            }
            if (reg != null && reg != '') {
                var url = "..//data/portal/professors.jsp?reg=" + reg + "&type=" + type + "&action=reg&testReg=" + testReg;
                getService.query(url).then(function (re) {
                    if (re.data.re.ex === true) {
                        $("#war").css("display", "block");
                        $("#unitBt").css("display", "none");

                    } else {
                        $("#war").css("display", "none");
                        $("#unitBt").css("display", "inline");
                    }
                }).catch(function (status) {
                    alert("Falha ao executar a pesquisa do campo Código. " + status);
                });
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalProfessors < $scope.professorsSize)) {
                $scope.totalProfessors = (parseInt($scope.totalProfessors) + parseInt($scope.qtdPage));
            }

            lastPage = pageNumber;
            $('#sectionLoadProfessor').hide();
            var url = "..//data/portal/professors.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchProfessors;
            getService.query(url).then(function (response) {
                if (response.data.re != null) {
                    $scope.selectError = response.data.re;
                    $scope.professors = null;
                    $scope.professorsSize = null;
                } else {
                    $scope.selectError = null;
                    $scope.professors = response.data.professors;
                    $scope.professorsSize = response.data.professors[0]["size"];
                    $('#sectionLoadProfessor').show();
                }
            });
        }
        var getUser = function () {
            var url = "..//data/portal/professors.jsp?action=getUser";
            getService.query(url).then(function (response) {
                $scope.users = response.data.users;
            });
        };
        var getUnit = function () {
            var url = "..//data/portal/professors.jsp?action=getUnit";
            getService.query(url).then(function (response) {
                $scope.units = response.data.units;
            });
        };
    }]);
Angularmodule.factory('warningServicePost', ['$timeout', function ($timeout) {
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
Angularmodule.factory('warningServiceGet', ['$timeout', function ($timeout) {
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
Angularmodule.factory('getService', ['$http', function ($http) {
        return {
            query: function (url) {
                return $http.get(url);
            }
        };
    }]);
Angularmodule.factory('postService', ['$http', function ($http) {
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
Angularmodule.directive('uiAlert', [function () {
        return {
            template: "<div id=\"selectErro\" class=\"text-danger text-center\" style=\"margin-bottom: 40px \"> \n" +
                    "<p ng-bind=\"selectError\"></p>\n" +
                    "</div>"
        };
    }]);
Angularmodule.factory("getInterception", ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
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
Angularmodule.factory("postInterception", ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
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
Angularmodule.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push("getInterception");
        $httpProvider.interceptors.push("postInterception");
    }]);