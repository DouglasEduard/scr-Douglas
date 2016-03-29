/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import DataBase.ConexaoDB;
import java.sql.Connection;
import java.sql.Statement;
import java.sql.Date;

/**
 *
 * @author Alex Ricardo
 */
public class SolicitacaoParceria {
    
    private int id;
    private int id_parceria;
    private int id_empresa_snte;
    private int id_empresa_stda;
    private Date datasolicitacao;
    private Date dataconfirmacao;
    private int bloqueado;
    
    private String InsertSQL() {
        
        return " INSERT INTO SolicitacaoParceria " +
                    "(id_empresa_snte,id_empresa_stda,datasolicitacao " +
                    ",dataconfirmacao,bloqueado) " +
                "VALUES (" +
                    this.getId_empresa_snte() + ", " +
                    this.getId_empresa_stda() + ", " +
                    "GetDate(), " +
                    this.getDataconfirmacao() + ", " +
                    this.getBloqueado() + ")";
    }
    
    
    private String UpdateSQL() {
        
        return  "UPDATE SolicitacaoParceria SET " +
                    "id_empresa_snte = " + this.getId_empresa_snte() + ", " +
                    "id_empresa_stda = " + this.getId_empresa_stda() + ", " +
                    "datasolicitacao = '" + this.getDatasolicitacao() + "', " +
                    "dataconfirmacao = '" + this.getDataconfirmacao() + "', " +
                    "bloqueado = " + this.getBloqueado() + ")" +
                "WHERE (id_parceria = " + this.getId_parceria() + ")";
        
    }
    
    public String  SolicitarParceria()
    {
        String[] Result = new String[1];
        Result[0] = "";

        ConexaoDB ConexaoSQL = new ConexaoDB();

        try {
                        
            this.setDatasolicitacao(new Date(System.currentTimeMillis()));
            this.setDataconfirmacao(null);
            
            String ValidacaoSolicitacao = ValidaSolicitacaoParceria();

            if (ValidacaoSolicitacao.equals("")) {
                Result[0] = ConexaoSQL.ExecutarComando(this.InsertSQL());
            } else {
                Result[0] = ValidacaoSolicitacao;
            }

            return Result[0];

        } catch (Exception e) {
            this.setId(-1);
            return e.getMessage();
        }
    }
   
    public String ValidaSolicitacaoParceria()
    {
        return "";
    }
    
    public String ConsultaSolicitacaoParceira(String condicao){
        
        String[] Result = new String[1];    
        Result[0] = ""; 
        Boolean bWhere = false;
                
        ConexaoDB ConexaoSQL = new ConexaoDB();                                
                
         try
         {                                                   
            Connection Conexao = ConexaoSQL.CriarConexao(Result);                          
             
            Statement c = Conexao.createStatement();
            
            java.sql.ResultSet Consulta;                        
                
            String sQuery = 
                    "SELECT " +
                        "id_parceria " +
                        ",id_empresa_snte " +
                        ",id_empresa_stda " +
                        ",datasolicitacao " +
                        ",dataconfirmacao " +
                        ",bloqueado " +
                        " FROM SolicitacaoParceria";
                                                        
            String sCondBusca = "";
            
            
            if (this.getId_empresa_snte() > 0) {
            
                sCondBusca += DataBase.Function.ClauseSQL(bWhere) + " id_empresa_snte = " + this.getId_empresa_snte();
                bWhere = true;
                
            }
            
            if (this.getId_empresa_stda()> 0) {
            
                sCondBusca += DataBase.Function.ClauseSQL(bWhere) + " id_empresa_stda = " + this.getId_empresa_stda();
                bWhere = true;
                
            }
                        
            Consulta = c.executeQuery(sQuery + sCondBusca);          
                         
            if ( Consulta.isClosed() )
            {     
                  this.setId(0); //Nenhum resultado encontrado
                  Result[0] = "Nenhum resultado encontrado!";
            }
            else
            {                
                  this.setId(1); //Consulta retornou dados                  
                  Result[0] = "{ SolicitacaoParceria:" + Function.ResultSetConverter.convert( Consulta ) + "}";
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId_parceria() {
        return id_parceria;
    }

    public void setId_parceria(int id_parceria) {
        this.id_parceria = id_parceria;
    }

    public int getId_empresa_snte() {
        return id_empresa_snte;
    }

    public void setId_empresa_snte(int id_empresa_snte) {
        this.id_empresa_snte = id_empresa_snte;
    }

    public int getId_empresa_stda() {
        return id_empresa_stda;
    }

    public void setId_empresa_stda(int id_empresa_stda) {
        this.id_empresa_stda = id_empresa_stda;
    }

    public Date getDatasolicitacao() {
        return datasolicitacao;
    }

    public void setDatasolicitacao(Date datasolicitacao) {
        this.datasolicitacao = datasolicitacao;
    }

    public Date getDataconfirmacao() {
        return dataconfirmacao;
    }

    public void setDataconfirmacao(Date dataconfirmacao) {
        this.dataconfirmacao = dataconfirmacao;
    }

    public int getBloqueado() {
        return bloqueado;
    }

    public void setBloqueado(int bloqueado) {
        this.bloqueado = bloqueado;
    }
    
    
    
}
