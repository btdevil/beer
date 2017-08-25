namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("viewMyStock")]
    public partial class viewMyStock
    {
        [Key]
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
