namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Recipe-Malts")]
    public partial class Recipe_Malts
    {
        public int ID { get; set; }

        public int RecipeID { get; set; }

        public double? Weight { get; set; }

        public int MaltGenericID { get; set; }

        public int? MaltID { get; set; }

        [ForeignKey("MaltGenericID")]
        public MaltGeneric MaltGeneric { get; set; }

    }
}
