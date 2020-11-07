import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SceneComponent} from "./components/SceneComponent";
import {FreeCamera, HemisphericLight, MeshBuilder, ParticleSystem, Scene, Skeleton, Vector3} from "@babylonjs/core";
import { SceneLoader } from 'babylonjs'
//import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';


function App() {

    let box: any;
    let camera: any;

    // @ts-ignore
    const onSceneReady = scene => {
        // This creates and positions a free camera (non-mesh)
        camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());

        const canvas = scene.getEngine().getRenderingCanvas();

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'box' shape.
        box = MeshBuilder.CreateBox("box", {size: 2}, scene);

        // Move the box upward 1/2 its height
        box.position.y = 1;

        // Our built-in 'ground' shape.
        MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

        const dummy = SceneLoader.ImportMesh(
            "",
            "./",
            "cleaned.gltf",
            scene,
            (newMeshes, particleSystems, skeletons) => {
                let skeleton = skeletons[0];
                let hero = newMeshes[0];

                //Scale the model down
                hero.scaling.scaleInPlace(0.1);
                camera.target = hero
                const idleAnimation = scene.getAnimationGroupByName("idle");
                idleAnimation.start(true, 1.0, idleAnimation.from, idleAnimation.to, false);
            })

        SceneLoader.Append("./", "cleaned.gltf", scene, function (scene) {
            console.log(scene)
        });
    }

    /**
     * Will run on every frame render.  We are spinning the box on y-axis.
     */
    // @ts-ignore
    const onRender = scene => {
        if (box !== undefined) {
            var deltaTimeInMillis = scene.getEngine().getDeltaTime();
            const rpm = 10;
            box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 20));
        }
    }

    return (
        <div className="App">
            <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id='my-canvas' />
        </div>
    );
}

export default App;
