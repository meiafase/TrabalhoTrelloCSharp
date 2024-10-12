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

    return Results.Created($"/api/quadro/{quadro.IdQuadro}", quadro);

});

app.MapGet("/api/quadro/listar/{id}", async (int id, [FromServices] AppDataContext ctx) => {
    var quadros = await ctx.Quadros.Where(q => q.IdUsuario == id).ToListAsync();

    return Results.Ok(quadros);
});


app.MapPut("/api/quadro/atualizar/{id}", async (int id, [FromBody] Quadros quadroAtualizado, [FromServices] AppDataContext ctx) =>
{
    var quadro = await ctx.Quadros.FindAsync(id);
    if (quadro == null) return Results.NotFound("Quadro não encontrado.");

    quadro.TituloQuadro = quadroAtualizado.TituloQuadro ?? quadro.TituloQuadro;

    await ctx.SaveChangesAsync();
    return Results.Ok(quadro);
});


app.MapDelete("/api/quadro/deletar/{id}", async (int id, [FromServices] AppDataContext ctx) =>
{
    var quadro = await ctx.Quadros.FindAsync(id);
    if (quadro == null) return Results.NotFound("Quadro não encontrado.");

    ctx.Quadros.Remove(quadro);
    await ctx.SaveChangesAsync();

    return Results.Ok("Quadro deletado com sucesso.");
});

app.MapPost("/api/tarefa/criar", async ([FromBody] Tarefas tarefa, [FromServices] AppDataContext ctx) =>
{
    // Validação para verificar se o título e a descrição foram fornecidos
    if (string.IsNullOrEmpty(tarefa.TituloTarefa) || string.IsNullOrEmpty(tarefa.DescricaoTarefa))
    {
        return Results.BadRequest("Título e Descrição são obrigatórios.");
    }

    var quadro = await ctx.Quadros.FindAsync(tarefa.IdQuadro);
    if (quadro == null)
    {
        return Results.BadRequest("Quadro não encontrado.");
    }

    // Adicionar a nova tarefa ao contexto
    ctx.Tarefas.Add(tarefa);

    // Salvar as alterações no banco de dados
    await ctx.SaveChangesAsync();

    // Retornar o status 201 Created com a URI da nova tarefa
    return Results.Created($"/api/tarefa/{tarefa.IdTarefa}", tarefa);

});

app.MapPut("/api/tarefa/atualizar/{id}", async (int id, [FromBody] Tarefas tarefaAtualizada, [FromServices] AppDataContext ctx) =>
{
    // Buscar a tarefa pelo Id no banco de dados
    var tarefa = await ctx.Tarefas.FindAsync(id);
    
    if (tarefa == null)
    {
        return Results.NotFound("Tarefa não encontrada.");
    }

    // Atualizar os campos da tarefa, se fornecidos
    tarefa.TituloTarefa = tarefaAtualizada.TituloTarefa ?? tarefa.TituloTarefa;
    tarefa.DescricaoTarefa = tarefaAtualizada.DescricaoTarefa ?? tarefa.DescricaoTarefa;
    

    // Salvar as mudanças no banco de dados
    await ctx.SaveChangesAsync();

    return Results.Ok("Tarefa atualizada com sucesso.");
});


app.MapDelete("/api/tarefa/deletar/{id}", async (int id, [FromServices] AppDataContext ctx) =>
{
    // Buscar a tarefa pelo Id no banco de dados
    var tarefa = await ctx.Tarefas.FindAsync(id);
    
    if (tarefa == null)
    {
        return Results.NotFound("Tarefa não encontrada.");
    }

    // Remover a tarefa do contexto
    ctx.Tarefas.Remove(tarefa);

    // Salvar as mudanças no banco de dados
    await ctx.SaveChangesAsync();

    return Results.Ok("Tarefa deletada com sucesso.");
});


app.MapPost("/api/comentario/cadastrar", async ([FromBody] Comentarios comentario, [FromServices] AppDataContext ctx) =>
{
     // Verificar se o usuário existe
    var usuario = await ctx.Usuarios.FindAsync(comentario.IdUsuario);
    if (usuario == null)
    {
        return Results.BadRequest("Usuário não encontrado.");
    }

    // Verificar se a tarefa existe
    var tarefa = await ctx.Tarefas.FindAsync(comentario.IdTarefa);
    if (tarefa == null)
    {
        return Results.BadRequest("Tarefa não encontrada.");
    }

    // Adicionar o comentário e salvar no banco
    ctx.Comentarios.Add(comentario);
    await ctx.SaveChangesAsync();

    return Results.Ok("Comentário criado com sucesso.");
});

app.MapDelete("/api/comentario/deletar/{id}", async (int id, [FromServices] AppDataContext ctx) =>
{
    var comentario = await ctx.Comentarios.FindAsync(id);
    
    if (comentario == null)
    {
        return Results.NotFound("Comentário não encontrado.");
    }

    ctx.Comentarios.Remove(comentario);
    await ctx.SaveChangesAsync();

    return Results.Ok("Comentário deletado com sucesso.");
});

app.MapGet("/api/comentario/listar/{id}", async (int id, [FromServices] AppDataContext ctx) => {
    var comentario = await ctx.Comentarios.Where(q => q.IdTarefa == id).ToListAsync();

    return Results.Ok(comentario);
});


app.Run();
