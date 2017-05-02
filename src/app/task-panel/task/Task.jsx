import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Layout from 'material-ui/Layout'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

import { updateTask } from '../../../redux/modules/task'

function Task(props) {
  const handleClick = () => { props.updateTask(props.task, props.idx) }
  console.log('Task; props = ', props)
  return (
    <Layout item xs={12}>
      <Paper>
        <Layout container justify="space-around" align="center">

          <Layout item xs={12}>
            <Layout container justify="space-around">
              
              <Layout item xs={5}>
                <Typography gutterBottom noWrap type="subheading">{props.task.taskName}</Typography>
              </Layout>

              <Layout item xs={5}>
                <Typography align="right">#{props.task.id}</Typography>
              </Layout>

            </Layout>
          </Layout>

          <Layout item xs={12}>
            <Layout container justify="center">
              
              <Layout item xs={11}>
                <Typography type="body1">{props.task.taskDescription}</Typography>
              </Layout>

            </Layout>
          </Layout>

          <Layout item xs={11}>
            <Layout container align="flex-end" justify="flex-end">

              <Layout item className="task-button">
                <Button raised onClick={handleClick}>{String(props.btnText)}</Button>
              </Layout>

            </Layout>
          </Layout>

        </Layout>
      </Paper>
    </Layout>
  )
}

const { number, shape, string } = PropTypes

Task.propTypes = {
  btnText: string,
  idx: number,
  task: shape({
    id: number,
    state: string,
    taskDescription: string,
    taskName: string,
  }),
}

const mapDispatchToProps = { 
  updateTask,
}

export default connect(null, mapDispatchToProps)(Task)