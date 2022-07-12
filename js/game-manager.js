import InitScene from './scenes/init.js';
import app from './config.js'
import { Constants } from './constants.js';
import GameScene from './scenes/game.js';

const States = {
    INIT: 0,
    GAME: 1,
    WIN: 2
}

export class GameManager {
    constructor() {
        this._initScene = null;
        this._gameScene = null;
        this._state = null;
        this._timeInitGame = Constants.TIME_INIT_SCENE;
        this._counterToWin = 0;
        this._start();
    }

    _start() {
        const pixiCanvas = document.querySelector('#pixi-canvas');

        if (pixiCanvas) {
            pixiCanvas.appendChild(app.view);
            this.gameState = States.INIT;
        }

        this._state = this.update;
        app.ticker.add(delta => this.loop(delta));
    }

    loop(delta) {
        this._state(delta);
    }

    update() {
        switch(this.gameState) {
            case States.INIT:
                if(!this._initScene) {
                    this._initScene = new InitScene();
                    const initContainer = this._initScene.getInitContainer();
                    this._initScene.makeVisible();
                    app.stage.addChild(initContainer);
                } else {
                    if (this._timeInitGame > 0) {
                        this._timeInitGame -= 1;
                    } else {
                        this.gameState = States.GAME;
                    }
                }
                break;
            case States.GAME:
                if (!this._gameScene) {
                    this._gameScene = new GameScene(this);
                    const gameContainer = this._gameScene.getGameContainer();
                    this._initScene.makeHidden();
                    this._gameScene.makeVisible();
                    app.stage.addChild(gameContainer);
                } else {
                    if(this._counterToWin === Constants.ITEMS_TO_FIND) {
                        this.gameState = States.WIN;
                    }
                }
                break;
            case States.WIN:
                if (!this.winScene) {
                    this._gameScene.makeHidden();
                } else {

                }
                break;
            default:
                break;
        }
    }

    increaseCounter() {
        this._counterToWin++;
    }

}
