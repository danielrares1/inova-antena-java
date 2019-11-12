<%@page import="org.json.simple.JSONObject"%>
<%@page import="java.io.IOException"%>
<%@page import="java.io.FileWriter"%>
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

    String email = request.getParameter("email");
    String password = request.getParameter("password");

    try {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte messageDigest[] = md.digest(password.getBytes("UTF-8"));

        StringBuilder sb = new StringBuilder();

        for (byte b : messageDigest) {
            sb.append(String.format("%02X", 0xFF & b));
        }

        String senhaHex = sb.toString();

        Context initContext = new InitialContext();
        Context envContext = (Context) initContext.lookup("java:/comp/env");
        DataSource ds = (DataSource) envContext.lookup("jdbc/AntenaCPS");
        con = ds.getConnection();
        stmt = con.createStatement();
        rs = stmt.executeQuery("select nome, sobrenome, nivel from parceiros where email = '"
                + email + "' and senha = '" + senhaHex + "'");

        if (rs.next() && email != null || senhaHex != null || !email.isEmpty() || !senhaHex.isEmpty()) {
            try {
                String nome = rs.getString(1);
                String sobrenome = rs.getString(2);
                String nivel = rs.getString(3);
                session.setAttribute("email", email);
                session.setAttribute("nome", nome);
                session.setAttribute("sobrenome", sobrenome);
                session.setAttribute("nivel", nivel);

            } catch (Exception e) {
                out.println("<h2>" + e.getMessage() + "</h2>");
            } finally {
                response.sendRedirect("../restrict/user/user.jsp");

                JSONObject obj = new JSONObject();

                obj.put("username", email);
                obj.put("password", senhaHex); 

                try {
                    FileWriter file = new FileWriter("C:\\Teeste\\data.json");
                    file.write(obj.toJSONString());
                    file.flush();
                    file.close();

                } catch (IOException e) {
                    e.printStackTrace();
                }

                System.out.println(obj);
            }
        } else {
            response.sendRedirect("../home.jsp");
        }

    } catch (SQLException | NamingException e) {
        out.println("<h2>" + e.getMessage() + "</h2>");
    } finally {
        try {
            con.close();
        } catch (SQLException | NullPointerException e) {
            out.println("<h2>" + e.getMessage() + "</h2>");
        }
        try {
            stmt.close();
        } catch (SQLException | NullPointerException e) {
            out.println("<h2>" + e.getMessage() + "</h2>");
        }
    }


%>