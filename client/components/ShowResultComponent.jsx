import React from 'react';
import map from 'lodash/map';

class ShowResultComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}	

	render() {
		const quizDetails = this.props.quizDetails;
		var correctAnswer = 0;
		var inCorrectAnswer = 0;
		var wrongAnswerDetailObj = [];
		const scoreBoard = quizDetails.map( ( quizDetail, index ) => {
								const answer = quizDetail.options[quizDetail.answer];
								if( answer === quizDetail.userAnswer ){
									correctAnswer += 1;
								} else {
									wrongAnswerDetailObj.push({
										'questionNumber': index,
										'correctAnswer': answer,
										'userAnswer': quizDetail.userAnswer
									})
									inCorrectAnswer += 1;
								}
							});

		return (
			<div style={{textAlign: 'center'}}>
				<div>You Scored { correctAnswer } out of { quizDetails.length } and you marked { inCorrectAnswer } wrong answer(s). </div>
				<table>
					<thead>
						<tr>
							<th>Correct Answers</th>
						</tr>
						<tr>
							<th>Question</th>
							<th>Correct Answer</th>
							<th>Your Answer</th>
						</tr>
					</thead>
					<tbody> 
						{ wrongAnswerDetailObj.map( ( wrongAnswer, index ) => {
								return (
									<tr key={index}>
										<td> { wrongAnswer.questionNumber }</td>
										<td> { wrongAnswer.correctAnswer }</td>
										<td> { wrongAnswer.userAnswer}</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ShowResultComponent;