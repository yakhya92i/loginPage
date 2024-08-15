import React, { useState } from 'react';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import './login.css';
import axios from 'axios';

const SocialButtons = () => (
    <div className="">
        <button className=""><FaGooglePlusG /></button>
        <button className=""><FaFacebookF /></button>
        <button className=""><FaGithub /></button>
        <button className=""><FaLinkedinIn /></button>
    </div>
);

function SignIn() {
    const [data, setData] = useState({
        fulllName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/api/user/signup", data);
            window.location.reload();
        } catch (error) {
            console.log(error);
            console.error("Erreur lors de la connexion:", error);
            setError(error.message);
        }
    };
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:5001/api/user/signin";
            const { data: response } = await axios.post(url, data);
            console.log(response);
            localStorage.setItem("token", response.token);
            window.location = "/Dashboard";
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            setError(error);
        }
    };
    const [elementActive, setElementActive] = useState('');
    const btnActive = () => {
        if (elementActive === 'active') {
            setElementActive('')
        } else {
            setElementActive('active')
        }
    }
    return (
        <div className="containerPlus">
            <div className={`container  yakhya ${elementActive}`} id="container">
                <div className="form-container sign-up">
                    <form onSubmit={handleSignUp}>
                        <h1>Créer un compte</h1>
                        <div className="social-icons">
                            <SocialButtons />
                        </div>
                        <span>ou utilisez votre email pour l'inscription</span>
                        <input type="text" placeholder="Name" name='fullName' onChange={handleChange} />
                        <input type="email" placeholder="Email" name='email' onChange={handleChange} />
                        <input type="password" placeholder="Password" name='password' onChange={handleChange} />
                        <button>S'inscrire</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form onSubmit={handleSignIn}>
                        <h1>Se connecter</h1>
                        <div className="social-icons">
                            <SocialButtons />
                        </div>
                        <span>ou utilisez votre mot de passe de messagerie</span>
                        <input type="email" placeholder="Email" name='email' onChange={handleChange} />
                        <input type="password" placeholder="Password" name='password' onChange={handleChange} />
                        <a href="#">Mot de passe oublié?</a>
                        <button>Se connecter</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Content de te revoir!😁</h1>
                            <p>Entrez vos informations personnelles pour utiliser toutes les fonctionnalités du site</p>
                            <button onClick={btnActive} className="" id="login">Se connecter</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Salut l'ami!✌🏿</h1>
                            <p>Enregistrez-vous avec vos données personnelles pour utiliser toutes les fonctionnalités du site.</p>
                            <button onClick={btnActive} className="" id="register">S'inscrire</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn