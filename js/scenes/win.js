import app from '../config.js';
import { Constants } from '../constants.js';

export default class WinScene {
    constructor() {
        this._winContainer = null;
        this._mainBackgroundSprite = null;
        this._overlayContainer = null;
        this._playNowButtonContainer = null;
        this._elementsContainer = null;
        this._characterSprite = null;
        this._textBottom = null;
        this._textBravo = null;
        this._logoSprite = null;
        this._loadScene();
    }

    _loadScene(){
        this._winContainer = new PIXI.Container();
        this._winContainer.width = app.screen.width;
        this._winContainer.height = app.screen.height;
        this._winContainer.x = app.screen.width / 2;
        this._winContainer.y = app.screen.height / 2;
        this._winContainer.pivot.set(app.screen.width / 2, app.screen.height / 2);

        this._mainBackgroundSprite = PIXI.Sprite.from('assets/back_five_dogs.jpg');
        this._mainBackgroundSprite.height = app.screen.height;
        this._mainBackgroundSprite.width = app.screen.height * 1075 / 767;
        this._mainBackgroundSprite.position.set(app.screen.width / 2, app.screen.height / 2);
        this._mainBackgroundSprite.anchor.set(0.5);
        this._winContainer.addChild(this._mainBackgroundSprite);
        this.makeHidden();


        this._overlayContainer = new PIXI.Graphics();
        this._overlayContainer.beginFill(0x000000, 0.8);
        this._overlayContainer.drawRoundedRect(app.screen.width / 2, app.screen.height / 2, app.screen.width, app.screen.height, 16);
        this._overlayContainer.pivot.set(this._overlayContainer.width / 2, this._overlayContainer.height / 2);
        this._overlayContainer.endFill();
        this._winContainer.addChild(this._overlayContainer);

        this._elementsContainer = new PIXI.Container();
        const style = new PIXI.TextStyle({
            fontFamily: 'Roboto',
            fontSize: 46,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: '#ffffff',
            wordWrap: true,
            wordWrapWidth: 400,
            lineJoin: 'round',
            align: 'center'
        });

        const styleBravo = new PIXI.TextStyle({
            fontFamily: 'Roboto',
            fontSize: 96,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: '#F0C257',
            wordWrap: true,
            wordWrapWidth: 450,
            lineJoin: 'round',
        });

        this._characterSprite = PIXI.Sprite.from('assets/char.png');
        this._characterSprite.anchor.set(0.5);
        this._characterSprite.height = app.screen.height / 1.5;
        this._characterSprite.width = Math.floor(this._characterSprite.height * 477 / 844); // saving proportions
        this._characterSprite.position.set(this._characterSprite.width / 2, this._characterSprite.height);
        this._elementsContainer.addChild(this._characterSprite);

        this._textBottom = new PIXI.Text('Can you solve every mystery?', style);
        this._textBottom.x = (app.screen.width / 2) - (this._textBottom.width / 2);
        this._textBottom.y = (app.screen.height / 2) + 10;
        this._elementsContainer.addChild(this._textBottom);

        this._textBravo = new PIXI.Text('Great Job', styleBravo);
        this._textBravo.x = (app.screen.width / 2) - (this._textBravo.width / 2);
        this._textBravo.y = (app.screen.height / 2) - (this._textBravo.height / 2) - 50;
        this._elementsContainer.addChild(this._textBravo);

        this._logoSprite = PIXI.Sprite.from('assets/logo.png');
        this._logoSprite.anchor.set(0.5);
        this._logoSprite.width = app.screen.width / 2.5;
        this._logoSprite.height = Math.floor(this._logoSprite.width * 285 / 518); // saving proportions
        this._logoSprite.position.set(app.screen.width / 2, this._logoSprite.height / 1.5);
        this._elementsContainer.addChild(this._logoSprite);

        this._winContainer.addChild(this._elementsContainer);

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
        this._winContainer.addChild(this._playNowButtonContainer);
    }

    getWinContainer() {
        return this._winContainer;
    }

    makeVisible() {
        this._winContainer.visible = true;
    }

    makeHidden() {
        this._winContainer.visible = false;
    }

    _onButtonPlayClick() {
        window.location = Constants.URL;
    }

    updateScreen() {
        this._winContainer.x = app.screen.width / 2;
        this._winContainer.y = app.screen.height / 2;
        this._winContainer.pivot.set(app.screen.width / 2, app.screen.height / 2);
        this._mainBackgroundSprite.height = app.screen.height;
        this._mainBackgroundSprite.position.set(app.screen.width / 2, app.screen.height / 2);

        this._overlayContainer.destroy();
        this._overlayContainer = new PIXI.Graphics();
        this._overlayContainer.beginFill(0x000000, 0.8);
        this._overlayContainer.drawRoundedRect(app.screen.width / 2, app.screen.height / 2, app.screen.width, app.screen.height, 16);
        this._overlayContainer.pivot.set(this._overlayContainer.width / 2, this._overlayContainer.height / 2);
        this._overlayContainer.endFill();
        this._winContainer.addChild(this._overlayContainer);

        this._characterSprite.height = app.screen.height / 1.5;
        this._characterSprite.width = Math.floor(this._characterSprite.height * 477 / 844); // saving proportions
        this._characterSprite.position.set(this._characterSprite.width / 2, this._characterSprite.height);

        this._textBottom.x = (app.screen.width / 2) - (this._textBottom.width / 2);
        this._textBottom.y = (app.screen.height / 2) + 10;

        this._textBravo.x = (app.screen.width / 2) - (this._textBravo.width / 2);
        this._textBravo.y = (app.screen.height / 2) - (this._textBravo.height / 2) - 50;

        this._logoSprite.width = app.screen.width / 2.5;
        this._logoSprite.height = Math.floor(this._logoSprite.width * 285 / 518); // saving proportions
        this._logoSprite.position.set(app.screen.width / 2, this._logoSprite.height / 1.5);

        this._winContainer.removeChild(this._elementsContainer);
        this._winContainer.addChild(this._elementsContainer);

        this._winContainer.removeChild(this._playNowButtonContainer);
        this._playNowButtonContainer.x = app.screen.width / 2;
        this._playNowButtonContainer.y = app.screen.height - 150;
        this._winContainer.addChild(this._playNowButtonContainer);
    }
}
