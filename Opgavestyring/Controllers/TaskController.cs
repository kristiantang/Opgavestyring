using Opgavestyring.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Opgavestyring.Controllers
{
    public class TaskController : ApiController
    {
        private DataContext _db = new DataContext();

        [HttpGet]
        public List<Task> GetAll()
        {
            return _db.Task.OrderBy(p => p.Id).ToList();
        }

        [HttpGet]
        public IHttpActionResult GetById(int Id)
        {
            Task task = _db.Task.Where(p => p.Id == Id).FirstOrDefault();
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpPost]
        public IHttpActionResult CreateTask(Task model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            model.Created = DateTime.Now;
            _db.Task.Add(model);
            _db.SaveChanges();

            return Ok(model);
        }

        [HttpPut]
        public IHttpActionResult UpdateTask(int Id)
        {

            Task task = _db.Task.Where(p => p.Id == Id).FirstOrDefault();
            if (task == null)
            {
                return NotFound();
            }
            task.Finished = !task.Finished;

            _db.Entry(task).State = System.Data.Entity.EntityState.Modified;
            _db.SaveChanges();

            return Ok(task);
        }

        [HttpDelete]
        public IHttpActionResult DeleteTask(int Id)
        {
            Task task = _db.Task.Where(p => p.Id == Id).FirstOrDefault();
            if (task == null)
            {
                return NotFound();
            }

            _db.Task.Remove(task);
            _db.SaveChanges();

            return Ok(task);
        }

        [HttpPost]
        public IHttpActionResult UpdateCategory(int Id, int categoryId)
        {
            Task task = _db.Task.Where(p => p.Id == Id).FirstOrDefault();
            if (task == null)
            {
                return NotFound();
            }
            task.CategoryId = categoryId;

            _db.Entry(task).State = System.Data.Entity.EntityState.Modified;
            _db.SaveChanges();

            return Ok(task);
        }
    }
}
