using System;
using System.Collections.Generic;

namespace tour_of_heroes_combined.Models
{
    public partial class Hero
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int HeroType { get; set; }

        public virtual HeroTypes HeroTypeNavigation { get; set; }
    }
}
