using System.Text;
using API.Data;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.Middlewares;
using API.SignalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Services;

var builder = WebApplication.CreateBuilder(args);

//============================ Service =======================
#region 
// builder.Services.AddControllers();
// builder.Services.AddDbContext<DataContext>(opt =>
// {
//     opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
// });
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// // add Cors service
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowAngularApp",
//         policy => policy
//             .AllowAnyOrigin()
//             .AllowAnyHeader()
//             .AllowAnyMethod());
//     // policy =>
//     // {
//     //     policy.WithOrigins("http://localhost:4200") // Angular app origin
//     //           .AllowAnyHeader()
//     //           .AllowAnyMethod();
//     // });
// });
// builder.Services.AddScoped<ITokenService, TokenService>();
// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(opt =>
//     {
//         var tokenKey = builder.Configuration["TokenKey"] ?? throw new Exception("TokenKey not found");
//         opt.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidateIssuerSigningKey = true,
//             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
//             ValidateIssuer = false,
//             ValidateAudience = false,
//         };
//     });

#endregion

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityService(builder.Configuration);

var app = builder.Build();


//============================ Pipline =======================
// Configure the HTTP request pipeline.

app.UseMiddleware<ExceptionMiddleware>();

// Use HTTPS redirection
app.UseHttpsRedirection();

//===== CORS policy (Cross Origin Resources Sharing) ======
//Allow to All
// app.UseCors("AllowAngularApp");

//Allow to only specific Url
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials()
    .WithOrigins("http://localhost:4200", "https://localhost:4200"));

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<PresenceHub>("hubs/presence");


using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(userManager,roleManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}
app.Run();
