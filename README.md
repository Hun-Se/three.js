# three.js

## 배운점

1. Geometry

- 박스: `BoxGeometry(가로, 세로, 깊이, 분할 수)`
- 원판: `CircleGeometry(반지름, 원판분할 개수, 시작 각도, 연장 각도)`
- 원뿔: `ConeGeometry(밑면 원의 반지름, 원뿔의 높이, 원뿔 둘레의 방향에 대한 갯수, 원뿔의 높이 분할 개수, 원뿔 면을 열어 놓을지에 대한 판별=> true: 개방/false: 닫힘)`
- 원통: `CylinderGeometry(윗면 반지름, 밑면 반지름, 원통 높이, 둘레 방향 갯수, 높이 분할 개수, 윗면과 밑면 개방여보 -> true / false, 시작각, 연장각)`
- 구: `SphereGeometry(반지름, 수평 분할 개수, 수직 분할 개수, 수평 시작각, 수평 연장각, 수직 시작각, 수직 연장각 )`
- 링(2차원): `RingGeometry(내부 반지름, 외부 반지름, 가장자리 둘레 분할 개수, 둘레 내부 분할개수, 시작각, 연장각)`
- 사각형(2차원): `PlaneGeometry(너비 길이, 높이 길이, 너비 방향 분할 개수, 높이 방향 개수)`
- 링(3차원): `TorusGeometry(반지름, 원통의 반지름, 방사 방향 분할 수, 원통의 분할 수, 연장 각 길이)` => 시작값이 없다.

2. Mesh
   Mesh는 객체를 3D를 출력하는 클레스이며 Object 3D의 파생요소이다. 구성요소로 Geometry와 Material가 있다.

- Geometry: 형상, 형태 정의
- Material: 투명도, 색상 정의
- Object 3D
  - 파생클레스
  1. Mesh : 삼각형 면으로 구성된 객체
  2. Line : 선형객체
  3. Points : 점
  - 구성요소
  1. position: 위치
  2. rotation: 회전
  3. scale: 크기
