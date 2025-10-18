using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Services;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddControllers();
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            // add Cors service
            services.AddCors(options =>
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
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            
            // ✅ CORRECT - Scans ALL assemblies for Profile classes
            services.AddAutoMapper(typeof(AutoMapperProfiles));
            // services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            // services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            return services;
        }
    }
}