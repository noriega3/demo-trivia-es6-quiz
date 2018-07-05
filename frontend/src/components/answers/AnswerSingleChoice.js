import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class AnswerSingleChoice extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: undefined
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
    const {classes, choices} = this.props
    const {value} = this.state

    return (<div>
      <FormControl component={"fieldset"} required className={classes.formControl} >
        <RadioGroup
          name="answer"
          className={classes.group}
          value={value}
          onChange={(e) => this.handleChange(e)}>
          {_.map(choices, (choice, i) => <FormControlLabel key={i} value={choice} control={<Radio color="primary" />} label={choice} />)}
        </RadioGroup>
      </FormControl>
      <div>
        <Button color="primary" onClick={(e) => this.handleSubmit(e)} disabled={!value}>Submit</Button>
      </div>
    </div>);
  }
}
AnswerSingleChoice.defaultProps = {
  choices: [],
  onChange: () => {}
}
AnswerSingleChoice.propTypes = {
  choices: PropTypes.array,
  onChange: PropTypes.func
}
export default withStyles(styles)(AnswerSingleChoice);
