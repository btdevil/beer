namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Malt")]
    public partial class Malt
    {
        public int ID { get; set; }

        [Column("Malt")]
        [StringLength(255)]
        public string Malt1 { get; set; }

        [ForeignKey("Manufacturer")]
        public int Manufacturer { get; set; }

        public double? Moisture { get; set; }

        public double? ExtractLKG { get; set; }

        public double? ExtractPercent { get; set; }

        public double? ColourEBCIMin { get; set; }

        public double? ColourEBCIMax { get; set; }

        public double? ColourEBCEMin { get; set; }

        public double? ColourEBCEMax { get; set; }

        public double? ColourLovibondMin { get; set; }

        public double? ColourLovibondMax { get; set; }

        public double? Nitrogen { get; set; }

        public double? Protien { get; set; }

        public double? RatioSNRMin { get; set; }

        public double? RatioSNRMax { get; set; }

        public double? RatioKIMin { get; set; }

        public double? RatioKIMax { get; set; }

        public double? RatioSTMin { get; set; }

        public double? RatioSTMax { get; set; }

        public int? IDP { get; set; }

        public int? EDPWK { get; set; }

        public int? ADPLinter { get; set; }

        public double? Max { get; set; }

        public double? PPG { get; set; }

        public double? PotentialSG { get; set; }

        public string Characteristics { get; set; }

        public string Usage { get; set; }
    }
}
