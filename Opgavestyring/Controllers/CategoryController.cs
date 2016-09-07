using Opgavestyring.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Opgavestyring.Controllers
{
    public class CategoryController : ApiController
    {
        private DataContext _db = new DataContext();

        [HttpGet]
        public List<Category> GetAll()
        {
            return _db.Category.OrderBy(p => p.Id).ToList();
        }

        [HttpGet]
        public IHttpActionResult GetById(int Id)
        {
            Category category = _db.Category.Where(p => p.Id == Id).FirstOrDefault();
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        public IHttpActionResult CreateCategory(Category model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _db.Category.Add(model);
            _db.SaveChanges();

            return Ok(model);
        }

        [HttpDelete]
        public IHttpActionResult DeleteProduct(int Id)
        {
            Category category = _db.Category.Where(p => p.Id == Id).FirstOrDefault();
            if (category == null)
            {
                return NotFound();
            }

            _db.Category.Remove(category);
            _db.SaveChanges();

            return Ok(category);
        }
    }
}
