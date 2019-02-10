import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native';

import {DangerZone} from 'expo';
const {Lottie} = DangerZone;

import Colors from '../constants/Colors';



export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: '🤔 Commment ça marche ?',
    };

    componentDidMount(){

        this.checkMultiPermissions()
        this.animation.play();
    }

    async checkMultiPermissions() {
        const { Permissions } = Expo;
        const { status } = await Permissions.askAsync(Permissions.CAMERA)

        if (status !== 'granted') {
            alert('Pour profiter au mieux de l\'app merci d\'autoriser l\'acces à la camera');
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>

                <Lottie
                    style={styles.logo}
                    ref={animation => {
                        this.animation = animation;
                    }}
                    source={require('../assets/lottie/logo.json')}
                />

                <Text style={styles.title}>
                    mon visualisateur audio
                </Text>


                <Text style={styles.text}>
                    Projet réalisé dans le cadre du cours de react native à l'ECV Digital.
                </Text>

                <Text style={styles.text}>
                    Le but de ce projet est de représenter en 3D les sons.
                </Text>

                <Text style={styles.text}>
                    L'idée est de proposer à l'utilisateur de choisir un son et en fonction de celui ci l'ambiance 3D va changer.
                </Text>

                <Text style={styles.textBold}>
                    ⚠️ À utiliser avec des écouteurs !
                </Text>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    logo: {
        marginTop: 50,
        height: 300,
    },

    title: {
        width: "50%",
        fontSize: 20,
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        color: Colors.yellow,
        fontFamily: 'poppin-semiBold',
        marginTop: -130,
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 100,
        // backgroundColor: Colors.blue
    },

    text: {
        width: "100%",
        fontSize: 14,
        marginTop: 30,
        textAlign: "left",
        color: Colors.black,
        fontFamily: 'poppin-light',
        paddingLeft: "15%",
        paddingRight: "15%",
    },

    textBold: {
        width: "100%",
        fontSize: 14,
        marginTop: 30,
        textAlign: "left",
        color: Colors.black,
        fontFamily: 'poppin-semiBold',
        paddingLeft: "15%",
        paddingRight: "15%",
    }
});
