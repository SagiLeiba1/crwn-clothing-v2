import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { useContext, useState } from "react";
import { signInWithGooglePopup ,createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss'
import { UserContext } from "../../context/user.context";

const defaultFormFields = {
    email : '',
    password : '',
}

const SignInForm = () =>{
    const [formFields , setFormFields] = useState(defaultFormFields);
    const {email , password} = formFields;
   
    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () =>  {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        try{
            const {user} = await signInWithGooglePopup();
             await createUserDocumentFromAuth(user);
        }catch(error){
            if(error.code === 'uth/popup-closed-by-user'){
                console.log("user closed google pop-up login")
                return;
            }
        }
    }

    const alertMessage = (error) => {
        return alert(error);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email,password)
            setCurrentUser(user)
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/email-already-in-use':
                    alertMessage(error.code);
                    break;
                case 'auth/wrong-password':
                    alertMessage(error.code);
                    break;
                case 'auth/user-not-found':
                    alertMessage(error.code);
                    break;
                default:
                    alertMessage("error registering", error);
            }
        }
    }
    const handleChange = (event) => {
        const {name,value} = event.target;
    
        setFormFields({...formFields, [name]:value}) //updting the field name by using [name]    
    }

    return (
        <div className="sign-in-container">
            <h1> Already Have An Account?</h1>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange}  name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">
                   <Button buttonType="inverted" type="submit" >Sign In</Button>
                    <Button 
                        buttonType="google" 
                        type='button'
                        onClick={signInWithGoogle}
                        >Google SIGN IN
                    </Button>
                </div>
            </form>
            
        </div>
    )
}

export default SignInForm;