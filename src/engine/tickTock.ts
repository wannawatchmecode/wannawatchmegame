

export interface ITickTock {
    /**
     * Epoch time of last tick in ms.
     */
    lastTick: number;
    /**
     * The epock time from tock call (basically it is current time)
     */
    currentTock: number;
    /**
     * Diff between tick and tock, passed to the gate executeTick method.
     */
    durationSinceLastTick(): number;
}

export interface ITickTockProps {
    /**
     * Epoch time of last tick in ms.
     */
    lastTick: number;
    /**
     * The epoch time from tock call (basically it is current time)
     */
    currentTock: number;
}

export class TickTock implements ITickTock {
    lastTick: number;
    currentTock: number;

    constructor(props: ITickTockProps) {
        this.lastTick = props.lastTick;
        this.currentTock = props.currentTock;
    }

    durationSinceLastTick(): number {
        return this.currentTock - this.lastTick;
    }

}