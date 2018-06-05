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
    public class HopStepsController : ApiController
    {
        private BeerContext db = new BeerContext();

        // GET: api/HopSteps
        public IQueryable<HopStep> GetHopSteps()
        {
            return db.HopSteps.OrderBy(hs => hs.StepOrder);
        }

        // GET: api/HopSteps/5
        [ResponseType(typeof(HopStep))]
        public async Task<IHttpActionResult> GetHopStep(int id)
        {
            HopStep hopStep = await db.HopSteps.FindAsync(id);
            if (hopStep == null)
            {
                return NotFound();
            }

            return Ok(hopStep);
        }

        //// PUT: api/HopSteps/5
        //[ResponseType(typeof(void))]
        //public async Task<IHttpActionResult> PutHopStep(int id, HopStep hopStep)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != hopStep.ID)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(hopStep).State = EntityState.Modified;

        //    try
        //    {
        //        await db.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!HopStepExists(id))
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

        //// POST: api/HopSteps
        //[ResponseType(typeof(HopStep))]
        //public async Task<IHttpActionResult> PostHopStep(HopStep hopStep)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.HopSteps.Add(hopStep);
        //    await db.SaveChangesAsync();

        //    return CreatedAtRoute("DefaultApi", new { id = hopStep.ID }, hopStep);
        //}

        //// DELETE: api/HopSteps/5
        //[ResponseType(typeof(HopStep))]
        //public async Task<IHttpActionResult> DeleteHopStep(int id)
        //{
        //    HopStep hopStep = await db.HopSteps.FindAsync(id);
        //    if (hopStep == null)
        //    {
        //        return NotFound();
        //    }

        //    db.HopSteps.Remove(hopStep);
        //    await db.SaveChangesAsync();

        //    return Ok(hopStep);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HopStepExists(int id)
        {
            return db.HopSteps.Count(e => e.ID == id) > 0;
        }
    }
}