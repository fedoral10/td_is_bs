import { ApiMethods } from '@/api'
import { TLogin } from '@/models/DTOs'
import { TCatalog, TWorklog } from '@/models/POJOs'
import { buildWorklogObj } from '@/services/BuildWorklog'
import { NETFOREMOST_ID } from '@/utils/constants'
import { addHours, addSeconds, checkEmptyDates, dateFormatter } from '@/utils/datesValidations'
import { errorNotification } from '@/utils/notifications'
import React, { Dispatch, SetStateAction } from 'react'

type TWorklogProps = {
    setTasks: Dispatch<SetStateAction<any>>;
    tokenData: TLogin;
    catalogs: TCatalog[];
}

const Worklog = (props: TWorklogProps) => {
    const { setTasks, tokenData: { token }, catalogs } = props;

    const btnGenerateWorkLog = (e) => {
        e.preventDefault()
        // if (!catalogs) return
        const fechaIni = document.getElementById("fechaIni") as HTMLInputElement
        const fechaFin = document.getElementById("fechaFin") as HTMLInputElement

        let fechaIniObj = new Date(fechaIni.value)
        let fechaFinObj = new Date(fechaFin.value)

        const isThereAnEmptyDate = checkEmptyDates([fechaIniObj, fechaFinObj]);
        if (isThereAnEmptyDate) return


        if (fechaIniObj > fechaFinObj) {
            errorNotification("La fecha final no puede ser menor a la fecha de inicio!");
            return
        }

        fechaFinObj = addHours(fechaFinObj, 24);
        fechaFinObj = addSeconds(fechaFinObj, -1)

        buildWorklogObj(catalogs, fechaIniObj.toISOString(), fechaFinObj.toISOString(), token).then(r => {
            // console.log(r)
            setTasks(r)
        })
    }

    return (
        <>
            {
                token! && (
                    <>
                        <section className='flex flex-col gap-2 justify-center'>
                            <h4 className='text-lg'>Worklog</h4>
                            <section className='flex flex-col'>
                                <label>Fecha Inicio</label>
                                <input id="fechaIni" type='date' />
                            </section>
                            <section className='flex flex-col'>
                                <label>Fecha Fin</label>
                                <input id="fechaFin" type='date' />
                            </section>
                            <button
                                onClick={btnGenerateWorkLog}
                                className='bg-white text-black font-bold rounded-sm hover:bg-slate-100 transition-all'
                            >
                                Generar Log
                            </button>
                        </section>
                    </>
                )
            }
        </>
    )
}

export default Worklog