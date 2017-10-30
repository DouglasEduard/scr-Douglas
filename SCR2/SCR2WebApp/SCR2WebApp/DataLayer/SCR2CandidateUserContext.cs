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
    public class SCR2CandidateUserContext : SCR2_DBEntities
    {
        public void Add(CandidateUserDetail newUser)
        {
            CandidateUser user = new CandidateUser();

            user.ID = System.Guid.NewGuid();
            user.CandidateUserName = newUser.Name;
            user.CandidateUserEMail = newUser.EMail;

            var db = new SCR2_DBEntities();
            db.CandidateUser.Add(user);
            db.SaveChanges();
        }
    }
}