import { Component } from "react";

export default class SignUpForm extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
       // 1. POST our new user info to the server
       const fetchResponse = await fetch('/api/users/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.state.email, password: this.state.password, })
      })

      // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
      if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')

      let token = await fetchResponse.json() // 3. decode fetch response: get jwt token from srv
      localStorage.setItem('token', token);  // 4. Stick token into localStorage

      const userDoc = JSON.parse(atob(token.split('.')[1])).user; // 5. Decode the token + put user document into state
      this.props.setUserInState(userDoc)
    } catch (err) {
      console.log("SignupForm error", err);
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    return (
      <div className='w-1/2 my-48 mx-auto flex justify-between bg-inherit'>
        <div className="mx-auto w-80" onSubmit={this.handleSubmit}>
          <form autoComplete="off">
            <div className='my-6 flex justify-between'>
              <label className='ml-12 font-semibold'>Email</label>
              <input type="text" name="email" value={this.state.email} onChange={this.handleChange} required className='bg-inherit border-b border-black focus:outline-none' />
            </div>
            <div className='my-6 flex justify-between'>
              <label className='ml-12 font-semibold'>Password</label>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required className='bg-inherit border-b border-black focus:outline-none' />
            </div>
            <button type="submit" className='mt-3 mb-24 font-semibold bg-indigo-300 border border-0 rounded border-black px-5 py-1 transition ease-linear duration-150 hover:bg-yellow-200'>LOG IN</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}