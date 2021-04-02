/// <reference path="./deployctl.d.ts" />
addEventListener('fetch',(event)=>{
    const response=new Response(import.meta.url,{
        headers:{"content-type":"text/plain"}
    })
    event.respondWith(response)
})