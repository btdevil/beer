using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;
using Newtonsoft.Json;

namespace Beer.Models
{
    public class Recipe_HopsDTO
    {
        [XmlIgnore]
        public int ID { get; set; }

        [XmlIgnore]
        public int RecipeID { get; set; }

        [XmlIgnore]
        public double? Weight { get; set; }

        private double? weightsmall;
        [XmlElement("AMOUNT")]
        [JsonIgnore]
        public double? WeightSmall
        {
            get
            {
                return Weight / 1000;
            }

            set
            {
                weightsmall = value;
            }
        }

        [XmlIgnore]
        public int HopID { get; set; }

        [XmlIgnore]
        public int StepID { get; set; }

        [XmlElement("NAME")]
        public string HopName { get; set; }

        [XmlIgnore]
        public string StepName { get; set; }

        [XmlIgnore]
        public int StepOrder { get; set; }

        [XmlElement("ALPHA")]
        public double? AA { get; set; }
        [XmlElement("FORM")]
        public string HopType { get; set; }
        [XmlElement("USE")]
        public string HopStage { get; set; }
        [XmlElement("TIME")]
        public string HopTime { get; set; }
    }
}