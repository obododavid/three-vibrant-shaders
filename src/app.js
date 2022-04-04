import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import model from "./models/face/scene-processed.glb";
console.log(model, "the model");
let orbitControls = require("three-orbit-controls")(THREE);
export default class Sketch {
    constructor(options) {
        this.scene = new THREE.Scene();
        this.container = options.dom;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0xeeeeee, 1);
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        this.container.appendChild(this.renderer.domElement);
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000);

        this.controls = new orbitControls(this.camera, this.renderer.domElement);
        this.time = 0;

        this.camera.position.z = 1;

        this.addMesh();
        this.render();

        this.loader = new GLTFLoader();

        this.loader.load(model, (gltf) => {
            console.log(gltf);
            this.scene.add(gltf.scene);
            gltf.scene.traverse((o) => {
                if (o.isMesh) {
                    o.geometry.center();
                    o.scale.set(0.01, 0.01, 0.01);
                    o.material = this.material;
                    console.log(o);
                }
            });
        });
    }

    addMesh() {
        this.geometry = new THREE.PlaneBufferGeometry(0.5, 0.5);
        this.material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        // this.scene.add(this.mesh);
    }

    // stop() {
    //     this.isPlaying = false;
    // }

    // play(){
    //     if(!this.playing){
    //         this.render();
    //         this.isPlaying = true;
    //     }
    // }

    render() {
        this.time++;
        // if(!this.playing) return;
        // this.time += 0.05;
        // this.material.uniforms.time.value = this.time;
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render.bind(this));
    }
}

new Sketch({
    dom: document.getElementById("container")
});
