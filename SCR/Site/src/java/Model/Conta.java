/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

/**
 *
 * @author alex.silva
 */
public class Conta {
    
    private int id_conta;
    private String conta;
    private String senha;
    private int id_empresa;

    /**
     * @return the id_conta
     */
    public int getId_conta() {
        return id_conta;
    }

    /**
     * @param id_conta the id_conta to set
     */
    public void setId_conta(int id_conta) {
        this.id_conta = id_conta;
    }

    /**
     * @return the conta
     */
    public String getConta() {
        return conta;
    }

    /**
     * @param conta the conta to set
     */
    public void setConta(String conta) {
        this.conta = conta;
    }

    /**
     * @return the senha
     */
    public String getSenha() {
        return senha;
    }

    /**
     * @param senha the senha to set
     */
    public void setSenha(String senha) {
        this.senha = senha;
    }

    /**
     * @return the id_empresa
     */
    public int getId_empresa() {
        return id_empresa;
    }

    /**
     * @param id_empresa the id_empresa to set
     */
    public void setId_empresa(int id_empresa) {
        this.id_empresa = id_empresa;
    }
    
    public String InsertSQL()
    {
        return
                    
        "INSERT INTO Conta(conta,senha,id_empresa)" +
            " VALUES (" +
                "'" + this.getConta()+ "'," +
                "'" + this.getSenha()+ "'," +
                this.getId_empresa() + ")";

    }      
    
    public String UpdateSQL()
    {
        return 
             "UPDATE Endereco SET " +
                
                "tipo='" + this.getConta()+ "'," +
                "rua='" + this.getSenha() + 
                                                
             " WHERE " +
                "id_empresa = " + this.getId_empresa();
                
                
    }
    
}
