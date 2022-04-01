package beans;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import java.io.Serializable;
import java.time.ZonedDateTime;

@Named("timeBean")
@ApplicationScoped
public class TimeBean implements Serializable {

    private String day;
    private String month;
    private String year;
    private String hour;
    private String min;
    private String sec;

    private String rightFormat(int val){
        String newVal = String.valueOf(val);
        if (newVal.length() < 2){
            newVal = "0" + newVal;
        }
        return newVal;
    }

    public String getDay() {
        return rightFormat(ZonedDateTime.now().getDayOfMonth());
    }

    public String getMonth() {
        return rightFormat(ZonedDateTime.now().getMonthValue());
    }

    public String getYear() {
        return rightFormat(ZonedDateTime.now().getYear());
    }

    public String getHour() {
        return rightFormat(ZonedDateTime.now().getHour());
    }

    public String getMin() {
        return rightFormat(ZonedDateTime.now().getMinute());
    }

    public String getSec() {
        return rightFormat(ZonedDateTime.now().getSecond());
    }
}
