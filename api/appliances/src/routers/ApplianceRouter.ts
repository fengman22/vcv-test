import { Router, Request, Response } from 'express';
import ApplianceService from '../service/ApplianceService';
import { ApplianceHandler } from '../db/ApplianceHandler';
import { MemoryDbHandler } from '../db/MemoryApplianceHandler';
import getTestAppliances from '../helpers/getTestAppliances';

const router = Router()

const dbHandler: ApplianceHandler = new MemoryDbHandler(getTestAppliances());
const applianceService = new ApplianceService(dbHandler);

router.get('/', function (req: Request, res: Response) {
  try {
    const applianceList = applianceService.getApplianceList();

    res.send( applianceList )
  }
  catch (error) {
    console.error(error)
    res.statusCode = 500
    res.send('{ error: "An unexpected error occurred while retrieving appliance list." }')
  }
})

router.get('/:id', function (req: Request, res: Response) {
  try {
    const applianceId = Number(req.params['id'])
    if (!applianceId) {
      res.statusCode = 400
      res.send('missing id')
      return
    }
    res.send(applianceService.getApplianceById(applianceId))
  }
  catch (error) {
    console.error(error)
    res.statusCode = 500
    res.send('{ error: "An unexpected error occurred while retrieving appliance list." }')
  }
})

router.post('/new', function (req: Request, res: Response) {
  try {
    const applianceName = req.body.name as string
    const applianceType = req.body.type as string
    if (!applianceName || !applianceType) {
      res.statusCode = 400
      res.send('missing name and/or type')
      return
    }
    const applianceId = applianceService.getApplianceList().length
    const appliance = {
      id: applianceId,
      name: applianceName,
      type: applianceType,
      createdAt: new Date()
    }
    const result = applianceService.addAppliance(appliance)
    res.statusCode = 200
    res.send(result)
  }
  catch (error) {
    console.error(error)
    res.statusCode = 500
    res.send('{ error: "An unexpected error occurred while adding  new appliance." }')
  }
})

router.patch('/:id', function (req: Request, res: Response) {
  try {
    const applianceId = Number(req.params['id'])
    const newApplianceName = req.body.name as string
    const newApplianceType = req.body.type as string
    if (!applianceId || !newApplianceName || !newApplianceType) {
      res.statusCode = 400
      res.send('missing id/name/type')
      return
    }
    const currentAppliance = applianceService.getApplianceById(applianceId)
    if(!currentAppliance || !currentAppliance.id) {
      res.statusCode = 400
      res.send(`cannot find appliance with id: ${applianceId}`)
      return
    }

    res.statusCode = 200
    res.send({
      updated: applianceService.updateAppliance(applianceId, {
        id: applianceId,
        name: newApplianceName,
        type: newApplianceType,
        createdAt: currentAppliance.createdAt,
      })
    })
  }
  catch (error) {
    console.error(error)
    res.statusCode = 500
    res.send('{ error: "An unexpected error occurred while updating appliance." }')
  }
})

router.delete('/:id', function (req: Request, res: Response) {
  try {
    const applianceId = Number(req.params['id'])
    if (!applianceId) {
      res.statusCode = 400
      res.send('missing id in the path')
      return
    }
    const currentAppliance = applianceService.getApplianceById(applianceId)
    if(currentAppliance?.id !== applianceId) {
      res.statusCode = 400
      res.send(`cannot find appliance with id: ${applianceId}`)
      return
    }

    res.statusCode = 200
    res.send(applianceService.deleteAppliance(applianceId))
  }
  catch (error) {
    console.error(error)
    res.statusCode = 500
    res.send('{ error: "An unexpected error occurred while deleting appliance"}')
  }
})

router.post('/:id/reboot', function (req: Request, res: Response) {
  try {
    const applianceId = Number(req.params['id'])

    const token = req.headers['token']
    // Use hard coded token for now
    if (!token || token !== 'vocovo') {
      res.statusCode = 401
      res.send('Access denied, token is missing/incorrect.')  
      return
    }

    // Extract user/role info from JWT token
    // Check user/role info against the DB to see if the access is allowed
    // If yes, make calls to reboot the appliance
    // Otherwise, issue 403

    res.statusCode = 200
    console.log(`rebooting appliance: ${applianceId}`)
    res.send('rebooted')    
  }
  catch (error) {
    console.error(error)
    res.statusCode = 500
    res.send('{ error: "An unexpected error occurred while rebooting appliance." }')
  }
})

router.get('/ping', (req: Request, res: Response) => {
  return res.json({ message: 'appliances pong' })
})
export default router