using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Tarefas
{
[Key]
    public int IdTarefa { get; set; }
    
    public int? IdUsuario { get; set; }
    [ForeignKey("IdUsuario")]
    public Usuarios? Usuario { get; set; }
    
    public int? IdQuadro { get; set; }
    [ForeignKey("IdQuadro")]
    public Quadros? Quadro { get; set; }
    
    public string? DescricaoTarefa { get; set; }
    
    public DateTime? DataEntregaTarefa { get; set; }
    
    public DateTime CriadoEm { get; set; } = DateTime.Now;

    public ICollection<Comentarios>? Comentarios { get; set; } 
}
