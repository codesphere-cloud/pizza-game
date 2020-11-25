export class Sequential {

    private sequential: number;

    public constructor(start: number = 1) {
        this.sequential = start;
    }

    public increment(): number {
        return this.sequential++;
    }

}