import { Data } from "../interfaces/Data_Interface";
import { Knoten } from "./knoten";

export class Netzplan {
  private knotenMap: Map<number, Knoten>;
  private data: Data[];

  constructor(data: Data[]) {
    this.data = data;
    this.knotenMap = new Map<number, Knoten>();
    this.createKnoten();
    this.addDependencies();
    this.calculateTimes();
  }

  // Knoten erstellen
  private createKnoten(): void {
    this.data.forEach((k) => {
      const knoten = new Knoten(k.Nummer, k.Vorgang, k.Dauer);
      this.knotenMap.set(k.Nummer, knoten);
    });
  }

  // Abhängigkeiten hinzufügen
  private addDependencies(): void {
    this.data.forEach((item) => {
      const current = this.knotenMap.get(item.Nummer);
      if (current) {
        item.Vorgänger.forEach((depId) => {
          const dependency = this.knotenMap.get(depId);
          if (dependency) {
            current.setDependency(dependency);
            dependency.setSuccessors(current);
          }
        });
      }
    });
  }

  // Vorwärts- und Rückwärtsberechnung sowie Pufferberechnung
  private calculateTimes(): void {
    // Vorwärtsrechnung: FAZ, FEZ
    this.knotenMap.forEach((knoten) => knoten.calculateFAZ());

    // Rückwärtsrechnung: SEZ, SAZ
    [...this.knotenMap.values()]
      .reverse()
      .forEach((knoten) => knoten.calculateSEZ());

    // Pufferberechnung: FP, GP
    this.knotenMap.forEach((knoten) => knoten.calculatePuffer());
  }

  // Kritischen Pfad ermitteln
  public criticalPath(): Knoten[] {
    return [...this.knotenMap.values()].filter(
      (knoten) => knoten.getFP() === 0 && knoten.getGP() === 0
    );
  }

  // Ergebnis generieren
  public generateOutput(): any[] {
    return [...this.knotenMap.values()].map((knoten) => ({
      id: knoten.getID(),
      Name: knoten.getName(),
      Dauer: knoten.getDuration(),
      prev: knoten.getDependencies()?.map((dep) => dep.getID()),
      next: knoten.getSuccessors()?.map((succ) => succ.getID()),
      FAZ: knoten.getFAZ(),
      FEZ: knoten.getFEZ(),
      SAZ: knoten.getSAZ(),
      SEZ: knoten.getSEZ(),
      FP: knoten.getFP(),
      GP: knoten.getGP(),
    }));
  }
}
