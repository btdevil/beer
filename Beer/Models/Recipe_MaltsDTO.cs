using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Beer.Models
{
    public class Recipe_MaltsDTO
    {
        public int ID { get; set; }

        public int RecipeID { get; set; }

        public double? Weight { get; set; }

        public int MaltGenericID { get; set; }

        public int? MaltID { get; set; }

       public string MaltGenericName { get; set; }
    }
}