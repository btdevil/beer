namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("MaltGeneric")]
    public partial class MaltGeneric
    {
        public int ID { get; set; }

        [StringLength(255)]
        public string Malt { get; set; }

        public double? PPG { get; set; }
        public double? EBC { get; set; }

    }
}
