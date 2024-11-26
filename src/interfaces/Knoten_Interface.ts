import { Knoten } from "../Classes/knoten";
import {
  Id,
  Name,
  Duration,
  Dependencies,
  FAZ,
  FEZ,
  SAZ,
  SEZ,
  FP,
  GP,
} from "../types/Knoten_types";

export interface IKnoten {
  getID(): Id;
  getName(): Name;
  getDuration(): Duration;

  getFAZ(): FAZ;
  getFEZ(): FEZ;
  getSAZ(): SAZ;
  getSEZ(): SEZ;

  getGP(): GP;
  getFP(): FP;

  getDependencies(): Dependencies;
  getSuccessors(): Dependencies;

  setDependency(knoten: Knoten): void;
  setSuccsessors(knoten: Knoten): void;

  calculateTimes(): void;
  debug(): void;
}
