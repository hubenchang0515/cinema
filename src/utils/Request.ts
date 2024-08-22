const HttpStatusHandler = (response:Response) => {
    
}

export const Request = {
    fetch: async (url:string, body:any, method:string) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options:RequestInit = {
            method: method,
            headers: headers,
            body: JSON.stringify(body),
        }

        try {
            const response = await fetch(url, options);
            if (response.status === 200) {
                return await response.json();
            } else {
                console.log(response.statusText);
            }
        } catch (err) {
            console.log(err);
        }

        return undefined;
    },

    GET: async (url:string, body:any=undefined) => {
        return await Request.fetch(url, body, 'GET')
    },

    POST: async (url:string, body:any=undefined) => {
        return await Request.fetch(url, body, 'POST')
    },
}