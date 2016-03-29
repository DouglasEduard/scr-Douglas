/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Controller;

import Model.AtualizaDadosResult;
import Model.Usuario;
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
public class SVL_Usuario extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
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
        
          PrintWriter out = response.getWriter();

        try {                                 
            response.setContentType("application/json");

            String jsonObject = "";

            Usuario  DadosUsuario = new Usuario();

            try
            {      
                DadosUsuario.setId(0);
                DadosUsuario.setNome(request.getParameter("nome"));
                DadosUsuario.setDepartamento(request.getParameter("departamento"));                               
                
                jsonObject = DadosUsuario.ConsultarUsuario();
            }
            catch(Exception e)
            {        
               jsonObject =
               "[{id: 0, Code: 0, Usuario: [], Msg: 'Erro Interno do Servidor!' }]";               
            }           

            out.print(jsonObject);
            out.flush();                    
            
        } finally {            
            out.close();
        }       
    }

    /**
     * Handles the HTTP <code>POST</code> method.
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
        
        PrintWriter out = response.getWriter();

            try {   
                response.setContentType("application/json");

                Gson gson = new Gson();            

                String jsonObject = "";
                
                Usuario  DadosUsuario = new Usuario();                

                String Erro = "";
                String sNsgValida;
                String sResultado;
                
                try
                {                               
                    GsonBuilder gsonBuilder = new GsonBuilder();
                    Gson gsonFrom = gsonBuilder.create();                                        

                    //Transforma requisição Json em Objeto
                    DadosUsuario = gsonFrom.fromJson( request.getParameter("Usuario"), DadosUsuario.getClass());                                  
                                        
                    AtualizaDadosResult[] Result = new AtualizaDadosResult[1];

                    sNsgValida = DadosUsuario.ValidaUsuario();

                    Result[0] = new AtualizaDadosResult();

                    if (!sNsgValida.equals("")) //Dados inváidos
                    {
                        Result[0].setId(0);
                        Result[0].setCode(2); 
                        Result[0].setMsg( sNsgValida );   
                    }
                    else
                    {
                        sResultado = DadosUsuario.GravaUsuario();

                        if ( sResultado.equals("Ok") )
                        {
                            Result[0].setId(0);
                            Result[0].setCode(1);//Atualização Ok
                            Result[0].setMsg( "Dados de usuário atualizados com sucesso!" );
                        }
                        else
                        {
                            Result[0].setId(0);
                            Result[0].setCode(3);
                            Result[0].setMsg( sResultado );                        
                        }                                        
                    }

                    jsonObject = gson.toJson(Result);                                           
                }
                catch(Exception e)
                {
                    if ( (Erro.equals("")) || ( Erro == null ))
                       Erro = e.getMessage();   
                }           
                
                if (jsonObject.equals(""))
                    jsonObject = "[{id: 0, Code: 0, Msg: '" + Erro + "' }]" ;

                out.print(jsonObject);
                out.flush();                    
            
        } finally {            
            out.close();
        }           
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
