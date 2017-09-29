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

        [XmlIgnore]
        public double? PPG { get; set; }
        private double? yeild;
        
        [JsonIgnore]
        public double? YIELD {
            get
            {
                return (PPG / 46.21)*100;
            }
            set
            {
                yeild = value;
            }
        }

        [XmlElement("COLOR")]
        [JsonIgnore]
        public double? EBC { get; set; }
        [JsonIgnore]
        public string TYPE { get; set; }
    }
}