import app from '../config.js';
import { Constants } from '../constants.js';

export default class WinScene {
    constructor() {
        this._winContainer = null;
        this._loadScene();
    }

    _loadScene(){
        this._winContainer = new PIXI.Container();
        this._winContainer.width = app.screen.width;
        this._winContainer.height = app.screen.height;
        this._winContainer.x = app.screen.width / 2;
        this._winContainer.y = app.screen.height / 2;
        this._winContainer.pivot.set(app.screen.width / 2, app.screen.height / 2);

        const mainBackgroundSprite = PIXI.Sprite.from('../../assets/back_five_dogs.jpg');
        mainBackgroundSprite.position.set(app.screen.width / 2, app.screen.height / 2);
        mainBackgroundSprite.anchor.set(0.5);
        this._winContainer.addChild(mainBackgroundSprite);
        this.makeHidden();


        const overlayContainer = new PIXI.Graphics();
        overlayContainer.beginFill(0x000000, 0.8);
        overlayContainer.drawRoundedRect(app.screen.width / 2, app.screen.height / 2, app.screen.width, app.screen.height, 16);
        overlayContainer.pivot.set(overlayContainer.width / 2, overlayContainer.height / 2);
        overlayContainer.endFill();
        this._winContainer.addChild(overlayContainer);

        const elementsContainer = new PIXI.Container();
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

        const characterSprite = PIXI.Sprite.from('../../assets/char.png');
        characterSprite.anchor.set(0.5);
        characterSprite.height = app.screen.height / 1.5;
        characterSprite.width = characterSprite.height * 477 / 844; // saving proportions
        characterSprite.position.set(characterSprite.width / 2, characterSprite.height);
        elementsContainer.addChild(characterSprite);

        const textBottom = new PIXI.Text('Can you solve every mystery?', style);
        textBottom.x = (app.screen.width / 2) - (textBottom.width / 2);
        textBottom.y = (app.screen.height / 2) + 10;
        elementsContainer.addChild(textBottom);

        const textBravo = new PIXI.Text('Great Job', styleBravo);
        textBravo.x = (app.screen.width / 2) - (textBravo.width / 2);
        textBravo.y = (app.screen.height / 2) - (textBravo.height / 2) - 50;
        elementsContainer.addChild(textBravo);

        const logoSprite = PIXI.Sprite.from('../../assets/logo.png');
        logoSprite.anchor.set(0.5);
        logoSprite.width = app.screen.width / 3;
        logoSprite.height = logoSprite.width * 285 / 518; // saving proportions
        logoSprite.position.set(app.screen.width / 2, logoSprite.height / 1.5);
        elementsContainer.addChild(logoSprite);

        this._winContainer.addChild(elementsContainer);

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
        this._winContainer.addChild(playNowButtonContainer);
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
}
