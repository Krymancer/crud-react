import React from 'react';
import InputMask from 'react-input-mask';

class AddEditForm extends React.Component {
    state = {
        nome: '',
        email: '',
        telefone: '',
        ativo: true,
        dataNascimento: '',
    };

    onChange = (e) => {
    // console.log(e.target.value)
        if (e.target.name === 'ativo') {
            return this.setState({[e.target.name]: e.target.checked});
        }
        return this.setState({[e.target.name]: e.target.value});
    };

    submitFormAdd = (e) => {
        e.preventDefault();

        const infos = {
            'nome': this.state.nome,
            'telefone': this.state.telefone,
            'email': this.state.email,
            'ativo': this.state.ativo,
            'dataNascimento': this.state.dataNascimento,
        };

        fetch('https://api.box3.work/api/Contato/31c46c8c-cba4-445a-8710-cdfa7432efcf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(infos),
        })
            .then((response) => response.json())
            .then((item) => {
                this.props.addItemToState(item);
                this.props.toggle();
            })
            .catch((err) => console.log(err));
    };

    submitFormEdit = (e) => {
        e.preventDefault();
        fetch('https://api.box3.work/api/Contato/31c46c8c-cba4-445a-8710-cdfa7432efcf/' + this.state.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                telefone: this.state.telefone,
                ativo: this.state.ativo,
                dataNascimento: this.state.dataNascimento,
            }),
        })
            .then((response) => response.json())
            .then((item) => {
                console.log(item);
                this.props.updateState(item);
                this.props.toggle();
            })
            .catch((err) => console.log(err));
    };

    componentDidMount() {
    // if item exists, populate the state with proper data
        if (this.props.item) {
            const {id, nome, email, telefone, ativo, dataNascimento} = this.props.item;
            this.setState({id, nome, email, telefone, ativo, dataNascimento});
        }
    }

    render() {
        return (
            <form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd} className="flex flex-col gap-5 w-full p-5">
                <div className="flex flex-row justify-between">
                    <label htmlFor="name">Nome</label>
                    <input className="bg-gray-100 border-b border-black" id="name" type="text" name="name" onChange={this.onChange} value={this.state.nome === null ? '' : this.state.nome}></input>
                </div>
                <div className="flex flex-row justify-between">
                    <label htmlFor="email">Email</label>
                    <input className="bg-gray-100 border-b border-black" id="email" type="email" name="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}></input>
                </div>
                <div className="flex flex-row justify-between">
                    <label htmlFor="phone">Telefone</label>
                    <InputMask className="bg-gray-100 border-b border-black"mask="(99) 99999-9999" maskChar=" " onChange={this.onChange} value={this.state.telefone === null ? '' : this.state.telefone}></InputMask>
                </div>
                <div className="flex flex-row justify-between">
                    <label htmlFor="active">Ativo</label>
                    <input className="bg-gray-100 border-b border-black" id="active" type="checkbox" name="active" onChange={this.onChange} checked={this.state.ativo}></input>
                </div>
                <div className="flex flex-row justify-between">
                    <label htmlFor="birthday">Data de nascimento</label>
                    <input className="bg-gray-100 border-b border-black" id="birthday" type="date" name="birthday" onChange={this.onChange} value={this.state.dataNascimento === null ? '' : this.state.dataNascimento}></input>
                </div>
                <button className="bg-primary rounded-[6px] py-2 text-white">Enviar</button>
            </form>

        );
    }
}

export default AddEditForm;
