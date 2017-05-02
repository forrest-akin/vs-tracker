import axios from 'axios'

import { NEXT_TASK_MAP, TASKS_URL } from '../../utils/constants'

/**
 * Action Constants
 */
const FETCH_TASKS = 'task/FETCH'
const ADD_TASK = 'task/ADD'
const UPDATE_TASK = 'task/UPDATE'

export const ACTIONS = { FETCH_TASKS, ADD_TASK, UPDATE_TASK }

/**
 * Actions
 */
export function fetchTasks() {
  return async (dispatch) => {
    const { data } = await axios.get(TASKS_URL),
      newState = data.tasks.reduce((_newState, task) => {

        if (!_newState[task.state]) _newState[task.state] = [task]
        else _newState[task.state].push(task)
        return _newState
      
    }, { isLoading: false, taskCount: data.tasks.length })
    
    return dispatch({
      type: FETCH_TASKS,
      payload: newState,
    })
  }
}

export function addTask(taskName, taskDescription) {
  return (dispatch, getState) => {
    const { task: reducerState } = getState(),
      todo = [ ...reducerState.todo ],
      taskCount = reducerState.taskCount + 1,
      task = { 
        id: taskCount,
        taskName,
        taskDescription,
        state: 'todo',
      }

    todo.push(task)

    return dispatch({
      type: ADD_TASK,
      payload: { todo, taskCount }
    })
  }
}

export function updateTask(task, idx) {
  return (dispatch, getState) => {
    const { task: reducerState } = getState(),
      { state: fromState } = task,
      toState = NEXT_TASK_MAP[fromState],
      fromTasks = [ ...reducerState[fromState] ],
      toTasks = [ ...reducerState[toState] ],
      updatedTask = { ...fromTasks.splice(idx, 1)[0] }
    
    updatedTask.state = toState
    toTasks.push(updatedTask)
    
    return dispatch({
      type: UPDATE_TASK,
      payload: { 
        [fromState]: fromTasks, 
        [toState]: toTasks,
      }
    })
  }
}

/**
 * Reducer
 */
export const initialState = {
  isLoading: true,
  taskCount: 0,
  todo: [],
  'in-progress': [],
  complete: [],
  archived: [],
}

const actionHandler = (state, payload) => ({ ...state, ...payload })

const actionMap = {
  [FETCH_TASKS]: actionHandler,
  [ADD_TASK]: actionHandler,
  [UPDATE_TASK]: actionHandler,
}

export default function taskReducer(state = initialState, action = {}) {
  return actionMap[action.type] ? actionMap[action.type](state, action.payload) : state
}
