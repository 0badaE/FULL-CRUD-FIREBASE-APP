import React from "react"
import { auth, GoogleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"


function Auth(){
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    async function signIn(){
        try{
            await createUserWithEmailAndPassword(auth, email,password)
        } catch(err){
            console.error(err)
        }
    };
    
    async function signInwithGoogle(){
        try{
            await signInWithPopup(auth, GoogleProvider)
        } catch(err){
            console.error(err)
        }
    };
    
    async function logOff(){
        try{
            await signOut(auth)
        } catch(err){
            console.error(err)
        }
    };

    return (
        <>
            <input 
            placeholder="Email.."
            onChange = {(e)=> setEmail(e.target.value)}
            />
            <input placeholder="password.."
            onChange = {(e)=> setPassword(e.target.value)}
            type="password"
            />
            <button onClick ={signIn}> Sign In</button>

            <button  onClick={signInwithGoogle}>Sign in with Google</button>
            <button onClick={logOff}> Logoff</button>
        </>
    )
}

export default  Auth