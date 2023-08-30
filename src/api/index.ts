const NetForemostId = 'YiUG_nAeY3kWpnOS'
const BASE_URL = "https://api2.timedoctor.com/api/1.0/"

export const login = (email, password) => {
    const url = new URL("login", BASE_URL)
    console.log(email, password)
    console.log(url.toString())
    var headers = new Headers();
    //headers.append("Access-Control-Allow-Headers", "access-control-allow-methods, Access-Control-Allow-Origin, Content-Type, Authorization, X-Requested-With")
    //headers.append('Access-Control-Allow-Origin','*')
    //headers.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    headers.append('Content-Type', 'application/json')
    //headers.append('redirect','follow')
    //headers.append('referrerPolicy', "no-referrer")
    //headers.append('credentials',"omit")

    return fetch(url, {
        headers,
        method: 'post',
        mode: 'cors',
        body: JSON.stringify({
            email,
            password,
        })
    })
    .then(r => r.json())
    .catch(error => error.json())
}


export const ApiMethods = (token) => {
    const getNewUrl = (path) => new URL(path, BASE_URL)

    const getMethod = (url) => {
        return fetch(url, {
            method: 'GET'
        }).then(r => r.json())
    }
    const postMethod = (url, body) => {
        url.searchParams.append('token', token)
        return fetch(url, {
            method: 'POST',
            body: typeof body == 'object' ? JSON.stringify(body) : body
        }).then(r => r.json())
    }

    return {
        projects: (company) => {
            const url = getNewUrl('projects')
            url.searchParams.append('token', token)
            url.searchParams.append('company', company)
            return getMethod(url)
        },
        task: (company) => {
            const url = getNewUrl('tasks')
            url.searchParams.append('token', token)
            url.searchParams.append('company', company)
            return getMethod(url)
        },
        worklog: (from, to, company) => {
            const url = getNewUrl('activity/worklog')

            url.searchParams.append('token', token)
            url.searchParams.append('company', company)
            url.searchParams.append('from', from)
            url.searchParams.append('to', to)
            return getMethod(url)
            //return fetch(`${BASE_URL}worklog?token=${token}&company=${company}&from=${from}&to=${to}`)
        }
    }
}

