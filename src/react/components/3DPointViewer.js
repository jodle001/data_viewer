// ThreeDPointViewer.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeDPointViewer = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Set up the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Create a 3D point (using a small sphere to represent it)
        const geometry = new THREE.SphereGeometry(0.1);  // radius of 0.1
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // red color
        const sphere = new THREE.Mesh(geometry, material);

        // Set the position of the sphere to where you want your 3D point to be
        sphere.position.set(0, 0, 0);  // example position
        scene.add(sphere);

        // Position the camera
        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        // Clean up on unmount
        return () => {
            renderer.dispose();
            material.dispose();
            geometry.dispose();
        };

    }, [containerRef]);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>
    );
};

export default ThreeDPointViewer;
