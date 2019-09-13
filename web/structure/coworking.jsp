<%-- 
    Document   : ac
    Created on : Oct 9, 2017, 4:28:39 PM
    Author     : Primola
--%>

<%@page import="com.br.inova.conexao.Application"%>
<%@page import="java.util.ArrayList"%>
<%@page import="br.gov.sp.inovapaulasouza.util.RowSet"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%--<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>--%>
<!DOCTYPE html>
<html lang="pt">
    <head>
        <meta charset="utf-8">        
        <link rel="icon" type="image/png" sizes="16x16" href="<%=request.getContextPath()%>/res/images/icons/favicon-16x16.png">        <link rel="icon" type="image/png" sizes="32x32" href="<%=request.getContextPath()%>/res/images/icons/favicon-32x32.png">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Coworking</title>
        <meta name="description" content="Ambientes de Colaboração">
        <!-- Fontes-->
        <link href="<%=request.getContextPath()%>/res/fonts/font-awesome/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/res/styles/bootstrap.min.css">        
        <link href="<%=request.getContextPath()%>/res/styles/style-default.css" rel="stylesheet" type="text/css"/>
        <link href="<%=request.getContextPath()%>/res/styles/style-pages.css" rel="stylesheet" type="text/css"/>        
        <script>
            var area = "Coworking";
        </script>
    </head>
    <body <%--ng-app="AgentesModule"--%>>
        <!--/ Navigation bar-->
        <%@include file="../WEB-INF/jspf/header.jspf" %> 
        <!--/ Navigation bar-->
        <!--Banner-->
        <div id="banner" class="banner banner-ac">
            <div class="bg-color">
                <div class="container">
                    <div class="row">
                        <div class="text-center">
                            <div class="text-border">
                                <h1 class="text-dec">COWORKING</h1>
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

        <!--Carousel Destaques-->
        <%--<%@include file="../WEB-INF/jspf/highlights_carousel.jspf" %> --%>
        <!--Carousel Destaques-->

        <!--sobre-->
        <section id ="sobre" class="section-sobre">
            <div class="container">
                <div class="row">
                    <div class="col-md-10 col-md-offset-1">
                        <div class="text-justify ">
                            <div class="text-center">
                                <h1>Coworking</h1>
                                <hr class="bottom-line2">
                            </div>
                            <p class="text-justify">O programa Coworking tem o objetivo de integrar ao ambiente das escolas do Centro Paula Souza este novo modelo de trabalho, proporcionando motivação, aprendizagem e oportunidades para os alunos.<br><br>

                                Os espaços de coworking apontam para o futuro do trabalho. Na economia criativa, digital, empreendedora, o trabalho é organizado a partir de projetos, em grupos, por tempo limitado e com desafios sempre diferentes. Não vai mais existir clara distinção entre aprender e trabalhar. <br><br>

                                Por isso faz todo o sentido instalar esses espaços de trabalho nas escolas. Tanto para alunos iniciando suas carreiras na economia criativa quanto para os profissionais que precisam destes espaços para desenvolverem seus projetos. <br><br>

                                A presença deles na escola traz impactos motivacionais, pedagógicos e gera oportunidades para os estudantes. Os usuários externos do espaço sabem que devem ajudar para uma melhor formação dos alunos. É sua contrapartida pelo acesso ao espaço.<br><br>

                                Inovação e empreendedorismo requerem competências como atitude, comprometimento, liderança, e outras soft skills que não podem ser adquiridas apenas na sala de aula tradicional. É preciso também a vivência em projetos reais e interação com diferentes profissionais e conhecimentos.<br><br>

                                A Inova Paula Souza tem buscado apoio de parceiros para implantar e testar diversas configurações de ambientes para trabalho de coworking nas unidades do Centro Paula Souza ou próximas a elas. Alguns projetos
                                incluem também espaços maker e de prototipagem, incubadoras e aceleradoras de empresas.<br><br> 

                                Em 2018 teremos o início da operação piloto desses espaços em algumas unidades, na expectativa de expandir o programa para toda a rede nos próximos anos.<br><br>
                            </p>
                        </div>
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
