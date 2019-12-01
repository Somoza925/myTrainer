import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Picker, Button } from 'react-native';
import { ButtonGroup, Card, ListItem } from 'react-native-elements';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import firebaseSDK from '../config/firebaseSDK';
import Workouts from '../json files/workouts.json'
import Meals from '../json files/meals.json'

const HomeScreen = ({ navigation }) => {

	const [selectedIndex, updateIndex] = useState(0);
	const [workout, setWorkout] = useState(Workouts.chest);
	const [food, setFood] = useState(Meals.meals1);
	const buttons = ['Workout', 'Nutrition']

	const doIt = (workouts) => {
		firebaseSDK.createWorkoutsFolder(workouts);
	}

	const workoutScreen = (selectedIndex) => {
		if (selectedIndex === 0) {
			return (
				<SafeAreaView>
					{/* <Picker
						selectedValue={workout}
						onValueChange={(itemValue, itemPosition) => {setWorkout(itemValue), setChosenIndex(itemPosition), setWorkout2(itemValue)}}
					>
						<Picker.Item label="Chest" value={Workouts.chest} key={chosenIndex}/>
						<Picker.Item label="Back" value={Workouts.back} key={chosenIndex}/>
						<Picker.Item label="Legs" value={Workouts.legs} key={chosenIndex}/>
						<Picker.Item label="Shoulders" value={Workouts.shoulders} key={chosenIndex} />
						<Picker.Item label="Arms" value={Workouts.arms} key={chosenIndex}/>
						
					</Picker> */}

					<SafeAreaView style={styles.buttonContainer}>
						<Button
							title='Chest'
							type='solid'
							style={styles.button}
							onPress={() => setWorkout(Workouts.chest)}
						></Button>
						<Button
							title='Back'
							type='solid'
							style={styles.button}
							onPress={() => setWorkout(Workouts.back)}
						></Button>
						<Button
							title='Legs'
							type='solid'
							style={styles.button}
							onPress={() => setWorkout(Workouts.legs)}
						></Button>
						<Button
							title='Shoulders'
							type='solid'
							style={styles.button}
							onPress={() => setWorkout(Workouts.shoulders)}
						></Button>
						<Button
							title='Arms'
							type='solid'
							style={styles.button}
							onPress={() => setWorkout(Workouts.arms)}
						></Button>
					</SafeAreaView>

					<Card title={workout[0].cardTitle} titleStyle={styles.cardTitle}>
						<Text style={styles.workoutExercise} > {workout[0].name} </Text>
						<Text style={styles.workoutDetails}>Sets: {workout[0].sets} </Text>
						<Text style={styles.workoutDetails}>Reps: {workout[0].reps} </Text>

						<Text style={styles.workoutExercise} > {workout[1].name} </Text>
						<Text style={styles.workoutDetails}>Sets: {workout[1].sets} </Text>
						<Text style={styles.workoutDetails}>Reps: {workout[1].reps} </Text>

						<Text style={styles.workoutExercise} > {workout[2].name} </Text>
						<Text style={styles.workoutDetails}>Sets: {workout[2].sets} </Text>
						<Text style={styles.workoutDetails}>Reps: {workout[2].reps} </Text>

						<Text style={styles.workoutExercise} > {workout[3].name} </Text>
						<Text style={styles.workoutDetails}>Sets: {workout[3].sets} </Text>
						<Text style={styles.workoutDetails}>Reps: {workout[3].reps} </Text>

					</Card>
				</SafeAreaView>
			)
		}
		if (selectedIndex === 1) {
			return (
				<SafeAreaView>
					<SafeAreaView style={styles.buttonContainer}>
						<Button
							title='Chicken'
							type='solid'
							style={styles.button}
							onPress={() => setFood(Meals.meals1)}
						></Button>
						<Button
							title='Red Meat'
							type='solid'
							style={styles.button}
							onPress={() => setFood(Meals.meals2)}
						></Button>
						<Button
							title='Veggie'
							type='solid'
							style={styles.button}
							onPress={() => setWorkout(Workouts.legs)}
						></Button>
					</SafeAreaView>

					<Card title={food[0].cardTitle} titleStyle={styles.cardTitle}>
						<Text style={styles.workoutExercise} > {food[0].name} </Text>
						<Text style={styles.workoutDetails}>Calories: {food[0].calories} </Text>
						<Text style={styles.workoutDetails}>Fat: {food[0].fat} </Text>
						<Text style={styles.workoutDetails}>Protein: {food[0].protein} </Text>
						<Text style={styles.workoutDetails}>Carbs: {food[0].carbs} </Text>

						<Text style={styles.workoutExercise} > {food[1].name} </Text>
						<Text style={styles.workoutDetails}>Calories: {food[1].calories} </Text>
						<Text style={styles.workoutDetails}>Fat: {food[1].fat} </Text>
						<Text style={styles.workoutDetails}>Protein: {food[1].protein} </Text>
						<Text style={styles.workoutDetails}>Carbs: {food[1].carbs} </Text>
						
						<Text style={styles.workoutExercise} > {food[2].name} </Text>
						<Text style={styles.workoutDetails}>Calories: {food[2].calories} </Text>
						<Text style={styles.workoutDetails}>Fat: {food[2].fat} </Text>
						<Text style={styles.workoutDetails}>Protein: {food[2].protein} </Text>
						<Text style={styles.workoutDetails}>Carbs: {food[2].carbs} </Text>

					</Card>
				</SafeAreaView>
			)
			// return (
			// 	<SafeAreaView>
			// 		<Card title='Daily Total' titleStyle={styles.cardTitle}>
			// 			{
			// 				userNutrition.map((u, i) => {
			// 					return (
			// 						<ListItem
			// 							key={i}
			// 							title={u.name}
			// 							rightTitle={u.total}
			// 						></ListItem>
			// 					)
			// 				})
			// 			}
			// 		</Card>
			// 		<Card titleStyle={styles.cardTitle}>
			// 			<Table>
			// 				<Row data={tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text} />
			// 				<TableWrapper style={styles.wrapper}>
			// 					<Col data={tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
			// 					<Rows data={tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text} />
			// 				</TableWrapper>
			// 			</Table>
			// 		</Card>
			// 	</SafeAreaView>
			// )
		}
	}


	return (
		<SafeAreaView>
			<ButtonGroup
				onPress={updateIndex}
				selectedIndex={selectedIndex}
				buttons={buttons}
				containerStyle={{ height: 40 }} />
			{workoutScreen(selectedIndex)}
		</SafeAreaView>

	);
}




const styles = StyleSheet.create({
	cardTitle: {
		fontSize: 25,
		textAlign: 'left'
	},
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 30,
		backgroundColor: '#D3D3D3'
	},
	head: {
		height: 40,
		backgroundColor: '#D3D3D3'
	},
	wrapper: {
		flexDirection: 'row'
	},
	title: {
		flex: 1,
		backgroundColor: '#D3D3D3'
	},
	row: {
		height: 28
	},
	text: {
		textAlign: 'center'
	},
	workoutTitle: {
		fontSize: 25,
		padding: 10,
		textAlign: 'center',
		backgroundColor: '#D3D3D3'
	},
	workoutExercise: {
		fontSize: 23,
		padding: 10,
		textDecorationLine: 'underline'
	},
	workoutDetails: {
		fontSize: 20,
		paddingLeft: 60
	},
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 20,
	},
	button: {
		backgroundColor: 'green',
		width: '40%',
		height: 40
	}
});


export default HomeScreen;