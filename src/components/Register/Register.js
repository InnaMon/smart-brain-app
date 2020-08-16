import React from 'react';
import Spinner from '../Spinner/Spinner';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            error: '',
            loading: false
        }
        this.formRef = React.createRef();
    }

    onChangeHandler = (e) => {
        const { id, value } = e.target;
        this.setState({[id] : value})
    }

    onSubmitRegister =() => {
        this.setState({loading : true})
        fetch('https://fast-plateau-16833.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
            this.setState({loading : false})
        })
        .catch(err => {
            console.log('Register error', err)
            this.setState({loading : false})
        })
    }

    validateForm = () => {
        let validity = this.formRef.current.checkValidity();
        if (!validity) {
            this.setState({error : '* Register credentials are invalid!'})
        } else {
            this.onSubmitRegister()
        }
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                { this.state.loading ? <Spinner /> :
                    <div className="measure">
                        <form ref={this.formRef}>
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name"
                                required
                                onChange={this.onChangeHandler} 
                            />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email"
                                required
                                onChange={this.onChangeHandler} 
                            />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                                required
                                onChange={this.onChangeHandler}
                            />
                            </div>
                            </fieldset>
                        </form>
                        <div className="">
                          <input 
                            onClick={this.validateForm}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" 
                          />
                        </div>
                        <div><p style={{color: 'yellow', fontWeight: '600'}}>{this.state.error}</p></div>
                    </div> }
                </main>
            </article>
        );
    }
}

export default Register;