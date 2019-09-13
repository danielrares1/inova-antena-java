<%-- 
    Document   : noticia
    Created on : Sep 20, 2017, 4:18:35 PM
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
        <title>Noticia Inova Paula Souza</title>
        <meta name="description" content="Agenda Inova Paula Souza">


        <!-- Fontes-->
        <link href="<%=request.getContextPath()%>/res/fonts/font-awesome/font-awesome.min.css" rel="stylesheet" type="text/css"/>

        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/res/styles/bootstrap.min.css">
        <link href="<%=request.getContextPath()%>/res/styles/style-default.css" rel="stylesheet" type="text/css"/>
        <link href="<%=request.getContextPath()%>/res/styles/style-pages.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" type="text/css" href="<%= request.getContextPath()%>/res/styles/style.css">

    </head>
    <body >
        <!--/ Navigation bar-->
        <%@include file="../WEB-INF/jspf/header.jspf" %>
        <!--/ Navigation bar-->

        <!--Banner-->
        <div id="banner" class="banner banner-noticia">
            <div class="bg-color">
                <div class="container">
                    <div class="row">
                        <div class="text-center">
                            <div class="text-border">
                                <h1 class="text-dec">+ NOTÍCIAS</h1>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--/ Banner-->
        <!-- Noticias-->
        <div id="noticia">
            <div class="container">
                <div class="row">
                    <h1 class="text-center"><strog>NOTÍCIAS</strog></h1>
                    <br>
                </div>
                <div class="container">
                    <div  class="col-md-12">
                        <div class="col-md-4 text-center">
                            <a href="">
                                <img src="../res/images/noticia1.jpg" alt=""/>
                                <p>Titulo - Descrição</p>
                        </div>
                        <div class="col-md-4 text-center">
                            <a href="">
                                <img src="../res/images/noticia2.jpg" alt=""/>
                                <p>Titulo - Descrição</p>
                        </div>
                        <div class="col-md-4 text-center">
                            <a href="">
                                <img src="../res/images/noticia3.jpg" alt=""/>
                                <p>Titulo - Descrição</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Noticias-->


        <!-- Noticias-->
        <div id="noticia">
            <div class="container">
                <div class="row">

                </div>
                <div class="container">
                    <div  class="col-md-12">
                        <div class="col-md-4 text-center">
                            <a href="">
                                <img src="../res/images/noticia1.jpg" alt=""/>
                                <p>Titulo - Descrição</p>
                        </div>
                        <div class="col-md-4 text-center">
                            <a href="">
                                <img src="../res/images/noticia2.jpg" alt=""/>
                                <p>Titulo - Descrição</p>
                        </div>
                        <div class="col-md-4 text-center">
                            <a href="">
                                <img src="../res/images/noticia3.jpg" alt=""/>
                                <p>Titulo - Descrição</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br><br><br><br><br><br>

        <!-- Noticias-->





        <!--/ cursos-->           
        <script src="../res/scripts/jquery-min.js"></script>            
        <!-- Bootstrap JS -->            
        <script src="../res/scripts/jquery.easing.min.js"></script>            
        <script src="../res/scripts/bootstrap.min.js"></script>
        <script src="../res/scripts/custom.js"></script>         
        <%--<%@include file="../WEB-INF/jspf/restrict/schedule/warningEvent.jspf" %>--%>
        <%--<%@include file="../WEB-INF/jspf/restrict/schedule/confirm-sent.jspf" %> --%>       
        <%@include file="../WEB-INF/jspf/footer.jspf" %>


    </body>
</html>
