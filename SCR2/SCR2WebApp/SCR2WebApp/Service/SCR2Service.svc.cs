using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using SCR2WebApp.Models;
using SCR2WebApp.DataLayer;

namespace SCR2WebApp.Service
{
    // OBSERVAÇÃO: Você pode usar o comando "Renomear" no menu "Refatorar" para alterar o nome da classe "SCR2Service" no arquivo de código, svc e configuração ao mesmo tempo.
    // OBSERVAÇÃO: Para iniciar o cliente de teste do WCF para testar esse serviço, selecione SCR2Service.svc ou SCR2Service.svc.cs no Gerenciador de Soluções e inicie a depuração.
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class SCR2Service : ISCR2Service
    {        
        public string DoWork()
        {
            try
            {
                CompanyDetail company = new CompanyDetail { CompanyId = "123", CompanyName = "My company" };

                SCR2CompanyContext db = new SCR2CompanyContext();

                db.Add(company);
            }
            catch(Exception e)
            {
                return "Error: " + e.Message;
            }

            return "Ok, Company saved successfully!";
        }        
    }
}
