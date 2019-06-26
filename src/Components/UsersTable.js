import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import DeleteModal from './DeleteModal';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(3, 2),
	},
	headColor: {
		backgroundColor: '#f6faff',
	},
	textColor: {
		color: '#8d9fc4',
		cursor: 'pointer'
	}
}));

const UsersTable = (props) => {
	const classes = useStyles()
	return (
		<Paper className={classes.paper}>
			<Table>
				<TableHead>
					<TableRow className={classes.headColor}>
						<TableCell className={classes.textColor} onClick={() => props.sortTable('nickname')}>Nickname</TableCell>
						<TableCell className={classes.textColor} onClick={() => props.sortTable('email')}>Email</TableCell>
						<TableCell className={classes.textColor} onClick={() => props.sortTable('ip')}>IP adress</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.data.map(user => (
						<TableRow key={user.nickname}>
							<TableCell>{user.nickname}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.ip}</TableCell>
							<TableCell>
								<DeleteModal nickname={user.nickname} delete={props.deleteUser} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Grid
				container
				justify="flex-end"
			>
				<Button onClick={() => { if (window.confirm('Delete all users?')) props.deleteAll()}}>
					Delete all
      </Button>
			</Grid>
		</Paper>
	)
}

export default UsersTable;