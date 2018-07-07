import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

/***
 * Renders the step (question number) toolbar
 * @see QuizQuestion and QuizContainer
 */
class StepperDisplay extends Component {
  render() {
    const {steps, completed, activeStep} = this.props
    return (
      <Grid item xs={12}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton completed={_.has(completed, index)} />
              </Step>
            );
          })}
        </Stepper>
      </Grid>
    );
  };
}

StepperDisplay.propTypes = {
  steps: PropTypes.array.isRequired,
  completed: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired
};

export default StepperDisplay;
