import app from '../config.js';
import { Constants } from '../constants.js';

export default class InitScene {
    constructor() {
        this._backgroundContainer = null;
        this._preloadScene();
    }

    _preloadScene() {
        this._backgroundContainer = new PIXI.Container();
        this._backgroundContainer.width = app.screen.width;
        this._backgroundContainer.height = app.screen.height;
        this._backgroundContainer.x = app.screen.width / 2;
        this._backgroundContainer.y = app.screen.height / 2;
        this._backgroundContainer.pivot.set(app.screen.width / 2, app.screen.height / 2);

        const mainBackgroundSprite = PIXI.Sprite.from('../../assets/back_five_dogs.jpg');
        mainBackgroundSprite.position.set(app.screen.width / 2, app.screen.height / 2);
        mainBackgroundSprite.anchor.set(0.5);
        this._backgroundContainer.addChild(mainBackgroundSprite);


        const overlayContainer = new PIXI.Graphics();
        overlayContainer.beginFill(0x000000, 0.8);
        overlayContainer.drawRoundedRect(app.screen.width / 2, app.screen.height / 2, app.screen.width, app.screen.height, 16);
        overlayContainer.pivot.set(overlayContainer.width / 2, overlayContainer.height / 2);
        overlayContainer.endFill();
        this._backgroundContainer.addChild(overlayContainer);

        this.playNowButtonContainer = new PIXI.Container();
        this.playNowButtonContainer.width = 281;
        this.playNowButtonContainer.height = 113;
        this.playNowButtonContainer.x = app.screen.width / 2;
        this.playNowButtonContainer.y = app.screen.height - 150;

        this.buttonPlay = PIXI.Sprite.from('../../assets/btn.png');
        this.playNowButtonContainer.interactive = true;
        this.playNowButtonContainer.buttonMode = true;
        this.buttonPlay.anchor.set(0.5);
        this.playNowButtonContainer.addChild(this.buttonPlay);

        this.ButtonText = new PIXI.Text('Play Now!', {
            fontFamily: 'Roboto',
            fontSize: 32,
            fill: '#FCF0AA',
            stroke: 'black',
            strokeThickness: 4,
        });
        this.ButtonText.anchor.set(0.5);
        this.ButtonText.position.set(this.playNowButtonContainer.width / 2, this.playNowButtonContainer.height / 2);
        this.playNowButtonContainer.addChild(this.ButtonText);

        this.playNowButtonContainer.on('pointerdown', this.onButtonPlayClick.bind(this));
        this._backgroundContainer.addChild(this.playNowButtonContainer);

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

        this._backgroundContainer.addChild(rulesContainer);
    }

    getInitContainer() {
        return this._backgroundContainer;
    }

    makeVisible() {
        this._backgroundContainer.visible = true;
    }

    makeHidden() {
        this._backgroundContainer.visible = false;
    }

    onButtonPlayClick() {
        window.location = Constants.URL;
    }

}
