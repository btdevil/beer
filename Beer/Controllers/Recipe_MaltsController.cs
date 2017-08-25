using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Beer.Models;

namespace Beer.Controllers
{
    public class Recipe_MaltsController : ApiController
    {
        private BeerContext db = new BeerContext();

        // GET: api/Recipe_Malts
        public IQueryable<Recipe_Malts> GetRecipe_Malts()
        {
            return db.Recipe_Malts;
        }

        // GET: api/Recipe_Malts/5
        [ResponseType(typeof(Recipe_Malts))]
        public async Task<IHttpActionResult> GetRecipe_Malts(int id)
        {
            Recipe_Malts recipe_Malts = await db.Recipe_Malts.FindAsync(id);
            if (recipe_Malts == null)
            {
                return NotFound();
            }

            return Ok(recipe_Malts);
        }

        // PUT: api/Recipe_Malts/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutRecipe_Malts(int id, Recipe_Malts recipe_Malts)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != recipe_Malts.ID)
            {
                return BadRequest();
            }

            db.Entry(recipe_Malts).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Recipe_MaltsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Recipe_Malts
        [ResponseType(typeof(Recipe_Malts))]
        public async Task<IHttpActionResult> PostRecipe_Malts(Recipe_Malts recipe_Malts)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Recipe_Malts.Add(recipe_Malts);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = recipe_Malts.ID }, recipe_Malts);
        }

        // DELETE: api/Recipe_Malts/5
        [ResponseType(typeof(Recipe_Malts))]
        public async Task<IHttpActionResult> DeleteRecipe_Malts(int id)
        {
            Recipe_Malts recipe_Malts = await db.Recipe_Malts.FindAsync(id);
            if (recipe_Malts == null)
            {
                return NotFound();
            }

            db.Recipe_Malts.Remove(recipe_Malts);
            await db.SaveChangesAsync();

            return Ok(recipe_Malts);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Recipe_MaltsExists(int id)
        {
            return db.Recipe_Malts.Count(e => e.ID == id) > 0;
        }
    }
}