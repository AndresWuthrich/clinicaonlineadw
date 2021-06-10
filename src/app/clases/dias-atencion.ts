export class DiasAtencion {
    public estado: boolean = true;
    public literal: string = "";
    public inicio: number = 8;
    public fin: number = 14;
    public inicioRango?: any = 8;
    public finRango?: any = 19;

    constructor (estado: boolean, literal: string, inicio: number, fin: number){
        this.estado = estado;
        this.literal = literal;
        this.inicio = inicio;
        this.fin = fin;
    }
}
