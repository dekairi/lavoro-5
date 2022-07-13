import InitScene from './scenes/init.js';
import app from './config.js'
import { Constants } from './constants.js';
import GameScene from './scenes/game.js';
import WinScene from './scenes/win.js';

const States = {
    INIT: 0,
    GAME: 1,
    WIN: 2
}

export class GameManager {
    constructor() {
        this._initScene = null;
        this._gameScene = null;
        this._winScene = null;
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

        window.addEventListener("resize", function() {
            // TODO: make check if the scene is loaded fully
            app.renderer.resize(window.innerWidth, window.innerHeight);
            app.view.style.width = window.innerWidth + "px";
            app.view.style.height = window.innerHeight + "px";

            switch(this.gameState) {
                case States.INIT:
                    this._initScene.updateScreen();
                    break;
                case States.GAME:
                    this._gameScene.updateScreen();
                    break;
                case States.WIN:
                    this._winScene.updateScreen();
                    break;
                default:
                    break;
            }
        }.bind(this));

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
                    this._initScene.makeHidden();
                    this._gameScene = new GameScene(this);
                    const gameContainer = this._gameScene.getGameContainer();
                    this._gameScene.makeVisible();
                    app.stage.addChild(gameContainer);
                } else {
                    if(this._counterToWin === Constants.ITEMS_TO_FIND) {
                        this.gameState = States.WIN;
                    }
                }
                break;
            case States.WIN:
                if (!this._winScene) {
                    this._gameScene.makeHidden()
                    this._winScene = new WinScene();
                    const winContainer = this._winScene.getWinContainer();
                    this._winScene.makeVisible();
                    app.stage.addChild(winContainer);
                } else {
                    // TODO: return to init after some time
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
