/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

/**
 *
 * @author Douglas
 */
public class CommunicationModel {
    private int id;
    private String UpdateOperation;
    private String ClassName;

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
     * @return the UpdateOperation
     */
    public String getUpdateOperation() {
        return UpdateOperation;
    }

    /**
     * @param UpdateOperation the UpdateOperation to set
     */
    public void setUpdateOperation(String UpdateOperation) {
        this.UpdateOperation = UpdateOperation;
    }

    /**
     * @return the ClassName
     */
    public String getClassName() {
        return ClassName;
    }

    /**
     * @param ClassName the ClassName to set
     */
    public void setClassName(String ClassName) {
        this.ClassName = ClassName;
    }
}
