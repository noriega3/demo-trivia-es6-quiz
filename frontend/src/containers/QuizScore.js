import PropTypes from 'prop-types'
import React, { Component } from 'react';
import _ from 'lodash'
import Button from '@material-ui/core/Button';

class QuizScore extends Component {
    render() {
        const {onRestart} = this.props
        return (
            <div className="score">
                <div>You scored</div>
                <div>{1}</div>
                <Button color="primary" onClick={onRestart}>Restart</Button>
            </div>
        );
    }
}
QuizScore.defaultProps = {
  onRestart: () => {}
}

QuizScore.propTypes = {
  onRestart: PropTypes.func
}

export default QuizScore;
