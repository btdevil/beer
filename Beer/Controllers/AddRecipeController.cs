using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Beer.Controllers
{
    public class AddRecipeController : Controller
    {
        // GET: AddRecipe
        public ActionResult Index()
        {
            return View();
        }
    }
}