package Controller;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

import Model.AtualizaDadosResult;
import Model.CommunicationModel;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Douglas
 */
public class SVL_Atualiza extends HttpServlet {

    /**
     * Processes requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();                
         
        //String login = request.getParameter("login");
        //String senha = request.getParameter("senha");                       
        
        try {                                                                      
            response.setContentType("application/json");
                        
            Gson gson = new Gson();            
                                    
            String jsonObject = "";
            
            //CommunicationModel DadosReq = new CommunicationModel();
            AtualizaDadosResult[] Result = new AtualizaDadosResult[1];
            
            String Erro = "";
            
            try
            {                               
                GsonBuilder gsonBuilder = new GsonBuilder();
                Gson gsonFrom = gsonBuilder.create();
                
                //DadosReq = gsonFrom.fromJson( request.getParameter("CommunicationModel").toString(), DadosReq.getClass());                                  
                    
                
                Result[0] = new AtualizaDadosResult();
                
                Result[0].setId(0);
                Result[0].setCode(0);
                Result[0].setMsg( request.toString() );                                   
                                               
                jsonObject = gson.toJson(Result);
            }
            catch(Exception e)
            {
                if (Erro.toString() == "")
                    Erro = e.toString();                
            }            
             
            if (jsonObject.toString() == "")
                jsonObject = "[{id: 0, Code: 0, Msg: '" + Erro + "' }]" ;
            
            out.print(jsonObject);
            out.flush();                    
            
        } finally {            
            out.close();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP
     * <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP
     * <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
