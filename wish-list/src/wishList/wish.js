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
            <div className="conteudo">
                <header className='cabecalho'>
                    <div className='content'>
                        <div className='entrar '>
                            <h2>Entrar</h2>
                            <form className='formularioEntrar' onSubmit={this.login}>
                                <input
                                    className='digitar email'
                                    type='text'
                                    value={this.state.email}
                                    onChange={this.attEmail}
                                    placeholder='Email'
                                />
                                <input
                                    className='digitar senha'
                                    type='text'
                                    value={this.state.senha}
                                    onChange={this.attSenha}
                                    placeholder='Senha'
                                />
                                <button className='botao' type='submit'>Entrar</button>
                            </form>
                        </div>
                        <div className='alinharTitulo'>
                            <h1 className='wishlistTitle'>WISH LIST</h1>
                        </div>
                    </div>
                </header>
                
                <section className='cadastrar'>
                    <div className='content'>
                        <div className='adicionar'>
                            <h2 className='addDesejo'>Adicionar desejo</h2>
                            <form className='formularioCad' onSubmit={this.cadastrar}>
                                <div className='alinharCad '>
                                    <div className='campoCadastrar tituloCad'>
                                        <h2>Título</h2>
                                        <input
                                            type='text'
                                            value={this.state.titulo}
                                            onChange={this.attTitulo}
                                            placeholder='Digite aqui'
                                        />
                                    </div>
                                        <div className='campoCadastrar descricaoCad'>
                                        <h2>Descrição</h2>
                                        <textarea
                                            rows="5"
                                            type='text'
                                            value={this.state.descricao}
                                            onChange={this.attDscricao}
                                            placeholder='Digite aqui'
                                        />
                                    </div>
                                </div>
                                <div className='alinharBotao'>
                                    <button className='botao2' type='submit'>Adicionar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <section>
                    <div className='listar'>
                        <div className='content'>
                            <div className='alinhar'>
                                <div className='listarTit'>
                                    <h2>Desejos</h2>
                                </div>
                                <table className='table'>
                                    <div className='alinharExibir'>
                                        <tbody id='blocos'>
                                            { 
                                                this.state.desejos.map( (wishList) => {
                                                    return(
                                                        <tr key={wishList.idDesejo}>
                                                            <div id='bloco'>
                                                                <div className='alinharExibirTit'>
                                                                    <td id='titulo'>{wishList.titulo}</td>
                                                                </div>
                                                                <div className='alinharExibirDesc'>
                                                                    <td id='descricao'>{wishList.descricao}</td>
                                                                </div>
                                                                <div className='alinharExibirBot'>
                                                                    <td><button id='botaoExibir' onClick={() => this.excluir(wishList)}>Excluir</button></td>
                                                                </div>
                                                            </div>
                                                        </tr>
                                                    )
                                                } )
                                            }
                                        </tbody>
                                    </div>
                                </table>
                            </div>
                        </div>                    
                    </div>
                </section>
            </div>
        )
    }
}

export default wish