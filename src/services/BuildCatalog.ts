import { ApiMethods } from "@/api"
import { TCatalog } from "@/models/POJOs"

export const buildCatalog = async (token, NetForemostId): Promise<TCatalog[]> => {
    const methods = ApiMethods(token)
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