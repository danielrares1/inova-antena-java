<%-- 
    Document   : parcerias
    Created on : Aug 15, 2017, 2:58:47 PM
    Author     : Primola
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
        <title>Parcerias</title>
        <meta name="description" content="Plataformas Temáticas">
        <!-- Fontes-->
        <link href="<%=request.getContextPath()%>/res/fonts/font-awesome/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/res/styles/bootstrap.min.css">
        <link href="<%=request.getContextPath()%>/res/styles/style-default.css" rel="stylesheet" type="text/css"/>
        <link href="<%=request.getContextPath()%>/res/styles/style-pages.css" rel="stylesheet" type="text/css"/>
        <script src="<%=request.getContextPath()%>/res/scripts/angular/angular.min.js"></script>
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
                                <h1 class="text-dec">PARCERIAS PARA INOVAÇÃO</h1>
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
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <div class="text-justify ">
                            <div class="text-center">
                                <h1>Parcerias para Inovação</h1>
                                <hr class="bottom-line2">
                            </div>
                            <p class="text-justify">Cooperação com ICTs públicas e privadas com o objetivo de proporcionar aprendizagem e oportunidades em projetos de pesquisa e inovação para alunos e professores do Centro Paula Souza. Apoio para a criação de ICTs privadas adjacentes a Fatecs e Etecs visando cooperação de longo prazo e impactos para municípios e APLs.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--/ cursos-->           
                    
        <!-- Bootstrap JS -->            
        <script src="<%=request.getContextPath()%>/res/scripts/jquery.easing.min.js"></script>            
        <!-- Bootstrap.js está junto do jquery.min.js -->
        <script src="<%=request.getContextPath()%>/res/scripts/custom.js"></script>         
        <%--<%@include file="../WEB-INF/jspf/restrict/schedule/warningEvent.jspf" %>--%>
        <%--<%@include file="../WEB-INF/jspf/restrict/schedule/confirm-sent.jspf" %> --%>       
        <%@include file="../WEB-INF/jspf/footer.jspf" %>
    </body>
</html>