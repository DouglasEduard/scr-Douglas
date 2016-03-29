package Model;

import DataBase.ConexaoDB;
import java.sql.Connection;
import java.sql.Statement;

/**
 *
 * @author Douglas
 */
public class Orcamento {
    private int id;    
    private int id_orcamento;  
    private int op;  
    private int id_usuario_origem; 
    private int id_usuario_elaboracao;
    private int id_empresa_origem;
    private int id_empresa_destino;    
    private int id_produto;
    private String usuario_origem_nome;
    private String usuario_elaboracao_nome;
    private String empresa_origem_descr;
    private String empresa_destino_descr;    
    private String produto_descr;   
    private String texto_usuario_origem;   
    private String usuario_atual_descr;
    private String texto_usuario_destino;
    private int quantidade_solicitada;
    private String valorunidade_produto;
    private String valortotal_produto;
    private String valordesconto_produto; 
    private String valorunidade_maoobra;
    private String valortotal_maoobra;    
    private String valordesconto_maoobra;   
    private String valorfrete;          
    
    /**
     * @return the id
     */
    public int getId() {
        return id;
    }
    
    private String InsertSQL() {
        return "INSERT INTO Orcamento " +
            "( id_usuario_origem,id_empresa_origem," +
               "id_empresa_destino,id_produto,texto_usuario_origem," +
                "quantidade_solicitada,valorunidade_produto, data_solicitacao ) "               
                + "VALUES ( "
                + this.id_usuario_origem + ","
                + this.id_empresa_origem + ","
                + this.id_empresa_destino + ","
                + this.id_produto + ","
                + "'" + this.texto_usuario_origem + "'" + ","
                + this.quantidade_solicitada + "," 
                + "'" + this.valorunidade_produto + "'" + "," +
                "GetDate()" + " )";
    }
    
    private String UpdateSQL()
    {        
        String  sResult = "UPDATE Orcamento SET " +                        
                        "id_usuario_origem  = "  + this.getId_usuario_origem()+ ", " +
                        "id_usuario_elaboracao  = "  + this.getId_usuario_elaboracao()+ ", " +
                        "id_empresa_destino  = "  + this.getId_empresa_destino()+ ", " +
                        "id_empresa_origem  = "  + this.getId_empresa_origem()+ ", " +
                        "id_produto  = "  + this.getId_produto()+ ", " +
                        "texto_usuario_origem  = '"  + this.getTexto_usuario_origem()+ "', " +
                        "texto_usuario_destino  = '"  + this.getTexto_usuario_destino() + "', " +
                        "quantidade_solicitada  = "  + this.getQuantidade_solicitada() + ", " +
                        "valortotal_maoobra  = '"  + this.getValortotal_maoobra()+ "', " +
                        "valorunidade_produto  = '"  + this.getValorunidade_produto()+ "', " +
                        "valortotal_produto  = '"  + this.getValortotal_produto()+ "', " +
                        "valordesconto_produto  = '"  + this.getValordesconto_produto()+ "', " +
                        "valordesconto_maoobra  = '"  + this.getValordesconto_maoobra()+ "', " +
                        "valorfrete  = '"  + this.getValorfrete()+ "', " +
                        "valorunidade_maoobra  = '"  + this.getValorunidade_maoobra()+ "' " +
                "WHERE " +
                        "id_orcamento  = "  + this.getId_orcamento();
                
        return sResult;
    }
    
    private String ValidaSolicitacaoOrcamento()
    {
        return "";
    }
    
    public String  SolicitarOrcamento()
    {
        String[] Result = new String[1];
        Result[0] = "";

        ConexaoDB ConexaoSQL = new ConexaoDB();

        try {
            Connection Conexao = ConexaoSQL.CriarConexao(Result);

            Statement c = Conexao.createStatement();

            java.sql.ResultSet Consulta;

            String sQuery
                    = "SELECT id_empresa, valor FROM Produto "
                    + "WHERE "
                    + "id_produto = " + this.id_produto;

            Consulta = c.executeQuery(sQuery); 
            
            if (!Consulta.next())
                return "Erro - Empresa de destino não cdastrada!";
            else
                this.setId_empresa_destino(Consulta.getInt("id_empresa")); 
            
            this.setValorunidade_produto(Consulta.getString("valor"));
            
            String ValidacaoSolicitacao = ValidaSolicitacaoOrcamento();

            if (ValidacaoSolicitacao.equals("")) {
                Result[0] = ConexaoSQL.ExecutarComando(this.InsertSQL());
            } else {
                Result[0] = ValidacaoSolicitacao;
            }

            Conexao.close();
            c.close();

            return Result[0];

        } catch (Exception e) {
            this.setId(-1);
            return e.getMessage();
        }
    }

   
    public String ValidaElaboracapOrcamento()
    {
        return "";
    }
    
