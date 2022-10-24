# three.js

## 배운점

### Geometry

- 박스: `BoxGeometry(가로, 세로, 깊이, 분할 수)`
- 원판: `CircleGeometry(반지름, 원판분할 개수, 시작 각도, 연장 각도)`
- 원뿔: `ConeGeometry(밑면 원의 반지름, 원뿔의 높이, 원뿔 둘레의 방향에 대한 갯수, 원뿔의 높이 분할 개수, 원뿔 면을 열어 놓을지에 대한 판별=> true: 개방/false: 닫힘)`
- 원통: `CylinderGeometry(윗면 반지름, 밑면 반지름, 원통 높이, 둘레 방향 갯수, 높이 분할 개수, 윗면과 밑면 개방여보 -> true / false, 시작각, 연장각)`
- 구: `SphereGeometry(반지름, 수평 분할 개수, 수직 분할 개수, 수평 시작각, 수평 연장각, 수직 시작각, 수직 연장각 )`
- 링(2차원): `RingGeometry(내부 반지름, 외부 반지름, 가장자리 둘레 분할 개수, 둘레 내부 분할개수, 시작각, 연장각)`
- 사각형(2차원): `PlaneGeometry(너비 길이, 높이 길이, 너비 방향 분할 개수, 높이 방향 개수)`
- 링(3차원): `TorusGeometry(반지름, 원통의 반지름, 방사 방향 분할 수, 원통의 분할 수, 연장 각 길이)` => 시작값이 없다.

### Mesh

Mesh는 객체를 3D를 출력하는 클레스이며 Object 3D의 파생요소이다. 구성요소로 Geometry와 Material가 있다.

- Geometry: 형상, 형태 정의
- Material: 투명도, 색상 정의

- Object 3D의 파생 클레스:
  1. Mesh : 삼각형 면으로 구성된 객체
  2. Line : 선형객체
     - Line:
     - LineSegments: 좌표를 두개씩 짝지어서 선을 한개씩 렌더링
     - LineLoop: Line 과 동일한 방식으로 렌더링되다가 마지막 좌표와 시작점의 좌표를 연결한다.
  3. Points : 점
  - position: 위치
  - rotation: 회전
  - scale: 크기

### Material

1. PointMeaterial: 점의 재질을 설정

- `THREE.TextureLoader().load("이미지경로")` 이미지를 점으로 사용 할 수 있다.
- `alphaTest`: 점의 픽셀크기보다 큰 배경영역을 렌더링하지 않기 때문에 테두리를 잘라 버린 듯한 효과를 준다.

2. MeshBaiscMaterial: 기본적인 Material 설정

- `visible: true`: Mesh가 보일지 안보일지 여부를 설정(true/false)

- `transparent: true`: 재질에 대한 opacity를 사용할것인지에 대한 여부

- `opacity`: 투명도(0~1)

- `depthTest`: 렌더링되고있는 Mesh의 픽셀 위치의 z값을 dp버퍼값을 이용하여 검사할지에 대한 여부(true/false)

- `depthWrite`: 렌더링 되고 있는 Mesh에 픽셀에 대한 z값을 버퍼에 기록할지에 대한 여부(true/ false)

- `side: THREE.FrontSide`: 앞면, 뒷면, 앞뒷면 렌더링(앞면: FrontSide , 뒷면:BackSide, 양면: DoubleSide)

- `wireframe`: 도형의 선만 표현

3. MeshLamberMaterial

- `emissive`: 다른 광원에 영향을 받지않는 제질 자체에서 방출하는 색상값(기본값: 검정색)

4. MeshDepthMaterial

5. MeshPhongMaterial

- 광원에 의해 색이 반사되는 것을 나타낼 수 있다.
- `specular`: 광원에 반사되는 색상

- `shininess`: 반사되는 정도

- `flatShading`: Mesh를 구성하는 면을 평평하게 출력할 것인지에 대한 여부(true/ false)

` PBR(Physically Based Rendering)재질 : MeshStandardMaterial, MeshPhysicalMaterial => 3차원 재질에서 가장 많이 사용된다. 상대적으로 느리지만 고품질의 렌더링 결과를 얻을 수 있다.`

6. MeshStandardMaterial:

- 거친정도 표현 추가

- `roughness`: 거친 정도(0~1), 거칠어 질 수록 광원이 희미해진다.

- `metalness`: 금속성(0~1), roughness가 1이면 금속성을 나타내기 힘들다. 금속성이 높아질 수록 광원이 더 반사된다.

7. MeshPhysicalMaterial

- MeshStandardMaterial을 상속받은 보다 발전된 Material

- 코팅을 사용하여 단순 투명도 처리가 아닌 실제 유리같은 효과를 표현할수있다.

- `clearcoat: 1`: 코팅이 된 정도(0~1)

- `clearcoatRoughnes`: 코팅에 대한 거칠기 값, 0~1

8. LineBasicMaterial: 선의 색상만 변경 가능하다.

- LineDashedMaterial: 선의 길이를 참조하여 선의 재질을 변경

9. Depth Buffer

   - 깊이 버퍼, z 버퍼라고 한다. 3차원 객체를 카메라를 통해 좌표로 변환시켜 화면상에 렌더링 될 때 해당 3차원 객체를 구성하는 각 픽셀에 대한 z값과 좌표값을 0~1로 정규화한다. 이 정규화된 z값이 저장된 버퍼가 z 버퍼이다. 이 값이 작을수록 카메라에서 가까운 3차원 객체의 픽셀이다.

   - z 버퍼 값은 카메라부터의 거리에 비례한다. z 버퍼값이 작을수록 어두은 색상이 된다.

   - 주로 더 멀리 있는 3차원 객체가 가까운 3차원 객체를 덮어서 렌더링 되지 않도록 사용된다.
