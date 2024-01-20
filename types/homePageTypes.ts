import type {EnumStatus, ICustomer} from "~/types/dealsTypes";

export interface ICard {
    id: string
    name: string
    price: number
    $createdAt: string
    companyName: string
    status: string
}

export interface IColumn {
    id: EnumStatus
    name: string
    cards: ICard[]
}

export interface ICustomerFormState extends Pick<ICustomer, 'name' | 'email' | 'avatar_url'> {

}

export interface InputFileEvent extends Event {
    target: HTMLInputElement
}