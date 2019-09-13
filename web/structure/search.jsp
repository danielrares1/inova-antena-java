<%-- 
    Document   : search
    Created on : Feb 19, 2018, 5:25:51 PM
    Author     : Vinicius
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%--<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>--%>
<!DOCTYPE html>
<html lang="pt" ng-app="lattesSearch">
    <head>
        <meta charset="utf-8">                
        <link rel="icon" type="image/png" sizes="16x16" href="<%=request.getContextPath()%>/res/images/icons/favicon-16x16.png">
        <link rel="icon" type="image/png" sizes="32x32" href="<%=request.getContextPath()%>/res/images/icons/favicon-32x32.png">        
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">        
        <title>Busca de professores - Inova Paula Souza</title>        
        <meta name="description" content="Professores na Plataforma Lattes - Inova Paula Souza">
        <meta name="keywords" content="patentes, marcas,empreendedorismo,redes tematicas,polos regionais,inovação">        
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/res/styles/bootstrap.min.css">        
        <link href="<%=request.getContextPath()%>/res/styles/style.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="<%=request.getContextPath()%>/res/styles/animate.css">
        <link href="<%=request.getContextPath()%>/res/fonts/font-awesome/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    </head>
    <body ng-controller="ControllerLattesSearch">
        <%@include file="../WEB-INF/jspf/header.jspf" %>        
        <div id="banner" class="banner banner-busca">
            <div class="bg-color">
                <div class="container">
                    <div class="row">
                        <div class="text-center">
                            <div class="text-border">
                                <h1 class="text-dec">BUSCA DE PROFESSORES</h1>
                            </div>
                            <div class="scroll">
                                <a href="#busca" class="mouse-hover"><strong class="fa fa-angle-down " data-wow-delay="1.2s"></strong></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>     
        <div class="container-fluid" > 
            <div class="text-center">                        
                <br>
                <img alt="Banner Docentes" class="img-responsive center-block" src="<%=request.getContextPath()%>/res/images/icons/ic_docentes.png" width="128" height="128">                    
                <h4><strong>Busca por competência de docentes do CPS na Plataforma Lattes.</strong></h4>                                               
            </div>            
            <div class="row ">   
                <div class='col-md-12 col-lg-12'>
                    <div class="col-md-3 clearfix"></div>
                    <div class="col-xs-12 col-sm-7 col-md-6 col-lg-6">
                        <label >&nbsp;</label>
                        <div class="input-group">
                            <input class="form-control" id="inputSearch" type="text" placeholder="Procurar..." ng-model="search" ng-keypress="searchKeyPress($event)">                            
                            <div class="input-group-btn">
                                <button class="btn btn-default" ng-click="callBack()" type="submit" ng-keypress="" >
                                    <strong class="glyphicon glyphicon-search"></strong>
                                </button>
                            </div>
                        </div>                                                                                                                         
                    </div>                    
                    <div class="col-md-3 clearfix"></div>
                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 hidden">
                        <label for="selectTypeSearch">Filtrar por:</label>
                        <select id="selectTypeSearch" class="form-control">
                            <option value="0">Professor</option>
                            <option value="1">Unidade</option>
                        </select>
                    </div>                    
                    <!--                    <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3" data-wow-delay=".2s">
                                            <div class="col-xs-12 col-sm-12">
                                                <label for="selectFilter">Filtrar por:</label>
                                            </div>
                                            <div class="col-xs-12 col-sm-12">
                                                <select class="form-control" ng-model="filterIndex">
                                                    <option value="0">Todos</option>
                                                    <option value="1">Nome</option>
                                                    <option value="3">Áreas de atuação</option>
                                                    <option value="5">Atuação profissional</option>
                                                    <option value="6">Formação</option>
                                                    <option value="4">Linhas de pesquisa</option>
                                                    <option value="7">Produções</option>
                                                    <option value="2">Resumo</option>
                                                </select>
                                            </div>
                                        </div>-->
                </div>       
            </div>
            <hr>
            <div class="row">                
                <div  style='min-height: 420px;' class='col-md-12'>                    
                    <div class="col-xs-12 col-md-12 ng-hide" ng-show="loading">
                        <div  class="loader" style="margin-top:3rem"></div>
                    </div>
                    <div id="section_lattes" class="hidden col-md-12">
                        <table class="table table-hover table-striped table-agenda table-lattes  " ng-hide='loading' >
                            <thead> 
                                <tr>                                            
                                    <th style="width:95%;">Nome<span class="glyphicon glyphicon-triangle-bottom"></span></th>
                                    <th style="width: 5%;">Lattes</th>                                   
                                </tr>
                            </thead> 
                            <tbody class="tbody-lattes">                                       
                                <tr dir-paginate="result in resultsList | itemsPerPage:qtdPage"  total-items="resultsListSize" current-page="pagination.current" pagination-id="lattes_search">                                                        
                                    <td ng-click="changeIcon(result.id_lattes)" id="table-lattes-row">                                        
                                        <h5><strong ng-bind="result.name"></strong></h5>
                                    </td>
                                    <td>
                                        <a ng-href="http://lattes.cnpq.br/{{result.id_lattes}}" target="_blank">
                                            <img id="icon-lattes" src="<%=request.getContextPath()%>/res/images/icons/ic_lattes.png" alt="Currículo Lattes"/></a>                                              
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div ng-show="!!resultsListError" class="alert alert-danger text-center">{{resultsListError}}</div>
                    </div>                                      
                    <div class='table-pagination text-center'>
                        <dir-pagination-controls on-page-change="pageChanged(newPageNumber)" max-size="7" boundary-links="true" pagination-id="lattes_search"></dir-pagination-controls>
                    </div> 
                </div>
            </div>    
        </div>



        
        <script src="<%= request.getContextPath()%>/res/scripts/angular/angular.min.js"></script>
        <script src="<%= request.getContextPath()%>/res/scripts/angular/angularLattesSearch.js"></script>
        <script src="<%= request.getContextPath()%>/res/scripts/angular/dirPagination.js?ver=1"></script>
        <script src="<%=request.getContextPath()%>/res/scripts/jquery.easing.min.js"></script>        
        <!-- Bootstrap.js está junto do jquery.min.js -->
        <script src="<%=request.getContextPath()%>/res/scripts/custom.js"></script>                
        <%--<%@include file="../WEB-INF/jspf/restrict/schedule/warningEvent.jspf" %>--%>
        <%--<%@include file="../WEB-INF/jspf/restrict/schedule/confirm-sent.jspf" %> --%>       
        <%@include file="../WEB-INF/jspf/footer.jspf" %>
    </body>
</html>
