import * as THREE from 'three';

//브라우저 창 사이즈 변경에 대응하기

export default function example() {
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha:true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.setClearColor('#00ff00');
    renderer.setClearAlpha(0.5);

    //scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');

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


    function setSize(){
        //카메라
        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();
        //updateProjectionMatrix 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);

        
        // renderer.setClearAlpha(0.5);
    
    }

    //창사이즈 이벤트
    window.addEventListener('resize', setSize);
}