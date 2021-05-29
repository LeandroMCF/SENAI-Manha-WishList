using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.Domains;

namespace WishList.Interfaces
{
    interface IUsuarioRepository
    {
        List<Usuario> Listar();
        Usuario Login(string email, string senha);
        void Cadastrar(Usuario novoUsuario);
        void Excluir(int Id);
    }
}
