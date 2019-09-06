<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-br">
    <head>        
        <title>Antena CPS</title>
        <link rel="shortcut icon" href="<%=request.getContextPath()%>/res/images/favicon.ico" />
        
        <!-- CSS -->
        <link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/res/styles/styles_home.css">
        
        <!-- Head references -->
        <%@include file="WEB-INF/jspf/head_references.jspf" %>
    </head>
    <body>
        
        <!-- Header -->
        <%@include file="WEB-INF/jspf/header.jspf"%>
        
        <!-- Home -->
        <div class="fundo jumbotron">
            <div class="container">
                <br/><br/>
                <h1 id="home" class="display-4">HOME - ANTENA CPS</h1>
                <div class="Entrar jumbrotron"> 
                    <button type="button" class="btn btn-danger btn-lg" id="openModal" data-toggle="modal" data-target="#modalLogin" style="width: 200px">ENTRAR</button>
                    <button hidden data-toggle="modal" data-target="#modalLogin" id="openModal2"></button>
                    <button hidden data-toggle="modal" data-target="#modalCont" id="openModalCont"></button>
                </div> 
            </div>
        </div>
        <div id="background">
            <br/><h1 id="capt">Captando INOVAÇÃO,</h1><br/>
            <h1 id="propg">propagando para os</h1><h1 id="anten">antenados</h1><br/><br/>
        </div> 

        <!-- Footer -->
        <%@include file="WEB-INF/jspf/footer.jspf"%>
    
        <!-- Modals Login --> 
        <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div>
                        <h5 class="modal-title" id="exampleModalLongTitle" style="margin-left: 16%; 
                            margin-top: 5%"><b>BEM-VINDO DE VOLTA, ANTENADX!</b></h5>
                        <h6 class="modal-title" id="exampleModalLongTitle2" 
                            style="margin-left: 38%">Acesse sua conta</h6>
                    </div>
                    <div class="modal-body">
                        <div>
                            <form action="data/login.jsp">
                                <label id="labelEmail" for="email">E-mail</label>
                                <br/>
                                <input type="text" id="username" value="" class="camposform" name="email"/>
                                <br/><br/>
                                <label id="labelSenha" for="password">Senha</label>
                                <br/>
                                <input type="password" id="password" class="camposform" name="password"/>
                                <label id="ouAcesse"> Ou acesse: </label> 
                                <button id="btnEntrar" class="btn btn-lg btn-danger" type="submit" 
                                     style="margin-left: -82%;"><b>ENTRAR</b>
                                </button> 
                                <br/>
                                <a data-toggle="modal" id="clickPassword" data-target="#passwordModal" data-dismiss="modal"
                                    href="#0" style="font-size: 12px; margin-left: 7%">Esqueceu sua senha?</a>
                                <div id="iconF">  
                                    <a><img id="facebookImage" src="<%= request.getContextPath()%>/res/images/fbAccessBt.png"
                                        style="max-width: 27px" alt=""/></a>
                                </div>
                                <div id="iconL">
                                    <a><img id="linkedinImage" src="<%= request.getContextPath()%>/res/images/inAccessBt.png"
                                        style="max-width: 27px" alt=""/></a>
                                </div>
                                <div id="iconG">
                                    <a><img id="googleImage" src="<%= request.getContextPath()%>/res/images/gglAccessBt.png"
                                        style="max-width: 27px" alt=""/></a>
                                </div>
                                <br/><br/>
                                <div id="primeiroAcesso">
                                    <p>Primeiro acesso? Cadastre-se <a href="/register.jsp">aqui</a>.</p>
                                </div>
                                <div>
                                    <button id="close-modal-login" class="close" data-dismiss="modal"
                                        aria-label="Close" style="margin-right: 80%; font-size: 10px"><u>VOLTAR</u>
                                    </button>
                                    <br/>
                                </div>
                                <!-- <div id="center">
                                    <button type="button"  size="lg" class="btn btn-primary" id="fbcolor" ><i class="fab fa-facebook-f left"></i></button>
                                    <button (click)="lgGoogle()" size="lg"  class="btn btn-secundary" id="ggcolor" >G</button>
                                </div> -->
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="passwordModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel" style="text-align: center;">
                            PREENCHA O SEU E-MAIL NO CAMPO ABAIXO PARA RECUPERAR SUA SENHA
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form name="form">
                            <label for="email">E-mail</label>
                            <input id="email" type="email" class="form-control" name="email"/>
                            <div class="invalid-feedback">
                                <!--<div *ngIf="email.errors.required">Digite seu e-mail.</div>
                                <div *ngIf="email.errors.email">Digite um e-mail válido.</div>-->
                            </div>
                            <div class="form-group">
                                <button class="btn btn-danger" hidden id="sendPassword">Enviar</button>
                            </div>
                        </form>
                    </div>
                    <div style="text-align: center">
                        <h6>Ainda não é um Antenadx? <a href="/#/cadastro" 
                            data-dismiss="modal">Clique aqui</a></h6>
                        <h6 id="back-login"><a data-target="#modalLogin" data-toggle="modal" 
                            data-dismiss="modal" href="#0">Voltar para o login</a></h6>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" 
                            data-dismiss="modal">Recuperar senha</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalCont" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Bem-vindo de volta!</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">x</span></button>
                    </div>
                    <div class="modal-body">
                        <div style="text-align: center">
                            <div style="margin-bottom: 20px;">
                                <button id="btnUser" class="btn btn-info" data-dismiss="modal" 
                                    data-toggle="modal" data-target="#modalLogin" >Continuar como</button>
                            </div>
                            <div>
                                <button class="btn btn-danger" data-dismiss="modal" data-toggle="modal" 
                                    data-target="#modalLogin">Entrar com outra conta</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer" style="text-align: center">
                        <p>Ainda não é cadastrado ? Cadastre se <a href="/#/cadastro" 
                            data-dismiss="modal"> aqui.</a></p>
                    </div>
                </div>
            </div>
        </div>        

        <!-- Scripts -->
        <%@include file="WEB-INF/jspf/body_scripts.jspf" %>
    
    </body>
        
</html>
