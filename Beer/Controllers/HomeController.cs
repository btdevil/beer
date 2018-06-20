using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Beer.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Search";

            return View();
        }

        public ActionResult AddEdit(int? id)
        {
            if (id == null)
            {
                ViewBag.Title = "Add Recipe";
                ViewBag.SelectedRecipe = null;
            }
            else
            {
                ViewBag.Title = "Edit Recipe";
                ViewBag.SelectedRecipe = id;
            }

            return View();
        }

        public ActionResult MyStock() {
            ViewBag.Title = "My STock";
            return View();
        }

       
    }
}
