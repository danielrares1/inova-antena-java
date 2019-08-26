/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.gov.sp.cps.antena.pool;

import java.io.IOException;
import java.io.PrintWriter;

import java.sql.*;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

/**
 *
 * @author daniel.rares
 */
public class ConnectionPool extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
           Context ctx = null;
            Statement stmt = null;
            ResultSet rs = null;
            Connection con = null;
            
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
         
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet NewServlet</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet NewServlet at " + request.getContextPath() + "</h1>");
               try {
            Context initContext = new InitialContext();
            Context envContext  = (Context)initContext.lookup("java:/comp/env");
            DataSource ds = (DataSource)envContext.lookup("jdbc/AntenaCPS");
            con = ds.getConnection();
            out.println("<H3>"+"Conectou!"+"</H3>");
            stmt = con.createStatement();
            rs = stmt.executeQuery("select id_geral, nome from parceiros order by id_geral");
            response.setContentType("text/html");
            out.print("<html><body><h2>Detalhes parceiro</h2>");
            out.print("<table border=\"1\" cellspacing=10 cellpadding=5>");
            out.print("<th>Parceiro - ID</th>");
            out.print("<th>Parcerio - Nome</th>");
            
            while(rs.next())
            {
                out.print("<tr>");
                out.print("<td>" + rs.getInt("id_geral") + "</td>");
                out.print("<td>" + rs.getString("nome") + "</td>");
                out.print("</tr>");
            }
            out.print("</table></body><br/>");
            } catch ( SQLException | NamingException e){
            out.println("<h2>"+e.getMessage()+"</h2>");
            } finally {
                try{con.close();
                    out.println("<h2>Fechou conexão</h2>");
                } catch (SQLException | NullPointerException e) {
                    out.println("<h2>"+e.getMessage()+"</h2>");}
                try{stmt.close();
                    out.println("<h2>Fechou statement</h2>");
                } catch (SQLException | NullPointerException e) {
                    out.println("<h2>"+e.getMessage()+"</h2>");
                }
            }
                  
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
