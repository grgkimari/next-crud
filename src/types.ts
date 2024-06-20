export interface ITask{
    id? : string
    title : string
    description? : string
    dueDate? : Date
    completed : boolean
}
export interface ITaskFormValues{
    id? : string
    title : string
    description? : string
    dueDate? : string
    completed : boolean
}