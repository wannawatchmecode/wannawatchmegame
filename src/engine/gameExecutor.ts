import { IGame } from "./game";

export interface IGameExecutionConfiguration {
    /**
     * Duration per tick in milliseconds.
     */
    durationPerTick: number
}

export interface IStartGameRequest {
    game: IGame;
    gameExecutionConfiguration: IGameExecutionConfiguration; 
}

export interface IStartGameResponse {

}

export interface IStopGameRequest {
    
}

export interface IStopGameResponse {

}

export interface IGameLoop {
    start(): void;
    stop(): void;
}

export interface IGameLoopProps {
    game: IGame;

    /**
     * Duration between clock ticks in ms.
     */
    tickTimeoutDuration: number;
}

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

export class GameLoop implements IGameLoop {
    private _game: IGame;
    private _isRunning: boolean;
    private _lastTick?: number;
    /**
     * Duration between clock ticks in ms.
     */
    private _tickTimeoutDuration: number;
    private _timeout?: number;

    constructor(props: IGameLoopProps) {
        this._game = props.game;
        this._isRunning = false;
        this._tickTimeoutDuration = props.tickTimeoutDuration;
    }


    start(): void {
        this._isRunning = true;
        this._run();
    }

    private _run(): void {
        if(this._isRunning) {
            const tock = this._getTock();
            this._game.executeTick({
                durationSinceLastTick: tock.durationSinceLastTick()
            });
        
            setTimeout(() => {
                this._run();
            }, this._tickTimeoutDuration)
        }
    }

    private _getTock(): ITickTock {
        if(!this._lastTick) {
            this._lastTick = this.getEpochNow();
        }
        const currentTock = this.getEpochNow();
        const response = new TickTock({
            lastTick: this._lastTick,
            currentTock
        });

        this._lastTick = this.getEpochNow();

        return response;
    }

    private getEpochNow() {
        return Date.now();
    }

    stop(): void {
        this._isRunning = false;
        this._clearTimeout();
    }

    private _clearTimeout() {
        if(this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = undefined;
        }
    }


}

export interface IGameExecutor {
    start(props: IStartGameRequest): Promise<IStartGameResponse>;
    stop(props: IStopGameRequest): Promise<IStopGameResponse>;
}

export class GameExecutor implements IGameExecutor {
    // Use timeout that executes periodically
    // 1. Timeout should be configurable
    // 2. Time since last timeout should be tracked
    // 3. Time since last timeout should be provided as an input
    // to the game.executeTick.
    
    start(props: IStartGameRequest): Promise<IStartGameResponse> {

        throw new Error("Method not implemented.");
    }

    stop(props: IStopGameRequest): Promise<IStopGameResponse> {
        throw new Error("Method not implemented.");
    }

}