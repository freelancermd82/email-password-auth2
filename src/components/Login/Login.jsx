import React from 'react';

const Login = () => {



    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
    }



    return (
        <div className='mt-5'>
            <h3>Please Login</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name='email' className="form-control mt-3 mb-3" id="email" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' className="form-control mt-3 mb-3" id="password" placeholder="Password" />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    );
};

export default Login;