using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using HeroesApi.Models;

namespace HeroesApi.Controllers
{
    [Route("api/heroes")]
    [ApiController]
    public class HeroController : ControllerBase
    {
        private readonly HeroesDBContext _context;

        public HeroController(HeroesDBContext context)
        {
            _context = context;

        }
        
        [HttpGet]
        [Route("/search")]
        public async Task<ActionResult<IEnumerable<Hero>>> SearchHeroes()
        {
            return await _context.Heroes.ToListAsync();
        }

        // GET: api/heroes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hero>>> GetHeroes()
        {
            return await _context.Heroes.FromSql("select Heroes.id, Heroes.name, Heroes.heroType, HeroTypes.type from Heroes, HeroTypes Where Heroes.heroType = HeroTypes.id").ToListAsync();
        }

        // GET: api/heroes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hero>> GetHero(int id)
        {
            var hero = await _context.Heroes.FindAsync(id);

            if (hero == null)
            {
                return NotFound();
            }

            return hero;
        }
               
        // POST: api/heroes
        [HttpPost]
        public async Task<ActionResult<Hero>> PostHero(Hero hero)
        {
            _context.Heroes.Add(hero);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHero), new { id = hero.id }, hero);
        }

        // PUT: api/heroes
        [HttpPut]
        public async Task<IActionResult> UpdateHero(Hero hero)
        {
            
            _context.Entry(hero).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/heroes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHero(int id)
        {
            var hero = await _context.Heroes.FindAsync(id);

            if (hero == null)
            {
                return NotFound();
            }

            _context.Heroes.Remove(hero);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}