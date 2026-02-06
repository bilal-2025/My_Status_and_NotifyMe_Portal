import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginByPortal = () => {
    const [error, setError] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate()

    useEffect(() => {
        loginHandler();
    }, [])

    async function loginHandler(e) {
        const username = searchParams.get("username");
        const password = searchParams.get("password");

        console.log(searchParams.get("username"), '  pass: ', searchParams.get("password"))

        // Get the current URL
        const currentURL = window.location.href;

        // Create a URL object to work with the URL
        const url = new URL(currentURL);
        // console.log('Username:', username);
        // console.log('Password:', password);
        // console.log('url', url, '   currenturl:', currentURL)

        // Get the values of the 'username' and 'password' parameters
        // const username = url.searchParams.get('username');
        // const password = url.searchParams.get('password');

        // Check if username and password are not null (i.e., they exist in the URL)
        if (username !== null && password !== null) {
            // You can now use the 'username' and 'password' variables
            console.log('Username:', username);
            console.log('Password:', password);
        } else {
            // Handle the case where 'username' and/or 'password' are not found in the URL
            setError('Username or password not found!')
            console.log('Username and/or Password not found in the URL');
            return;
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
            "username": `${username}`,
            "password": `${password}`
        })
            .then(function (response) {
                console.log(response)
                // setShowLoader(false)
                localStorage.setItem('username', response.data.name)
                // if (response.data.result === 'ERROR') {
                //     console.log('not logged..');
                //     setLoggedIn(false);
                //     setWrongCred(true);
                // }
                // else {
                //     let token = response.data.Token;
                //     console.log('Response from login::', response)
                //     // console.log(token);
                //     setLoggedIn(true);
                //     setWrongCred(false);
                localStorage.setItem('user', response.data.Token);
                // Replace the whole URL with a new one
                window.location.replace('http://10.200.208.252/campaign_portal');

                // }
            })
            .catch(function (error) {
                console.log(error);
                if (error) {
                    if (error?.response?.data?.message) {
                        setError(error?.response?.data?.message)
                    } else if (error?.message) {
                        setError(error.message)
                    } else {
                        setError(error)
                    }
                }

            });

    }

    return (
        <div>
            <h2>Logging with centeralized portal</h2>
            <p>for user name {process.env.REACT_APP_USERNAME}</p>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <br />
            <a href='https://switch.com.pk/support/login.php' style={{ textDecoration: 'underline' }}>Back to Unified Portal</a>
        </div>
    )
}

export default LoginByPortal