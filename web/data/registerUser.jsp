<%@page import="java.security.MessageDigest"%>
<%@page import="javax.naming.NamingException"%>
<%@page import="javax.sql.DataSource"%>
<%@page import="javax.naming.InitialContext"%>
<%@page import="javax.naming.Context"%>
<%@page import="java.sql.*"%>
<%
    Statement stmt = null;
    ResultSet rs = null;
    Connection con = null;
   
    String emailRegister = request.getParameter("emailRegister");
    String passwordRegister = request.getParameter("passwordRegister");
    String firstName = request.getParameter("firstName");
    String lastName = request.getParameter("lastName");
    String nivel = request.getParameter("nivel");
     
    try {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte messageDigest[] = md.digest(passwordRegister.getBytes("UTF-8"));

        StringBuilder sb = new StringBuilder();

        for (byte b : messageDigest) {
            sb.append(String.format("%02X", 0xFF & b));
        }

        String senhaHex = sb.toString();
            
        Context initContext = new InitialContext();
        Context envContext  = (Context)initContext.lookup("java:/comp/env");
        DataSource ds = (DataSource)envContext.lookup("jdbc/AntenaCPS");
        con = ds.getConnection();
        stmt = con.createStatement();
        stmt.executeQuery("insert into parceiros (nivel, nome, sobrenome, email, senha) values ('" + nivel
            + "', '" + firstName + "', '" + lastName + "', '" + emailRegister + "', '" + senhaHex + "')");
    } catch ( SQLException | NamingException e){
        out.println("<h2>"+e.getMessage()+"</h2>");
    } finally {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte messageDigest[] = md.digest(passwordRegister.getBytes("UTF-8"));

            StringBuilder sb = new StringBuilder();

            for (byte b : messageDigest) {
                sb.append(String.format("%02X", 0xFF & b));
            }

            String senhaHex = sb.toString();
            rs = stmt.executeQuery("select nome, sobrenome from parceiros where email = '" +
                emailRegister + "' and senha = '" + senhaHex + "'");
        
            if (rs.next()) {
                try {
                    session.setAttribute("email", emailRegister);
                    session.setAttribute("nome", firstName);
                    session.setAttribute("sobrenome", lastName);
                } catch ( Exception e ) {
                    out.println("<h2>"+e.getMessage()+"</h2>");
                } finally {
                    response.sendRedirect("../restrict/user/user.jsp");
                }
            }
        } catch (SQLException | NullPointerException e) {
            out.println("<h2>"+e.getMessage()+"</h2>");}      
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