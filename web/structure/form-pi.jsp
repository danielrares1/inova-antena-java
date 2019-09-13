<%-- 
    Document   : addInventor
    Created on : 04/11/2017 14:07
    Author     : Daniel
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
        <title>Formulário - Comunicação e Descrição de Invenção</title>
        <meta name="description" content="Contato - Inova Paula Souza">
        <meta name="keywords" content="patentes, marcas,empreendedorismo,redes tematicas,polos regionais,inovação">


        <link rel="stylesheet" type="text/css" href="../res/styles/bootstrap.min.css">
        <link href="../res/styles/style-default.css" rel="stylesheet" type="text/css"/>
        <link href="../res/styles/style-pages.css" rel="stylesheet" type="text/css"/>


        <!-- Fontes-->

        <link href="../res/fonts/font-awesome/font-awesome.min.css" rel="stylesheet" type="text/css"/>
       
       
    </head>

    <body >

        <!--/ Navigation bar-->
        <%@include file="../WEB-INF/jspf/header.jspf" %>
        <!--/ Navigation bar-->
        <!--teste-->
      
        
        
        
        
        
        <div class="container panel-form-pi">
            <div class="row">
                <div class="col-md-12">
                    <div class="content-form-pi">
                        <h3 align="center"><strong>Formulário de Comunicação e Descrição de Invenção</strong></h3><br/>
                        <form id="form-pi" method="post" action="" role="form">
                            <div class="content-form-pi">
                                <div class="col-md-10 col-md-offset-2">
                                    <div class="form-group">
                                        <fieldset>
                                            <legend>Informações Pessoais:</legend>
                                            <div class="row">
                                                <div class="col-md-10">

                                                    <label for="form_name">Nome Completo *</label>
                                                    <input id="form_name" type="text" name="name" class="form-control" required="required" data-error="Este campo é obrigatório">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">

                                                    <label for="form_cpf">CPF *</label>
                                                    <input id="form_cpf" type="text" name="cpf" class="form-control" required="required" data-error="Este campo é obrigatório">

                                                </div>
                                                <div class="col-md-4">

                                                    <label for="form_rg">Identidade N° *</label>
                                                    <input id="form_rg" type="text" name="rg" class="form-control" required="required" data-error="Este campo é obrigatório">

                                                </div>
                                                <div class="col-md-2">

                                                    <label for="orgao-exp">Órgão expedidor *</label>
                                                    <input id="orgao-exp" type="text" name="orgao-exp" class="form-control" required="required" data-error="Este campo é obrigatório">

                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-4">

                                                    <label for="form_nationality">Nacionalidade</label>
                                                    <input id="form_nationality" type="text" name="nationality" class="form-control" >

                                                </div>
                                                <div class="col-md-2">

                                                    <label for="sel1">Estado Civil:</label>
                                                    <select class="form-control" id="sel1">
                                                        <option>Solteiro (a)</option>
                                                        <option>Casado (a)</option>
                                                        <option>Divorciado (a)</option>
                                                        <option>Viúvo (a)</option>
                                                    </select>

                                                </div>
                                                <div class="col-md-4">

                                                    <label for="form_profession">Profissão</label>
                                                    <input id="form_profession" type="text" name="profission" class="form-control" >

                                                </div>

                                            </div>


                                            <div class="row">
                                                <div class="col-md-4">

                                                    <label for="form_email">Email *</label>
                                                    <input id="form_email" type="email" name="email" class="form-control"  required="required" data-error="Este campo é obrigatório">

                                                </div>
                                                <div class="col-md-2">

                                                    <label for="form_phone">Telefone</label>
                                                    <input id="form_phone"  maxlength="15" type="tel" name="phone" class="form-control" required>


                                                </div>
                                                <div class="col-md-2">

                                                    <label for="form_phone2">Celular *</label>
                                                    <input id="form_phone2" type="tel" name="phone2" class="form-control">


                                                </div>
                                                <div class="col-md-2">

                                                    <label for="form_phone3">Celular 2</label>
                                                    <input id="form_phone3" type="tel" name="phone3" class="form-control">


                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-2">


                                                    <label for="cep">CEP:*</label><br>
                                                    <input type="text" class="form-control " id="cep" name="cep" required>        

                                                </div>
                                                <div class="col-md-6"> 

                                                    <label for="rua">Endereço:*</label><br>
                                                    <input type="text" class="form-control " id="rua" name="rua" required>        

                                                </div>

                                                <div class="col-md-2">


                                                    <label for="number">Número:*</label><br/>
                                                    <input type="text" class="form-control " id="number" name="number" pattern="[0-9]" required>

                                                </div>
                                                
                                            </div>
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <label for="comple">Complemento:</label><br>
                                                    <input type="text" class="form-control " id="comple" name="complemento" >        

                                                </div>
                                                
                                                
                                                <div class="col-md-4">


                                                    <label for="bairro">Bairro:*</label><br/>
                                                    <input type="text" class="form-control " id="bairro" name="bairro" >

                                                </div>

                                                <div class="col-md-2">

                                                    <label for="cidade">Cidade:*</label><br/>
                                                    <input type="text" class="form-control " id="cidade" name="cidade">

                                                </div>   
                                                <div class="col-md-2">


                                                    <label for="uf">UF:*</label><br/>
                                                    <input type="text" name="uf" id="uf" class="form-control">
                                                    <%--
                                                    <select id="uf" class="form-control" name="uf" >
                                                        <option></option>
                                                        <option>AC</option>
                                                        <option>AL</option>
                                                        <option>AM</option>
                                                        <option>AP</option>
                                                        <option>BA</option>
                                                        <option>CE</option>
                                                        <option>DF</option>
                                                        <option>ES</option>
                                                        <option>GO</option>
                                                        <option>MA</option>
                                                        <option>MS</option>
                                                        <option>MT</option>
                                                        <option>PA</option>
                                                        <option>PB</option>
                                                        <option>PE</option>
                                                        <option>PI</option>
                                                        <option>PR</option>
                                                        <option>RJ</option>
                                                        <option>RN</option>
                                                        <option>RO</option>
                                                        <option>RR</option>
                                                        <option>RS</option>
                                                        <option>SC</option>
                                                        <option>SE</option>
                                                        <option>SP</option>
                                                        <option>TO</option>                               
                                                    </select>
                                                    --%>                                                    
                                                </div> 
                                            </div> 


                                        </fieldset>
                                        <!--A partir deste ponto algumas áreas só serão mostradas conforme as escolhas do usuário -->

                                        <div class="row">
                                            <fieldset>
                                                <legend>Informações de relação com o CPS: </legend>
                                            </fieldset>
                                            <h5>Possui algum Vínculo com o CPS? :</h5>

                                            <input id="vincYes" type="radio" name="cpsVinculo" value="true" > Sim.
                                            <input id="vincNo" type="radio" name="cpsVinculo" value="false" > Não.

                                        </div>
                                        <div class="row">
                                            <div id="collapseYes" class="panel-collapse collapse ">

                                                <h5>Você é aluno ou funcionário do CPS? :</h5>
                                                <input id="func" type="radio" name="cpsTip" value="1" > Funcionário.
                                                <input id="alun" type="radio" name="cpsTip" value="2" > Aluno.

                                            </div>
                                            <div id="collapseNo" class="panel-collapse collapse ">

                                                <div class="col-md-5" style="padding-left:0px;">

                                                    <h4> Participante Externo ao CPS:</h4>                                              

                                                    <h5> Instituição Externa:</h5>
                                                    <input type="radio" name="Inst_externa" value="1"> Pública
                                                    <input type="radio" name="Inst_externa" value="2"> Privada


                                                    <div><label for="form_name_inst">Nome da Instituição Externa:</label>
                                                        <input id="form_name_inst" type="text" name="inst-ext" class="form-control" ></div>
                                                    <h5 class="text-left" >ATENÇÃO:Sua inveção possui outros inventores além de você?</h5>
                                                    <input id="oInv1" type="radio" name="otherInvP" value="0"> Sim.
                                                    <input id="oInv2" type="radio" name="otherInvP" value="1"> Não.

                                                </div>
                                            </div>






                                            <div id="collapseFunc" class="panel-collapse collapse ">


                                                <h5>Qual o tipo de vínculo com CPS? :</h5>
                                                <input id="cF1" type="radio" name="cpsFunc" value="1" > Técnico-Administrativo.
                                                <input id="cF2" type="radio" name="cpsFunc" value="2"> Professor.
                                                <input id="cF3" type="radio" name="cpsFunc" value="3"> Outros. <br>



                                                <!--   Collapse dos id's cpsF1,cpsF2,cpsF3-->
                                                <div id="cpsOther" class=" collapse" >
                                                    <label for="form_vinculo">Tipo de vínculo</label>
                                                    <input id="form_vinculo" type="text" name="tipo-vinculo" class="form-control" >

                                                </div>        

                                                <div id="cpsProf" class=" collapse" >  

                                                    <label class="checkbox">Professor: </label>
                                                    <h5 class="text-left">Selecione a unidade onde ministra aulas:</h5>
                                                    <br>
                                                    <div class="col-md-5">

                                                        <label for="form_name_uni">Etec &zwnj;&zwnj;</label>
                                                        <select name="uni" class="form-control">
                                                            <option value="0"></option>
                                                            <option value="1">Etec/AMERICANA</option>                                                    
                                                            <option value="3">Etec/Barretos</option>
                                                        </select>

                                                        <label for="form_name_uni">Fatec</label>
                                                        <select name="uni" class="form-control">
                                                            <option value="0"></option>
                                                            <option value="2">Fatec/Americana</option>                                                    
                                                            <option value="4">Fatec/Barretos</option>
                                                        </select>


                                                    </div>
                                                </div>
                                                <br>
                                                <div class="col-md-10">
                                                    <h5 class="text-left" >ATENÇÃO:Sua inveção possui outros inventores além de você?</h5>
                                                    <input id="oInv1" type="radio" name="otherInvP" value="0"> Sim.
                                                    <input id="oInv2" type="radio" name="otherInvP" value="1"> Não.
                                                </div>
                                            </div>    
                                            <div id="collapseAlun" class="panel-collapse collapse">


                                                <h5 class="text-left">Selecione a unidade onde frequenta as aulas:</h5>
                                                <br>
                                                <div class="col-md-4">

                                                    <label for="form_name_uni">Unidades</label>
                                                    <select name="uni" class="form-control">
                                                        <option value="0"> </option>
                                                        <option value="1">Fatec/AMERICANA</option>
                                                        <option value="2">Etec/Americana</option>
                                                        <option value="3">Fatec/Barretos</option>
                                                        <option value="4">Etec/Barretos</option>
                                                    </select>
                                                    <label for="tipo-aluno-outro">Outro:</label>
                                                    <input id="tipo-aluno-outro" type="text" name="tipo-aluno" class="form-control" >
                                                </div>

                                                <div class="col-md-10">
                                                    <h5 class="text-left"> ATENÇÃO: Sua inveção possui outros inventores além de você?</h5>
                                                    <input id="oInv3" type="radio" name="otherInv" value="1"> Sim.
                                                    <input id="oInv4" type="radio" name="otherInv" value="0"> Não.
                                                </div>
                                            </div>

                                            <div id="collapseTab" class="table-responsive collapse" style="width:75%; overflow: auto">


                                                <table id="inventores" class="table" >
                                                    <tbody>
                                                        <tr>

                                                            <th>Nome do Inventor</th>
                                                            <th>RG</th>
                                                            <th>CPF</th>
                                                            <th>Ação</th>

                                                        </tr>
                                                        <tr style="display:none">

                                                            <td>Today Muller</td>
                                                            <td>45454545454</td>
                                                            <td>99999999999</td>
                                                            <td>Excluir Alterar</td>
                                                        </tr>
                                                        <tr >

                                                            <td>Example</td>
                                                            <td>ex:88888888x</td>
                                                            <td>ex:99999999999</td>
                                                            <td><img src="../res/images/icons/ic_delete_forever_black_24dp_2x.png" alt="delete" style="width:25%"></td>
                                                        </tr>


                                                    </tbody>


                                                    <tr>
                                                        <td><button class="btn-primary " data-target="#addInventor" data-toggle="modal" >Adicionar Inventor</button></td>
                                                    <tr>

                                                </table>

                                                <hr class="divider-form">
                                            </div>
                                        </div>


                                        <div class="col-md-10" style="padding-left: 0px">
                                            <div class="row">
                                                <fieldset>
                                                    <legend>Informações sobre parcerias ou divulgação:</legend>
                                                </fieldset>

                                                <h5> Houve parceria para o desenvolvimento da tecnologia ou invenção?</h5>
                                                <input id="pcria" type="radio" name="parceria"> Sim.
                                                <input id="pcria2" type="radio" name="parceria"> Não.

                                                <div id="collapsePar" class="collapse">

                                                    <h5>Qual(is):</h5>

                                                    <div ><input type="checkbox" name="inst-ensino" value="" data-toggle="collapse" data-target="#form_inst" > Instituição de Ensino.
                                                        <input id="form_inst" type="text" name="inst-ensino" class="form-control collapse" ></div>
                                                    <div><input type="checkbox" name="centro-pesquisa" value="" data-toggle="collapse" data-target="#form_cent" > Centro de Pesquisa.
                                                        <input id="form_cent" type="text" name="centro-pesquisa" class="form-control collapse" ></div>
                                                    <div ><input type="checkbox" name="emp-privada" value="" data-toggle="collapse" data-target="#form_emp">Empresa Privada.
                                                        <input id="form_emp" type="text" name="emp-privada" class="form-control collapse" ></div>
                                                    <div ><input type="checkbox" name="outros-orgaos" value="" data-toggle="collapse" data-target="#form_outros_orgaos">Outros Órgãos Públicos.
                                                        <input id="form_outros_orgaos" type="text" name="orgão-público" class="form-control collapse" ></div>
                                                    <div ><input type="checkbox" name="outras-parcerias" value="" data-toggle="collapse" data-target="#form_outros">Outros.
                                                        <input id="form_outros" type="text" name="outras-parcerias" class="form-control collapse" ></div>

                                                    <label for="form_message">Descreva a natureza e o percentual da participação que tiveram no desenvolvimento da

                                                        tecnologia ou invenção cada um dos membros da equipe do CPS e Parceiros no

                                                        desenvolvimento da tecnologia ou invenção.</label>
                                                    <textarea id="form_message" name="message" class="form-control"  rows="4" required="required" data-error="Este campo é obrigatório."></textarea>

                                                </div>





                                                <h5>A invenção ou parte dela foi divulgada de alguma forma?</h5>
                                                <input id="dNo"  type="radio" name="divulgação" value=""> Não
                                                <input id="dArP" type="radio" name="divulgação" value=""> Artigo publicado
                                                <input id="dCon" type="radio" name="divulgação" value=""> Congresso
                                                <input id="dMo" type="radio" name="divulgação" value=""> Monografia, dissertação, tese
                                                <input id="dOm" type="radio" name="divulgação" value="" > Outros meios
                                                <div id="form_outros-meios"  class="collapse">
                                                    <input type="text" placeholder="Descreva aqui." class="form-control" name="message">                                                       
                                                </div>
                                                <div id="titleplub" class="collapse">
                                                    <div class="col-md-10"><label for="form_divul_titulo">Título da Publicação:</label>
                                                        <input id="form_divul_titulo" type="text" name="form_divul_titulo" class="form-control" ></div>
                                                    <div class="col-md-10"><label for="form_divul_date">Data de apresentação/submissão/publicação:</label>
                                                        <input id="form_divul_date" type="date" name="form_divul_date" class="form-control" ></div>
                                                </div>       


                                            </div>


                                            <div class="row">
                                                <fieldset>
                                                    <legend>Informações sobre a Invenção:</legend>
                                                </fieldset>


                                                <div ><label for="form_inven_titulo">Título prosposto para a Invenção:</label>
                                                    <input id="form_inven_titulo" type="text" name="invencao_titulo" class="form-control" ></div>
                                                <div ><label for="form_inven_key">Palavras chave relativas à Invenção (no mínimo cinco, em inglês e português):</label>
                                                    <input id="form_inven_key" type="text" name="invenção palavras chave" class="form-control" ></div>


                                                <div ><label for="form_inven_estad">Estado da Técnica (descreva as tecnologias similares, se existentes, e os problemas apresentados

                                                        pelas mesmas, enfatizando como a invenção proposta resolve estes pontos, demonstrando suas

                                                        vantagens):</label>
                                                    <input id="form_inven_estad" type="text" name="invenção estado tecnica" class="form-control" ></div>


                                                <h5>Aplicações da Tecnologia:</h5>
                                                <div ><label for="form_inven_titulo">a) Qual é a principal aplicação da tecnologia?</label>
                                                    <input id="form_inven_titulo" type="text" name="invencao_titulo" class="form-control" ></div>
                                                <div ><label for="form_inven_titulo">b) Descreva outras possíveis aplicações da tecnologia.</label>
                                                    <input id="form_inven_titulo" type="text" name="invencao_titulo" class="form-control" ></div>


                                            </div>
                                        </div>


                                        <div class="row">
                                            <div class="col-md-5  text-left">
                                                <p>* Campos obrigatórios</p>
                                            </div>
                                            <div class="col-md-2 col-md-offset-3  ">
                                                <input type="submit" class="btn-primary btn-contacts  " value="ENVIAR">
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>




            </div>
        </div>
        <%-- jQuery Load--%>
        <script src="../res/scripts/jquery-min.js"></script>
                
        <script src="../res/scripts/jquery.mask.js"></script>
        <script src="../res/scripts/formMask.js"></script>
        <!--<script src="../res/scripts/cepControl.js"></script>-->
        <script src="../res/scripts/formControl.js"></script>

        <!-- Bootstrap JS -->
        <script src="../res/scripts/jquery.easing.min.js"></script>
        <script src="../res/scripts/bootstrap.min.js"></script>
        <script src="../res/scripts/custom.js"></script>
        <%@include file="../WEB-INF/jspf/add_inventor.jspf" %>        
        <%--<%@include file="../WEB-INF/jspf/restrict/schedule/warningEvent.jspf" %>--%>
        <%--<%@include file="../WEB-INF/jspf/restrict/schedule/confirm-sent.jspf" %> --%>       
        <%@include file="../WEB-INF/jspf/footer.jspf" %>
        

    </body>
</html>
