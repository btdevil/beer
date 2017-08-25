using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace Beer.Models
{
    public class RecipeDTO
    {
        public string Source2 { get; set; }

        public double? Number { get; set; }

        public string Name { get; set; }

        public int YeastID { get; set; }

        public string YeastName { get; set; }

        public int ID { get; set; }

        public double? ABV { get; set; }

        public double? IBU { get; set; }

        public double? OG { get; set; }

        public double? FG { get; set; }

        public int? EBC { get; set; }

        public string HasAdjucts { get; set; }

        public int? MashTemp { get; set; }

        public int? MashTime { get; set; }

        public int? Fermentation { get; set; }

        [ForeignKey("RecipeID")]
        public ICollection<Recipe_MaltsDTO> Recipe_Malts { get; set; }

        [ForeignKey("RecipeID")]
        public ICollection<Recipe_HopsDTO> Recipe_Hops { get; set; }
    }
}