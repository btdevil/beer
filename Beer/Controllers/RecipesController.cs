using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Description;

using Beer.Models;

namespace Beer.Controllers
{
   
    public class RecipesController : ApiController
    {
        private BeerContext db = new BeerContext();

        // GET: api/Recipes
        /// <summary>
        /// Gets all recipes or allows optional search parameters. All parameters are optional. If none are supplied then all recipes are returned
        /// </summary>
        /// <returns></returns>
        public IQueryable<RecipeDTO> GetRecipes([FromUri] RecipeQuery recipeQuery)
        {
            //var recipes = db.Recipes.Include(r => r.Recipe_Malts.Select(gm => gm.MaltGeneric)).Include(r => r.Yeast).Include(r => r.Recipe_Hops.Select(h => h.Hop)).Include(r => r.Recipe_Hops.Select(hs => hs.HopStep));

            IQueryable<RecipeDTO> recipes;


            if(recipeQuery.HopId.IsNullOrEmpty() && recipeQuery.MaltId.IsNullOrEmpty())
            {
                recipes = from r in db.Recipes
                          select new RecipeDTO()
                          {
                              Source2 = r.Source2,
                              Number = r.Number,
                              Name = r.Name,
                              YeastID = r.YeastID,
                              YeastName = r.Yeast.YeastName,
                              ID = r.ID,
                              ABV = r.ABV,
                              IBU = r.IBU,
                              OG = r.OG,
                              FG = r.FG,
                              EBC = r.EBC,
                              HasAdjucts = r.HasAdjucts,
                              MashTemp = r.MashTemp,
                              MashTime = r.MashTime,
                              Fermentation = r.Fermentation
                          };
            }
            else
            {
                recipes = from r in db.Recipes
                          select new RecipeDTO()
                          {
                              Source2 = r.Source2,
                              Number = r.Number,
                              Name = r.Name,
                              YeastID = r.YeastID,
                              YeastName = r.Yeast.YeastName,
                              ID = r.ID,
                              ABV = r.ABV,
                              IBU = r.IBU,
                              OG = r.OG,
                              FG = r.FG,
                              EBC = r.EBC,
                              HasAdjucts = r.HasAdjucts,
                              MashTemp = r.MashTemp,
                              MashTime = r.MashTime,
                              Fermentation = r.Fermentation,
                              Recipe_Hops = r.Recipe_Hops.Select(rh => new Recipe_HopsDTO
                              {
                                  ID = rh.ID,
                                  RecipeID = rh.RecipeID,
                                  Weight = rh.Weight,
                                  HopID = rh.HopID,
                                  StepID = rh.StepID,
                                  HopName = rh.Hop.Hops,
                                  StepName = rh.HopStep.Step,
                                  StepOrder = rh.HopStep.StepOrder
                              }).ToList(),
                              Recipe_Malts = r.Recipe_Malts.Select(rm => new Recipe_MaltsDTO
                              {
                                  ID = rm.ID,
                                  RecipeID = rm.RecipeID,
                                  Weight = rm.Weight,
                                  MaltGenericID = rm.MaltGenericID,
                                  MaltID = rm.MaltID,
                                  MaltGenericName = rm.MaltGeneric.Malt
                              }).ToList()
                          };

            }

            if(recipeQuery.ABVMax != null)
            {
                recipes = recipes.Where(r => r.ABV <= recipeQuery.ABVMax);
            }

            if (recipeQuery.ABVMin != null)
            {
                recipes = recipes.Where(r => r.ABV >= recipeQuery.ABVMin);
            }

            if (recipeQuery.IBUMax != null)
            {
                recipes = recipes.Where(r => r.IBU <= recipeQuery.IBUMax);
            }

            if (recipeQuery.IBUMin != null)
            {
                recipes = recipes.Where(r => r.IBU >= recipeQuery.IBUMin);
            }

            if (recipeQuery.EBCMax != null)
            {
                recipes = recipes.Where(r => r.EBC <= recipeQuery.EBCMax);
            }

            if (recipeQuery.EBCMin != null)
            {
                recipes = recipes.Where(r => r.EBC >= recipeQuery.EBCMin);
            }

            if (recipeQuery.FermentMax != null)
            {
                recipes = recipes.Where(r => r.Fermentation <= recipeQuery.FermentMax);
            }

            if (recipeQuery.FermentMin != null)
            {
                recipes = recipes.Where(r => r.Fermentation >= recipeQuery.FermentMin);
            }

            if (recipeQuery.hasAdjuncts != null)
            {
                recipes = recipes.Where(r => r.HasAdjucts == recipeQuery.hasAdjuncts);
            }

            if(recipeQuery.YeastId.IsNullOrEmpty() == false)
            {
                recipes = recipes.Where(r => recipeQuery.YeastId.Contains(r.YeastID));
            }

            if (recipeQuery.MaltId.IsNullOrEmpty() == false)
            {
                recipes = recipes.Where(r => r.Recipe_Malts.Any(rm => recipeQuery.MaltId.Contains(rm.MaltGenericID)));
            }

            if (recipeQuery.HopId.IsNullOrEmpty() == false)
            {
                recipes = recipes.Where(r => r.Recipe_Hops.Any(rh => recipeQuery.HopId.Contains(rh.HopID)));
            }

            return recipes;
        }

