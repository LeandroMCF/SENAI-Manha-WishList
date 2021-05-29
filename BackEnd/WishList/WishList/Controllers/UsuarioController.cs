using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.Domains;
using WishList.Interfaces;
using WishList.Repositories;

namespace WishList.Contexts
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }
        
        public UsuarioController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(_usuarioRepository.Listar());
        }

        [HttpPost]
        public IActionResult Cadastrar(Usuario novoUsuario)
        {
            if (novoUsuario == null)
            {
                return BadRequest("Os dados estão vazios");
            }
            else
            {
                _usuarioRepository.Cadastrar(novoUsuario);
                return StatusCode(202);
            }

        }

        [HttpPost("{Login}")]
        public IActionResult Login(Usuario usuario)
        {
            Usuario conta = _usuarioRepository.Login(usuario.Email, usuario.Senha);

            if (conta == null)
            {
                return NotFound("Email ou senha incorretos");
            }
            else
            {
                return Ok(conta);
            }
        }
    }
}
