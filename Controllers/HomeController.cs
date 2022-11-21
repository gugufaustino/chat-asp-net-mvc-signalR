using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using m5_chat.Models;

namespace m5_chat.Controllers;

public class HomeController : Controller
{
    public HomeController(ILogger<HomeController> logger)
    {
    }

    public IActionResult Index()
    {

        // conectar ao hub
        return View();
    }

    public JsonResult Enviar()
    {

        // enviar mensagem ao canal

        return Json("enviado");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
