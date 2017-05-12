import React from 'react';
import axios from 'axios';
import map from 'lodash/map';

import ShowResultComponent from './ShowResultComponent.jsx';
import { listStyle } from '../css-style.js';

class QuizComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quizDetails: null,
			currentQuestion: null,
			questionNumber: 0,
			totalQuestions: 0,
			showConfirm: false,
			isShowResult: false
		};
		this.nextQuiz = this.nextQuiz.bind(this);
		this.showQuizQuestion = this.showQuizQuestion.bind(this);
		this.confirmClicked = this.confirmClicked.bind(this);
		this.optionSelected = this.optionSelected.bind(this);
	}	

	nextQuiz(){
		const quizDetails = this.state.quizDetails;
		const index = this.state.questionNumber;
		this.showQuizQuestion( quizDetails, (index+1) )
	}

	componentDidMount(){  //fetch questions from url
		const url = 'https://cdn.rawgit.com/santosh-suresh/39e58e451d724574f3cb/raw/784d83b460d6c0150e338c34713f3a1c2371e20a/assignment.json';
		axios.get(url)
		.then(res => {
			const quizDetails = res.data;
			this.setState({quizDetails: quizDetails, totalQuestions: quizDetails.length});
			this.showQuizQuestion( quizDetails, 0 );
		});
	}

	showQuizQuestion( que, index ){ //show questions
		const question = que[index];
		let showConfirm = false;

		if( index === ( this.state.totalQuestions ) ){
			showConfirm = true;
		}
		this.setState({currentQuestion: question, questionNumber: index, showConfirm: showConfirm });
	}

	confirmClicked(){  // Confirm to submit marked answers
		this.setState({ 
			showConfirm: false, 
			currentQuestion: null,
			isShowResult: true
		});
	}

	optionSelected( e ) {  //set userSelected option for corresponding question
		const selectedValue = e.target.value;
		const quizDetails = this.state.quizDetails;
		const currentIndex = this.state.questionNumber;
		const currentQuestion =  quizDetails[currentIndex];
		currentQuestion['userAnswer'] = selectedValue;
		quizDetails[currentIndex] = currentQuestion;
		this.setState({ quizDetails: quizDetails });
	}

	render() {
		if( this.state.currentQuestion && Object.keys(this.state.currentQuestion).length > 0 ) {
			var options = this.state.currentQuestion.options;
		}

		return (
			<div style={{textAlign: 'center'}}>
				{ ( this.state.currentQuestion && Object.keys(this.state.currentQuestion).length > 0 ) ? 
					<div>
						<div>{"Question-"+(this.state.questionNumber + 1)}{": "+ this.state.currentQuestion.text}</div>
						<ul style={listStyle} key={this.state.questionNumber}>
							{ 
								options.map( (option,index) => {
									return (
										<li key={index}>
											<input onChange={this.optionSelected} type="radio" value={option} name={"option-"+this.state.questionNumber} />
											{option}
										</li>
									)
								}) 
							} 
						</ul>
						{ this.state.questionNumber <=  ( this.state.totalQuestions - 1 ) ? <button onClick={this.nextQuiz}>Next</button> : null }
					</div>
				: null  
				}
				<div>
					{ this.state.showConfirm ? 
						<div>
							<div>Thanks for attempting quiz. Please click on confirm to submit your answer and see scoreboard </div>
							<button onClick={this.confirmClicked}>Confirm</button> 
						</div>
					: 
					null }
					{ this.state.isShowResult ? <ShowResultComponent quizDetails={this.state.quizDetails}/> : null }
				</div>
			</div>
		);
	}
}

export default QuizComponent;