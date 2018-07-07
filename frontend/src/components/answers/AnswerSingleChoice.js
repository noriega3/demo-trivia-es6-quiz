import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  }
});

/***
 * A single choice (radio button) type of answer choice
 * @see QuizQuestion
 */
class AnswerSingleChoice extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: undefined
    };
  };

  handleChange(e){
    this.setState({value: e.currentTarget.value});
  };

  handleSubmit(e){
    e.preventDefault();
    const {value} = this.state;
    const {onSubmit} = this.props;
    onSubmit(value);
  };

  checkDisabled(){
    const {value} = this.state;
    return _.isEmpty(value);
  };

  render() {
    const {classes, choices, submitText} = this.props;
    const {value} = this.state;

    return (
      <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={8}>
        <Grid item xs={12}>
          <FormControl
            className={classes.answerContainer}
            autoComplete={'off'}
            required
            onSubmit={(e)=>this.handleSubmit(e)}>
            <FormControl component={"fieldset"} required className={classes.formControl} >
              <RadioGroup
                name="answer"
                className={classes.group}
                value={value}
                onChange={(e) => this.handleChange(e)}>
                {_.map(choices, (choice, i) => <FormControlLabel key={i} value={`${i}`} control={<Radio color="primary" />} label={choice} />)}
              </RadioGroup>
            </FormControl>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant={'contained'} size={'large'} color={'primary'} onClick={(e)=>this.handleSubmit(e)} disabled={this.checkDisabled()}>{submitText}</Button>
        </Grid>
      </Grid>
    );
  };
}

AnswerSingleChoice.defaultProps = {
  submitText: 'Submit',
  choices: [],
  onChange: () => {},
  onSubmit: () => {}
};

AnswerSingleChoice.propTypes = {
  submitText: PropTypes.string,
  choices: PropTypes.array,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default withStyles(styles)(AnswerSingleChoice);
