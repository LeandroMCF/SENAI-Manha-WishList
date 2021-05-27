using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.Contexts;
using WishList.Domains;
using WishList.Interfaces;

namespace WishList.Repositories
{
    public class DesejoRepository : IDesejoRepository
    {
        WishListContext ctx = new WishListContext();

        public void Cadastrar(Desejo novoDesejo)
        {
            ctx.Desejos.Add(novoDesejo);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            Desejo desejo = ctx.Desejos.Find(id);

            ctx.Desejos.Remove(desejo);

            ctx.SaveChanges();
        }

        public List<Desejo> Listar()
        {
            return ctx.Desejos
                .Select(d =>
                new Desejo
                {
                    IdDesejo = d.IdDesejo,
                    Titulo = d.Titulo,
                    Descricao = d.Descricao,
                    IdUsuario = d.IdUsuario,

                    IdUsuarioNavigation = new Usuario
                    {
                        Nome = d.IdUsuarioNavigation.Nome
                    }
                })
                .ToList();
        }

        public List<Desejo> ListarPorId(int id)
        {
            return ctx.Desejos
                .Include(d => d.IdUsuarioNavigation)
                .Where(d => d.IdUsuarioNavigation.IdUsuario == id)
                .ToList();
        }
    }
}
