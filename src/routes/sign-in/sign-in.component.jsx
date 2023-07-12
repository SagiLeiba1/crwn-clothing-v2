import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { signInWithGooglePopup ,createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        try{
            const {user} = await signInWithGooglePopup();
            /*const userDocRef =*/ await createUserDocumentFromAuth(user);
        }catch(error){
            if(error.code === 'uth/popup-closed-by-user'){
                console.log("user closed google pop-up login")
                return;
            }
        }
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign In With Google Popup
            </button>
            <SignUpForm />
        </div>
    )
};

export default SignIn;