/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import DataBase.ConexaoDB;
import java.sql.Connection;
import java.sql.Statement;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Douglas
 */
public class Usuario {
    
    private int id;    
    private int id_usuario;
    private String nome;
    private String departamento;
    private String login;
    private String senha;
    private Date datacadastro;
    private int id_empresa;
    private String nomeempresa;
    private String email;
    private String cargo;

    
    public Boolean Login( String Usuario, String Senha, HttpServletRequest request  )
    {
        String[] Result = new String[1];
        Result[0] = "";

        ConexaoDB ConexaoSQL = new ConexaoDB();

        try {
            Connection Conexao = ConexaoSQL.CriarConexao(Result);

            Statement c = Conexao.createStatement();

            java.sql.ResultSet Consulta;

            String sQuery
                    = "SELECT id_usuario as id, Usuario.nome, departamento, login, senha, datacadastro, " + 
                             " Usuario.id_empresa, Usuario.email, cargo, Empresa.nome AS NomeEmpresa FROM Usuario " +
                             
                                "LEFT JOIN Empresa ON Empresa.id_empresa = Usuario.id_Empresa " +
                    
                            "WHERE " +
                                "login = '" + Usuario + "' AND " +
                                "senha = '" + Senha + "'";        
        
            Consulta = c.executeQuery(sQuery);

            if (! Consulta.next()) {
                return false;
            } else {
                
                this.setId_usuario(Consulta.getInt("id"));
                this.setId_empresa(Consulta.getInt("id_empresa"));
                this.setNome(Consulta.getString("nome"));
                this.setNomeempresa(Consulta.getString("NomeEmpresa"));
                
                IniciaSessao(request);
                
                return true;                
            }            
            
        } catch (Exception e) {
            return false;            
        }            
    }
    
    public void IniciaSessao( HttpServletRequest request )
    {
        HttpSession session = request.getSession(true);

        if (session.getAttribute("UserID")!=null)
            if ( Integer.parseInt(session.getAttribute("UserID").toString()) != this.getId_usuario() ) 
            {                
               request.getSession(true);
            }
        
        session.setAttribute( "UserID", this.id_usuario);
        session.setAttribute( "UserName", this.getNome());
        session.setAttribute( "CompanyID", this.getId_empresa());            
        session.setAttribute( "CompanyName", this.getNomeempresa());
        session.setAttribute( "UserSessionID", session.getId());

    }
    
    public void EncerraSessao( HttpServletRequest request )
    {
        HttpSession session = request.getSession();
        session.invalidate();   
    }
    
    public String InsertSQL()
    {
        return                  
        "INSERT INTO Usuario(nome,departamento,login,senha,datacadastro,id_empresa,email,cargo)" +
            " VALUES (" +
                "'" + this.getNome()+ "'," +
                "'" + this.getDepartamento()+ "'," +
                "'" + this.getLogin()+ "'," +
                "'" + this.getSenha()+ "'," +
                "GetDate()" + "," +
                "NULL" + "," +
                "'" + this.getEmail() + "'" + "," +
                "'" + this.getCargo()+ "'" + ")";
    }      
    
    public String ValidaUsuario() {
        String sResult = "";

        if (this.nome.trim().equals("")) {
            return "Nome deve ser informado";
        }

        if (this.login. trim().equals("")) {
            return "Login deve ser informada";
        }

        if (this.senha. trim().equals("")) {
            return "Senha deve ser informada";
        }        
        
        return sResult;
    }    
    
    public String UpdateSQL()
    {
        return 
             "UPDATE Usuario SET " +
                
                "nome='" + this.getNome()+ "'," +
                "departamento='" + this.getDepartamento() +  "'," +
                "cargo='" + this.getCargo() +  "'," +
                "Login='" + this.getLogin() +  "'," +
                "Senha='" + this.getSenha() +  "'," +
                "Email='" + this.getEmail() +  "' " +
                                                
             " WHERE " +
                "id_usuario = " + this.getId_usuario();                          
    }    
        
    public String GravaUsuario() {
        String[] Result = new String[1];
        Result[0] = "";

        ConexaoDB ConexaoSQL = new ConexaoDB();

        try {
            Connection Conexao = ConexaoSQL.CriarConexao(Result);

            Statement c = Conexao.createStatement();

            java.sql.ResultSet Consulta;

            String sQuery
                    = "SELECT id_usuario FROM Usuario "
                    + "WHERE "                    
                    + "id_usuario = '" + this.id_usuario + "'";

            Consulta = c.executeQuery(sQuery);

            if (!Consulta.next()) {
                Result[0] = ConexaoSQL.ExecutarComando(this.InsertSQL());
            } else {
                Result[0] = ConexaoSQL.ExecutarComando(UpdateSQL());
            }

            Conexao.close();
            c.close();

            return Result[0];

        } catch (Exception e) {
            this.setId(-1);
            return e.getMessage();
        }
    } 
       
