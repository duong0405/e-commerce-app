import { useState } from "react";
import { creatAuthUserWithEmailAndPassword, createUserDocument } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up.styles.scss"


const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    const handleSummit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Password does not match");
            return;
        }
        try {
            const { user } = await creatAuthUserWithEmailAndPassword(email, password);
            await createUserDocument(user, { displayName });
            resetForm();
        } catch (e) {
            if (e.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already in use");
            } else {
                console.log(e);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="sign-up-container">
            <h2>Do not have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSummit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />

                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUp;