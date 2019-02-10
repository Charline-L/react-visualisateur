import { Audio } from 'expo';

export class Analyser {
    constructor(props) {

        this.nbLines = props.nbLines

        this.$audio = document.getElementById("audio")

        window.addEventListener("load", this.init.bind(this), false)
    }

    init(){

        this.createAudio()
        this.appendPlayer()
        this.connectSource()
        this.update()
    }

    createAudio() {

        const path = "../assets/audio"

        this.audio = new Audio()
        this.audio.src = path + "/assets/track3.mp3"
        this.audio.controls = true
        this.audio.loop = true
        this.audio.autoplay = false
    }

    appendPlayer(){

        this.$audio.appendChild(this.audio)
        this.context = new AudioContext()
        this.analyser = this.context.createAnalyser()
    }

    connectSource(){

        this.source = this.context.createMediaElementSource(this.audio)
        this.source.connect(this.analyser)
        this.analyser.connect(this.context.destination)
    }

    update(){

        window.requestAnimationFrame(this.update.bind(this))

        let fbc_array = new Uint8Array(this.analyser.frequencyBinCount)

        this.analyser.getByteFrequencyData(fbc_array)

        this.frequencies = fbc_array
    }
}