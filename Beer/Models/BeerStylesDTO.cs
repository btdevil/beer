using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Serialization;

namespace Beer.Models
{
    public class BeerStylesDTO
    {
        [XmlIgnore]
        public int ID { get; set; }
        [XmlElement("CATEGORY_NUMBER")]
        public int CategoryId { get; set; }
        [XmlIgnore]
        public string SubCategoryId { get; set; }
        [XmlElement("NAME")]
        public string SubCategoryName { get; set; }
        [XmlElement("STYLE_GUIDE")]
        public string StyleGuide { get; set; }
        [XmlElement("STYLE_LETTER")]
        public string SubCategoryLetter { get; set; }
        private double? oglow;
        [XmlElement("OG_MIN")]
        public double? OGLow
        {
            get
            {
                string s = oglow.HasValue ? oglow.Value.ToString("#\\.###") : string.Empty;
                decimal m = Decimal.Parse(s);

                double d = (double)m;
                return d;
            }
            set
            {
                oglow = value;
            }
        }
        private double? oghigh;
        [XmlElement("OG_MAX")]
        public double? OGHigh {
            get
            {
                string s = oghigh.HasValue ? oghigh.Value.ToString("#\\.###") : string.Empty;
                decimal m = Decimal.Parse(s);

                double d = (double)m;
                return d;
            }
            set
            {
                oghigh = value;
            }
        }
        private double? fglow;
        [XmlElement("FG_MIN")]
        public double? FGLow {
            get
            {
                string s = fglow.HasValue ? fglow.Value.ToString("#\\.###") : string.Empty;
                decimal m = Decimal.Parse(s);

                double d = (double)m;
                return d;
            }
            set
            {
                fglow = value;
            }
        }
        private double? fghigh;
        [XmlElement("FG_MAX")]
        public double? FGHigh {
            get
            {
                string s = fghigh.HasValue ? fghigh.Value.ToString("#\\.###") : string.Empty;
                decimal m = Decimal.Parse(s);

                double d = (double)m;
                return d;
            }
            set
            {
                fghigh = value;
            }
        }
        [XmlElement("IBU_MIN")]
        public int? IBULow { get; set; }
        [XmlElement("IBU_MIAX")]
        public int? IBUHigh { get; set; }
        [XmlElement("COLOR_MIN")]
        public double? SRMLow { get; set; }
        [XmlElement("COLOR_MAX")]
        public double? SRMHigh { get; set; }
        [XmlElement("ABV_MIN")]
        public double? ABVLow { get; set; }
        [XmlElement("ABV_MAX")]
        public double? ABVHigh { get; set; }


    }
}