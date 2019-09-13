var Angularmodule = angular.module('Angularmodule', ['angularUtils.directives.dirPagination','ngSanitize', 'ngFileUpload', 'cp.ngConfirm']);
var ctx_path;
Angularmodule.run(['$window', function ($window) {
        this.ctx_path = $window.ctx_path;
    }]);
Angularmodule.factory('Area', ['$window', function ($w) {
        return {
            idUser: $w.idUser
        };
    }]);

Angularmodule.controller('usersController', function ($scope, $ngConfirm, getService, postService, warningServicePost) {
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
    $scope.users = [];
    $scope.qtdPage = 50;
    $scope.totalUsers = 0;
    var lastPage = 1;
    $scope.searchUsers = "";
    $scope.queryBy = "";
    $scope.fechamodal = function (x) {
        if (x == 1)
        {
            $("#updateUser").modal('hide');
            delete $scope.user;
            $scope.userForm.$setPristine();
        } else if (x == 2)
        {
            $("#sendEmail").modal('hide');
            delete $scope.user;
            $scope.userForm.$setPristine();
        }
    };
    $scope.selectQtd = function (qtd) {
        $scope.qtdPage = qtd;
        getResultsPage(lastPage);
        $scope.pagination.current = 1;
    };
    getResultsPage(1);
    $scope.sendEmail = function () {
        $scope.show = false;
        delete $scope.user;
        $("#sendEmail").modal("show");
    };
    $scope.abreEditar = function (href, user) {
        $scope.BackUp = angular.copy(user);
        $scope.user = $scope.BackUp;
        $(href).modal("show");
    };
    $scope.emailUser = function (user) {
        var selecionado = {email: user.email, action: 'sendEmail'};
        var url = ctx_path + "/data/portal/users.jsp";
        postService.query(selecionado, url).then(function (re) {
            warningServicePost.warningBar(re, "#sendEmail", $scope);
            getResultsPage(lastPage);
        }).catch(function (status) {
            //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
            modal_error();
        });
    };
    $scope.upUser = function (user) {
        delete user.backup;
        user.action = "update";
        $scope.loading_modal = true;
        var url = ctx_path + "/data/portal/users.jsp";
        postService.query(user, url).then(function (re) {
            warningServicePost.warningBar(re, "#updateUser", $scope);
            getResultsPage(lastPage);
            $scope.loading_modal = false;
        }).catch(function (status) {
            $scope.loading_modal = false;
            //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
            modal_error();
        });
    };
    //Excluir Usuário    
    $scope.confirmacaoExcluir = function (item_name, user_id) {
        $scope.name = item_name;
        $ngConfirm({
            title: 'Confirmação!',
            content: 'Tem certeza que desejar excluir o usuário <strong>{{name}}</strong>?',
            scope: $scope,
            buttons: {
                Sim: {
                    text: 'Sim',
                    btnClass: 'btn-blue',
                    action: function (scope, button) {
                        deleteUsers(user_id);
                    }
                },
                Cancelar: function (scope, button) {
                    // closes the modal
                }
            }
        });
    };
    deleteUsers = function (user_id) {
        var selecionado = {userid: user_id, action: 'delete'};
        var url = ctx_path + "/data/portal/users.jsp";
        postService.query(selecionado, url).then(function (re) {
            getResultsPage(lastPage);
            modal_success("Exclusão Realizada com sucesso.");
            $("#deleteUsers").modal("hide");
        }).catch(function (status) {
            //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
            modal_error();
        });
    };

    //Resetar senha Usuário    
    $scope.confirmacaoResetPass = function (name, user_id) {
        $scope.name = name;
        $ngConfirm({
            title: 'Confirmação!',
            content: 'Tem certeza que deseja resetar a senha do usuário <strong>{{name}}</strong>?',
            scope: $scope,
            buttons: {
                Sim: {
                    text: 'Sim',
                    btnClass: 'btn-blue',
                    action: function (scope, button) {
                        resetPassUsers(user_id);
                    }
                },
                Cancelar: function (scope, button) {
                    // closes the modal
                }
            }
        });
    };
    resetPassUsers = function (user_id) {
        var selecionado = {user_id: user_id, action: 'reset_password'};
        var url = ctx_path + "/data/portal/users.jsp";
        postService.query(selecionado, url).then(function (re) {
            getResultsPage(lastPage);
            modal_success("Resetado com sucesso.");
        }).catch(function (status) {
            //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
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
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalUsers < $scope.usersSize)) {
            $scope.totalUsers = (parseInt($scope.totalUsers) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $('#table-users').removeClass('hidden');
        var url = ctx_path + "/data/portal/users.jsp?&action=getUsersAdmin&limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchUsers;
        getService.query(url).then(function (response) {
            if (response.data.re != null) {
                $scope.selectError = response.data.re;
                $scope.users = null;
                $scope.usersSize = null;
            } else {
                $scope.selectError = null;
                $scope.users = response.data.users;
                $scope.usersSize = response.data.users[0]["size"];
                $('#sectionLoadUser').show();
            }

        });
    }
});
Angularmodule.controller('highlightsController', ['$scope', '$timeout', 'getService', 'postService', 'warningServicePost', 'Upload', 'Area', function ($scope, $timeout, getService, postService, warningServicePost, Upload, Area) {
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
            }
        };
        $scope.apagarCampos = function (dest) {
            $scope.dest.title = '';
            $scope.dest.area = '';
            $scope.dest.url = '';
            $scope.dest.startdate = '';
            $scope.dest.enddate = '';
            $scope.dest.manager = dest.manager;
            $scope.picFile = null;
            $(".form-group #imageDemo").show();
        };
        getResultsPage(1);
        $scope.abreAdd = function () {
            $scope.show = false;
            delete $scope.dest;
            $("#includeDest").modal("show");
            getManager();
            $scope.dest = {manager: {id: Area.idUser}};
            $scope.picFile = null;
            $(".form-group #imageDemo").show();
            var path = window.contexto + "/res/images/default_image.jpg";
            $(".form-group #imageDemo").prop("src", path);
        };
        $scope.abreEditar = function (href, dest) {
            $(href).modal("show");
            $scope.show = false;
            $scope.BackUp = angular.copy(dest);
            $scope.BackUp.startdate = new Date(parseInt($scope.BackUp.startdate));
            $scope.BackUp.enddate = new Date(parseInt($scope.BackUp.enddate));
            getManager();
            $scope.dest = $scope.BackUp;
            $scope.picFile = null;
            $(".form-group #imageDemo").show();
            $(".form-group #imageDemo").prop("src", "../../ByteArray?aba=highlight&id=" + $scope.BackUp.id);
        };
        $scope.changeImagem = function () {
            $(".form-group #imageDemo").hide();
        };
        $scope.addDest = function (dest, file) {
            var selecionado = "";
            if (file !== null) {
                selecionado = {title: dest.title, area: dest.area, url: dest.url, managerid: dest.manager.id, file: file};
                file.upload = Upload.upload({
                    url: ctx_path + '/data/portal/highlights.jsp?action=insert&startdate=' + dest.startdate + '&enddate=' + dest.enddate,
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
                selecionado = {title: dest.title, area: dest.area, url: dest.url, startdate: dest.startdate, enddate: dest.enddate, managerid: dest.manager.id, action: 'insert'};
                var url = ctx_path + "/data/portal/highlights.jsp";
                postService.query(selecionado, url).then(function (re) {
                    warningServicePost.warningBar(re, "#includeDest", $scope);
                    getResultsPage(lastPage);
                }).catch(function (status) {
                    //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                    modal_error();
                });
            }
        };
        $scope.upDest = function (dest, file) {
            var selecionado = "";
            if (file !== null) {
                selecionado = {id: dest.id, title: dest.title, area: dest.area, url: dest.url, managerid: dest.manager.id, file: file};
                file.upload = Upload.upload({
                    url: ctx_path + '/data/portal/highlights.jsp?action=update&startdate=' + dest.startdate + '&enddate=' + dest.enddate,
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
                selecionado = {id: dest.id, title: dest.title, area: dest.area, url: dest.url, startdate: dest.startdate, enddate: dest.enddate, managerid: dest.manager.id, action: 'update'};
                var url = ctx_path + "/data/portal/highlights.jsp";
                postService.query(selecionado, url).then(function (re) {
                    warningServicePost.warningBar(re, "#updateDest", $scope);
                    getResultsPage(lastPage);
                }).catch(function (status) {
                    //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                    modal_error();
                });
            }
        };        
        $scope.confirmacaoExcluir = function (item_name, item_id) {
            $scope.name = item_name;
            $ngConfirm({
                title: 'Confirmação!',
                content: 'Tem certeza que desejar excluir o item <strong>{{name}}</strong>?',
                scope: $scope,
                buttons: {
                    Sim: {
                        text: 'Sim',
                        btnClass: 'btn-blue',
                        action: function (scope, button) {
                            deleteHighlight(item_id);
                        }
                    },
                    Cancelar: function (scope, button) {
                        // closes the modal
                    }
                }
            });
        };
        deleteHighlight = function (item_id) {
            var selecionado = {destId: item_id, action: 'delete'};
            var url = ctx_path + "/data/portal/highlights.jsp";
            postService.query(selecionado, url).then(function (re) {
                modal_sucess();
                $("#deleteHighlight").modal('hide');
                getResultsPage(lastPage);
            }).catch(function (status) {
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalHighlights < $scope.highlightsSize)) {
                $scope.totalHighlights = (parseInt($scope.totalHighlights) + parseInt($scope.qtdPage));
            }

            lastPage = pageNumber;
            var url = ctx_path + "/data/portal/highlights.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchHighlights + "&manager=super";
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
        var getManager = function () {
            var url = ctx_path + "/data/portal/highlights.jsp?action=getManager";
            getService.query(url).then(function (response) {
                $scope.managers = response.data.managers;
            });
        };
        /*
         $scope.selManager = function (area) {
         var url = ctx_path + "/data/portal/highlights.jsp?action=getSelManager&area=" + area;
         getService.query(url).then(function (response) {
         if (response.data.re != null) {
         $scope.managers = null;
         $scope.selMan = response.data.re;
         } else {
         $scope.selMan = 'Selecione um gestor';
         $scope.managers = response.data.managers;
         }
         });
         };*/
    }]);
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
            }
        };
        $scope.selectQtd = function (qtd) {
            $scope.qtdPage = qtd;
            getResultsPage(lastPage);
            $scope.pagination.current = 1;
        };
        $scope.apagarCampos = function (doc) {
            $scope.doc.title = '';
            $scope.doc.area = '';
            $scope.doc.type = doc.type;
            $scope.doc.url = '';
            $scope.doc.description = '';
        };
        getResultsPage(1);
        $scope.abreAdd = function () {
            $scope.show = false;
            delete $scope.doc;
            $("#includeDoc").modal("show");
            getManager();
            $scope.doc = {type: "documento", manager: {id: Area.idUser}};
        };
        $scope.abreEditar = function (href, doc) {
            $(href).modal("show");
            $scope.BackUp = angular.copy(doc);
            $scope.doc = $scope.BackUp;
            getManager();
        };
        $scope.addDoc = function (doc) {
            var selecionado = {title: doc.title, area: doc.area, type: doc.type, url: doc.url, description: doc.description, managerid: doc.manager.id, action: 'insert'};
            var url = ctx_path + "/data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                warningServicePost.warningBar(re, "#includeDoc", $scope);
                getResultsPage(lastPage);
            }).catch(function (status) {
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                modal_error();
            });
        };
        $scope.upDoc = function (doc) {
            var selecionado = {id: doc.id, title: doc.title, area: doc.area, type: doc.type, url: doc.url, description: doc.description, managerid: doc.manager.id, action: 'update'};
            var url = ctx_path + "/data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                warningServicePost.warningBar(re, "#updateDoc", $scope);
                getResultsPage(lastPage);
            }).catch(function (status) {
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                modal_error();
            });
        };        
        $scope.confirmacaoExcluir = function (item_name, item_id) {
            $scope.name = item_name;
            $ngConfirm({
                title: 'Confirmação!',
                content: 'Tem certeza que desejar excluir o item <strong>{{name}}</strong>?',
                scope: $scope,
                buttons: {
                    Sim: {
                        text: 'Sim',
                        btnClass: 'btn-blue',
                        action: function (scope, button) {
                            deleteDocument(item_id);
                        }
                    },
                    Cancelar: function (scope, button) {
                        // closes the modal
                    }
                }
            });
        };
        deleteDocument = function (item_id) {
            var selecionado = {docId: item_id, action: 'delete'};
            var url = ctx_path + "/data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                modal_success();
                $("#deleteDocument").modal('hide');
                getResultsPage(lastPage);
            }).catch(function (status) {
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalDocuments < $scope.documentsSize)) {
                $scope.totalDocuments = (parseInt($scope.totalDocuments) + parseInt($scope.qtdPage));
            }

            lastPage = pageNumber;
            var url = ctx_path + "/data/portal/documents.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchDocuments + "&type=documento" + "&manager=super";
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
        var getManager = function () {
            var url = ctx_path + "/data/portal/documents.jsp?action=getManager";
            getService.query(url).then(function (response) {
                $scope.managers = response.data.managers;
            });
        };
        /*
         $scope.selManager = function (area) {
         var url = ctx_path + "/data/portal/documents.jsp?action=getSelManager&area=" + area;
         getService.query(url).then(function (response) {
         if (response.data.re != null) {
         $scope.managers = null;
         $scope.selMan = response.data.re;
         } else {
         $scope.selMan = 'Selecione um gestor';
         $scope.managers = response.data.managers;
         }
         });
         };*/
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
            }
        };
        $scope.apagarCampos = function (link) {
            $scope.link.title = '';
            $scope.link.area = '';
            $scope.link.type = link.type;
            $scope.link.url = '';
            $scope.link.description = '';
        };
        getResultsPage(1);
        $scope.abreAdd = function () {
            $scope.show = false;
            delete $scope.link;
            $("#includeLink").modal("show");
            $scope.link = {type: "link", manager: {id: Area.idUser}};
            getManager();
        };
        $scope.abreEditar = function (href, link) {
            $(href).modal("show");
            $scope.BackUp = angular.copy(link);
            $scope.link = $scope.BackUp;
            getManager();
        };
        $scope.addLink = function (link) {
            var selecionado = {title: link.title, area: link.area, type: link.type, url: link.url, description: link.description, managerid: link.manager.id, action: 'insert'};
            var url = ctx_path + "/data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                warningServicePost.warningBar(re, "#includeLink", $scope);
                getResultsPage(lastPage);
            }).catch(function (status) {
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                modal_error();
            });
        };
        $scope.upLink = function (link) {
            var selecionado = {id: link.id, title: link.title, area: link.area, type: link.type, url: link.url, description: link.description, managerid: link.manager.id, action: 'update'};
            var url = ctx_path + "/data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                warningServicePost.warningBar(re, "#updateLink", $scope);
                getResultsPage(lastPage);
            }).catch(function (status) {
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                modal_error();
            });
        };
        
        $scope.confirmacaoExcluir = function (item_name, item_id) {
            $scope.name = item_name;
            $ngConfirm({
                title: 'Confirmação!',
                content: 'Tem certeza que desejar excluir o item <strong>{{name}}</strong>?',
                scope: $scope,
                buttons: {
                    Sim: {
                        text: 'Sim',
                        btnClass: 'btn-blue',
                        action: function (scope, button) {
                            deleteLink(item_id);
                        }
                    },
                    Cancelar: function (scope, button) {
                        // closes the modal
                    }
                }
            });
        };
        deleteLink = function (item_id) {
            var selecionado = {docId: item_id, action: 'delete'};
            var url = ctx_path + "/data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                modal_success();
                $("#deleteLink").modal('hide');
                getResultsPage(lastPage);
            }).catch(function (status) {
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalLinks < $scope.linksSize)) {
                $scope.totalLinks = (parseInt($scope.totalLinks) + parseInt($scope.qtdPage));
            }

            lastPage = pageNumber;
            $('#sectionLoadLink').hide();
            var url = ctx_path + "/data/portal/documents.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchLinks + "&type=link" + "&manager=super";
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
        var getManager = function () {
            var url = ctx_path + "/data/portal/documents.jsp?action=getManager";
            getService.query(url).then(function (response) {
                $scope.managers = response.data.managers;
            });
        };
        /*
         $scope.selManager = function (area) {
         var url = ctx_path + "/data/portal/documents.jsp?action=getSelManager&area=" + area;
         getService.query(url).then(function (response) {
         if (response.data.re != null) {
         $scope.managers = null;
         $scope.selMan = response.data.re;
         } else {
         $scope.selMan = 'Selecione um gestor';
         $scope.managers = response.data.managers;
         }
         });
         };*/
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
            }
        };
        $scope.apagarCampos = function (video) {
            $scope.video.title = '';
            $scope.video.area = '';
            $scope.video.type = video.type;
            $scope.video.url = '';
            $scope.video.description = '';
        };
        getResultsPage(1);
        $scope.abreAdd = function () {
            $scope.show = false;
            delete $scope.video;
            $("#includeVideo").modal("show");
            $scope.video = {type: "video", manager: {id: Area.idUser}};
            getManager();
        };
        $scope.abreEditar = function (href, video) {
            $(href).modal("show");
            $scope.BackUp = angular.copy(video);
            $scope.video = $scope.BackUp;
            getManager();
        };
        $scope.addVideo = function (video) {
            var selecionado = {title: video.title, area: video.area, type: video.type, url: video.url, description: video.description, managerid: video.manager.id, action: 'insert'};
            var url = ctx_path + "/data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                warningServicePost.warningBar(re, "#includeVideo", $scope);
                getResultsPage(lastPage);
            }).catch(function (status) {
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                modal_error();
            });
        };
        $scope.upVideo = function (video) {
            var selecionado = {id: video.id, title: video.title, area: video.area, type: video.type, url: video.url, description: video.description, managerid: video.manager.id, action: 'update'};
            var url = ctx_path + "/data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                warningServicePost.warningBar(re, "#updateVideo", $scope);
                getResultsPage(lastPage);
            }).catch(function (status) {
                modal_error();
            });
        };
        $scope.confirmacaoExcluir = function (item_name, item_id) {
            $scope.name = item_name;
            $ngConfirm({
                title: 'Confirmação!',
                content: 'Tem certeza que desejar excluir o item <strong>{{name}}</strong>?',
                scope: $scope,
                buttons: {
                    Sim: {
                        text: 'Sim',
                        btnClass: 'btn-blue',
                        action: function (scope, button) {
                            deleteVideo(item_id);
                        }
                    },
                    Cancelar: function (scope, button) {
                        // closes the modal
                    }
                }
            });
        };
        deleteVideo = function (item_id) {
            var selecionado = {docId: item_id, action: 'delete'};
            var url = ctx_path + "/data/portal/documents.jsp";
            postService.query(selecionado, url).then(function (re) {
                modal_success();                
                getResultsPage(lastPage);
            }).catch(function (status) {
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalVideos < $scope.videosSize)) {
                $scope.totalVideos = (parseInt($scope.totalVideos) + parseInt($scope.qtdPage));
            }

            lastPage = pageNumber;
            $('#sectionLoadVideo').hide();
            var url = ctx_path + "/data/portal/documents.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchVideos + "&type=video" + "&manager=super";
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
        var getManager = function () {
            var url = ctx_path + "/data/portal/documents.jsp?action=getManager";
            getService.query(url).then(function (response) {
                $scope.managers = response.data.managers;
            });
        };
        /*
         $scope.selManager = function (area) {
         var url = ctx_path + "/data/portal/documents.jsp?action=getSelManager&area=" + area;
         getService.query(url).then(function (response) {
         if (response.data.re != null) {
         $scope.managers = null;
         $scope.selMan = response.data.re;
         } else {
         $scope.selMan = 'Selecione um gestor';
         $scope.managers = response.data.managers;
         }
         });
         };*/
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
            var url = ctx_path + "//data/portal/regions.jsp?action=testarCampos&name=" + reg.name + "&type=insert";
            getService.query(url).then(function (re) {
                if (re.data.erro === "null") {
                    if (re.data.re === "0") {
                        reg.action = "insert";
                        if (typeof reg.ai !== "undefined") {
                            var selecionado = {name: reg.name, ai: reg.ai.id, action: reg.action};
                        } else {
                            var selecionado = {name: reg.name, action: reg.action};
                        }
                        var url = ctx_path + "//data/portal/regions.jsp";
                        postService.query(selecionado, url).then(function (re) {
                            warningServicePost.warningBar(re, "#includeRegion", $scope);
                            getResultsPage(lastPage);
                        }).catch(function (status) {
                            //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                            modal_error();
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
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                modal_error();
            });
        };
        //Atualizar Região
        $scope.upRegion = function (reg) {
            var url = ctx_path + "//data/portal/regions.jsp?action=testarCampos&name=" + reg.name + "&ai=" + reg.ai.id + "&testName=" + testName + "&type=update";
            getService.query(url).then(function (re) {
                if (re.data.erro === "null") {
                    if (re.data.re === "0") {
                        reg.action = "update";
                        if (typeof reg.ai !== "undefined") {
                            var selecionado = {id: reg.id, name: reg.name, ai: reg.ai.id, action: reg.action};
                        } else {
                            var selecionado = {id: reg.id, name: reg.name, action: reg.action};
                        }
                        var url = ctx_path + "//data/portal/regions.jsp";
                        postService.query(selecionado, url).then(function (re) {
                            warningServicePost.warningBar(re, "#updateRegion", $scope);
                            getResultsPage(lastPage);
                        }).catch(function (status) {
                            //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                            modal_error();
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
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                modal_error();
            });
        };
        //Excluir Região
        $scope.confirmacaoExcluir = function (item_name, item_id) {
            $scope.name = item_name;
            $ngConfirm({
                title: 'Confirmação!',
                content: 'Tem certeza que desejar excluir o item <strong>{{name}}</strong>?',
                scope: $scope,
                buttons: {
                    Sim: {
                        text: 'Sim',
                        btnClass: 'btn-blue',
                        action: function (scope, button) {
                            deleteRegion(item_id, item_name);
                        }
                    },
                    Cancelar: function (scope, button) {
                        // closes the modal
                    }
                }
            });
        };
        deleteRegion = function (item_id, item_name) {
            var selecionado = {id: item_id, regName: item_name, action: 'delete'};
            var url = ctx_path + "//data/portal/regions.jsp";
            postService.query(selecionado, url).then(function (re) {
                modal_success()
                getResultsPage(lastPage);
            }).catch(function (status) {
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalRegions < $scope.regionSize)) {
                $scope.totalRegions = (parseInt($scope.totalRegions) + parseInt($scope.qtdPage));
            }

            lastPage = pageNumber;

            $('#sectionLoadRegion').hide();
            var url = ctx_path + "//data/portal/regions.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchRegion;
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
            var url = ctx_path + "//data/portal/regions.jsp?action=getProfessor";
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
            }
        };
        $scope.apagarCampos = function () {
            $scope.unit.code = '';
            $scope.unit.name = '';
            $scope.unit.address = '';
            $scope.unit.site = '';
            $scope.unit.email = '';
        };
        var withoutCoordinateController = false;
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
            getPrincipal("insert");
            getCoordinator("insert");
        };
        var testName;
        $scope.abreEditar = function (href, unit) {
            $(href).modal("show");
            $scope.BackUp = angular.copy(unit);
            $scope.unit = $scope.BackUp;
            getRegion();
            getPrincipal("update", $scope.BackUp.principal.id);
            getCoordinator("update", $scope.BackUp.coordinator.id);
            testName = $scope.BackUp.name;
        };
        $scope.viewUnit = function (id, unit) {
            $scope.BackUp = angular.copy(unit);
            $scope.unitDetail = $scope.BackUp;
            $(id).modal("show");
        };
        $scope.addUnit = function (unit) {
            var url = ctx_path + "/data/portal/units.jsp?action=testarCampos&name=" + unit.name + "&type=insert";
            getService.query(url).then(function (re) {
                if (re.data.erro === "null") {
                    if (re.data.re === "0") {
                        var selecionado;
                        if (!unit.principal) {
                            selecionado = {code: unit.code, type: unit.type, name: unit.name, address: unit.address, latitude: unit.latitude, longitude: unit.longitude, site: unit.site, email: unit.email, regionid: unit.region.id, coordinator: unit.coordinator.id, action: 'insert'};
                        } else {
                            selecionado = {code: unit.code, type: unit.type, name: unit.name, address: unit.address, latitude: unit.latitude, longitude: unit.longitude, site: unit.site, email: unit.email, regionid: unit.region.id, principal: unit.principal.id, coordinator: unit.coordinator.id, action: 'insert'};
                        }
                        var url = ctx_path + "/data/portal/units.jsp";
                        postService.query(selecionado, url).then(function (re) {
                            warningServicePost.warningBar(re, "#includeUnit", $scope);
                            $scope.unit.code = '';
                            getResultsPage(lastPage);
                        }).catch(function (status) {
                            //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                            modal_error();
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
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                modal_error();
            });
        };
        $scope.upUnit = function (unit) {
            var url = ctx_path + "/data/portal/units.jsp?action=testarCampos&name=" + unit.name + "&testName=" + testName + "&type=update";
            getService.query(url).then(function (re) {
                if (re.data.erro === "null") {
                    if (re.data.re === "0") {
                        var selecionado = {id: unit.id, code: unit.code, type: unit.type, name: unit.name, address: unit.address, latitude: unit.latitude, longitude: unit.longitude, site: unit.site, email: unit.email, regionid: unit.region.id, principal: unit.principal.id, coordinator: unit.coordinator.id, action: 'update'};
                        var url = ctx_path + "/data/portal/units.jsp";
                        postService.query(selecionado, url).then(function (re) {
                            warningServicePost.warningBar(re, "#updateUnit", $scope);
                            getResultsPage(lastPage);
                        }).catch(function (status) {
                            //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                            modal_error();
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
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                modal_error();
            });
        };
        //Testar o valor do campo code
        $scope.testCode = function (code) {
            if (code == null || code == '') {
                $("#unitButton").css("display", "inline");
                $("#warnning").css("display", "none");
            }
            if (typeof code == 'undefined') {

            } else if (code.toString().length > 10) {
                $("#warnning").text("Número de entradas deve ser menor ou igual que 10.");
                $("#warnning").css("display", "block");
                $("#unitButton").css("display", "none");
            } else if (code != null && code != '') {
                var url = ctx_path + "/data/portal/units.jsp?code=" + code + "&action=code";
                getService.query(url).then(function (re) {
                    if (re.data.re.ex === true) {
                        $("#warnning").css("display", "block");
                        $("#warnning").text("Código já existe.");
                        $("#unitButton").css("display", "none");

                    } else {
                        $("#warnning").css("display", "none");
                        $("#unitButton").css("display", "inline");
                    }
                }).catch(function (status) {
                    $("#unitButton").css("display", "none");
                    $("#warnning").css("display", "block");
                    $("#warnning").text("Não é permitido o uso de (. + - ,).");
                });
            }
        };
        $scope.confirmacaoExcluir = function (item_name, item_id) {
            $scope.name = item_name;
            $ngConfirm({
                title: 'Confirmação!',
                content: 'Tem certeza que desejar excluir o item <strong>{{name}}</strong>?',
                scope: $scope,
                buttons: {
                    Sim: {
                        text: 'Sim',
                        btnClass: 'btn-blue',
                        action: function (scope, button) {
                            deleteUnit(item_id, item_name);
                        }
                    },
                    Cancelar: function (scope, button) {
                        // closes the modal
                    }
                }
            });
        };
        deleteUnit = function (item_id,item_name) {
            var selecionado = {unitId: item_id, unitName: item_name, action: 'delete'};
            var url = ctx_path + "/data/portal/units.jsp";
            postService.query(selecionado, url).then(function (re) {
                $("#deleteUnit").modal('hide');
                modal_success();
                getResultsPage(lastPage);
            }).catch(function (status) {
                //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
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

        $scope.getAllUnits = function () {
            $scope.searchUnits = "";
            $scope.queryBy = "";
            $("#allUnits").addClass("active");
            $("#wCoordinate").removeClass("active");
            withoutCoordinateController = false;
            getResultsPage(lastPage);
        };
        $scope.getWithoutCoordinate = function () {
            $scope.searchUnits = "";
            $scope.queryBy = "";
            $("#wCoordinate").addClass("active");
            $("#allUnits").removeClass("active");
            withoutCoordinateController = true;
            getResultsPage(lastPage);
        };
        function getResultsPage(pageNumber) {
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalUnits < $scope.unitsSize)) {
                $scope.totalUnits = (parseInt($scope.totalUnits) + parseInt($scope.qtdPage));
            }

            lastPage = pageNumber;
            $('#sectionLoadUnit').hide();
            var url = "";
            if (withoutCoordinateController === true) {
                url = ctx_path + "/data/portal/units.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchUnits + "&wCController=true";
            } else {
                url = ctx_path + "/data/portal/units.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchUnits + "&wCController=false";
            }
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
            var url = ctx_path + "/data/portal/units.jsp?action=getRegion";
            getService.query(url).then(function (response) {
                $scope.regions = response.data.regions;
            });
        };
        var getPrincipal = function (type, principalId) {
            var url = ctx_path + "/data/portal/units.jsp?action=getProfessor&type=" + type + "&principalid=" + principalId;
            getService.query(url).then(function (response) {
                $scope.principals = response.data.professors;
            });
        };
        var getCoordinator = function (type, coordinatorId) {
            var url = ctx_path + "/data/portal/units.jsp?action=getCoordinator&type=" + type + "&coordinatorid=" + coordinatorId;
            getService.query(url).then(function (response) {
                $scope.coordinators = response.data.coordinators;
            });
        };
    }]);
Angularmodule.controller('professorsController', ['$scope', '$timeout', 'getService', 'postService', 'warningServicePost', 'warningServiceGet', 'Upload', function ($scope, $timeout, getService, postService, warningServicePost, warningServiceGet, Upload) {
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
                delete $scope.prof;
                $scope.professorForm.$setPristine();
                $scope.picFile = null;
            } else if (x == 2)
            {
                $("#includeProfessor").modal('hide');
                delete $scope.prof;
                $scope.professorForm.$setPristine();
                $scope.picFile = null;
            }
        };
        $scope.apagarCampos = function () {
            $scope.prof.user = null;
            $scope.prof.unit = null;
            $scope.prof.reg = null;
            $scope.picFile = null;
            $(".form-group #imageDemo").show();
            $(".form-group #war").css("display", "none");
            $(".modal-footer .unitBt").css("display", "inline");
        };
        getResultsPage(1);
        $scope.abreAdd = function () {
            $scope.show = false;
            $scope.prof = {};
            $scope.picFile = null;
            $("#includeProfessor").modal("show");
            $(".form-group #war").css("display", "none");
            $(".modal-footer .unitBt").css("display", "inline");
            $(".form-group #imageDemo").show();
            var path = window.contexto + "/res/images/default_image.jpg";
            $(".form-group #imageDemo").prop("src", path);
            getUser();
            getUnit();
        };
        var testReg;
        var count = 0;
        $scope.abreEditar = function (href, professor) {
            $(href).modal('show');
            $scope.BackUp = angular.copy(professor);
            $scope.prof = {reg: parseInt($scope.BackUp.reg), unit: $scope.BackUp.unit, userName: $scope.BackUp.user.name, user: $scope.BackUp.user, id: $scope.BackUp.id};
            testReg = $scope.BackUp.reg;
            $scope.picFile = null;
            getUnit();
            $(".form-group #war").css("display", "none");
            $(".modal-footer .unitBt").css("display", "inline");
            $(".form-group #imageDemo").show();
            $(".form-group #imageDemo").prop("src", "ByteArray?aba=professor&id=" + $scope.BackUp.id + "&var=" + count);
            ++count;
        };
        $scope.changeImagem = function () {
            $(".form-group #imageDemo").hide();
        };
        $scope.addProfessor = function (prof, file) {
            var selecionado = "";
            if (file !== null) {
                var selecionado = {userid: prof.user.id, unitid: prof.unit.id, registration: prof.reg, file: file};
                file.upload = Upload.upload({
                    url: '..//data/portal/professors.jsp?action=insert',
                    data: {selecionado},
                    method: 'POST',
                    headers: {'content-type': undefined}
                });
                file.upload.then(function (re) {
                    $timeout(function () {
                        file.result = re.data;
                    });
                    getUser();
                    $scope.prof.reg = '';
                    warningServicePost.warningBar(re, "#includeProfessor", $scope);
                    getResultsPage(lastPage);
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes                     
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });
            } else {
                var selecionado = {userid: prof.user.id, unitid: prof.unit.id, registration: prof.reg, action: 'insert'};
                var url = ctx_path + "//data/portal/professors.jsp";
                postService.query(selecionado, url).then(function (re) {
                    warningServicePost.warningBar(re, "#includeProfessor", $scope);
                    $scope.prof.reg = '';
                    getResultsPage(lastPage);
                }).catch(function (status) {
                    //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                    modal_error();
                });
            }


        };
//        $scope.addProfessor = function (prof) {
//            var selecionado = {userid: prof.user.id, unitid: prof.unit.id, registration: prof.reg, action: 'insert'};
//            var url = ctx_path + "//data/portal/professors.jsp";
//            postService.query(selecionado, url).then(function (re) {
//                warningServicePost.warningBar(re, "#includeProfessor", $scope);
//                getResultsPage(lastPage);
//            }).catch(function (status) {
//                alert("Falha ao executar o post. " + status);
//            });
//        };
        $scope.upProfessor = function (prof, file) {
            var selecionado = "";
            if (file !== null) {
                var selecionado = {id: prof.id, userid: prof.user.id, unitid: prof.unit.id, registration: prof.reg, file: file};
                file.upload = Upload.upload({
                    url: '..//data/portal/professors.jsp?action=update',
                    data: {selecionado},
                    method: 'POST',
                    headers: {'content-type': undefined}
                });
                file.upload.then(function (re) {
                    $timeout(function () {
                        file.result = re.data;
                    });
                    warningServicePost.warningBar(re, "#updateProfessor", $scope);
                    getResultsPage(lastPage);
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes                     
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            } else {
                var selecionado = {id: prof.id, userid: prof.user.id, unitid: prof.unit.id, registration: prof.reg, action: 'update'};
                var url = ctx_path + "//data/portal/professors.jsp";
                postService.query(selecionado, url).then(function (re) {
                    warningServicePost.warningBar(re, "#updateProfessor", $scope);
                    getResultsPage(lastPage);
                }).catch(function (status) {
                    //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                    modal_error();
                });
            }
        };
//        $scope.upProfessor = function (prof) {
//            var selecionado = {id: prof.id, userid: prof.user.id, unitid: prof.unit.id, registration: prof.reg, action: 'update'};
//            var url = ctx_path + "//data/portal/professors.jsp";
//            postService.query(selecionado, url).then(function (re) {
//                warningServicePost.warningBar(re, "#updateProfessor", $scope);
//                getResultsPage(lastPage);
//            }).catch(function (status) {
//                alert("Falha ao executar o post. " + status);
//            });
//        };
        //Testar o valor do campo matrícula
        $scope.testReg = function (reg, type) {
            if (reg == null || reg == '') {
                $(".modal-footer .unitBt").css("display", "inline");
                $(".form-group #war").css("display", "none");
            }
            if (reg === null) {

            } else if (reg.toString().length > 10) {
                $(".form-group #war").text("Número de entradas deve ser menor ou igual que 10.");
                $(".form-group #war").css("display", "block");
                $(".modal-footer .unitBt").css("display", "none");
            } else if (reg != null && reg != '') {
                var url = ctx_path + "//data/portal/professors.jsp?reg=" + reg + "&type=" + type + "&action=reg&testReg=" + testReg;
                getService.query(url).then(function (re) {
                    if (re.data.re.ex === true) {
                        $(".form-group #war").css("display", "block");
                        $(".modal-footer .unitBt").css("display", "none");
                    } else {
                        $(".form-group #war").css("display", "none");
                        $(".modal-footer .unitBt").css("display", "inline");
                    }
                }).catch(function (status) {
                    //função que chama o modal com mensagem padrão, recebe um parametro mensagem;
                    modal_error();
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
            var url = ctx_path + "//data/portal/professors.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchProfessors;
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
            var url = ctx_path + "//data/portal/professors.jsp?action=getUser";
            getService.query(url).then(function (response) {
                $scope.users = response.data.users;
            });
        };
        var getUnit = function () {
            var url = ctx_path + "//data/portal/professors.jsp?action=getUnit";
            getService.query(url).then(function (response) {
                $scope.units = response.data.units;
            });
        };
    }]);



Angularmodule.controller('scheduleAdmController', ['$scope', '$timeout', 'getService', 'postService', 'warningServicePost', 'warningServiceGet', function ($scope, $timeout, getService, postService, warningServicePost, warningServiceGet) {
        $scope.x = 'name';
        $scope.myOrderBy = false;
        $scope.orderByMe = function (x) {
            $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
            $scope.x = x;
        };
        $scope.schedules = [];
        $scope.qtdPage = 50;
        $scope.totalSchedules = 0;
        var lastPage = 1;
        $scope.searchSchedules = "";
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
            if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalSchedules < $scope.schedulesSize)) {
                $scope.totalSchedules = (parseInt($scope.totalSchedules) + parseInt($scope.qtdPage));
            }

            lastPage = pageNumber;
            $('#sectionLoadSchedule').hide();
            var url = ctx_path + "/data/schedule/admin.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.searchSchedules + "&action=getEventsAdmin";
            getService.query(url).then(function (response) {
                if (response.data.re != null) {
                    $scope.selectError = response.data.re;
                    $scope.schedules = null;
                    $scope.schedulesSize = null;
                } else {
                    $scope.selectError = null;
                    $scope.schedules = response.data.schedules;
                    $scope.schedulesSize = response.data.schedules[0]["size"];
                    $('#sectionLoadSchedule').show();
                }
            });
        }
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
Angularmodule.factory("getInterception", ['$q', '$log', function ($q, $log) {
        var xhr = 0;
        function isLoading() {
            return xhr > 0;
        }
        function updateStatus() {
            loadingGet = isLoading();
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
            loadingPost = isLoading();
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
