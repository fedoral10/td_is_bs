import { ApiMethods } from "@/api"
import { TWorklog } from "@/models/POJOs"
import { NETFOREMOST_ID } from "@/utils/constants"
import { addSeconds, dateFormatter, getHourBySeconds } from "@/utils/datesValidations"

export const buildWorklogObj = async (cat, from, to, token): Promise<TWorklog[]> => {
    const methods = ApiMethods(token)
    const worklogResponse = await methods.worklog(from, to, NETFOREMOST_ID)
    const logs = worklogResponse.data[0]
    // console.log(cat)
    const o: TWorklog[] = logs.map(log => {
        const project = cat.find(i => i.projectId === log.projectId)
        const task = project.tasks.find(t => t.id == log.taskId)
        // console.log(project)
        // console.log(task)
        let endDate = new Date(log.start)
        endDate = addSeconds(endDate, log.time)
        const startDate = new Date(log.start)

        return {
            ...log,
            hours: log.time / 3600,
            timeString: getHourBySeconds(log.time),
            start: dateFormatter.format(startDate).replaceAll(',', ''),
            end: dateFormatter.format(endDate).replaceAll(',', ''),
            projectName: project?.name,
            taskName: task?.name
        }
    })

    return o
}