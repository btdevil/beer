namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class viewPossibleRecipe
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int RowID1 { get; set; }

        [StringLength(255)]
        public string Yeast { get; set; }

        [StringLength(255)]
        public string Hops { get; set; }

        [StringLength(255)]
        public string Step { get; set; }

        public double? Weight { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(1)]
        public string isHop { get; set; }

        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int RowID { get; set; }

        public short? RecipeID { get; set; }

        public double? ABV { get; set; }

        [StringLength(255)]
        public string HasAdjucts { get; set; }

        [StringLength(255)]
        public string Source2 { get; set; }

        public double? Number { get; set; }

        [StringLength(255)]
        public string Name { get; set; }

        public int? YeastID { get; set; }

        public double? IBU { get; set; }

        public double? OG { get; set; }

        public double? FG { get; set; }

        public int? EBC { get; set; }

        public int? MashTemp { get; set; }

        public int? MashTime { get; set; }

        public int? Fermentation { get; set; }
    }
}
