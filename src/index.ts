import { Netzplan } from "./Classes/Netzplan";
import JsonData from "./Data/Knoten.json";
import { Data } from "./interfaces/Data_Interface";

function Main() {
  const data: Data[] = JsonData;

  // Netzplan erstellen
  const netzplan = new Netzplan(data);

  // Ausgabe
  console.log(JSON.stringify(netzplan.generateOutput(), null, 2));
}

Main();
