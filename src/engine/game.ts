export interface IExecutionProps {
    /**
     * Duration since last tick executed by the game engine in milliseconds. 
     */
    durationSinceLastTick: number;
}
export interface IGame {
    executeTick(props: IExecutionProps): Promise<void>;
}