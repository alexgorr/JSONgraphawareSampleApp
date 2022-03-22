
export interface TableRow {
    data: Record<string, string>;
    kids: Record<string, { records: TableRow[] }>;
}

export interface TableRowWithId
{
    data: Record<string, string>;
    kids: Record<string, { records: TableRowWithId[] }>;
    //added
    guid: string;
    opened: boolean;
    titvisible: boolean;
    //added
}
export interface FldVal {
    fld : string
    ,
    val : string
}
export interface appStore
{
    JsonObj: TableRowWithId[]
}