<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <body>
        <%
            String msg = (String) request.getAttribute("msg");
            if (msg != null) {
                out.println("<p><font size=+1>" + msg + "</font></p>");
            }
        %>
        <p>Click <a href="structure/escola.jsp">here</a> to go to back.</p>
    </body>
</html>