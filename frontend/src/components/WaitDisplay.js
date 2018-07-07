import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';

import ContentLoader from 'react-content-loader';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center'
  }
});

/***
 * For any loading screen (todo: only works on first start screen for now)
 * @see QuizContainer
 */
class WaitDisplay extends Component {
  constructor(props){
    super(props);
    this.state = {
      disabled: true
    };
    this.unDisable = _.debounce(this.unDisable, 1000);
  };

  componentDidMount(){
    this.unDisable();
  };

  componentWillUnmount(){
    this.unDisable.cancel();
  };

  componentDidUpdate(prevProps, prevState){
    if(_.isEqual(prevState.disabled, this.state.disabled) && this.state.disabled){
      this.unDisable();
    }
  };

  handleOnClick(e){
    e.preventDefault();
    const {onRetry} = this.props
    onRetry()
    this.setState({disabled: true})
  };

  unDisable(){
    this.setState({disabled: false})
  };

  render() {
    const {showRetry, classes} = this.props;
    const {disabled} = this.state;
    return (
      <Grid item xs={12} className={classes.root}>
        <Grid container spacing={0} alignContent={'center'} justify={'center'}>
          <Grid item xs={12}>
            <ContentLoader>
              {/* Pure SVG */}
              <rect x="0" y="0" rx="5" ry="5" width="400" height="12" />
              <rect x="50" y="17" rx="3" ry="5" width="300" height="11" />
              <rect x="50" y="40" rx="3" ry="5" width="300" height="10" />
              <rect x="170" y="90" rx="3" ry="5" width="55" height="20" />
            </ContentLoader>
          </Grid>
          <Grid item xs={12}>
            {showRetry && <Button variant={'contained'} onClick={(e) => this.handleOnClick(e)} disabled={disabled}>Retry</Button>}
          </Grid>
        </Grid>
      </Grid>
    );
  };
}

WaitDisplay.defaultProps = {
  showRetry: true,
  onRetry: () => {}
};

WaitDisplay.propTypes = {
  classes: PropTypes.object,
  showRetry: PropTypes.bool,
  onRetry: PropTypes.func
};

export default withStyles(styles)(WaitDisplay);
