import { Action } from "redux";
import { ActionType } from "../action-types";

interface MovePanel {
    type: ActionType.MOVE_PANEL;
    payload:any
}

interface DeletePanel {
    type: ActionType.DELETE_PANEL;
    payload:any
}

interface InsertPanel {
    type: ActionType.INSERT_PANEL;
    payload:any
}

interface UpdatePanel {
    type: ActionType.UPDATE_PANEL;
    payload:any
}