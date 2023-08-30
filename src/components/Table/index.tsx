"use client"
import React, { useRef } from 'react'
import { DownloadTableExcel } from 'react-export-table-to-excel'
import Button from '../Inputs/Button'

type Column = {
    header: string,
    key: string
}

interface IProps {
    columns: Array<Column>
    data: Array<any>

}

const Table: React.FC<IProps> = (props) => {
    const tableRef = useRef(null);

    const metadata = React.useMemo(() => {
        const tableArr: any[] = []
        for (let dataObj of props.data) {
            const row: any[] = []
            for (let columnObj of props.columns) {
                row.push(dataObj[columnObj.key])
            }
            tableArr.push(row)
        }
        return {
            columns: props.columns,
            data: tableArr
        }
    }, [props.columns, props.data])

    return (
        <>
            <DownloadTableExcel
                filename="users table"
                sheet="users"
                currentTableRef={tableRef.current}
            >

                <Button buttonText='Export to Excel' className='px-2 py-1'/>

            </DownloadTableExcel>
            <div className='relative overflow-x-auto shadow-md rounded-lg mt-4'>
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400' ref={tableRef}>
                    <thead className='text-xs text-gray-200 uppercase bg-gray-50 dark:bg-zinc-900 dark:text-gray-40'>
                        <tr>
                            {props?.columns && props.columns.map((obj, i) => {
                                return <th key={i} className='px-6 py-3'>{obj.header}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {metadata?.data && metadata.data.map((row, i) => (
                            <tr key={i} className='border-b bg-gray-50 dark:bg-zinc-800 dark:border-gray-700'>
                                {row.map((obj, j) => {
                                    return <td key={j} className='px-6 py-3'>{obj}</td>
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table