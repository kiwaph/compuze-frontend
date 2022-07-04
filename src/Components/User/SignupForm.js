import { useState } from "react/cjs/react.development";
import { APIURL } from "../../Config/Globals";
import { ErrorList } from "../ErrorList";
import { Loading } from "../Loading";

export const SignupForm = () => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repeatPassword, setRepeatPassword ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ email, setEmail ] = useState('');

    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [ errors, setErrors ] = useState(false);

    async function processSignup() {
        setIsLoading(true);
        const res = await fetch(`${APIURL}/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                repeatPassword: repeatPassword,
                phone: phone,
                email: email,
            })
        })
        const json = await res.json();
        setIsLoading(false);

        if (res.status !== 201) {
            return setErrors(json);
        }
        
        return setSuccess(true);
    }

    const form =
    <form className="form">
        <div className='form-group'>
            <label>Username</label>
            <input type='text' value={username} id='username' onChange={e => setUsername(e.target.value)}/>
        </div>

        <div className='form-group'>
            <label>Phone Number</label>
            <input type='text' value={phone} id='phone' onChange={e => setPhone(e.target.value)}/>
        </div>

        <div className='form-group'>
            <label>Email</label>
            <input type='text' value = {email} id='phone' onChange={e => setEmail(e.target.value)}/>
        </div>

        <div className='form-group'>
            <label>Password</label>
            <input type='password' value={password} id='password' onChange={e => setPassword(e.target.value)}/>
        </div>

        <div className='form-group'>
            <label>Repeat Password</label>
            <input type='password' value={repeatPassword} id='repeatPassword' onChange={e => setRepeatPassword(e.target.value)}/>
        </div>

        <button className='big-btn blue-btn' type='button' onClick={processSignup}>Sign-up</button>
    </form>

    if (isLoading) {
        return <Loading />;
    }

    if (success) {
        return 'User created. Please login'
    }

    return (
        <>
            { errors ? <ErrorList errors={errors}/> : ''}
            {form}
        </>
    )
}