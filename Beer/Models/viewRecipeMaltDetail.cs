namespace Beer.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class viewRecipeMaltDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int MaltRowID { get; set; }

        [StringLength(255)]
        public string Malt { get; set; }

        [StringLength(255)]
        public string GenericMalt { get; set; }

        public double? MaltWeight { get; set; }

        [StringLength(255)]
        public string Manufacturer { get; set; }

        public short? RecipeID { get; set; }

        public int? MaltGenericID { get; set; }

        public int? MaltID { get; set; }
    }
}
