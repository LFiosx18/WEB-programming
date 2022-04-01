<%@ page import="bean.lab2.entities.Coordinate" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="bean.lab2.entities.Converter" %>
<%--
  Created by IntelliJ IDEA.
  User: golan
  Date: 18.11.2021
  Time: 3:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<% ArrayList<Coordinate> listSession = (ArrayList<Coordinate>) request.getSession().getAttribute("sessionList"); %>
<%String jsonString = Converter.toJson(listSession);%>
<html>
<head>
    <link rel="stylesheet" href="css/tabstyle.css" type="text/css">
    <title>Table</title>
</head>
<body>
    <table class="tab">
        <thead class="head">
            <tr>
                <td>Координата X</td>
                <td>Координата Y</td>
                <td>Радиус R</td>
                <td>Факт попадания</td>
            </tr>
        </thead>
        <tbody>
            <%
                if (listSession != null){
                    for (Coordinate coordinate: listSession){ %>
                        <tr>
                            <td><%= coordinate.getX()%></td>
                            <td><%= coordinate.getY()%></td>
                            <td><%= coordinate.getR()%></td>
                            <td class = <%= coordinate.getIsHit()%>> <%= coordinate.getIsHit()%> </td>
                        </tr>
            <%}}%>
        </tbody>
    </table>
    <a href="index.jsp">Вернуться на главную</a>
    <script>
        let json = '<%=jsonString%>'
    </script>
    <script type="text/javascript" src="js/table.js"></script>
</body>
</html>
