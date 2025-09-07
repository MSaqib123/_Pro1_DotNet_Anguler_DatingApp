using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class UserController : BaseApiController
{

    private readonly DataContext _context;

    public UserController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<AppUsers>>> GetUsers()
    {
        var users = await _context.AppUsers.ToListAsync();
        return users;
    }


    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<AppUsers>> GetUser(int id)
    {
        var user = await _context.AppUsers.FindAsync(id);
        if (user == null) return NotFound();
        return user;
    }


    

}
