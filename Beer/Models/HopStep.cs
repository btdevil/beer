namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class HopStep
    {
        public int ID { get; set; }

        [StringLength(255)]
        public string Step { get; set; }
    }
}
