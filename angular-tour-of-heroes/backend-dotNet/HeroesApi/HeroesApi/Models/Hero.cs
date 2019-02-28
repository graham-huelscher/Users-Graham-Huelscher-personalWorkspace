using System;
using System.Collections.Generic;

namespace HeroesApi.Models
{
    public partial class Hero
    {
        public int id { get; set; }
        public string name { get; set; }
        public int? heroType { get; set; }

        public virtual HeroTypes HeroTypeNavigation { get; set; }
    }
}
