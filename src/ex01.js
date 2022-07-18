import * as THREE from 'three';


export default function example() {
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);


    //scene
    const scene = new THREE.Scene();

    //camera

    // const camera = new THREE.PerspectiveCamera(
    //     75, //시야각
    //     window.innerWidth / window.innerHeight, //종횡비
    //     0.1,
    //     1000
    // );

    // camera.position.x = 1;
    // camera.position.y = 2;
    // camera.position.z = 5;
    // scene.add(camera);
    const camera = new THREE.OrthographicCamera(
        -(window.innerWidth / window.innerHeight), //left
        window.innerWidth / window.innerHeight, //right
        1, //top
        -1, //bottom
        0.1, //near
        1000 //far
    );
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;
    camera.lookAt(0, 0, 0);
    camera.zoom = 0.5;
    camera.updateProjectionMatrix();
    scene.add(camera);

    //mesh

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //그리기
    renderer.render(scene, camera);
}