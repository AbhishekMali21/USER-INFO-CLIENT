import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const API_BASE_URL = 'http://localhost:9090/api';

const UserList: React.FC = () => {
	const [users, setUsers] = useState<any[]>([]);

	useEffect(() => {
		// Fetch the list of all users from the backend
		const fetchUsers = async () => {
			try {
				const response = await axios.get(
					`${API_BASE_URL}/userinfo/getAllUsers`
				);
				setUsers(response.data);
			} catch (error) {
				console.error('Error fetching user list:', error);
			}
		};

		fetchUsers();
	}, []);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-GB');
	};

	return (
		<TableContainer>
			<Heading>User Details</Heading>
			<UserTable>
				<thead>
					<tr>
						<TableHeader>Name</TableHeader>
						<TableHeader>Email</TableHeader>
						<TableHeader>Date of Birth</TableHeader>
						<TableHeader>Phone Number</TableHeader>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{formatDate(user.dob)}</TableCell>
							<TableCell>{user.phoneNo}</TableCell>
						</TableRow>
					))}
				</tbody>
			</UserTable>
		</TableContainer>
	);
};

const TableContainer = styled.form`
	max-width: 1000px;
	margin: 40px auto;
	padding: 30px;
	border-radius: 8px;
	box-shadow: 0 2px 10px #00000019;
`;

const Heading = styled.h2`
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 20px;
	text-align: center;
`;

const UserTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin-top: 20px;
`;

const TableHeader = styled.th`
	padding: 12px;
	text-align: left;
	border-top: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
`;

const TableRow = styled.tr`
	&:nth-child(even) {
		background-color: #f2f2f2;
	}
`;

const TableCell = styled.td`
	padding: 12px;
`;

export default UserList;
