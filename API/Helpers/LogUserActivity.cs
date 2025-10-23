using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            //=========== Concept ============
            //FilterAction work with   Controler Action
            // 1. Befor Action Executed
            // if we create logic before await next()  this will work  befor action executed

            // 2. After Action Executed
            // if we create logic after await next()  this will work  after action executed

            var resultContext = await next();
            if (context.HttpContext.User.Identity?.IsAuthenticated != true) return;
            var username = resultContext.HttpContext.User.GetUsername();

            var repo = resultContext.HttpContext.RequestServices.GetRequiredService<IUserRepository>();
            var user = await repo.GetUserByUsernameAsync(username);
            if (user == null) return;

            user.LastActive = DateTime.UtcNow;
            await repo.SaveAllAsync();

        }
    }
}