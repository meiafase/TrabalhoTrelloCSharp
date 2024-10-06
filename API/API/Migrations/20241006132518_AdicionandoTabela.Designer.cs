﻿// <auto-generated />
using System;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(AppDataContext))]
    [Migration("20241006132518_AdicionandoTabela")]
    partial class AdicionandoTabela
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.8");

            modelBuilder.Entity("API.Models.Quadros", b =>
                {
                    b.Property<int>("IdQuadro")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CriadoEm")
                        .HasColumnType("TEXT");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("INTEGER");

                    b.Property<string>("TituloQuadro")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("IdQuadro");

                    b.HasIndex("IdUsuario");

                    b.ToTable("Quadros");
                });

            modelBuilder.Entity("API.Models.Usuarios", b =>
                {
                    b.Property<int>("IdUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CriadoEm")
                        .HasColumnType("TEXT");

                    b.Property<string>("EmailUsuario")
                        .HasColumnType("TEXT");

                    b.Property<string>("NomeUsuario")
                        .HasColumnType("TEXT");

                    b.Property<string>("SenhaUsuario")
                        .HasColumnType("TEXT");

                    b.HasKey("IdUsuario");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("API.Models.Quadros", b =>
                {
                    b.HasOne("API.Models.Usuarios", "Usuario")
                        .WithMany("Quadros")
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("API.Models.Usuarios", b =>
                {
                    b.Navigation("Quadros");
                });
#pragma warning restore 612, 618
        }
    }
}
