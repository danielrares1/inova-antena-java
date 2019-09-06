<%@page import="javax.naming.NamingException"%>
<%@page import="javax.sql.DataSource"%>
<%@page import="javax.naming.InitialContext"%>
<%@page import="javax.naming.Context"%>
<%@page import="java.sql.*"%>
<%
    Statement stmt = null;
    ResultSet rs = null;
    Connection con = null;
    
    String email = request.getParameter("email");
    String password = request.getParameter("password");
    
    try {
        Context initContext = new InitialContext();
        Context envContext  = (Context)initContext.lookup("java:/comp/env");
        DataSource ds = (DataSource)envContext.lookup("jdbc/AntenaCPS");
        con = ds.getConnection();
        stmt = con.createStatement();
        rs = stmt.executeQuery("select nome, sobrenome from parceiros where email = '" +
                email + "' and senha = '" + password + "'");

        if (rs.next() && email!=null || password!=null || !email.isEmpty() || !password.isEmpty()) {
            try {
                String nome = rs.getString(1);
                String sobrenome = rs.getString(2);   
                session.setAttribute("email", email);
                session.setAttribute("nome", nome);
                session.setAttribute("sobrenome", sobrenome);
            } catch ( Exception e ) {
                out.println("<h2>"+e.getMessage()+"</h2>");
            } finally {
                response.sendRedirect("../restrict/user/user.jsp");
            }
        } else {
            response.sendRedirect("../home.jsp");
        }
        
    } catch ( SQLException | NamingException e){
        out.println("<h2>"+e.getMessage()+"</h2>");
    } finally {
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