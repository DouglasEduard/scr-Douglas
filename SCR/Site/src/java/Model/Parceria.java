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
 * @author Alex
 */
public class Parceria {
    
    private int id;
    private int id_parceria;
    private int id_empresa;
    private int id_empresaparceira;
    
    public String AceitarParceria() {
    
        String[] Result = new String[1];
        Result[0] = "";

        ConexaoDB ConexaoSQL = new ConexaoDB();

        try {
                        
            String ValidacaoParceria = ValidaParceria();

            if (ValidacaoParceria.equals("")) {
                Result[0] = ConexaoSQL.ExecutarComando(this.InsertSQL());
            } else {
                Result[0] = ValidacaoParceria;
            }

            return Result[0];

        } catch (Exception e) {
            this.setId(-1);
            return e.getMessage();
        }
    
    }
    
    public String InsertSQL() {
        
        return "INSERT INTO Parceria (id_empresa, id_empresaparceira) VALUES ("
                + this.getId_empresa() + ","
                + this.getId_empresaparceira() + ")";
        
    }
    
    public String ValidaParceria() {
        
        String sRetorno = "";
        
        if (this.getId_empresa() != this.getId_empresaparceira()) {
            sRetorno = "Erro";
        }
        
        return sRetorno;
            
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

    public int getId_empresa() {
        return id_empresa;
    }

    public void setId_empresa(int id_empresa) {
        this.id_empresa = id_empresa;
    }

    public int getId_empresaparceira() {
        return id_empresaparceira;
    }

    public void setId_empresaparceira(int id_empresaparceira) {
        this.id_empresaparceira = id_empresaparceira;
    }
    
    
    
}
