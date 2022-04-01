<%@ page contentType="text/html;charset=UTF-8" language="java" isErrorPage="true" %>
<html>
<head>
    <% final String message = (String) request.getAttribute ("ERROR_TEXT");%>
    <title>Error page</title>
</head>
<body>

<h1>Ошибка в ведённых данных!</h1>
    <% if (message != null) {%>
        <%= message%>
    <%}%>
    <br>Вернитесь на <a href = "${pageContext.request.contextPath}/index.jsp">главную страницу</a> и введите корректные данные
</body>
</html>
