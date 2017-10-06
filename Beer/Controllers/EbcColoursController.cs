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
    public class EbcColourController : ApiController
    {
        private BeerContext db = new BeerContext();

        // GET: api/EbcColours
        public IQueryable<EbcColour> GetEbcColour()
        {
            return db.EbcColour;
        }

        // GET: api/EbcColours/5
        [ResponseType(typeof(EbcColour))]
        public async Task<IHttpActionResult> GetEbcColour(int id)
        {
            EbcColour ebcColour = await db.EbcColour.FindAsync(id);
            if (ebcColour == null)
            {
                return NotFound();
            }

            return Ok(ebcColour);
        }

        //// PUT: api/EbcColours/5
        //[ResponseType(typeof(void))]
        //public async Task<IHttpActionResult> PutEbcColour(int id, EbcColour ebcColour)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != ebcColour.ID)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(ebcColour).State = EntityState.Modified;

        //    try
        //    {
        //        await db.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!EbcColourExists(id))
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

        //// POST: api/EbcColours
        //[ResponseType(typeof(EbcColour))]
        //public async Task<IHttpActionResult> PostEbcColour(EbcColour ebcColour)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.EbcColour.Add(ebcColour);
        //    await db.SaveChangesAsync();

        //    return CreatedAtRoute("DefaultApi", new { id = ebcColour.ID }, ebcColour);
        //}

        //// DELETE: api/EbcColours/5
        //[ResponseType(typeof(EbcColour))]
        //public async Task<IHttpActionResult> DeleteEbcColour(int id)
        //{
        //    EbcColour ebcColour = await db.EbcColour.FindAsync(id);
        //    if (ebcColour == null)
        //    {
        //        return NotFound();
        //    }

        //    db.EbcColour.Remove(ebcColour);
        //    await db.SaveChangesAsync();

        //    return Ok(ebcColour);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EbcColourExists(int id)
        {
            return db.EbcColour.Count(e => e.ID == id) > 0;
        }
    }
}