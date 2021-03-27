import {AnyAction} from 'redux';

export interface StateUpload {
    upload: State
}

export interface State {
    value: number
}

export interface Progress {
    value: number
}

export interface ProgressAction extends AnyAction{
    payload: Progress
}

export type Actions = ProgressAction