        // GET: api/Recipes/5
        /// <summary>
        /// Gets single recipe by ID
        /// </summary>
        /// <param name="id">The recipeID</param>
        /// <returns></returns>
        [ResponseType(typeof(RecipeDTO))]
        public async Task<IHttpActionResult> GetRecipe(int id)
        {
            var recipe = await (from r in db.Recipes where r.ID == id
                                      select new RecipeDTO()
                                      {
                                          Source2 = r.Source2,
                                          Number = r.Number,
                                          Name = r.Name,
                                          YeastID = r.YeastID,
                                          YeastName = r.Yeast.YeastName,
                                          ID = r.ID,
                                          ABV = r.ABV,
                                          IBU = r.IBU,
                                          OG = r.OG,
                                          FG = r.FG,
                                          EBC = r.EBC,
                                          HasAdjucts = r.HasAdjucts,
                                          MashTemp = r.MashTemp,
                                          MashTime = r.MashTime,
                                          Fermentation = r.Fermentation,
                                          Recipe_Hops = r.Recipe_Hops.Select(rh => new Recipe_HopsDTO
                                          {
                                              ID = rh.ID,
                                              RecipeID = rh.RecipeID,
                                              Weight = rh.Weight,
                                              HopID = rh.HopID,
                                              StepID = rh.StepID,
                                              HopName = rh.Hop.Hops,
                                              StepName = rh.HopStep.Step,
                                              StepOrder = rh.HopStep.StepOrder
                                          }).OrderBy(rh => rh.StepOrder).ThenBy(hn => hn.HopName).ToList(),
                                          Recipe_Malts = r.Recipe_Malts.Select(rm => new Recipe_MaltsDTO
                                          {
                                              ID = rm.ID,
                                              RecipeID = rm.RecipeID,
                                              Weight = rm.Weight,
                                              MaltGenericID = rm.MaltGenericID,
                                              MaltID = rm.MaltID,
                                              MaltGenericName = rm.MaltGeneric.Malt
                                          }).OrderByDescending(rm => rm.Weight).ThenBy(mn => mn.MaltGenericName).ToList()
                                      }).ToListAsync();
            if (recipe == null)
            {
                return NotFound();
            }

            return Ok(recipe);
        }

        //public IQueryable<Recipe> GetRecipes(double ABVMax, double ABVMin = 0, int EBCMin = 0, int EBCMax = 0, string hasAdjunct = "")
        //{

        //    IQueryable<Recipe> recipe = from r in db.Recipes select r;

        //    Boolean adjunctHasVal = hasAdjunct == "";

        //    recipe = recipe.Where(r => r.ABV <= ABVMax);

        //    if(ABVMin != 0)
        //    {
        //        recipe = recipe.Where(r => r.ABV >= ABVMin);
        //    }

        //    if(hasAdjunct != "")
        //    {
        //        recipe = recipe.Where(r => r.HasAdjucts == hasAdjunct);
        //    }


        //        return recipe;
        //}

        //[ResponseType(typeof(Recipe))]
        //public async Task<IHttpActionResult> GetRecipe(double? ABVMax)
        //{
        //    Recipe recipe = null;

        //    if (ABVMax.HasValue) {
        //        //recipe = await db.Recipes.
        //        //recipe = await db.Recipes.Where(r => r.ABV <= ABVMax);
        //        //var blogs = await (from b in db.Blogs
        //        //orderby b.Name
        //        //select b).ToListAsync();
        //        recipe = await (from r in db.Recipes select r);
        //        //recipe = await db.Recipes.FirstOrDefaultAsync(r => r.ABV <= ABVMax);

        //    }

        //    if (recipe == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(recipe);
        //}

        // PUT: api/Recipes/5

        //[ResponseType(typeof(void))]
        //public async Task<IHttpActionResult> PutRecipe(int id, Recipe recipe)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != recipe.ID)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(recipe).State = EntityState.Modified;

        //    try
        //    {
        //        await db.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!RecipeExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        // POST: api/Recipes
        //[ResponseType(typeof(Recipe))]
        //public async Task<IHttpActionResult> PostRecipe(Recipe recipe)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.Recipes.Add(recipe);
        //    await db.SaveChangesAsync();

        //    return CreatedAtRoute("DefaultApi", new { id = recipe.ID }, recipe);
        //}

        // DELETE: api/Recipes/5
        //[ResponseType(typeof(Recipe))]
        //public async Task<IHttpActionResult> DeleteRecipe(int id)
        //{
        //    Recipe recipe = await db.Recipes.FindAsync(id);
        //    if (recipe == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Recipes.Remove(recipe);
        //    await db.SaveChangesAsync();

        //    return Ok(recipe);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RecipeExists(int id)
        {
            return db.Recipes.Count(e => e.ID == id) > 0;
        }
    }
}