<%@page import="javax.naming.NamingException"%>
<%@page import="java.sql.SQLException"%>
<%@page import="javax.naming.InitialContext"%>
<%@page import="javax.sql.DataSource"%>
<%@page import="javax.naming.Context"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%
    Statement stmt = null;
        ResultSet rs = null;
        Connection con = null;
        
        String typeRegister = request.getParameter("typeParameter");
        String titleRegister = request.getParameter("titleRegister");
        String descriptionRegister = request.getParameter("descriptionRegister");
        int durationRegister = Integer.parseInt(request.getParameter("durationRegister"));
        
        
        try {
       
        Context initContext = new InitialContext();
        Context envContext  = (Context)initContext.lookup("java:/comp/env");
        DataSource ds = (DataSource)envContext.lookup("jdbc/AntenaCPS");
        con = ds.getConnection();
        stmt = con.createStatement();
        rs = stmt.executeQuery("insert into atividade (id, titulo, descricao, tipo, duracao, banner, id_agente, id_eixo, id_parceiro) "
                + "values (2, '"+titleRegister+"', '" + descriptionRegister + "', 'Palestra', '"+durationRegister+"', 'teste', 1, 1, 1)");
        
        } catch ( SQLException | NamingException e ) {
                            // out.println("<h2>"+e.getMessage()+"</h2>");
        } finally {
            
            response.sendRedirect("../restrict/schedule/area-manager.jsp");
            System.out.print(titleRegister);
            System.out.print(descriptionRegister);
            System.out.print(durationRegister);
            System.out.print("Passou!");
            
            try {
            con.close();
        } catch (SQLException | NullPointerException e) {
            out.println("<h2>"+e.getMessage()+"</h2>");}
        try {
            stmt.close();
        } catch (SQLException | NullPointerException e) {
            out.println("<h2>"+e.getMessage()+"</h2>");
        }
        }
        
        
        %>