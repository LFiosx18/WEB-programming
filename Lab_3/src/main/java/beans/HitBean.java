package beans;

import back.CheckArea;
import back.Validation;
import database.dao.DataAO;
import entity.Result;
import data.Error;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

@Named("hitBean")
@ApplicationScoped
public class HitBean implements Serializable {
    private final Validation validation;
    private final CheckArea checkArea;
    private final DataAO dataAO;


    public HitBean(){
        validation = new Validation();
        checkArea = new CheckArea();
        dataAO = new DataAO();
        dataAO.initializeTable();
        x = 0f;
    }

    private Float x;
    private String y;
    private String r;

    public static Error errorX = new Error("");
    public static Error errorY = new Error("");
    public static Error errorR = new Error("");

    private boolean correctX = false;
    private boolean correctY = false;
    private boolean correctR = false;

    public void submit(){
        long start = System.nanoTime();

        Float numericalX = validation.validateX(x.toString());
        Float numericalY = validation.validateY(y);
        Float numericalR = validation.validateR(r);

        correctX = (numericalX != null);
        correctY = (numericalY != null);
        correctR = (numericalR != null);

        if (correctX && correctY && correctR){
            Result shot = new Result();
            shot.setX(numericalX.floatValue());
            shot.setY(numericalY.floatValue());
            shot.setR(numericalR.floatValue());
            shot.setCurrentTime(new SimpleDateFormat("HH:mm:ss dd.MM.yyyy").format(Calendar.getInstance().getTime()));
            shot.setExecuteTime((System.nanoTime() - start)/1000);
            shot.setResult(checkArea.hit(numericalX, numericalY, numericalR));
            dataAO.addShot(shot);
        } 
    }

    public List<Result> getHistory(){
        return  dataAO.getShots();
    }


    public Float getX() {
        return x;
    }

    public void setX(Float x) {
        this.x = x;
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y;
    }

    public String getR() {
        return r;
    }

    public void setR(String r) {
        this.r = r;
    }

    public boolean getCorrectX() {
        return correctX;
    }

    public boolean getCorrectY() {
        return correctY;
    }

    public Object getErrorR() {
        return errorR;
    }

    public Object getErrorY() {
        return errorY;
    }

    public Object getErrorX() {
        return errorX;
    }
}
