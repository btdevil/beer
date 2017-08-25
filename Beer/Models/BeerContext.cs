﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Beer.Models
{
    public class BeerContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public BeerContext() : base("name=BeerContext")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }

        public System.Data.Entity.DbSet<Beer.Models.Recipe> Recipes { get; set; }

        public System.Data.Entity.DbSet<Beer.Models.Hop> Hops { get; set; }

        public System.Data.Entity.DbSet<Beer.Models.MaltGeneric> MaltGenerics { get; set; }

        public System.Data.Entity.DbSet<Beer.Models.Yeast> Yeasts { get; set; }

        public System.Data.Entity.DbSet<Beer.Models.Recipe_Malts> Recipe_Malts { get; set; }

        public System.Data.Entity.DbSet<Beer.Models.Recipe_Hops> Recipe_Hops { get; set; }
    }
}