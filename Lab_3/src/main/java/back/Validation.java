package back;

import beans.HitBean;

import java.io.Serializable;

public class Validation implements IValidation, Serializable {
    @Override
    public Float validateX(String x) {
        Float doubleX = null;
        try {
            doubleX = Float.parseFloat(x);
            if (doubleX > 3 || doubleX < -3) {
                doubleX = null;
                HitBean.errorX = new data.Error("Поле должно быть от -3 до 3");
            }
        } catch (NumberFormatException exception) {
            HitBean.errorX = new data.Error("Поле X должно быть числом!");
        } catch (NullPointerException exception) {
            HitBean.errorX = new data.Error("Поле X не введено");
        }
        if (doubleX != null) {
            HitBean.errorX = new data.Error("");
        }
        return doubleX;
    }

    @Override
    public Float validateY(String y) {
        Float intY = null;
        try {
            intY = Float.parseFloat(y);
            if (intY <= 5 && intY >= -5) {
                HitBean.errorY = new data.Error("");
                return intY;
            }
            else {
                HitBean.errorY = new data.Error("Ошибка валидации Y");
                return null;
            }
        } catch (Exception exception) {
            HitBean.errorY = new data.Error("Ошибка валидации Y");
            return null;
        }
    }

    @Override
    public Float validateR(String r) {
        Float intR = null;
        try {
            intR = Float.parseFloat(r);
            if (intR <= 5 && intR >= -5) {
                HitBean.errorR = new data.Error("");
                return intR;
            } else {
                HitBean.errorR = new data.Error("Ошибка валидации R");
                return null;
            }
        } catch (Exception exception) {
            HitBean.errorR = new data.Error("Ошибка валидации R");
            return null;
        }
    }
}
