<%-- 
    Document   : escola-rio-preto
    Created on : 04/09/2018, 21:09:12
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
        <title>Escola de Inovadore- São Paulo </title>
        <meta name="description" content="Escola de Inovadores">
        <!-- Fontes-->
        <link href="<%=request.getContextPath()%>/res/fonts/font-awesome/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/res/styles/bootstrap.min.css">
        <link href="<%=request.getContextPath()%>/res/styles/style-default.css" rel="stylesheet" type="text/css"/>
        <link href="<%=request.getContextPath()%>/res/styles/style-pages.css" rel="stylesheet" type="text/css"/>
    </head>
    <style>
        hr {
             border-color:#aaa;
            box-sizing:border-box;
            width:80%;
            margin-bottom: 100px;
        }
    </style>
    <body >
        <!--/ Navigation bar-->
        <%@include file="../WEB-INF/jspf/header.jspf" %>
        <!--/ Navigation bar-->
        <!--Banner-->
        <div id="banner" class="banner banner-escolas">
            <div class="bg-color">
                <div class="container">
                    <div class="row">
                        <div class="text-center">
                            <div class="text-border">
                                <h1 class="text-dec">ESCOLA DE INOVADORES - São Jose do Rio Preto</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--/ Banner-->
        <br><br>
        <div id="img-escola" class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <h2>FATEC RIO PRETO<h2>
                    <img class="banner-escolas-sombra" src="<%=request.getContextPath()%>/res/images/escola/unidades/fatec-rio-preto.jpeg" alt="Escola São José do Rio Preto"/>
                </div>
            </div>
        </div>
        <section id="escolas">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <p>
                            FAÇA SUA
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSeQcTogxeNMO5DrqaFzxaZr00ARghugPJFiGX9GymD22sg1zQ/viewform" target="_blank"><strong>INSCRIÇÃO</strong></a> AQUI!</p><br>
                        </p><br>
                    </div>
                </div>
            </div>
        </section>
        <hr />
                <div id="img-escola" class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <h2>ETEC RIO PRETO<h2>
                    <img class="banner-escolas-sombra" src="<%=request.getContextPath()%>/res/images/escola/unidades/etec-rio-preto.jpeg" alt="Escola São Jose do Rio Preto"/>
                </div>
            </div>
        </div>
        <section id="escolas">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <a href="../res/archive/Programa Escola de Inovadores - PILOTO NOVA PROPOSTA 2019 - ETEC Rio Preto.pdf" target="_blank">Confira o projeto pedagógico da Escola de Inovadores - 2019</a><br><br>
                        <p>FAÇA SUA <a href="https://docs.google.com/forms/d/e/1FAIpQLSfmR7RPkVVbvOH6rukWnok4nS7F7BijU89F2xZ3G-Mi1kL91Q/viewform" target="_blank"><strong>INSCRIÇÃO</strong></a> AQUI!</p><br>

                    </div>
                </div>
            </div>
        </section>
        <!-- Noticias-->
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

