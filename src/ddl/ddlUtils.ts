import { TableRow , TableRowWithId } from "../interfaces";
import { v4 as uuidv4 } from 'uuid';

export class ddlUtils {
    public static retJson(url: string): Promise<TableRowWithId[]> {
        return new Promise((resolve: (obj: TableRowWithId[]) => void, reject) => {
            fetch(url)
                .then((response) => response.json())
                .then((data: TableRow[]) => {
                    ddlUtils.addGuids(data);
                    console.log(data);
                    resolve(data as TableRowWithId[]);
                }).catch(function () {
                    console.log("error");
                    resolve({} as TableRowWithId[]);
                });
        });
    }

    public static delRow(o: any,guid: string)
    {
        if (typeof(o) === "object")
        {
            if (Array.isArray(o))
            {
                for (let index = 0; index < o.length; index++) {
                    if (typeof(o[index].data) !== "undefined")
                    {
                        if ((o[index] as TableRowWithId).guid === guid)
                        {
                            const isTitVisible:boolean = (o[index] as TableRowWithId).titvisible;
                            debugger;
                            if (isTitVisible && o.length > 1)
                            {
                                (o[index+1] as TableRowWithId).titvisible = true;
                            }
                            o.splice(index,1);
                            return;
                        }
                    }
                    ddlUtils.delRow(o[index],guid);
                }
            }
            else
            {
                Object.keys(o).forEach((k: string) => {
                    ddlUtils.delRow(o[k],guid);
                });
            }
        }
    }

    private static addGuids(o: any)
    {
        if (typeof(o) === "object")
        {
            if (Array.isArray(o))
            {
                let firsttit: boolean = true;
                o.forEach( (e : any)  => {
                    if (typeof(e.data) !== "undefined")
                    {
                        (e as TableRowWithId).titvisible = firsttit;
                        firsttit = false;
                    }
                    ddlUtils.addGuids(e);
                });
            }
            else
            {
                Object.keys(o).forEach((k: string) => {
                    ddlUtils.addGuids(o[k]);
                });
            }
            if (typeof(o.data) !== "undefined")
            {
                (o as TableRowWithId).guid = uuidv4();
                (o as TableRowWithId).opened = false;
            }
        }
    }
    
}