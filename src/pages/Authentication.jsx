import React, {Component} from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

export default class AuthPage extends Component {
  state = {
    showLogin: true,
  };

  render() {
    return (
      <main className="AuthPage">
        <div className="flex justify-between h-28 border-b-2 border-black">
            <h1 className='text-5xl font-semibold m-auto'>TO-DOS</h1>
        </div>
        {this.state.showLogin ? (
          <LoginForm setUserInState={this.props.setUserInState} />
        ) : (
          <SignUpForm setUserInState={this.props.setUserInState} />
        )}
        <button className='mx-24 bg-indigo-300 border border-0 rounded border-black px-5 py-1 transition ease-linear duration-150 hover:bg-slate-200' onClick={() => this.setState({ showLogin: !this.state.showLogin })}>{this.state.showLogin ? "Don't have an account? Sign up" : "Have an account? Log in"}</button>
      </main>
    );
  }
}