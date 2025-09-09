using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;

namespace API.Middlewares
{
    public class ExceptionMiddleware
    (
        RequestDelegate next,
        ILogger<ExceptionMiddleware> logger,
        IHostEnvironment env
    )
    {
        //===================================
        // Note
        // Middlware  start  from    A to B (Next)  , B to C (Next) , .......    last Middleware    go back again
        // Middlware  comesbackword    from     last->C  ,  Cto B ,  B to A   ,.... Finnished
        //----- so  we set the Globle Exception to Parent  middlware in  pipline  means at 1st order 
        // becuase if any error comes in any middlware that can also be handle  
        // GOOD
        //===================================

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var Response = env.IsDevelopment()
                    ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace)
                    : new ApiException(context.Response.StatusCode, ex.Message, "Internal Server error");

                var option = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };
                var json = JsonSerializer.Serialize(Response, option);

                await context.Response.WriteAsync(json);
            }
        }

    }
}