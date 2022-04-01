package bean.lab2.filters.filter;

import bean.lab2.entities.Coordinate;
import bean.lab2.entities.Validator;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;
import java.util.ArrayList;

@WebFilter("/controller")
public class CoordsFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("filtrating");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        try{
            double x = Double.parseDouble(request.getParameter("text"));
            String[] checkboxes = request.getParameterValues("Y");
            double r = Double.parseDouble(request.getParameter("radius"));
            if (checkboxes == null || checkboxes.length == 0){
                throw new Exception();
            }
            ArrayList<Coordinate> list = new ArrayList<>();
            for(String checkboxValue: checkboxes){
                Coordinate coordinate = new Coordinate(x, Integer.parseInt(checkboxValue), r);
                if(!Validator.validate(coordinate)){
                    throw new Exception();
                } else {
                    list.add(coordinate);
                    request.setAttribute("list", list);
                }
            }
        } catch (Exception e){
            request.setAttribute("error", "yeap");
            request.setAttribute("ERROR_TEXT", "Ошибка в валидации данных");
        } finally {
            filterChain.doFilter(request, response);
        }
    }
}
