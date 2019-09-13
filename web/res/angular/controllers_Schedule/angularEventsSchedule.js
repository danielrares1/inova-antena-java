var eventModule = angular.module("eventModule", []);
// variáveis globais
var event_id;

eventModule.factory('postService', ['$http', function ($http) {
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
eventModule.controller('eventController', function ($scope, $http, postService) {
    $scope.selectAvailableEvents = {};
    getEvent();
    var qlq;
        
    //MÉTODO QUE REALIZA A INSCRIÇÃO
    $scope.inscription = function (unit_id,event_name,event_id) {    
        var dados = {action: "inscription", unit_event_id: unit_id, eventTheme: event_name, event_id :event_id};
        $scope.loading_modal = true;
        
        var url = ctx_path + "/data/schedule/anybody.jsp";
        postService.query(dados, url).then(function (re) {
            if (!re.data.error) {
                $("#inscriptionEvents").modal('hide');
                $("#loader").css("display", "none");
                modal_success("Inscrição realizada com sucesso!");
                getEvent();
                $scope.loading_modal = false;
            } else {
                $("#inscriptionEvents").modal('hide');
                $("#loader").css("display", "none");
                modal_error();
                $scope.loading_modal = false;
            }
        }).catch(function () {
            $scope.loading_modal = false;
            $("#inscriptionEvents").modal('hide');
            $("#loader").css("display", "none");
            modal_error();
        });
    };
    $scope.openInscription = function (unit_id) {        
        $scope.selectAvailableEvents = {'id': unit_id, 'name': $scope.event.name};        
        $scope.unit = unit_id;
               
            switch($scope.unit.event_date.month) {
                case 'JAN':
                    $scope.unit.event_date.month = '01';
                    break;
                case 'FEV':
                    $scope.unit.event_date.month = '02';
                    break;
                case 'MAR':
                    $scope.unit.event_date.month = '03';
                    break;
                case 'ABR':
                    $scope.unit.event_date.month = '04';
                    break;
                case 'MAI':
                    $scope.unit.event_date.month = '05';
                    break;
                case 'JUN':
                    $scope.unit.event_date.month = '06';
                    break;
                case 'JUL':
                    $scope.unit.event_date.month = '07';
                    break;
                case 'AGO':
                    $scope.unit.event_date.month = '08';
                    break;
                case 'SET':
                    $scope.unit.event_date.month = '09';
                    break;
                case 'OUT':
                    $scope.unit.event_date.month = '10';
                    break;
                case 'NOV':
                    $scope.unit.event_date.month = '11';
                    break;
                case 'DEZ':
                    $scope.unit.event_date.month = '12';
                    break;
            }
        
        $("#inscriptionEvents").modal('show');
    };
    $scope.loadRanking = true;
    $scope.load = false;
    
   
    function getEvent() {
        $http.get(ctx_path + "/data/schedule/anybody.jsp?action=getEvent&event_id=" + this.event_id ).then(function (response) {
            if (response.data.event) {
                $("#unit_section").removeClass('invisible');
                $scope.loadRanking = false;
                $scope.event = response.data.event;
                $scope.load = true;
                $scope.urlBanner = 'banner-padrao.jpg';

                switch ($scope.event.tech_area) {
                    case 'Educação':
                        $scope.urlBanner = 'banner-educacao.jpg';
                        break;
                    case 'Gestão Pública e Sociedade':
                        $scope.urlBanner = 'banner-gestao2.jpg';
                        break;
                    case 'Informação, Tecnologias e Comunicação':
                        $scope.urlBanner = 'banner-tecnologia.jpg';
                        break;
                    case 'Alimentos e Produção Alimentar':
                        $scope.urlBanner = 'banner-alimentos.jpg';
                        break;
                    case 'Economia, Gestão e Negócios':
                        $scope.urlBanner = 'banner-economia.jpg';
                        break;
                    case 'Agronegócio e Pecuária':
                        $scope.urlBanner = 'banner-agronegocio.jpg';
                        break;
                    case 'Recursos Naturais e Meio Ambiente':
                        $scope.urlBanner = 'banner-recursos.jpg';
                        break;
                    case 'Saúde, Ambiente e Segurança':
                        $scope.urlBanner = 'banner-saude.jpg';
                        break;
                    case 'Turismo, Hospitalidade e Lazer':
                        $scope.urlBanner = 'banner-turismo.jpg';
                        break;
                    case 'Infraestrutura':
                        $scope.urlBanner = 'banner-infraestrutura.jpg';
                        break;
                    case 'Produção Cultural e Design':
                        $scope.urlBanner = 'banner-design.jpg';
                        break;
                    default:
                        $scope.urlBanner = 'banner-padrao.jpg';
                }
                
                $scope.urlIcon = 'ic_educacao.png';

                switch ($scope.event.tech_area) {
                    case 'Educação':
                        $scope.urlIcon = 'ic_educacao2.png';
                        break;
                    case 'Gestão Pública e Sociedade':
                        $scope.urlIcon = 'ic_sociedade.png';
                        break;
                    case 'Informação, Tecnologias e Comunicação':
                        $scope.urlIcon = 'ic_tecnologia.png';
                        break;
                    case 'Alimentos e Produção Alimentar':
                        $scope.urlIcon = 'ic_alimentos.png';
                        break;
                    case 'Economia, Gestão e Negócios':
                        $scope.urlIcon = 'ic_economia.png';
                        break;
                    case 'Agronegócio e Pecuária':
                        $scope.urlIcon = 'ic_agro.png';
                        break;
                    case 'Recursos Naturais e Meio Ambiente':
                        $scope.urlIcon = 'ic_natureza.png';
                        break;
                    case 'Saúde, Ambiente e Segurança':
                        $scope.urlIcon = 'ic_saude.png';
                        break;
                    case 'Turismo, Hospitalidade e Lazer':
                        $scope.urlIcon = 'ic_turismo.png';
                        break;
                    case 'Infraestrutura':
                        $scope.urlIcon = 'ic_infraestrutura.png';
                        break;
                    case 'Produção Cultural e Design':
                        $scope.urlIcon = 'ic_cultura.png';
                        break;
                    default:
                        $scope.urlIcon = 'ic_cultura.png';
                }
                
                
            } else {
                $scope.error = response.data.re;
                $scope.loadRanking = false;                
                $scope.load = true;
                $scope.urlBanner = 'banner-padrao.jpg';
            }
        });
    }
});
