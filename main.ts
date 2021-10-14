let Decoder = new TextDecoder()
let Encoder = new TextEncoder()

async function measuringStick(id: string): Promise<Response> {
  let data = Encoder.encode(id)
  let hash = await crypto.subtle.digest('SHA-256', data)
  let view = new DataView(hash)
  
  let answer = [
    view.getUint8(0),
    view.getUint8(1),
    view.getUint8(2)
  ]
  
  return new Response(JSON.stringify(answer))
}

addEventListener('fetch', event => {
  let [_, id] = new URL(event.request.url).pathname.split('/')
  event.respondWith(measuringStick(id))
})
