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
                    <h1 style="color: #fcfcfc">AGENDA</h1>
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
			  <a href="#request-event"  data-toggle="tab" class="list-group-item">Eventos disponíveis <span class="float-right badge badge-light round">0</span> </a>
			  <a href="#confirmed-event" data-toggle="tab" class="list-group-item">Eventos que estou inscrito  <span class="float-right badge badge-light round">0</span>  </a>
			  <a href="#last-events" data-toggle="tab" class="list-group-item">Eventos que participei<span class="float-right badge badge-light round">0</span>  </a>
			  <a href="#" class="list-group-item">Materiais disponíveis <span class="float-right badge badge-light round">0</span>  </a>
                          <a href="#" class="list-group-item">Avaliações <span class="float-right badge badge-light round">0</span>  </a>
                                    </div>
                                </div>
                    </div>    
                </div>                
                <div class="col-md-9" >
                    <div class="card" >
                          <div class="tab-pane fade in active" id="request-event" >
                            <h1 class="text-center">DIV1</h1>
                        </div>
                        <div class="tab-pane fade" id="confirmed-event" style="margin-top: -56px;" >
                            <h1 class="text-center">teste 2</h1>
                        </div>
                        <div class="tab-pane fade" id="last-events" style="margin-top: -56px;">
                            <h1 class="text-center">teste 3</h1>
                        </div>
                    </div>
                </div>
            
            </div>
        </div> 
         
        
        <%@include file="../../WEB-INF/jspf/footer.jspf"%>
        
        <%@include file="../../WEB-INF/jspf/body_scripts.jspf" %>
    </body>
</html>
