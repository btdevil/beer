namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Yeast")]
    public partial class Yeast
    {
        public int ID { get; set; }

        [Column("Yeast")]
        [StringLength(255)]
        public string YeastName { get; set; }

        public double? Wyeast { get; set; }

        [Column("White Labs")]
        [StringLength(255)]
        public string White_Labs { get; set; }

        [Column("Other Dry")]
        [StringLength(255)]
        public string Other_Dry { get; set; }
    }
}
