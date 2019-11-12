<%@page import="org.json.simple.JSONObject"%>
<%@page import="java.io.IOException"%>
<%@page import="java.io.FileWriter"%>
<%@page import="java.security.MessageDigest"%>
<%@page import="javax.naming.NamingException"%>
<%@page import="javax.sql.DataSource"%>
<%@page import="javax.naming.InitialContext"%>
<%@page import="javax.naming.Context"%>
<%@page import="java.sql.*"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Area Agenda</title>
        
        <link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/res/styles/styles_profile.css">

        <%@include file="../../WEB-INF/jspf/head_references.jspf"%>
    </head>
    <body class="background" id="border">
         <%@include file="../../WEB-INF/jspf/header.jspf"%>
         
          <%
            String email = (String) session.getAttribute("email");
            String nome = (String) session.getAttribute("nome");
            String sobrenome = (String) session.getAttribute("sobrenome");
            String nivel = (String) session.getAttribute("nivel");
        %>
         
        <% /*
      try {
                int id = rs.getInt(1);
                String titulo = rs.getString(2);   
                String descricao = rs.getString(3);
                String tipo = rs.getString(4);
                int duracao = rs.getInt(5);
                
            } catch ( Exception e ) {
                out.println("<h2>"+e.getMessage()+"</h2>");
            } */
        %>
        
        
         <br/><br/>         <br/><br/>

        <div class="container">
            <div class="text-center">
                <div class="text-border">
                    <h1 style="color: #fcfcfc">ÁREA AGENDA</h1>
                </div>
            </div>
            <hr>   
        
            <div class="row">
                 
                <div class="col-md-3">
                    <div class="card">
                        <article class="card-group-item">
                            <header class="card-header text-center"><h3 class="title"> <%=nome%> <%=sobrenome%> </h3> <%=nivel%> </header>
                                <div class="filter-content">
                                    <div class="list-group list-group-flush">
                          <a href="#register-event"  onclick="eventoption('register-event')" data-toggle="tab" class="list-group-item">Cadastrar evento <i style="margin-left:  28%" class="material-icons">add </i> </a>
			  <a href="#sent-events" data-toggle="tab" onclick="eventoption('sent-events')" class="list-group-item">Eventos enviados  <i style="margin-left:  28%" class="material-icons">send </i>  </a>
			  <a href="#scheduled-events" data-toggle="tab" onclick="eventoption('scheduled-events')" class="list-group-item">Eventos agendados<i style="margin-left:  23%" class="material-icons">calendar_today</i>  </a>
			  <a href="#refused-events"  data-toggle="tab" onclick="eventoption('refused-events')" class="list-group-item">Eventos recusados <i style="margin-left:  24%" class="material-icons">block </i> </a>
                          <a href="#fulfilled-events"  data-toggle="tab" onclick="eventoption('fulfilled-events')" class="list-group-item">Eventos realizados <i style="margin-left:  25%" class="material-icons">done </i> <!-- <span class="float-right badge badge-light round">0</span> -->  </a>
                          <a href="#activity-history"  data-toggle="tab" onclick="eventoption('activity-history')" class="list-group-item">Histórico de atividades <i style="margin-left:  11%" class="material-icons">collections_bookmark </i> <!-- <span class="float-right badge badge-light round">0</span> -->  </a>
                                    </div>
                                </div>
                    </div>    
                </div> 
                
                <div class="col-md-9" >
                    <div class="card" >
                          <div class="tab-pane fade in active" id="register-event" >
                              <h2 class="text-center" style="margin-top: 2%">INFORMAÇÕES DA PALESTRA </h2> <hr>
                              <form action="../../data/registerEvent.jsp">
                              <div class="row" style="margin-left: 10%">
                                  
                                  <label> <b> Tipo de evento: </b> </label> 
                                  <input id="eventtype" name="typeRegister" type="text" class="form-control" disabled placeholder="Palestra">
                               
                                  
                                  <label> <b> Título da palestra: </b></label> <span style="color: red">*</span>
                                  <input id="eventtitle" name="titleRegister" type=text maxlength="100" class="form-control" >
                                  
                                  <label> <b> Descreva sua palestra: </b></label> <span style="color: red">*</span>
                                  <textarea id="eventdescription"  name="descriptionRegister" rows="6" maxlength="1024" class="form-control"> </textarea> 
                                  
                                  <div class="col-md-6" style="margin-top: 5%">
                                  <label> <b> Adicionar banner para a palestra: </b></label>  <span style="color: red">*</span>
                                  <input type="file" accept="image/png, image/jpeg, image/jpg"> 
                                  </div>
                                  <div class="col-md-3" style="margin-top: 5%">
                                    <label> <b> Duração: </b></label>  <span style="color: red">*</span> 
                                    <select name="durationRegister" title="Selecionar duração da palestra">
                                        <option value="" selected disabled>Selecione</option>
                                        <option value="50">50 min</option>
                                        <option value="100">1h40 min</option>
                                    </select>
                                  </div>   
                                 
                            </div>
                            <div class="row" style="margin-left: 10%; margin-top: 5%">  
                              <h4> Unidades: </h4>
                            </div>
                                  <div class="row" style="margin-left: 10%; margin-top: 2%">
                                            <div class="col-md-5">
                                                <label> Unidade </label>
                                                <select>
                                                    <option>Selecione</option>
                                                    <option>teste1</option>
                                                    <option>teste2</option>
                                                </select>
                                            </div>
                                        <div class="col-md-3">
                                                <label> Data </label>
                                                <input type="text">
                                        </div>
                                        <div class="col-md-2">
                                            <label> Hora </label>
                                            <input type="text">
                                        </div>
                                    
                                  </div>
                              
                              <div style="margin-left: 40%; margin-top: 2%; margin-bottom: 2%"> <button class="btn btn-primary" type="submit"> ENVIAR PROPOSTA</button></div>
                              </form>
                          </div>   
                        
                        
                        
                        
                        
                        <div class="tab-pane fade" id="sent-events" style="margin-top: " >
                            <h2 class="text-center" style="margin-top: 2%">PALESTRAS ENVIADAS</h2> <hr>
                                   <div class="row" style="margin-left: 10%">
                                      <div class="col-md-4">
                                  <label> <b> Pesquisar: </b> </label> 
                              <input type="text" maxlength="100" placeholder="Procurar..." title="Pesquisar por elemento da tabela.">
                                      </div> 
                                  <div class="col-md-2 ">
                              <label> <b> Filtrar por:</b></label>
                              <select title="Selecionar filtro da pesquisa.">
                                  <option value="" disabled>Selecione...</option>
                                  <option value="0" >Evento</option>
                                  <option value="1" >Título</option>
                                  <option value="2" >Unidade</option>
                              </select>
                                  </div>
                                  <div class="col-md-2 ">
                              <label> <b> Mostrar: </b> </label>
                              <select title="Selecionar o número de linhas da tabela.">
                                  <option value="" disabled>Selecione...</option>
                                  <option value="0" >20</option>
                                  <option value="1" >40</option>
                                  <option value="2" >60</option>
                              </select>
                                  </div> <br/><br/><br/><br/>
                        <p><b> *A anulação da incrição estará disponível até dois dias antes do evento. </b></p>  
                        <table class="table table-bordered" style="margin-right: 10%">
                            <thead>
                                <tr>
                                    <th style="width:25%;">Título</th>
                                    <th style="width:25%;">Data</th>
                                    <th style="width:25%;">Unidade</th>
                                    <th style="width:10%;">Vagas</th>
                                    <th>Inscrição*</th>
                                </tr>
                                
                            </thead>
                        </table>
                              </div>
                        </div>
                        
                        
                        
                        <div class="tab-pane fade" id="scheduled-events" style="margin-top: ">
                            <h2 class="text-center" style="margin-top: 2%">EVENTOS AGENDADOS</h2> <hr>
                                   <div class="row" style="margin-left: 10%">
                                      <div class="col-md-4">
                                  <label> <b> Pesquisar: </b> </label> 
                              <input type="text" maxlength="100" placeholder="Procurar..." title="Pesquisar por elemento da tabela.">
                                      </div> 
                                  <div class="col-md-2 ">
                              <label> <b> Filtrar por:</b></label>
                              <select title="Selecionar filtro da pesquisa.">
                                  <option value="" disabled>Selecione...</option>
                                  <option value="0" >Evento</option>
                                  <option value="1" >Título</option>
                                  <option value="2" >Unidade</option>
                              </select>
                                  </div>
                                  <div class="col-md-2 ">
                              <label> <b> Mostrar: </b> </label>
                              <select title="Selecionar o número de linhas da tabela.">
                                  <option value="" disabled>Selecione...</option>
                                  <option value="0" >20</option>
                                  <option value="1" >40</option>
                                  <option value="2" >60</option>
                              </select>
                                  </div> <br/><br/><br/><br/>
                                <table class="table table-bordered" style="margin-right: 10%">
                            <thead>
                                <tr>
                                    <th style="width:15%;">Evento</th>
                                    <th style="width:15%;">Título</th>
                                    <th style="width:15%;">Unidade</th>
                                    <th style="width:20%;">Avaliação</th>
                                    <th>Certificado</th>
                                </tr>
                                
                            </thead>
                        </table>           
                                       
                              </div>
                        </div>
                        <div class="tab-pane fade" id="refused-events" style="margin-top: ">
                            <h2 class="text-center" style="margin-top: 2%">PALESTRAS RECUSADAS</h2> <hr>
                                   <div class="row" style="margin-left: 10%">
                                      <div class="col-md-4">
                                  <label> <b> Pesquisar: </b> </label> 
                              <input type="text" maxlength="100" placeholder="Procurar..." title="Pesquisar por elemento da tabela.">
                                      </div> 
                                  <div class="col-md-2 ">
                              <label> <b> Filtrar por:</b></label>
                              <select title="Selecionar filtro da pesquisa.">
                                  <option value="" disabled>Selecione...</option>
                                  <option value="0" >Evento</option>
                                  <option value="1" >Título</option>
                                  <option value="2" >Unidade</option>
                              </select>
                                  </div>
                                  <div class="col-md-2 ">
                              <label> <b> Mostrar: </b> </label>
                              <select title="Selecionar o número de linhas da tabela.">
                                  <option value="" disabled>Selecione...</option>
                                  <option value="0" >20</option>
                                  <option value="1" >40</option>
                                  <option value="2" >60</option>
                              </select>
                                  </div> <br/> <br/> <br/> <br/>
                                  <table class="table table-bordered" style="margin-right: 10%">
                            <thead>
                                <tr>
                                    <th style="width:15%;">Evento</th>
                                    <th style="width:55%;">Título</th>
                                    <th>Material</th>
                                </tr>
                                
                            </thead>
                        </table>
                                                                                
                              </div>
                        </div>
                        <div class="tab-pane fade" id="fulfilled-events" style="margin-top: ">
                            <h2 class="text-center" style="margin-top: 2%">PALESTRAS QUE REALIZEI</h2> <hr>
                                   <div class="row" style="margin-left: 10%">
                                      <div class="col-md-4">
                                  <label> <b> Pesquisar: </b> </label> 
                              <input type="text" maxlength="100" placeholder="Procurar..." title="Pesquisar por elemento da tabela.">
                                      </div> 
                                  <div class="col-md-2 ">
                              <label> <b> Filtrar por:</b></label>
                              <select title="Selecionar filtro da pesquisa.">
                                  <option value="" disabled>Selecione...</option>
                                  <option value="0" >Evento</option>
                                  <option value="1" >Título</option>
                                  <option value="2" >Unidade</option>
                              </select>
                                  </div>
                                  <div class="col-md-2 ">
                              <label> <b> Mostrar: </b> </label>
                              <select title="Selecionar o número de linhas da tabela.">
                                  <option value="" disabled>Selecione...</option>
                                  <option value="0" >20</option>
                                  <option value="1" >40</option>
                                  <option value="2" >60</option>
                              </select>
                                  </div>
                                 <br/> <br/> <br/> <br/>
                                  <table class="table table-bordered" style="margin-right: 10%">
                            <thead>
                                <tr>
                                    <th style="width:10%;">Evento</th>
                                    <th style="width:25%;">Título</th>
                                    <th style="width:15%;">Data</th>
                                    <th style="width:20%;">Unidade</th>
                                    <th style="width:20%;">Avaliar</th>
                                </tr>
                                
                            </thead>
                        </table>                                               
                              </div>
                        </div>
                        
                        <div class="tab-pane fade" id="activity-history" style="margin-top: ">
                            <h2 class="text-center" style="margin-top: 2%">HISTÓRICOS DE ATIVIDADE</h2> <hr>
                                   <div class="row" style="margin-left: 10%">
                                      <div class="col-md-4">
                                  <label> <b> Pesquisar: </b> </label> 
                              <input type="text" maxlength="100" placeholder="Procurar..." title="Pesquisar por elemento da tabela.">
                                      </div> 
                                  <div class="col-md-2 ">
                              <label> <b> Filtrar por:</b></label>
                              <select title="Selecionar filtro da pesquisa.">
                                  <option value="" disabled>Selecione...</option>
                                  <option value="0" >Evento</option>
                                  <option value="1" >Título</option>
                                  <option value="2" >Unidade</option>
                              </select>
                                  </div>
                                  <div class="col-md-2 ">
                              <label> <b> Mostrar: </b> </label>
                              <select title="Selecionar o número de linhas da tabela.">
                                  <option value="" disabled>Selecione...</option>
                                  <option value="0" >20</option>
                                  <option value="1" >40</option>
                                  <option value="2" >60</option>
                              </select>
                                  </div>
                                 <br/> <br/> <br/> <br/>
                                  <table class="table table-bordered" style="margin-right: 10%">
                            <thead>
                                <tr>
                                    <th style="width:10%;">Evento</th>
                                    <th style="width:25%;">Título</th>
                                    <th style="width:15%;">Data</th>
                                    <th style="width:20%;">Unidade</th>
                                    <th style="width:20%;">Avaliar</th>
                                </tr>
                                
                            </thead>
                        </table>                                               
                              </div>
                        </div>
                        
                        
                        
                    </div>
                </div>
            
 
                                
            </div>
        </div> 
        </div>   
        
        
        <%@include file="../../WEB-INF/jspf/footer.jspf"%>
        
        <%@include file="../../WEB-INF/jspf/body_scripts.jspf" %>
        
        <script>
            var opt1 =  document.getElementById("register-event");
            
            var opt2 = document.getElementById("sent-events");
            
            var opt3 = document.getElementById("scheduled-events");
            
            var opt4 = document.getElementById("refused-events");
            
            var opt5 = document.getElementById("fulfilled-events");
            
            var opt6 = document.getElementById("activity-history");
                    
                opt1.style.display = "none";
                opt2.style.display = "none";
                opt3.style.display = "none";
                opt4.style.display = "none";
                opt5.style.display = "none";
            
            function eventoption(opt) {
                if (opt == 'register-event') {
                    opt1.style.display = "block";
                    opt2.style.display = "none";
                    opt3.style.display = "none";
                    opt4.style.display = "none";
                    opt5.style.display = "none";
                    opt6.style.display = "none";
                }
                else if (opt == 'sent-events') {
                    opt2.style.display = "block";
                    opt1.style.display = "none";
                    opt3.style.display = "none";
                    opt4.style.display = "none";
                    opt5.style.display = "none";
                    opt6.style.display = "none";
                }
                else if (opt == 'scheduled-events') {
                    opt3.style.display = "block"; 
                    opt2.style.display = "none";
                    opt1.style.display = "none";
                    opt4.style.display = "none";
                    opt5.style.display = "none";
                    opt6.style.display = "none";
                }
                else if (opt == 'refused-events') {
                    opt4.style.display = "block";
                    opt2.style.display = "none";
                    opt3.style.display = "none";
                    opt1.style.display = "none";
                    opt5.style.display = "none";
                    opt6.style.display = "none";
                }
                else if (opt == 'fulfilled-events') {
                    opt5.style.display = "block"; 
                    opt2.style.display = "none";
                    opt3.style.display = "none";
                    opt4.style.display = "none";
                    opt1.style.display = "none";
                    opt6.style.display = "none";
                    
            } else {
                    opt6.style.display = "block";
                    opt5.style.display = "none"; 
                    opt2.style.display = "none";
                    opt3.style.display = "none";
                    opt4.style.display = "none";
                    opt1.style.display = "none";
                    
            }
            
    }
    

        </script>
    </body>
</html>
