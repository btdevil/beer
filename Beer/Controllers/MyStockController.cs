using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Beer.Controllers
{
    public class MyStockController : Controller
    {
        // GET: MyStock
        public ActionResult Index()
        {
            return View();
        }
    }
}