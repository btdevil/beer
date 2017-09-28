using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace Beer.Models
{
    [XmlRoot(ElementName = "RECIPES")]
    public class Recipes 
    {
        [XmlElement("RECIPE")]
        public BeerXmlDTO Recipe { get; set; }

    }
}