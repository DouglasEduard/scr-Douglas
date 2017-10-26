using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SCR2WebApp.Service;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using SCR2WebApp.Models;

namespace SCR2WebApp.DataLayer
{
    public class SCR2CompanyContext : SCR2_DBEntities
    {
        public void Add(CompanyDetail company)
        {
            Company c = new Company();

            c.ID = System.Guid.NewGuid();
            c.CompanyName = company.CompanyName;
            c.CompanyID = company.CompanyId;

            var db = new SCR2_DBEntities();
            db.Company.Add(c);
            db.SaveChanges();
        }
    }
}