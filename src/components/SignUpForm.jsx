import { Component } from "react";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchResponse = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.state.name, email: this.state.email, password: this.state.password })
      })
      if(!fetchResponse.ok) throw new Error('Fetch Failed - Bad Request ' + fetchResponse.status)
    
      let token = await fetchResponse.json()
      localStorage.setItem('token', token)

      const userDoc = JSON.parse(atob(token.split('.')[1])).user
      this.props.setUserInState(userDoc)
    } catch (err) {
      console.log("SignupForm error", err);
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
        <div className="my-48 mx-auto w-80">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <div className='my-6 flex justify-between'>
              <label className='ml-12 font-semibold'>Username</label>
              <input className='bg-inherit border-b border-black focus:outline-none' type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            </div>
            <div className='my-6 flex justify-between'>
              <label className='ml-12 font-semibold'>Email</label>
              <input className='bg-inherit border-b border-black focus:outline-none' type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            </div>
            <div className='my-6 flex justify-between'>
              <label className='ml-12 font-semibold'>Password</label>
              <input className='bg-inherit border-b border-black focus:outline-none' type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            </div>
            <div className='my-6 flex justify-between'>
              <label className='ml-12 font-semibold'>Confirm</label>
              <input className='bg-inherit border-b border-black focus:outline-none' type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            </div>
            <button className='mt-3 bg-indigo-300 font-semibold border border-0 rounded border-black px-5 py-1 transition ease-linear duration-150 hover:bg-green-200' type="submit" disabled={disable}>SIGN UP</button>
          </form>
          <p className="error-message text-rose-500 font-semibold text-lg">&nbsp;{this.state.error}</p>
        </div>
    );
  }
}