import request from 'supertest'
import app from '../../src/app'
import { Appliance } from '../../src/model/Appliance'

describe('Appliance Router', function () {
  describe('/appliances', function () {
    it('returns all appliances', async function () {
      const appliances: Appliance[] = await (await request(app).get('/appliances')).body
      expect(appliances.length).toBeGreaterThan(0)
      appliances.forEach(appliance => {
        expect('id' in appliance).toBe(true)
        expect('name' in appliance).toBe(true)
        expect('type' in appliance).toBe(true)
        expect('createdAt' in appliance).toBe(true)
      });
    })
  })
})