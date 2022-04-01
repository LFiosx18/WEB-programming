package data;

import java.io.Serializable;


public class Data implements Serializable {
    private double x;
    private double y;
    private double r;
    private String currentTime;
    private long duration;
    private boolean result;

    public Data(){
    }

    public Data(double x, double y, double r, String currentTime, long duration, boolean result){
        this.x = x;
        this.y = y;
        this.r = r;
        this.currentTime = currentTime;
        this.duration = duration;
        this.result = result;
    }


    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public void setCurrentTime(String currentTime) {
        this.currentTime = currentTime;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }
}
