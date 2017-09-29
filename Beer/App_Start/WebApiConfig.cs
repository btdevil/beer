using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Newtonsoft.Json;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Xml.Serialization;
using System.Web.Routing;
using System.Net.Http;

namespace Beer
{
    public class BrowserJsonFormatter : JsonMediaTypeFormatter
    {
        public BrowserJsonFormatter()
        {
            this.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            this.SerializerSettings.Formatting = Formatting.Indented;
        }

        public override void SetDefaultContentHeaders(Type type, HttpContentHeaders headers, MediaTypeHeaderValue mediaType)
        {
            base.SetDefaultContentHeaders(type, headers, mediaType);
            headers.ContentType = new MediaTypeHeaderValue("application/json");
        }
    }

    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.EnableCors();

            // Web API routes
            config.MapHttpAttributeRoutes();

            string[] allowedMethods = { "GET"};

            config.Routes.MapHttpRoute(
                name: "DefaultApiWithExtension2",
                routeTemplate: "api/{controller}/{id}.{ext}",
                defaults: null,
                constraints: new { httpMethod = new HttpMethodConstraint(allowedMethods) }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApiWithExtension1",
                routeTemplate: "api/{controller}.{ext}",
                defaults: null,
                constraints: new { httpMethod = new HttpMethodConstraint(allowedMethods) });

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var xml = GlobalConfiguration.Configuration.Formatters.XmlFormatter;
            // Use XmlSerializer for instances of type "Product":
            xml.SetSerializer<Beer.Models.RecipeDTO>(new XmlSerializer(typeof(Beer.Models.RecipeDTO)));

            config.Formatters.XmlFormatter.AddUriPathExtensionMapping("xml", "application/octet-stream");
            config.Formatters.XmlFormatter.UseXmlSerializer = true;
            config.Formatters.JsonFormatter.AddUriPathExtensionMapping("json", "application/json");
            config.Formatters.Add(new BrowserJsonFormatter());
            config.Formatters.XmlFormatter.MediaTypeMappings.Add(
                new QueryStringMapping("type", "xml", new MediaTypeHeaderValue("text/xml"))
            );


        }
    }

    
}
