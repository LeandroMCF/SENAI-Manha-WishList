using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.Domains;
using WishList.Interfaces;
using WishList.Repositories;

namespace WishList.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class DesejoController : ControllerBase
    {
        private IDesejoRepository _desejoRepository { get; set; }

        public DesejoController()
        {
            _desejoRepository = new DesejoRepository();
        }

        [HttpGet]
        public IActionResult ListarTodos()
        {
            return Ok(_desejoRepository.Listar());
        }

        [HttpPost]
        public IActionResult Cadastrar(Desejo novoDesejo)
        {
            if (novoDesejo == null)
            {
                return BadRequest("Os dados estão vazios");
            }
            else
            {
                _desejoRepository.Cadastrar(novoDesejo);
                return StatusCode(202);
            }
        }

        [HttpGet("{id}")]
        public IActionResult ListarId(int id)
        {
            return Ok(_desejoRepository.ListarPorId(id));
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            _desejoRepository.Deletar(id);

            return StatusCode(204);
        }
    }
}
