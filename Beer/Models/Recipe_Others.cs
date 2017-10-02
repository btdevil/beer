namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Recipe-Others")]
    public partial class Recipe_Others
    {
        public int ID { get; set; }

        public int RecipeID { get; set; }

        public double? Weight { get; set; }

        public int OtherID { get; set; }

        public int StepID { get; set; }

        

        [ForeignKey("OtherID")]
        public Others Other { get; set; }

        [ForeignKey("StepID")]
        public HopStep HopStep { get; set; }
    }
}
