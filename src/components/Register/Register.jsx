import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';



const auth = getAuth(app);

const Register = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('');
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        console.log(name, email, password);
        if(!/(?=.*[A-Z])/.test(password)){
            setError('please add at least one upperCase');
            return;
        }
        else if(!/(?=.*[a-z])/.test(password)){
            setError('At least one lowercase');
            return;
        }
        // create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('');
            event.target.reset();
            setSuccess('User has been created successfully');
            sendVerificationEmail(loggedUser);
            updateUserData(loggedUser, name);
        })
        .catch(error => {
            console.error(error.message);
            setError(error.message);
            
        })
    }

    const sendVerificationEmail = (loggedUser) => {
        sendEmailVerification(loggedUser)
        .then(result => {
            console.log(result);
            alert('Please verify your email address');
        })
    }
    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
        .then( () =>{
            console.log('user name updated');
        })
        .catch(error => {
            setError(error.message);
        })
    }

    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        // setEmail(event.target.value);

    }
    const handlePasswordBlur = (event) => {
        // console.log(event.target.value);
    }
    return (
        <div>
            <h3>Please Register</h3>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 rounded ps-2' type="text" name="name" id="name" required placeholder='Your name'/>
                <br />
                <input className='w-50 mb-4 rounded ps-2' onChange={handleEmailChange} type="email" name="email" id="email" required placeholder='Your email'/>
                <br />
                <input className='w-50 mb-4 rounded ps-2' onBlur={handlePasswordBlur} type="password" name="password" id="password" required placeholder='Your password'/>
                <br />
                <input className='rounded btn btn-primary' type="submit" value="Register" />
            </form>
            
            <p><small>Already have an account? Please <Link to="/login">Login</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;