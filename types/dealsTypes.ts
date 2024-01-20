export enum EnumStatus {
    todo = 'todo',
    in_progress = 'in-progress',
    done = 'done'
}


export interface IBaseField {
    $createdAt: string
    $id: string
}

export interface ICustomer extends IBaseField {
    name: string
    email: string
    avatar_url: string
    from_source?: string
}

export interface IComment extends IBaseField {
    text: string
}

export interface IDeal extends IBaseField {
    comments: IComment[]
    customer: ICustomer
    name: string
    price: number
    status: EnumStatus
}

export interface IDealFormState extends Pick<IDeal, 'name' | 'price'> {
    customer: {
        email: string
        name: string
    }
    status: string
}


