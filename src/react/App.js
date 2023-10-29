// App.js
import React, {useState} from 'react';
import * as THREE from 'three';
import Interactive3DViewer from './components/Interactive3DViewer';

function App() {
    const [points, setPoints] = useState([]);

    const loadData = () => {
        // Hardcoded set of 3D points
        const data = [
            new THREE.Vector3(1, 1, 1),
            new THREE.Vector3(2, 2, 2),
            new THREE.Vector3(3, 3, 3),
            new THREE.Vector3(4, 4, 4),
            new THREE.Vector3(5, 5, 5),
            new THREE.Vector3(6, 6, 6),
        ];
        setPoints(data);
    };

    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <button onClick={loadData} style={{position: 'absolute', zIndex: 1}}>
                Load Data
            </button>
            <Interactive3DViewer points={points}/>
        </div>
    );
}

export default App;
