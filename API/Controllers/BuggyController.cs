using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BuggyController(DataContext _context) : BaseApiController
    {
        

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetAuth()
        {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUsers> GetNotFound()
        {
            var thing = _context.AppUsers.Find(-1);
            if (thing == null) return NotFound();
            return thing;
        }

        [HttpGet("server-error")]
        public ActionResult<AppUsers> GetServerError()
        {
            var thing = _context.AppUsers.Find(-1) ?? throw new Exception("A bad thing has happend");
            return thing;
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This was not a good request");
        }
    }

}