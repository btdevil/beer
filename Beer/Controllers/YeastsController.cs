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
    public class YeastsController : ApiController
    {
        private BeerContext db = new BeerContext();

        // GET: api/Yeasts
        /// <summary>
        /// Get all Yeasts
        /// </summary>
        /// <returns></returns>
        public IQueryable<Yeast> GetYeasts()
        {
            return db.Yeasts;
        }

        // GET: api/Yeasts/5
        /// <summary>
        /// Get single yeast by YeastID
        /// </summary>
        /// <param name="id">The YeastID</param>
        /// <returns></returns>
        [ResponseType(typeof(Yeast))]
        public async Task<IHttpActionResult> GetYeast(int id)
        {
            Yeast yeast = await db.Yeasts.FindAsync(id);
            if (yeast == null)
            {
                return NotFound();
            }

            return Ok(yeast);
        }

        //// PUT: api/Yeasts/5
        //[ResponseType(typeof(void))]
        //public async Task<IHttpActionResult> PutYeast(int id, Yeast yeast)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != yeast.ID)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(yeast).State = EntityState.Modified;

        //    try
        //    {
        //        await db.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!YeastExists(id))
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

        //// POST: api/Yeasts
        //[ResponseType(typeof(Yeast))]
        //public async Task<IHttpActionResult> PostYeast(Yeast yeast)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.Yeasts.Add(yeast);
        //    await db.SaveChangesAsync();

        //    return CreatedAtRoute("DefaultApi", new { id = yeast.ID }, yeast);
        //}

        //// DELETE: api/Yeasts/5
        //[ResponseType(typeof(Yeast))]
        //public async Task<IHttpActionResult> DeleteYeast(int id)
        //{
        //    Yeast yeast = await db.Yeasts.FindAsync(id);
        //    if (yeast == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Yeasts.Remove(yeast);
        //    await db.SaveChangesAsync();

        //    return Ok(yeast);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool YeastExists(int id)
        {
            return db.Yeasts.Count(e => e.ID == id) > 0;
        }
    }
}