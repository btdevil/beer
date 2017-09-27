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
        public int StepOrder { get; set; }

        public int HopTypeID { get; set; }

        public int HopStageID { get; set; }

        [ForeignKey("HopTypeID")]
        public HopType HopType { get; set; }

        [ForeignKey("HopStageID")]
        public HopStage HopStage { get; set; }
    }
}
