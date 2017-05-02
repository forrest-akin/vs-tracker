import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Layout from 'material-ui/Layout'
import Typography from 'material-ui/Typography'
import AddIcon from 'material-ui-icons/Add'

import TaskModal from './task-modal/TaskModal'
import TaskPanel from './task-panel/TaskPanel'
import { fetchTasks } from '../redux/modules/task'

const mapStateToProps = ({ task }) => ({ 
  isLoading: task.isLoading,
  todo: task.todo,
  'in-progress': task['in-progress'],
  complete: task.complete,
})

const mapDispatchToProps = { fetchTasks }

const { array, func } = PropTypes

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends PureComponent {
  static propTypes = {
    addTask: func,
    complete: array,
    fetchTasks: func,
    'in-progress': array,
    todo: array,
  }

  state = { isModalOpen: false }
  
  meta = [
    { key: 'todo', header: 'TODO', btnTxt: 'Start' },
    { key: 'in-progress', header: 'IN PROGRESS', btnTxt: 'Finish' },
    { key: 'complete', header: 'DONE', btnTxt: 'Archive' },
  ]

  componentDidMount() {
    this.props.fetchTasks()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.todo.length > this.props.todo.length) {
      this.setState({ isModalOpen: false })
    }
  }

  openModal = () => {
    this.setState({ isModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  renderTasks() {
    return this.meta.map((item, idx) => (
      <TaskPanel 
        isLoading={this.props.isLoading} 
        tasks={this.props[item.key]}
        header={item.header}
        btnText={item.btnTxt}
        key={idx}
      />
    ))
  }

  render() {
    return (
      <Layout container className="root">

        <Layout item xs={3}>
          <Layout container align="center" justify="center" className="add-container">

            <Typography type="headline" className="add-task">ADD TASK</Typography>
            <Button fab onClick={this.openModal}><AddIcon /></Button>

          </Layout>
        </Layout>

        <Layout item xs={8}>
          <Layout container>{this.renderTasks()}</Layout>
        </Layout>
          
        {this.state.isModalOpen &&
          <TaskModal closeModal={this.closeModal} />
        }
      </Layout>
    )
  }
}
