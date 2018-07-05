import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

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
    this.setState({value: e.currentTarget.value})
  }

  handleSubmit(e){
    e.preventDefault()
    let formattedValue = this.state.value

    //user input cleanup
    formattedValue = _.trim(formattedValue)
    formattedValue = _.escape(formattedValue)
    formattedValue = _.toLower(formattedValue)
    formattedValue = _.truncate(formattedValue, {length: this.props.maxChars})

    this.props.onSubmit(formattedValue)
  }

  checkDisabled(){
    return _.isEmpty(_.trim(this.state.value))
  }

  render() {
    const {lines, classes} = this.props
    return (
      <div>
        <FormControl
          className={classes.answerContainer}
          autoComplete={'off'}
          required
          onSubmit={(e)=>this.handleUserSubmit(e)}>
          <TextField
            className={classes.textField}
            multiline={lines > 1}
            rows={lines}
            label="Enter Your Answer"
            required
            onChange={(e)=>this.handleChange(e)}
          />
        <div>
          <Button color="primary" onClick={(e) => this.handleSubmit(e)} disabled={this.checkDisabled()}>Submit</Button>
        </div>
        </FormControl>
      </div>
    );
  }
}
AnswerInput.defaultProps = {
  lines: 1,
  maxChars: 1000,
  onChange: () => {},
  onSubmit: () => {}
}
AnswerInput.propTypes = {
  lines: PropTypes.number,
  maxChars: PropTypes.number,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}
export default withStyles(styles)(AnswerInput);
