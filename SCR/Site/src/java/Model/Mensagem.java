/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
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
public class Mensagem {
        private int id;    
        private int id_mensagem;     
	private int id_usuario_origem;
	private int id_usuario_destino;
	private int id_produto;               
	private String dataenvio;
	private String dataleitura;
	private int id_assunto;
	private String assunto;
	private String mensagem;
	private int id_orcamento;
	private int id_empresa_origem;
	private int id_empresa_destino;
        private String aceitarparceria;

                                            
    private String InsertSQL() {
        return "INSERT INTO Mensagem " +
                    "( " +
                        "id_usuario_origem," +
                        "dataenvio," +
                        "id_assunto," +
                        "assunto," +
                        "mensagem," +
                        "id_empresa_origem," +
                        "id_empresa_destino" +
                    ") " +
                "VALUES " +
                    "( " +
                        this.getId_usuario_origem() + "," +
                        "GetDate()" + "," +
                        this.getId_assunto()+ "," +
                        "'" + this.getAssunto()+ "'" + "," +
                        "'" + this.getMensagem()+ "'" + "," +
                        this.getId_empresa_origem()+ "," +
                        this.getId_empresa_destino()+ " " +
                    ") ";               
    }
    
    private String UpdateSQL()
    {        
        String sResult = "UPDATE Mensagem SET " +                        
                        "id_usuario_origem=" + this.getId_usuario_origem() + "," +
                        "id_usuario_destino=" + this.getId_usuario_destino() + "," +
                        "id_produto=" + this.getId_produto() + "," +
                        "dataenvio='" + this.getDataenvio() + "'," +
                        "dataleitura='" + this.getDataleitura() + "'," +
                        "id_assunto=" + this.getId_assunto() + "," +
                        "assunto='" + this.getAssunto() + "'," +
                        "mensagem='" + this.getMensagem() + "'," +
                        "id_orcamento=" + this.getId_orcamento() + "," +
                        "id_empresa_origem=" + this.getId_empresa_origem() + "," +
                        "id_empresa_destino=" + this.getId_empresa_destino() + "," +
                "WHERE " +
                        "id_mensagem  = "  + this.getId_mensagem();
                
        return sResult;
    }        
        
    private String ValidaEnvioMensagem()
    {
        return "";
    }
    
    public String Enviar()
    {
        String[] Result = new String[1];
        Result[0] = "";

        ConexaoDB ConexaoSQL = new ConexaoDB();

        try {
            Connection Conexao = ConexaoSQL.CriarConexao(Result);

            Statement c = Conexao.createStatement();
                       
            String ValidacaoEnvioMsg = ValidaEnvioMensagem();

            if (ValidacaoEnvioMsg.equals("")) {
                Result[0] = ConexaoSQL.ExecutarComando(this.InsertSQL());
            } else {
                Result[0] = ValidacaoEnvioMsg;
            }

            Conexao.close();
            c.close();

            return Result[0];

        } catch (Exception e) {
            this.setId(-1);
            return e.getMessage();
        }
    }
    
    public String ConsultaMensagem(int idEmpresa, 
                                   int tipo, 
                                   String DataInicial,
                                   String DataFinal,
                                   int status, 
                                   int idEmpresaParceira) {
        String[] Result = new String[1];
        Result[0] = "";
        Boolean bWhere = false;

        ConexaoDB ConexaoSQL = new ConexaoDB();

        try {
            Connection Conexao = ConexaoSQL.CriarConexao(Result);

            Statement c = Conexao.createStatement();

            java.sql.ResultSet Consulta;            
            
            String sQuery = "SELECT " +
                    "id_mensagem AS id,id_usuario_origem,UO.Nome AS usuario_origem_nome," +
                    "id_usuario_destino,UDest.Nome AS usuario_destino_nome,Produto.id_produto," +
                    "CONVERT(varchar(10),dataenvio,3) + ' ' + CONVERT(varchar(10),dataenvio,8) AS dataenvio,dataleitura,id_assunto,assunto,mensagem," +
                    "CAST( (CASE WHEN COALESCE(id_assunto,0) = 0 THEN "
                            + "'Comum' ELSE  " +
                                    "CASE WHEN id_assunto = 1 "
                                    + "THEN 'Orçamento' ELSE 'Parceria' END "
                           + "END ) AS VARCHAR(10) ) AS id_assunto_descr " +                    
                    ",id_empresa_origem,id_empresa_destino,Parc.nome AS empresa_origem_descr " +
                                        
                    "FROM Mensagem ";                                               
            
            if (status==1)//Enviadas
                sQuery += "LEFT JOIN Empresa Parc ON Parc.id_empresa = Mensagem.id_empresa_destino ";
            else
                sQuery += "LEFT JOIN Empresa Parc ON Parc.id_empresa = Mensagem.id_empresa_origem ";
            
            sQuery += "LEFT JOIN Usuario UO ON UO.id_usuario = Mensagem.id_usuario_origem ";
            sQuery += "LEFT JOIN Usuario UDest ON UDest.id_usuario = Mensagem.id_usuario_destino ";
            
            sQuery += "LEFT JOIN Produto ON Produto.id_produto = Mensagem.id_produto ";            
            
            
            String sCondBusca = "";
            
            sCondBusca += "WHERE ";           
            
            if (status==1)//Enviadas
            {                                
                sCondBusca += "id_empresa_origem = " + idEmpresa + " ";
                
                if (idEmpresaParceira!=0)
                    sCondBusca += " AND id_usuario_destino = " + idEmpresaParceira + " ";                
            }
            else //Recebidas
            {                
                sCondBusca += "id_empresa_destino = " + idEmpresa + " ";
                
                if (idEmpresaParceira!=0)
                    sCondBusca += " AND id_empresa_origem = " + idEmpresaParceira + " ";                
            }
                        
            //[ '0', 'Comum'],
            //[ '1', 'Or&ccedil;amento'],
            //[ '2', 'Parceria']            
            if (tipo!=-1)
                sCondBusca += " AND id_assunto = " + tipo + " ";                

            Consulta = c.executeQuery(sQuery + sCondBusca);
            
            if (Consulta.isClosed()) {
                this.setId(0); //Nenhum resultado encontrado
                Result[0]
                        = "[{id: 0, Code: 0, Produto: [], Msg: 'Nenhum resultado encontrado!' }]";
            } else {
                this.setId(1); //Consulta retornou dados                  
                Result[0] = "{ Mensagem:" + Function.ResultSetConverter.convert(Consulta) + "}";
            }

            Conexao.close();
            c.close();

            return Result[0];

        } catch (Exception e) {
            this.setId(-1);
            return e.getMessage();
        }
    } 
    
    
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
     * @return the id_mensagem
     */
    public int getId_mensagem() {
        return id_mensagem;
    }

