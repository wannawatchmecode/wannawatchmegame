
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

    stop(): void {
        this._isRunning = false;
        this._clearTimeout();
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

    private _clearTimeout() {
        if(this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = undefined;
        }
    }
}
