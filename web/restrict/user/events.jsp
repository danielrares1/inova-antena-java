<%@page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="java.io.IOException"%>
<%@page import="java.io.FileWriter"%>
<%@page import="java.security.MessageDigest"%>
<%@page import="javax.naming.NamingException"%>
<%@page import="javax.sql.DataSource"%>
<%@page import="javax.naming.InitialContext"%>
<%@page import="javax.naming.Context"%>
<%@page import="java.sql.*"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" charset="ISO-8859-1">
        <title>Eventos - Antena CPS</title>
        <link rel="shortcut icon" href="<%=request.getContextPath()%>/res/images/favicon.ico" />

        <!-- CSS -->
        <link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/res/styles/styles_profile.css">

        <link href='https://use.fontawesome.com/releases/v5.0.6/css/all.css' rel='stylesheet'/>
        <link href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' rel='stylesheet'/>
        
        <link href='<%=request.getContextPath()%>/res/fullcalendar/core/main.css' rel='stylesheet'/>
        <link href='<%=request.getContextPath()%>/res/fullcalendar/daygrid/main.css' rel='stylesheet'/>
        <link href='<%=request.getContextPath()%>/res/fullcalendar/list/main.css' rel='stylesheet'/>
        <link href='<%=request.getContextPath()%>/res/fullcalendar/timegrid/main.css' rel='stylesheet'/>
        <link href='<%=request.getContextPath()%>/res/fullcalendar/bootstrap/main.css' rel='stylesheet'/>
        <script src='<%=request.getContextPath()%>/res/fullcalendar/core/main.js'></script>
        <script src='<%=request.getContextPath()%>/res/fullcalendar/daygrid/main.js'></script>
        <script src="<%=request.getContextPath()%>/res/fullcalendar/list/main.js"></script>
        <script src="<%=request.getContextPath()%>/res/fullcalendar/timegrid/main.js"></script>
        <script src="<%=request.getContextPath()%>/res/fullcalendar/bootstrap/main.js"></script>
        <script src="https://unpkg.com/popper.js"></script>
        <script src="https://unpkg.com/tooltip.js"></script>
      
        <script type="text/javascript">
            document.addEventListener('DOMContentLoaded', function() {
                var calendarEl = document.getElementById('calendar');

                var calendar = new FullCalendar.Calendar(calendarEl, {
                    plugins: [ 'dayGrid', 'timeGrid', 'list', 'bootstrap' ],
                    themeSystem: 'bootstrap',
                    buttonText: { today: 'Hoje' },
                    timeZone: 'UTC',
                    locale: 'br',
                    header: { left: 'today', center: 'title', right: 'prev,next' },
                    eventLimit: true,
                    eventColor: '#D9230F',
                    eventLimitText: 'eventos',
                    
                    events: <jsp:include page="../../data/eventsCalendar.jsp"/>,
                    eventRender: function(info) {
                        new Tooltip(info.el, {
                            title: info.event.title + " - Clique e saiba mais!",
                            placement: 'left',
                            trigger: 'hover',
                            container: 'body'
                        });
                    },
                    eventClick: function(info) {
                        info.jsEvent.preventDefault(); // don't let the browser navigate

                        if (info.event.url) {
                          window.open(info.event.url);
                        }
                    }
                });

                calendar.render();
            });
        </script>
        <%@include file="../../WEB-INF/jspf/head_references.jspf" %>
    </head>
    <style>
        ::first-letter {
            text-transform: capitalize;
        }
        
        .fc-center {
            color: white;
        }
        
        .table-bordered {
            background: whitesmoke;
        }
        
        .fc-day-grid-event {
            margin: 5px 0;
        }
        
        .card-body {
            padding: 0;
        }
        
        .card {
            top: -20rem!important;
            left: 32%!important;
        }
        
        .tooltip-inner {
            color: black;
            background-color: white;
            border-radius: 1rem;
        }

        .popper,
        .tooltip {
          position: absolute;
          z-index: 9999;
          background: #D9230F;
          color: black;
          width: 150px;
          border-radius: 1rem;
          box-shadow: 0 0 2px rgba(0,0,0,0.5);
          padding: 5px;
          text-align: center;
          opacity: 1; 
        }
        .style5 .tooltip {
          background: #1E252B;
          color: #FFFFFF;
          max-width: 200px;
          width: auto;
          font-size: .8rem;
          padding: .5em 1em;
        }
        .popper .popper__arrow,
        .tooltip .tooltip-arrow {
          width: 0;
          height: 0;
          border-style: solid;
          position: absolute;
          margin: 5px;
        }

        .tooltip .tooltip-arrow,
        .popper .popper__arrow {
          border-color: #D9230F;
        }
        .style5 .tooltip .tooltip-arrow {
          border-color: #1E252B;
        }
        .popper[x-placement^="top"],
        .tooltip[x-placement^="top"] {
          margin-bottom: 5px;
        }
        .popper[x-placement^="top"] .popper__arrow,
        .tooltip[x-placement^="top"] .tooltip-arrow {
          border-width: 5px 5px 0 5px;
          border-left-color: transparent;
          border-right-color: transparent;
          border-bottom-color: transparent;
          bottom: -5px;
          left: calc(50% - 5px);
          margin-top: 0;
          margin-bottom: 0;
        }
        .popper[x-placement^="bottom"],
        .tooltip[x-placement^="bottom"] {
          margin-top: 5px;
        }
        .tooltip[x-placement^="bottom"] .tooltip-arrow,
        .popper[x-placement^="bottom"] .popper__arrow {
          border-width: 0 5px 5px 5px;
          border-left-color: transparent;
          border-right-color: transparent;
          border-top-color: transparent;
          top: -5px;
          left: calc(50% - 5px);
          margin-top: 0;
          margin-bottom: 0;
        }
        .tooltip[x-placement^="right"],
        .popper[x-placement^="right"] {
          margin-left: 5px;
        }
        .popper[x-placement^="right"] .popper__arrow,
        .tooltip[x-placement^="right"] .tooltip-arrow {
          border-width: 5px 5px 5px 0;
          border-left-color: transparent;
          border-top-color: transparent;
          border-bottom-color: transparent;
          left: -5px;
          top: calc(50% - 5px);
          margin-left: 0;
          margin-right: 0;
        }
        .popper[x-placement^="left"],
        .tooltip[x-placement^="left"] {
          margin-right: 5px;
        }
        .popper[x-placement^="left"] .popper__arrow,
        .tooltip[x-placement^="left"] .tooltip-arrow {
          border-width: 5px 0 5px 5px;
          border-top-color: transparent;
          border-right-color: transparent;
          border-bottom-color: transparent;
          right: -5px;
          top: calc(50% - 5px);
          margin-left: 0;
          margin-right: 0;
        }
    </style>
    <body class="background" id="border">
        <!-- Header Profile -->
        <%@include file="../../WEB-INF/jspf/header.jspf"%>
        <div style="display: flex; justify-content: center; margin: 5rem 0;">
            <div id="calendar" style="width: 600px;"></div>
        </div>
        <%@include file="../../WEB-INF/jspf/body_scripts.jspf" %>
        <!-- Footer -->
        <%@include file="../../WEB-INF/jspf/footer.jspf" %>
    </body>
</html>
