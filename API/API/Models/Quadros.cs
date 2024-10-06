using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Models;

public class Quadros
{
    [Key]
    public int IdQuadro { get; set; }

    public int IdUsuario { get; set; }
    
    [ForeignKey("IdUsuario")]
    public Usuarios? Usuario { get; set; }
    
    public string? TituloQuadro { get; set; }
    
    public DateTime CriadoEm { get; set; } = DateTime.Now;

    [JsonIgnore] 
    public ICollection<Tarefas>? Tarefas { get; set; }
}
