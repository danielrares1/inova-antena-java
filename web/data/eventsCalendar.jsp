<%@page import="org.json.simple.JSONArray"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="java.io.IOException"%>
<%@page import="java.io.FileWriter"%>
<%@page import="java.security.MessageDigest"%>
<%@page import="javax.naming.NamingException"%>
<%@page import="javax.sql.DataSource"%>
<%@page import="javax.naming.InitialContext"%>
<%@page import="javax.naming.Context"%>
<%@page import="java.sql.*"%>
<%@page import="java.sql.Date"%>
<%@page import="java.text.SimpleDateFormat"%>

<%@ page language="java" contentType="application/json; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>

<%
    Date data = new Date(System.currentTimeMillis()); 
    SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
    
    Statement stmt = null;
    ResultSet rs = null;
    Connection con = null;
    
    try {
        Context initContext = new InitialContext();
        Context envContext  = (Context)initContext.lookup("java:/comp/env");
        DataSource ds = (DataSource)envContext.lookup("jdbc/AntenaCPS");
        con = ds.getConnection();
        stmt = con.createStatement();
        rs = stmt.executeQuery("select titulo from atividades");
        try{
            JSONObject file = new JSONObject();
            JSONArray list = new JSONArray();
            while (rs.next()) {
                String titulo = rs.getString(1);
                JSONObject obj = new JSONObject();
                obj.put("title", titulo);
                obj.put("textColor", "white");
                obj.put("start", formatDate.format(data));
                obj.put("end", formatDate.format(data));
                obj.put("url", "http://www.inovapaulasouza.cps.sp.gov.br/event-schedule.jsp?event=1"+0);
                list.add(obj);
            }
            file.put("events", list);
            out.println(list.toJSONString());
        } catch ( Exception e ) {
            System.out.println(e.getMessage());
        }
    } catch (Exception e) {
        System.out.println(e.getMessage());
    }
%>
