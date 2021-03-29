import * as Typings from "./types"
import {createActions, createReducer} from "reduxsauce"

export const INITIAL_STATE: Typings.State = {
    value: 0
}

interface ActionTypes {
    PROGRESS_ACTION: string
}

interface ActionCreators {
    progressAction(payload: Typings.ProgressAction['payload']): Typings.ProgressAction
}

export const {Types, Creators} = createActions<ActionTypes, ActionCreators>({
    progressAction: ['payload']
})

export const reducer = createReducer<Typings.State, Typings.Actions>(INITIAL_STATE, {
    [Types.PROGRESS_ACTION]: progress as any
})

function progress(state = INITIAL_STATE, action: Typings.ProgressAction): Typings.Progress {
    let value = action.payload.value

    return {
        ...state,
        ...{
            value
        }
    }
}
