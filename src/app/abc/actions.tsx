'use server'

export async function myAction() {
    const events = await fetch(`https://eventmanagementcomponent.azurewebsites.net/events`).then((res)=> {
            return GetBodyOfResponse(res);
        });
    return events;
}

function GetBodyOfResponse(res: Response){
    return res.text().then((t) => {
        return t;
    })
}