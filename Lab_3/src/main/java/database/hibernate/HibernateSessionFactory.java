package database.hibernate;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.HashMap;
import java.util.Map;


public class HibernateSessionFactory {
    private static EntityManagerFactory managerFactory = null;
        private static void initializeSession(){

            Map<String, String> preset = new HashMap<>();
            preset.put("javax.persistence.jdbc.user", System.getenv("LOGIN"));
            preset.put("javax.persistence.jdbc.password", System.getenv("PASSWORD"));

            try{
                managerFactory = Persistence.createEntityManagerFactory("StudsPU", preset);
            } catch (Exception exception){
                System.err.println("Connection failed. Helios settings will be added to preset.");
                try {
                    preset.put("javax.persistence.jdbc.url", "jdbc:oracle:thin:@localhost:1521:test");
                    managerFactory = Persistence.createEntityManagerFactory("StudsPU", preset);
                } catch (Exception exception1){
                    exception1.printStackTrace();
                }
            }
        }


    public static EntityManagerFactory getManagerFactory() {
        if (managerFactory == null){
            initializeSession();
        }
        return managerFactory;
    }
}