    public String getFromDataBase(int id) 
    {
        String[] Result = new String[1];
        Result[0] = "";
        Boolean bWhere = false;

        ConexaoDB ConexaoSQL = new ConexaoDB();

        try {
            Connection Conexao = ConexaoSQL.CriarConexao(Result);

            Statement c = Conexao.createStatement();

            java.sql.ResultSet Consulta;

            String sQuery = "SELECT * FROM Orcamento WHERE id_orcamento = " + id;                                               

            Consulta = c.executeQuery(sQuery);

            Consulta.next();
                                           
            this.setId_usuario_origem(Consulta.getInt("id_usuario_origem"));                   
            this.setId_empresa_origem(Consulta.getInt("id_empresa_origem"));
            this.setId_empresa_destino(Consulta.getInt("id_empresa_destino"));
            this.setId_produto(Consulta.getInt("id_produto"));
            this.setTexto_usuario_origem(Consulta.getString("texto_usuario_origem"));
            this.setQuantidade_solicitada(Consulta.getInt("quantidade_solicitada"));
                                            
            
            if (Consulta.isClosed()) {
                this.setId(0); //Nenhum resultado encontrado
                Result[0]
                        = "[{id: 0, Code: 0, Produto: [], Msg: 'Nenhum resultado encontrado!' }]";
            } else {
                this.setId(1); //Consulta retornou dados                  
                Result[0] = "{ Orcamento:" + Function.ResultSetConverter.convert(Consulta) + "}";
            }

            Conexao.close();
            c.close();

            return Result[0];

        } catch (Exception e) {
            this.setId(-1);
            return e.getMessage();
        }        
        
        
    }
    
