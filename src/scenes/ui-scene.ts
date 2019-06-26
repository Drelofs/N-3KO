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
    private livesField 

    private timer : Phaser.Time.TimerEvent
    private hitTimeout = false

    constructor(key:string) {
        super(key)
    }


    create(): void {
        
        this.scoreField = this.add.text(200, 20, this.registry.values.scraps + ' SCRAPS COLLECTED', 
            { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#FFFFFF', 2)

            this.livesField = this.add.text(1340, 20, this.registry.values.lives + ' LIVES LEFT', 
            { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#FFFFFF', 2)
       
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this)
    }

    private setTimer() {
        this.hitTimeout = false
    }

    private hitEnemy(player: Player, enemy: enemy, ) {
        if(this.hitTimeout == false) {
            this.registry.values.lives--
            this.livesField.text = this.lives + ' Lives Left'
            this.hitTimeout = true
            this.timer = this.time.addEvent({
                delay: 2000,
                callback: () => this.setTimer(),
                repeat: 0,
            })
        }
    }

    update(){
       this.scoreField.text =  this.registry.values.scraps + ' SCRAPS COLLECTED'
        if(this.registry.values.scraps === 9){
            this.roboAnimal.collected = true,
            this.add.image(1150, 600, 'raTurtle').setOrigin(0, 0) ;
            } else if (this.registry.values.scraps === 12) {
                this.roboAnimal.collected = true, this.add.image(1150, 600, 'raGorilla').setOrigin(0, 0);
            } else if (this.registry.values.scraps === 18) {
                this.roboAnimal.collected = false, this.add.image(1150, 600, 'raFox').setOrigin(0, 0);
            } else if (this.registry.values.scraps === 23) {
                this.roboAnimal.collected = false, this.add.image(1150, 600, 'raHippo').setOrigin(0, 0);
            } else if (this.registry.values.scraps === 29) {
                this.roboAnimal.collected = false, this.add.image(1150, 600, 'raGiraffe').setOrigin(0, 0);
            } else if (this.registry.values.scraps === 35) {
                this.roboAnimal.collected = false, this.add.image(1150, 600, 'raElephant').setOrigin(0, 0);
            }
    //    this.livesField.text = 'Lives : ' + this.registry.values.lives
        this.livesField.text = this.registry.values.lives + ' LIVES LEFT'
    }


    
}