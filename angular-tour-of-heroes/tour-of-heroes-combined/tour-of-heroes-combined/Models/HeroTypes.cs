using System;
using System.Collections.Generic;

namespace tour_of_heroes_combined.Models
{
    public partial class HeroTypes
    {
        public HeroTypes()
        {
            Heroes = new HashSet<Hero>();
        }

        public int Id { get; set; }
        public string Type { get; set; }

        public virtual ICollection<Hero> Heroes { get; set; }
    }
}
