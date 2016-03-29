/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Controller;

import Model.AtualizaDadosResult;
import Model.Orcamento;
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
public class SVL_Orcamento extends HttpServlet {

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

            Orcamento  DadosOrcamento = new Orcamento();

            try
            {   
                String sDataIni = "";
                String sDataFin = "";
                int iEmpresaSolicID = -1;
                int iOrcamentoID = -1;
                Boolean bElaboracao = false;
                
                if ( (request.getParameter("Op")!=null) && 
                     (request.getParameter("Op").toString().equals("Elab")) ) //LP - Lista de parcerias
                    bElaboracao = true;                                    
                
                if (request.getParameter("DataIni")!=null)
                    sDataIni = request.getParameter("DataIni").toString();
                
                if (request.getParameter("DataFin")!=null)
                    sDataFin = request.getParameter("DataFin").toString();

                if ( (request.getParameter("idEmpresaSolic")!=null) && (request.getParameter("idEmpresaSolic")!="") )
                    iEmpresaSolicID = Integer.parseInt(request.getParameter("idEmpresaSolic").toString());

                if ( (request.getParameter("OrcamentoID")!=null) && (request.getParameter("OrcamentoID")!="") )
                    iOrcamentoID = Integer.parseInt(request.getParameter("OrcamentoID").toString());                
                
                HttpSession session = request.getSession(true);
                    
                int idEmpresa = Integer.parseInt(session.getAttribute("CompanyID").toString());                
                
                jsonObject = 
                        DadosOrcamento.ConsultaOrcamento(
                        idEmpresa, iEmpresaSolicID,
                        sDataIni,
                        sDataFin,
                        iOrcamentoID,
                        bElaboracao,
                        session.getAttribute("UserName").toString()
                        );                                                                                                                
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
                
                Orcamento  DadosOrcamento = new Orcamento();                

                String Erro = "";
                String sNsgValida = "";
                String sResultado = "";
                
                try
                {                               
                    GsonBuilder gsonBuilder = new GsonBuilder();
                    Gson gsonFrom = gsonBuilder.create();                                        

                    Boolean bElaboracao = false;
                    
                    bElaboracao =
                        ( (request.getParameter("op")!=null) && 
                          (request.getParameter("op").toString().equals("ElabOrcSave")) );                   
                    
                    //Transforma requisição Json em Objeto
                    DadosOrcamento = gsonFrom.fromJson( request.getParameter("Orcamento"), DadosOrcamento.getClass());                                  
                                        
                    if (bElaboracao)
                        DadosOrcamento.getFromDataBase( Integer.parseInt(request.getParameter("id_orcamento").toString()));                    
                    
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
                        if (!bElaboracao)
                            sResultado = DadosOrcamento.SolicitarOrcamento();                            
                        else      
                        {
                            HttpSession session = request.getSession(true);
                            int idUser = Integer.parseInt(session.getAttribute("UserID").toString());
                            
                            String sUsuarioNome = session.getAttribute("UserName").toString();
                            DadosOrcamento.setUsuario_elaboracao_nome(sUsuarioNome);
                                    
                            DadosOrcamento.setId_usuario_elaboracao(idUser);                            
                            sResultado = DadosOrcamento.GravaElabOrcamento();
                        }                            

                        if ( sResultado.equals("Ok") )
                        {
                            Result[0].setId(0);
                            Result[0].setCode(1);//Atualização Ok
                            Result[0].setMsg( "Solicita&ccedil;&atilde;o de orçamento enviada com sucesso!" );
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
