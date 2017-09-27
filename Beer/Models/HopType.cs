namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class HopType
    {
        public int ID { get; set; }

        [StringLength(255)]
        public string HopTypeName { get; set; }

    }
}