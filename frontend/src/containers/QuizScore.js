import React, { Component } from 'react';
import _ from 'lodash'
class QuizScore extends Component {
    render() {
        return (
            <div className="score">
                <div>You scored</div>
                <div>{1}</div>
            </div>
        );
    }
}

export default QuizScore;
