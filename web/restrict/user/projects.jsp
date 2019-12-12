<%@page import="javax.sql.DataSource"%>
<%@page import="javax.naming.InitialContext"%>
<%@page import="javax.naming.Context"%>
<%@page import="java.sql.*"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Projetos</title>
        <link rel="shortcut icon" href="<%=request.getContextPath()%>/res/images/favicon.ico" />
                
        <link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/res/styles/styles_profile.css">

        <%@include file="../../WEB-INF/jspf/head_references.jspf"%>
    </head>
    <body class="background" id="border">
    <%@include file="../../WEB-INF/jspf/header.jspf"%>
    <% 
                        Statement stmt = null;
        ResultSet rs = null;
        Connection con = null;
    
        try {
            Context initContext = new InitialContext();
            Context envContext  = (Context)initContext.lookup("java:/comp/env");
            DataSource ds = (DataSource)envContext.lookup("jdbc/AntenaCPS");
            con = ds.getConnection();
            stmt = con.createStatement();
            rs = stmt.executeQuery("select tipo, titulo from atividades");

            /*try{
                while(rs.next()) {
                    String titulo = rs.getString(1); 
                    System.out.println("titulo: " + titulo);
                }
            } catch ( Exception e ) {
                System.out.println(e.getMessage());
                //out.println("<h2>"+e.getMessage()+"</h2>");
            }*/
        } catch (Exception e) {
            System.out.println(e.getMessage());
            //out.println("<h2>"+e.getMessage()+"</h2>");
        }
    %>
  <br/><br/><br/>
     <div class="container">
       
    <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Avaliar</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="mile-tab" data-toggle="tab" href="#mile" role="tab" aria-controls="mile" aria-selected="false">mile</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
  </li>
</ul>
         <div class="card">
<div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div class="container">
            

                <table  class="table table-bordered" style="margin-right: 10%; margin-top: 1%">
                    <thead>
                        <tr>
                            <th> Nome do Projeto</th>
                            <th> Tipo</th>
                            <th> Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th>Projeto Teste</th>
                        <th>Agricultura</th>
                        <th> <button class="btn btn-primary">Detalhes</button>
<div class="vote">
<label>
    <input type="radio" id="cm_star" name="fb" value="1" />
    <i class="fa"></i>
</label>
<label>
    <input type="radio" id="cm_star"  name="fb" value="2" />
    <i class="fa"></i>
</label>
<label>
    <input type="radio" id="cm_star" name="fb" value="3" />
    <i class="fa"></i>
</label>
<label>
    <input type="radio" id="cm_star" name="fb" value="4" />
    <i class="fa"></i>
</label>
<label>
    <input type="radio" id="cm_star" name="fb" value="5" />
    <i class="fa"></i>
</label>
</div>
</th>
                        </tr>
                    </tbody>
                </table>

        </div>
        
    </div>
    <div class="tab-pane fade" id="mile" role="tabpanel" aria-labelledby="mile-tab"><button class="btn btn-danger">2</button></div>
    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"><button class="btn btn-dark">3</button></div>
</div>
         </div>
        
    </div>  
  
  <script type="text/javascript">
      $('.vote label i.fa').on('click mouseover',function(){
    // remove classe ativa de todas as estrelas
    $('.vote label i.fa').removeClass('active');
    // pegar o valor do input da estrela clicada
    var val = $(this).prev('input').val();
    //percorrer todas as estrelas
    $('.vote label i.fa').each(function(){
        /* checar de o valor clicado é menor ou igual do input atual
        *  se sim, adicionar classe active
        */
        var $input = $(this).prev('input');
        if($input.val() <= val){
            $(this).addClass('active');
        }
    });
    $("#voto").html(val); // somente para teste
});
//Ao sair da div vote
$('.vote').mouseleave(function(){
    //pegar o valor clicado
    var val = $(this).find('input:checked').val();
    //se nenhum foi clicado remover classe de todos
    if(val == undefined ){
        $('.vote label i.fa').removeClass('active');
    } else { 
        //percorrer todas as estrelas
        $('.vote label i.fa').each(function(){
            /* Testar o input atual do laço com o valor clicado
            *  se maior, remover classe, senão adicionar classe
            */
            var $input = $(this).prev('input');
            if($input.val() > val){
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        });
    }
    $("#voto").html(val); // somente para teste
});
  </script>
      
    <br/><br/><br/>
    <%@include file="../../WEB-INF/jspf/body_scripts.jspf" %>
    
    <%@include file="../../WEB-INF/jspf/footer.jspf"%>
    </body>
</html>