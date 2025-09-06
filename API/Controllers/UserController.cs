using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{

    private readonly DataContext _context;

    public UserController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<AppUsers>> GetUsers()
    {
        var users = _context.AppUsers.ToList();
        return users;
    }



    [HttpGet("{id}")]
    public ActionResult<AppUsers> GetUser(int id)
    {
        var user = _context.AppUsers.Find(id);
        if (user == null) return NotFound();
        return user;
    }

}
