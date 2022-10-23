import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js";

class App {
	constructor() {
		const divContainer = document.querySelector("#webgl-container");
		// 밑줄은 내부에서만 작동하는 메서드라는 암묵적인 의미
		this._divContainer = divContainer;

		// 랜더러를 생성 THREE 라이브러리에 WebGL1Renderer 클레스를 사용하고 속성값으로 antialias: true를 사용하면 3D 객체를 생성 할 때 경계선이 부드럽게 렌더링 된다.
		const renderer = new THREE.WebGLRenderer({ antialias: true });

		// PixelRatio 윈도우의 pixelRatio(배율) 값을 가져올 수 있다.
		renderer.setPixelRatio(window.devicePixelRatio);
		// 캔버스타입의 돔 객체를 추가
		divContainer.appendChild(renderer.domElement);
		this._renderer = renderer;

		// Scene 생성
		const scene = new THREE.Scene();
		this._scene = scene;

		this._setupCamera();
		this._setupLight();
		this._setupModel();
		this._setupControls();

		// bind를 사용하는 이유는 this가 가르키는 객체가 해당 app가 되기 위함
		// renderer의 크기를 창 크기에 맞게 적용된다.
		window.onresize = this.resize.bind(this);
		this.resize();

		requestAnimationFrame(this.render.bind(this));
	}

	//마우스로 컨트롤 할 수 있도록 해주는 클래스
	_setupControls() {
		// 카메라 객체와 돔 객체가 필요하다
		new OrbitControls(this._camera, this._divContainer);
	}

	_setupCamera() {
		// 3d 출력을 위한 가로와 세로의 영역
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
		camera.position.z = 25;
		this._camera = camera;
	}

	_setupLight() {
		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);
		this._scene.add(light);
	}

	_setupModel() {
		const solarSystem = new THREE.Object3D();
		this._scene.add(solarSystem);

		const radius = 1;
		const widthSegments = 12;
		const heightSegments = 12;
		const sphereGeometry = new THREE.SphereGeometry(
			radius,
			widthSegments,
			heightSegments
		);

		//sun
		const sunMaterial = new THREE.MeshPhongMaterial({
			emissive: 0xffff00,
			flatShading: true,
		});

		const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
		sunMesh.scale.set(3, 3, 3);
		solarSystem.add(sunMesh);

		// earth
		const earthOrbit = new THREE.Object3D();
		solarSystem.add(earthOrbit);

		const earthMaterial = new THREE.MeshPhongMaterial({
			color: 0x2233ff,
			emissive: 0x112244,
			flatShading: true,
		});

		const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
		// earthOrbit이 태양으로부터 x축으로 10만큼 이동하여 출력
		earthOrbit.position.x = 10;
		earthOrbit.add(earthMesh);

		// mooon
		const moonOrbit = new THREE.Object3D();
		moonOrbit.position.x = 2;
		earthOrbit.add(moonOrbit);

		const moonMaterial = new THREE.MeshPhongMaterial({
			color: 0x888888,
			emissive: 0x222222,
			flatShading: true,
		});

		const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
		moonMesh.scale.set(0.5, 0.5, 0.5);
		moonOrbit.add(moonMesh);

		this._solarSystem = solarSystem;
		this._earthOrbit = earthOrbit;
		this._moonOrbit = moonOrbit;
	}

	resize() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;

		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize(width, height);
	}

	render(time) {
		this._renderer.render(this._scene, this._camera);
		this.update(time);
		requestAnimationFrame(this.render.bind(this));
	}

	update(time) {
		time *= 0.001; // second
		this._solarSystem.rotation.y = time / 2;
		this._earthOrbit.rotation.y = time * 2;
		this._moonOrbit.rotation.y = time * 5;
		//this._cube.rotation.x = time;
		//this._cube.rotation.y = time;
	}
}

window.onload = function () {
	new App();
};
