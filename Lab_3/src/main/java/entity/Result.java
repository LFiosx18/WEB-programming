package entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="Results")
@Data
public class Result {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "next_result_id")
    private int id;

    @Column(name="x")
    private Float x;

    @Column(name="y")
    private Float y;

    @Column(name="r")
    private Float r;

    @Column(name="curtime")
    private String currentTime;

    @Column(name="extime")
    private long executeTime;

    @Column(name="result")
    private boolean result;
}
