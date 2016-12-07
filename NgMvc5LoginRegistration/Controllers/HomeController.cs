using NgMvc5LoginRegistration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NgMvc5LoginRegistration.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult GetLoginData(UserModel userModel)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                var user = db.Members.Where(x => x.Email.Equals(userModel.Email) && x.Password.Equals(userModel.Password)).FirstOrDefault();
                return new JsonResult { Data = user, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }                
        }

        [HttpPost]
        public JsonResult Register(Member member)
        {
            string message = "";
            if (ModelState.IsValid)
            {
                using (ApplicationDbContext db = new ApplicationDbContext())
                {
                    var user = db.Members.Where(a => a.MemberName.Equals(member.MemberName)).FirstOrDefault();
                    if (member == null)
                    {
                        db.Members.Add(member);
                        db.SaveChanges();
                        message = "Success";
                    }
                    else
                    {
                        message = "Username not available";
                    }
                }
            }
            else
            {
                message = "Failed";
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}