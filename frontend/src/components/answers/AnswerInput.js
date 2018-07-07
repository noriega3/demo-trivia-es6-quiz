import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});

/***
 * For user input choice (input button) type of answer choice
 * @see QuizQuestion
 */
class AnswerInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.value
    };
  };

  handleChange(e){
    this.setState({value: e.currentTarget.value});
  };

  handleSubmit(e){
    e.preventDefault();
    const {value} = this.state;
    const {maxChars, onSubmit} = this.props;
    let formattedValue = value;

    //user input cleanup
    formattedValue = _.trim(formattedValue);
    formattedValue = _.escape(formattedValue);
    formattedValue = _.toLower(formattedValue);
    formattedValue = _.truncate(formattedValue, {length: maxChars});

    onSubmit(formattedValue);
  };

  checkDisabled(){
    const {value} = this.state;
    return _.isEmpty(_.trim(value));
  };

  render() {
    const {lines, classes, submitText, placeholder} = this.props;
    return (
      <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={8}>
        <Grid item xs={12}>
        <FormControl
          className={classes.answerContainer}
          autoComplete={'off'}
          required
          onSubmit={(e)=>this.handleSubmit(e)}>
          <TextField
            className={classes.textField}
            multiline={lines > 1}
            rows={lines}
            label={placeholder}
            autoFocus={true}
            required
            onChange={(e)=>this.handleChange(e)}
          />
        </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant={'contained'} size={'large'} color={'primary'} onClick={(e)=>this.handleSubmit(e)} disabled={this.checkDisabled()}>{submitText}</Button>
        </Grid>
      </Grid>
    );
  };
}

AnswerInput.defaultProps = {
  submitText: 'Submit',
  placeholder: 'Enter Your Answer',
  lines: 1,
  maxChars: 1000,
  onChange: () => {},
  onSubmit: () => {}
};

AnswerInput.propTypes = {
  submitText: PropTypes.string,
  placeholder: PropTypes.string,
  lines: PropTypes.number,
  maxChars: PropTypes.number,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default withStyles(styles)(AnswerInput);
