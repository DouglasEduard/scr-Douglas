using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.ServiceModel.Activation;

namespace SCR2WebApp.Models
{
    [DataContract]
    public class CandidateUserDetail
    {
        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string EMail { get; set; }

        [DataMember]
        public int SelectedOption { get; set; }
    }
}