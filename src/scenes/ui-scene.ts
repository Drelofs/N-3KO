import { Player } from "../objects/player"
import { enemy } from "../objects/bomb"

export class UI extends Phaser.Scene {

    
    
    private player : Player
    private enemies: Phaser.GameObjects.Group

    private scoreField: Phaser.GameObjects.Text
    private roboAnimal = {
        collected: false
    }

    private lives = 2
    private livesField : Phaser.GameObjects.Text

    private timer : Phaser.Time.TimerEvent
    private hitTimeout = false


    
    constructor(key:string) {
        super(key)

    }


    create(): void {
        
        this.scoreField = this.add.text(200, 20, this.registry.values.scraps + ' SCRAPS COLLECTED', 
            { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#FFFFFF', 2)

        
        
       
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this)

        this.add.image(1150, 600, 'raElephant').setOrigin(0, 0);
        this.roboAnimal.collected = true;
        this.add.text(1150, 550, 'RoboElephant Collected!')
        this.livesField = this.add.text(1340, 20,  + this.lives+ ' LIVES LEFT', { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#FFFFFF', 2)

    }

    private setTimer() {
        this.hitTimeout = false
    }

    private hitEnemy(player: Player, enemy: enemy, ) {
        if(this.hitTimeout == false) {
            this.registry.values.lives--
            this.lives--
            this.livesField.text = this.lives + ' Lives Left'
            this.hitTimeout = true
            this.timer = this.time.addEvent({
                delay: 2000,
                callback: () => this.setTimer(),
                repeat: 0,
            })
            this.add.tween({
                targets: this.player,
                ease: 'Sine.easeInOut',
                duration: 200,
                alpha: 0.4,
                color: 0xff0000,
                yoyo:true,
                repeat:4
            })
        }
    }

    update(){
       this.scoreField.text =  this.registry.values.scraps + ' SCRAPS COLLECTED'
    //    this.livesField.text = 'Lives : ' + this.registry.values.lives
    }

    
}