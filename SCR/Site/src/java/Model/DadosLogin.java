/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import DataBase.ConexaoDB;
import java.sql.Connection;
import java.sql.Statement;

/**
 *
 * @author Douglas
 */
public class DadosLogin {

    private int id;
    private String Login;
    private String Senha;

    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return the Login
     */
    public String getLogin() {
        return Login;
    }

    /**
     * @param Login the Login to set
     */
    public void setLogin(String Login) {
        this.Login = Login;
    }

    /**
     * @return the Senha
     */
    public String getSenha() {
        return Senha;
    }

    /**
     * @param Senha the Senha to set
     */
    public void setSenha(String Senha) {
        this.Senha = Senha;
    }
    
    public String EfetuarLogin()
    {
        String[] Result = new String[1];    
        Result[0] = "";                
                
        ConexaoDB ConexaoSQL = new ConexaoDB();                                
                
         try
         {                                                   
            Connection Conexao = ConexaoSQL.CriarConexao(Result);                          
             
            Statement c = Conexao.createStatement();
            
            java.sql.ResultSet Consulta;                        
                
            String sQuery = 
                    "SELECT id_usuario FROM Usuario " + 
                    "WHERE " +
                        "login = " + this.getLogin() + " AND " +
                        "senha = '" + this.getSenha() + "'";
                                                        
            Consulta = c.executeQuery(sQuery);           
            
            if ( !Consulta.next() )
            {                            
                Result[0] = "Ok";
                this.setId(Consulta.getInt("id_login"));
                
            }
            else
            {     
                this.setId(-1);
                Result[0] = "Conta ou senha inválida";
            }

            Conexao.close(); 
            c.close();
            
            return Result[0];                        
        
        }
        catch(Exception e) 
        {       
            this.setId(-2);
            return e.getMessage();                       
        }                          
    }       
}
