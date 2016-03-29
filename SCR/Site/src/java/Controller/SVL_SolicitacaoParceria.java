package Controller;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

import Model.SolicitacaoParceria;
import Model.AtualizaDadosResult;
import Model.Mensagem;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Alex
 */
public class SVL_SolicitacaoParceria extends HttpServlet {

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
        //response.setContentType("text/html;charset=UTF-8");
     
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
        
        PrintWriter out = response.getWriter();

        try {   
            
            response.setContentType("application/json");

            String jsonObject = "";

            SolicitacaoParceria  DadosSolicitacaoParceria = new SolicitacaoParceria();
            DadosSolicitacaoParceria.setId_empresa_snte(Integer.parseInt(request.getParameter("idEmpSte").toString()));
            DadosSolicitacaoParceria.setId_empresa_stda(Integer.parseInt(request.getParameter("idEmpSta").toString()));
            
            try
            {  
                jsonObject = DadosSolicitacaoParceria.ConsultaSolicitacaoParceira(null);                                                  
            }
            catch(Exception e)
            {        
               jsonObject =
               "[{id: 0, Code: 0, SolicitacaoParceria: [], Msg: 'Erro Interno do Servidor!' }]";               
            }           

            out.print(jsonObject);
            out.flush();                    
            
        } catch(Exception e) {
        
            e.printStackTrace();
            
        } finally {            
            out.close();
        }           
        
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
        
        PrintWriter out = response.getWriter();

            try {   
                response.setContentType("application/json");

                Gson gson = new Gson();            

                String jsonObject = "";
                
                SolicitacaoParceria  DadosSolicitacaoParceria = new SolicitacaoParceria();                
                Mensagem Msg = new Mensagem();
                
                String Erro = "";
                String sNsgValida = "";
                String sResultado = "";
                
                try
                {                               
                    GsonBuilder gsonBuilder = new GsonBuilder();
                    Gson gsonFrom = gsonBuilder.create();                                        

                    //Transforma requisição Json em Objeto
                    DadosSolicitacaoParceria = gsonFrom.fromJson( request.getParameter("SolicitacaoParceria"), DadosSolicitacaoParceria.getClass());                                  
                                        
                    AtualizaDadosResult[] Result = new AtualizaDadosResult[1];

                    sNsgValida = DadosSolicitacaoParceria.ValidaSolicitacaoParceria();

                    Result[0] = new AtualizaDadosResult();
                    
                    if (!sNsgValida.equals("")) //Dados inváidos
                    {
                        Result[0].setId(0);
                        Result[0].setCode(2); 
                        Result[0].setMsg( sNsgValida );   
                    }
                    else
                    {
                        
                        HttpSession session = request.getSession(true);
                        int idUser = Integer.parseInt(session.getAttribute("UserID").toString());
                        int idEmp = Integer.parseInt(session.getAttribute("CompanyID").toString());
                        
                        Msg.setId_empresa_origem(idEmp);
                        Msg.setId_usuario_origem(idUser);
                        Msg.setId_empresa_destino(DadosSolicitacaoParceria.getId_empresa_stda());
                        Msg.setId_assunto(2);
                        Msg.setAssunto("Solicita&ccedil;&atilde;o de Parceria");
                        Msg.setMensagem("Venho através deste solicitar uma parceria com sua empresa");
                        
                        Msg.Enviar();
                        
                        sResultado = DadosSolicitacaoParceria.SolicitarParceria();

                        if ( sResultado.equals("Ok") )
                        {
                            Result[0].setId(0);
                            Result[0].setCode(1);//Atualização Ok
                            Result[0].setMsg( "Solicitação enviada com sucesso!" );
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
