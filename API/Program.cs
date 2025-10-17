using System.Text;
using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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

// Use CORS policy
app.UseCors("AllowAngularApp");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();


using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}
app.Run();
