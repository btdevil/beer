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
    public class MaltGenericsController : ApiController
    {
        private BeerContext db = new BeerContext();

        // GET: api/MaltGenerics
        /// <summary>
        /// Gets all Generic Malts
        /// </summary>
        /// <returns></returns>
        public IQueryable<MaltGeneric> GetMaltGenerics()
        {
            return db.MaltGenerics;
        }

        // GET: api/MaltGenerics/5
        /// <summary>
        /// Gets a single Generic Malt by MaltID
        /// </summary>
        /// <param name="id">The MaltID</param>
        /// <returns></returns>
        [ResponseType(typeof(MaltGeneric))]
        public async Task<IHttpActionResult> GetMaltGeneric(int id)
        {
            MaltGeneric maltGeneric = await db.MaltGenerics.FindAsync(id);
            if (maltGeneric == null)
            {
                return NotFound();
            }

            return Ok(maltGeneric);
        }

        //// PUT: api/MaltGenerics/5
        //[ResponseType(typeof(void))]
        //public async Task<IHttpActionResult> PutMaltGeneric(int id, MaltGeneric maltGeneric)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != maltGeneric.ID)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(maltGeneric).State = EntityState.Modified;

        //    try
        //    {
        //        await db.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!MaltGenericExists(id))
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

        //// POST: api/MaltGenerics
        //[ResponseType(typeof(MaltGeneric))]
        //public async Task<IHttpActionResult> PostMaltGeneric(MaltGeneric maltGeneric)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.MaltGenerics.Add(maltGeneric);
        //    await db.SaveChangesAsync();

        //    return CreatedAtRoute("DefaultApi", new { id = maltGeneric.ID }, maltGeneric);
        //}

        // DELETE: api/MaltGenerics/5
        //[ResponseType(typeof(MaltGeneric))]
        //public async Task<IHttpActionResult> DeleteMaltGeneric(int id)
        //{
        //    MaltGeneric maltGeneric = await db.MaltGenerics.FindAsync(id);
        //    if (maltGeneric == null)
        //    {
        //        return NotFound();
        //    }

        //    db.MaltGenerics.Remove(maltGeneric);
        //    await db.SaveChangesAsync();

        //    return Ok(maltGeneric);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MaltGenericExists(int id)
        {
            return db.MaltGenerics.Count(e => e.ID == id) > 0;
        }
    }
}