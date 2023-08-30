"use client"

import { useState, useEffect, MouseEventHandler } from 'react'
import styles from './page.module.css'
import { login, ApiMethods } from '../api'
import { Table } from '../components'
import { ToastContainer } from 'react-toastify'
import { errorNotification, infoNotification, successNotification } from '@/utils/notifications'
import { NETFOREMOST_ID } from '@/utils/constants'
import { buildCatalog } from '@/services/BuildCatalog'
import { TLogin } from '@/models/DTOs'
import Worklog from '@/components/Worklog'
import { TCatalog } from '@/models/POJOs'
import Button from '@/components/Inputs/Button'

const columns = [{
  header: 'Proyecto',
  key: 'projectName'
}, {
  header: 'Tipo Trabajo',
  key: 'taskName'
}, {
  header: 'Inicio',
  key: 'start'
}, {
  header: 'Final',
  key: 'end'
}, {
  header: 'Horas',
  key: 'hours'
}, {
  header: 'Horas Cristianas',
  key: 'timeString'
}]

const initialTokenData: TLogin = {
  createdAt: new Date,
  expiresAt: new Date,
  token: ""
}

export default function Home() {
  const [tokenData, setTokenData] = useState<TLogin>(initialTokenData)
  const [catalogs, setCatalogs] = useState<TCatalog[]>([])
  const [tasks, setTasks] = useState<any>()
  const worklogProps = { tokenData, setTasks, catalogs };

  const btnLoginEvent = async (e) => {
    e.preventDefault()
    const email = document.getElementById("email") as HTMLInputElement
    const pass = document.getElementById("pass") as HTMLInputElement
    let token: string = "";

    if (tokenData.token) {
      infoNotification("Ya hiciste log in!")
      return
    }

    await login(email.value, pass.value).then(r => {
      if (!r.data) {
        errorNotification(r.message);
        return
      }

      token = r.data.token;
      setTokenData(r.data)
      successNotification("Te has loggeado! Ya puedes consultar tus logs del TD!");
    })

    if (token) {
      buildCatalog(token, NETFOREMOST_ID).then(r => {
        setCatalogs(r)
      })
    }
  }

  return (
    <main className={`${styles.main} container`}>
      <article className='flex flex-col gap-2'>
        <section className='flex flex-col gap-1 justify-center'>
          <input id="email" placeholder="email" className='rounded-sm p-2' />
          <input id="pass" placeholder="password" type="password" className='rounded-sm p-2' />
          <Button buttonText='Log In' handleClick={btnLoginEvent} />
        </section>

        <Worklog {...worklogProps} />
      </article>
      <section>
        {tasks && <Table columns={columns} data={tasks} />}
      </section>

      <ToastContainer />
    </main>
  )
}
