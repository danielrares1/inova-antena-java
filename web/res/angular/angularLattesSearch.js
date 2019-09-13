var LattesModule = angular.module('lattesSearch', ["angularUtils.directives.dirPagination"]);

LattesModule.factory('getService', ['$http', function ($http) {
        return {
            query: function (url) {
                return $http.get(url);
            }
        };
    }]);

var flagO = false;
LattesModule.controller('ControllerLattesSearch', function ($scope, $http, getService) {

    $scope.search = "";
    $scope.x = '';
    $scope.myOrderBy = true;
    $scope.resultsList = [];
    $scope.qtdPage = 10;
    $scope.total = 0;
    var lastPage = 1;
    $scope.search = "";
    $scope.filterIndex = "0";

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
        if(!!$scope.search){
            getResultsPage(1);    
        }
        
    };
    
    $scope.searchKeyPress = function(keyEvent){
        if(!!$scope.search && keyEvent.which == 13){
            getResultsPage(1);
        };
    };

    $http.get("..//data/portal/professors_lattes.jsp").then(function (re) {
        $scope.testLattes = re.data.re;
    });
    var isOrdering = false;
    
    function getResultsPage(pageNumber) {
        if ((pageNumber >= (pageNumber - 2)) && (pageNumber > lastPage) && ($scope.total < $scope.resultsListSize)) {
            $scope.total = (parseInt($scope.total) + parseInt($scope.qtdPage));
        }
        lastPage = pageNumber;
        $scope.loading = true;
        $scope.resultsListError = null;
        $scope.resultsList = null;
        $scope.resultsListSize = 0;
        $('#section-lattes').removeClass('hidden');
        var url = "..//data/portal/professors.jsp?limit=" + $scope.qtdPage + "&offset=" + ($scope.qtdPage * (pageNumber - 1)) + "&filterIndex=" + $scope.filterIndex + "&search=" + $scope.search + "&action=getProfessorsLattes";
        getService.query(url).then(function (response) {
            if (!!response.data.re) {                
                $scope.resultsListError = response.data.re;                
            } else {                
                $scope.resultsList = response.data.professor_lattes;
                $scope.resultsListSize = response.data.professor_lattes[0].size;
            }
            $('#section_lattes').removeClass('hidden');            
            $scope.loading = false;
        }).catch(() => {
            $scope.resultsListError = 'Falha ao trazer dados';  
            $scope.loading = false;
            $('#section_lattes').removeClass('hidden');   
        });


    }
    var first = true;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = ($scope.x === x) ? !$scope.myOrderBy : false;
        $scope.x = x;


        $(".resumo-lattes").remove();

        if ($('.sort-order').hasClass('glyphicon-triangle-bottom')) {
            $('.sort-order').removeClass('glyphicon-triangle-bottom');
            $('.sort-order').addClass('glyphicon-triangle-top');
        } else {
            $('.sort-order').removeClass('glyphicon-triangle-top');
            $('.sort-order').addClass('glyphicon-triangle-bottom');
        }
        if (first == true)
            $scope.addRow();

        first = false;
    };



    $scope.addRow = function () {



        $scope.resultsList.forEach(function (result) {

            $('#' + result.id_lattes).after(`
            <tr class="resumo-lattes">
                <td colspan="6" class="hiddenRow">
                    <div  class="accordian-body collapse ` + result.id_lattes + `">
                        <p class="pesquisa-lattes resume-lattes">` + result.resume + `</p>
                        
                        
                    </div>
                </td>
            </tr>`);

            $('#' + result.id_lattes).attr('data-target', '.' + result.id_lattes);


        });
    };



    $scope.testF = function () {
        console.log($('.tbody-lattes').children("tr:has(.accordion-toggle)"));
    };

    $('.accordian-body').on('show.bs.collapse', function () {
        $(this).closest("table")
                .find(".collapse.in")
                .not(this)
                .collapse('toggle');

    });

    $scope.showFilter = $('#selectTypeSearch').change(function () {
        if ($('#selectTypeSearch').val() === '1') {
            $('.filter-teacher').fadeOut(200);
        } else {
            $('.filter-teacher').fadeIn(200);
        }
    });

    $scope.changeIcon = function (rowId) {
        if ($('.' + rowId).hasClass('in') && !$('.' + rowId).hasClass('collapsing')) {
            $('#' + rowId + ' span:first-child').removeClass("glyphicon-minus").addClass("glyphicon-plus");
            $('#' + rowId).children().toggleClass('row-active');

        } else if (!$('.' + rowId).hasClass('collapsing')) {

            $('#' + rowId + ' span:first-child').removeClass("glyphicon-plus").addClass("glyphicon-minus");
            $('#' + rowId).children().toggleClass('row-active');
        }


        $('.' + rowId).attr("onclick", 'closeTab()');

        closeTab = function () {
            $('#' + rowId + ' td:first-child').click();
        };

    };


});