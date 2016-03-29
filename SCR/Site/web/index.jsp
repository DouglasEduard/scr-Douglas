<%-- 
    Document   : index
    Created on : Mar 16, 2013, 10:56:33 PM
    Author     : Douglas
--%>


<%@page import="Model.Usuario"%>
<%    
out.println ("<!DOCTYPE html>");
out.println ("<html>");
out.println ("<head>");

    out.println (
            "<style> " +
               ".red-row .x-grid-cell { " +
               "background-color: #DBA3A3 !important; " +
               "} " +
           "</style> "
        );

    Usuario user = new Usuario();    

    if ( session.getAttribute("UserName") == null )
        out.println ("<Script>alert(\"Sessão expirada ou inválida!\"); window.location=\"Login.jsp\";</Script>");
    else
    {        
        out.println ("<meta charset=utf-8 />");
        out.println ("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />");
        out.println ("<title>Supply Me</title>");

        out.println ("<link rel=\"stylesheet\" type=\"text/css\" href=\"extjs/resources/css/ext-all.css\" />");
        out.println ("<link rel=\"stylesheet\" type=\"text/css\" href=\"extjs/examples/portal/portal.css\" />");

        out.println ("<script type=\"text/javascript\" src=\"extjs/ext-all.js\"></script>");


        out.println ("<script type=\"text/javascript\" src=\"extjs/examples/shared/examples.js\"></script>");
        out.println ("<script type=\"text/javascript\" src=\"extjs/examples/portal/classes.js\"></script>");
        out.println ("<script type=\"text/javascript\" src=\"JS/portalSCR.js\"></script>");                 
        out.println ("<script type=\"text/javascript\" src=\"JS/form/CadastrarProduto.js\"></script>");
        out.println ("<script type=\"text/javascript\" src=\"JS/form/CadastrarEmpresa.js\"></script>"); 
        out.println ("<script type=\"text/javascript\" src=\"JS/form/ConsultaEmpresa.js\"></script>"); 
        out.println ("<script type=\"text/javascript\" src=\"JS/form/ConsultaProduto.js\"></script>"); 
        out.println ("<script type=\"text/javascript\" src=\"JS/form/ConsultaProdutoParceiro.js\"></script>"); 
        out.println ("<script type=\"text/javascript\" src=\"JS/Model/Produto.js\"></script>");    
        out.println ("<script type=\"text/javascript\" src=\"JS/Model/Empresa.js\"></script>"); 
        out.println ("<script type=\"text/javascript\" src=\"JS/Model/Usuario.js\"></script>"); 
        out.println ("<script type=\"text/javascript\" src=\"JS/Model/Orcamento.js\"></script>");
        out.println ("<script type=\"text/javascript\" src=\"JS/Model/Mensagem.js\"></script>");
        out.println ("<script type=\"text/javascript\" src=\"JS/Model/SolicitacaoParceria.js\"></script>");
        out.println ("<script type=\"text/javascript\" src=\"JS/form/ManterUsuario.js\"></script>"); 
        out.println ("<script type=\"text/javascript\" src=\"JS/form/SolicitarOrcamento.js\"></script>"); 
        out.println ("<script type=\"text/javascript\" src=\"JS/form/ElaborarOrcamento.js\"></script>");
        out.println ("<script type=\"text/javascript\" src=\"JS/form/ManterMensagem.js\"></script>");

        out.println ("<script type=\"text/javascript\">");

            out.println ("Ext.Loader.setPath('Ext.app', 'classes');");

            out.println ("Ext.require([");
                out.println ("'Ext.layout.container.*',");
                out.println ("'Ext.resizer.Splitter',");
                out.println ("'Ext.fx.target.Element',");
                out.println ("'Ext.fx.target.Component',");
                out.println ("'Ext.window.Window',");
                out.println ("'Ext.app.Portlet',");
                out.println ("'Ext.app.PortalColumn',");
                out.println ("'Ext.app.PortalPanel',");
                out.println ("'Ext.app.Portlet',");
                out.println ("'Ext.app.PortalDropZone',");
                out.println ("'Ext.app.GridPortlet',");
                out.println ("'Ext.app.CadastrarEmpresa',");
                out.println ("'Ext.app.CadastrarProduto',");
                out.println ("'Ext.app.ConsultaProduto',");
                out.println ("'Ext.app.ConsultaProdutoParceiro',");
                out.println ("'Ext.app.ManterUsuario',");
                out.println ("'Ext.app.SolicitarOrcamento',");
                out.println ("'Ext.app.ElaborarOrcamento',");                
                out.println ("'Ext.app.ManterMensagem'"); 
                
            out.println ("]);");

            out.println ("Ext.onReady(function(){");            
                out.println ("Ext.create('Ext.app.PortalSCR'," + 
                                            "'" + session.getAttribute("UserName") + "'," +
                                            "'" + session.getAttribute("UserID") + "'," +
                                            "'" + session.getAttribute("CompanyID") + "'," +
                                            "'" + session.getAttribute("CompanyName") + "'" +
                                         " );");
            out.println ("});");

        out.println ("</script>");
    }
out.println ("</head>");
out.println ("<body>");
    out.println ("<span id=\"app-msg\" style=\"display:none;\"></span>");
out.println ("</body>");
out.println ("</html>");
%>