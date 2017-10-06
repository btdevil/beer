namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("EbcColour")]
    public partial class EbcColour
    {
        public int ID { get; set; }
        public int EBC { get; set; }
        public string Hex { get; set; }
        public string Rgb { get; set; }
    }
}