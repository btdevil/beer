using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Xml.Serialization;

namespace Beer.Models
{
    public class YeastDTO
    {
        private string isdry;
        [XmlIgnore]
        public int ID { get; set; }

        [Column("Yeast")]
        [StringLength(255)]
        [XmlElement("NAME")]
        public string YeastName { get; set; }

        [XmlElement("FORM")]
        public string IsDry { get; set; }
        public double AMOUNT { get; set; }
        public bool AMOUNT_IS_WEIGHT { get; set; }
        [XmlElement("ATTENUATION")]
        public int? Attenuation { get; set; }


    }
}