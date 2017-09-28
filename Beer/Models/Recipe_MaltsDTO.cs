using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;
using Newtonsoft.Json;

namespace Beer.Models
{
    public class Recipe_MaltsDTO
    {
        [XmlIgnore]
        public int ID { get; set; }

        [XmlIgnore]
        public int RecipeID { get; set; }

        [XmlElement("AMOUNT")]
        public double? Weight { get; set; }

        [XmlIgnore]
        public int MaltGenericID { get; set; }

        [XmlIgnore]
        public int? MaltID { get; set; }

        [XmlElement("NAME")]
        public string MaltGenericName { get; set; }

        [XmlElement("YIELD")]
        [JsonIgnore]
        public double? PPG { get; set; }
        [XmlElement("COLOR")]
        [JsonIgnore]
        public double? EBC { get; set; }
        [JsonIgnore]
        public string TYPE { get; set; }
    }
}