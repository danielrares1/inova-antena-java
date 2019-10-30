<%-- Document : escola Created on : February 16, 2019, 4:28:54 PM Author :
Daniel --%> <%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <script scr="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></script> 


        <title>Escola de Inovadores</title>
        <meta name="description" content="Agenda Inova Paula Souza" />
    </head>

    <body class="" style="">
        <link href="/res/fonts/font-awesome/font-awesome.min.css" rel="stylesheet" type="text/css">
        <link href="/res/styles/style-default.css" rel="stylesheet" type="text/css">
        <link href="/res/styles/style-pages.css" rel="stylesheet" type="text/css">

        <!-- Scripts -->



        <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="https://apis.google.com/js/platform.js" async="" defer="" gapi_processed="true"></script>
        <script defer="" src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="/res/scripts/angular/angular.min.js"></script>
        <!-- Bootstrap JS -->
        <script src="/res/scripts/jquery.easing.min.js"></script>
        <!-- Bootstrap.js está junto do jquery.min.js -->
        <script src="/res/scripts/custom.js"></script>


        <!--/ Navigation bar-->
        <nav class="navbar navbar-light bg-light fixed-top" style="">
            <a href=""><img id="logo" src="/res/images/antena_logo.png" alt="logo" style="width: 15rem;"></a>
        </nav>
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
                                <a href="#sobre" class="mouse-hover"><svg class="svg-inline--fa fa-angle-down fa-w-10" data-wow-delay="1.2s" aria-hidden="true" data-prefix="fa" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg><!-- <strong class="fa fa-angle-down " data-wow-delay="1.2s"></strong> --></a>
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
                                <hr class="bottom-line2">
                            </div>
                            <p>
                                Cursos de extensão com o objetivo de viabilizar modelos de
                                negócio e start-ups.
                            </p>
                            <div style="text-align: center;">
                                <a style="min-width: fit-content;max-width: max-content;margin-left: 18%;margin-top: 0!important;margin-bottom: 5px!important;" title="Formulário de Cadastro (Inovadores)" href="" id="openModal" data-toggle="modal" data-target="#modalEscola" target="_blank" class="btn btn-primary"><span>Formulário de Cadastro para <strong>TODAS</strong> as escolas de Inovadores</span></a><br>
                            </div>
                        </div>
                    </div>
                </div>
                <br><br>

                <div class="row" id="escolas">
                    <div class="col-md-4">
                        <a href="escola-araraquara.jsp"><img src="/res/images/escola/araraquara.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-araçatuba.jsp"><img src="/res/images/escola/araçatuba.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-americana.jsp"><img src="/res/images/escola/americana.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-assis.jsp"><img src="/res/images/escola/assis.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-bebedouro.jsp"><img src="/res/images/escola/bebedouro.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-botucatu.jsp"><img src="/res/images/escola/botucatu1.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-campinas.jsp"><img src="/res/images/escola/campinas.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-campo-limpo.jsp"><img src="/res/images/escola/campo-limpo.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-capao-bonito.jsp"><img src="/res/images/escola/capao-bonito.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-cubatao.jsp"><img src="/res/images/escola/cubatao.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-embu.jsp"><img src="/res/images/escola/embu.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-ferraz-vasconcelos.jsp"><img src="/res/images/escola/ferraz-vasconcelos.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-franca.jsp"><img src="/res/images/escola/franca.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-franco-da-rocha.jsp"><img src="/res/images/escola/franco-da-rocha.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-guaratingueta.jsp"><img src="/res/images/escola/guaratingueta.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-ibitinga.jsp"><img src="/res/images/escola/ibitinga.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-indaiatuba.jsp"><img src="/res/images/escola/indaiatuba.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-itu.jsp"><img src="/res/images/escola/itu.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-jaboticabal.jsp"><img src="/res/images/escola/jaboticabal.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-jahu.jsp"><img src="/res/images/escola/jahu.png" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-lins.jsp"><img src="/res/images/escola/lins.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-lorena.jsp"><img src="/res/images/escola/lorena.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-marilia.jsp"><img src="/res/images/escola/marilia.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-mogi-cruzes.jsp"><img src="/res/images/escola/mogi-cruzes.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-maua.jsp"><img src="/res/images/escola/maua.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-osasco.jsp"><img src="/res/images/escola/osasco.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-osvaldo-cruz.jsp"><img src="/res/images/escola/osvaldo-cruz.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-ourinhos.jsp"><img src="/res/images/escola/ourinhos.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-palmital.jsp"><img src="/res/images/escola/palmital.png" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-pinda.jsp"><img src="/res/images/escola/pinda.jpg" alt=""></a>
                    </div>

                    <div class="col-md-4">
                        <a href="escola-pompeia.jsp"><img src="/res/images/escola/pompeia.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-ribeirao-preto.jsp"><img src="/res/images/escola/ribeirao-preto.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-rio-preto.jsp"><img src="/res/images/escola/rio-preto.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-santana-parnaiba.jsp"><img src="/res/images/escola/santana-parnaiba.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-sao-jose-campos.jsp"><img src="/res/images/escola/sao-jose-campos.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-saoroque.jsp"><img src="/res/images/escola/sao-roque.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-sao-paulo.jsp"><img src="/res/images/escola/sao-paulo.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-sorocaba.jsp"><img src="/res/images/escola/sorocaba.jpeg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-taquaritinga.jsp"><img src="/res/images/escola/taquaritinga.jpg" alt=""></a>
                    </div>
                    <div class="col-md-4">
                        <a href="escola-tatui.jsp"><img src="/res/images/escola/tatui.jpg" alt=""></a>
                        <form action="../data/inovadores.jsp">
                            <div class="modal fade" id="modalEscola" tabindex="-1" role="dialog" aria-labelledby="modalProfileLabe" data-backdrop="static" data-keyboard="false" aria-hidden="true" style="display: none;">
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

                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                    <label for="">Endereço de e-mail</label>
                                                    <input type="email" class="form-control" id="emailInovador" name="emailInovador" placeholder="" value="">
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label for="">Nome do Proponente</label>
                                                    <input type="text" class="form-control" id="nomeInovador" name="nomeInovador" placeholder="" value="">
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                    <label for="">RG nº</label>
                                                    <input type="text" class="form-control" id="raInovador" name="raInovador" placeholder="" value="">
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label for="">CPF nº</label>
                                                    <input type="text" class="form-control" id="cpfInovador" name="cpfInovador" placeholder="" value="">
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                    <label for="">Data de Nascimento</label>
                                                    <input type="text" class="form-control" id="dataInovador" name="dataInovador" placeholder="" value="">
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label for="">Formação</label>
                                                    <input type="text" class="form-control" id="formacaoInovador" name="formacaoInovador" placeholder="" value="">
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                    <label for="">Endereço</label>
                                                    <input type="text" class="form-control" id="endInovador" name="endInovador" placeholder="" value="">
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label for="">Bairro</label>
                                                    <input type="text" class="form-control" id="bairroInovador" name="bairroInovador" placeholder="" value="">
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                    <label for="">Complemento</label>
                                                    <input type="text" class="form-control" id="complInovador" name="complInovador" placeholder="" value="">
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label for="">Número</label>
                                                    <input type="text" class="form-control" id="numInovador" name="numInovador" placeholder="" value="">
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                    <label for="">CEP</label>
                                                    <input type="text" class="form-control" id="cepInovador" name="cepInovador" placeholder="" value="">
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label for="">Cidade</label>
                                                    <input type="text" class="form-control" id="cidadeInovador" name="cidadeInovador" placeholder="" value="">
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                    <label for="">UF</label>
                                                    <input type="text" class="form-control" id="ufInovador" name="ufInovador" placeholder="" value="">
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label for="">Telefone ( )</label>
                                                    <input type="text" class="form-control" id="telInovador" name="telInovador" placeholder="" value="">
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                    <label for="">Celular ( )</label>
                                                    <input type="text" class="form-control" id="" name="celInovador" placeholder="" value="">
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label for="">Aluno é proveniente da?</label>
                                                    <select id="" class="form-control" name="localidadeInovador">
                                                        <option selected="">ETEC</option>
                                                        <option selected="">FATEC</option>
                                                        <option selected="">COMUNIDADE</option>
                                                    </select>
                                                </div>
                                                <div style="text-align: center;">
                                                    <a style="min-width: fit-content;max-width: max-content;margin-left: 18%;margin-top: 0!important;margin-bottom: 5px!important;" title="nextpage" href="" id="openModal" data-toggle="modal" data-target="#modalProjeto1" target="_blank" class="btn btn-primary"><span>Próxima página</span></a><br>

                                                </div>
                                            </div> 

                                        </div>
                                    </div>
                                </div>
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
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                    <label for="">Título do Projeto</label>
                                                    <input type="text" class="form-control" id="tituloInovador" name="tituloInovador" placeholder="" value="">
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label for="">Origem do Projeto</label>
                                                    <input type="text" class="form-control" id="origemInovador" name="origemInovador" placeholder="" value="">
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-4">
                                                    <label for="">Nome do integrante 1</label>
                                                    <input type="text" class="form-control" id="integranteInovador" name="integranteInovador" placeholder="" value="">
                                                </div>
                                                <div class="form-group col-md-4">
                                                    <label for="">Nome do integrante 2</label>
                                                    <input type="text" class="form-control" id="integrantedoisInovador" name="integrantedoisInovador" placeholder="" value="">
                                                </div>
                                                <div class="form-group col-md-4">
                                                    <label for="">Nome do integrante 3</label>
                                                    <input type="text" class="form-control" id="integrantetresInovador" name="integrantetresInovador" placeholder="" value="">
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-12">
                                                    <label for="">Qual o problema que busca resolver?</label>
                                                    <input type="text" class="form-control" id="problemaInovador" name="problemaInovador" placeholder="" value="">
                                                </div>
                                                <div class="form-group col-md-12">
                                                    <label for="">De que forma se pretende solucionar esse problema? O que há de novo nessa solução? Por que você decidiu focar nessa solução?</label>
                                                    <input type="text" class="form-control" id="solucaoInovador" name="solucaoInovador" placeholder="" value="">
                                                </div>
                                                <div class="form-group col-md-12">
                                                    <label for="">Quais são os potenciais usuários ou clientes para o seu negócio e Qual é o tamanho do mercado que você busca atingir com a criação de um negócio a partir deste seu projeto?</label>
                                                    <input type="text" class="form-control" id="clientesInovador" name="clientesInovador" placeholder="" value="">
                                                </div>
                                                <div class="form-group col-md-12">
                                                    <label for="">Quem são seus potenciais concorrentes, e/ou quem pode se tornar seu concorrente ao longo do desenvolvimento do seu modelo de negócio?</label>
                                                    <input type="text" class="form-control" id="concorrentesInovador" name="concorrentesInovador" placeholder="" value="">
                                                    <br>
                                                    <div class="form-group">
                                                        <label for="exampleFormControlFile1">Insira seu PDF</label>
                                                        <input type="file" class="form-control-file" id="exampleFormControlFile1">

                                                        <button type="submit" class="btn btn-primary" style="margin-top: 20px;">Enviar!</button>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </form>


                    </div></div></div></section>
        <!--/ cursos-->



    </body>
</html>
