/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import DataBase.ConexaoDB;
import java.sql.Statement;
import java.sql.Connection;
import java.util.List;

/**
 *
 * @author Alex
 */
public class Empresa {
    
    private int id;
    private int id_empresa;
    private String codigo; 
    private String tipo;
    private String nome;
    private String nomeFantasia;
    private String cnpj;
    private String ie;
    private String atividade;
    private String institucional;
    private String contato;
    private String email;
    private String telefone;
    private String logo_nome;
    private String imagens_emp;
    
    private Endereco endereco;
    private List<Usuario> usuarios;
    private List<Produto> produtos;
    private List<Parceria> parcerias;
    private List<Orcamento> orcamentos;
    
    private String InsertSQL()
    {
        return
                    
            "INSERT INTO Empresa (tipo,nome,nomeFantasia,cnpj,ie,atividade,contato,email,telefone,institucional,logo_nome,imagens_emp) " +
                "VALUES (" +
                "'" + this.getTipo() + "'" + "," +
                "'" + this.getNome() + "'" + "," +
                "'" + this.getNomeFantasia() + "'" + "," +
                "'" + this.getCnpj() + "'" + "," +
                "'" + this.getIe() + "'" + "," +
                "'" + this.getAtividade() + "'" + "," +
                "'" + this.getContato()+ "'" + "," +
                "'" + this.getEmail()+ "'" + "," +
                "'" + this.getTelefone()+ "'" + "," +
                "'" + this.getInstitucional() + "'" + "," +
                "'" + this.getLogo_nome() + "'" + "," +
                "'" + this.getImagens_emp() + "'" +
                ")";
    }      
    
    private String UpdateSQL()
    {
        return 
             "UPDATE Empresa SET " +
                
                "tipo='" + this.getTipo() + "'" + "," +
                "nome='" + this.getNome() + "'" + "," +
                "nomeFantasia='" + this.getNomeFantasia() + "'" + "," +
                "cnpj='" + this.getCnpj() + "'" + "," +
                "ie='" + this.getIe() + "'" + "," +
                "atividade='" + this.getAtividade() + "'" + "," +
                "contato='" + this.getContato()+ "'" + "," +
                "email='" + this.getEmail()+ "'" + "," +
                "telefone='" + this.getTelefone()+ "'" + "," +
                "institucional='" + this.getInstitucional() + "'" + "," +
                "logo_nome='" + this.getLogo_nome() + "'" + "," +
                "imagens_emp='" + this.getImagens_emp() + "'" + " " +
                
            "WHERE " +
                "id_empresa = " + this.getId_empresa();
                
                
    }  

    List<Usuario> GetListUsuarios() { return getUsuarios(); };
    List<Produto> GetListProdutos() { return getProdutos(); };
    List<Parceria> GetListParcerias() { return getParcerias(); };
    List<Orcamento> GetListOrcamentos() { return getOrcamentos(); };
            
    public String Validar()
    {
        String sResult = "";
        
        if ( this.getTipo().trim().equals("") )
            return "Tipo deve ser informado";
        
        if ( this.getNome().trim().equals("") )
            return "Nome deve ser informado";
        
        if ( this.getCnpj().trim().equals("") )
            return "CNPJ deve ser informado";
                   
        return sResult;
    }
    
