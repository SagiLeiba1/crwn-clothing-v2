import './button.styles.scss';
/*default button

invert button

google sign-in button
*/
const BUTTON_TYPE_CLASS = {
    google:'google-sign-in',
    inverted: 'inverted'
}


const Button = ({children,buttonType,...otherProps}) => {
    return (<button className={`button-container ${BUTTON_TYPE_CLASS[buttonType]}` }
            >{children}
            </button>
    );
}

export default Button;