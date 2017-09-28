using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Xml.Serialization;
using Newtonsoft.Json;

namespace Beer.Models
{
    [XmlRoot("MASH_STEP")]
    public class MashDTO
    {
        [XmlElement("STEP_TEMP")]
        public int? MashTemp { get; set; }
        //[XmlArrayItem("STEP_TIME")]
        [XmlElement("STEP_TIME")]
        public int? MashTime { get; set; }

        public string TYPE { get; set; }
        public int INFUSE_AMOUNT { get; set; }
        public int RAMP_TIME { get; set; }
        public int? END_TEMP { get; set; }
    }
}