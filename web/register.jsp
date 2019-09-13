<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Cadastro - Antena CPS</title>
        
        <!-- CSS -->
        <link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/res/styles/styles_home.css">
        
        <!-- Head references -->
        <%@include file="WEB-INF/jspf/head_references.jspf" %>
    </head>
    <body>
        
        <!-- Header -->
        <%@include file="WEB-INF/jspf/header.jspf"%>

        <div id="background-cadastro" class="container-fluid">
            <div class="register" style="text-align: center">
                <div><h4><strong>Cadastre-se e seja um antenado!</strong></h4></div>
                <div><p>Vai ser rápido! Basta preencher os seguintes dados:</p></div>
                <form action="data/registerUser.jsp">
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
                                <input id="email" type="email" class="form-control" name="emailRegister"/>
                                <div>
                                    <div>Digite seu email</div>
                                    <div>Digite um email válido</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6"> 
                            <div class="form-group">
                                <label for="password">Senha</label>
                                <input type="password" class="form-control" name="passwordRegister"/>
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
                            <select class="form-control" name="nivel">
                                <option value="Aluno">Aluno</option>
                                <option value="Professor">Professor</option>
                                <option value="Gestor">Gestor</option>
                                <option value="Colaborador">Colaborador</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <button id= "btnEntrar" class="btn btn-danger" style="margin-top: 2%;" type="submit">ENTRAR</button>
                        <div class="icons-register">
                            <div  id="icon1"><a href=""><img src="<%= request.getContextPath()%>/res/images/fbAccessBt.png" style="max-width: 27px" alt=""></a></div>
                            <div  id="icon1"><a href=""><img src="<%= request.getContextPath()%>/res/images/gglAccessBt.png" style="max-width: 27px" alt=""></a></div>
                            <div  id="icon1"><a href=""><img src="<%= request.getContextPath()%>/res/images/inAccessBt.png" style="max-width: 27px" alt=""></a></div>
                            <!-- <div class="col-sm-3" id="icon"><a href=""><img [src]="shield" alt=""></a></div> -->
                        </div> 
                    </div>
                </form>
                <div id="palavras">
                    <p>ou cadastre:</p>
                </div>
                <div id="frases" style="margin-top: 4%;">
                    <br/>  
                    <h5>Já é cadastrado? <a href="/home.jsp">Acesse aqui!</a></h5>
                </div>
                <div id="return">
                    <h6><a href="/home.jsp"><u>VOLTAR</u></a></h6>
                </div>
            </div>
        </div>
    
        <!-- Scripts -->
        <%@include file="WEB-INF/jspf/body_scripts.jspf" %>
        
    </body>
</html>