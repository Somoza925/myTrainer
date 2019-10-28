import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { ButtonGroup, Card, ListItem } from 'react-native-elements';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


const HomeScreen = ({ navigation }) => {

	const [selectedIndex, updateIndex] = useState(0);
	const buttons = ['Workout', 'Nutrition']

	const userNutrition = [
		{
			name: 'Calories',
			total: '1700 kcal',
		},
		{
			name: 'Fat',
			total: '60 g',
		},
		{
			name: 'Protein',
			total: '130 g',
		},
		{
			name: 'Carbohydrates',
			total: '180 g',
		}
	]

	const tableHead = ['Meal', 'Calories', 'Protein' ,'Fat', 'Carbs']
	const tableTitle = ['Eggs', 'Banana', 'Pasta', 'Yogurt']
	const tableData = [
		['400', '30', '10' ,'40'],
		['200', '10', '10' ,'20'],
		['800', '70', '30' ,'100'],
		['300', '20', '10' ,'20']
	]

	const workoutScreen = (selectedIndex) => {
		if (selectedIndex === 1) {
			return (
				<SafeAreaView>
					<Card title='Daily Total' titleStyle={styles.cardTitle}>
						{
							userNutrition.map((u, i) => {
								return (
									<ListItem
										key={i}
										title={u.name}
										rightTitle={u.total}
									></ListItem>
								)
							})
						}
					</Card>
					<Card titleStyle={styles.cardTitle}>
						<Table>
						<Row data={tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
							<TableWrapper style={styles.wrapper}>
								<Col data={tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
								<Rows data={tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text} />
							</TableWrapper>
						</Table>
					</Card>
				</SafeAreaView>
			)
		}
		if (selectedIndex === 0) {
			return (
				<SafeAreaView>
					<Card title='Muscle Group: Chest' titleStyle={styles.cardTitle}>
						<Text style={styles.workoutTitle} > Exercises: </Text>
						<Text style={styles.workoutExercise} > Flat Bench Press </Text>
						<Text style={styles.workoutDetails}>Sets: 4</Text>
						<Text style={styles.workoutDetails}>Repetitions: 12, 10, 8, 6</Text>

						<Text style={styles.workoutExercise} > Incline Dumbbell Press</Text>
						<Text style={styles.workoutDetails}>Sets: 4</Text>
						<Text style={styles.workoutDetails}>Repetitions: 12, 10, 8, 6</Text>

						<Text style={styles.workoutExercise} > Chest Fly Machine</Text>
						<Text style={styles.workoutDetails}>Sets: 3</Text>
						<Text style={styles.workoutDetails}>Repetitions: 15, 12, 10</Text>

						<Text style={styles.workoutExercise} > Decline Cable Push</Text>
						<Text style={styles.workoutDetails}>Sets: 3</Text>
						<Text style={styles.workoutDetails}>Repetitions: 15, 12, 10</Text>
						
					</Card>
				</SafeAreaView>
			)
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
	cardTitle: { fontSize: 25, textAlign: 'left'},
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#D3D3D3' },
  head: {  height: 40,  backgroundColor: '#D3D3D3'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#D3D3D3' },
  row: {  height: 28  },
  text: { textAlign: 'center' },
  workoutTitle: {fontSize: 25, padding: 10, textAlign: 'center', backgroundColor: '#D3D3D3'},
  workoutExercise: {fontSize: 23, padding: 10, textDecorationLine: 'underline' },
  workoutDetails: {fontSize: 20, paddingLeft: 60}
});


export default HomeScreen;