using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tour_of_heroes_combined.Models
{
    public class HeroViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int HeroTypeId { get; set; }
        public string HeroType { get; set; }
    }
}
