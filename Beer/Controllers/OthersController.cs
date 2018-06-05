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
    public class OthersController : ApiController
    {
        private BeerContext db = new BeerContext();

        // GET: api/Others
        public IQueryable<Others> GetOthers()
        {
            return db.Others.OrderBy(x => x.Other);
        }

        // GET: api/Others/5
        [ResponseType(typeof(Others))]
        public async Task<IHttpActionResult> GetOthers(int id)
        {
            Others others = await db.Others.FindAsync(id);
            if (others == null)
            {
                return NotFound();
            }

            return Ok(others);
        }

        //// PUT: api/Others/5
        //[ResponseType(typeof(void))]
        //public async Task<IHttpActionResult> PutOthers(int id, Others others)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != others.ID)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(others).State = EntityState.Modified;

        //    try
        //    {
        //        await db.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!OthersExists(id))
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

        //// POST: api/Others
        //[ResponseType(typeof(Others))]
        //public async Task<IHttpActionResult> PostOthers(Others others)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.Others.Add(others);
        //    await db.SaveChangesAsync();

        //    return CreatedAtRoute("DefaultApi", new { id = others.ID }, others);
        //}

        //// DELETE: api/Others/5
        //[ResponseType(typeof(Others))]
        //public async Task<IHttpActionResult> DeleteOthers(int id)
        //{
        //    Others others = await db.Others.FindAsync(id);
        //    if (others == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Others.Remove(others);
        //    await db.SaveChangesAsync();

        //    return Ok(others);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OthersExists(int id)
        {
            return db.Others.Count(e => e.ID == id) > 0;
        }
    }
}