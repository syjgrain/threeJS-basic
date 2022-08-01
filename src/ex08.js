import * as THREE from 'three';
import gsap from 'gsap';

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
    scene.fog = new THREE.Fog('black', 3, 7);
    scene.background = new THREE.Color('black');

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
    const camera = new THREE.PerspectiveCamera(
        75, //top
        window.innerWidth / window.innerHeight, 
        0.1, //near
        1000 //far
    );
    camera.position.z = 5;
    camera.position.y = 1;
    scene.add(camera);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.z = 5;
    light.position.x = 1;
    light.position.y = 3;
    scene.add(light);

    //mesh

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0xff0000
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);


    //그리기

    let oldTime = Date.now();

    function draw(){
        //console.log(clock.getElapsedTime());
        
        //const time = clock.getElapsedTime();
        //getElapsedTime 성능이 다른 컴퓨터들도 애니메이션 속도가 같아짐

        const newTime = Date.now();
        const deltaTime = newTime - oldTime;
        oldTime = newTime;

        

        renderer.render(scene, camera);

        //requestAnimationFrame(draw);
        renderer.setAnimationLoop(draw);
    }
    
    //gsap
    gsap.to(
        mesh.position, 
        {
            duration: 1, 
            y: 2,
            z: 3,
        }
    );


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
    draw();
}