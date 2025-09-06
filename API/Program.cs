using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//================== Service ==============
builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//================== Pipline ==============
// Configure the HTTP request pipeline.
var app = builder.Build();

app.MapControllers();

app.Run();
