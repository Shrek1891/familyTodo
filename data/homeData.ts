import type {IColumn} from "~/types/homePageTypes";
import {EnumStatus} from "~/types/dealsTypes";

export const homeData:IColumn[] = [
    {
        id: EnumStatus.todo,
        name: 'Input',
        cards: []
    },
    {
        id: EnumStatus.in_progress,
        name: 'Doing...',
        cards: []
    },
    {
        id: EnumStatus.done,
        name: 'Done',
        cards: []
    }
]