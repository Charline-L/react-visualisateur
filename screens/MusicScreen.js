import React, { Component } from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, WebView, Image} from 'react-native';


import Colors from '../constants/Colors';
import song from '../objects/Song'


export default class MusicScreen extends Component {

    static navigationOptions = {
        title: '🎶 Choisis ta musique',
    };

    constructor(){
        super()

        this.state = {
            songIndex: null,
            isLoadingSong: false,
            waitWebview: true,
        }

        this.tracks= [
            {
                name: "Track1",
                audio: null,
                image: "../images/songs/img1.png",
                imageSrc: require("../assets/images/songs/img1.png"),
                colors: []
            },
            {
                name: "Track2",
                audio: null,
                image: "../images/songs/img1.png",
                imageSrc: require("../assets/images/songs/img2.png"),
                colors: []
            },
            {
                name: "Track3",
                audio: null,
                image: "../images/songs/img3.png",
                imageSrc: require("../assets/images/songs/img3.png"),
                colors: []
            },
            {
                name: "Track4",
                audio: null,
                image: "../images/songs/img4.png",
                imageSrc: require("../assets/images/songs/img4.png"),
                colors: []
            }
        ]

        this.vibrant = require('../assets/views/vibrant.html')

        this.onMessage = this.onMessage.bind(this)
        this.loadEnd = this.loadEnd.bind(this)
    }


    componentDidMount(){

        this.loadTracks()
    }

    render() {


        if (this.state.waitWebview) {

            return(

                <View style={styles.loaderContainer}>

                    <Text>Chargement</Text>

                    <WebView
                        ref={(webview) => { this.webview = webview; }}
                        style={styles.webview}
                        onLoad={() => {}}
                        onMessage={this.onMessage}
                        onLoadEnd={this.loadEnd}
                        source={this.vibrant}/>

                </View>
            )
        }
        else {
            return (

                <ScrollView style={styles.container}>

                    <WebView
                        ref={(webview) => { this.webview = webview; }}
                        style={styles.webview}
                        onLoad={() => {}}
                        onMessage={this.onMessage}
                        onLoadEnd={this.loadEnd}
                        source={this.vibrant}/>

                    <View style={styles.containerBoxeTrack}>

                        {this.tracks.map((track, index) =>

                            <TouchableOpacity key={index} onPress={() => { this.selectSong(index) }} style={this.state.songIndex === index ? styles.boxeSelected: null}>
                                <Image source={track.imageSrc} style={styles.boxeImg} />
                                <Text style={styles.boxeTrack} >{track.name}</Text>
                            </TouchableOpacity>
                        )}

                    </View>

                </ScrollView>
            )
        }
    }

    loadTracks() {

        this.tracks.forEach( async (track, index) => {

            const soundObject = new Expo.Audio.Sound();

            try {

                switch (index) {

                    case 0 : {
                        await soundObject.loadAsync(require("../assets/audio/track1.mp3"))
                        this.tracks[index].audio = soundObject
                        break;
                    }
                    case 1 : {
                        await soundObject.loadAsync(require("../assets/audio/track2.mp3"))
                        this.tracks[index].audio = soundObject
                        break;
                    }
                    case 2 : {
                        await soundObject.loadAsync(require("../assets/audio/track3.mp3"))
                        this.tracks[index].audio = soundObject
                        break;
                    }
                    case 3 : {
                        await soundObject.loadAsync(require("../assets/audio/track4.mp3"))
                        this.tracks[index].audio = soundObject
                        break;
                    }
                }
            } catch (error) {

                console.log('error', error)
            }
        })
    }

    async selectSong(index){

        // renvoi si on est déjà entrain de cherche un son
        if (this.state.isLoadingSong) return null

        // change le statut de chargement
        this.setState({
            isLoadingSong: true
        })

        // arrête le son en cours
        if (this.state.songIndex) this.tracks[this.state.songIndex].audio.pauseAsync()

        // met à jour le son
        this.setState({
            songIndex: index
        })

        // récupère la palette de couleur
        this.webview.postMessage(this.tracks[index].image);
    }

    onMessage(data){

        // enregistre les couleurs
        this.tracks[this.state.songIndex].colors = MusicScreen.cleanColor(JSON.parse(data.nativeEvent.data))

        // lance le son
        this.tracks[this.state.songIndex].audio.playAsync()

        // met à jour le statut
        this.setState({
            isLoadingSong: false
        })

        // met à jour les valeurs du son sélectionné
        song.title = this.tracks[this.state.songIndex].name
        song.audio = this.tracks[this.state.songIndex].audio
        song.colors = this.tracks[this.state.songIndex].colors
    }


    loadEnd(){

        this.setState({
            waitWebview: false
        })
    }

    static cleanColor(colors){

        let arrayColors = []

        // parcours notre objet pour récupérer ses couleurs
        Object.keys(colors).map(function(key) {
            let value = colors[key]
            if (value) arrayColors.push(value._rgb)
        });

        return arrayColors
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        display: "flex",
    },

    loaderContainer: {
        flex: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    loader: {
        textAlign: "center",
        width: "100%",
        flex: 1,
        fontSize: 14,
        marginTop: 30,
        color: Colors.blue,
        fontFamily: 'poppin-semiBold',
        backgroundColor: "red",
    },

    webview: {
        width: 0,
        height: 0,
        zIndex: -1,
        position: "absolute",
    },

    containerBoxeTrack: {
        flex: 1,
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 30,
        paddingBottom: 30
    },

    boxeSelected: {
        borderWidth: 3,
        borderColor: Colors.blue,
        backgroundColor: Colors.yellow,
    },

    boxeImg: {
        width: 200,
        height: 200,
        marginTop: 50,
    },

    boxeTrack: {
        width: "100%",
        fontSize: 30,
        textAlign: "center",
        color: Colors.black,
        fontFamily: 'poppin-semiBold',
        marginTop: -20,
    },
});