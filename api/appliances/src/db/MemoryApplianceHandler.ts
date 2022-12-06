import { Appliance } from "../model/Appliance";
import { ApplianceHandler } from "./ApplianceHandler";

export class MemoryDbHandler implements ApplianceHandler {
  private _appliances;

  constructor(initialAppliances: Appliance[] = []) {
    this._appliances = initialAppliances
  }

  getApplianceList(): Appliance[] {
    return this._appliances;
  }
  
  getApplianceById(applianceId: number): Appliance | null {
    try {
      const applianceIndex = this._appliances.findIndex(appliance => appliance.id === applianceId)
      return applianceIndex >=0? this._appliances[applianceIndex]: null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  addAppliance(appliance: Appliance): number {
    try {
      const applianceIndex = this._appliances.findIndex(app => app.id === appliance.id)
      if (applianceIndex >=0) {
        throw Error("Failed to add appliance - duplicate appliance ID identified.")
      }
      this._appliances.push(appliance);
      return appliance.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  updateAppliance(applianceId: number, newAppliance: Appliance): boolean {
    try {
      const applianceIndex = this._appliances.findIndex(appliance => appliance.id === applianceId)
      if(applianceIndex >=0) {
        this._appliances[applianceIndex] = newAppliance;
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  }

  deleteAppliance(applianceId: number): boolean {
    try {
      const applianceIndex = this._appliances.findIndex(appliance => appliance.id === applianceId)
      if (applianceIndex >=0) {
        this._appliances = this._appliances.filter(appliance => appliance.id !== applianceIndex)
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  }
}