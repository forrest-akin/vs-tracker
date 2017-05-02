import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import { Dialog, DialogContent } from 'material-ui/Dialog'
import Input from 'material-ui/Input'
import Layout from 'material-ui/Layout'
import ClearIcon from 'material-ui-icons/Clear'

import { addTask } from '../../redux/modules/task'

const mapDispatchToProps = { addTask }

const { func } = PropTypes

@connect(null, mapDispatchToProps)
export default class TaskModal extends PureComponent {
  static propTypes = {
    addTask: func,
    closeModal: func,
  }

  state = {
    error: false,
    taskName: '',
    taskDescription: '',
  }
  
  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value, error: false })
  }

  handleSubmit = () => {
    const { taskName, taskDescription } = this.state
    if (taskName && taskDescription) this.props.addTask(this.state.taskName, this.state.taskDescription)
    else {
      this.setState({ error: true })
    }
  }

  render() {
    const { error, taskName, taskDescription } = this.state

    return (
      <Dialog open={true} paperClassName="modal">
        <DialogContent>
          <Layout container justify="space-around" align="center" className="modal">

            <Layout item xs={10}>
              <Layout container justify="flex-end">
                <ClearIcon onClick={this.props.closeModal}/>
              </Layout>
            </Layout>

            <Layout item xs={9}>
              <Layout container direction="column" justify="center">
                <Input 
                  id="taskName"
                  error={error && !taskName}
                  placeholder="Task Name"
                  value={taskName}
                  onChange={this.handleChange} 
                />
              </Layout>
            </Layout>

            <Layout item xs={9}>
              <Layout container direction="column" justify="center">
                <Input
                  id="taskDescription"
                  error={error && !taskDescription}
                  placeholder="Task Description"
                  value={taskDescription}
                  onChange={this.handleChange}
                />
              </Layout>
            </Layout>

            <Layout item xs={9}>
              <Layout container justify="flex-end">
                <Button
                  children="Add Task"
                  disabled={!taskName && !taskDescription}
                  raised
                  onClick={this.handleSubmit}
                />
              </Layout>
            </Layout>
          
          </Layout>
        </DialogContent>
      </Dialog>
    )
  }
}