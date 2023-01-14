import BeatBeat from "./beat-beat.js"

const fn = async() => {
    const sound = new BeatBeat(new AudioContext(), "./song.mp3")
    await sound.load()
    sound.play(() => console.log("This callback will execute at every beat of the song"))
}
fn()