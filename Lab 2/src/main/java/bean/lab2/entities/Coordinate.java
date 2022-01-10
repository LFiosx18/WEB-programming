package bean.lab2.entities;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter @Setter
public class Coordinate implements Serializable {
    private double x;
    private int y;
    private double r;
    private String isHit;

    public Coordinate(double x, int y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
}
