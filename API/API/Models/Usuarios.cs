using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Usuarios
{
    public Usuarios()
    {
        CriadoEm = DateTime.Now;
    }

    [Key]
    public int IdUsuario { get; set; }
    public string? EmailUsuario { get; set; }
    public string? NomeUsuario { get; set; }
    public string? SenhaUsuario { get; set; }
    public DateTime CriadoEm { get; set; }

    public ICollection<Quadros>? Quadros { get; set; }
    public ICollection<Tarefas>? Tarefas { get; set; }
    public ICollection<Comentarios>? Comentarios { get; set; }

}
