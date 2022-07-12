import InitScene from './scenes/init.js';
import app from './config.js'
import { Constants } from './constants.js';

const States = {
    INIT: 0,
    GAME: 1,
    WIN: 2
}

export class GameManager {
    constructor() {
        this.initScene = null;
        this.state = null;
        this.timeInitGame = Constants.TIME_INIT_SCENE;
        this.start();
    }

    start() {
        const pixiCanvas = document.querySelector('#pixi-canvas');

        if (pixiCanvas) {
            pixiCanvas.appendChild(app.view);
            this.gameState = States.INIT;
        }

        this.initScene = new InitScene();
        const initContainer = this.initScene.getInitContainer();
        this.initScene.makeVisible();
        app.stage.addChild(initContainer);

        this.state = this.update;
        app.ticker.add(delta => this.loop(delta));
    }

    loop(delta) {
        this.state(delta);
    }

    update() {
        switch(this.gameState) {
            case States.INIT:
                if (this.timeInitGame > 0) {
                    this.timeInitGame -= 1;
                } else {
                    this.gameState = States.GAME;
                }
                break;
            case States.GAME:
                this.initScene.makeHidden();
                // start game
                break;
            default:
                break;
        }
    }

}
