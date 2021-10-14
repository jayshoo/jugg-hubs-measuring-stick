let Decoder = new TextDecoder()
let Encoder = new TextEncoder()

async function measuringStick(id: string): Promise<Response> {
  let data = Encoder.encode(id)
  let hash = await crypto.subtle.digest('SHA-256', data)
  let text = Decoder.decode(hash)
  return new Response(text, {
    headers: {
      'content-type': 'text/plain'
    }
  })
}

addEventListener('fetch', event => {
  let [_, id] = new URL(event.request.url).pathname.split('/')
  event.respondWith(measuringStick(id))
})