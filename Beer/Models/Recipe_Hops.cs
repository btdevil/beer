namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Recipe-Hops")]
    public partial class Recipe_Hops
    {
        public int ID { get; set; }

        public int RecipeID { get; set; }

        public double? Weight { get; set; }

        public int HopID { get; set; }

        public int StepID { get; set; }

        public int HopTypeID { get; set; }

        [ForeignKey("HopID")]
        public Hop Hop { get ; set;}

        [ForeignKey("StepID")]
        public HopStep HopStep { get; set; }

        [ForeignKey("HopTypeID")]
        public HopType HopType { get; set; }


    }
}
