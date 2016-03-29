/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import DataBase.ConexaoDB;
import java.sql.Statement;
import java.sql.Connection;

/**
 *
 * @author Douglas
 */
public class Produto {

    private int id;
    private int id_produto;
    private String codigo;
    private String descricao;
    private String marca;
    private String quantidade_min;
    private String valor;
    private String id_empresa;
    private int visibilidade;
    private int desativado;

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
     * @return the descricao
     */
    public String getDescricao() {
        return descricao;
    }

    /**
     * @param descricao the descricao to set
     */
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    /**
     * @return the marca
     */
    public String getMarca() {
        return marca;
    }

    /**
     * @param marca the marca to set
     */
    public void setMarca(String marca) {
        this.marca = marca;
    }

    /**
     * @return the quantidade
     */
    public String getquantidade_min() {
        return quantidade_min;
    }

    /**
     * @param quantidade the quantidade to set
     */
    public void setquantidade_min(String quantidade) {
        this.quantidade_min = quantidade;
    }

    /**
     * @return the valor
     */
    public String getValor() {
        return valor;
    }

    /**
     * @param valor the valor to set
     */
    public void setValor(String valor) {
        this.valor = valor;
    }

    /**
     * @return the id_empresa
     */
    public String getId_empresa() {
        return id_empresa;
    }

    /**
     * @param id_empresa the id_empresa to set
     */
    public void setId_empresa(String id_empresa) {
        this.id_empresa = id_empresa;
    }

    private String InsertSQL() {
        return "INSERT INTO Produto ( "
                + "codigo,descricao,quantidade_min,marca,valor,id_empresa ) "
                + "VALUES ( "
                + "'" + this.codigo + "'" + ","
                + "'" + this.descricao + "'" + ","
                + this.quantidade_min + ","
                + "'" + this.marca + "'" + ","
                + this.valor + ","
                + this.getId_empresa() + " )";
    }

    private String UpdateSQL() {
        return "UPDATE Produto SET "
                + "codigo='" + this.codigo + "'" + ","
                + "descricao='" + this.descricao + "'" + ","
                + "quantidade_min=" + this.quantidade_min + ","
                + "marca='" + this.marca + "'" + ","
                + "valor=" + this.valor + " "
                + "WHERE "
                + "id_produto = " + this.id_produto;

    }

    private String DeleteSQL() {
        return "DELETE FROM Produto "
                + "WHERE "
                + "id_produto = " + this.id_produto;
    }

    public String GravaProduto() {
        String[] Result = new String[1];
        Result[0] = "";

        ConexaoDB ConexaoSQL = new ConexaoDB();

        try {
            Connection Conexao = ConexaoSQL.CriarConexao(Result);

            Statement c = Conexao.createStatement();

            java.sql.ResultSet Consulta;

            String sQuery
                    = "SELECT id_produto FROM Produto "
                    + "WHERE "
                    + "id_empresa = " + this.id_empresa + " AND "
                    + "codigo = '" + this.codigo + "'";

            Consulta = c.executeQuery(sQuery);

            if (!Consulta.next()) {
                Result[0] = ConexaoSQL.ExecutarComando(this.InsertSQL());
            } else {
                this.setId_produto(Consulta.getInt("id_produto"));
                Result[0] = ConexaoSQL.ExecutarComando(UpdateSQL());
            }

            Conexao.close();
            c.close();

            return Result[0];

        } catch (java.sql.SQLException e) {
            this.setId(-1);
            return e.getMessage();
        }
    }

    public String ExcluirProduto() {
        String[] Result = new String[1];
        Result[0] = "";

        ConexaoDB ConexaoSQL = new ConexaoDB();

        try {
            Connection Conexao = ConexaoSQL.CriarConexao(Result);

            Statement c = Conexao.createStatement();

            Result[0] = ConexaoSQL.ExecutarComando(this.DeleteSQL());

            Conexao.close();
            c.close();

            return Result[0];

        } catch (Exception e) {
            this.setId(-1);
            return e.getMessage();
        }
    }

    public String ValidaProduto() {
        String sResult = "";

        if (this.codigo.trim().equals("")) {
            return "Código deve ser informado";
        }

        if (this.descricao.trim().equals("")) {
            return "Descrição deve ser informada";
        }

        return sResult;
    }


    private String ValidarDadosConsulta(String sCodigoProd, String sDescr) {
        return "";
    }

    public String ConsultaProduto(String sCodigoProd, String sDescr, Boolean ConsultaParceiro, String sIdEmpresa) {
        String[] Result = new String[1];
        Result[0] = "";
        Boolean bWhere = false;

        ConexaoDB ConexaoSQL = new ConexaoDB();

        try {
            Connection Conexao = ConexaoSQL.CriarConexao(Result);

            Statement c = Conexao.createStatement();

            java.sql.ResultSet Consulta;

            String sQuery
                    = "SELECT id_produto as id, codigo, marca, descricao, valor, quantidade_min, " + 
                             " Empresa.nome AS nomeempresa FROM Produto ";

            sQuery += "LEFT JOIN Empresa ON Empresa.id_empresa = Produto.id_empresa ";
            
            String sCondBusca = "";

            if (ConsultaParceiro) {
                sCondBusca += DataBase.Function.ClauseSQL(bWhere) + " Produto.id_empresa <> " + "'" + sIdEmpresa + "'";
                bWhere = true;
            }
            else {
                sCondBusca += DataBase.Function.ClauseSQL(bWhere) + " Produto.id_empresa = " + "'" + sIdEmpresa + "'";
                bWhere = true;                
            }
            
            if (sCodigoProd != null) {
                if (!sCodigoProd.equals("")) {
                    sCondBusca += DataBase.Function.ClauseSQL(bWhere) + " codigo = " + "'" + sCodigoProd + "'";
                    bWhere = true;
                }
            }                       

            if (sDescr != null) {
                if (!sDescr.equals("")) {
                    sCondBusca += DataBase.Function.ClauseSQL(bWhere) + " descricao = " + "'" + sDescr + "'";
                }
            }

            Consulta = c.executeQuery(sQuery + sCondBusca);

            if (Consulta.isClosed()) {
                this.setCodigo("0"); //Nenhum resultado encontrado
                Result[0]
                        = "[{id: 0, Code: 0, Produto: [], Msg: 'Nenhum resultado encontrado!' }]";
            } else {
                this.setCodigo("1"); //Consulta retornou dados                  
                Result[0] = "{ Produto:" + Function.ResultSetConverter.convert(Consulta) + "}";
            }

            Conexao.close();
            c.close();

            return Result[0];

        } catch (Exception e) {
            this.setCodigo("-1");
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
}
