
using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController(
    DataContext _context,
    ITokenService _tokenService,
    IMapper mapper
) : BaseApiController
{

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");
        using var hmac = new HMACSHA512();
        var user = mapper.Map<AppUser>(registerDto);
        user.UserName = registerDto.Username.ToLower();
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return new UserDto
        {
            Username = user.UserName,
            Token = _tokenService.CreateToken(user),
            KnownAs = user.KnownAs,
            Gender = user.Gender
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Register(LoginDto loginDto)
    {
        var user = await _context.Users
             .Include(x => x.Photos)
             .FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

        if (user == null || user.UserName==null) return Unauthorized("Invalid Credential");

        return new UserDto
        {
            KnownAs = user.KnownAs,
            Username = user.UserName,
            Token = _tokenService.CreateToken(user),
            PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
            Gender = user.Gender
        };
    }


    private async Task<bool> UserExists(string Username)
    {
        return await _context.Users.AnyAsync(x => x.NormalizedUserName == Username.ToUpper());
    }
}
