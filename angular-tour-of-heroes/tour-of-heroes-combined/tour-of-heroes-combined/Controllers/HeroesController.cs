using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tour_of_heroes_combined.Models;

namespace tour_of_heroes_combined.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class HeroesController : ControllerBase
    {
        private readonly HeroesDBContext _context;

        public HeroesController(HeroesDBContext context)
        {
            _context = context;
        }

        // GET: api/Heroes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HeroViewModel>>> GetHeroesTable()
        {
            var heroes = await _context.HeroesTable.Select(x => new HeroViewModel
            {
                Id = x.Id,
                Name = x.Name,
                HeroTypeId = x.HeroType,
                HeroType = x.HeroTypeNavigation.Type
            }).ToListAsync();
        
            return heroes;   
        }

        // GET: api/Heroes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hero>> GetHero(int id)
        {
            var hero = await _context.HeroesTable.FindAsync(id);

            if (hero == null)
            {
                return NotFound();
            }

            return hero;
        }

        // PUT: api/Heroes/5
        [HttpPut]
        public async Task<IActionResult> UpdateHero(Hero hero)
        {

            _context.Entry(hero).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Heroes
        [HttpPost]
        public async Task<ActionResult<Hero>> PostHero(Hero hero)
        {
            _context.HeroesTable.Add(hero);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHero), new { id = hero.Id }, hero);
        }


        // DELETE: api/Heroes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Hero>> DeleteHero(int id)
        {
            var hero = await _context.HeroesTable.FindAsync(id);
            if (hero == null)
            {
                return NotFound();
            }

            _context.HeroesTable.Remove(hero);
            await _context.SaveChangesAsync();

            return hero;
        }

        private bool HeroExists(int id)
        {
            return _context.HeroesTable.Any(e => e.Id == id);
        }
    }
}
