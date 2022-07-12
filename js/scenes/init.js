import app from '../config.js';
import { Constants } from '../constants.js';

export default class InitScene {
    constructor() {
        this._initContainer = null;
        this._loadScene();
    }

    _loadScene() {
        this._initContainer = new PIXI.Container();
        this._initContainer.width = app.screen.width;
        this._initContainer.height = app.screen.height;
        this._initContainer.x = app.screen.width / 2;
        this._initContainer.y = app.screen.height / 2;
        this._initContainer.pivot.set(app.screen.width / 2, app.screen.height / 2);

        const mainBackgroundSprite = PIXI.Sprite.from('../../assets/back_five_dogs.jpg');
        mainBackgroundSprite.position.set(app.screen.width / 2, app.screen.height / 2);
        mainBackgroundSprite.anchor.set(0.5);
        this._initContainer.addChild(mainBackgroundSprite);
        this.makeHidden();


        const overlayContainer = new PIXI.Graphics();
        overlayContainer.beginFill(0x000000, 0.8);
        overlayContainer.drawRoundedRect(app.screen.width / 2, app.screen.height / 2, app.screen.width, app.screen.height, 16);
        overlayContainer.pivot.set(overlayContainer.width / 2, overlayContainer.height / 2);
        overlayContainer.endFill();
        this._initContainer.addChild(overlayContainer);

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
        buttonText.position.set(playNowButtonContainer.width / 2, playNowButtonContainer.height / 2);
        playNowButtonContainer.addChild(buttonText);

        playNowButtonContainer.on('pointerdown', this._onButtonPlayClick.bind(this));
        this._initContainer.addChild(playNowButtonContainer);

        const rulesContainer = new PIXI.Container();
        const textStyle = new PIXI.TextStyle({
            fontFamily: 'Roboto',
            fontSize: 56,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: ['rgba(255, 255, 255, 0.7)'],
            lineJoin: 'round',
        });

        const text1 = new PIXI.Text('Can you spot them?', textStyle);
        text1.x = (app.screen.width / 2) - (text1.width / 2);
        text1.y = (app.screen.height / 2) - text1.height;
        rulesContainer.addChild(text1);

        const dogSprite = PIXI.Sprite.from('../../assets/doggy.png');
        dogSprite.anchor.set(0.5);
        dogSprite.scale.x *= -1;
        dogSprite.position.set((app.screen.width / 2) + (text1.width / 2), (text1.height * 2.5));
        rulesContainer.addChild(dogSprite);

        const text2 = new PIXI.Text('5 Hidden Dogs', textStyle);
        text2.x = (app.screen.width / 2) - (text2.width / 2) - dogSprite.width /2;
        text2.y = (app.screen.height / 2) - text2.height * 2.5;
        rulesContainer.addChild(text2);

        this._initContainer.addChild(rulesContainer);
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
}
