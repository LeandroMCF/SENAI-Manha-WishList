import { Component } from 'react';
import './style.css' 

class wish extends Component{
    constructor(props){
        super(props);
        this.state = {
            desejos : [],
            usuario : {},
            email : '',
            senha : '',
            id : '',
            titulo : '',
            descricao : ''
        }
    }
    
    attEmail = async (log) =>{
        await this.setState({email : log.target.value})
        console.log('email: ' + this.state.email)
    }
    
    attSenha = async (log) =>{
        await this.setState({senha : log.target.value})
        console.log('senha: ' + this.state.senha)
    }

    attTitulo = async (log) =>{
        await this.setState({titulo : log.target.value})
        console.log('titulo: ' + this.state.titulo)
    }

    attDscricao = async (log) =>{
        await this.setState({descricao : log.target.value})
        console.log('descricao: ' + this.state.descricao)
    }

    exibir = () =>{

        fetch('http://localhost:5000/api/Desejo/' + this.state.usuario.idUsuario)

        .then(resposta => resposta.json())

        .then(data => this.setState({ desejos : data }))

        .catch( (erro) => console.log(erro) )
    }

    login = async (event) =>{

        event.preventDefault();

        fetch('http://localhost:5000/api/Usuario/Login', {
            method : 'POST',

            body : JSON.stringify({
                Email : this.state.email,
                Senha : this.state.senha
            }),

            headers : {
                "Content-Type" : "application/json"
            },
        })

        .then(resposta => resposta.json())

        .then(data => this.setState({usuario : data}))

        .catch((erro) => console.log(erro))

        .then(this.exibir)
    }


    cadastrar = async (event) => {
        event.preventDefault();
            fetch('http://localhost:5000/api/Desejo', {

                method : 'POST',

                body : JSON.stringify({
                    idUsuario : this.state.usuario.idUsuario,
                    titulo : this.state.titulo,
                    descricao : this.state.descricao
                }),

                headers : {
                    "Content-Type" : "application/json"
                },
            })

            .then(console.log("Desejo cadastrado!"))

            .catch(erro => console.log(erro))

            .then(this.exibir)        
    }

    excluir = (wishList) => {
        
        fetch('http://localhost:5000/api/Desejo/' + wishList.idDesejo, {
            method : 'DELETE'
        })

        .then(console.log('excluindo'))

        .catch(erro => console.log(erro))

        .then(this.exibir)
    }

    render(){
        return(
            <div className="content">
                <header>
                    <div className='entrar'>
                        <h2>ENTRAR</h2>
                        <form onSubmit={this.login}>
                            <input
                                type='text'
                                value={this.state.email}
                                onChange={this.attEmail}
                                placeholder='Email'
                            />
                            <input
                                type='text'
                                value={this.state.senha}
                                onChange={this.attSenha}
                                placeholder='Senha'
                            />
                            <button className='botao' type='submit'>Entrar</button>
                        </form>
                    </div>

                    <h1>WISH LIST</h1>
                </header>
                <section>
                    <h2>Adicionar desejo</h2>
                    <div className='adicionar'>
                        <form onSubmit={this.cadastrar}>
                            <h2>Título</h2>
                            <input
                                type='text'
                                value={this.state.titulo}
                                onChange={this.attTitulo}
                                placeholder='Digite aqui'
                            />
                            <h2>Descrição</h2>
                            <input
                                type='text'
                                value={this.state.descricao}
                                onChange={this.attDscricao}
                                placeholder='Digite aqui'
                            />
                            <button className='botao' type='submit'>Adicionar</button>
                        </form>
                    </div>

                    <div className='desejos'>
                        <h2>Desejos</h2>
                        <div className='bloco'>
                            <table>
                                <tbody>
                                    {
                                        this.state.desejos.map( (wishList) => {
                                            return(
                                                <tr key={wishList.idDesejo}>
                                                    <td>{wishList.idDesejo}</td>
                                                    <td>{wishList.titulo}</td>
                                                    <td>{wishList.descricao}</td>
                                                    <td><button onClick={() => this.excluir(wishList)}>Excluir</button></td>
                                                </tr>
                                            )  
                                        } )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>                    
                </section>
            </div>
        )
    }
}

export default wish