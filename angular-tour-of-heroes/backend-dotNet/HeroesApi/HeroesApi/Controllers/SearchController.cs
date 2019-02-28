using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using HeroesApi.Models;
using System.Linq;

namespace HeroesApi.Controllers
{
    [Route("api/search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly HeroesDBContext _context;

        public SearchController(HeroesDBContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hero>>> SearchHeroes()
        {
            string term = Request.Query["term"];
            return await _context.Heroes.Where(hero => hero.name.ToLower().Contains(term.ToLower())).ToListAsync();
        }

    }
}