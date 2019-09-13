<%-- 
    Document   : agentes
    Created on : 03/10/2017
    Author     : Daniel
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%--<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>--%>
<!DOCTYPE html>
<html lang="pt" ng-app="AgentesModule">
    <head>
        <meta charset="utf-8">        
        <link rel="icon" type="image/png" sizes="16x16" href="<%=request.getContextPath()%>/res/images/icons/favicon-16x16.png">        <link rel="icon" type="image/png" sizes="32x32" href="<%=request.getContextPath()%>/res/images/icons/favicon-32x32.png">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Agentes de Inovação</title>
        <meta name="description" content="Divisão Regional e Agentes Inova Paula Souza">
        <!--<meta name="keywords" content="investidor, inovação, startup, criar empresa, empreendedorismo,conseguir investidor, criação de startups">-->
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/res/styles/bootstrap.min.css">
        <!-- Fontes-->        
        <link href="<%=request.getContextPath()%>/res/styles/style.css" rel="stylesheet" type="text/css"/>        
        <link rel="stylesheet" href="<%=request.getContextPath()%>/res/styles/owl.theme.default.min.css">                          
        <link href="<%=request.getContextPath()%>/res/fonts/font-awesome/font-awesome.min.css" rel="stylesheet" type="text/css"/>                
    </head>
    <body ng-controller="CarouselAgente">        
        <!--/ Navigation bar-->
        <%@include file="../WEB-INF/jspf/header.jspf" %>
        <!--/ Navigation bar-->
        <!--Banner-->
        <div id="banner" class="banner banner-agentes">
            <div class="bg-color">
                <div class="container">
                    <div class="row banner_top">
                        <div class="text-center">
                            <div class="text-border">
                                <h1 class="text-dec">As Unidades de Ensino do Centro Paula Souza</h1>
                            </div>
                            <div class="scroll">
                                <a href="#sobre" class="mouse-hover"><strong class="fa fa-angle-down" data-wow-delay="1.2s"></strong></a>
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
                        <div class="text-justify">
                            <br>
                            <div class="text-center">
                                <h2>Agentes de Inovação</h2>
                                <hr class="bottom-line2">
                            </div>
                            <p class="text-justify">   Equipe de 43 professores com atuação regionalizada para disseminar os programas da Inova, dar treinamentos e atender a demandas e projetos específicos nas unidades.<br><br>
                                Os Agentes de Inovação garantem a presença da Inova Paula Souza nas Etecs e Fatecs em todo o estado, apoiando os diversos programas da agência e colaborando ativamente na articulação com parceiros.<br><br>
                                Eles são o ponto focal e de contato para alunos, professores, mentores, empresas, pesquisadores e todos os demais integrantes dos ecossistemas locais de inovação e empreendedorismo.<br><br>
                                Nossos Agentes de Inovação estão capacitados para disseminar conhecimentos específicos relevantes para alunos, professores e parceiros, tais como:</p>

                            <ul  style="list-style-type: square">
                                <li> Design thinking;
                                <li> Modelos de negócio;</li>
                                <li> Lean startup;</li>
                                <li> Plataformas para desenho de projetos;</li>
                                <li> Análise e avaliação de projetos;</li>
                                <li> Fontes de financiamento para projetos de inovação;</li>
                                <li> Propriedade intelectual.</li>
                            </ul>
                            <p><strong> Entre em contato!</strong></p>
                            <br/>
                        </div>
                    </div>                    
                    <div class="text-center">  
                        <input type="button" class="btn btn-block btn-outline btn-outline-primary hidden-md hidden-lg" onclick="javascript: location.href = '../res/archive/mapa-inova.pdf';" value="MAPA ETECS E FATECS - Divisão por Região" />                                                                        
                    </div>
                    <div>
                         <div class="text-center">
                         <a style="min-width: fit-content;max-width: max-content;margin-left: 0!important;margin-top: 0!important;margin-bottom: 5px!important;" title="Edital de Chamada Coordenador de Projetos" href="../res/archive/edital-006-julho-2019.pdf" target="_blank" class="btn btn-outline btn-outline-primary"><span >Edital de Chamada pública 006  Agente de Inovação - Coordenador de Projetos</span></a>
                            <a style="min-width: fit-content;max-width: max-content;margin-left: 0!important;margin-top: 0!important;margin-bottom: 5px!important;" title="Edital de Chamada Coordenador de Projetos" href="../res/archive/resultado-edital-006-2019.pdf" target="_blank" class="btn btn-outline btn-outline-primary"><span >Edital de Resultado 006 Agente de Inovação</span></a>
                    </div
                    <div class="text-center">
                        <a style="min-width: fit-content;max-width: max-content;margin-left: 0!important;margin-top: 0!important;margin-bottom: 5px!important;" title="Edital de Chamada Coordenador de Projetos" href="../res/archive/edital-junho-2019-005.pdf" target="_blank" class="btn btn-outline btn-outline-primary"><span >Edital de Chamada pública para Agente de Inovação - Coordenador de Projetos</span></a>
                        <a style="min-width: fit-content;max-width: max-content;margin-left: 0!important;margin-top: 0!important;margin-bottom: 5px!important;" title="Edital de Chamada Coordenador de Projetos" href="../res/archive/resultado-edital-junho-2019.pdf" target="_blank" class="btn btn-outline btn-outline-primary"><span >Edital de Resultado 005 Chamada pública Agente de Inovação</span></a>
                    </div>
                    <div class="text-center">
                        <a style="min-width: fit-content;max-width: max-content;margin-left: 0!important;margin-top: 0!important;margin-bottom: 5px!important;" title="Edital de Chamada Devops2019" href="../res/archive/devops-02.pdf" target="_blank" class="btn btn-outline btn-outline-primary"><span >Edital de Chamada pública para Professor desenvolvedor - DevOps - 2 Chamada</span></a>
                        <a style="min-width: fit-content;max-width: max-content;margin-left: 0!important;margin-top: 0!important;margin-bottom: 5px!important;" title="Edital de Chamada Devops2019" href="../res/archive/escol-inovadores-2019.pdf" target="_blank" class="btn btn-outline btn-outline-primary"><span >Edital de Abertura Escola de Inovadores - 2019</span></a><br />
                    </div>
                    <div class="text-center">
                        <a style="min-width: fit-content;max-width: max-content;margin-left: 0!important;margin-top: 0!important;margin-bottom: 5px!important;" title="Edital de Chamada Devops2019" href="../res/archive/edital-devops-2019.pdf" target="_blank" class="btn btn-outline btn-outline-primary"><span >Edital de Chamada pública para Professor desenvolvedor - DevOps</span></a>
                        <a style="min-width: fit-content;max-width: max-content;margin-left: 0!important;margin-top: 0!important;margin-bottom: 5px!important;" title="Edital de Chamada Devops2019" href="../res/archive/resultado-devops.pdf" target="_blank" class="btn btn-outline btn-outline-primary"><span >Edital - Resultado 1ª chamada DevOps</span></a><br />
                        <div class="text-center">
                            <a style="min-width: fit-content;max-width: max-content;margin-left: 0!important;margin-top: 0!important;margin-bottom: 5px!important;" title="Edital de Resultado 2019" href="../res/archive/resultado-2019.pdf" target="_blank" class="btn btn-outline btn-outline-primary"><span >Edital de Resultado 2019</span></a>
                            <a style="min-width: fit-content;max-width: max-content;margin-left: 0!important;margin-top: 0!important;margin-bottom: 5px!important;" title="Edital de Chamada 2019" href="../res/archive/edital-2019.pdf" target="_blank" class="btn btn-outline btn-outline-primary"><span >Edital de Chamada pública para Agente de Inovação 2019</span></a><br />                                                                
                    </div>
                        <input type="button" class="btn btn btn-outline btn-outline-primary hidden-sm hidden-xs" onclick="javascript: location.href = '../res/archive/mapa-inova.pdf';" value="MAPA ETECS E FATECS - Divisão por Região" />                   
                    <br>                    
                </div>
                <section id="mapacont" class="section-padding">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="mapa col-md-12 ">
                                <h3 class="text-center">Encontre o Agente de Inovação mais próximo de você!</h3><br>
                                <div id="mapa"></div>
                                <br>
                                <div class="row">
                                    <div class="col-md-1 col-md-offset-5 col-xs-6">
                                        <div class="contador">68</div>
                                        <h5><em>FATECs</em></h5>
                                    </div>
                                    <div class="col-md-1 col-xs-6 ">
                                        <div class="contador">221</div>
                                        <h5><em>ETECs</em></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="col-md-12">
                    <div class="text-center">        
                        <h4>Nossos Agentes de Inovação</h4>
                    </div>
                    <div id="owl" class="owl-carousel" ng-hide="loading">                            
                    </div>
                    <div ng-show="loading" class="loader" style="position: relative;margin-top: 6%"></div>

                    <%@include file="../WEB-INF/jspf/agent_description.jspf" %>
                </div>
            </div>
        </section>
        
        <script src="<%=request.getContextPath()%>/res/scripts/angular/angular.min.js"></script>                     
        <!-- Mapa -->        
        <script src="<%=request.getContextPath()%>/res/scripts/custom.js"></script>
        <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAz6jKh56PbImMwGnSm3sVmv2X_sl-W5RI&amp;"></script>
        <script src="<%=request.getContextPath()%>/res/scripts/markerclusterer.js"></script>
        <script src="<%=request.getContextPath()%>/res/scripts/waypoints.min.js"></script>        
        <script src="<%=request.getContextPath()%>/res/scripts/map.js"></script>
        <!--<script src="<%=request.getContextPath()%>/res/scripts/jquery.easing.min.js"></script>-->
        <!-- Bootstrap.js está junto do jquery.min.js -->                
        <%--<%@include file="../WEB-INF/jspf/restrict/schedule/warningEvent.jspf" %>--%>
        <%--<%@include file="../WEB-INF/jspf/restrict/schedule/confirm-sent.jspf" %> --%>       
        <%@include file="../WEB-INF/jspf/footer.jspf" %>
    </body>
</html>