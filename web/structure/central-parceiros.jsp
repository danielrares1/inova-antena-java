<%-- 
    Document   : central-parceiros
    Created on : Jan 31, 2018, 3:19:16 PM
    Author     : Daniel
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%--<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>--%>
<!DOCTYPE html>
<html lang="pt">
    <head>
        <meta charset="utf-8">        
        <link rel="icon" type="image/png" sizes="16x16" href="<%=request.getContextPath()%>/res/images/icons/favicon-16x16.png">        <link rel="icon" type="image/png" sizes="32x32" href="<%=request.getContextPath()%>/res/images/icons/favicon-32x32.png">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Central de Parceiros</title>
        <meta name="description" content="Plataformas Temáticas">
        <!-- Fontes-->
        <link href="<%=request.getContextPath()%>/res/fonts/font-awesome/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/res/styles/bootstrap.min.css">
        <link href="<%=request.getContextPath()%>/res/styles/style.css" rel="stylesheet" type="text/css"/>
        <script>
            var area = "Parcerias para Inovação";
        </script>
    </head>
    <body <%--ng-app="AgentesModule"--%>>
        <!--/ Navigation bar-->
        <%@include file="../WEB-INF/jspf/header.jspf" %>
        <!--/ Navigation bar-->
        <!--Banner-->
        <div id="banner" class="banner banner-parcerias">
            <div class="bg-color">
                <div class="container">
                    <div class="row">
                        <div class="text-center">
                            <div class="text-border">
                                <h1 class="text-dec">CENTRAL DE PARCEIROS</h1>
                            </div>
                            <div class="scroll">
                                <a href="#sobre" class="mouse-hover"><strong class="fa fa-angle-down " data-wow-delay="1.2s"></strong></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--/ Banner-->
        <!--sobre-->
        <section id ="sobre" class="section-sobre">
            <div class="container">                
                <div class="col-xs-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2">
                    <div class="text-justify ">
                        <div class="text-center">
                            <h1>Conheça a Central de Parceiros</h1>
                            <hr class="bottom-line2">
                        </div>
                        <p class="text-justify"><strong>Realize palestras e transmita seu conhecimento para outras pessoas através da Central de Parceiros</strong>, o ambiente onde conhecimento, inovação e cooperação trabalham juntos.</p>
                        <p class="text-justify">A ideia é estimular alunos, professores e comunidade de interessados a participar frequentemente dos eventos e assim terem mais oportunidades para ampliar seus conhecimentos sobre novas tecnologias, metodologias de trabalho, projetos de inovação e os desafios de empreender, além de um maior contato com a realidade e as tendências atuais do setor produtivo.</p>
                    </div>
                </div>                
            </div>
            <br>
            <div class="container">

                <div class="col-md-12">
                    <div class="col-md-8 col-md-offset-2"> 
                        <div style="text-align: center;" >
                            <img class="img-responsive" width="700" height="300" src="<%=request.getContextPath()%>/res/images/banner/central_parceiros_palestra.jpg"/>
                        </div>
                        <h3 class="text-center">SEJA UM PARCEIRO E REALIZE PALESTRAS EM NOSSAS UNIDADES</h3> 
                        <h4 class="text-center">FAÇA SEU CADASTRO E NOS ENVIE SUA PROPOSTA!</h4>                        
                        <br>
                        <div class="text-center">
                                <c:if test="${sessionScope.user != null}">
                                    <a title="Cadastrar um evento" href="<%=request.getContextPath()%>/restrict/schedule/area-manager.jsp?id=${sessionScope.user.getId()}" class="btn btn-outline btn-outline-primary" ><span style="font-size: 1.2rem" ng-disabled="true">CADASTRAR MEU EVENTO</span></a>
                                </c:if>
                                <c:if test="${sessionScope.user == null}">
                                    <a title="Cadastrar um evento" href="#" data-target="#registerUsers" data-toggle="modal" class="btn btn-outline btn-outline-primary" ><span style="font-size: 1.2rem" ng-disabled="true">CADASTRAR MEU EVENTO</span></a>
                                </c:if>
                        </div>
                    </div>
                </div>
        </section>
        <!--/ cursos-->           
               
        <script src="<%=request.getContextPath()%>/res/scripts/angular/angular.min.js"></script>
        <!-- Bootstrap JS -->            
        <script src="<%=request.getContextPath()%>/res/scripts/jquery.easing.min.js"></script>            
        <!-- Bootstrap.js está junto do jquery.min.js -->
        <script src="<%=request.getContextPath()%>/res/scripts/custom.js"></script>         
        <%--<%@include file="../WEB-INF/jspf/restrict/schedule/warningEvent.jspf" %>--%>
        <%--<%@include file="../WEB-INF/jspf/restrict/schedule/confirm-sent.jspf" %> --%>       
        <%@include file="../WEB-INF/jspf/footer.jspf" %>
    </body>
</html>
