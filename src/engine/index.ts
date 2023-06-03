import { GameLoop, IGameLoop } from "./gameLoop";

console.log('Creating and starting game loop!');

const myGameLoop: IGameLoop = new GameLoop({
    tickTimeoutDuration: 1000,
    game: {
        executeTick: (props) => {
            console.log(`In the game with props ${JSON.stringify(props)}`);
            return Promise.resolve();
        }
    }
});

myGameLoop.start();