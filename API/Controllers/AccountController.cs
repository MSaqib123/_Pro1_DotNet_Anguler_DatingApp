
using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : BaseApiController
{

   private readonly DataContext _context;
   private readonly ITokenService _tokenService;

   public AccountController(DataContext context,ITokenService tokenService)
   {
       _context = context;
       _tokenService = tokenService;
   } 


   // public async Task<ActionResult<AppUsers>> Register([FromQuery] string userName, string password)
   // public async Task<ActionResult<AppUsers>> Register([FromBody] string userName, string password)
   // public async Task<ActionResult<AppUsers>> Register(string userName, string password)
   [HttpPost("register")]
   public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
   {
       if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");
       return Ok();
       // using var hmac = new HMACSHA512();
       // var user = new AppUsers
       // {
       //     UserName = registerDto.Username.ToLower(),
       //     PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
       //     PasswordSalt = hmac.Key
       // };
       // _context.AppUsers.Add(user);
       // await _context.SaveChangesAsync();
       // return new UserDto
       // {
       //     Username = user.UserName,
       //     Token = _tokenService.CreateToken(user)
       // };
   }

   [HttpPost("login")]
   public async Task<ActionResult<UserDto>> Register(LoginDto loginDto)
   {
       var user = await _context.Users
            .Include(x=>x.Photos)
            .FirstOrDefaultAsync(x=>x.UserName == loginDto.Username.ToLower());
       if (user == null) return Unauthorized("Invalid Credential");

       using var hmac = new HMACSHA512(user.PasswordSalt);
       var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
       for (int i = 0; i < computeHash.Length; i++)
       {
           if (computeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Credential");
       }
       return new UserDto
       {
            Username = user.UserName,
            Token = _tokenService.CreateToken(user),
            PhotoUrl = user.Photos.FirstOrDefault(x=>x.IsMain)?.Url
       };
   }


   private async Task<bool> UserExists(string Username)
   {
       return await _context.Users.AnyAsync(x => x.UserName.ToLower() == Username.ToLower());
   }
}
