import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';

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

class AnswerMultiChoice extends Component {
  constructor(props){
    super(props)
    this.state = {}

    _.map(props.choices, (choice) => {
      this.state[choice] = false
    })

    console.log('state is ', this.state)
  }

  handleChange(e){
    console.log('on input change', e.currentTarget.value, e.currentTarget.checked)

    this.setState({[e.currentTarget.value]: e.currentTarget.checked})
  }

  handleSubmit(e){
    e.preventDefault()
    let _isFalse = _.partial(_.isEqual, false)
    let value = _.omitBy(this.state, _isFalse)
    value = _.keys(value)
    this.props.onSubmit(value)
  }
  render() {
    const {classes, choices} = this.props
    console.log('props', this.props)
    return (<div>
      <FormControl component={"fieldset"} required className={classes.formControl} >
        <FormGroup>
          {_.map(choices, (choice, i) =>
            <FormControlLabel
              key={i}
              label={choice}
              control={
                <Checkbox
                  color="primary"
                  checked={this.state[choice]}
                  onChange={(e) => this.handleChange(e)}
                  value={choice}
                />
              }
            />
          )}
        </FormGroup>
      </FormControl>
      <div>
        <Button color="primary" onClick={(e) => this.handleSubmit(e)}>Submit</Button>
      </div>
    </div>);
  }
}
AnswerMultiChoice.defaultProps = {
  userChoiceMax: 1,
  choices: [],
  onChange: () => {},
  onSubmit: () => {}
}
AnswerMultiChoice.propTypes = {
  lines: PropTypes.number,
  choices: PropTypes.array,
  userChoiceMax: PropTypes.number,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}
export default withStyles(styles)(AnswerMultiChoice);
