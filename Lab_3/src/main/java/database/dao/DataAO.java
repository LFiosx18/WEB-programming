package database.dao;

import database.hibernate.HibernateSessionFactory;
import entity.Result;
import lombok.Data;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import java.util.List;

@Data
public class DataAO {

    private EntityManagerFactory managerFactory;

    public DataAO(){
        managerFactory = HibernateSessionFactory.getManagerFactory();
    }

    public void initializeTable(){
        EntityManager entityManager = managerFactory.createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        try{
            transaction.begin();
            entityManager.createNativeQuery("CREATE SEQUENCE IF NOT EXISTS Result_id START 1");
            entityManager.createNativeQuery("CREATE TABLE IF NOT EXISTS Result (" +
                    "id int PRIMARY KEY," +
                    "x float NOT NULL," +
                    "y float NOT NULL," +
                    "r float NOT NULL,"+
                    "currentTime varchar(255) NOT NULL," +
                    "executionTime bigint NOT NULL," +
                    "result boolean"
                    +")");
            transaction.commit();
        } catch (Exception exception){
            try {
                System.err.println("Error on init table.");
                exception.printStackTrace();
                transaction.rollback();
            } catch (Exception e){
                e.printStackTrace();
            }
        }
        entityManager.close();
    }

    public List<Result> getShots(){
        EntityManager entityManager = managerFactory.createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        List<Result> result = null;
        try {
            transaction.begin();
            result = entityManager.createQuery("FROM Result").getResultList();
            transaction.commit();
        } catch (Exception exception){
            try {
                System.err.println("Error in get shots");
                exception.printStackTrace();
                transaction.rollback();
            } catch (Exception e){
                e.printStackTrace();
            }
        }
        entityManager.close();
        return result;
    }

    public void addShot(Result shot){
        EntityManager entityManager = managerFactory.createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        try{
            transaction.begin();
            entityManager.persist(shot);
            transaction.commit();
        } catch(Exception exception){
            try {
                System.err.println("Error in add shot.");
                exception.printStackTrace();
                transaction.rollback();
            } catch (Exception e){
                e.printStackTrace();
            }
        }
    }
}
