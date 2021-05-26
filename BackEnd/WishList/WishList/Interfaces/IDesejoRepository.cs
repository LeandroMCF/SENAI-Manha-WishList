using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.Domains;

namespace WishList.Interfaces
{
    interface IDesejoRepository
    {
        List<Desejo> Listar();
        void Cadastrar(Desejo novoDesejo);
        void Deletar(int id);
        List<Desejo> ListarPorId(int id);
    }
}
