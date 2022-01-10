package bean.lab2.entities;

public class Validator {
    public static boolean validate(Coordinate coordinate) {
        if (-5 < coordinate.getX() && coordinate.getX() < 3
                && (coordinate.getR() == 1 || coordinate.getR() == 1.5 || coordinate.getR() == 2 || coordinate.getR() == 2.5 || coordinate.getR() == 3)
                && (coordinate.getY() == -4 || coordinate.getY() == -3 || coordinate.getY() == -2 || coordinate.getY() == -1 || coordinate.getY() == 0 || coordinate.getY() == 1
                || coordinate.getY() == 2 || coordinate.getY() == 3 || coordinate.getY() == 4 )) {
            return true;
        }else {
            return false;
        }
    }
}
