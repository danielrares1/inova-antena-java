
<%@page import="org.apache.tomcat.util.http.fileupload.FileItemStream"%>
<%@page import="org.apache.tomcat.util.http.fileupload.FileItemIterator"%>
<%@page import="org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload"%>
<%@page import="javax.naming.NamingException"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="javax.naming.InitialContext"%>
<%@page import="javax.sql.DataSource"%>
<%@page import="javax.naming.Context"%>
<%@ page import="org.apache.commons.fileupload.*,
         org.apache.commons.io.*,
         org.apache.commons.fileupload.servlet.*,
         org.apache.commons.fileupload.disk.*,
         java.io.*,
         java.util.Iterator,
         java.util.regex.Pattern" %>
<%
    Statement stmt = null;
    ResultSet rs = null;
    Connection con = null;

// This pattern is used to get the basename of a filename
    final Pattern basenamePattern = Pattern.compile("^.*[/\\\\]");

// Check that we have a file upload request
    boolean isMultipart = ServletFileUpload.isMultipartContent(request);

// if not, send to message page with the error message
    if (!isMultipart) {
        request.setAttribute("msg", "Request was not multipart!");
        request.getRequestDispatcher("dialog.jsp").forward(request, response);
        return;
    }

    String uploadPath = System.getProperty("os.name").matches("Windows.*")
            ? "C:\\Guesa\\" : "/tmp/uploads/";

    ServletFileUpload upload = new ServletFileUpload();

    FileItemIterator iter = upload.getItemIterator(request);

    while (iter.hasNext()) {
        FileItemStream item = iter.next();
        InputStream stream = item.openStream();
        if (!item.isFormField()) {
            String fileName = item.getName();
            String uploadedFile = uploadPath + basenamePattern.matcher(fileName).replaceFirst("");

            IOUtils.copy(stream, new FileOutputStream(uploadedFile));

            Context initContext = new InitialContext();
            Context envContext = (Context) initContext.lookup("java:/comp/env");
            DataSource ds = (DataSource) envContext.lookup("jdbc/AntenaCPS");
            con = ds.getConnection();
            stmt = con.createStatement();

            stmt.executeQuery("insert into proposta_projeto values (1 , pg_read_file('" + uploadedFile + "')::bytea);");
            request.setAttribute("msg", "Uploaded '" + fileName + "' to '" + uploadedFile + " - - - - - ");
//            insert into my_table(bytea_data) select bytea_import(uploadedFile);
//                request.setAttribute("msg", uploadedFile);
        }
    }

    // finally send to the msg page
    request.getRequestDispatcher("../dialogSucc.jsp").forward(request, response);

%>
