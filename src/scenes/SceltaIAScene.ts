export default class SceltaIAScene extends Phaser.Scene {
    // Dichiarazione delle variabili private
    private frase0: Phaser.GameObjects.Image;
    private frase1: Phaser.GameObjects.Image;
    private icons: Phaser.GameObjects.Image[] = [];

    constructor() {
        super({ key: 'SceltaIAScene' });
    }

    preload() 
    {
        // Carica le immagini per frase0 e frase1
        this.load.image('frase0', 'assets/images/frase0.png');
        this.load.image('frase1', 'assets/images/frase1.png');

        // Carica altre risorse
        this.load.image('chatbot', 'assets/images/cahtbot.png');
        this.load.image('chatgpt', 'assets/images/chatgbt.png');
        this.load.image('claude', 'assets/images/claudeIA.png');
        this.load.image('copilot', 'assets/images/copilot.png');
        this.load.image('deepseek', 'assets/images/deepseek.png');
        this.load.image('gemini', 'assets/images/gemini.png');
        this.load.image('jesper', 'assets/images/jasperpng.png');
        this.load.image('perplexityai', 'assets/images/perplexityai.png');
        this.load.image('runway', 'assets/images/runway.png');
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000');

        // Inizializza frase0
        this.frase0 = this.add.image(
            this.cameras.main.width / 2, // Posizione X centrata
            80, // Posizione Y
            'frase0' // Nome dell'immagine caricata
        ).setOrigin(0.5).setDepth(3); // Centra l'immagine orizzontalmente

        // Inizializza frase1
        this.frase1 = this.add.image(
            this.cameras.main.width / 2, // Posizione X centrata
            130, // Posizione Y
            'frase1' // Nome dell'immagine caricata
        ).setOrigin(0.5).setDepth(3); // Centra l'immagine orizzontalmente

        const spacing = 250;

        const startX = this.cameras.main.centerX - (spacing * 1.5);
        const startY = 400; // Posizione sotto il secondo testo

        // Inizializza le icone
        this.icons = [
            this.add.image(startX, startY, 'chatbot').setInteractive().setDisplaySize(100, 100),
            this.add.image(startX + spacing, startY, 'chatgpt').setInteractive().setDisplaySize(100, 100),
            this.add.image(startX + spacing * 2, startY, 'claude').setInteractive().setDisplaySize(100, 100),
            this.add.image(startX + spacing * 3, startY, 'copilot').setInteractive().setDisplaySize(100, 100),
            this.add.image(startX, startY + spacing, 'deepseek').setInteractive().setDisplaySize(100, 100),
            this.add.image(startX + spacing, startY + spacing, 'gemini').setInteractive().setDisplaySize(100, 100),
            this.add.image(startX + spacing * 2, startY + spacing, 'jesper').setInteractive().setDisplaySize(100, 100),
            this.add.image(startX + spacing * 3, startY + spacing, 'runway').setInteractive().setDisplaySize(100, 100)
        ];

        // Add individual movement to each icon
        this.icons.forEach((icon, index) => {
            this.tweens.add({
            targets: icon,
            x: `+=${Phaser.Math.Between(30, 100)}`, // Random horizontal movement
            y: `+=${Phaser.Math.Between(30, 100)}`, // Random vertical movement
            yoyo: true, // Move back to the original position
            repeat: -1, // Repeat indefinitely
            duration: Phaser.Math.Between(800, 1500), // Random duration for each icon
            ease: 'Sine.easeInOut' // Smooth easing
            });

            // Make icons clickable
            icon.on('pointerdown', () => {
                console.log(`Icon ${index} clicked!`);
                this.cameras.main.fadeOut(1000, 0, 0, 0); // Fade out effect (1 second duration)

                this.cameras.main.on('camerafadeoutcomplete', () => {
                    this.scene.start('casino');
                }); 
            });
        });

    }

    update(time: number, delta: number) {
        // Puoi accedere a this.frase0, this.frase1 e this.icons qui
    }
}