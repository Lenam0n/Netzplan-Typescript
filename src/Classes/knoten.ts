import {
  Id,
  Name,
  Duration,
  Dependencies,
  FP,
  GP,
} from "../types/Knoten_types";
import { FAZ, FEZ, SAZ, SEZ } from "../types/Knoten_types";

export class Knoten {
  private readonly _id: Id;
  private readonly _name: Name;
  private readonly _duration: Duration;
  private _dependencies: Dependencies;
  private _successors: Dependencies;

  private _FAZ: FAZ = 0;
  private _FEZ: FEZ = 0;
  private _SAZ: SAZ = 0;
  private _SEZ: SEZ = 0;

  private _FP: FP = 0;
  private _GP: GP = 0;

  constructor(
    id: Id,
    name: Name,
    duration: Duration,
    dependencies: Dependencies = [],
    successors: Dependencies = []
  ) {
    this._id = id;
    this._name = name;
    this._duration = duration;
    this._dependencies = dependencies;
    this._successors = successors;
  }

  // Berechnungsmethoden
  public calculateFAZ(): void {
    if (this._dependencies.length === 0) {
      this._FAZ = 0;
    } else {
      this._FAZ = Math.max(...this._dependencies.map((dep) => dep.getFEZ()));
    }
    this._FEZ = this._FAZ + this._duration;
  }

  public calculateSEZ(): void {
    if (this._successors.length === 0) {
      this._SEZ = this._FEZ;
    } else {
      this._SEZ = Math.min(...this._successors.map((succ) => succ.getSAZ()));
    }
    this._SAZ = this._SEZ - this._duration;
  }

  public calculatePuffer(): void {
    if (this._successors.length === 0) {
      this._FP = 0;
    } else {
      const successorFAZ = Math.min(
        ...this._successors.map((succ) => succ.getFAZ())
      );
      this._FP = successorFAZ - this._FEZ;
    }
    this._GP = this._SAZ - this._FAZ;
  }

  // Getter
  public getID(): Id {
    return this._id;
  }

  public getName(): Name {
    return this._name;
  }

  public getDuration(): Duration {
    return this._duration;
  }

  public getFAZ(): FAZ {
    return this._FAZ;
  }

  public getFEZ(): FEZ {
    return this._FEZ;
  }

  public getSAZ(): SAZ {
    return this._SAZ;
  }

  public getSEZ(): SEZ {
    return this._SEZ;
  }

  public getFP(): FP {
    return this._FP;
  }

  public getGP(): GP {
    return this._GP;
  }

  public getDependencies(): Dependencies {
    return this._dependencies;
  }

  public getSuccessors(): Dependencies {
    return this._successors;
  }

  // Setter
  public setDependency(knoten: Knoten): void {
    if (!this._dependencies.includes(knoten)) {
      this._dependencies.push(knoten);
    }
  }

  public setSuccessors(knoten: Knoten): void {
    if (!this._successors.includes(knoten)) {
      this._successors.push(knoten);
    }
  }

  // Debugging
  public debug(): void {
    console.log({
      id: this.getID(),
      name: this.getName(),
      duration: this.getDuration(),
      dependencies: this.getDependencies()?.map((dep) => dep.getID()),
      successors: this.getSuccessors()?.map((succ) => succ.getID()),
      FAZ: this.getFAZ(),
      FEZ: this.getFEZ(),
      SAZ: this.getSAZ(),
      SEZ: this.getSEZ(),
      FP: this.getFP(),
      GP: this.getGP(),
    });
  }
}
