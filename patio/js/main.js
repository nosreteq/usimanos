(function () {
  //-------- ----------
  // SCENE, CAMERA, RENDERER
  //-------- ----------

  const ww = 800;
  const hh = 550;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  const camera = new THREE.PerspectiveCamera(80, ww / hh, 0.05, 1000);
  camera.position.set(30, 15, 25);
  camera.lookAt(0, -5, 0);
  scene.add(camera);
  const renderer = new THREE.WebGL1Renderer();
  renderer.setSize(ww, hh, false);
  (document.getElementById("demo") || document.body).appendChild(
    renderer.domElement
  );
  //-------- ----------
  // CUBE STACK GRID
  //-------- ----------
  const dl = new THREE.DirectionalLight(0xffffff, 1.1);
  dl.position.set(3, 4, 1);
  scene.add(dl);
  //-------- ----------
  // CUBE STACK GRID
  //-------- ----------
  const soPalette = [
    {
      boxCount: 10,
    //   colors: [
    //     [0, 1, 0, [64, 255]],
    //     [0, 1, 1, [64, 255]],
    //   ],
    //   planeColor: 1,
    },
    { boxCount: 10 },
    { boxCount: 10 },
    {
      boxCount: 10,
    //   colors: [
    //     [1, 0, 0, [64, 255]],
    //     [1, 1, 0, [64, 255]],
    //   ],
    },
    {
      boxCount: 10,
    //   colors: [
    //     [1, 0, 0, [64, 255]],
    //     [1, 1, 0, [64, 255]],
    //   ],
    },
  ];
  const sopArray = [
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1,
    2, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 1, 0, 0, 1, 2, 3, 2, 1, 0, 0, 1, 1, 1, 0,
    2, 2, 2, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 2, 1, 0, 0, 0, 0, 1, 1, 1, 2, 1,
    1, 1, 0, 0, 0, 1, 1, 2, 2, 2, 1, 1, 0, 0, 0, 1, 1, 2, 3, 2, 1, 1, 0, 0, 0,
  ];
  const csg = CubeStackGrid.create({
    gw: 10,
    gh: 10,
    stackGW: 3,
    stackGH: 3,
    stackOptionPalette: soPalette,
    sopArray: sopArray,
  });
  scene.add(csg);
  //-------- ----------
  // ANIMATION LOOP
  //-------- ----------
  if (THREE.OrbitControls) {
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
  }
  let frame = 0,
    lt = new Date();
  const maxFrame = 300;
  const loop = function () {
    const now = new Date(),
      secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / 32) {
      // draw
      renderer.render(scene, camera);
      frame += 20 * secs;
      frame %= maxFrame;
      lt = now;
    }
  };
  loop();
})();
