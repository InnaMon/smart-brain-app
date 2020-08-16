import React from 'react';
import Spinner from '../Spinner/Spinner';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            error: '',
            loading: false
        }
        this.formRef = React.createRef();
    }

    onChangeHandler = (e) => {
        const { id, value } = e.target;
        this.setState({[id] : value})
    }

    onSubmitSignIn =() => {
        this.setState({loading : true})
        fetch('https://fast-plateau-16833.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            } else {
                this.setState({error : '* Your email or password is incorrect. Try again!'})
            }
            this.setState({loading : false})
        })
        .catch(err => {
            console.log('Signin error', err)
            this.setState({loading : false})
        })
    }

    validateForm = () => {
        let validity = this.formRef.current.checkValidity();
        if (!validity) {
            this.setState({error : '* Signin credentials are invalid!'})
        } else {
            this.onSubmitSignIn()
        }
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                { this.state.loading ? <Spinner /> :
                    <div className="measure">
                        <form ref={this.formRef}>
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="signInEmail" 
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
                                id="signInPassword" 
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
                            value="Sign in" 
                          />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                        <div><p style={{color: 'yellow', fontWeight: '600'}}>{this.state.error}</p></div>
                    </div> }
                </main>
            </article>
        );
    }
} 

export default Signin;