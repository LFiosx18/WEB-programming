package back;

import java.io.Serializable;

public class CheckArea implements ICheckArea, Serializable {
    @Override
    public boolean hit(Float x, Float y, Float r) {
        if (y >= 0){
            if (x >= 0){
                return (x*x + y*y < (r/2) * (r/2));
            } else {
                return false;
            }
        } else {
            if (x >= 0) {
                return (y > (x/2) - (r/2));
            } else {
                return (x >= -r && y >= -r);
            }
        }
    }
}
