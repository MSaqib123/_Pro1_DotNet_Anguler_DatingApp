using System.Security.Cryptography;
using System.Text;
using API.DTOs;
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


    // public async Task<ActionResult<AppUsers>> Register([FromQuery] string userName, string password)
    // public async Task<ActionResult<AppUsers>> Register([FromBody] string userName, string password)
    // public async Task<ActionResult<AppUsers>> Register(string userName, string password)
    [HttpPost("register")]
    public async Task<ActionResult<AppUsers>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");
        using var hmac = new HMACSHA512();
        var user = new AppUsers
        {
            UserName = registerDto.Username.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };
        _context.AppUsers.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }
    [HttpPost("login")]
    public async Task<ActionResult<AppUsers>> Register(LoginDto loginDto)
    {
        var user = await _context.AppUsers.FirstOrDefaultAsync(x=>x.UserName == loginDto.Username.ToLower());
        if (user == null) return Unauthorized("Invalid Crediental");
        
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        for (int i = 0; i < computeHash.Length; i++)
        {
            if (computeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Credential");
        }
        return user;
    }


    private async Task<bool> UserExists(string Username)
    {
        return await _context.AppUsers.AnyAsync(x => x.UserName.ToLower() == Username.ToLower());
    }
}
