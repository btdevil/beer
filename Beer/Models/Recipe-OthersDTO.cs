using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;
using Newtonsoft.Json;

namespace Beer.Models
{
    public class Recipe_OthersDTO
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
        public int OtherID { get; set; }

        [XmlIgnore]
        public int StepID { get; set; }

        [XmlElement("NAME")]
        public string OtherName { get; set; }

        [XmlIgnore]
        public string StepName { get; set; }

        [XmlIgnore]
        public int StepOrder { get; set; }

        [XmlElement("USE")]
        public string HopStage { get; set; }

        [JsonIgnore]
        public bool AMOUNT_IS_WEIGHT { get; set; }

        [JsonIgnore]
        public string TYPE { get; set; }
    }
}