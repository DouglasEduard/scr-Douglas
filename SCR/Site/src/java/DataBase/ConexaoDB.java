package DataBase;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


import java.sql.Connection;
import java.sql.Statement;
import java.sql.DriverManager;

/**
 *
 * @author Douglas
 */
public class ConexaoDB {

    private String _DriveName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    private String _url = "jdbc:sqlserver://";
    private String _serverName = "localhost/DOUGLAS";
    private String _databaseName = "SCR";
    private String _userName = "sa";
    private String _password = "17vt17";
        
    public ConexaoDB() {
    
        this._url = "jdbc:sqlserver://";
        this._serverName = "LOCALHOST\\DOUGLAS:1433";
        this._databaseName = "SupplyMe";
        this._userName = "sa";
        this._password = "scr2014";
     
    };
    
    public ConexaoDB(String url, String servername, String databaseName, String userName, String password) {
    
        this._DriveName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
        this._url = url;
        this._serverName = servername;
        this._databaseName = databaseName;
        this._userName = userName;
        this._password = password;
     
    };
    
    public  Connection CriarConexao(String err[]) {
    
        String urlConexao = this._url + this._serverName + ";"  
                + "databaseName=" + this._databaseName + ";" 
                + "user=" + this._userName + ";"  
                + "password=" + this._password + ";";
        
        
        try {           
             Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
           
             // Abre a conexão
             Connection Conexao = DriverManager.getConnection(urlConexao);
            
           return Conexao;
           
         }
         catch (Exception ex) {
            err[0] =  ex.getMessage();   
            return null;
         }
    };
    
    public String ExecutarComando(String comando) {
      
        String[] Err = new String[1];
        Err[0] = "";
            
         try {
            
            Connection Conexao = CriarConexao(Err);

            if (!Err[0].equals(""))
                return Err[0];
            
            Statement Comando = Conexao.createStatement();
            
            Comando.executeUpdate(comando);

            //Fechando a instrução e a conexão
            Comando.close();
            Conexao.close();
            
            return "Ok";
            
        }
        catch(Exception ex) {
            
            return ex.getMessage();
            
        }        
    };    
    
}
