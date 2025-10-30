using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with-roles")]
        public ActionResult GetUsersWithRoles()
        {
            return Ok("Only Admin Can Acess");
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("photo-to-moderate")]
        public ActionResult GetPhotoForModeration()
        {
            return Ok("Amdin and Moderators Can Access");
        }
    }
}
