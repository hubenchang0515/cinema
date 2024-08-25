import { CONFIG } from "@/config";

const HttpStatusHandler = (response:Response) => {
    
}

export const Request = {
    fetch: async (url:string, body:any, method:string) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);

        const options:RequestInit = {
            method: method,
            headers: headers,
            body: JSON.stringify(body),
            signal: controller.signal,
        }

        const response = await fetch(url, options);
        clearTimeout(id);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw(response.statusText);
        }
    },

    GET: async (url:string, body:any=undefined) => {
        return await Request.fetch(url, body, 'GET')
    },

    POST: async (url:string, body:any=undefined) => {
        return await Request.fetch(url, body, 'POST')
    },
}