    public String ConsultarUsuario() {
        String[] Result = new String[1];
        Result[0] = "";
        Boolean bWhere = false;

        ConexaoDB ConexaoSQL = new ConexaoDB();

        try {
            Connection Conexao = ConexaoSQL.CriarConexao(Result);

            Statement c = Conexao.createStatement();

            java.sql.ResultSet Consulta;

            String sQuery
                    = "SELECT id_usuario as id, Usuario.nome, departamento, login, senha, datacadastro, " + 
                             " Usuario.id_empresa, Usuario.email, cargo FROM Usuario ";

            sQuery += "LEFT JOIN Empresa ON Empresa.id_empresa = Usuario.id_empresa ";
            
            String sCondBusca = "";
           
            if (this.id_empresa != 0) {
                sCondBusca += DataBase.Function.ClauseSQL(bWhere) + " Usuario.id_empresa = " + id_empresa;
                bWhere = true;
            }            
            
            if (this.id_usuario != 0) {
                sCondBusca += DataBase.Function.ClauseSQL(bWhere) + " id_usuario = " + id_usuario;
                bWhere = true;
            }

            if (this.nome != null) {
                if (!this.nome.equals("")) {
                    sCondBusca += DataBase.Function.ClauseSQL(bWhere) + " Usuario.nome = " + "'" + this.nome + "'";
                    bWhere = true;
                }
            }           

            if (this.departamento != null) {
                if (!this.departamento.equals("")) {
                    sCondBusca += DataBase.Function.ClauseSQL(bWhere) + " departamento = " + "'" + this.departamento + "'";
                    bWhere = true;
                }
            }             
            
            if (this.login != null) {
                if (!this.login.equals("")) {
                    sCondBusca += DataBase.Function.ClauseSQL(bWhere) + " login = " + "'" + this.login + "'";
                    bWhere = true;
                }
            }   
            
            if (this.senha != null) {
                if (!this.senha.equals("")) {
                    sCondBusca += DataBase.Function.ClauseSQL(bWhere) + " senha = " + "'" + this.senha + "'";
                    bWhere = true;
                }
            }  
            
            if (this.cargo != null) {
                if (!this.cargo.equals("")) {
                    sCondBusca += DataBase.Function.ClauseSQL(bWhere) + " cargo = " + "'" + this.cargo + "'";
                }
            }             
            
            Consulta = c.executeQuery(sQuery + sCondBusca);

            if (Consulta.isClosed()) {
                this.setId(0); //Nenhum resultado encontrado
                Result[0]
                        = "[{id: 0, Code: 0, Usuario: [], Msg: 'Nenhum resultado encontrado!' }]";
            } else {
                this.setId(1); //Consulta retornou dados                  
                Result[0] = "{ Usuario:" + Function.ResultSetConverter.convert(Consulta) + "}";
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
     * @return the id_usuario
     */
    public int getId_usuario() {
        return id_usuario;
    }

    /**
     * @param id_usuario the id_usuario to set
     */
    public void setId_usuario(int id_usuario) {
        this.id_usuario = id_usuario;
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
     * @return the departamento
     */
    public String getDepartamento() {
        return departamento;
    }

    /**
     * @param departamento the departamento to set
     */
    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    /**
     * @return the login
     */
    public String getLogin() {
        return login;
    }

    /**
     * @param login the login to set
     */
    public void setLogin(String login) {
        this.login = login;
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
     * @return the datacadastro
     */
    public Date getDatacadastro() {
        return datacadastro;
    }

    /**
     * @param datacadastro the datacadastro to set
     */
    public void setDatacadastro(Date datacadastro) {
        this.datacadastro = datacadastro;
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
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
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
     * @return the cargo
     */
    public String getCargo() {
        return cargo;
    }

    /**
     * @param cargo the cargo to set
     */
    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    /**
     * @return the nomeempresa
     */
    public String getNomeempresa() {
        return nomeempresa;
    }

    /**
     * @param nomeempresa the nomeempresa to set
     */
    public void setNomeempresa(String nomeempresa) {
        this.nomeempresa = nomeempresa;
    }
    
}
