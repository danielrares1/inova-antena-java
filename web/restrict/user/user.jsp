<%@page import="java.sql.*"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <title>Perfil - Antena CPS</title>
        <link rel="shortcut icon" href="<%=request.getContextPath()%>/res/images/favicon.ico" />
        
        <!-- CSS -->
        <link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/res/styles/styles_profile.css">
        
        <!-- Head references -->
        <%@include file="../../WEB-INF/jspf/head_references.jspf" %>
    </head>
        <body class="background" id="border">
        
        <!-- Header Profile -->
        <%@include file="../../WEB-INF/jspf/header.jspf" %>
        
        <div class="container" style="margin-top: 250px">
            <div class="row">
                <div class="col-md-4">
                    <div class="row" id="icons" style="margin-top: 120px; margin-left: -15px; margin-right: -50px;">
                        <div class="col-sm-3" id="icon"><a><img src="<%= request.getContextPath()%>/res/images/profile/iconAwards.png" alt=""></a>
                            <h6 style="margin-left: 20%; color: #fff;">Prêmios</h6>
                        </div>
                        <div class="col-sm-3" id="icon"><a href="#/agenda"><img src="<%= request.getContextPath()%>/res/images/profile/iconEvent.png" alt=""></a>
                            <h6 style="margin-left: 20%; color: #fff;">Eventos</h6>
                        </div>
                        <div class="col-sm-3" id="icon"><a target="_blank"><img src="<%= request.getContextPath()%>/res/images/profile/iconProj.png" alt=""></a>
                            <h6 style="margin-left: 20%; color: #fff;">Projetos</h6>
                        </div>
                        <div class="col-sm-3" id="icon"><a target="_blank"><img src="<%= request.getContextPath()%>/res/images/profile/iconXP.png" alt=""></a>
                            <h6 style="margin-left: 45%; color: #fff;">XP</h6>
                        </div>
                    </div>
                </div>
                <div class="col-md-4" id="profile">
                    <div class="profile-name" id="name">
                        <h1>Nome completo parceiro</h1>
                    </div>
                    <div id="profile-image">
                        <img id="profile-pic" src="<%= request.getContextPath()%>/res/images/profile/profilePic.jpg" alt="" style="border: #72A5FF solid;">
                        <a href="#0" data-toggle="modal" data-target="#modalProfile"><i class="fas fa-cog fa-3x"
                            style="font-size: 2em"></i></a>
                    </div>
                    <div id="user-info">
                        <div class="" style="margin-top: -5px;">Fatec</div>
                        <div class="" style="margin-top: -5px;">20 anos</div>
                        <div class="" style="margin-top: -5px;">Estudante</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="row" style="margin-top: 150px; margin-left: -50px; margin-right: 0px;">
                        <div class="col-sm-3">
                            <a target="_blank"><img class="social-icons" src="<%= request.getContextPath()%>/res/images/profile/iconGithub.png" alt=""></a>
                        </div>
                        <div class="col-sm-3 " id="icons-social">
                            <a target="_blank"><img class="social-icons" src="<%= request.getContextPath()%>/res/images/profile/iconFacebook.png" alt=""></a>
                        </div>
                        <div class="col-sm-3" id="icons-social">
                            <a target="_blank"><img class="social-icons" src="<%= request.getContextPath()%>/res/images/profile/iconTwitter.png" alt=""></a>
                        </div>
                        <div class="col-sm-3" id="icons-social">
                            <a target="_blank"><img class="social-icons" src="<%= request.getContextPath()%>/res/images/profile/iconLinkedin.png" alt=""></a>
                        </div>
                        <div class="col-sm-3" id="icons-social">
                            <a target="_blank"><img class="social-icons" src="<%= request.getContextPath()%>/res/images/profile/iconYoutube.png" alt=""></a>
                        </div>
                        <div class="col-sm-3" id="icons-social">
                            <a target="_blank"><img class="social-icons" src="<%= request.getContextPath()%>/res/images/profile/iconInstagram.png" alt=""></a>
                        </div>
                    </div>
                </div>
            </div>
            <%@include file="../../WEB-INF/jspf/modals/profile/student.jspf"%>
            
            <!-- Portfolio -->
            <%@include file="../../WEB-INF/jspf/sections_page/portfolio.jspf"%>
            <%@include file="../../WEB-INF/jspf/modals/profile/project.jspf"%>
                        
            <!-- Desafios -->
            <%@include file="../../WEB-INF/jspf/sections_page/challenges.jspf"%>
            <%@include file="../../WEB-INF/jspf/modals/profile/challenges.jspf"%>
            
            <!-- Eventos -->
            <%@include file="../../WEB-INF/jspf/sections_page/events.jspf"%>

            <!-- Noticias -->
            <%@include file="../../WEB-INF/jspf/sections_page/news.jspf"%>
              
            <button hidden id="openModalFirst" data-toggle="modal" data-target="#modalFirst"></button>
        </div>
            
        <!-- Footer -->
        <%@include file="../../WEB-INF/jspf/footer.jspf" %>
        
        <!-- Scripts -->
        <%@include file="../../WEB-INF/jspf/body_scripts.jspf" %>
    </body>    
</html>