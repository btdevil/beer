namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class viewRecipeHopDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int HopRowID { get; set; }

        [StringLength(255)]
        public string Hops { get; set; }

        [StringLength(255)]
        public string Step { get; set; }

        public double? Weight { get; set; }

        public short? RecipeID { get; set; }

        public int? HopID { get; set; }

        public int? StepID { get; set; }
    }
}
