import {THREE} from "expo-three";
import {MeshLineMaterial, MeshLine} from '../objects/MeshLine';

import song from '../objects/Song'


export class SmoothLine {

    constructor(props) {

        this.nb = props.nb
        this.scene = props.scene
        this.sphereToRaycast = props.sphereToRaycast
        this.radius = props.radius

        this.colors = SmoothLine.generateColors()
        this.turbulence = 0.0

        this.points = []
        this.lineVisible = false

        this.isSlow = Math.random() < 0.75

        this.dash = 0

        this.init()
    }

    init() {

        this.setColor()
        this.setMaterial()
        this.raycastSphere()
        this.checkGeometry()
        this.buildMaterial()
        this.buildMesh()
        this.addScene()
    }

    setColor() {

        const colorIndex = Math.floor(Math.random() * this.colors.length)
        this.color = new THREE.Color(this.colors[colorIndex])
    }

    setMaterial() {

        this.width      = this.isSlow ? Math.random() * (0.1 - 0.01) + 0.01         :  0.01
        this.dashRatio  = this.isSlow ? Math.random() * (0.2 - 0.01) + 0.01         : Math.random() * (0.2 - 0.05) + 0.05
        this.decalage = Math.random() * (2 + 2) - 2
    }


    raycastSphere() {

        const origin = new THREE.Vector3()
        const direction = new THREE.Vector3()
        const raycaster = new THREE.Raycaster()

        const y = Math.random() * (this.radius * 1.8 - (-this.radius * 0.8)) + (-this.radius * 0.8)
        let a = 0
        const aMax = 3.3

        while (a < aMax) {

            a += 0.5

            origin.set(this.radius * Math.cos(a), y, this.radius * Math.sin(a))
            direction.set(-origin.x, 0, -origin.z)
            direction.normalize()
            raycaster.set(origin, direction)

            this.intersect = raycaster.intersectObject(this.sphereToRaycast, true)
            this.addPoints()
        }
    }

    addPoints(){

        if (!this.intersect.length) return null

        this.lineVisible = true

        this.points.push(new THREE.Vector3(
            this.intersect[0].point.x,
            this.intersect[0].point.y + (Math.random() * (this.turbulence * 2)) - this.turbulence,
            this.intersect[0].point.z + (Math.random() * (this.turbulence * 2)) - this.turbulence
        ))
    }

    checkGeometry() {

        if (this.points.length <= 1) this.lineVisible = false
        else this.buildGeometry()
    }

    buildGeometry() {

        const line = new MeshLine()
        const linePoints = new THREE.Geometry().setFromPoints(new THREE.CatmullRomCurve3(this.points).getPoints(50))

        line.setGeometry(linePoints)
        this.geometry = line.geometry
    }

    buildMaterial(){

        this.material = new MeshLineMaterial({
            transparent: true,
            lineWidth: this.width,
            color: this.color,
            opacity: 1,
            dashArray: 2,
            dashOffset: this.dash,
            dashRatio: 1 - (this.dashRatio * 0.5),
            depthTest: false
        })

        this.material.uniforms.dashOffset.value = this.decalage
    }

    buildMesh() {

        this.lineMesh = new THREE.Mesh(this.geometry, this.material)
        this.lineMeshMirror = new THREE.Mesh(this.geometry, this.material)
        this.lineMeshMirror.rotation.y = THREE.Math.degToRad( 180 )
    }

    addScene() {

        this.scene.add(this.lineMesh)
        this.scene.add(this.lineMeshMirror)
    }

    update(speedBig, speedThin) {

        this.material.uniforms.dashOffset.value -= this.isSlow ? speedBig : speedThin
    }

    static generateColors(){

        let arrayColors = []

        song.colors.forEach((color) => {

            arrayColors.push("rgb(" + color[0] + ", " + color[1] + "," + color[2] + ")")

        })

        return arrayColors
    }
}