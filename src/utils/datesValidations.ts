export const dateFormatter = Intl.DateTimeFormat('es-ES', {
    hour12: false,
    dateStyle: 'short',
    timeStyle: 'short'
})

export const addHours = (dateParam: Date, hours: number) => {
    const date: Date = dateParam;
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    return date;
}
export const addSeconds = (dateParam: Date, seconds: number) => {
    const date: Date = dateParam; 
    date.setTime(date.getTime() + (seconds * 1000));
    return date;
}

export const getHourBySeconds = (seconds) => {
    const h = seconds / 3600
    const hTime = Math.trunc(h)

    const m = (h - hTime) * 60
    const mTime = Math.trunc(m)

    const s = (m - mTime) * 60
    const sTime = Math.trunc(s)

    return `${hTime.toString().padStart(2, '0')}:${mTime.toString().padStart(2, '0')}:${sTime.toString().padStart(2, '0')}`
}

export const getTimezone = ()=>{
    const d = new Date()
    const hours = (d.getTimezoneOffset() / 60)
    // Por alguna razon cuando es GMT- la timezoneOffset da positivo, caso contrario cuando es GMT+
    return `${hours>0?'-':'+'}${Math.abs(hours).toString().padStart(2,'0')}:00`
}