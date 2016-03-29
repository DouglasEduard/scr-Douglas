/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import DataBase.ConexaoDB;
import java.sql.Statement;
import java.sql.Connection;
import Function.ResultSetConverter;

/**
 *
 * @author Alex
 */
public class Endereco {
    
    private int id;
    private String codigo; 
        
    private int id_endereco;
    private String tipo;
    private String rua;
    private int numero;
    private String bairro;
    private String cidade;
    private String estado;
    private String cep;
    private String pais;
    private String complemento;
    private int id_empresa;
    
    public void Endereco () {}
    
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
     * @return the codigo
     */
    public String getCodigo() {
        return codigo;
    }

    /**
     * @param codigo the codigo to set
     */
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    /**
     * @return the id_endereco
     */
    public int getId_endereco() {
        return id_endereco;
    }

    /**
     * @param id_endereco the id_endereco to set
     */
    public void setId_endereco(int id_endereco) {
        this.id_endereco = id_endereco;
    }

    /**
     * @return the tipo
     */
    public String getTipo() {
        return tipo;
    }

    /**
     * @param tipo the tipo to set
     */
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    /**
     * @return the rua
     */
    public String getRua() {
        return rua;
    }

    /**
     * @param rua the rua to set
     */
    public void setRua(String rua) {
        this.rua = rua;
    }

    /**
     * @return the numero
     */
    public int getNumero() {
        return numero;
    }

    /**
     * @param numero the numero to set
     */
    public void setNumero(int numero) {
        this.numero = numero;
    }

    /**
     * @return the bairro
     */
    public String getBairro() {
        return bairro;
    }

    /**
     * @param bairro the bairro to set
     */
    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    /**
     * @return the cidade
     */
    public String getCidade() {
        return cidade;
    }

    /**
     * @param cidade the cidade to set
     */
    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    /**
     * @return the estado
     */
    public String getEstado() {
        return estado;
    }

    /**
     * @param estado the estado to set
     */
    public void setEstado(String estado) {
        this.estado = estado;
    }

    /**
     * @return the cep
     */
    public String getCep() {
        return cep;
    }

    /**
     * @param cep the cep to set
     */
    public void setCep(String cep) {
        this.cep = cep;
    }

    /**
     * @return the pais
     */
    public String getPais() {
        return pais;
    }

    /**
     * @param pais the pais to set
     */
    public void setPais(String pais) {
        this.pais = pais;
    }

    /**
     * @return the complemento
     */
    public String getComplemento() {
        return complemento;
    }

    /**
     * @param complemento the complemento to set
     */
    public void setComplemento(String complemento) {
        this.complemento = complemento;
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
                    
        "INSERT INTO Endereco(tipo,rua,numero,bairro,cidade," +
                    "estado,cep,pais,complemento,id_empresa)" +
            " VALUES (" +
                "'" + this.getTipo() + "'," +
                "'" + this.getRua()  + "'," +
                + this.getNumero() + "," +
                "'" + this.getBairro() + "'," +
                "'" + this.getCidade() + "'," +
                "'" + this.getEstado() + "'," +
                "'" + this.getCep() + "'," +
                "'" + this.getPais() + "'," +
                "'" + this.getComplemento() + "'," +
                + this.getId_empresa() + ")";

    }      
    
    public String UpdateSQL()
    {
        return 
             "UPDATE Endereco SET " +
                
                "tipo='" + this.getTipo() + "'," +
                "rua='" + this.getRua()  + "'," +
                "numero='" + this.getNumero() + "'," +
                "bairro='" + this.getBairro() + "'," +
                "cidade='" + this.getCidade() + "'," +
                "estado='" + this.getEstado() + "'," +
                "cep='" + this.getCep() + "'," +
                "pais='" + this.getPais() + "'," +
                "complemento='" + this.getComplemento() + "'" +
                                
             " WHERE " +
                "id_empresa = " + this.getId_empresa();
                
                
    }    
    
    public String Gravar()
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
                    "SELECT id_empresa FROM Endereco " + 
                    "WHERE " +
                        "id_empresa = '" + this.getId_empresa() + "'";
                                                        
            Consulta = c.executeQuery(sQuery);           
            
            if ( !Consulta.next() )
            {                    
                Result[0] = ConexaoSQL.ExecutarComando(this.InsertSQL());                   
            }
            else
            {
                this.setId_empresa(Consulta.getInt("id_empresa"));
                Result[0] = ConexaoSQL.ExecutarComando(this.UpdateSQL());
            }

            Conexao.close(); 
            c.close();
            
            return Result[0];                        
        
        }
        catch(Exception e) 
        {  
            this.setId(-1);
            return e.getMessage();                       
        }                          
    }    
    
}
