using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Xml.Serialization;

namespace Beer.Models
{
    [XmlType("RECIPE")]
    public class RecipeDTO
    {
        
        [XmlIgnore]
        public string Source2 { get; set; }

        [XmlIgnore]
        public int? Number { get; set; }

        [XmlElement("NAME")]
        public string Name { get; set; }

        public int YeastID { get; set; }

        public string YeastName { get; set; }

        public int BeerStylesID { get; set; }

        public string TestName { get; set; }

        [XmlIgnore]
        public int ID { get; set; }

        [XmlElement("EST_ABV")]
        public double? ABV { get; set; }

        public int? IBU { get; set; }

        public int? OG { get; set; }

        public int? FG { get; set; }

        [XmlElement("EST_COLOR")]
        public int? EBC { get; set; }

        [XmlIgnore]
        public string HasAdjucts { get; set; }

        public int? MashTemp { get; set; }

        public int? MashTime { get; set; }

        public int? Fermentation { get; set; }

        public string Description { get; set; }

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