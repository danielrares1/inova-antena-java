<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Cadastro - Antena CPS</title>
        
        <!-- Bootstrap CSS -->
        <link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/res/styles/styles_home.css">
    </head>
    <body>
        
    <!-- Header -->
    <%@include file="../../WEB-INF/jspf/header_footer/header.jspf"%>
        
    <div id="background-cadastro" class="container-fluid">
        <div class="register" style="text-align: center">
            <div><h4><strong>Cadastre-se e seja um antenado!</strong></h4></div>
            <div><p>Vai ser rápido! Basta preencher os seguintes dados:</p></div>
            <form>
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label for="firstName">Nome</label>
                            <input type="text" class="form-control" name="firstName"/>
                            <div><div>Digite seu nome </div></div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label for="lastName">Sobrenome</label>
                            <input type="text" class="form-control" name="lastName"/>
                            <div><div>Digite seu sobrenome</div></div>
                        </div>
                    </div>
                </div> 
                <div class="row">
                    <div class="col-6"> 
                        <div class="form-group">
                            <label for="email">E-mail</label>
                            <input id="email" type="email" class="form-control" name="email"/>
                            <div>
                                <div>Digite seu email</div>
                                <div>Digite um email válido</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6"> 
                        <div class="form-group">
                            <label for="password">Senha</label>
                            <input type="password" class="form-control" name="password"/>
                            <div>
                                <div>Digite sua senha</div>
                                <div>A senha deve conter 6 dígitos</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-14">
                    <div class="form-group">
                        <label for="option">Você é:</label>
                        <select class="form-control">
                            <option value="Aluno">Aluno</option>
                            <option value="Professor">Professor</option>
                            <option value="Gestor">Gestor</option>
                            <option value="Colaborador">Colaborador</option>
                        </select>
                    </div>
                </div>
            </form>
            <div class="form-group">
                <button id= "btnEntrar" class="btn btn-danger" style="margin-top: 2%;">ENTRAR</button>
                <div class="icons-register">
                    <div  id="icon1"><a href=""><img src="<%= request.getContextPath()%>/res/images/fbAccessBt.png" style="max-width: 27px" alt=""></a></div>
                    <div  id="icon1"><a href=""><img src="<%= request.getContextPath()%>/res/images/gglAccessBt.png" style="max-width: 27px" alt=""></a></div>
                    <div  id="icon1"><a href=""><img src="<%= request.getContextPath()%>/res/images/inAccessBt.png" style="max-width: 27px" alt=""></a></div>
                    <!-- <div class="col-sm-3" id="icon"><a href=""><img [src]="shield" alt=""></a></div> -->
                </div> 
            </div>
            <div id="palavras">
                <p>ou cadastre:</p>
            </div>
            <div id="frases" style="margin-top: 4%;">
                <br/>  
                <h5>Já é cadastrado? <a href="" data-toggle="modal" data-target="#modalLogin">Acesse aqui!</a></h5>
            </div>
            <div id="return">
                <h6><a href="/"><u>VOLTAR</u></a></h6>
            </div>
        </div>
    </div>
    <%@include file="login.jsp" %>
    </body>
    <%@include file="../../WEB-INF/jspf/imports.jspf" %>
</html>