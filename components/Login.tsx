import Main from "./Main";
import {fugaz} from '../app/layout'
import Button from "./Button";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    const context = useAuth()
    const signup = context?.signup
    const login = context?.login

    const handleSubmit = async () => {
        setIsAuthenticating(true)
        try {
            if (!email || !password || password.length < 6) {
                return
            }
    
            if (isRegister) {
                console.log('Signing up a new user')
                await signup(email, password)
            } else {
                console.log('Logging in an existing user')
                await login(email, password)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsAuthenticating(false)
        }
    }

    return ( 
        <div className="flex flex-col flex-1 justify-center items-center gap-4">
            <h3 className={fugaz.className + " text-4xl sm:text-5xl md:text-6xl"}>
                {isRegister? 'Sign Up' : 'Login'}
            </h3>
            <p>You're one step away!</p>
            <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text" 
                className="w-full max-w-[400px] px-4 py-2 sm:py-3 
                border border-solid border-indigo-400 rounded-full 
                outline-none duration-200 hover:border-indigo-600 
                focus:border-indigo-600"
                placeholder="Email"
            />
            <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                className="w-full max-w-[400px] px-4 py-2 sm:py-3 
                border border-solid border-indigo-400 rounded-full 
                outline-none duration-200 hover:border-indigo-600 
                focus:border-indigo-600"
                placeholder="Password"
            />
            <div className="max-w-[400px] w-full mx-auto">
                <Button text={!isAuthenticating ? 'Submit': isRegister ? 'Signing Up...':'Logging In...'} dark={false} full={true} clickHandler={handleSubmit}/>
            </div>

            
            <p className="text-center">
                {isRegister ? 'Already have an account? ' : "Don't have an account? "}
                <button className="text-indigo-600" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? 'Login' : 'Sign Up'}
                </button>
            </p>
        </div>
     );
}
 
export default Login;