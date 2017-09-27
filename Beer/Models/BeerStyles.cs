namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("BeerStyles")]
    public partial class BeerStyles
    {
        public int ID { get; set; }
        public string CategoryName { get; set; }
        public int CategoryId { get; set; }
        public string SubCategoryId { get; set; }
        public string SubCategoryName { get; set; }
        public string Aroma { get; set; }
        public string Appearance { get; set; }
        public string Flavor { get; set; }
        public string Mouthfeel { get; set; }
        public string Impression { get; set; }
        public string Comments { get; set; }
        public string Ingredients { get; set; }
        public int? OGLow { get; set; }
        public int? OGHigh { get; set; }
        public int? FGLow { get; set; }
        public int? FGHigh { get; set; }
        public int? IBULow { get; set; }
        public int? IBUHigh { get; set; }
        public double? SRMLow { get; set; }
        public double? SRMHigh { get; set; }
        public double? ABVLow { get; set; }
        public double? ABVHigh { get; set; }
        public string Examples { get; set; }
        public string SubCategoryLetter { get; set; }

    }
}