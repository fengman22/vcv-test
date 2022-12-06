import { ApplianceHandler } from "../db/ApplianceHandler";
import { Appliance } from "../model/Appliance";

export default class ApplianceService {
  private applianceHandler: ApplianceHandler;

  constructor(applianceHandler: ApplianceHandler) {
    this.applianceHandler = applianceHandler
  }

  getApplianceList() {
    return this.applianceHandler.getApplianceList();
  }

  getApplianceById(applianceId: number) {
    try {
      const appliance = this.applianceHandler.getApplianceById(applianceId);
      if(appliance)
        return appliance
      throw `Cannot find appliance with id: ${ applianceId }`
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  addAppliance(appliance: Appliance) {
    const applianceId = this.applianceHandler.addAppliance(appliance);
    return { applianceId };
  }

  updateAppliance(applianceId:number, newAppliance: Appliance) {
    const updated = this.applianceHandler.updateAppliance(applianceId, newAppliance);
    return updated;
  }

  deleteAppliance(applianceId: number) {
    const deleted = this.applianceHandler.deleteAppliance(applianceId);
    return { deleted };
  }
}