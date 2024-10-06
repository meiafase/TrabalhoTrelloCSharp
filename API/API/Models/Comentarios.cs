using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Comentarios
{
   [Key]
    public int IdComentario { get; set; }
    
    public int IdUsuario { get; set; }
    [ForeignKey("IdUsuario")]
    public Usuarios? Usuario { get; set; }
    
    public int IdTarefa { get; set; }
    [ForeignKey("IdTarefa")]
    public Tarefas? Tarefa { get; set; }
    
    public string? Comentario { get; set; }
    
    public DateTime CriadoEm { get; set; } = DateTime.Now;
}
