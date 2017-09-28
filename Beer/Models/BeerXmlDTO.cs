using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Xml.Serialization;
using Newtonsoft.Json;

namespace Beer.Models
{
    [XmlRoot(ElementName = "RECIPES")]
    [XmlType("RECIPE")]
    public class BeerXmlDTO
    {
        [XmlElement("BREWER")]
        public string Source2 { get; set; }

        public string TYPE { get; set; }

        public int BATCH_SIZE { get; set; }

        public int BOIL_SIZE { get; set; }

        public int BOIL_TIME { get; set; }

        public int EFFICIENCY { get; set; }

        public string IBU_METHOD { get; set; }

        [XmlElement("NAME")]
        public string Name { get; set; }

        [XmlIgnore]
        public int YeastID { get; set; }

        [XmlArray("YEASTS")]
        [XmlArrayItem("YEAST")]
        public List<YeastDTO> Yeast { get; set; }

        [XmlIgnore]
        public int BeerStylesID { get; set; }

        [XmlElement("EST_ABV")]
        public double? ABV { get; set; }

        [XmlElement("IBU")]
        public int? IBU { get; set; }

        [XmlElement("EST_OG")]
        public int? OG { get; set; }

        [XmlElement("EST_FG")]
        public int? FG { get; set; }

        [XmlElement("EST_COLOR")]
        public int? EBC { get; set; }

        [XmlArray("MASH")]
        [XmlArrayItem("MASH_STEPS")]
        public List<MashStepDTO> MASH_STEPS { get; set; }

        public int FERMENTATION_STAGES { get; set; }

        [XmlElement("PRIMARY_TEMP")]
        public int? Fermentation { get; set; }

        public int PRIMARY_AGE { get; set; }

        [XmlIgnore]
        public string Description { get; set; }

        [XmlElement("NOTES")]
        public string Tips { get; set; }

        [ForeignKey("RecipeID")]
        [XmlArray("FERMENTABLES")]
        [XmlArrayItem("FERMENTABLE")]
        public List<Recipe_MaltsDTO> Recipe_Malts { get; set; }

        [ForeignKey("RecipeID")]
        [XmlArray("HOPS")]
        [XmlArrayItem("HOP")]
        public List<Recipe_HopsDTO> Recipe_Hops { get; set; }

        //[ForeignKey("BeerStyleID")]
        [XmlElement("STYLE")]
        public BeerStylesDTO BeerStyles { get; set; }

    }
}