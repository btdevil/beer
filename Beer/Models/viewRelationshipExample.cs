namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("viewRelationshipExample")]
    public partial class viewRelationshipExample
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int RowID { get; set; }

        public double? Number { get; set; }

        [StringLength(255)]
        public string Name { get; set; }

        [StringLength(255)]
        public string Step { get; set; }

        [StringLength(255)]
        public string Hops { get; set; }

        [StringLength(255)]
        public string Malt { get; set; }

        public double? Weight { get; set; }

        public double? Expr1 { get; set; }

        [StringLength(255)]
        public string Yeast { get; set; }
    }
}
