using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace tour_of_heroes_combined.Models
{
    public partial class HeroesDBContext : DbContext
    {
        public HeroesDBContext()
        {
        }

        public HeroesDBContext(DbContextOptions<HeroesDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<HeroTypes> HeroTypes { get; set; }
        public virtual DbSet<Hero> HeroesTable { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=desktop-7hhlj2t\\sqlexpress;Database=HeroesDB;User Id=sa; Password=sql2017;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.2-servicing-10034");

            modelBuilder.Entity<HeroTypes>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnName("type")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Hero>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.HeroType).HasColumnName("heroType");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.HasOne(d => d.HeroTypeNavigation)
                    .WithMany(p => p.Heroes)
                    .HasForeignKey(d => d.HeroType)
                    .HasConstraintName("FK__Heroes__heroType__5CD6CB2B");
            });
        }
    }
}
