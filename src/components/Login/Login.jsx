import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';



const auth = getAuth(app);

const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const emailRef = useRef();


    const handleLogin = event => {
        event.preventDefault();
        setError('');
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please At least one uppercase character');
            return;
        }
        else if (!/(?=.*[a-z])/.test(password)) {
            setError('Please At least one lowercase character');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                // if(!loggedUser.emailVerified){
                //     setError('Your email is not verified');
                // }
                setSuccess('User login successfully');
                setError('');
            })
            .catch(error => {
                setError(error.message);
                setSuccess('');
            })
    }

    const handleResetPassword = event => {
        const email = emailRef.current.value;
        if(!email){
            alert('Please provide your email address to reset password');
            return;
        }

        sendPasswordResetEmail(auth, email)
        .then( () => {
            alert('Please check your email');
        })
        .catch(error => {
            console.log(error);
            setError(error.message);
        })
    }



    return (
        <div className='mt-5'>
            <h3>Please Login</h3>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" ref={emailRef} name='email' className="form-control mt-3 mb-3" id="email" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' className="form-control mt-3 mb-3" id="password" placeholder="Password" required />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>

            <p><small>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p>

            <p><small>New to this website? Please <Link to="/register">Register</Link></small></p>
            <p className='text-success'>{success}</p>
            <p className='text-danger'>{error}</p>
        </div>
    );
};

export default Login;