    public String GravaElabOrcamento()
    {
        String[] Result = new String[1];
        Result[0] = "";

        ConexaoDB ConexaoSQL = new ConexaoDB();

        try {
            Connection Conexao = ConexaoSQL.CriarConexao(Result);

            Statement c = Conexao.createStatement();
            
            String ValidacaoElabOrcamento = ValidaElaboracapOrcamento();

            if (ValidacaoElabOrcamento.equals("")) {
                Result[0] = ConexaoSQL.ExecutarComando(this.UpdateSQL());
                
                Mensagem Msg = new Mensagem();
                Msg.setId_empresa_origem(this.getId_empresa_origem());
                Msg.setId_usuario_origem(this.getId_usuario_elaboracao());
                Msg.setId_empresa_destino(this.getId_empresa_origem());
                Msg.setId_assunto(1);
                Msg.setAssunto("Elaboração de Orçamento");
                Msg.setMensagem("Responsável: " + "\n" + "Teste" );

                Msg.Enviar();                
                
            } else {
                Result[0] = ValidacaoElabOrcamento;
            }

            Conexao.close();
            c.close();

            return Result[0];

        } catch (Exception e) {
            this.setId(-1);
            return e.getMessage();
        }        
    }
    
    
    public String ConsultaOrcamento(int idEmpresa, int idEmpresaSolicitante, 
                                    String SolicitacaoInicial,
                                    String SolicitacaoFinal,
                                    int IdOrcamento, Boolean bElaboracao, String sUserName) {
        String[] Result = new String[1];
        Result[0] = "";
        Boolean bWhere = false;

        ConexaoDB ConexaoSQL = new ConexaoDB();
        
        String sDataInicial = "";
        String sDataFinal = "";
        
        if (!SolicitacaoInicial.toString().equals(""))
            sDataInicial = SolicitacaoInicial.substring(0, 10).replace("-", "");
        
        if (!SolicitacaoFinal.toString().equals(""))
            sDataFinal = SolicitacaoFinal.substring(0, 10).replace("-", "");        

        try {
            Connection Conexao = ConexaoSQL.CriarConexao(Result);

            Statement c = Conexao.createStatement();

            java.sql.ResultSet Consulta;

            String sQuery = "SELECT " +
                    "id_orcamento,id_usuario_origem, UO.Nome AS usuario_origem_nome, id_usuario_elaboracao, COALESCE( UELab.Nome, '" + sUserName + "' ) AS usuario_elaboracao_nome," +
                    "id_empresa_origem,id_empresa_destino,Orcamento.id_produto,COALESCE(valorunidade_maoobra,0) AS valorunidade_maoobra , COALESCE(valordesconto_maoobra,0) AS valordesconto_maoobra, COALESCE(valortotal_maoobra,0) AS valortotal_maoobra," +
                    "texto_usuario_origem,texto_usuario_destino,quantidade_solicitada," +
                    "CAST( valorunidade_produto AS VARCHAR ) AS valorunidade_produto,COALESCE(valortotal_produto,0) AS valortotal_produto,COALESCE(valordesconto_produto,0) AS valordesconto_produto," +
                    "COALESCE(valorfrete,0) AS valorfrete, Empresa.nome as empresa_origem_descr, descricao as produto_descr FROM Orcamento ";            
            
            if ( bElaboracao )
                sQuery += "LEFT JOIN Empresa ON Empresa.id_empresa = Orcamento.id_empresa_origem ";
            else
                sQuery += "LEFT JOIN Empresa ON Empresa.id_empresa = Orcamento.id_empresa_destino ";
            
            sQuery += "LEFT JOIN Usuario UO ON UO.id_usuario = Orcamento.id_usuario_origem ";
            sQuery += "LEFT JOIN Usuario UELab ON UELab.id_usuario = Orcamento.id_usuario_elaboracao ";
            
            sQuery += "LEFT JOIN Produto ON Produto.id_produto = Orcamento.id_produto ";
            
            sQuery += "WHERE ";
            
            //A mesma consulta é utilizada para listar tudo que foi solicitado e o que esta pendente de elaboração
            if ( !bElaboracao )                
            {
                sQuery += "id_empresa_origem = " + idEmpresa + " ";
                
                if (idEmpresaSolicitante != -1)
                    sQuery += " AND id_empresa_destino = " + idEmpresaSolicitante + " ";
            }
            else
            {
                sQuery += "id_empresa_destino = " + idEmpresa + " ";                                                           
                
                if (idEmpresaSolicitante != -1)
                    sQuery += " AND id_empresa_origem = " + idEmpresaSolicitante + " ";
            }
            
            if (IdOrcamento!=-1)
                sQuery += " AND id_orcamento = " + IdOrcamento + " ";
            
            if (!sDataInicial.equals(""))
                sQuery += " AND data_solicitacao > '" + sDataInicial + "' ";
            
            if (!sDataFinal.equals(""))
                sQuery += " AND data_solicitacao < " + "cast('" + sDataFinal + "' as datetime) + 1 " + " ";                          
            
            String sCondBusca = "";

            Consulta = c.executeQuery(sQuery + sCondBusca);

            if (Consulta.isClosed()) {
                this.setId(0); //Nenhum resultado encontrado
                Result[0]
                        = "[{id: 0, Code: 0, Produto: [], Msg: 'Nenhum resultado encontrado!' }]";
            } else {
                this.setId(1); //Consulta retornou dados                  
                Result[0] = "{ Orcamento:" + Function.ResultSetConverter.convert(Consulta) + "}";
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
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
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
     * @return the op
     */
    public int getOp() {
        return op;
    }

    /**
     * @param op the op to set
     */
    public void setOp(int op) {
        this.op = op;
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
     * @return the id_usuario_elaboracao
     */
    public int getId_usuario_elaboracao() {
        return id_usuario_elaboracao;
    }

    /**
     * @param id_usuario_elaboracao the id_usuario_elaboracao to set
     */
    public void setId_usuario_elaboracao(int id_usuario_elaboracao) {
        this.id_usuario_elaboracao = id_usuario_elaboracao;
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
     * @return the empresa_origem_descr
     */
    public String getEmpresa_origem_descr() {
        return empresa_origem_descr;
    }

    /**
     * @param empresa_origem_descr the empresa_origem_descr to set
     */
    public void setEmpresa_origem_descr(String empresa_origem_descr) {
        this.empresa_origem_descr = empresa_origem_descr;
    }

    /**
     * @return the empresa_destino_descr
     */
    public String getEmpresa_destino_descr() {
        return empresa_destino_descr;
    }

    /**
     * @param empresa_destino_descr the empresa_destino_descr to set
     */
    public void setEmpresa_destino_descr(String empresa_destino_descr) {
        this.empresa_destino_descr = empresa_destino_descr;
    }

    /**
     * @return the produto_descr
     */
    public String getProduto_descr() {
        return produto_descr;
    }

    /**
     * @param produto_descr the produto_descr to set
     */
    public void setProduto_descr(String produto_descr) {
        this.produto_descr = produto_descr;
    }

    /**
     * @return the texto_usuario_origem
     */
    public String getTexto_usuario_origem() {
        return texto_usuario_origem;
    }

    /**
     * @param texto_usuario_origem the texto_usuario_origem to set
     */
    public void setTexto_usuario_origem(String texto_usuario_origem) {
        this.texto_usuario_origem = texto_usuario_origem;
    }

    /**
     * @return the usuario_atual_descr
     */
    public String getUsuario_atual_descr() {
        return usuario_atual_descr;
    }

    /**
     * @param usuario_atual_descr the usuario_atual_descr to set
     */
    public void setUsuario_atual_descr(String usuario_atual_descr) {
        this.usuario_atual_descr = usuario_atual_descr;
    }

    /**
     * @return the texto_usuario_destino
     */
    public String getTexto_usuario_destino() {
        return texto_usuario_destino;
    }

    /**
     * @param texto_usuario_destino the texto_usuario_destino to set
     */
    public void setTexto_usuario_destino(String texto_usuario_destino) {
        this.texto_usuario_destino = texto_usuario_destino;
    }

    /**
     * @return the quantidade_solicitada
     */
    public int getQuantidade_solicitada() {
        return quantidade_solicitada;
    }

    /**
     * @param quantidade_solicitada the quantidade_solicitada to set
     */
    public void setQuantidade_solicitada(int quantidade_solicitada) {
        this.quantidade_solicitada = quantidade_solicitada;
    }

    /**
     * @return the valorunidade_produto
     */
    public String getValorunidade_produto() {
        return valorunidade_produto;
    }

    /**
     * @param valorunidade_produto the valorunidade_produto to set
     */
    public void setValorunidade_produto(String valorunidade_produto) {
        this.valorunidade_produto = valorunidade_produto;
    }

    /**
     * @return the valortotal_produto
     */
    public String getValortotal_produto() {
        return valortotal_produto;
    }

    /**
     * @param valortotal_produto the valortotal_produto to set
     */
    public void setValortotal_produto(String valortotal_produto) {
        this.valortotal_produto = valortotal_produto;
    }

    /**
     * @return the valordesconto_produto
     */
    public String getValordesconto_produto() {
        return valordesconto_produto;
    }

    /**
     * @param valordesconto_produto the valordesconto_produto to set
     */
    public void setValordesconto_produto(String valordesconto_produto) {
        this.valordesconto_produto = valordesconto_produto;
    }

    /**
     * @return the valordesconto_maoobra
     */
    public String getValordesconto_maoobra() {
        return valordesconto_maoobra;
    }

    /**
     * @param valordesconto_maoobra the valordesconto_maoobra to set
     */
    public void setValordesconto_maoobra(String valordesconto_maoobra) {
        this.valordesconto_maoobra = valordesconto_maoobra;
    }

    /**
     * @return the valorfrete
     */
    public String getValorfrete() {
        return valorfrete;
    }

    /**
     * @param valorfrete the valorfrete to set
     */
    public void setValorfrete(String valorfrete) {
        this.valorfrete = valorfrete;
    }

    /**
     * @return the valorunidade_maoobra
     */
    public String getValorunidade_maoobra() {
        return valorunidade_maoobra;
    }

    /**
     * @param valorunidade_maoobra the valorunidade_maoobra to set
     */
    public void setValorunidade_maoobra(String valorunidade_maoobra) {
        this.valorunidade_maoobra = valorunidade_maoobra;
    }

    /**
     * @return the valortotal_maoobra
     */
    public String getValortotal_maoobra() {
        return valortotal_maoobra;
    }

    /**
     * @param valortotal_maoobra the valortotal_maoobra to set
     */
    public void setValortotal_maoobra(String valortotal_maoobra) {
        this.valortotal_maoobra = valortotal_maoobra;
    }

    /**
     * @return the usuario_origem_nome
     */
    public String getUsuario_origem_nome() {
        return usuario_origem_nome;
    }

    /**
     * @param usuario_origem_nome the usuario_origem_nome to set
     */
    public void setUsuario_origem_nome(String usuario_origem_nome) {
        this.usuario_origem_nome = usuario_origem_nome;
    }

    /**
     * @return the usuario_elaboracao_nome
     */
    public String getUsuario_elaboracao_nome() {
        return usuario_elaboracao_nome;
    }

    /**
     * @param usuario_elaboracao_nome the usuario_elaboracao_nome to set
     */
    public void setUsuario_elaboracao_nome(String usuario_elaboracao_nome) {
        this.usuario_elaboracao_nome = usuario_elaboracao_nome;
    }
}
