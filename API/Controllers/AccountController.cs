using System.Security.Cryptography;
using System.Text;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : BaseApiController
{

    private readonly DataContext _context;

    public AccountController(DataContext context)
    {
        _context = context;
    }


    [HttpPost("register")]
    // public async Task<ActionResult<AppUsers>> Register([FromQuery] string userName, string password)
    // public async Task<ActionResult<AppUsers>> Register([FromBody] string userName, string password)
    public async Task<ActionResult<AppUsers>> Register(string userName, string password)
    {
        using var hmac = new HMACSHA512();

        var user = new AppUsers
        {
            UserName = userName,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
            PasswordSalt = hmac.Key
        };
        _context.AppUsers.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

}
