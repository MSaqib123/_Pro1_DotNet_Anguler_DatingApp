using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController(IUserRepository userRepository) : BaseApiController
{

    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<AppUsers>>> GetUsers()
    {
        var users = await userRepository.GetUsersAsync();
        return Ok(users);
        // return users.ToList();
    }


    [Authorize]
    [HttpGet("{username}")]
    public async Task<ActionResult<AppUsers>> GetUser(string username)
    {
        var user = await userRepository.GetUserByUsernameAsync(username);
        if (user == null) return NotFound();
        return user;
    }


    

}
