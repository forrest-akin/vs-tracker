import { Reducer, Thunk } from 'redux-testkit'
import axios from 'axios'

import * as constants from '../../utils/constants'
import taskReducer, * as TaskModule from './task'

const initialState = TaskModule.initialState,
  mockData = {
    "data": {
      "tasks": [
        {
          "id": 1,
          "taskName": "Name 1",
          "taskDescription": "Some description 1",
          "state": "todo"
        },
        {
          "id": 5,
          "taskName": "Name 5",
          "taskDescription": "Some description 5",
          "state": "in-progress"
        },
        {
          "id": 7,
          "taskName": "Name 7",
          "taskDescription": "Some description 7",
          "state": "complete"
        }
      ]
    }
  }

describe('TASK MODULE', () => {
  describe('ACTIONS', () => {
    describe('fetchTasks', () => {
      let spy

      beforeEach(() => {
        jest.resetAllMocks()
        spy = jest.spyOn(axios, 'get').mockImplementation(url => Promise.resolve(mockData))
      })
      
      it('should make a GET request to TASKS_URL', async () => {
        const dispatches = await Thunk(TaskModule.fetchTasks).execute()
        expect(axios.get).toHaveBeenCalledWith(constants.TASKS_URL)
      })

      it('should create a FETCH_TASKS action', async () => {
        const newState = { 
            isLoading: false, 
            todo: [mockData.data.tasks[0]],
            'in-progress': [mockData.data.tasks[1]],
            complete: [mockData.data.tasks[2]],
            taskCount: 3
          },
          dispatches = await Thunk(TaskModule.fetchTasks).execute(),
          actual = dispatches[0].getAction(),
          expected = { type: TaskModule.ACTIONS.FETCH_TASKS, payload: newState }
        expect(actual).toEqual(expected)
      })
    })

    describe('addTask', () => {
      it('should create an ADD_TASK action', async () => {
        const state = { task: { taskCount: 0, todo: [] } },
          taskName = 'task name',
          taskDescription = 'task description',
          newTask = { id: 1, taskName, taskDescription, state: 'todo' },
          payload = { taskCount: 1, todo: [newTask] },
          dispatches = await Thunk(TaskModule.addTask).withState(state).execute(taskName, taskDescription),
          actual = dispatches[0].getAction(),
          expected = { type: TaskModule.ACTIONS.ADD_TASK, payload }
        expect(actual).toEqual(expected)
      })
    })

    describe('updateTask', () => {
      it('should create an UPDATE_TASKS action', async () => {
        const task = { id: 1, taskName: 'task name', taskDescription: 'task description', state: 'todo' },
          state = { task: { taskCount: 1, todo: [task], 'in-progress': [] } },
          idx = 0,
          newTask = { ...task, state: 'in-progress' },
          payload = { todo: [], 'in-progress': [newTask] },
          dispatches = await Thunk(TaskModule.updateTask).withState(state).execute(task, idx),
          actual = dispatches[0].getAction(),
          expected = { type: TaskModule.ACTIONS.UPDATE_TASK, payload }
        expect(actual).toEqual(expected)
      })
    })
  })

  describe('REDUCER', () => {

    const state = { 
      isLoading: false, 
      todo: [mockData.data.tasks[0]],
      'in-progress': [mockData.data.tasks[1]],
      complete: [mockData.data.tasks[2]],
      taskCount: 3
    }

    it('should have an initial state', () => {
      expect(taskReducer()).toEqual(initialState)
    })

    it('should return the current state upon receiving an unhandled action', () => {
      Reducer(taskReducer).expect({type: 'NOT_EXISTING'}).toReturnState(initialState)
    })

    it('should initialize task lists upon receiving a FETCH_TASKS action', () => {
      const action = { type: TaskModule.ACTIONS.FETCH_TASKS, payload: state }
      Reducer(taskReducer).withState(initialState).expect(action).toReturnState({ ...initialState, ...state })
    })

    it('should add a new task to the todos list upon receiving an ADD_TASK action', () => {
      const task = { id: 4, taskName: 'name', taskDescription: 'description', state: 'todo' },
        todo = [ ...state.todo ],
        action = { type: TaskModule.ACTIONS.ADD_TASK, payload: { todo } }

      todo.push(task)
      Reducer(taskReducer).withState(state).expect(action).toReturnState({ ...state, ...action.payload })
    })

    it('should advance a task to the next state upon receiving an UPDATE_TASK action', () => {
      const todo = [ ...state.todo ],
        inProgress = [ ...state['in-progress'] ],
        newTask = { ...state.todo.splice(0, 1)[0] },
        action = { type: TaskModule.ACTIONS.UPDATE_TASK, payload: { todo, 'in-progress': inProgress } }

      newTask.state = 'in-progress'
      inProgress.push(newTask)
      Reducer(taskReducer).withState(state).expect(action).toReturnState({ ...state, ...action.payload })
    })
  })
})
