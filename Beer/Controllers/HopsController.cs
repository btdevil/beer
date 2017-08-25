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
    public class HopsController : ApiController
    {
        private BeerContext db = new BeerContext();

        // GET: api/Hops
        /// <summary>
        /// Gets all Hops
        /// </summary>
        /// <returns></returns>
        public IQueryable<Hop> GetHops()
        {
            return db.Hops;
        }

        // GET: api/Hops/5
        /// <summary>
        /// Gets a single hop by ID
        /// </summary>
        /// <param name="id">The HopID</param>
        /// <returns></returns>
        [ResponseType(typeof(Hop))]
        public async Task<IHttpActionResult> GetHop(int id)
        {
            Hop hop = await db.Hops.FindAsync(id);
            if (hop == null)
            {
                return NotFound();
            }

            return Ok(hop);
        }

        // PUT: api/Hops/5
        //[ResponseType(typeof(void))]
        //public async Task<IHttpActionResult> PutHop(int id, Hop hop)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != hop.ID)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(hop).State = EntityState.Modified;

        //    try
        //    {
        //        await db.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!HopExists(id))
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

        //// POST: api/Hops
        //[ResponseType(typeof(Hop))]
        //public async Task<IHttpActionResult> PostHop(Hop hop)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.Hops.Add(hop);
        //    await db.SaveChangesAsync();

        //    return CreatedAtRoute("DefaultApi", new { id = hop.ID }, hop);
        //}

        // DELETE: api/Hops/5
        //[ResponseType(typeof(Hop))]
        //public async Task<IHttpActionResult> DeleteHop(int id)
        //{
        //    Hop hop = await db.Hops.FindAsync(id);
        //    if (hop == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Hops.Remove(hop);
        //    await db.SaveChangesAsync();

        //    return Ok(hop);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HopExists(int id)
        {
            return db.Hops.Count(e => e.ID == id) > 0;
        }
    }
}