using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SCR2WebApp.Models;
using SCR2WebApp.DataLayer;

namespace SCR2WebApp.Service
{
    public class SCR2IndexRequestsProcess
    {     
        /// <summary>
        /// Add new candidate user
        /// </summary>
        /// <param name="candidateUser"> Data received from client</param>
        /// <returns>
        ///     0 = Process error
        ///     1 = Process performed successfully
        /// </returns>
        public static int AddNewCandidateUser(CandidateUserDetail candidateUser)
        {
            try
            {
                //TODO: Validation rules

                SCR2CandidateUserContext db = new SCR2CandidateUserContext();

                db.Add(candidateUser);

                return 1;
            }
            catch (Exception e)
            {
                return 0;
            }
        }
    }
}