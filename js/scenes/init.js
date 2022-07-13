import app from '../config.js';
import { Constants } from '../constants.js';

export default class InitScene {
    constructor() {
        this._initContainer = null;
        this._mainBackgroundSprite = null;
        this._playNowButtonContainer = null;
        this._overlayContainer = null;
        this._rulesContainer = null;
        this._text1 = null;
        this._text2 = null;
        this._dogSprite = null;
        this._loadScene();
    }

    _loadScene() {
        this._initContainer = new PIXI.Container();
        this._initContainer.width = app.screen.width;
        this._initContainer.height = app.screen.height;
        this._initContainer.x = app.screen.width / 2;
        this._initContainer.y = app.screen.height / 2;
        this._initContainer.pivot.set(app.screen.width / 2, app.screen.height / 2);

        this._mainBackgroundSprite = PIXI.Sprite.from('assets/back_five_dogs.jpg');
        this._mainBackgroundSprite.height = app.screen.height;
        this._mainBackgroundSprite.width = app.screen.height * 1075 / 767;
        this._mainBackgroundSprite.position.set(app.screen.width / 2, app.screen.height / 2);
        this._mainBackgroundSprite.anchor.set(0.5);
        this._initContainer.addChild(this._mainBackgroundSprite);
        this.makeHidden();


        this._overlayContainer = new PIXI.Graphics();
        this._overlayContainer.beginFill(0x000000, 0.8);
        this._overlayContainer.drawRoundedRect(app.screen.width / 2, app.screen.height / 2, app.screen.width, app.screen.height, 16);
        this._overlayContainer.pivot.set(this._overlayContainer.width / 2, this._overlayContainer.height / 2);
        this._overlayContainer.endFill();
        this._initContainer.addChild(this._overlayContainer);

        this._playNowButtonContainer = new PIXI.Container();
        this._playNowButtonContainer.width = 281;
        this._playNowButtonContainer.height = 113;
        this._playNowButtonContainer.x = app.screen.width / 2;
        this._playNowButtonContainer.y = app.screen.height - 150;

        const buttonPlay = PIXI.Sprite.from('assets/btn.png');
        this._playNowButtonContainer.interactive = true;
        this._playNowButtonContainer.buttonMode = true;
        buttonPlay.anchor.set(0.5);
        this._playNowButtonContainer.addChild(buttonPlay);

        const buttonText = new PIXI.Text('Play Now!', {
            fontFamily: 'Roboto',
            fontSize: 32,
            fill: '#FCF0AA',
            stroke: 'black',
            strokeThickness: 4,
        });
        buttonText.anchor.set(0.5);
        this._playNowButtonContainer.addChild(buttonText);

        this._playNowButtonContainer.on('pointerdown', this._onButtonPlayClick.bind(this));
        this._initContainer.addChild(this._playNowButtonContainer);

        this._rulesContainer = new PIXI.Container();
        const textStyle = new PIXI.TextStyle({
            fontFamily: 'Roboto',
            fontSize: 56,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: ['rgba(255, 255, 255, 0.7)'],
            lineJoin: 'round',
        });

        this._text1 = new PIXI.Text('Can you spot them?', textStyle);
        this._text1.x = (app.screen.width / 2) - (this._text1.width / 2);
        this._text1.y = (app.screen.height / 2) - this._text1.height;
        this._rulesContainer.addChild(this._text1);

        this._text2 = new PIXI.Text('5 Hidden Dogs', textStyle);
        this._text2.anchor.set(0.5);
        this._text2.x = (app.screen.width / 2);
        this._text2.y = (app.screen.height / 2) - this._text2.height * 2.5;
        this._rulesContainer.addChild(this._text2);

        this._dogSprite = PIXI.Sprite.from('assets/doggy.png');
        this._dogSprite.anchor.set(0.5);
        this._dogSprite.scale.x *= -1;
        this._dogSprite.position.set((app.screen.width / 2) + (this._text1.width / 2), (app.screen.height / 2) - this._text2.height * 2.5);
        this._rulesContainer.addChild(this._dogSprite);

        this._initContainer.addChild(this._rulesContainer);
    }

    _onButtonPlayClick() {
        window.location = Constants.URL;
    }

    getInitContainer() {
        return this._initContainer;
    }

    makeVisible() {
        this._initContainer.visible = true;
    }

    makeHidden() {
        this._initContainer.visible = false;
    }

    updateScreen() {
        this._initContainer.x = app.screen.width / 2;
        this._initContainer.y = app.screen.height / 2;
        this._initContainer.pivot.set(app.screen.width / 2, app.screen.height / 2);
        this._mainBackgroundSprite.height = app.screen.height;
        this._mainBackgroundSprite.position.set(app.screen.width / 2, app.screen.height / 2);

        this._overlayContainer.destroy();
        this._overlayContainer = new PIXI.Graphics();
        this._overlayContainer.beginFill(0x000000, 0.8);
        this._overlayContainer.drawRoundedRect(app.screen.width / 2, app.screen.height / 2, app.screen.width, app.screen.height, 16);
        this._overlayContainer.pivot.set(this._overlayContainer.width / 2, this._overlayContainer.height / 2);
        this._overlayContainer.endFill();
        this._initContainer.addChild(this._overlayContainer);

        this._initContainer.removeChild(this._playNowButtonContainer);
        this._playNowButtonContainer.x = app.screen.width / 2;
        this._playNowButtonContainer.y = app.screen.height - 150;
        this._initContainer.addChild(this._playNowButtonContainer);

        this._text1.x = (app.screen.width / 2) - (this._text1.width / 2);
        this._text1.y = (app.screen.height / 2) - this._text1.height;

        this._text2.x = (app.screen.width / 2);
        this._text2.y = (app.screen.height / 2) - this._text2.height * 2.5;

        this._dogSprite.position.set((app.screen.width / 2) + (this._text1.width / 2), (app.screen.height / 2) - this._text2.height * 2.5);

        this._initContainer.removeChild(this._rulesContainer);
        this._initContainer.addChild(this._rulesContainer);
    }
}
