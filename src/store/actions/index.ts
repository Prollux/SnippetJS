import { ActionType } from "../action-types";

interface MovePanel {
    type: ActionType.MOVE_PANEL;
    payload:{
        id:number
        direction: 'up' | 'down';
    }
}

interface DeletePanel {
    type: ActionType.DELETE_PANEL;
    payload:{
        id: number
    }
}

interface InsertPanel {
    type: ActionType.INSERT_PANEL;
    payload:{
        id:number
    }
}

interface UpdatePanel {
    type: ActionType.UPDATE_PANEL;
    payload: {
        id: number;
        code: string;
    }
}

export type Action = 
| MovePanel
| DeletePanel
| InsertPanel
| UpdatePanel;
