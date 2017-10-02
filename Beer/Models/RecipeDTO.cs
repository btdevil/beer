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

    public class RecipeDTO
    {
        public string Source2 { get; set; }

        public int? Number { get; set; }

        public string Name { get; set; }

        public int YeastID { get; set; }

        public string YeastName { get; set; }

        public int BeerStylesID { get; set; }

        public int ID { get; set; }

        public double? ABV { get; set; }

        public int? IBU { get; set; }

        public int? OG { get; set; }

        public int? FG { get; set; }

        public int? EBC { get; set; }

        public string HasAdjucts { get; set; }

        public int? MashTemp { get; set; }

        public int? MashTime { get; set; }

        public int? Fermentation { get; set; }

        public string Description { get; set; }

        public string Tips { get; set; }

        [ForeignKey("RecipeID")]
        public List<Recipe_MaltsDTO> Recipe_Malts { get; set; }

        [ForeignKey("RecipeID")]
        public List<Recipe_HopsDTO> Recipe_Hops { get; set; }

        //[ForeignKey("BeerStyleID")]
        public BeerStylesDTO BeerStyles { get; set; }

        public List<Recipe_OthersDTO> Recipe_Others {get; set;}


    }
}