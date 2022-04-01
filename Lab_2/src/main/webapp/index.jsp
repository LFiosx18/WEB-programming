<%@ page import="bean.lab2.entities.Coordinate" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="css/mainstyle.css" type="text/css">
        <link rel="stylesheet" href="css/tabstyle.css" type="text/css">
        <title>ЛР_2</title>
	</head>

	<body>
    <table>
        <thead>
        <tr class="laba"><td colspan="3"><p>Лабораторная работа №2</p></td></tr>
        <tr class="stud">
            <td class="name"><p>Курносова Ирина</p></td>
            <td><p>P3231</p></td>
            <td><p>Вариант: 77537</p></td>
        </tr>
        </thead>
    </table>
    <div class="canv">
    <canvas id="graph"></canvas>

    <form id="form" class='decor' name="form" method="POST" action="controller">
        <div class="form-left-decoration"></div>
        <div class="form-right-decoration"></div>
        <div class="circle"></div>
        <div class="form-inner">
            <h3>Введите значения</h3>
            <input name="text" id="x_input" type="text" onblur="test()" placeholder="Enter X (-5..3)">
            <select class="sel" id="y_input" size="1" name="Y">
                <option disabled selected value="">Choose Y</option>
                <option value="-4">-4</option>
                <option value="-3">-3</option>
                <option value="-2">-2</option>
                <option value="-1">-1</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

            <div>
                <input value="1" type="radio" name="radius" id="r1">
                <label for="r1">1</label>
                <input value="1.5" type="radio" name="radius" id="r2">
                <label for="r2">1.5</label>
                <input value="2" type="radio" name="radius" id="r3">
                <label for="r3">2</label>
                <input value="2.5" type="radio" name="radius" id="r4">
                <label for="r4">2.5</label>
                <input value="3" type="radio" name="radius" id="r5">
                <label for="r5">3</label>
            </div>
            <div>
                <text id="x_error">
                    Не введена координата x
                </text> <br>
                <text id="y_error">
                    Не выбрана координата y
                </text> <br>
                <text id="r_error">
                </text> <br>
            </div>
            <button class="buttons" onclick="validation()">Отправить</button>
        </div>
    </form>
    </div>


    <table class="result">
        <thead class="res">
        <tr>
            <td><p>Координата X</p></td>
            <td><p>Координата Y</p></td>
            <td><p>Радиус R</p></td>
            <td><p>Факт попадания</p></td>
        </tr>
        </thead>
        <tbody>
            <%
                ArrayList<Coordinate> listSession = (ArrayList<Coordinate>) request.getSession().getAttribute("sessionList");
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
    <script>
        <% if (request.getSession().isNew()){ %>
        sessionStorage.setItem("json",null)
        <%}%>
    </script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script type="text/javascript" src="js/table.js"></script>
    <script type="text/javascript" src="js/src.js"></script>
    <script>
        <% if (request.getSession() == null){ %>
        arrayOfCoordsFromServer = []
        clearArea()
        draw()
        <%}%>
    </script>
    </body>
</html>