import app from '../config.js';
import { Constants } from '../constants.js';

export default class GameScene {
    constructor(gameManager) {
        this._gameContainer = null;
        this._gameManager = gameManager;
        this._loadScene();
    }

    _loadScene() {
        this._gameContainer = new PIXI.Container();
        this._gameContainer.width = app.screen.width;
        this._gameContainer.height = app.screen.height;
        this._gameContainer.x = app.screen.width / 2;
        this._gameContainer.y = app.screen.height / 2;
        this._gameContainer.pivot.set(app.screen.width / 2, app.screen.height / 2);

        const mainBackgroundSprite = PIXI.Sprite.from('../../assets/back_five_dogs.jpg');
        mainBackgroundSprite.position.set(app.screen.width / 2, app.screen.height / 2);
        mainBackgroundSprite.anchor.set(0.5);
        this._gameContainer.addChild(mainBackgroundSprite);
        this.makeHidden();

        const gameAreaContainer = new PIXI.Container();
        let itemsToFind = [];

        for (let i = 0; i < Constants.ITEMS_TO_FIND; i++) {
            const itemContainer= new PIXI.Container();
            const itemSprite = PIXI.Sprite.from('../../assets/doggy.png');
            itemSprite.scale.x = itemSprite.scale.y = Math.min(100 / itemSprite.width, 100 / itemSprite.height);
            itemSprite.anchor.set(0.5);

            const circleAnimationArray = [
                PIXI.Texture.from('../../assets/circle_1.png'),
                PIXI.Texture.from('../../assets/circle_2.png'),
                PIXI.Texture.from('../../assets/circle_3.png'),
                PIXI.Texture.from('../../assets/circle_4.png'),
                PIXI.Texture.from('../../assets/circle_5.png'),
                PIXI.Texture.from('../../assets/circle_6.png'),
                PIXI.Texture.from('../../assets/circle_7.png'),
                PIXI.Texture.from('../../assets/circle_8.png')
            ];

            const animationSprite = new PIXI.AnimatedSprite(circleAnimationArray);
            animationSprite.anchor.set(0.5);
            animationSprite.animationSpeed = Constants.TIME_ANIMATION;
            animationSprite.loop = false;
            animationSprite.visible = false;

            itemContainer.addChild(itemSprite);
            itemContainer.addChild(animationSprite);
            itemContainer.x = Math.floor(Math.random() * (app.screen.width / 2 + 1));
            itemContainer.y = Math.floor(Math.random() * (app.screen.height / 2 + 1));

            const itemToFind = {
                isCheck: false,
                container: itemContainer,
                skin: itemSprite,
                animationSprite,
                animate() {
                    this.animationSprite.visible = true;
                    this.animationSprite.play();
                }
            }

            itemsToFind.push(itemToFind);
            gameAreaContainer.addChild(itemContainer);
        }

        gameAreaContainer.y = app.screen.height / 2.5;
        gameAreaContainer.x = app.screen.width / 2 - 100;
        gameAreaContainer.pivot.set(gameAreaContainer.width / 2, gameAreaContainer.height / 2);
        this._gameContainer.addChild(gameAreaContainer);

        const playNowButtonContainer = new PIXI.Container();
        playNowButtonContainer.width = 281;
        playNowButtonContainer.height = 113;
        playNowButtonContainer.x = app.screen.width / 2;
        playNowButtonContainer.y = app.screen.height - 150;

        const buttonPlay = PIXI.Sprite.from('../../assets/btn.png');
        playNowButtonContainer.interactive = true;
        playNowButtonContainer.buttonMode = true;
        buttonPlay.anchor.set(0.5);
        playNowButtonContainer.addChild(buttonPlay);

        const buttonText = new PIXI.Text('Play Now!', {
            fontFamily: 'Roboto',
            fontSize: 32,
            fill: '#FCF0AA',
            stroke: 'black',
            strokeThickness: 4,
        });
        buttonText.anchor.set(0.5);
        playNowButtonContainer.addChild(buttonText);

        playNowButtonContainer.on('pointerdown', this._onButtonPlayClick.bind(this));
        this._gameContainer.addChild(playNowButtonContainer);

        for (let i = 0; i < itemsToFind.length; i++) {
            itemsToFind[i].container.interactive = true;
            itemsToFind[i].container.buttonMode = true;
            itemsToFind[i].container.on('pointerdown', this._onItemClick.bind(this));
            itemsToFind[i].container.refItem = itemsToFind[i];
        }
    }

    _onItemClick(evt) {
        const item = evt.currentTarget;

        if (!item.refItem.isCheck) {
            item.refItem.animate();
            item.refItem.isCheck = true;
            window.setTimeout(function () {
                this._gameManager.increaseCounter();
            }.bind(this), (Constants.TIME_ANIMATION * 1000));
        }
    }

    _onButtonPlayClick() {
        window.location = Constants.URL;
    }

    getGameContainer() {
        return this._gameContainer;
    }

    makeVisible() {
        this._gameContainer.visible = true;
    }

    makeHidden() {
        this._gameContainer.visible = false;
    }
}
