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
    public class YeastSubstitutesController : ApiController
    {
        private BeerContext db = new BeerContext();

        // GET: api/YeastSubstitutes
        public IQueryable<YeastSubstitute> GetYeastSubstitute()
        {
            return db.YeastSubstitute;
        }

        // GET: api/YeastSubstitutes/5
        public IQueryable<YeastSubstitute> GetYeastSubstitute(int id)
        {
            var yeastSubstitute = db.YeastSubstitute.Where(x => x.YeastID == id);
           

            return yeastSubstitute;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool YeastSubstituteExists(int id)
        {
            return db.YeastSubstitute.Count(e => e.ID == id) > 0;
        }
    }
}