export interface IStd {
    fname: string;
    lname: string;
    email: string;
    contact: string;
    stdId: string;
    isActive: boolean;
}
export interface IStdRes {
    msg : string;
    data : IStd;
}