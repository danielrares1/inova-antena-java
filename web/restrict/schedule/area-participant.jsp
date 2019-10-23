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
         
         <br/><br/>         <br/><br/>

        <div class="container">
            <div class="text-center">
                <div class="text-border">
                    <h1 style="color: #fcfcfc">ÁREA ALUNO</h1>
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
                          <a href="#request-event"  onclick="eventoption('request-event')" data-toggle="tab" class="list-group-item">Eventos disponíveis <i style="margin-left:  22%" class="material-icons">calendar_today </i> </a>
			  <a href="#confirmed-event" data-toggle="tab" onclick="eventoption('confirmed-event')" class="list-group-item">Eventos inscritos  <i style="margin-left:  31%" class="material-icons">assistant </i>  </a>
			  <a href="#last-events" data-toggle="tab" onclick="eventoption('last-events')" class="list-group-item">Eventos que participei<i style="margin-left:  15%" class="material-icons">how_to_reg </i>  </a>
			  <a href="#material-event"  data-toggle="tab" onclick="eventoption('material-event')" class="list-group-item">Materiais disponíveis <i style="margin-left:  17%" class="material-icons">folder_open </i> </a>
                          <a href="#evaluation-event"  data-toggle="tab" onclick="eventoption('evaluation-event')" class="list-group-item">Avaliações <i style="margin-left:  52%" class="material-icons">star_border </i> <!-- <span class="float-right badge badge-light round">0</span> -->  </a>
                                    </div>
                                </div>
                    </div>    
                </div> 
                
                <div class="col-md-9" >
                    <div class="card" >
                          <div class="tab-pane fade in active" id="request-event" >
                              <h2 class="text-center" style="margin-top: 2%">EVENTOS DÍSPONÍVEIS </h2> <hr>
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
                                <br/><br/><br/><br/>
                        <p><b> *A inscrição estará disponível até uma hora antes do evento. </b></p>
                        <table class="table table-bordered" style="margin-right: 10%">
                            <thead>
                                <tr>
                                    <th style="width:15%;">Evento</th>
                                    <th style="width:25%;">Título</th>
                                    <th style="width:25%;">Unidade</th>
                                    <th style="width:15%;">Data</th>
                                    <th style="width:10%;" >Vagas</th>
                                    <th>Inscrição*</th>
                                </tr>
                                
                            </thead>
                        </table>
                              </div>     
                        </div>
                       
                        
                        
                        
                        
                        
                        
                        
                        <div class="tab-pane fade" id="confirmed-event" style="margin-top: " >
                            <h2 class="text-center" style="margin-top: 2%">EVENTOS INSCRITOS</h2> <hr>
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
                        
                        
                        
                        <div class="tab-pane fade" id="last-events" style="margin-top: ">
                            <h2 class="text-center" style="margin-top: 2%">EVENTOS QUE PARTICIPEI</h2> <hr>
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
                        <div class="tab-pane fade" id="material-event" style="margin-top: ">
                            <h2 class="text-center" style="margin-top: 2%">MATERIAIS DISPOINÍVEIS</h2> <hr>
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
                        <div class="tab-pane fade" id="evaluation-event" style="margin-top: ">
                            <h2 class="text-center" style="margin-top: 2%">AVALIAÇÕES</h2> <hr>
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
         
        
        
        <%@include file="../../WEB-INF/jspf/footer.jspf"%>
        
        <%@include file="../../WEB-INF/jspf/body_scripts.jspf" %>
        
        <script>
            var opt1 =  document.getElementById("request-event");
            
            var opt2 = document.getElementById("confirmed-event");
            
            var opt3 = document.getElementById("last-events");
            
            var opt4 = document.getElementById("material-event");
            
            var opt5 = document.getElementById("evaluation-event");
            
                opt1.style.display = "none";
                opt2.style.display = "none";
                opt3.style.display = "none";
                opt4.style.display = "none";
                opt5.style.display = "none";
            
            function eventoption(opt) {
                if (opt == 'request-event') {
                    opt1.style.display = "block";
                    opt2.style.display = "none";
                    opt3.style.display = "none";
                    opt4.style.display = "none";
                    opt5.style.display = "none";
                }
                else if (opt == 'confirmed-event') {
                    opt2.style.display = "block";
                    opt1.style.display = "none";
                    opt3.style.display = "none";
                    opt4.style.display = "none";
                    opt5.style.display = "none";
                }
                else if (opt == 'last-events') {
                    opt3.style.display = "block"; 
                    opt2.style.display = "none";
                    opt1.style.display = "none";
                    opt4.style.display = "none";
                    opt5.style.display = "none";
                }
                else if (opt == 'material-event') {
                    opt4.style.display = "block";
                    opt2.style.display = "none";
                    opt3.style.display = "none";
                    opt1.style.display = "none";
                    opt5.style.display = "none";
                }
                else {
                    opt5.style.display = "block"; 
                    opt2.style.display = "none";
                    opt3.style.display = "none";
                    opt4.style.display = "none";
                    opt1.style.display = "none";
            }
            
    }
    

        </script>
    </body>
</html>
