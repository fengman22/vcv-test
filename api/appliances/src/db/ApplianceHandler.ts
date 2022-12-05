import { Appliance } from "../model/Appliance";

export interface ApplianceHandler {
  getApplianceList(): Appliance[];
  getApplianceById(applianceId: number): Appliance | null;
  addAppliance(appliance: Appliance): number;
  updateAppliance(applianceId:number, newAppliance: Appliance): boolean;
  deleteAppliance(applianceId: number): boolean;
}