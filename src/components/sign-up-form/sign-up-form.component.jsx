import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword : '',
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`password ${password} , confirmedPassword ${confirmPassword}`);

        if(password !==confirmPassword){
            alert("Unmatched Passwords");
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user, {displayName});
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert("Email already in use");
            }
            else if(error.code === 'auth/weak-password'){
                alert("Password should be at least 6 characters");
            }else{
                console.log("error registering", error);
            }
        }
    } 
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value}) //updting the field name by using [name]
    }

    return (
        <div className="sign-up-container">
            <h2> Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <Button type="submit" >Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;