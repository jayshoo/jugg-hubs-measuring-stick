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
  let length = x[0] / 256 * 11 + 1
  let width = x[1] / 256 * 4 + 1
  let angle = x[2] / 256 * 60
  
  if (id == '17059791') {
    length *= 10
    width *= 10
  }
  
  let length_cm = length * 2.54
  let radius_cm = width * 2.54 / 2
  let volume_cm3 = Math.PI * radius_cm * radius_cm * length
  let mass_g = volume_cm3 * 1.1

  let answer = `Dick length is ${length.toFixed(1)} inch and has a width of ${width.toFixed(0)} inch, weighing in at ${mass_g.toFixed(0)} grams!`
  if (mass_g >= 1000) answer = `𝕂𝕀𝕃𝕆𝔻𝕀ℂ𝕂!! ${length.toFixed(1)}" long, ${width.toFixed(0)}" wide, and a massive ${mass_g.toFixed(0)}g! 𝕄𝔼𝔸𝕋𝕐`
  if (id == '17059791') answer = `𝓖𝓘𝓖𝓐𝓓𝓞𝓝𝓖!! ${length.toFixed(1)}" long, ${width.toFixed(0)}" wide, and a 𝓟𝓔𝓝𝓓𝓤𝓛𝓞𝓤𝓢 ${mass_g.toFixed(0)}g!! 𝓜𝓐𝓖𝓝𝓘𝓕𝓘𝓒𝓔𝓝𝓣`
  
  return new Response(answer)
}

addEventListener('fetch', event => {
  let [_, id] = new URL(event.request.url).pathname.split('/')
  console.log('measurement for', id)
  event.respondWith(measuringStick(id))
})
