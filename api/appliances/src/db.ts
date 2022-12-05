import crypto from 'crypto'

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

const types = ['Set top box', 'Lightbulb', 'Smoke detector']

const appliances = []

for (let i = 0; i < 100; i++) {
  appliances.push({
    id: i,
    name: `Appliance ${crypto.randomBytes(2).toString('hex')}`,
    type: types[Math.floor(Math.random() * types.length)],
    createdAt: randomDate(new Date(2022, 0, 1), new Date(2022, 0, 30)),
  })
}

export default appliances
