using Microsoft.EntityFrameworkCore;

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

var app = builder.Build();

//============================ Pipline =======================
// Configure the HTTP request pipeline.

// Use HTTPS redirection
app.UseHttpsRedirection();

// Use CORS policy
app.UseCors("AllowAngularApp");

app.MapControllers();

app.Run();
