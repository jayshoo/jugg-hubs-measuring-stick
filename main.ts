let Decoder = new TextDecoder()
let Encoder = new TextEncoder()

async function measuringStick(id: string): Promise<Response> {
  let data = Encoder.encode(id)
  let hash = await crypto.subtle.digest('SHA-256', data)
  let view = new DataView(hash)
  
  let x = [
    view.getUint8(0),
    view.getUint8(1),
    view.getUint8(2)
  ]
  let n = [
    x[0] / 256 * 11 + 1,
    x[1] / 256 * 4 + 1,
    x[2] / 256 * 60
  ]

  let answer = `Dick length is ${n[0].toFixed(1)} inch and has a width of ${n[1].toFixed(0)} inch, with an angle of ${n[2].toFixed(0)} degrees.`
  
  return new Response(answer)
}

addEventListener('fetch', event => {
  let [_, id] = new URL(event.request.url).pathname.split('/')
  event.respondWith(measuringStick(id))
})
