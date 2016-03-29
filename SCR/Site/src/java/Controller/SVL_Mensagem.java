/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Controller;

import Model.AtualizaDadosResult;
import Model.Mensagem;
import Model.Parceria;
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
 * @author Douglas
 */
public class SVL_Mensagem extends HttpServlet {

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

            Mensagem  DadosMensagem = new Mensagem();

            try
            {   
                String sDataIni = "";
                String sDataFin = "";
                int tipo = -1;
                int status = -1;
                int idEmpresaParceira = 0;                                                  
                
                if (request.getParameter("DataIni")!=null)
                    sDataIni = request.getParameter("DataIni").toString();
                
                if (request.getParameter("DataFin")!=null)
                    sDataFin = request.getParameter("DataFin").toString();

                if ( (request.getParameter("tipo")!=null) && (request.getParameter("tipo")!="") )
                    tipo = Integer.parseInt(request.getParameter("tipo").toString());

                if ( (request.getParameter("status")!=null) && (request.getParameter("status")!="") )
                    status = Integer.parseInt(request.getParameter("status").toString());  
                
                if ( (request.getParameter("idEmpresaParceira")!=null) && (request.getParameter("idEmpresaParceira")!="") )
                    idEmpresaParceira = Integer.parseInt(request.getParameter("idEmpresaParceira").toString());                
                
                HttpSession session = request.getSession(true);
                    
                int idEmpresa = Integer.parseInt(session.getAttribute("CompanyID").toString());                
                
                jsonObject =                         
                     DadosMensagem.ConsultaMensagem(idEmpresa, 
                                                    tipo, 
                                                    sDataIni,
                                                    sDataFin,
                                                    status, 
                                                    idEmpresaParceira);
                        
                        
            }
            catch(Exception e)
            {        
               jsonObject =
               "[{id: 0, Code: 0, Produto: [], Msg: 'Erro Interno do Servidor!' }]";               
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
                
                Mensagem  Msg = new Mensagem();                

                String Erro = "";
                String sNsgValida = "";
                String sResultado = "";
                
                try
                {                               
                    GsonBuilder gsonBuilder = new GsonBuilder();
                    Gson gsonFrom = gsonBuilder.create();                                        
                    
                    //Transforma requisição Json em Objeto
                    Msg = gsonFrom.fromJson( request.getParameter("Mensagem"), Msg.getClass());                                                                          
                    
                    AtualizaDadosResult[] Result = new AtualizaDadosResult[1];

                    sNsgValida = "";

                    Result[0] = new AtualizaDadosResult();
                    
                    if (!sNsgValida.equals("")) //Dados inválidos
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
                        
                        sResultado = Msg.Enviar();                                     

                        if ( sResultado.equals("Ok") )
                        {
                            
                            //if (request.getParameter("aceitarparceria").equals("1")) {
                            if (Msg.getAceitarparceria().equals("1")) {
                            
                                Parceria parc = new Parceria();
                                
                                parc.setId_empresa(Msg.getId_empresa_origem());
                                parc.setId_empresaparceira(Msg.getId_empresa_destino());
                                
                                sResultado = parc.AceitarParceria();
                                
                            }
                            
                            Result[0].setId(0);
                            Result[0].setCode(1);//Atualização Ok
                            Result[0].setMsg( "Mensagem enviada com sucesso!" );
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
