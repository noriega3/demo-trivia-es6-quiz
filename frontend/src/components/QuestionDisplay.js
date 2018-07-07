import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';

import Highlight from 'react-highlight';
import ReactMarkdown from 'react-markdown'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  codeSnippet:{
    textAlign: 'left'
  },
  headerRight:{
    textAlign: 'right'
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
});

/***
 * The display container for a question instance  (and children - answer instance)
 * @see QuizQuestion
 */
class QuestionDisplay extends Component {
  shouldComponentUpdate(nextProps, nextState){
    if(!_.isEqual(nextProps.questionNumber, this.props.questionNumber))
      return true;
    else
      return !_.isEqual(nextProps.question, this.props.question);
  }

  render() {
    const {questionNumber, classes, question, children, title, difficulty, difficultyText, code} = this.props;
    return (
      <Grid item xs={12} sm={8} md={6} lg={4} className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={8} justify={'center'} alignItems={'center'} direction={'column'}>
            <Grid item >
              <Grid container spacing={0}>
                <Grid item xs={6}>
                  <Typography variant={'title'} gutterBottom>
                    {title} {questionNumber}
                  </Typography>
                </Grid>
                <Grid item xs={6} className={classes.headerRight}>
                  <Typography variant={'caption'} gutterBottom>
                    {difficulty && `${difficultyText} ${difficulty}`}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={'title'} gutterBottom>
                    <ReactMarkdown source={question} />
                  </Typography>
                </Grid>
                {(code) ?
                  <Grid item xs={12} className={classes.codeSnippet}>
                      <Highlight className={code.language}>
                        {code.value}
                      </Highlight>
                  </Grid>
                   : ''}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  };
}

QuestionDisplay.defaultProps = {
  title: 'Question',
  difficultyText: 'Difficulty',
};

QuestionDisplay.propTypes = {
  title: PropTypes.string,
  difficultyText: PropTypes.string,
  questionNumber: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  code: PropTypes.object,
  classes: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(QuestionDisplay);
