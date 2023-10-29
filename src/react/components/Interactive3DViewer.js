import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {colorSpaceToLinear} from "three/nodes";

const Interactive3DViewer = ({ points }) => {
    const containerRef = useRef(null);
    const cameraRef = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000));
    const controlsRef = useRef(null);
    const sceneRef = useRef(new THREE.Scene());
    const gridRef = useRef(null);

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        const initialGrid = new THREE.GridHelper(100, 20);
        sceneRef.current.add(initialGrid);
        gridRef.current = initialGrid;

        controlsRef.current = new OrbitControls(cameraRef.current, renderer.domElement);
        controlsRef.current.enableZoom = true;
        controlsRef.current.zoomSpeed = 0.5;
        controlsRef.current.addEventListener('change', handleZoomChange);

        cameraRef.current.position.z = 5;
        cameraRef.current.position.y = 5;
        cameraRef.current.lookAt(0, 0, 0);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(sceneRef.current, cameraRef.current);
        };

        animate();

        return () => {
            controlsRef.current.removeEventListener('change', handleZoomChange);
            renderer.dispose();
        };
    }, []);

    const handleZoomChange = () => {
        console.log('Zoom changed');
        const distance = controlsRef.current.target.distanceTo(cameraRef.current.position);

        // Example logic: Adjust grid size and divisions based on the camera's distance
        let gridSize = 100 * Math.ceil(distance / 10);
        gridSize = Math.min(gridSize, 2000);  // Set a max value, for instance 2000 units
        let gridDivisions = 20 * Math.ceil(distance / 10);
        gridDivisions = Math.min(gridDivisions, 200);  // Set a max value for divisions, say 200

        console.log(gridSize, gridDivisions);

        if (gridRef.current) {
            sceneRef.current.remove(gridRef.current);
        }

        const newGrid = new THREE.GridHelper(gridSize, gridDivisions);
        sceneRef.current.add(newGrid);
        gridRef.current = newGrid;
    };

    useEffect(() => {
        if (points && points.length) {
            const existingPoints = sceneRef.current.getObjectByName('points');
            if (existingPoints) {
                sceneRef.current.remove(existingPoints);
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.PointsMaterial({ color: 0xff0000, size: 0.1 });
            const pointsObj = new THREE.Points(geometry, material);
            pointsObj.name = 'points';

            sceneRef.current.add(pointsObj);
        }
    }, [points]);

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default Interactive3DViewer;
