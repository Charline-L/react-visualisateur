import React from 'react';
import {AR} from 'expo';
import ExpoTHREE, {AR as ThreeAR, THREE} from 'expo-three';
import {View as GraphicsView} from 'expo-graphics';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';


import {SmoothLine} from '../objects/SmoothLine';

export default class ARScreen extends React.Component {

    static navigationOptions = {
        title: 'Visualisateur audio',
    };

    constructor(){
        super()

        this.nbLines = 80
        this.radius = 2

        this.center = new THREE.Vector3()

        // this.analyzer = new Analyser({
        //     nbLines: this.nbLines
        // })
    }

    componentDidMount() {

        THREE.suppressExpoWarnings(true);
        ThreeAR.suppressWarnings()
    }

    render() {

        return (

            <View style={styles.container}>

                <Text>chargement</Text>

                <GraphicsView
                    style={styles.threejs}
                    onContextCreate={this.onContextCreate}
                    onRender={this.onRender}
                    isArEnabled
                    isArRunningStateEnabled
                    isArCameraStateEnabled
                    arTrackingConfiguration={AR.TrackingConfigurations.World}
                />

            </View>
        );
    }

    onContextCreate = async ({gl, scale: pixelRatio, width, height}) => {

        this.setRenderer({gl, scale: pixelRatio, width, height})
        this.setScene()
        this.setCamera(width, height)
        this.setLight()

        this.createSphereToRaycast()
        this.createLines()

    };

    setRenderer({gl, scale: pixelRatio, width, height}){

        this.renderer = new ExpoTHREE.Renderer({
            gl,
            pixelRatio,
            width,
            height,
        });
    }

    setScene(){

        this.scene = new THREE.Scene();
        this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
    }

    setCamera(width, height){

        this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);
    }

    setLight(){

        this.scene.add(new THREE.AmbientLight(0xffffff));
    }

    createSphereToRaycast(){

        const geometry = new THREE.SphereBufferGeometry(this.radius, 30, 30);
        const material = new THREE.MeshBasicMaterial({color: 0x7777777, wireframe: true, visible: false})
        this.sphereToRaycast = new THREE.Mesh(geometry, material)

        this.scene.add(this.sphereToRaycast)

        this.sphereToRaycast.position.z = 2
    }

    createLines() {

        this.lines = []

        for (let i = 0; i < this.nbLines; i++) {

            this.lines.push(new SmoothLine({
                nb: i,
                scene: this.scene,
                sphereToRaycast: this.sphereToRaycast,
                radius: this.radius,
            }))
        }
    }


    onRender = () => {

        this.lines.forEach((line) => {

            if (!line.lineVisible) return null

            // const frequencyFirst = this.analyzer.frequencies ? App.getFrequency(this.analyzer.frequencies[0]) : 0
            // const frequencyMiddle = this.analyzer.frequencies ? App.getFrequency(this.analyzer.frequencies[50]) : 0

            line.update(0.02, 0.02)
        })

        this.renderer.render(this.scene, this.camera)
    }
}





const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    threejs: {
        zIndex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 1
    }
});