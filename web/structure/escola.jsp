<%-- Document : escola Created on : February 16, 2019, 4:28:54 PM Author :
Daniel --%> <%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Escola de Inovadores</title>
        <meta name="description" content="Agenda Inova Paula Souza" />
    </head>

    <body>
        <!--/ Navigation bar-->
        <nav class="navbar navbar-light bg-light fixed-top">
            <a href=""
               ><img
                    id="logo"
                    src="<%= request.getContextPath()%>/res/images/antena_logo.png"
                    alt="logo"
                    style="width: 15rem;"
                    /></a>
        </nav>
        <!--/ Navigation bar-->
        <!--Banner-->
        <div id="banner" class="banner banner-escola">
            <div class="bg-color">
                <div class="container">
                    <div class="row">
                        <div class="text-center">
                            <div class="text-border">
                                <h1 class="text-dec" >ESCOLA DE INOVADORES</h1>
                            </div>

                            <div class="scroll">
                                <a href="#sobre" class="mouse-hover"
                                   ><strong
                                        class="fa fa-angle-down "
                                        data-wow-delay="1.2s"
                                        ></strong
                                    ></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--/ Banner-->
        <!--sobre-->
        <section id="sobre" class="section-sobre">
            <div class="container">
                <div class="row">
                    <div class="col-md-10 col-md-offset-1">
                        <div class="text-justify ">
                            <div class="text-center" style="margin-left: 19%;">
                                <h1>Escola de Inovadores</h1>
                                <hr class="bottom-line2" />
                            </div>
                            <p>
                                Cursos de extensão com o objetivo de viabilizar modelos de
                                negócio e start-ups.
                            </p>
                            <div style="text-align: center;">
                                <a
                                    style="min-width: fit-content;max-width: max-content;margin-left: 18%;margin-top: 0!important;margin-bottom: 5px!important;"
                                    title="Formulário de Cadastro (Inovadores)"
                                    href=""
                                    id="openModal" data-toggle="modal" data-target="#modalEscola"
                                    target="_blank"
                                    class="btn btn-primary"
                                    ><span
                                        >Formulário de Cadastro para <strong>TODAS</strong> as escolas de Inovadores</span
                                    ></a
                                ><br />
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br />

                <div class="row" id="escolas">
                    <div class="col-md-4">
                        <a href="escola-araraquara.jsp"
                           ><img src="/res/images/escola/araraquara.jpeg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-araçatuba.jsp"
                           ><img src="/res/images/escola/araçatuba.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-americana.jsp"
                           ><img src="/res/images/escola/americana.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-assis.jsp"
                           ><img src="/res/images/escola/assis.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-bebedouro.jsp"
                           ><img src="/res/images/escola/bebedouro.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-botucatu.jsp"
                           ><img src="/res/images/escola/botucatu1.jpeg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-campinas.jsp"
                           ><img src="/res/images/escola/campinas.jpeg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-campo-limpo.jsp"
                           ><img src="/res/images/escola/campo-limpo.jpeg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-capao-bonito.jsp"
                           ><img src="/res/images/escola/capao-bonito.jpeg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-cubatao.jsp"
                           ><img src="/res/images/escola/cubatao.jpeg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-embu.jsp"
                           ><img src="/res/images/escola/embu.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-ferraz-vasconcelos.jsp"
                           ><img src="/res/images/escola/ferraz-vasconcelos.jpeg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-franca.jsp"
                           ><img src="/res/images/escola/franca.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-franco-da-rocha.jsp"
                           ><img src="/res/images/escola/franco-da-rocha.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-guaratingueta.jsp"
                           ><img src="/res/images/escola/guaratingueta.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-ibitinga.jsp"
                           ><img src="/res/images/escola/ibitinga.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-indaiatuba.jsp"
                           ><img src="/res/images/escola/indaiatuba.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-itu.jsp"
                           ><img src="/res/images/escola/itu.jpeg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-jaboticabal.jsp"
                           ><img src="/res/images/escola/jaboticabal.jpeg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-jahu.jsp"
                           ><img src="/res/images/escola/jahu.png" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-lins.jsp"
                           ><img src="/res/images/escola/lins.jpeg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-lorena.jsp"
                           ><img src="/res/images/escola/lorena.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-marilia.jsp"
                           ><img src="/res/images/escola/marilia.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-mogi-cruzes.jsp"
                           ><img src="/res/images/escola/mogi-cruzes.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-maua.jsp"
                           ><img src="/res/images/escola/maua.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-osasco.jsp"
                           ><img src="/res/images/escola/osasco.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-osvaldo-cruz.jsp"
                           ><img src="/res/images/escola/osvaldo-cruz.jpeg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-ourinhos.jsp"
                           ><img src="/res/images/escola/ourinhos.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-palmital.jsp"
                           ><img src="/res/images/escola/palmital.png" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-pinda.jsp"
                           ><img src="/res/images/escola/pinda.jpg" alt=""
                              /></a>
                    </div>

                    <div class="col-md-4">
                        <a href="escola-pompeia.jsp"
                           ><img src="/res/images/escola/pompeia.jpeg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-ribeirao-preto.jsp"
                           ><img src="/res/images/escola/ribeirao-preto.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-rio-preto.jsp"
                           ><img src="/res/images/escola/rio-preto.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-santana-parnaiba.jsp"
                           ><img src="/res/images/escola/santana-parnaiba.jpeg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-sao-jose-campos.jsp"
                           ><img src="/res/images/escola/sao-jose-campos.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-saoroque.jsp"
                           ><img src="/res/images/escola/sao-roque.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-sao-paulo.jsp"
                           ><img src="/res/images/escola/sao-paulo.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-sorocaba.jsp"
                           ><img src="/res/images/escola/sorocaba.jpeg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-taquaritinga.jsp"
                           ><img src="/res/images/escola/taquaritinga.jpg" alt=""
                              /></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-tatui.jsp"
                           ><img src="/res/images/escola/tatui.jpg" alt=""
                              /></a>
                 
         <div class="modal fade" id="modalEscola" tabindex="-1" role="dialog" aria-labelledby="modalProfileLabe" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">IDENTIFICAÇÃO DO PROPONENTE</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" id="close-modal-profile" style="font-size: 15px">VOLTAR</span>
                </button>
            </div>
            <div class="modal-body">
                <div>
                    <h6>Preencha os seus dados complementares</h6>
                </div>
                <form action="">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="">Endereço de e-mail</label>
                            <input type="email" class="form-control" id="" name="nome1" placeholder="" value="{{ aluno.nome }}" >
                        </div>
                        <div class="form-group col-md-6">
                            <label for="">Nome do Proponente</label>
                            <input type="text" class="form-control" id="" name="sobrenome1" placeholder=""  value="{{ aluno.sobrenome }}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="">RG nº</label>
                            <input type="text" class="form-control" id="" name="ra1" placeholder="" value="{{ aluno.ra }}">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="">CPF nº</label>
                            <input type="text" class="form-control" id="" name="cpf1" placeholder="" value="{{ aluno.ra }}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="">Data de Nascimento</label>
                            <input type="text" class="form-control" id="" name="data1" placeholder="" value="{{ aluno.nome }}" >
                        </div>
                        <div class="form-group col-md-6">
                            <label for="">Formação</label>
                            <input type="text" class="form-control" id="" name="form1" placeholder=""  value="{{ aluno.sobrenome }}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="">Endereço</label>
                            <input type="text" class="form-control" id="" name="adress1" placeholder="" value="{{ aluno.ra }}">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="">Bairro</label>
                            <input type="text" class="form-control" id="" name="bairro1" placeholder="" value="{{ aluno.ra }}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="">Complemento</label>
                            <input type="text" class="form-control" id="" name="comp1" placeholder="" value="{{ aluno.nome }}" >
                        </div>
                        <div class="form-group col-md-6">
                            <label for="">Número</label>
                            <input type="text" class="form-control" id="" name="n1" placeholder=""  value="{{ aluno.sobrenome }}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="">CEP</label>
                            <input type="text" class="form-control" id="" name="cep1" placeholder="" value="{{ aluno.ra }}">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="">Cidade</label>
                            <input type="text" class="form-control" id="" name="cidade1" placeholder="" value="{{ aluno.ra }}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="">UF</label>
                            <input type="text" class="form-control" id="" name="uf1" placeholder="" value="{{ aluno.nome }}" >
                        </div>
                        <div class="form-group col-md-6">
                            <label for="">Telefone ( )</label>
                            <input type="text" class="form-control" id="" name="tel1" placeholder=""  value="{{ aluno.sobrenome }}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="">Celular ( )</label>
                            <input type="text" class="form-control" id="" name="cel1" placeholder="" value="{{ aluno.ra }}">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="">Aluno é proveniente da?</label>
                            <select id="" class="form-control">
                                <option selected>ETEC</option>
                                <option selected>FATEC</option>
                                <option selected>COMUNIDADE</option>
                            </select>
                        </div>
                         <div style="text-align: center;">
                                <a
                                    style="min-width: fit-content;max-width: max-content;margin-left: 18%;margin-top: 0!important;margin-bottom: 5px!important;"
                                    title="nextpage"
                                    href=""
                                    id="openModal" data-toggle="modal" data-target="#modalProjeto1"
                                    target="_blank"
                                    class="btn btn-primary"
                                    ><span
                                        >Próxima página</span
                                    ></a
                                ><br />
                            </div>
                        
     <div class="modal fade" id="modalProjeto1" tabindex="-1" role="dialog" aria-labelledby="modalProfileLabe" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Dados do Projeto</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" id="close-modal-profile" style="font-size: 15px">VOLTAR</span>
                </button>
            </div>
            <div class="modal-body">
                <div>
                </div>
                <form action="">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="">Título do Projeto</label>
                            <input type="email" class="form-control" id="" name="title1" placeholder="" value="{{ aluno.nome }}" >
                        </div>
                        <div class="form-group col-md-6">
                            <label for="">Origem do Projeto</label>
                            <input type="text" class="form-control" id="" name="origem1" placeholder=""  value="{{ aluno.sobrenome }}">
                        </div>
                    </div>
                     <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="">Nome do integrante 1</label>
                            <input type="text" class="form-control" id="" name="nomei1" placeholder="" value="{{ aluno.ra }}">
                        </div>
                        <div class="form-group col-md-4">
                            <label for="">Nome do integrante 2</label>
                            <input type="text" class="form-control" id="" name="nomei2" placeholder="" value="{{ aluno.ra }}">
                        </div>
                          <div class="form-group col-md-4">
                            <label for="">Nome do integrante 3</label>
                            <input type="text" class="form-control" id="" name="nomei3" placeholder="" value="{{ aluno.ra }}">
                        </div>
                    </div>
                      <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="">Qual o problema que busca resolver?</label>
                            <input type="text" class="form-control" id="" name="p1" placeholder="" value="{{ aluno.ra }}">
                        </div>
                        <div class="form-group col-md-12">
                            <label for="">De que forma se pretende solucionar esse problema? O que há de novo nessa solução? Por que você decidiu focar nessa solução?</label>
                            <input type="text" class="form-control" id="" name="p2" placeholder="" value="{{ aluno.ra }}">
                        </div>
                          <div class="form-group col-md-12">
                            <label for="">Quais são os potenciais usuários ou clientes para o seu negócio e Qual é o tamanho do mercado que você busca atingir com a criação de um negócio a partir deste seu projeto?</label>
                            <input type="text" class="form-control" id="" name="p3" placeholder="" value="{{ aluno.ra }}">
                        </div>
                          <div class="form-group col-md-12">
                            <label for="">Quem são seus potenciais concorrentes, e/ou quem pode se tornar seu concorrente ao longo do desenvolvimento do seu modelo de negócio?</label>
                            <input type="text" class="form-control" id="" name="p4" placeholder="" value="{{ aluno.ra }}">
                        </div>
                    </div>
               
                    </div>
                    </div> 
                </div>
            </div>
        </section>
        <!--/ cursos-->
                <link
            href="<%=request.getContextPath()%>/res/fonts/font-awesome/font-awesome.min.css"
            rel="stylesheet"
            type="text/css"
            />
        <link
            href="<%=request.getContextPath()%>/res/styles/style-default.css"
            rel="stylesheet"
            type="text/css"
            />
        <link
            href="<%=request.getContextPath()%>/res/styles/style-pages.css"
            rel="stylesheet"
            type="text/css"
            />

        <!-- Scripts -->
        <%@include file="../WEB-INF/jspf/body_scripts.jspf" %>
        <script src="<%= request.getContextPath()%>/res/scripts/angular/angular.min.js"></script>
        <!-- Bootstrap JS -->
        <script src="<%=request.getContextPath()%>/res/scripts/jquery.easing.min.js"></script>
        <!-- Bootstrap.js está junto do jquery.min.js -->
        <script src="<%=request.getContextPath()%>/res/scripts/custom.js"></script>
        <%--<%@include
        file="<%=request.getContextPath()%>WEB-INF/jspf/restrict/schedule/warningEvent.jspf"
        %>--%> <%--<%@include
        file="<%=request.getContextPath()%>/WEB-INF/jspf/restrict/schedule/confirm-sent.jspf"
        %>--%>
    </body>
</html>
