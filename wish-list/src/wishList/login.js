import { Component } from 'react';
import './style.css'

class login extends Component{
    constructor(props){
        super(props);
        this.state = {
            usuario : [],
            email : '',
            senha : '',
            idUsuario : ''
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

    login = (event) =>{

        event.preventDefault();

        fetch('http://localhost:5000/api/Usuario/Login')
        .then(resposta => resposta.json())
        .then(data => this.setState({usuario : data}))
        .then(console.log(this.state.usuario))
        .catch((erro) => console.log(erro))
    }

    render(){
        return(
            <div className='content'>
                <h1>Efetue o login para começar</h1>

                <div className='formulario'>
                    <form onSubmit={this.login}>
                        <div className='campo'>
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
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default login