"use client"

import { useState, useEffect } from 'react'
import styles from './page.module.css'
import { login, ApiMethods } from '../api'
import { Table } from '../components'

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + (h * 60 * 60 * 1000));
  return this;
}
Date.prototype.addSeconds = function (s) {
  this.setTime(this.getTime() + (s * 1000));
  return this;
}

const NetForemostId = 'YiUG_nAeY3kWpnOS'
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
const dateFormatter = Intl.DateTimeFormat('es-ES', {
  hour12: false,
  dateStyle: 'short',
  timeStyle: 'short'
})
const getHourBySeconds = (seconds) => {
  const h = seconds / 3600
  const hTime = Math.trunc(h)

  const m = (h - hTime) * 60
  const mTime = Math.trunc(m)

  const s = (m - mTime) * 60
  const sTime = Math.trunc(s)

  return `${hTime.toString().padStart(2, '0')}:${mTime.toString().padStart(2, '0')}:${sTime.toString().padStart(2, '0')}`
}
export default function Home() {
  const [tokenData, setTokenData] = useState<any>()
  const [catalogs, setCatalogs] = useState<any>()
  const [tasks, setTask] = useState<any>()

  const btnLoginEvent = (e) => {
    e.preventDefault()
    const email = document.getElementById("email") as HTMLInputElement
    const pass = document.getElementById("pass") as HTMLInputElement
    login(email.value, pass.value).then(r => {
      setTokenData(r.data)
      // console.log(r)
    }).catch(e => {
      console.log("error")
      console.log(e)
    })
  }
  const buildCatalog = async () => {
    const methods = ApiMethods(tokenData.token)
    const projects = await methods.projects(NetForemostId)
    const tasks = await methods.task(NetForemostId)

    //console.log(projects)
    //console.log(tasks)

    const o = projects.data.map(obj => {
      return {
        projectId: obj.id,
        name: obj.name,
        tasks: tasks.data.filter(i => i.project.id == obj.id)
      }
    })

    return o
  }
  const buildWorklogObj = async (cat, from, to) => {
    const methods = ApiMethods(tokenData.token)
    const worklogResponse = await methods.worklog(from, to, NetForemostId)
    const logs = worklogResponse.data[0]
    // console.log(cat)
    const o = logs.map(log => {
      const project = cat.find(i => i.projectId === log.projectId)
      const task = project.tasks.find(t => t.id == log.taskId)
      // console.log(log)
      // console.log(project)
      // console.log(task)
      const endDate = new Date(log.start)
      endDate.addSeconds(log.time)
      const startDate = new Date(log.start)

      return { ...log, hours: log.time / 3600, timeString: getHourBySeconds(log.time), start: dateFormatter.format(startDate).replaceAll(',', ''), end: dateFormatter.format(endDate).replaceAll(',', ''), projectName: project?.name, taskName: task?.name }
    })
    return o
  }
  const btnCatalogsEvent = (e) => {
    if (!tokenData?.token) return
    e.preventDefault()
    buildCatalog().then(r => {
      setCatalogs(r)
    })
  }
  const btnGenerateWorkLog = (e) => {
    e.preventDefault()
    if (!catalogs) return
    const fechaIni = document.getElementById("fechaIni") as HTMLInputElement
    const fechaFin = document.getElementById("fechaFin") as HTMLInputElement
    const fechaIniObj = new Date(fechaIni.value)
    const fechaFinObj = new Date(fechaFin.value)
    fechaFinObj.addHours(24)
    fechaFinObj.addSeconds(-1)

    buildWorklogObj(catalogs, fechaIniObj.toISOString(), fechaFinObj.toISOString()).then(r => {
      //console.log(r)
      setTask(r)
    })
  }
  return (
    <main className={styles.main}>
      <article>
        <section className={styles.description}>
          <input id="email" placeholder="email" />
          <input id="pass" placeholder="password" type="password" />
          <button onClick={btnLoginEvent}>Get info</button>
        </section>
        <section>
          <button onClick={btnCatalogsEvent}>Get Catalogs</button>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            {catalogs && catalogs.map((proj, i) => {
              return <div key={i}>
                <h4>{proj.name}</h4>
                <ul>
                  {proj.tasks.map((task, j) => {
                    return <li key={j}>{task.name}</li>
                  })}
                </ul>
              </div>
            })}
          </div>
        </section>
        <section>
          <h4>Worklog</h4>
          <section>
            <label>Fecha Ini</label>
            <input id="fechaIni" type='date' />
          </section>
          <section>
            <label>Fecha Fin</label>
            <input id="fechaFin" type='date' />
          </section>
          <button onClick={btnGenerateWorkLog}>Generar</button>
        </section>
        <section>
          {tasks && <Table columns={columns} data={tasks} />}
        </section>
      </article>
    </main>
  )
}
