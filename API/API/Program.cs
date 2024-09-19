var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();


app.MapPost("/api/usuario/cadastrar", () =>
{
    
});



app.Run();
