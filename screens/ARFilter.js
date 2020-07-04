import React from "react";
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo from 'expo';

export default class ARFilter extends React.Component {
    render() {
        return (
            <Expo.GLView
                style={{ flex: 1 }}
                onContextCreate={this._onGLContextCreate}
            />
        );
    }

    _onGLContextCreate = async (gl) => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000); const renderer = ExpoTHREE.createRenderer({ gl });
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
}
