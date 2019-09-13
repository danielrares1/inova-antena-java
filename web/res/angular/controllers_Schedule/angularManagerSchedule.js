/* global material */

var Agendamodule = angular.module("ngApp", ["ngFileUpload", "angularUtils.directives.dirPagination", 'ngSanitize', 'ui.select', 'angular-input-stars','cp.ngConfirm']);
var ctx_path;
var unit_and_region_backup;
var oldLocationPositioned;
Agendamodule.run(['$rootScope', '$window', 'getService', function ($rootScope, $window, getService) {

        ctx_path = $window.ctx_path;
        //Faz um get de unidades para os dropdowns.
        getService.query(ctx_path + "/data/select-dropdown.jsp?action=UnitsAndRegions&latitude=&longitude=").then(function (response) {
            $rootScope.unitsArray = response.data.UnitsAndRegions;
        });
        getService.query(ctx_path + "/data/select-dropdown.jsp?action=areaTech").then(function (response) {
            $rootScope.areaArray = [];
            $rootScope.areaArray = response.data.areaArray;
        });
    }]);
Agendamodule.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
});
Agendamodule.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];
        if (angular.isArray(items)) {
            var keys = Object.keys(props);
            items.forEach(function (item) {
                var itemMatches = false;
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

Agendamodule.controller('controllerEvent', function ($scope, $http, $compile, $rootScope, postService, getService, Upload, $timeout,$ngConfirm) {
    var confirm = 0;
    $scope.event = [];
    $scope.event.units = [];
    $scope.event.date = [];
    $scope.event.regionSelected = [];
    $scope.event.unitSelected = [];
    $scope.event.terms = false;
    $scope.qtdDate = 0;
    var cont = 0;
    var unit_cont = 0;
    $scope.event.cpf = "";
    $scope.term = 0;
    $scope.geo = true;
    onStart();
    //LIMITANDO AS datas;
    $scope.today = addDays(8);
    $scope.afterToday = addDays(366);
    $scope.errorDate = false;

    //Ao iniciar.
    function onStart() {
        setTimeout(function () {
            $('#itemContent_loader').addClass('hidden');
            $('#itemContent_section').removeClass('hidden');
            $('#item_evaluations').removeClass('hidden');
        }, 1000);
    }
    //AO ABRIR O EVENTO
    $scope.openEvent = function (sevent) {
        //BACKUP DO OBJETO
        $scope.BackUp = angular.copy(sevent);
        $scope.BackUp.date = new Date(parseInt($scope.BackUp.date));
        $scope.selectevent = $scope.BackUp;
        ///RECEBE RESOURCES EM JSON E ADICIONA AO SCOPE
        if (!!$scope.selectevent.resources) {
            $scope.selectevent.resources = JSON.parse(sevent.resources);
        } else {
            //CASO O SCOPE SEJA VAZIO
            $scope.selectevent.resources = {"projector": false, "acoustic": false, "computer": false, "chair": false, "table": false, "other": false, "other_text": ""};
        }
        $scope.loadUnits($scope.selectevent.id);
    };
    $scope.viewEvent = function (sevent) {
        $scope.BackUp = angular.copy(sevent);
        $scope.BackUp.date = new Date(parseInt($scope.BackUp.date));
        $scope.selectCevent = $scope.BackUp;
        if (!$scope.BackUp.area.name) {
            $scope.selectevent.area.name = $scope.selectevent.other_tech;
        }
    };

    $scope.testeFunc = function () {
        $("#formRegister").show();
        $("#loader").css("display", "none");
        modal_success('O evento ' + event.theme + ' foi enviado com sucesso. Você poderá visualiza-lo no menu eventos enviados.');        
        $('#social-area').css("display", "block");
        //$('#confirm-text p').append('<div class="fb-share-button" data-href="http://www.inovapaulasouza.cps.sp.gov.br/" data-layout="button" data-size="large" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.inovapaulasouza.cps.sp.gov.br%2F&amp;src=sdkpreparse">Compartilhar</a></div>');
        //$('#social-area').append('<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Teste&hashtags=inovacentropaulasouza" data-size="large"></a>');
    };
    //CARREGA AS UNIDADES AO ABRIR O EVENTO
    $scope.loadUnits = function (event_id) {
        $http.get(ctx_path + "/data/schedule/manager.jsp?action=getEventUnits&id=" + event_id)
                .then(function (response) {
                    $scope.eventUnits = [];
                    var event_units = response.data.eventUnits;
                    var eventUnitsSize = response.data.eventUnits[0].size;
                    var date_time;
                    //Adiciona mais unidades na hora do registro                   
                    event_units.forEach(function (item) {
                        date_time = new Date(item.date);
                        if (eventUnitsSize < 2) {
                            $scope.delete_disabled = true;
                        }
                        if (date_time <= new Date()) {
                            $scope.eventUnits.push({'unit_event_id': item.unit_event_id, 'unit': item.unit, 'date': date_time, 'time': date_time, 'name_disabled': true, 'edit_disabled': true, 'delete_disabled': true, 'unit_changed': false});
                        } else {
                            $scope.eventUnits.push({'unit_event_id': item.unit_event_id, 'unit': item.unit, 'date': date_time, 'time': date_time, 'name_disabled': true, 'edit_disabled': false, 'delete_disabled': false, 'unit_changed': false});
                        }
                        cont++;
                    });

                });
    };

    //JUNTA A HORA E A DATA NOVO EVENTO
    $scope.timeDate = function () {
        var arrayUnits = angular.copy($scope.event.units);
        var size = arrayUnits.length;
        var duration = $scope.event.duration;
        if (size > 1 && !!duration) {
            var firstUnit = null;
            arrayUnits.forEach(function (item, index) {
                var diff = [];
                item.date.setHours(item.time.getHours());
                item.date.setMinutes(item.time.getMinutes());    
                $scope.event.units[index].date = item.date;                
                if (!firstUnit) {
                    firstUnit = item.date;
                } else {
                    diff.push(((Math.abs(firstUnit - item.date) / 1000) / 60));
                    diff.push(((Math.abs(arrayUnits[index - 1].date - item.date) / 1000) / 60));
                    if (diff[0] > duration && diff[1] > duration) {                        
                        $scope.errorDate = false;
                        $('#time' + index).removeClass('date_invalid');
                        $("#date" + index).removeClass('date_invalid');
                    } else {
                        $scope.errorDate = true;                        
                        $('#time' + index).addClass('date_invalid');
                        $("#date" + index).addClass('date_invalid');
                    }
                }

            });
        }
    };



    //Adiciona mais unidades na hora do registro
    $scope.moreUnit = function () {
        var col = '';
        unit_cont++;
        col += '<div class="row"><br><div class="col-md-12 col-md-offset-1"><div class="col-md-5"><ui-select name="unit' + cont + '_name" required ng-model="event.units[' + unit_cont + '].unit" theme="bootstrap" title="Escolha uma unidade" ><ui-select-match placeholder="Selecione a unidade...">{{$select.selected.name}}</ui-select-match><ui-select-choices group-by="\'region_name\'" repeat="unit in unitsArray | filter: $select.search"><span ng-bind-html="unit.name | highlight: $select.search"></span></ui-select-choices></ui-select></div><div class="col-md-3"><input id="date' + unit_cont + '" required ng-model="event.units[' + unit_cont + '].date" class="form-control "  min="' + $scope.today + '"  max="' + $scope.afterToday + '" type="date"></div><div class="col-md-2"><input id="time' + unit_cont + '" required ng-disabled="!event.units[' + unit_cont + '].date" ng-model="event.units[' + unit_cont + '].time" ng-blur="timeDate(event.units[' + unit_cont + '].time,event.units[' + unit_cont + '].date, event.units)"  class="form-control "    min="07:00" max="21:00" type="time"></div><div class="col-md-1"><button class="btn btn-block btn-danger btn-sm" onclick="removeUnit(this,' + unit_cont + ')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div></div></div>';
        $('.date-time-event').append($compile(col)($scope));
    };
    //Remove a linha de unidade na parte do registro
    removeUnit = function (item, indice) {
        var row = $(item).closest('div.row');
        row.fadeOut(100, function () {
            row.remove();
            $scope.event.units.splice(indice, 1);
            unit_cont--;

        });
    };

    //Botão Voltar na área de editar ;
    $scope.backEdit = function () {
        $scope.selectevent = null;
        $scope.resources = [];
        arraySelecionados = '';
        $('.units-edit-event').empty();
        cont = 0;
    };

    //Adiciona mais unidades na hora da edição    

    $scope.moreUnitEdit = function () {
        $scope.eventUnits.push({'unit': {}, 'date': '', 'time': ''});
    };
    //Remove a linha de unidade na parte da edição
    var indice;
    $scope.modalDelete = function (indice) {
        this.indice = indice;        
        $ngConfirm({
            title: 'Confirmação!',
            content: 'Tem certeza que desejar excluir essa unidade ?',
            scope: $scope,
            buttons: {
                Sim: {
                    text: 'Sim',
                    btnClass: 'btn-blue',
                    action: function (scope, button) {
                        $scope.eventUnits.splice(indice, 1);
                    }
                },
                Cancelar: function (scope, button) {
                    // closes the modal
                }
            }
        });
    };    

    $scope.addUnitEdit = function (event_id, unit, pos, event_theme) {
        var unit_event_id = unit.unit_event_id;
        var unit_id = unit.unit.id;
        var c_email = unit.unit.c_email;
        var unit_name = unit.unit.name;
        var date = unit.date.toString();
        var d = new Date(unit.date);
        var unit_date_string = d.toLocaleDateString() + " - " + d.toLocaleTimeString();
        var data = {};
        var url = ctx_path + "/data/schedule/manager.jsp";
        if (!unit_event_id) {
            data = {"action": "addUnit", "event_id": event_id, "unit_event_id": unit_event_id, "unit_id": unit_id, "unit_date": date, "c_email": c_email, "unit_name": unit_name, "event_theme": event_theme, "unit_date_string": unit_date_string};
        } else {
            data = {"action": "addUnit", "event_id": event_id, "unit_event_id": unit_event_id, "unit_id": unit_id, "unit_date": date, "c_email": c_email, "unit_name": unit_name, "event_theme": event_theme, "unit_date_string": unit_date_string};
        }
        postService.query(data, url).then(function (re) {
            if (re.data.aux === 1) {
                modal_success();
            } else if (re.data.aux === 2) {
                modal_error();
            } else if (re.data.aux === 3) {
                $("#time" + pos).addClass('ng-invalid');
                $("#date" + pos).addClass('ng-invalid');
                $("#eInfoMessage").empty();
                $("#infoSuport").empty();
                $("#eInfoMessage").append(re.data.re);
                $("#infoModal").show();
                setTimeout(function () {
                    $("#infoModal").hide();
                }, 2000);
            }
        }).catch(function (error) {
            modal_error();
        });
    };

    //JUNTA A HORA E A DATA EDITA EVENTO
    $scope.timeDate_edit = function (arrayUnits, pos, duration) {
        var time = angular.copy(arrayUnits[pos].time);
        var newDate = angular.copy(arrayUnits[pos].date);
        var diff;
        $scope.eventUnits[pos].unit_changed = true;
        if (!!time && !!newDate) {
            newDate.setHours(time.getHours());
            newDate.setMinutes(time.getMinutes());
            $scope.eventUnits[pos].date = newDate;
            arrayUnits.forEach(function (item, index) {
                if (!item.date && index !== pos) {
                    diff = ((Math.abs(arrayUnits[pos].date - item.time) / 1000) / 60);
                    if (diff > duration) {
                        $scope.eventUnits[pos].errorDate_edit = false;
                        $('#time' + pos).removeClass('date_invalid');
                        $("#date" + pos).removeClass('date_invalid');
                    } else {
                        $scope.eventUnits[pos].errorDate_edit = true;
                        $('#time' + pos).addClass('date_invalid');
                        $("#date" + pos).addClass('date_invalid');
                    }
                } else if (!!item.date && index !== pos) {
                    diff = ((Math.abs(item.date - arrayUnits[pos].date) / 1000) / 60);
                    if (diff > duration) {
                        $scope.eventUnits[pos].errorDate_edit = false;
                        $('#time' + pos).removeClass('date_invalid');
                        $("#date" + pos).removeClass('date_invalid');
                    } else {
                        $scope.eventUnits[pos].errorDate_edit = true;
                        $('#time' + pos).addClass('date_invalid');
                        $("#date" + pos).addClass('date_invalid');
                    }
                }
            });
        }
    };

    $scope.event.name = "Palestra";
    $scope.cpf = "";
    $scope.cnpj = "";
    $scope.cpfValidate = false;
    $scope.cnpjValidate = false;

    //Checar o cpf.    
    $scope.sendEvent = function (check, event) {
        if (check) {
            addEvent(event);
        } else {
            $('#docModal').modal('show');
        }
    };

    //Testa o CPF
    $scope.checkCPF = function (cpf) {
        //Somente se for diferente de vazio igual 11 caracteres
        $scope.cpfValidate = true;
        if (!!cpf && cpf.length > 10) {
            if (!validaCPF(cpf)) {
                $scope.cpfValidate = true;
                $("#cpf").addClass("has-error");
                $("#cpf").removeClass("has-success");
            } else {
                $scope.cpfValidate = false;
                $("#cpf").removeClass("has-error");
                $("#cpf").addClass("has-success");
            }
        } else if (!cpf) {
            $scope.cpfValidate = false;
            $("#cpf").removeClass("has-success");
            $("#cpf").removeClass("has-error");
        }
    };
    $scope.checkCNPJ = function (cnpj) {
        //Somente se for diferente de vazio igual 14 caracteres
        $scope.cnpjValidate = true;
        if (!!cnpj && cnpj.length > 13) {
            if (!validaCNPJ(cnpj)) {
                $scope.cnpjValidate = true;
                $("#cnpj").addClass("has-error");
                $("#cnpj").removeClass("has-success");
            } else {
                $scope.cnpjValidate = false;
                $("#cnpj").removeClass("has-error");
                $("#cnpj").addClass("has-success");
            }
        } else if (!cnpj) {
            $scope.cnpjValidate = false;
            $("#cnpj").removeClass("has-success");
            $("#cnpj").removeClass("has-error");
        }
    };
//  INFELIZMENTE NÃO POSSUIMOS CERTIFICADO PARA PODER USAR ESTÁ API DO BROWSER
//    $scope.getLocation = function (newLocation) {
//        $scope.loading = true;
//        if (newLocation) {
//            if (navigator.geolocation) {
//                navigator.geolocation.getCurrentPosition(showPosition, showError);
//            } else {
//                $('#eWarningError').empty();
//                $('#eWarningError').append('Não foi possível pegar sua localização, verifique se há suporte pelo seu navegador.');
//                $('#ErrorModal').show();
//                setTimeout(function () {
//                    $("#ErrorModal").hide();
//                }, 2000);
//            }
//        } else {
//            oldLocationPositioned = $rootScope.unitsArray;
//            $rootScope.unitsArray = unit_and_region_backup;
//            unit_and_region_backup = oldLocationPositioned;
//            $scope.geo = true;
//            $scope.loading = false;
//        }
//    };
//
//    function showPosition(position) {
//        if (!oldLocationPositioned) {
//            unit_and_region_backup = $rootScope.unitsArray;
//            getService.query(ctx_path + "/data/select-dropdown.jsp?action=UnitsAndRegions&latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude).then(function (response) {
//                $rootScope.unitsArray = response.data.UnitsAndRegions;
//            });
//        } else {
//            $rootScope.unitsArray = oldLocationPositioned;
//        }
//        $scope.geo = false;
//        $scope.loading = false;
//
//    }
//
//    function showError(error) {
//        var error_msg;
//        switch (error.code) {
//            case error.PERMISSION_DENIED:
//                error_msg = "Você não aceitou compartilhar sua localização."
//                break;
//            case error.POSITION_UNAVAILABLE:
//                error_msg = "Sua localização não está disponível."
//                break;
//            case error.TIMEOUT:
//                error_msg = "Houve muita demora para pegar sua localização."
//                break;
//            case error.UNKNOWN_ERROR:
//                error_msg = "Um erro desconhecido ocorreu."
//                break;
//        }
//        $('#eWarningError').empty();
//        $('#eWarningError').append(error_msg);
//        $('#ErrorModal').show();
//        setTimeout(function () {
//            $("#ErrorModal").hide();
//        }, 2000);
//        $scope.loading = false;
//    }

    $scope.saveDOC = function (cpf, cnpj) {
        $("#docSave").css("visibility", "hidden");
        $scope.loading = true;
        var data = {action: "updateDoc", cpf: cpf, cnpj: cnpj};
        var url = ctx_path + "/data/portal/users.jsp";
        postService.query(data, url).then(function (re) {
            if (re.data.aux == 1) {
                $("#docSave").css("visibility", "visible");
                $scope.loading = false;
                $('#docModal').hide();
                addEvent(event);
            } else {
                $("#docSave").css("visibility", "visible");
                $scope.loading = false;
                modal_error();
            }

        }).catch(function (re) {
            $("#docSave").css("visibility", "visible");
            $scope.loading = false;
            modal_error();
        });
    };

    function dateTest(event) {
        var dates = "";
        var unitIds = "";
        $scope.t = [];
        $scope.d = [];
        angular.forEach(event.time, function (time) {
            $scope.t.push(time);
        });
        angular.forEach(event.date, function (date) {
            $scope.d.push(date);
        });
        for (var i = 0; i < $scope.d.length; i++) {
            $scope.d[i].setHours($scope.t[i].getHours());
            $scope.d[i].setMinutes($scope.t[i].getMinutes());
        }
        for (var i = 0; i < event.date.length; i++) {
            if (i == event.date.length - 1) {
                dates = dates + event.date[i];
            } else {
                dates = dates + event.date[i] + ", ";
            }
            unitIds += event.unitSelected[i].id + " ";
        }
        var url = ctx_path + "/data/schedule/manager.jsp?action=getDateTest&dates=" + dates + "&duration=" + event.duration;
        $http.get(url).then(function (re) {
            if (re.data.re) {
                $scope.errorDateTest = re.data.re;
            } else if (re.data.isDate) {
                $scope.errorDateTest = "Existe evento na data e no horário requisitados. Para mais informações, consulte a aba eventos enviados ou eventos agendados.";
                $scope.event.terms = false;
                $scope.count = false;
                $scope.ri = false;
            } else {
                $scope.count = true;
                $scope.ri = true;
            }
        });
    }
    
    // Função que adiciona o evento, envia o post.
    function addEvent(event) {
        $scope.loading = true;
        var values;
        var data = "";
        var units = [];
        var dates = [];
        var times = [];
        var imageFile = event.imageFile;
        var materialFile = event.materialFile;

        //Percorre o evento e pega todas unidades e datas e coloca no array.
        values = event.units;
        angular.forEach(values, function (item) {
            units.push(item.unit.id);
            dates.push(item.date);
            times.push(item.time);
        });
        event.area = $('#area-schedule').val();
        
        //Transforma  array em json/array para poder ser enviado
        units = JSON.stringify(units);
        dates = JSON.stringify(dates.toString());
        times = JSON.stringify(times.toString());
        
	var n = new Date(dates).toDateString().substring(4, 15);
        var h = new Date(times).toTimeString().substring(0, 8);
        var date_time = new Date(n + " " + h);

        if (!materialFile && !!imageFile) {
            // Caso somente a imagem seja diferente de nulo.
            data = {action: "sendManagerEvents", name: event.name, theme: event.theme, unit: units, area: event.area, description: event.description, image: imageFile};
        } else if (!!materialFile && !!imageFile) {
            // Caso ambos sejam diferentes de nulo.                
            data = {action: "sendManagerEvents", name: event.name, theme: event.theme, unit: units, area: event.area, description: event.description, image: imageFile, material: materialFile};
        } 
        imageFile.upload = Upload.upload({
            url: ctx_path + "/data/schedule/manager.jsp?action=sendManagerEvents&date=" + date_time + "&duration=" + event.duration,
            data: {data},
            method: 'POST',
            headers: {'content-type': undefined}
        });
        imageFile.upload.then(function (response) {
            $timeout(function () {
                imageFile.result = response.data;
            });
            if (response.data.aux == '1') {
                modal_success('O evento ' + event.theme + ' foi enviado com sucesso. Você poderá visualiza-lo no menu eventos enviados.');
                $('#social-area').css("display", "block");
                confirm = 1;
            } else {
                modal_error(response.data.re2);
            }
            $scope.loading = false;
        }, function (response) {
            $scope.loading = false;
            modal_error(response.data.re2);
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes            
            event.imageFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }

    //Função que Edita o evento, envia o post.
    $scope.editEvent = function (event, eventUnits) {
        $scope.loading = true;
        var values;
        var data = "";
        var units;
        var dates;
        var newDate = eventUnits[0].date;
        $scope.unitsId = [];     
        
        if (!event.materialFile && !event.imageFile) {
            //Caso ambos sejam nulo.            
            data = {event_id: event.id, theme: event.theme, description: event.description, duration: event.duration, date: newDate};
            var url = ctx_path + "/data/schedule/manager.jsp?action=editManagerEvents";
            postService.query(data, url).then(function (re) {
                if (re.data.aux == '1') {
                    modal_success('O evento ' + event.theme + ' foi atualizado com sucesso.');
                    confirm = 1;
                } else {
                    modal_error();
                }
                $scope.loading = false;
            }).catch(function () {
                $scope.loading = false;
                modal_error();
            });
        } else {
            if (!event.materialFile && !!event.imageFile) {
                // Caso somente a imagem seja diferente de nulo.
                data = {action: "editManagerEvents", event_id: event.id, name: event.name, theme: event.theme, unit: units, description: event.description, duration: event.duration, image: event.imageFile};
            } else if (!!event.materialFile && !event.imageFile) {
                // Caso somente o material seja diferente de nulo.
                event.imageFile = event.materialFile;
                data = {action: "editManagerEvents", event_id: event.id, name: event.name, theme: event.theme, unit: units, description: event.description, duration: event.duration, material: event.materialFile};
            } else if (!!event.materialFile && !!event.imageFile) {
                //Caso ambos sejam diferentes de nulo.
                data = {action: "editManagerEvents", event_id: event.id, name: event.name, theme: event.theme, unit: units, description: event.description, duration: event.duration, image: event.imageFile, material: event.materialFile};
            }

            //FAZ o upload junto ao POST da imagem ou material;
            event.imageFile.upload = Upload.upload({
                url: ctx_path + "/data/schedule/manager.jsp?action=editManagerEvents&date=" + dates + "&duration=" + event.duration,
                data: {data},
                method: 'POST',
                headers: {'content-type': undefined}
            });
            event.imageFile.upload.then(function (response) {
                $timeout(function () {
                    event.imageFile.result = response.data;
                });
                if (response.data.aux == '1') {
                    $scope.loading = false;
                    modal_success('O evento ' + event.theme + ' foi atualizado com sucesso.');
                    confirm = 1;
                } else {
                    $scope.loading = false;
                    modal_error();
                }
            }, function (response) {
                $scope.loading = false;
                modal_error();
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes            
                event.imageFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }

    };
    $scope.closeConfirm = () => {
        if (confirm === 1) {
            window.location.reload();
            $('.area-agenda-usermenu .nav a[href="#item-sent-event"]').tab('show');
        } else if (confirm === 2) {
            $('#confirmAction').modal('hide');
            window.location.reload();
        }
    };
    
});
Agendamodule.controller('controllerListEvent', function ($scope, $http, $ngConfirm, $rootScope, getService, postService) {
    //Criação de variáveis para ordenar as tabelas
    $scope.x = 'name';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.managerEvents = [];
    $scope.qtdPage = 10;
    $scope.totalEvents = 0;
    var lastPage = 1;
    $scope.search = "";
    $scope.queryBy = "";
    $scope.justification = "";
    $scope.loading_modal = false;
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
    
    $scope.addTraining = function (event, theme, date, file) {
        
        var data = "";
        var url = "";
        $scope.loading = true;
        //data = {action: "addTraining", event: event, theme: theme, date: date, file: file};
        var data = [
                    { name: "action", value: "addTraining" },
                    { name: "event", value: event },
                    { name: "theme", value: theme }, 
                    { name: "date", value: date}, 
                    { name: "file", value: file}
                  ];
        url = ctx_path + "/data/schedule/manager.jsp?action=addTraining";
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
    
    getResultsPage(1);
    $scope.changed = function (x) {
        $http.get(ctx_path + "/data/select-dropdown.jsp?action=unitsInRegion&regionID=" + $scope.regionSelected.id)
                .then(function (response) {
                    $scope.unitsArray = [];
                    $scope.unitsArray = response.data.unitsArray;
                });
    };
    $('#back-edit-event').click(function () {
//        $scope.getManagerEvents();
        getResultsPage(1);
    });    
    $scope.modalDelete = (event) => {
        var event_id = "";
        var event_name = "";
        event_id = event.id;
        event_name = event.name;        
        $ngConfirm({
            title: 'Confirmação!',
            content: 'Tem certeza que desejar excluir esse evento ?',
            scope: $scope,
            buttons: {
                Sim: {
                    text: 'Sim',
                    btnClass: 'btn-blue',
                    action: function (scope, button) {
                        deleteEvent(event_id, event_name);
                    }
                },
                Cancelar: function (scope, button) {
                    // closes the modal
                }
            }
        });
    };
    deleteEvent = function(event_id, event_name){
        var data = {action: "deleteEvent", event_id: event_id, event_name: event_name};
        var url = ctx_path + "/data/schedule/manager.jsp";
        postService.query(data, url).then(function (re) {
            if (!!re.data.re2) {
                modal_error();
            } else {                
                modal_success();
                getResultsPage(1);
            }

        }).catch(function () {
            modal_error();
        });
    };
    $scope.modalCancel = (event) => {
        $rootScope.idEvent = event.id;
        $rootScope.nameEvent = event.name;
        $('#text-cevent p').empty();
        $('#text-cevent p').append('Deseja realmente cancelar o evento <b>' + event.theme + '</b> ?');
        $('#cancelEvent').modal('show');
    };
    

    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalEvents < $scope.managerEventsSize)) {
            $scope.totalEvents = (parseInt($scope.totalEvents) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $scope.loading = true;
        var url = ctx_path + "/data/schedule/manager.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.search + "&action=getManagerEvents&";
        getService.query(url).then(function (response) {
            if (response.data.re != null) {
                $scope.selectError = response.data.re;
                $scope.managerEvents = null;
                $scope.managerEventsSize = null;
            } else {
                $scope.selectError = null;
                $scope.managerEvents = response.data.managerEvents;
                $scope.managerEventsSize = response.data.managerEvents[0]["size"];
            }
            $scope.loading = false;

        }).catch((res) => {
            $scope.selectError = "Falha ao trazer os dados.";
            $scope.managerEventsSize = null;
            $scope.managerEvents = null;
            $scope.loading = false;
        });
    }
    ;

});
Agendamodule.controller('confirmedEvents', function ($scope, $rootScope, postService, getService) {
    $scope.x = 'name';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.events = [];
    $scope.qtdPage = 10;
    $scope.totalEvents = 0;
    var lastPage = 1;
    $scope.search = "";
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

    var idEvent;
    var nameEvent;
    $scope.modalCancel = (event) => {
        $rootScope.idEvent = event.id;
        $rootScope.unit_event_id = event.unit.unit_event_id;
        $rootScope.nameEvent = event.name;
        $('#text-cevent p').empty();
        $('#text-cevent p').append('Deseja realmente cancelar o evento <b>' + event.theme + '</b> ?');
        $('#cancelEvent').modal('show');
    };
    $scope.cancelEvent = (jus) => {
        $scope.loading_modal = true;
        var data = {action: "cancelEvent", event_id: $rootScope.idEvent, name: $rootScope.nameEvent, justification: jus, unit_event_id: $rootScope.unit_event_id};
        var url = ctx_path + "/data/schedule/manager.jsp";
        postService.query(data, url).then(function (re) {
            if (!!re.data.re2) {
                modal_error();
            } else {
                $('#cancelEvent').modal('hide');
                modal_success();
                getResultsPage(1);
            }
            $scope.loading_modal = false;

        }).catch(function () {
            modal_error();
            $scope.loading_modal = false;
        });
    };

    getResultsPage(1);
    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalEvents < $scope.confirmedEventsSize)) {
            $scope.totalEvents = (parseInt($scope.totalEvents) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $scope.loading = true;
        var url = ctx_path + "/data/schedule/manager.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.search + "&action=getConfirmedEvents&";
        getService.query(url).then(function (response) {
            if (response.data.re != null) {
                $scope.selectError = response.data.re;
                $scope.confirmedEvents = null;
                $scope.confirmedEventsSize = 0;
            } else {
                $scope.selectError = null;
                $scope.confirmedEvents = response.data.confirmedEvents;
                $scope.confirmedEventsSize = response.data.confirmedEvents[0]["size"];
            }
            $scope.loading = false;

        }).catch((re) => {
            $scope.selectError = "Falha ao trazer dados.";
            $scope.confirmedEvents = null;
            $scope.confirmedEventsSize = 0;
            $scope.loading = false;
        });
    }


});

Agendamodule.controller('eventsRefused', function ($scope, $http, $rootScope, $timeout, postService, getService) {
    $scope.x = 'name';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.confirmedEvents = [];
    $scope.qtdPage = 10;
    $scope.totalEvents = 0;
    var lastPage = 1;
    $scope.search = "";
    $scope.queryBy = "";
    $scope.justification = "";
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
    $scope.changed = function (x) {
        $http.get(ctx_path + "/data/select-dropdown.jsp?action=unitsInRegion&regionID=" + $scope.regionSelected.id)
                .then(function (response) {
                    $scope.unitsArray = [];
                    $scope.unitsArray = response.data.unitsArray;
                });
    };
    getResultsPage(1);

    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalEvents < $scope.confirmedEventsSize)) {
            $scope.totalEvents = (parseInt($scope.totalEvents) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $scope.loading = true;
        var url = ctx_path + "/data/schedule/manager.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.search + "&action=getRefusedEvents&";
        getService.query(url).then(function (response) {
            if (response.data.re != null) {
                $scope.selectError = response.data.re;
                $scope.refusedEvents = null;
                $scope.refusedEventsSize = 0;
            } else {
                $scope.selectError = null;
                $scope.refusedEvents = response.data.refusedEvents;
                $scope.refusedEventsSize = response.data.refusedEvents[0]["size"];
            }
            $scope.loading = false;

        }).catch((re) => {
            $scope.selectError = 'Falha ao trazer dados.';
            $scope.refusedEvents = null;
            $scope.refusedEventsSize = 0;
            $scope.loading = false;
        });
    }
//    $scope.getManagerEvents = function () {
//        $("#loadRefused").css("display", "block");
//        $http.get(ctx_path + "/data/schedule/manager.jsp?action=getRefusedEvents&")
//                .then((response) => {
//                    $scope.refusedEvents = [];
//                    $scope.refusedEvents = response.data.refusedEvents;
//                    if (!$scope.refusedEvents) {
//                        $("#loadRefused").css("display", "none");
//                        $('.msg-error-refuse').empty();
//                        $('.msg-error-refuse').append('<div class="alert alert-danger">Nenhum evento recusado.</div>');
//                    } else {
//                        $("#loadRefused").css("display", "none");
//                        $('.msg-error-refuse').empty();
//                    }
//                });
//    };
//    $scope.getManagerEvents();

    $('#back-edit-refused-event').click(function () {
        getResultsPage(1);
    });
    var idEvent;
    var nameEvent;
    $scope.modalCancel = (event) => {
        $rootScope.idEvent = event.id;
        $rootScope.nameEvent = event.name;
        $('#text-cevent p').empty();
        $('#text-cevent p').append('Deseja realmente cancelar o evento <b>' + event.theme + '</b> ?');
        $('#cancelEvent').modal('show');
    };

//    var confirm = 0;
    $scope.editReturnEvent = function (event) {
        $scope.loadingPost = true;
        var data = {event_id: event.id, event_name: event.name, date: event.date, agent_validation: event.agent_validation, schedule_unit_id: event.unit_event, unit_id: event.unit.id, unit_confirmation: event.unit_confirmation};
        var url = ctx_path + "/data/schedule/manager.jsp?action=editReturnEvent";
        postService.query(data, url).then(function (re) {
            $scope.loadingPost = false;
            if (re.data.aux === "1") {
                modal_success(re.data.re);
            } else {
                $scope.loadingPost = false;
                modal_success(re.data.re);
            }
        }).catch(function () {
            $scope.loadingPost = false;
            modal_error();
        });
    };
//    closeConfirm = () => {
//        if (confirm === 1) {
//            $timeout(function () {
//                $('.area-agenda-usermenu .nav a[href="#item-sent-event"]').tab('show');
//                window.scrollTo(0, 0);
//                location.reload();
//            }, 2000);
//        } else if (confirm === 2) {
//            $('#confirmAction').modal('hide');
//        }
//    };
});
Agendamodule.controller('controllerSpeakerListAfterEvent', function ($scope, $http, $compile, $rootScope, postService, getService) {

    $scope.x = 'name';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.speakerAfterEvents = [];
    $scope.qtdPage = 10;
    $scope.totalEvents = 0;
    var lastPage = 1;
    $scope.search = "";
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
    $rootScope.callEvaluation = function () {
        getResultsPage(1);
    };
    getResultsPage(1);
    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalEvents < $scope.speakerAfterEventsSize)) {
            $scope.totalEvents = (parseInt($scope.totalEvents) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $scope.loading = true;
        var url = ctx_path + "/data/schedule/manager.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.search + "&action=getFinishedEvents&";
        getService.query(url).then(function (response) {
            $rootScope.viewAfter = false;
            if (response.data.re != null) {
                $scope.selectError = response.data.re;
                $scope.speakerAfterEvents = null;
                $scope.speakerAfterEventsSize = 0;
            } else {
                $scope.selectError = null;
                $scope.speakerAfterEvents = response.data.finishedEvents;
                $scope.speakerAfterEventsSize = response.data.finishedEvents[0]["size"];
            }
            $scope.loading = false;

        }).catch((re) => {
            $scope.selectError = 'Falha ao trazer dados.';
            $scope.speakerAfterEvents = null;
            $scope.speakerAfterEventsSize = 0;
            $scope.loading = false;
        });
    }
//    $rootScope.getSpeakerAfterEvents = function () {
//        $http.get(ctx_path + "/data/schedule/manager.jsp.jsp?action=getSpeakerEvents&")
//                .then((response) => {
////                    $scope.retorno = JSON.parse(response)
//                    $rootScope.viewAfter = false;
//                    $scope.speakerAfterEvents = [];
//                    $scope.speakerAfterEvents = response.data.speakerEvents;
//
//                    if (!$scope.speakerAfterEvents) {
//                        $scope.selectError = response.data.re;
//                        $rootScope.viewAfter = true;
//                        $rootScope.loaderAfter = true;
//                    } else {
//                        $scope.selectError = null;
//                        $rootScope.viewAfter = false;
//                        $rootScope.loaderAfter = true;
//                    }
//                });
//    };
//    $rootScope.getSpeakerAfterEvents();

//    $rootScope.updateCertificate() = function () {
//        $http.get(ctx_path + "/data/schedule/update-certificate.jsp?action=updateCertificate&")
//                .then((response) => {
//                    $rootScope.viewUpdate = false;
//                    $scope.updateCertificate = [];
//                    $scope.updateCertificate = response.data.speakerEvents;
//                    console.log($scope.updateCertificate);
//                    if ($scope.updateCertificate === "") {
//                        $scope.updateError = response.data.re;
//                        $rootScope.viewUpdate = true;
//                        //$rootScope.loaderAfter = true;
//                    } else {
//                        $scope.updateError = null;
//                        $rootScope.viewUpdate = false;
//                        //$rootScope.loaderAfter = true;
//                    }
//                });
//    };
//    $rootScope.updateCertificate();

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
    $scope.gerarPDF = function (name, nameEV, unit, duration, date, cpf) {
        var tempo = duration;
        monName = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
        var doc = new jsPDF();
        now = new Date;
        var imgC = getBase64Image(document.getElementById("imageid"));
        doc.addImage(imgC, 'JPEG', 0, 0, 210, 296);
        doc.setFontSize(14);
        doc.setFont('Arial');
        doc.setFontType('normal');
        doc.setTextColor(054, 054, 054);
        doc.text(91.5, 118, name, null, 90);
        doc.text(100.5, 252, cpf, null, 90);
        doc.text(100.5, 183, nameEV, null, 90);
        doc.text(108.5, 275, tempo + ' Minutos', null, 90);
        doc.text(110, 200, unit, null, 90);
        doc.text(108.5, 65, date, null, 90);
        doc.text(140.5, 210, 'Praia Grande', null, 90);
        doc.text(140.5, 164, now.getDate().toString(), null, 90);
        doc.text(140.5, 138, monName[now.getMonth() ], null, 90);
        doc.text(140.5, 92, now.getFullYear().toString(), null, 90);
        doc.save('certificado.pdf');
//        $rootScope.updateCertificate();
    };
});
//Agendamodule.controller('controllerSpeakerAvailableEvent', function ($scope, $http, $compile, $rootScope, postService, getService) {
//    $scope.x = 'name';
//    $scope.myOrderBy = false;
//    $scope.orderByMe = function (x) {
//        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
//        $scope.x = x;
//    };
//    $scope.availableEvents = [];
//    $scope.qtdPage = 10;
//    $scope.totalEvents = 0;
//    var lastPage = 1;
//    $scope.search = "";
//    $scope.queryBy = "";
//    $scope.selectQtd = function (qtd) {
//        $scope.qtdPage = qtd;
//        getResultsPage(lastPage);
//        $scope.pagination.current = 1;
//    };
//    $scope.pagination = {
//        current: 1
//    };
//    $scope.pageChanged = function (newPage) {
//        getResultsPage(newPage);
//    };
//    $scope.callBack = function () {
//        getResultsPage(1);
//    };
//    getResultsPage(1);
//    function getResultsPage(pageNumber) {
//        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalEvents < $scope.availableEventsSize)) {
//            $scope.totalEvents = (parseInt($scope.totalEvents) + parseInt($scope.qtdPage));
//        }
//        lastPage = pageNumber;
//        $rootScope.viewC = false;
//        var url = ctx_path + "/data/schedule/manager.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.search + "&action=getManagerAvailableEvents&";
//        getService.query(url).then(function (response) {
//            if (response.data.re != null) {
//                $scope.selectError = response.data.re;
//                $scope.availableEvents = null;
//                $rootScope.viewC = true;
//                $rootScope.loaderC = true;
//            } else {
//                $scope.selectError = null;
//                $rootScope.viewC = false;
//                $rootScope.loaderC = true;
//                $scope.availableEvents = response.data.availableEvents;
//                $scope.availableEventsSize = response.data.availableEvents[0]["size"];
//            }
//
//        });
//    }
////    $rootScope.getSpeakerAvailableEvents = function () {
////        $http.get(ctx_path + "/data/schedule/manager.jsp?action=getSpeakerAvailableEvents&")
////                .then((response) => {
////                    $rootScope.viewC = false;
////                    $scope.availableEvents = [];
////                    $scope.availableEvents = response.data.availableEvents;
////                    if (!$scope.availableEvents) {
////                        $scope.selectError = response.data.re;
////                        $rootScope.viewC = true;
////                        $rootScope.loaderC = true;
////                    } else {
////                        $scope.selectError = null;
////                        $rootScope.viewC = false;
////                        $rootScope.loaderC = true;
////                    }
////                });
////    };
////    $rootScope.getSpeakerAvailableEvents();
//});

Agendamodule.controller('controllerSpeakerEvaluationEvent', function ($scope, $http, $compile, $rootScope, postService, getService) {
    $scope.x = 'name';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.evaluationEvents = [];
    $scope.qtdPage = 10;
    $scope.totalEvents = 0;
    var lastPage = 1;
    $scope.search = "";
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
    getResultsPage(1);
    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.totalEvents < $scope.evaluationEventsSize)) {
            $scope.totalEvents = (parseInt($scope.totalEvents) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $scope.loading = true;
        var url = ctx_path + "/data/schedule/manager.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.search + "&action=getManagerEvaluationEvents&";
        getService.query(url).then(function (response) {
            if (response.data.re != null) {
                $scope.selectError = response.data.re;
                $scope.evaluationEvents = null;
                $scope.evaluationEventsSize = 0;
                $rootScope.whereEvaluation = 0;
                $scope.nEvaluationsM = 0;
            } else {
                $scope.selectError = null;
                $scope.evaluationEvents = response.data.evaluationEvents;
                $scope.evaluationEventsSize = response.data.evaluationEvents[0]["size"];
                $rootScope.whereEvaluation = 0;
                $rootScope.evaluationCount = response.data.evaluationEvents[0]["size"];
            }
            $scope.loading = false;
        }).catch((re) => {
            $scope.selectError = 'Falha ao trazer dados.';
            $scope.evaluationEvents = null;
            $rootScope.whereEvaluation = 0;
            $scope.loading = false;

        });
    }

//    $rootScope.getSpeakerEvaluationEvents = function () {
//        $http.get(ctx_path + "/data/schedule/manager.jsp?action=getSpeakerEvaluationEvents&")
//                .then((response) => {
//                    $rootScope.viewE = false;
//                    $scope.evaluationEvents = [];
//                    $scope.evaluationEvents = response.data.evaluationEvents;
//                    if (!$scope.evaluationEvents) {
//                        $scope.selectError = response.data.re;
//                        $rootScope.viewE = true;
//                        $rootScope.loaderE = true;
//                    } else {
//                        $scope.selectError = null;
//                        $rootScope.viewE = false;
//                        $rootScope.loaderE = true;
//                    }
//                });
//    };
//    $rootScope.getSpeakerEvaluationEvents();
    /*$scope.selectEvaluation = function (manager_grade, evaluationEvent ) {
     
     } */

    $scope.selectEvaluation = function (grade, sSpeakerEvaluationEvents) {
        $rootScope.gradeEvaluation = grade;
        $scope.BackUp = angular.copy(sSpeakerEvaluationEvents);
        $rootScope.selectEvaluationEvents = $scope.BackUp;
        $("#confirmEvaluationSpeaker").modal('show');
    };
    $rootScope.confirmedEvaluationSpeaker = function (grade, idUnit, idEvent) {
        var data = {action: "sendEvaluationEvents", idEvent: idEvent, idUnit: idUnit, grade: grade};
        $("#loader").css("display", "block");
        var url = ctx_path + "/data/schedule/manager.jsp";
        postService.query(data, url).then(function (re) {
            $("#confirmEvaluationSpeaker").modal('hide');
            $("#loader").css("display", "none");
            getResultsPage(1);
            // $rootScope.getSpeakerAfterEvents();
            modal_success();
            getResultsPage(1);
            $rootScope.callEvaluation();

        }).catch(function (re) {
            $("#confirmEvaluationSpeaker").modal('hide');
            $("#loader").css("display", "none");
            modal_error();
            getResultsPage(1);
            $rootScope.callEvaluation();            
        });
    };
    $rootScope.reset = function () {
        $rootScope.gradeEvaluationName = null;
        getResultsPage(1);
    };
    $rootScope.whereEvaluation = 0;

    $rootScope.changeEvaluation = function () {
        $rootScope.whereEvaluation = 1;
    };
});
Agendamodule.controller('controllerActivities', function ($scope, $rootScope, getService) {
    $scope.x = 'name';
    $scope.myOrderBy = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;
    };
    $scope.activitiesList = [];
    $scope.qtdPage = 10;
    $scope.total = 0;
    var lastPage = 1;
    $scope.search = "";
    $scope.queryBy = "";
    $scope.events = {};
    $scope.event = {'id': -1, 'name': "Todos os Eventos"};
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
        var url = ctx_path + "/data/schedule/manager.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&queryBy=" + $scope.queryBy + "&search=" + $scope.search + "&event_id=" + $scope.event.id + "&action=getActivities";
        getService.query(url).then(function (response) {
            if (!!response.data.re) {
                $scope.activitiesList = null;
                $scope.activitiesError = response.data.re;
                $scope.activitiesListSize = 0;
                $('#activitiesError-c').show();
            } else {
                $('#activitiesError-c').hide();
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
    var url = ctx_path + "/data/select-dropdown.jsp?action=myEvents&actor=m";
    getService.query(url).then(function (response) {
        $scope.events = null;
        if (!!response.data.error) {
            $scope.events = response.data.error;
            $scope.event = {'id': -2};
        } else {
            $scope.events = response.data.event_list;
        }

    });
});
//SERVICE QUE FAZ O POST DE FORMA SIMPLIFICADA
Agendamodule.factory('postService', ['$http', function ($http) {
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
//SERVICE QUE FAZ O GET DE FORMA SIMPLIFICADA
Agendamodule.factory('getService', ['$http', function ($http) {
        return {
            query: function (url) {
                return $http.get(url);
            }
        };
    }]);

function validaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    strCPF = strCPF.replace(".", "").replace(".", "").replace("-", "");
    if (["00000000000", "11111111111", "22222222222", "33333333333", "44444444444", "55555555555", "66666666666", "77777777777", "88888888888", "99999999999"].indexOf(strCPF) >= 0) {
        return false;
    }
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

function validaCNPJ(cnpj) {
    cnpj = cnpj.replace('.', '').replace('.', '').replace('.', '').replace('-', '').replace('/', '');
    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;
    if (cnpj.length < 14 && cnpj.length < 15)
        return false;
    for (i = 0; i < cnpj.length - 1; i++)
        if (cnpj.charAt(i) != cnpj.charAt(i + 1))
        {
            digitos_iguais = 0;
            break;
        }
    if (!digitos_iguais)
    {
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--)
        {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--)
        {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    } else
        return false;
}

function addDays(days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    var month = result.getMonth() + 1;
    var day = result.getDate();
    if (day < 10) {
        day = '0' + day
    }
    ;
    if (month < 10) {
        month = '0' + month
    }
    ;
    result = (result.getFullYear()) + '-' + (month) + '-' + day;
    return result;
}
