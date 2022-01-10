package bean.lab2.servlets;

import bean.lab2.entities.Coordinate;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/checker")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ArrayList<Coordinate> list = (ArrayList<Coordinate>) req.getAttribute("list");
        list.forEach(this::checkArea);
        HttpSession session = req.getSession();
        ArrayList<Coordinate> listSession = (ArrayList<Coordinate>) session.getAttribute("sessionList");
        if (listSession == null){
            session.setAttribute("sessionList", list);
        } else {
            listSession.addAll(list);
            session.setAttribute("sessionList", listSession);
        }
        getServletContext().getRequestDispatcher("/table.jsp").forward(req, resp);
    }

    public void checkArea(Coordinate coordinate) {
        double x = coordinate.getX();
        int y = coordinate.getY();
        double r = coordinate.getR();
        if((x <= 0 && y >= 0 && Math.abs(x) <= r && y <= r && y <= x + r) ||
                (x >= 0 && y >= 0 && y <= r && x <= r/2) ||
                (x >= 0 && y <= 0 && x <= r/2 && Math.abs(y) <= r/2 && Math.pow(x, 2)+Math.pow(y, 2)<=Math.pow(r, 2)/4)) {
            coordinate.setIsHit("OK");
        }
        else {
            coordinate.setIsHit("neOK");
        }
    }
}
