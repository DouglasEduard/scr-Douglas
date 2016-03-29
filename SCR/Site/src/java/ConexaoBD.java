/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Alex
 */

import java.sql.*;

public class ConexaoBD {
    
    private String _url = "";
    private String _serverName = "";
    private String _databaseName = "";
    private String _userName = "";
    private String _password = "";
        
    public ConexaoBD() {
    
        this._url = "jdbc:sqlserver://";
        this._serverName = "localhost/DOUGLAS";
        this._databaseName = "SupplyMe";
        this._userName = "sa";
        this._password = "SCR2014";
     
    };
    
    public ConexaoBD(String url, String servername, String databaseName, String userName, String password) {
    
        this._url = url;
        this._serverName = servername;
        this._databaseName = databaseName;
        this._userName = userName;
        this._password = password;
     
    };
    
    public Connection CriarConexao() {
    
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
         catch (SQLException ex) {
             
             // se ocorrem erros de conexão
           System.out.println("SQLException: " + ex.getMessage());
           System.out.println("SQLState: " + ex.getSQLState());
           System.out.println("VendorError: " + ex.getErrorCode());
           
         }
         catch (Exception e) {
          // se ocorrerem outros erros
             
           System.out.println("Problemas ao tentar conectar com o banco de dados: " + e);
           
         }
        
        finally {
            
            return null;
            
        }
                    
    };
    
    public ResultSet ConsultarBD(String query) {
      
         try {
            
            Connection Conexao = CriarConexao();

            Statement Comando = Conexao.createStatement();

            // Criando a instrução a partir do SELECT que está dentro da variável query
            ResultSet Resultado = Comando.executeQuery(query);

            //Fechando a instrução e a conexão
            Comando.close();
            Conexao.close();
            
            return Resultado;
            
        }
        catch(SQLException ex) {
            
            System.err.println("SQLException: " + ex.getMessage());
            
        }
        finally {
             
             return null;
             
        }
        
    };
    
    public boolean ExecutarBD(String comando) {
      
         try {
            
            Connection Conexao = CriarConexao();

            Statement Comando = Conexao.createStatement();
            
            Comando.executeUpdate(comando);

            //Fechando a instrução e a conexão
            Comando.close();
            Conexao.close();
            
            return true;
            
        }
        catch(SQLException ex) {
            
            System.err.println("SQLException: " + ex.getMessage());
            
        }
        finally {
             
             return false;
             
        }
        
    };
    
}
