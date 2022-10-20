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
		// 박스: BoxGeometry(가로, 세로, 깊이) 각각에 대한 분할 수 (세그먼트 수)로 구분된다. 지정하지 않으면 기본값이 1

		// 원판: CircleGeometry(반지름, 원판분할갯수,시작 각도(), 연장각도)

		// 원뿔: ConeGeometry(밑면 원의 반지름 길이, 원뿔의 높이, 원뿔 둘레의 방향에대한 갯수,원뿔의 높이 방향에대한 분할 객수, 원뿔 인자를 열어 놓을지에 대한 판별 -> true: 개방 / false: 닫힌다, 시작각, 연장각)

		// 원통: CylinderGeometry(윗면 반지름,밑면 반지름, 원통 높이, 둘레 방향 갯수, 원통의 높이 분할 갯수, 윗면 밑면 개방여부-> true: 개방 / false: 닫힌다,시작각, 연장각 )

		// 구: SphereGeometry(반지름, 수평 분할갯수, 수직 분할갯수,수평 시작각,수평 연장각, 수직 시작각, 수직 연장각);

		// 링(2차원) : RingGeometry(내부 반지름, 외부 반지름, 가장자리 둘레 방향으로의 분할갯수, 둘레 내부 방향 분할갯수, 시작각, 연장각)

		// 평면 모양의 사각형(2차원) : PlaneGeometry(너비 길이, 높이 길이, 너비 뱡향 분할 수, 높이 방향 분할 수)

		// 링(3차원):TorusGeometry(반지름, 원통의 반지름, 방사 방향에 대한 분할 수, 원통의 분할 수, 연장 각 길이) -> 시작각이 없다는 특징이 있다.

		// 복잡한 구조의 링: TorusKnotGeometry(반지름, 구성 원통의 반지름, 분할수, 분할 수, 반복 횟수, 반복 횟수) -> 활용도 떨어진다.

		const geometry = new THREE.TorusKnotGeometry();
		const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
		const cube = new THREE.Mesh(geometry, fillMaterial);

		const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
		const line = new THREE.LineSegments(
			// 와이어프레임 형태로 지오메트리 표현
			new THREE.WireframeGeometry(geometry),
			lineMaterial
		);
		const group = new THREE.Group();
		group.add(cube);
		group.add(line);

		this._scene.add(group);
		this._cube = group;
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
		//this._cube.rotation.x = time;
		//this._cube.rotation.y = time;
	}
}

window.onload = function () {
	new App();
};
