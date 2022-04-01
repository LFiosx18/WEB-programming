package bean.lab2.entities;

import java.util.ArrayList;

public class Converter {
    public static String toJson(ArrayList<Coordinate> list){
        StringBuilder ans = new StringBuilder("[");
        for (int i = 0; i < list.size() - 1; i++){
            Coordinate coordinate = list.get(i);
            ans.append("{ \"x\":").append(coordinate.getX()).append(", \"y\":").append(coordinate.getY()).append(", \"r\":").append(coordinate.getR()).append(", \"isNew\":").append("\"").append(coordinate.getIsHit()).append("\"").append("},");
        }
        Coordinate coordinate = list.get(list.size() - 1);
            ans.append("{ \"x\":").append(coordinate.getX()).append(", \"y\":").append(coordinate.getY()).append(", \"r\":").append(coordinate.getR()).append(", \"isNew\":").append("\"").append(coordinate.getIsHit()).append("\"").append("}]");
        return String.valueOf(ans);
    }
}
