using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Beer.Models
{
    public class Recipe_HopsDTO
    {
        public int ID { get; set; }

        public int RecipeID { get; set; }

        public double? Weight { get; set; }

        public int HopID { get; set; }

        public int StepID { get; set; }

        public string HopName { get; set; }

        public string StepName { get; set; }
    }
}