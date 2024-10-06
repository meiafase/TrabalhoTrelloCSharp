using Microsoft.AspNetCore.Mvc;
using API.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDataContext>();

var app = builder.Build();

app.MapPost("/api/usuario/cadastrar", (Usuarios usuario, [FromServices] AppDataContext ctx) =>
{
    
});



app.Run();
