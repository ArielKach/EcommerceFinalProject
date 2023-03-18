import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Login as LoginIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';
import css from './Register.module.css';
import { login, register, resetPasswordWithEmail } from '../../utils/userUtils';
import classNames from 'classnames';

function Register({ isRegister = true, updateUser }) {
	const [loading, setLoading] = useState(false);
	const [passResetLoading, setPassResetLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVerify, setPasswordVerify] = useState('');

	const navigate = useNavigate();

	const handleForgetPassword = async (e) => {
		e.preventDefault();
		setPassResetLoading(true);

		try {
			await resetPasswordWithEmail(email, password);
			Swal.fire(`Great`, `The password Reset email eas sent to ${email}`, 'success');
		} catch (e) {
			Swal.fire(`Oops...`, `${e}`, 'error');
		} finally {
			setPassResetLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (isRegister && password !== passwordVerify) {
			Swal.fire(`Oh Oh, the passwords don't match`, `the passwords need to be identical`, 'error');
			return setLoading(false);
		}

		try {
			const user = isRegister ? await register(email, password, name) : await login(email, password);
			localStorage.setItem('user', JSON.stringify(user));
			updateUser(user);
			navigate('/');
		} catch (e) {
			Swal.fire(`Oops...`, `${e.message}`, 'error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className={classNames(css.login, css.center)}>
				<h1 className={css.title}>{isRegister ? 'Welcome' : 'Good to see you again'}</h1>
				<h2>{isRegister ? 'sign up to Ecommerce' : 'log back into Ecommerce'}</h2>
				{isRegister && <TextField required type='text' label='Full name' value={name} onChange={(e) => setName(e.target.value)} />}
				<TextField required autoFocus type='email' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
				<TextField required type='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
				{isRegister && (
					<TextField
						required
						type='password'
						label='Password verification'
						value={passwordVerify}
						onChange={(e) => setPasswordVerify(e.target.value)}
					/>
				)}
				<LoadingButton
					className={css.loginButton}
					variant='contained'
					color='primary'
					type='submit'
					loading={loading}
					loadingPosition='end'
					endIcon={<LoginIcon />}
				>
					{isRegister ? 'Register' : 'Login'}
				</LoadingButton>
				{passResetLoading ? (
					<CircularProgress />
				) : (
					<p className={css.forgotPassword}>
						<span onClick={handleForgetPassword}>forgot my password</span> |
						{isRegister ? (
							<span onClick={() => navigate('/login')}> login</span>
						) : (
							<span onClick={() => navigate('/register')}> register</span>
						)}
					</p>
				)}
			</form>
		</>
	);
}

export default Register;
