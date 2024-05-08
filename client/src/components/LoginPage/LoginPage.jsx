import React, { useState } from "react";
import "./LoginPage.css"

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isLogin) {
            // Perform login logic here
            console.log(`Logging in with Email address: ${email}, Password: ${password}`);
        } else {
            // Perform signup logic here
            console.log(`Signing up with Email address: ${email}, Password: ${password}`);
        }
    };

    return (
        <div className="flexColCenter paddings innerWidth login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label>
                    Email address:
                    <input className="search-bar"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input className="search-bar"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <input className="button" type="submit" value={isLogin ? 'Login' : 'Signup'} />
                <button className="button" type="button" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Signup' : 'Login'}
                </button>
            </form>
        </div>
    )
}

export default LoginPage;








// import React, { useState } from "react";
// import "./LoginPage.css"

// const LoginPage = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Perform login logic here
//         console.log(`Username: ${username}, Password: ${password}`);
//     };

//     return (
//         <div className="flexColCenter paddings innerWidth login-container">
//             <form className="login-form" onSubmit={handleSubmit}>
//                 <label>
//                     Username:
//                     <input className="search-bar"
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Password:
//                     <input className="search-bar"
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <input className="button" type="submit" value="Login" />
//             </form>
//         </div>
//     )
// }

// export default LoginPage