    /**
     * @param id_mensagem the id_mensagem to set
     */
    public void setId_mensagem(int id_mensagem) {
        this.id_mensagem = id_mensagem;
    }


    /**
     * @return the id_usuario_origem
     */
    public int getId_usuario_origem() {
        return id_usuario_origem;
    }

    /**
     * @param id_usuario_origem the id_usuario_origem to set
     */
    public void setId_usuario_origem(int id_usuario_origem) {
        this.id_usuario_origem = id_usuario_origem;
    }

    /**
     * @return the id_usuario_destino
     */
    public int getId_usuario_destino() {
        return id_usuario_destino;
    }

    /**
     * @param id_usuario_destino the id_usuario_destino to set
     */
    public void setId_usuario_destino(int id_usuario_destino) {
        this.id_usuario_destino = id_usuario_destino;
    }

    /**
     * @return the id_produto
     */
    public int getId_produto() {
        return id_produto;
    }

    /**
     * @param id_produto the id_produto to set
     */
    public void setId_produto(int id_produto) {
        this.id_produto = id_produto;
    }

    /**
     * @return the dataenvio
     */
    public String getDataenvio() {
        return dataenvio;
    }

    /**
     * @param dataenvio the dataenvio to set
     */
    public void setDataenvio(String dataenvio) {
        this.dataenvio = dataenvio;
    }

    /**
     * @return the dataleitura
     */
    public String getDataleitura() {
        return dataleitura;
    }

    /**
     * @param dataleitura the dataleitura to set
     */
    public void setDataleitura(String dataleitura) {
        this.dataleitura = dataleitura;
    }

    /**
     * @return the id_assunto
     */
    public int getId_assunto() {
        return id_assunto;
    }

    /**
     * @param id_assunto the id_assunto to set
     */
    public void setId_assunto(int id_assunto) {
        this.id_assunto = id_assunto;
    }

    /**
     * @return the assunto
     */
    public String getAssunto() {
        return assunto;
    }

    /**
     * @param assunto the assunto to set
     */
    public void setAssunto(String assunto) {
        this.assunto = assunto;
    }

    /**
     * @return the mensagem
     */
    public String getMensagem() {
        return mensagem;
    }

    /**
     * @param mensagem the mensagem to set
     */
    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    /**
     * @return the id_orcamento
     */
    public int getId_orcamento() {
        return id_orcamento;
    }

    /**
     * @param id_orcamento the id_orcamento to set
     */
    public void setId_orcamento(int id_orcamento) {
        this.id_orcamento = id_orcamento;
    }

    /**
     * @return the id_empresa_origem
     */
    public int getId_empresa_origem() {
        return id_empresa_origem;
    }

    /**
     * @param id_empresa_origem the id_empresa_origem to set
     */
    public void setId_empresa_origem(int id_empresa_origem) {
        this.id_empresa_origem = id_empresa_origem;
    }

    /**
     * @return the id_empresa_destino
     */
    public int getId_empresa_destino() {
        return id_empresa_destino;
    }

    /**
     * @param id_empresa_destino the id_empresa_destino to set
     */
    public void setId_empresa_destino(int id_empresa_destino) {
        this.id_empresa_destino = id_empresa_destino;
    }

    /**
     * @return the aceitarparceria
     */
    public String getAceitarparceria() {
        return aceitarparceria;
    }

    /**
     * @param aceitarparceria the aceitarparceria to set
     */
    public void setAceitarparceria(String aceitarparceria) {
        this.aceitarparceria = aceitarparceria;
    }

 
}
