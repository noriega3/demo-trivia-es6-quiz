import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
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
 * A multiple choice (checkboxes) type of answer choice
 * @see QuizQuestion
 */
class AnswerMultiChoice extends Component {
  constructor(props){
    super(props);
    this.state = {};
  };

  componentDidMount(){
    const {choices} = this.props;
    const nextState = _.clone(this.state);
    //set each dynamic choice as a state of false
    _.map(choices, (choice, i) => {
      nextState[i] = false;
    });

    this.setState({...nextState});
  }

  handleChange(e){
    //sets the id( in this case index) to checked value
    this.setState({[e.currentTarget.value]: e.currentTarget.checked});
  };

  handleSubmit(e){
    e.preventDefault();
    const {onSubmit} = this.props;
    let _isFalse = _.partial(_.isEqual, false);
    let value = _.omitBy(this.state, _isFalse); //omit those checkboxes not checked
    value = _.keys(value); //gets an array of key names (indexes/ids) to send via api
    onSubmit(value);
  };

  checkDisabled(){
    return _.isEmpty(this.state) || _.lt(_.get(_.countBy(this.state), true, 0), 1);
  };

  render() {
    const {classes, choices, submitText} = this.props
    return (
      <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={8}>
        <Grid item xs={12}>
        <FormControl
          className={classes.answerContainer}
          autoComplete={'off'}
          required
          onSubmit={(e)=>this.handleSubmit(e)}>
          <FormControl component={"fieldset"} required className={classes.formControl} >
            <FormGroup>
              {_.map(choices, (choice, i) =>
                <FormControlLabel
                  key={i}
                  label={choice}
                  control={
                    <Checkbox
                      color="primary"
                      checked={this.state[i]}
                      onChange={(e) => this.handleChange(e)}
                      value={`${i}`}
                    />
                  }/>
              )}
            </FormGroup>
          </FormControl>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant={'contained'} size={'large'} color={'primary'} onClick={(e)=>this.handleSubmit(e)} disabled={this.checkDisabled()}>{submitText}</Button>
      </Grid>
    </Grid>);
  };
}

AnswerMultiChoice.defaultProps = {
  submitText: 'Submit',
  choices: [],
  onChange: () => {},
  onSubmit: () => {}
};

AnswerMultiChoice.propTypes = {
  submitText: PropTypes.string,
  placeholder: PropTypes.string,
  lines: PropTypes.number,
  choices: PropTypes.array,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default withStyles(styles)(AnswerMultiChoice);
