using System;
using Microsoft.EntityFrameworkCore;

namespace API.Models;

public class AppDataContext : DbContext
{
    public DbSet<Usuarios> Usuarios { get; set; }
    public DbSet<Quadros> Quadros { get; set; }
    public DbSet<Quadros> Tarefas { get; set; }
    public DbSet<Quadros> Comentarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=Trello.db");
    }
}
