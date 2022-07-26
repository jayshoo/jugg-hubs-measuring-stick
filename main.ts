import { BP } from './data.ts'

let Decoder = new TextDecoder()
let Encoder = new TextEncoder()

async function measuringStick2021(id: string): Promise<Response> {
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
  
  let length_cm = length * 2.54
  let radius_cm = width * 2.54 / 2
  
  let volume_cm3 = Math.PI * radius_cm * radius_cm * length
  let mass_g = volume_cm3 * 1.1

  let answer = `Dick length is ${length.toFixed(1)} inch and has a width of ${width.toFixed(0)} inch, weighing in at ${mass_g.toFixed(0)} grams!`
  if (mass_g >= 1000) answer = `𝕂𝕀𝕃𝕆𝔻𝕀ℂ𝕂!! ${length.toFixed(1)}" long, ${width.toFixed(0)}" wide, and a 𝓟𝓔𝓝𝓓𝓤𝓛𝓞𝓤𝓢 ${mass_g.toFixed(0)}g! 𝕍𝔼ℝ𝕐 𝕄𝔼𝔸𝕋𝕐`
  if (mass_g <= 100) answer = `ᴍɪᴄʀᴏᴘᴇᴇɴᴏʀ EleGiggle Barely ${length.toFixed(1)} inch long and ${width.toFixed(0)} inch wide, weighing only ${mass_g.toFixed(1)}g... so sad.`
  
  return new Response(answer)
}

async function measuringStick2022(id: string): Promise<Response> {
  let data = Encoder.encode(id)
  let hash = await crypto.subtle.digest('SHA-256', data)
  let view = new DataView(hash)
  
  let x = [
    view.getUint8(0),
    view.getUint8(1),
    view.getUint8(2), // adding detail to length
    view.getUint8(3), // adding detail to girth
  ]
  let length_pct = x[0] / 256 + x[2] / 65536 // 0<=x<=1
  let girth_pct = x[1] / 256 + x[3] / 65536 // 0<=x<=1
  let length_z = (length_pct-1/2) * 6 // -3<=z<=+3
  let girth_z = (girth_pct-1/2) * 6 // -3<=z<=+3
  let length_cm = BP.length[0] + BP.length[1] * length_z
  let girth_cm = BP.girth[0] + BP.girth[1] * girth_z

  function in_2021(): string {
    let length = x[0] / 256 * 11 + 1
    let width = x[1] / 256 * 4 + 1
    
    let length_cm = length * 2.54
    let radius_cm = width * 2.54 / 2
    
    let volume_cm3 = Math.PI * radius_cm * radius_cm * length
    let mass_g = volume_cm3 * 1.1

    return `${length.toFixed(1)}" long ${width.toFixed(0)}" wide ${mass_g.toFixed(0)}g`
  }

  let answer = `New stats: ${length_cm.toFixed(1)}cm long, ${girth_cm.toFixed(1)}cm around. (old: ${in_2021()})`
  
  return new Response(answer)
}

addEventListener('fetch', event => {
  let [_, id] = new URL(event.request.url).pathname.split('/')
  console.log('measurement for', id)
  event.respondWith(measuringStick2022(id))
})
