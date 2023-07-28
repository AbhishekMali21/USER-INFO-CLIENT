import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserList from './UserList';

const API_BASE_URL = 'http://localhost:9090/api';

type Props = {};

const UserDetailsForm: React.FC<Props> = (props) => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [dob, setDob] = useState<string>('');
	const [phoneNo, setPhoneNo] = useState<string>('');
	const [apiResponse, setApiResponse] = useState<any>();
	const [isSubmitted, setIsSubmitted] = useState(false);

	useEffect(() => {
		setIsSubmitted(false);
	}, [name, email, dob, phoneNo]);

	const isFormValid = () => {
		const isNameValid = name.trim() !== '';
		const isEmailValid = /\S+@\S+\.\S+/.test(email);
		const dobDate = new Date(dob);
		const currentDate = new Date();
		const isDobValid =
			dobDate <= currentDate &&
			currentDate.getFullYear() - dobDate.getFullYear() >= 18;

		if (isNameValid && isEmailValid && isDobValid) {
			return true;
		} else {
			if (!isNameValid) {
				alert('Please enter a valid name.');
			} else if (!isEmailValid) {
				alert('Please enter a valid email.');
			} else if (!isDobValid) {
				alert('You must be at least 18 years old to submit the form.');
			}
			return false;
		}
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const validateForm: boolean = isFormValid();
		if (validateForm) {
			try {
				const response = await axios.post(`${API_BASE_URL}/userinfo/`, {
					name,
					email,
					dob,
					phoneNo,
				});
				setApiResponse(response.data);
				setIsSubmitted(true);
			} catch (error: any) {
				alert(error?.response?.data?.phoneNo);
				console.error('Error saving user data:', error);
			}
		}
	};

	const handleFormReset = () => {
		setName('');
		setEmail('');
		setDob('');
		setPhoneNo('');
		setIsSubmitted(false);
		setApiResponse(null);
	};

	return (
		<>
			<FormContainer onSubmit={handleFormSubmit}>
				<FormHeading>
					{isSubmitted ? 'Submitted User Info Form' : 'User Info Form'}
				</FormHeading>
				<div className='form-group'>
					<FormLabel>Name</FormLabel>
					<FormInput
						type='text'
						className='form-control'
						value={name}
						onChange={(e: any) => setName(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<FormLabel>Email</FormLabel>
					<FormInput
						type='email'
						className='form-control'
						value={email}
						onChange={(e: any) => setEmail(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<FormLabel>Date of Birth</FormLabel>
					<FormInput
						type='date'
						className='form-control'
						value={dob}
						onChange={(e: any) => setDob(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<FormLabel>Phone Number</FormLabel>
					<FormInput
						type='tel'
						className='form-control'
						value={phoneNo}
						onChange={(e: any) => setPhoneNo(e.target.value)}
					/>
				</div>
				{apiResponse?.message && <FormText>{apiResponse.message}</FormText>}
				{/* {console.log(apiResponse)} */}
				<ButtonContainer>
					<FormButton
						type='submit'
						className='btn btn-primary'
						onClick={handleFormSubmit}
					>
						Submit
					</FormButton>
					<FormButton
						type='button'
						className='btn btn-secondary'
						onClick={handleFormReset}
					>
						Reset
					</FormButton>
				</ButtonContainer>
			</FormContainer>
			{apiResponse?.message && <UserList />}
		</>
	);
};

const FormContainer = styled.form`
	max-width: 400px;
	margin: 40px auto;
	padding: 30px;
	border-radius: 8px;
	background-color: #f2f2f2;
	box-shadow: 0 2px 10px #00000019;
`;

const FormHeading = styled.h2`
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 20px;
	display: flex;
	justify-content: center;
	width: 100%;
`;

const FormLabel = styled.label`
	font-size: 16px;
	font-weight: bold;
`;

const FormInput = styled.input`
	padding: 12px;
	border-radius: 6px;
	font-size: 14px;
	margin-bottom: 16px;
	&:focus {
		border-color: #007bff;
		box-shadow: 0 0 4px #007bff79;
	}
`;

const FormText = styled.p`
	font-weight: bold;
	color: green;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const FormButton = styled.button`
	padding: 12px 20px;
	border-radius: 6px;
	font-size: 16px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	width: 47%;
`;

export default UserDetailsForm;
