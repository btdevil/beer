namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("YeastSubstitute")]
    public partial class YeastSubstitute
    {
        public int ID { get; set; }

        public int YeastID { get; set; }

        public int YeastSubID { get; set; }

        [StringLength(255)]
        public string IsWetDry { get; set; }

        [StringLength(255)]
        public string IsManuSub { get; set; }

        [StringLength(255)]
        public string IsSameManu { get; set; }

    }
}