package DataBase;

/**
 *
 * @author Douglas
 */
public class Function {
    
    public static String ClauseSQL(Boolean bWhere) {
        if (!bWhere) {
            return " WHERE ";
        } else {
            return " AND ";
        }
    }    
    
}
