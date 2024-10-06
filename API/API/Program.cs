using Microsoft.AspNetCore.Mvc;
using API.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDataContext>();

var app = builder.Build();

app.MapPost("/api/usuario/cadastrar", async ([FromBody] Usuarios usuario, [FromServices] AppDataContext ctx) =>
{
    if (string.IsNullOrEmpty(usuario.NomeUsuario) || string.IsNullOrEmpty(usuario.EmailUsuario))
    {
        return Results.BadRequest("Nome e email são obrigatórios.");
    }

    var usuarioExistente = await ctx.Usuarios.FirstOrDefaultAsync(u => u.EmailUsuario == usuario.EmailUsuario);

    if (usuarioExistente != null)
    {
        return Results.BadRequest("Já existe um usuário com este email.");
    }

    ctx.Usuarios.Add(usuario);
    await ctx.SaveChangesAsync();

    return Results.Created($"/api/usuario/{usuario.IdUsuario}", usuario);
});


app.MapPost("/api/usuario/login", async ([FromBody] Usuarios login, [FromServices] AppDataContext ctx) =>
{
    if (string.IsNullOrEmpty(login.EmailUsuario) || string.IsNullOrEmpty(login.SenhaUsuario))
    {
        return Results.BadRequest("Email e senha são obrigatórios.");
    }

    var usuario = await ctx.Usuarios.FirstOrDefaultAsync(u => u.EmailUsuario == login.EmailUsuario);

    if (usuario == null)
    {
        return Results.NotFound("Usuário não encontrado.");
    }

    if (usuario.SenhaUsuario != login.SenhaUsuario)
    {
        return Results.Ok("Senha incorreta.");
    }

    return Results.Ok("Login realizado com sucesso.");
});


app.MapPost("/api/quadro/criar", async ([FromBody] Quadros quadro, [FromServices] AppDataContext ctx) =>
{
    if (string.IsNullOrEmpty(quadro.TituloQuadro))
    {
        return Results.BadRequest("Titulo do quadro é obrigatório.");
    }

    ctx.Quadros.Add(quadro);
    await ctx.SaveChangesAsync();

    return Results.Created($"/api/usuario/{quadro.IdQuadro}", quadro);

});

app.MapGet("/api/ola", () => "Olá Mundo!");


app.Run();
