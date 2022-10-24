import * as THREE from "../build/three.module.js";
// OrbitControls : 마우스를 이용하여 화면을 조작 할 수 있게 해주는 클레스
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

	_setupControls() {
		new OrbitControls(this._camera, this._divContainer);
	}

	_setupCamera() {
		// 3d 출력을 위한 가로와 세로의 영역
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
		camera.position.z = 7;
		this._camera = camera;
	}

	_setupLight() {
		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);
		this._scene.add(light);
	}

	//PointsMaterial
	// _setupModel() {
	// 	const vertices = [];
	// 	for (let i = 0; i < 10000; i++) {
	// 		// randFloatSpread 난수 -5 ~ 5 랜덤으로 출력
	// 		const x = THREE.MathUtils.randFloatSpread(5);
	// 		const y = THREE.MathUtils.randFloatSpread(5);
	// 		const z = THREE.MathUtils.randFloatSpread(5);

	// 		vertices.push(x, y, z);
	// 	}

	// 	const geometry = new THREE.BufferGeometry();
	// 	geometry.setAttribute(
	// 		"position",
	// 		new THREE.Float32BufferAttribute(vertices, 3)
	// 	);

	// 	const sprite = new THREE.TextureLoader().load(
	// 		"../examples/textures/sprites/disc.png"
	// 	);

	// 	const material = new THREE.PointsMaterial({
	// 		map: sprite,
	// 		// alphaTest보다 값이 낮으면 렌더링 되지 않는다. -> 점의 픽셀 크기보다 큰 배경영역을 렌더링하지 않기 떄문에 테두리를 잘라 버린 듯한 효과를 준다.
	// 		color: "#00ffff",
	// 		size: 0.1,
	// 		sizeAttenuation: true,
	// 	});

	// 	const points = new THREE.Points(geometry, material);
	// 	this._scene.add(points);
	// }

	// MeshBasicMaterial
	// _setupModel() {
	// 	const material = new THREE.MeshBasicMaterial({
	// 		// 메시가 보일지 안보일지
	// 		visible: true,
	// 		// 재질에대한 opacity 사용할건지 안사용할건지
	// 		transparent: true,
	// 		opacity: 0.5,
	// 		//depthTest는 렌더링되고있는 mesh의 픽셀 위치의 z값을 dp버퍼값을 이용하여 검사할지에 대한 여부
	// 		depthTest: true,
	// 		// 렌더링 되고 있는 mesh에 픽셀에 대한 z값을 dp버퍼에 기록할지에 대한 여부
	// 		depthWrite: true,
	// 		// 앞면만, 뒷면만, 앞면 뒷면 모두 렌더링 할것인지에 대한 여부 FrontSide,BackSide, DoubleSide
	// 		side: THREE.DoubleSide,

	// 		color: 0xffff00,
	// 		wireframe: false,
	// 	});

	// 	const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
	// 	box.position.set(-1, 0, 0);
	// 	this._scene.add(box);

	// 	const sphere = new THREE.Mesh(
	// 		new THREE.SphereGeometry(0.7, 32, 32),
	// 		material
	// 	);
	// 	sphere.position.set(1, 0, 0);
	// 	this._scene.add(sphere);
	// }

	// // MeshLamberMaterial
	// _setupModel() {
	// 	const material = new THREE.MeshLambertMaterial({
	// 		transport: true,
	// 		opacity: 0.5,
	// 		side: THREE.DoubleSide,
	// 		color: 0xff0000,
	// 		// 다른 광원에 영향을 받지않는 제질 자체에서 방출하는 색상 값(기본 값: 검쟁색)
	// 		emissive: 0x555500,
	// 		wireframe: true,
	// 	});

	// 	const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
	// 	box.position.set(-1, 0, 0);
	// 	this._scene.add(box);

	// 	const sphere = new THREE.Mesh(
	// 		new THREE.SphereGeometry(0.7, 32, 32),
	// 		material
	// 	);
	// 	sphere.position.set(1, 0, 0);
	// 	this._scene.add(sphere);
	// }

	// MeshPhongMaterial
	// _setupModel() {
	// 	const material = new THREE.MeshPhongMaterial({
	// 		// 광원에 의해서 반사되는 색상
	// 		specular: 0xffff00,
	// 		// 반사되는 정도
	// 		shininess: 10,
	// 		transport: true,
	// 		opacity: 0.5,
	// 		side: THREE.DoubleSide,
	// 		color: 0xff0000,
	// 		// 다른 광원에 영향을 받지않는 제질 자체에서 방출하는 색상 값(기본 값: 검쟁색)
	// 		emissive: 0x555500,
	// 		// Mesh를 구성하는 면을 평평하게 출력할것인지 여부
	// 		flatShading: false,
	// 		wireframe: false,
	// 	});

	// 	const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
	// 	box.position.set(-1, 0, 0);
	// 	this._scene.add(box);

	// 	const sphere = new THREE.Mesh(
	// 		new THREE.SphereGeometry(0.7, 32, 32),
	// 		material
	// 	);
	// 	sphere.position.set(1, 0, 0);
	// 	this._scene.add(sphere);
	// }

	// //MeshStandardMaterial
	// _setupModel() {
	// 	const material = new THREE.MeshStandardMaterial({
	// 		color: 0xff0000,
	// 		emissive: 0x000000,
	// 		//거친정도 0~1, 거칠어 질 수록 광원이 희미해진다.
	// 		roughness: 0.25,
	// 		// 금속성 0~1,roughness가 1이면 금속성을 나타내기 어렵다.
	// 		metalness: 0.6,
	// 		wireframe: false,
	// 		flatShading: false,
	// 	});

	// 	const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
	// 	box.position.set(-1, 0, 0);
	// 	this._scene.add(box);

	// 	const sphere = new THREE.Mesh(
	// 		new THREE.SphereGeometry(0.7, 32, 32),
	// 		material
	// 	);
	// 	sphere.position.set(1, 0, 0);
	// 	this._scene.add(sphere);
	// }

	//MeshPhysicalMaterial
	_setupModel() {
		const material = new THREE.MeshPhysicalMaterial({
			color: 0xff0000,
			emissive: 0x000000,
			//거친정도 0~1, 거칠어 질 수록 광원이 희미해진다.
			roughness: 1,
			// 금속성 0~1,roughness가 1이면 금속성을 나타내기 어렵다.
			metalness: 0,
			// 0~1, 코팅이 된 정도
			clearcoat: 1,
			// 코팅에 대한 거칠기 값, 0~1
			clearcoatRoughness: 0,
			wireframe: false,
			flatShading: false,
		});

		const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
		box.position.set(-1, 0, 0);
		this._scene.add(box);

		const sphere = new THREE.Mesh(
			new THREE.SphereGeometry(0.7, 32, 32),
			material
		);
		sphere.position.set(1, 0, 0);
		this._scene.add(sphere);
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
	}
}

window.onload = function () {
	new App();
};
