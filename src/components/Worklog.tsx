import { TLogin } from '@/models/DTOs'
import { TCatalog } from '@/models/POJOs'
import { buildWorklogObj } from '@/services/BuildWorklog'
import { addHours, addSeconds } from '@/utils/datesValidations'
import { errorNotification } from '@/utils/notifications'
import React, { Dispatch, SetStateAction } from 'react'
import Button from './Inputs/Button'

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

        let isSomeDateEmpty: boolean = [fechaIni.value, fechaFin.value].some(d => !d);
        if (isSomeDateEmpty) {
            errorNotification("Debes seleccionar ambas fechas");
            return
        }

        let fechaIniObj = new Date(fechaIni.value)
        let fechaFinObj = new Date(fechaFin.value)
        if (fechaIniObj > fechaFinObj) {
            errorNotification("La fecha final no puede ser menor a la fecha de inicio!");
            return
        }

        if (fechaFinObj.getTime() > Date.now() || fechaIniObj.getTime() > Date.now()) {
            errorNotification("Ninguna de las fechas puede ser mayor a hoy!");
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
                            <Button handleClick={btnGenerateWorkLog} buttonText='Generate Log' />
                        </section>
                    </>
                )
            }
        </>
    )
}

export default Worklog