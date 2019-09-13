<%-- 
    Document   : pa
    Created on : Aug 15, 2017, 2:27:11 PM
    Author     : primola
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%--<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>--%>
<!DOCTYPE html>
<html lang="pt"  ng-app="ngApp">
    <head>
        <meta charset="utf-8">        
        <link rel="icon" type="image/png" sizes="16x16" href="<%=request.getContextPath()%>/res/images/icons/favicon-16x16.png">        <link rel="icon" type="image/png" sizes="32x32" href="<%=request.getContextPath()%>/res/images/icons/favicon-32x32.png">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Projetos Abertos</title>
        <meta name="description" content="Projetos Abertos">
        <!-- Fontes-->
        <link href="<%=request.getContextPath()%>/res/fonts/font-awesome/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/res/styles/bootstrap.min.css">
        <link href="<%=request.getContextPath()%>/res/styles/style-default.css" rel="stylesheet" type="text/css"/>
        <link href="<%=request.getContextPath()%>/res/styles/style-pages.css" rel="stylesheet" type="text/css"/>        
        <script>
            var area = "Projetos Abertos";
        </script>
    </head>
    <body ng-controller="controllerProblem">
        <!--/ Navigation bar-->
        <%@include file="../WEB-INF/jspf/header.jspf" %>
        <!--/ Navigation bar-->
        <!--Banner-->
        <div id="banner" class="banner banner-pa">
            <div class="bg-color">
                <div class="container">
                    <div class="row">
                        <div class="text-center">
                            <div class="text-border">
                                <h1 class="text-dec">PROJETOS ABERTOS</h1>
                            </div>
                            <div class="scroll">
                                <a href="#h4-problem" class="mouse-hover"><strong class="fa fa-angle-down " data-wow-delay="1.2s"></strong></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--/ Banner-->
        <div class="container">                
            <div class="col-xs-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2">
                <div class="text-justify ">
                    <div class="text-center">
                        <h1>Conheça os Projetos Abertos</h1>
                        <hr class="bottom-line2">
                    </div>
                    <p class="text-justify">Em <strong>Projetos Abertos</strong> empresas poderão sugerir problemas para serem solucionados por alunos e professores nas unidades do Centro Paula Souza.</p>
                    <p class="text-justify">A ideia é estimular alunos das unidades do CPS com problemas reais, e estimular os professores a realizarem em sala de aula a resolução de problemas do mundo real.</p>
                </div>
            </div>                
        </div>
        <!--sobre-->
        <div class="container">
            <br>
            <div ng-show="loading" style='position: relative; margin-top: 30%' class="loader"></div>
            <div ng-form="problem_form" ng-class="{'invisible': loading}">
                <h4 id="h4-problem" style="text-align: center">Preencha os campos abaixo para enviar um tema.</h4>
                <div class="row">
                    <div class="col-md-10 col-md-offset-1" >
                        <div>
                            <br><br>
                            <label for="title">Título do Tema:</label>
                            <input required  ng-model="problem.title" maxlength="100" name="title_problem" id="titulo-tema" type="text" class="form-control">                                    
                        </div>
                    </div>
                </div><br>
                <div class="row">
                    <div class="col-md-10 col-md-offset-1" >
                        <div> 
                            <label for="description">Descreva seu Tema:</label><br>
                            <textarea required ng-model="problem.desc" style="resize: none" maxlength="1024" name="description_problem" type="text" class="form-control  span6"  rows="5" id="desc-tema" ></textarea>     
                        </div>
                    </div>
                </div>
                <br>
<!--                <div class="row">
                    <div class="col-md-10 col-md-offset-1" >
                        <div> 
                            <label for="materials">Adicionar Materiais de Apoio:</label><br>
                            <div class="col-md-12">
                                <button class="btn btn-info" ng-click="change_link()">Links</button>
                                <button class="btn btn-info" ng-click="change_archive()">Arquivo</button>{{archive_input}}{{link_input}}
                            </div>
                            <div class="col-md-5" ng-show="link_input">
                                <span>Adicione Links separados por vírgula</span> 
                                <textarea ng-model="problem.links" style="resize: none" maxlength="1024" name="description" type="text" class="form-control  span6"  rows="5" ></textarea>                                     
                            </div>
                            <div class="col-md-2">
                                <div class="col-md-12 clearfix"></div>
                                <div class="col-md-12">
                                    <h4 class="text-center"><strong  ng-show="archive_input && link_input">- e -</strong></h4>
                                </div>                                
                                <div class="col-md-12 clearfix"></div>
                            </div>
                            <div class="col-md-5" ng-show="archive_input">                                 
                                <div class="col-md-12 clearfix"></div>
                                <div class="col-md-12">
                                    <input ngf-select ngf-accept=".rar/.pdf/" ng-model="problem.archives" name="archive" type="file" class="form-control">
                                </div>                                
                                <div class="col-md-12 clearfix"></div>
                            </div>
                            {{problem.archives}}
                        </div>
                    </div>
                </div>-->
                <br>
                <div class="btn-tema_pesquisa">
                    <c:if test="${sessionScope.user.getCompanyName() != null && sessionScope.user.getCompanyName() != ''}">
                        <button ng-click="sendProblem(problem)" style="min-width: fit-content; max-width: max-content;" ng-disabled="!problem.title || !problem.desc" class="btn btn-tema-pesquisa"><span style="font-size: 1.4rem" >ENVIAR PARA ANÁLISE</span></button>
                    </c:if>
                    <c:if test="${sessionScope.user.getCompanyName() == null || sessionScope.user.getCompanyName() == '' || sessionScope.user == null}">
                        <button style="min-width: fit-content; max-width: max-content;"  ng-disabled="!problem.title || !problem.desc"  class="btn btn-tema-pesquisa" ng-click="sendProblemERROR()" ><span style="font-size: 1.4rem" >ENVIAR PARA ANÁLISE</span></button>
                    </c:if>
                </div>                
            </div> 
            <br><br>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="modal-tema" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" style="text-align: center; color: red;">Ocorreu um erro</h4>
                    </div>
                    <div class="modal-body" style="text-align: center">
                        <c:if test="${sessionScope.user == null}"><p>Você ainda não está logado.</p></c:if>
                        <c:if test="${(sessionScope.user.getCompanyName() == '' && sessionScope.user.getName() != '')}"><p>Você ainda não cadastrou sua empresa. <br><a href="<%=request.getContextPath()%>/restrict/user/cadastrEmpresa.jsp">Clique aqui</a> e cadastre a sua.</p></c:if>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal" >Fechar</button>
                        </div>
                    </div>

                </div>
            </div>


                
        <script src="<%=request.getContextPath()%>/res/scripts/angular/angular.min.js"></script>
        <script src="<%= request.getContextPath()%>/res/scripts/angular/controllers_Portal/angularPortal.js"></script>                 
        <script src="<%= request.getContextPath()%>/res/scripts/angular/dirPagination.js?ver=1"></script>
        <!-- Bootstrap JS -->            
        <script src="<%=request.getContextPath()%>/res/scripts/jquery.easing.min.js"></script>            
        <!-- Bootstrap.js está junto do jquery.min.js -->
        <script src="<%=request.getContextPath()%>/res/scripts/custom.js"></script> 
        <%@include file="../WEB-INF/jspf/restrict/schedule/warningEvent.jspf"%>
        <%@include file="../WEB-INF/jspf/successAction.jspf"%>        
        <%@include file="../WEB-INF/jspf/header_footer/footer.jspf"%>
    </body>
</html>
