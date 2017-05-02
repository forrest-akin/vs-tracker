import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'material-ui/Layout'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

import Task from './task/Task'

export default function TaskPanel(props) {
  console.log('TaskPanel; props = ', props)
  return (
    <Layout item xs={4}>
      <Layout container>

        <Layout item xs={12}>
          <Layout container justify="center">
            <Typography type="display1" gutterBottom>{props.header}</Typography>
          </Layout>
        </Layout>

        <Layout item xs={12}>
          <Paper className="task-panel">
            <Layout container>

              {props.tasks.map((task, idx) => (
                <Task
                  idx={idx}
                  task={task}
                  btnText={props.btnText}
                  key={task.id}
                />
              ))}
            
            </Layout>
          </Paper>
        </Layout>

      </Layout>
    </Layout>
  )
}

const { array, bool, string } = PropTypes

TaskPanel.propTypes = {
  btnText: string,
  header: string,
  isLoading: bool,
  tasks: array,
}
