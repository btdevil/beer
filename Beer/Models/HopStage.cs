namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("HopStage")]
    public partial class HopStage
    {
        public int ID { get; set; }

        [StringLength(255)]
        public string HopStageName { get; set; }

    }
}