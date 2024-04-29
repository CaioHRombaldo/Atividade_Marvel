import { seriePersonagem } from "src/personagens/interfaces/seriePersonagem.interface";
import { serieQuadrinho } from "src/quadrinhos/interfaces/serieQuadrinho.interface";
import { serieCriador } from "src/criadores/interfaces/serieCriador.inteface";

export interface serieData {
    creators: serieCriador,
    quadrinhos: serieQuadrinho,
    personagens: seriePersonagem
}