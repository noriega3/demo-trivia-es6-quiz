import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class AnswerInput extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: props.value
    }
  }

  handleChange(e){
    console.log('on input change', e.currentTarget.value)
    this.setState({value: e.currentTarget.value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onSubmit(this.state.value)
  }

  render() {
    const {lines, classes} = this.props
    console.log('props', this.props)
    return (
      <div>
          <TextField
            className={classes.textField}
            multiline={lines > 1}
            rows={lines}
            label="Enter Your Answer"
            required
            onChange={(e)=>this.handleChange(e)}
          />
        <div>
          <Button color="primary" onClick={(e) => this.handleSubmit(e)}>Submit</Button>
        </div>
      </div>
    );
  }
}
AnswerInput.defaultProps = {
  lines: 1,
  onChange: () => {},
  onSubmit: () => {}
}
AnswerInput.propTypes = {
  lines: PropTypes.number,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}
export default withStyles(styles)(AnswerInput);
