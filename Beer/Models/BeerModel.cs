namespace Beer.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class BeerModel : DbContext
    {
        public BeerModel()
            : base("name=BeerModel")
        {
        }

        public virtual DbSet<Hop> Hops { get; set; }
        public virtual DbSet<HopStep> HopSteps { get; set; }
        public virtual DbSet<Malt> Malts { get; set; }
        public virtual DbSet<MaltGeneric> MaltGenerics { get; set; }
        public virtual DbSet<MaltManufacturer> MaltManufacturers { get; set; }
        public virtual DbSet<Recipe_Hops> Recipe_Hops { get; set; }
        public virtual DbSet<Recipe_Malts> Recipe_Malts { get; set; }
        public virtual DbSet<Recipe> Recipes { get; set; }
        public virtual DbSet<Yeast> Yeasts { get; set; }
        public virtual DbSet<YeastSubstitute> YeastSubstitute { get; set; }
        public virtual DbSet<MyStock> MyStocks { get; set; }
        public virtual DbSet<BeerStyles> BeerStyles {get ;set;}
        public virtual DbSet<HopStage> HopStage { get; set; }
        public virtual DbSet<HopType> HopType { get; set; }
        public virtual DbSet<viewMyStock> viewMyStocks { get; set; }
        public virtual DbSet<viewPossibleRecipe> viewPossibleRecipes { get; set; }
        public virtual DbSet<viewRecipeHopDetail> viewRecipeHopDetails { get; set; }
        public virtual DbSet<viewRecipeMaltDetail> viewRecipeMaltDetails { get; set; }
        public virtual DbSet<viewRelationshipExample> viewRelationshipExamples { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<viewPossibleRecipe>()
                .Property(e => e.isHop)
                .IsUnicode(false);
        }
    }
}
