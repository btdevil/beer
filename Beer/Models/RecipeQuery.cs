using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Beer.Models
{
    /// <summary>
    /// Recipe Query parameters
    /// </summary>
    public class RecipeQuery
    {
        /// <summary>
        /// Maximum ABV % (Optional)
        /// </summary>
        public double? ABVMax { get; set; }
        /// <summary>
        /// Minimun ABV % (Optional)
        /// </summary>
        public double? ABVMin { get; set; }
        /// <summary>
        /// Minimum IBU (Optional)
        /// </summary>
        public double? IBUMin { get; set; }
        /// <summary>
        /// Maximum IBU (Optional)
        /// </summary>
        public double? IBUMax { get; set; }
        /// <summary>
        /// Minimum EBC (Optional)
        /// </summary>
        public int? EBCMin { get; set; }
        /// <summary>
        /// Maximum EBC (Optional)
        /// </summary>
        public int? EBCMax { get; set; }
        /// <summary>
        /// Minimum Fermantion Temperature (Optional)
        /// </summary>
        public int? FermentMin { get; set; }
        /// <summary>
        /// Maximum Fermantion Temperature (Optional)
        /// </summary>
        public int? FermentMax { get; set; }
        /// <summary>
        /// HopsIds to include (Optional)
        /// </summary>
        public int[] HopId { get; set; }
        /// <summary>
        /// MaltIds to include (Optional)
        /// </summary>
        public int[] MaltId { get; set; }
        /// <summary>
        /// YeastIds to include (Optional)
        /// </summary>
        public int[] YeastId { get; set; }
        /// <summary>
        /// BeerStyleIds to include (Optional)
        /// </summary>
        public int[] BeerStyleId { get; set; }
        /// <summary>
        /// Has Adjuncts (Y or N) (Optional)
        /// </summary>
        public string hasAdjuncts { get; set; }
        /// <summary>
        /// Recipe Name (Optional)
        /// </summary>
        public string recipeName { get; set; }

        /// <summary>
        /// Return a full recipe with malts and hops (Optional)
        /// </summary>
        public bool? getFullRecipe { get; set; }

    }
}