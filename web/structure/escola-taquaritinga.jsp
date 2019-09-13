<%-- 
    Document   : escola-taquaritinga
    Created on : 07/01/2019, 13:50:48
    Author     : RENAN
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
        <title>Escola de Inovadores - Taquaritinga </title>
        <meta name="description" content="Escola de Inovadores">
        <!-- Fontes-->
        <link href="<%=request.getContextPath()%>/res/fonts/font-awesome/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/res/styles/bootstrap.min.css">
        <link href="<%=request.getContextPath()%>/res/styles/style-default.css" rel="stylesheet" type="text/css"/>
        <link href="<%=request.getContextPath()%>/res/styles/style-pages.css" rel="stylesheet" type="text/css"/>
    </head>
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
                                <h1 class="text-dec">ESCOLA DE INOVADORES - ETEC/FATEC TAQUARITINGA</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--/ Banner-->
        <br><br><br><br>
      
            <div class="row">
            <div class="col-md-8 col-md-offset-2">
            <img class="banner-escolas-sombra" src="<%=request.getContextPath()%>/res/images/escola/unidades/fatec-taquaritinga.jpg" alt="Escola Tauqaritinga"/>
  </div>
  <div class="col-md-8 col-md-offset-8" class="taqua" style="margin-top:-225px;">
            <img class="banner-escolas-sombra" src="<%=request.getContextPath()%>/res/images/escola/unidades/etec-taquaritinga.jpg" alt="Escola Tauqaritinga"/>
                </div>
</div>
        <section id="escolas">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <p>
                            FAÇA SUA
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdJk2eCkvtl2uIYL6l7VkZcX_XefsKmdzCwFSaRnzESi2MWxQ/viewform" target="_blank"><strong>INSCRIÇÃO</strong></a> AQUI!
                        </p><br>
                    </div>
                </div>
            </div>
        </section>
             <%--    
                  <div id="img-escola" class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <img class="banner-escolas-sombra" src="<%=request.getContextPath()%>/res/images/escola/unidades/etec-taquaritinga.jpg" alt="Escola Tauqaritinga"/>
                </div>
            </div>
        </div>
        <section id="escolas">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <p>
                            FAÇA SUA
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfPEkyFTAW-dQRGgzeRkBa8c-DxAW2HAUzU-xTEFSQ8Qjs_tw/viewform" target="_blank"><strong>INSCRIÇÃO</strong></a> AQUI!
                        </p><br>
                    </div>
                </div>
            </div>
        </section>
             --%>
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