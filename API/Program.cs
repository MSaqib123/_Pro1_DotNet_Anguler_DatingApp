using System.Text;
using API.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Services;

var builder = WebApplication.CreateBuilder(args);

//============================ Service =======================
builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// add Cors service
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
            // policy =>
            // {
            //     policy.WithOrigins("http://localhost:4200") // Angular app origin
            //           .AllowAnyHeader()
            //           .AllowAnyMethod();
            // });
});

builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt=>
    {
        var tokenKey = builder.Configuration["TokenKey"] ?? throw new Exception("TokenKey not found");
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
            ValidateIssuer = false,
            ValidateAudience = false,
        };
    });

var app = builder.Build();

//============================ Pipline =======================
// Configure the HTTP request pipeline.

// Use HTTPS redirection
app.UseHttpsRedirection();

// Use CORS policy
app.UseCors("AllowAngularApp");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
