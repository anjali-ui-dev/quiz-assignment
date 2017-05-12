import React from 'react';
import QuizComponent from './QuizComponent.jsx';

class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showQuiz: false
		};
		this.startQuiz = this.startQuiz.bind(this);
	}	

	startQuiz(){
		this.setState({showQuiz: true});
	}

	render() {
		return (
			<div style={{textAlign: 'center'}}>
				{ this.state.showQuiz ? null : <button onClick={this.startQuiz}>Start Quiz</button> }
				{ this.state.showQuiz ? <QuizComponent /> : null }
			</div>
		);
	}
}

export default MainComponent;