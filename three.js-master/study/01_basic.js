import * as THREE from "../build/three.module.js";

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

		// bind를 사용하는 이유는 this가 가르키는 객체가 해당 app가 되기 위함
		// renderer의 크기를 창 크기에 맞게 적용된다.
		window.onresize = this.resize.bind(this);
		this.resize();

		requestAnimationFrame(this.render.bind(this));
	}

	_setupCamera() {
		// 3d 출력을 위한 가로와 세로의 영역
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
		camera.position.z = 2;
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
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshPhongMaterial({ color: 0x44a88 });

		const cube = new THREE.Mesh(geometry, material);

		this._scene.add(cube);
		this._cube = cube;
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
		this._cube.rotation.x = time;
		this._cube.rotation.y = time;
	}
}

window.onload = function () {
	new App();
};
