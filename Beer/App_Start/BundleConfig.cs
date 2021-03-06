﻿using System.Web;
using System.Web.Optimization;

namespace Beer
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap-theme.css",
                      "~/Content/select2.css",
                      "~/Content/select2-bootstrap.css",
                      "~/Content/nouislider.min.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
              "~/Scripts/knockout-{version}.js",
              "~/Scripts/knockout.mapping-latest.js",
              "~/Scripts/select2.min.js",
              "~/Scripts/nouislider.min.js",
              "~/Scripts/app.js",
              "~/Scripts/beerSearch.js"
              ));

            bundles.Add(new ScriptBundle("~/bundles/myStock").Include(
              "~/Scripts/knockout-{version}.js",
              "~/Scripts/knockout.mapping-latest.js",
              "~/Scripts/select2.min.js",
              "~/Scripts/app.js",
              "~/Scripts/myStock.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/addRecipe").Include(
             "~/Scripts/knockout-{version}.js",
             "~/Scripts/knockout.mapping-latest.js",
             "~/Scripts/select2.min.js",
             "~/Scripts/app.js",
             "~/Scripts/addRecipe.js"
               ));
        }
    }
}
