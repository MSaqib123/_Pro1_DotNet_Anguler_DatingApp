using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using API.SignalR;
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
                //====== MSSQLConnection =======
                opt.UseSqlServer(config.GetConnectionString("MSSQLConnection"));

                //====== SqlitConnection =======
                //opt.UseSqlite(config.GetConnectionString("SqlitConnection"));
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
            services.AddScoped<IPhotoService,PhotoService>();
            services.AddScoped<ILikesRepository,LikesRepository>();
            services.AddScoped<IMessageRepository,MessageRepository>();
            services.AddScoped<LogUserActivity>();

            // ✅ CORRECT - Scans ALL assemblies for Profile classes
            //intall  AutoMapper.Extensions.Microsoft.DependencyInjection
            services.AddAutoMapper(typeof(AutoMapperProfiles));
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));

            // WebSocket SignalR
            services.AddSignalR();
            services.AddSingleton<PrecenseTracker>();

            // IUnitOfWork
            services.AddScoped<IUnitOfWork,UnitOfWork>();

            return services;
        }
    }
}