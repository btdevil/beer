namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Recipe
    {
        [StringLength(255)]
        public string Source2 { get; set; }

        public int? Number { get; set; }

        [StringLength(255)]
        public string Name { get; set; }

        public int YeastID { get; set; }

        public Yeast Yeast { get; set; }

        public int BeerStylesID { get; set; }

        [ForeignKey("BeerStylesID")]
        public BeerStyles BeerStyles { get; set; }

        public int ID { get; set; }

        public double? ABV { get; set; }

        public int? IBU { get; set; }

        public int? OG { get; set; }

        public int? FG { get; set; }

        public int? EBC { get; set; }

        [StringLength(255)]
        public string HasAdjucts { get; set; }

        public int? MashTemp { get; set; }

        public int? MashTime { get; set; }

        public int? BoilTime { get; set; }

        public int? BatchSize { get; set; }

        public int? Fermentation { get; set; }

        public string Description { get; set; }

        public string Tips { get; set; }

        

        [ForeignKey("RecipeID")]
        public ICollection<Recipe_Malts> Recipe_Malts { get; set; }

        [ForeignKey("RecipeID")]
        public ICollection<Recipe_Hops> Recipe_Hops { get; set; }

        [ForeignKey("RecipeID")]
        public ICollection<Recipe_Others> Recipe_Others { get; set; }


        

        //public ICollection<MaltGeneric> MaltGenerics { get; set; }

        //public ICollection<Hop> Hops { get; set; }
    }
}
