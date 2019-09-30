<%-- 
    Document   : escola
    Created on : February 16, 2019, 4:28:54 PM
    Author     : Daniel e Italo
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt">
    <head>
        <meta charset="utf-8">        
        <link rel="icon" type="image/png" sizes="16x16" href="<%=request.getContextPath()%>/res/images/icons/favicon-16x16.png">        
        <link rel="icon" type="image/png" sizes="32x32" href="<%=request.getContextPath()%>/res/images/icons/favicon-32x32.png">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Escola de Inovadores</title>
        <meta name="description" content="Agenda Inova Paula Souza">
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
        <div id="banner" class="banner banner-escola">
            <div class="bg-color">
                <div class="container">
                    <div class="row">   
                        <div class="text-center">
                            <div class="text-border">
                                <h1 class="text-dec">ESCOLA DE INOVADORES</h1>
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
                    <div class="col-md-10 col-md-offset-1">
                        <div class="text-justify ">
                            <div class="text-center">
                                <h1>Escola de Inovadores</h1>
                                <hr class="bottom-line2">
                            </div>
                            <p>Cursos de extensão com o objetivo de viabilizar modelos de negócio e start-ups.</p>
                            <div style="text-align: center;">
                                <a style="min-width: fit-content;max-width: max-content;margin-left: 0!important;margin-top: 0!important;margin-bottom: 5px!important;" title="Edital de Chamada Devops2019" href="<%=request.getContextPath()%>/res/archive/escol-inovadores-2019.pdf" target="_blank" class="btn btn-primary"><span >Edital de Abertura Escola de Inovadores - 2019</span></a><br />
                            </div>
                        </div>
                    </div>
                </div>
                <br><br>

                <div class="row" id="escolas">
                    <div class="col-md-4">
                        <a href="escola-araraquara.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/escola-araraquara.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-araçatuba.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/escola-araçatuba.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-americana.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/escola-americana.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-assis.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/escola-assis.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-bebedouro.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/escola-bebedouro.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-botucatu.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/escola-botucatu.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-campinas.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/escola-campinas.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-campo-limpo.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/campo-limpo.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-capao-bonito.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/capao-bonito.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-cubatao.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/cubatao.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-embu.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/embu.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-ferraz-vasconcelos.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/ferraz-vasconcelos.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-franca.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/franca.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-franco-da-rocha.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/franco-da-rocha.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-guaratingueta.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/guaratingueta.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-ibitinga.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/ibitinga.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-indaiatuba.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/indaiatuba.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-itu.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/itu.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-jaboticabal.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/jaboticabal.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-jahu.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/jahu.png" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-lins.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/lins.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-lorena.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/lorena.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-marilia.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/marilia.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-mogi-cruzes.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/mogi-cruzes.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-maua.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/maua.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-osasco.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/osasco.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-osvaldo-cruz.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/osvaldo-cruz.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-ourinhos.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/ourinhos.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-palmital.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/palmital.png" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-pinda.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/pinda.jpg" alt=""></a>
                    </div>
                    <%-- 
                  <div class="col-md-4">
                      <a href="escola-piracicaba.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/piracicaba.jpg" alt=""></a>
                  </div>
                    --%>
                    <div class="col-md-4">
                        <a href="escola-pompeia.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/pompeia.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-ribeirao-preto.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/ribeirao-preto.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-rio-preto.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/rio-preto.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-santana-parnaiba.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/santana-parnaiba.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-sao-jose-campos.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/sao-jose-campos.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-saoroque.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/sao-roque.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-sao-paulo.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/sao-paulo.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-sorocaba.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/sorocaba.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-taquaritinga.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/taquaritinga.jpg" alt=""></a>
                    </div> 
                    <div class="col-md-4">
                        <a href="escola-tatui.jsp"><img src="<%=request.getContextPath()%>/res/images/escola/tatui.jpg" alt=""></a>
                    </div>       
                </div>

        </section>

        <!--/ cursos-->           

        <script src="<%= request.getContextPath()%>/res/scripts/angular/angular.min.js"></script>
        <!-- Bootstrap JS -->            
        <script src="<%=request.getContextPath()%>/res/scripts/angular/jquery.easing.min.js"></script>            
        <!-- Bootstrap.js está junto do jquery.min.js -->
        <script src="<%=request.getContextPath()%>/res/scripts/angular/custom.js"></script>         
        <%--<%@include file="<%=request.getContextPath()%>WEB-INF/jspf/restrict/schedule/warningEvent.jspf" %>--%>
        <%--<%@include file="<%=request.getContextPath()%>/WEB-INF/jspf/restrict/schedule/confirm-sent.jspf" %>--%>        
        <%@include file="../WEB-INF/jspf/header.jspf" %>
        <!-- Scripts -->
        <%@include file="../WEB-INF/jspf/body_scripts.jspf" %>
    </body>
</html>
