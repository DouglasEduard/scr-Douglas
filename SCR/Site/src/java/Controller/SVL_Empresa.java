package Controller;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

import Model.Empresa;
import Model.AtualizaDadosResult;
import Model.Endereco;
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
public class SVL_Empresa extends HttpServlet {

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

            Gson gson = new Gson();            

            String jsonObject = "";

            Empresa  DadosEmpresa = new Empresa();


            String Erro = "";
            String sNsgValida = "";
            String sResultado = "";

            try
            {    
                String sdata = "";
                
                HttpSession session = request.getSession(true);
                     
                int idEmpresa = Integer.parseInt(session.getAttribute("CompanyID").toString());
                
                if ( (request.getParameter("Op")!=null) && 
                     (request.getParameter("Op").toString().equals("LP")) ) //LP - Lista de parcerias
                {
                    sdata = DadosEmpresa.ListaEmpresasParceiras(idEmpresa);
                }
                else
                {
                    String CodigoEmp = request.getParameter("CodigoEmp");
                    String DescEmp = request.getParameter("DescEmp");
                    sdata = DadosEmpresa.ConsultaEmpresa(CodigoEmp, DescEmp, idEmpresa);
                }
                        
                if ( DadosEmpresa.getId() == -1 ) //Erro
                    Erro = sdata;
                else
                {                                                     
                    jsonObject = sdata; 
                }                                                             
            }
            catch(Exception e)
            {
                if (Erro.equals(""))
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
        
        processRequest(request, response);
        
        PrintWriter out = response.getWriter();

            try {   
                response.setContentType("application/json");

                Gson gson = new Gson();            

                String jsonObject = "";
                
                Empresa  DadosEmpresa;                
                                        
                String Erro = "";
                String sNsgValida = "";
                String sResultado = "";
                String sResultado2 = "";
                
                try
                {                               
                    GsonBuilder gsonBuilder = new GsonBuilder();
                    Gson gsonFrom = gsonBuilder.create();                                        

                    //Transforma requisição Json em Objeto
                    DadosEmpresa = new Empresa();
                    DadosEmpresa = gsonFrom.fromJson(request.getParameter("Empresa").toString(), DadosEmpresa.getClass());                                  
                    DadosEmpresa.setEndereco(new Endereco());
                    DadosEmpresa.setEndereco(gsonFrom.fromJson(request.getParameter("Empresa").toString(), DadosEmpresa.getEndereco().getClass()));
                    
                    AtualizaDadosResult[] Result = new AtualizaDadosResult[1];

                    //Valida dados
                    sNsgValida = DadosEmpresa.Validar();

                    Result[0] = new AtualizaDadosResult();

                    if (!sNsgValida.equals("")) //Dados inváidos
                    {
                        Result[0].setId(0);
                        Result[0].setCode(2); 
                        Result[0].setMsg( sNsgValida );   
                    }
                    else
                    {
                        
                        sResultado = DadosEmpresa.Gravar();
                        String r = sResultado.substring(0, 2);
                        if ( r.equals("Ok") ) {
                            DadosEmpresa.getEndereco().setId_empresa(DadosEmpresa.getId_empresa());
                            sResultado2 = DadosEmpresa.getEndereco().Gravar();
                        }
                                                    
                        if ( sResultado2.equals("Ok") )
                        {
                            Result[0].setId(0);
                            
                            if ( sResultado.equals("Ok_i") )
                                Result[0].setCode(1);//Inserção Ok
                            else
                                Result[0].setCode(4);//Alteração Ok
                            
                            Result[0].setMsg( "Dados da empresa atualizados com sucesso!" );
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
                    if (Erro.equals(""))
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
