using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace SCR2WebApp.Models
{
    public class CompanyDetail
    {
        public Guid Id { get; set; }
        public string CompanyName { get; set; }
        public string CompanyId { get; set; }
    }
}