    public String Gravar()
    {
        String[] Result = new String[1];
        Result[0] = "";
        
        String sQuery = 
                    "SELECT id_empresa FROM Empresa " + 
                    "WHERE " +
                        "RTRIM(cnpj) = '" + this.getCnpj() + "'";
                
        ConexaoDB ConexaoSQL = new ConexaoDB();                                
                
         try
         {                                                   
            Connection Conexao = ConexaoSQL.CriarConexao(Result);                          
             
            Statement c = Conexao.createStatement();
            
            java.sql.ResultSet Consulta;                        
                                                                    
            Consulta = c.executeQuery(sQuery);           
            
            if ( !Consulta.next() )
            {                    
                                
                Result[0] = ConexaoSQL.ExecutarComando(this.InsertSQL());                   
                
                if (Result[0].equals("Ok"))
                    Result[0] = Result[0].concat("_i");
                
                Statement c1 = Conexao.createStatement();
                java.sql.ResultSet Consulta1;                        
                Consulta1 = c1.executeQuery(sQuery);           
                Consulta1.next();
                this.setId_empresa(Consulta1.getInt("id_empresa"));
                
            }
            else
            {
                
                this.setId_empresa(Consulta.getInt("id_empresa"));
                                
                Result[0] = ConexaoSQL.ExecutarComando(this.UpdateSQL());
                
                if (Result[0].equals("Ok"))
                    Result[0] = Result[0].concat("_a");
                            
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
    
    public String ConsultaEmpresa(String sCodigo, String sNome, int IdEmpresa){
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
                    "EMP.id_empresa, EMP.tipo, EMP.nome, EMP.nomeFantasia, " +
                    "EMP.cnpj, EMP.ie, EMP.atividade, EMP.institucional, " +
                    "EMP.contato, EMP.email, EMP.telefone, " +
                    "EDR.rua, EDR.numero, EDR.bairro, EDR.cidade, " +
                    "EDR.estado, EDR.cep, EDR.pais, EDR.complemento " +
                    "FROM Empresa AS EMP LEFT JOIN Endereco AS EDR " +
                    "ON (EMP.id_empresa = EDR.id_empresa)";
                                                        
            String sCondBusca = "";
            
            
            if (IdEmpresa > 0) {
            
                sCondBusca += DataBase.Function.ClauseSQL(bWhere) + " EMP.id_empresa <> " + "'" + IdEmpresa + "'";
                bWhere = true;
                
            }
            
            if (sNome != null) {
                if (!sNome.equals("")) {
                    sCondBusca += DataBase.Function.ClauseSQL(bWhere) + "(( EMP.nome LIKE " + "'%" + sNome + "%')";
                    sCondBusca +=  " OR ( EMP.nomeFantasia LIKE " + "'%" + sNome + "%'))";
                }
            }
                        
            Consulta = c.executeQuery(sQuery + sCondBusca);          
                         
            if ( Consulta.isClosed() )
            {     
                  this.setCodigo("0"); //Nenhum resultado encontrado
                  Result[0] = "Nenhum resultado encontrado!";
            }
            else
            {                
                  this.setCodigo("1"); //Consulta retornou dados                  
                  Result[0] = "{ Empresa:" + Function.ResultSetConverter.convert( Consulta ) + "}";
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

    public String ListaEmpresasParceiras(int idEmpresa){
        String[] Result = new String[1];    
        Result[0] = "";                
                
        ConexaoDB ConexaoSQL = new ConexaoDB();                                
                
         try
         {                                                   
            Connection Conexao = ConexaoSQL.CriarConexao(Result);                          
             
            Statement c = Conexao.createStatement();
            
            java.sql.ResultSet Consulta;                        
                
            String sQuery = 
                    
                    "SELECT Parceria.id_empresaparceira as id, " +
                    "EMP.tipo, EMP.nome, EMP.nomeFantasia, " +
                    "EMP.cnpj, EMP.ie, EMP.atividade, EMP.institucional, " +
                    "EMP.contato, EMP.email, EMP.telefone, " +
                    "EDR.rua, EDR.numero, EDR.bairro, EDR.cidade, " +
                    "EDR.estado, EDR.cep, EDR.pais, EDR.complemento " +
                    "FROM (Empresa AS EMP LEFT JOIN Endereco AS EDR " +
                        "ON (EMP.id_empresa = EDR.id_empresa)) " +
                        "INNER JOIN Parceria ON Parceria.id_empresaparceira = EMP.id_empresa " +
                    "WHERE Parceria.id_empresa = " + idEmpresa + " " +
                    "ORDER BY nome";
                                                        
            Consulta = c.executeQuery(sQuery);           
                         
            
            if ( Consulta.isClosed() )
            {     
                  this.setCodigo("0"); //Nenhum resultado encontrado
                  Result[0] = "Nenhum resultado encontrado!";
            }
            else
            {                
                  this.setCodigo("1"); //Consulta retornou dados                  
                  Result[0] = "{Empresa:" + Function.ResultSetConverter.convert( Consulta ) + "}";
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
     * @return the nome
     */
    public String getNome() {
        return nome;
    }

    /**
     * @param nome the nome to set
     */
    public void setNome(String nome) {
        this.nome = nome;
    }

    /**
     * @return the nomeFantasia
     */
    public String getNomeFantasia() {
        return nomeFantasia;
    }

    /**
     * @param nomeFantasia the nomeFantasia to set
     */
    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    /**
     * @return the cnpj
     */
    public String getCnpj() {
        return cnpj;
    }

    /**
     * @param cnpj the cnpj to set
     */
    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    /**
     * @return the ie
     */
    public String getIe() {
        return ie;
    }

    /**
     * @param ie the ie to set
     */
    public void setIe(String ie) {
        this.ie = ie;
    }

    /**
     * @return the atividade
     */
    public String getAtividade() {
        return atividade;
    }

    /**
     * @param atividade the atividade to set
     */
    public void setAtividade(String atividade) {
        this.atividade = atividade;
    }

    /**
     * @return the institucional
     */
    public String getInstitucional() {
        return institucional;
    }

    /**
     * @param institucional the institucional to set
     */
    public void setInstitucional(String institucional) {
        this.institucional = institucional;
    }

    /**
     * @return the logo_nome
     */
    public String getLogo_nome() {
        return logo_nome;
    }

    /**
     * @param logo_nome the logo_nome to set
     */
    public void setLogo_nome(String logo_nome) {
        this.logo_nome = logo_nome;
    }

    /**
     * @return the imagens_emp
     */
    public String getImagens_emp() {
        return imagens_emp;
    }

    /**
     * @param imagens_emp the imagens_emp to set
     */
    public void setImagens_emp(String imagens_emp) {
        this.imagens_emp = imagens_emp;
    }

    /**
     * @return the usuarios
     */
    public List<Usuario> getUsuarios() {
        return usuarios;
    }

    /**
     * @param usuarios the usuarios to set
     */
    public void setUsuarios(List<Usuario> usuarios) {
        this.usuarios = usuarios;
    }

    /**
     * @return the produtos
     */
    public List<Produto> getProdutos() {
        return produtos;
    }

    /**
     * @param produtos the produtos to set
     */
    public void setProdutos(List<Produto> produtos) {
        this.produtos = produtos;
    }

    /**
     * @return the parcerias
     */
    public List<Parceria> getParcerias() {
        return parcerias;
    }

    /**
     * @param parcerias the parcerias to set
     */
    public void setParcerias(List<Parceria> parcerias) {
        this.parcerias = parcerias;
    }

    /**
     * @return the orcamentos
     */
    public List<Orcamento> getOrcamentos() {
        return orcamentos;
    }

    /**
     * @param orcamentos the orcamentos to set
     */
    public void setOrcamentos(List<Orcamento> orcamentos) {
        this.orcamentos = orcamentos;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public String getContato() {
        return contato;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
    
}
