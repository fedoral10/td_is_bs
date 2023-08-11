"use client"
import React from 'react'

type Column = {
    header:string,
    key: string
}

interface IProps {
    columns: Array<Column>
    data: Array<any>

}

const Table:React.FC<IProps> = (props) => {
    
    const metadata = React.useMemo(()=>{
        const tableArr:any[] = []
        for(let dataObj of props.data){
            const row:any[] = []
            for(let columnObj of props.columns){
                row.push(dataObj[columnObj.key])
            }
            tableArr.push(row)
        }
        return {
            columns: props.columns,
            data: tableArr
        }
    },[props.columns,props.data])

    return (<table>
        <thead>
            <tr>
                {props?.columns && props.columns.map((obj,i)=>{
                    return <th key={i}>{obj.header}</th>
                })}
            </tr>
        </thead>
        <tbody>
            {metadata?.data && metadata.data.map((row,i)=>{
                return <tr key={i}>
                    {row.map((obj,j)=>{
                        return <td key={j}>{obj}</td>
                    })}
                </tr>
            })}
        </tbody>
    </table>)
}

export default Table