import { Action } from "../actions";
import { ActionType } from "../action-types";
import { Panel } from "../panel"

interface PanelState {
    loading:boolean;
    error:string|null;
    order:number[];
    data: {
        [key:number]:Panel
    }
}

const initialState: PanelState = {
    loading: false,
    error: null,
    order: [],
    data: {}
}

const panelReducer = (
    state:PanelState = initialState,
    action:Action
    ): PanelState => {
        switch (action.type) {
            case ActionType.UPDATE_PANEL:
                return state
            case ActionType.DELETE_PANEL:
                return state
            case ActionType.UPDATE_PANEL:
                return state
            case ActionType.MOVE_PANEL:
                return state
        }

}

export default panelReducer
