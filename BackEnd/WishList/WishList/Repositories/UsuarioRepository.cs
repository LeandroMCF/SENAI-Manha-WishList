using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.Contexts;
using WishList.Domains;
using WishList.Interfaces;

namespace WishList.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        WishListContext ctx = new WishListContext();

        public void Cadastrar(Usuario novoUsuario)
        {
            ctx.Usuarios.Add(novoUsuario);

            ctx.SaveChanges();
        }

        public void Excluir(int Id)
        {
            Usuario usuario = ctx.Usuarios.Find(Id);

            Desejo desejo = ctx.Desejos.FirstOrDefault(d => d.IdUsuarioNavigation.IdUsuario == Id);

            if (desejo != null)
            {
                ctx.Desejos.Remove(desejo);
            }

            ctx.Usuarios.Remove(usuario);

            ctx.SaveChanges();
        }

        public List<Usuario> Listar()
        {
            return ctx.Usuarios
                .Select(u => 
                new Usuario
                {
                    IdUsuario = u.IdUsuario,
                    Nome = u.Nome,
                    Email = u.Email
                })
                .ToList();
        }

        public Usuario Login(string email, string senha)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.Email == email && u.Senha == senha);
        }
    }
}
