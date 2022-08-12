import * as THREE from './three.module.js';
import { DeviceOrientationControls } from './DeviceOrientationWithOrbit.js';
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';

//CONTROLS
let camera,controls,skydome;
let renderer;
let scene,skyBox;
let renderMaterials,sceneManager;
const mouse = new THREE.Vector2();

//Scene variables
let currentState = -1
let firstRoomScene, secondRoomScene, thirdRoomScene, introRoomScene
const startScenePos = 0;
var INTRO = 0
var SCENE1 = 1
var SCENE2 = 2
var SCENE3 = 3

//Arrow variables
let arrowUrl = "Assets/arrow_white.png"
let arrowMatScene1, arrowMatScene2, arrowMatScene3,arrowMatIntro;
let arrowScene1, arrowScene2, arrowScene3,arrowIntro;
const navArrowScale = new THREE.Vector3(4,2,4)
var arrowDist = 25
var arrowHeight = -12
//VIDEO VARIABLES
let bilboardVideo,bilboardVideoTex,videoMatBottleScene,VideoPlayBottleScene,Scene1Video,videoMeshBottleScene
var isAnimated =true;
document.getElementById('start-btn').addEventListener("click", function(e){
	init();
	animate();
	document.getElementById('start-btn').style.display = 'none';
});



function init() {
	
	// alert("PHONE");
    const container = document.getElementById( 'container_scene' );
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    scene = new THREE.Scene();
	introRoomScene = new THREE.Scene();
	firstRoomScene = new THREE.Scene();
	secondRoomScene = new THREE.Scene();
	thirdRoomScene = new THREE.Scene();
	Scene1Video = new THREE.Scene();
	scene.add(introRoomScene)
	scene.add(firstRoomScene)
	scene.add(secondRoomScene)
	scene.add(thirdRoomScene)
	scene.add(Scene1Video)
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 300 );
	
    //CREATED FOR RENDERING THE ENV MAP
	skydome = {
		scene: new THREE.Scene(),
		camera : new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 300 ),
	};
	

	//CONTORLS
	skydome.camera.position.z =0.0000000000001; //ADDED BC MAKE THE DIFFERENCE BETWEEN SKYDOME AND VIDEOS

	controls = new DeviceOrientationControls( skydome.camera, renderer.domElement );
	console.log(controls.minPolarAngle)
	
	sceneManager = new THREE.LoadingManager();
	sceneManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	
		console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

	};
	sceneStartFunc()
	//SCENE LOADERS AND LOAD THE DATA
	sceneManager.onLoad = function () {
		for ( let i = 0; i < 6; i ++ ) {
			new TWEEN.Tween(renderMaterials[i]).to( { opacity: 1 }, 500 ).start();
			runTween()
		}
		console.log( 'Loading complete!');
		if(currentState === INTRO){

			// controls.reset();
			skyBox.rotation.y = 0
			scene.rotation.y =0


			// firstRoomScene.add(arrowScene1)
			arrowScene1.position.set(1.5*arrowDist * Math.sin(toRadians(80)) , arrowHeight, -arrowDist *1.5* Math.cos(toRadians(0)));

			// secondRoomScene.add(arrowScene2)
			arrowScene2.position.set(1.8*arrowDist * Math.sin(toRadians(-45)) , arrowHeight, -arrowDist *1.5* Math.cos(toRadians(0)));

			// thirdRoomScene.add(arrowScene3)
			arrowScene3.position.set(1.8*arrowDist * Math.sin(toRadians(-80)) , arrowHeight, -arrowDist *1.5* Math.cos(toRadians(-80)));
		}
		else if(currentState === SCENE1){

			// controls.reset();
			skyBox.rotation.y = 0
			scene.rotation.y =0

			Scene1Video.add(VideoPlayBottleScene)
			VideoPlayBottleScene.position.set(-50,-5.8,-23.2);

			bilboardVideo.currentTime = 0;
			VideoPlayBottleScene.rotation.set(0,1.5,0)
			VideoPlayBottleScene.scale.set(1.68,1.77,1)
			bilboardVideo.play();

			introRoomScene.add(arrowIntro)
			arrowIntro.position.set(arrowDist * Math.sin(toRadians(-160)) , arrowHeight, -arrowDist * Math.cos(toRadians(-160)));
		}
		else if(currentState === SCENE2){
			// controls.reset();
			skyBox.rotation.y = 0
			scene.rotation.y =0

			introRoomScene.add(arrowIntro)
			arrowIntro.position.set(1.5*arrowDist * Math.sin(toRadians(160)) , arrowHeight, -arrowDist *1.5* Math.cos(toRadians(160)));
		}
		else if(currentState === SCENE3){
			// controls.reset();
			skyBox.rotation.y = 0
			scene.rotation.y =0

			introRoomScene.add(arrowIntro)
			arrowIntro.position.set(1.5*arrowDist * Math.sin(toRadians(-280)) , arrowHeight, -arrowDist *1.5* Math.cos(toRadians(-280)));
		}
	}
	
	//ARROWS MATERIAL, POSITION, TEXTURE
	var arrowTexture = new THREE.TextureLoader(sceneManager).load( arrowUrl );
	arrowMatScene1 = new THREE.SpriteMaterial( { map: arrowTexture ,color: 0xffffff ,rotation:0,transparent: true,opacity:1} );
	arrowScene1 = new THREE.Sprite( arrowMatScene1 );
	arrowScene1.scale.copy(navArrowScale)

	arrowMatScene2 = new THREE.SpriteMaterial( { map: arrowTexture ,color: 0xffffff ,rotation:0,transparent: true,opacity:1} );
	arrowScene2 = new THREE.Sprite( arrowMatScene2 );
	arrowScene2.scale.copy(navArrowScale)
	
	arrowMatScene3 = new THREE.SpriteMaterial( { map: arrowTexture ,color: 0xffffff ,rotation:0,transparent: true,opacity:1} );
	arrowScene3 = new THREE.Sprite( arrowMatScene3 );
	arrowScene3.scale.copy(navArrowScale)

	arrowMatIntro = new THREE.SpriteMaterial( { map: arrowTexture ,color: 0xffffff ,rotation:0,transparent: true,opacity:1} );
	arrowIntro = new THREE.Sprite( arrowMatIntro );
	arrowIntro.scale.copy(navArrowScale)

	videoMeshBottleScene = new THREE.PlaneGeometry( 9, 16);
	//VIDEOS
	// videoMeshBottleScene.lookAt(camera)
	bilboardVideo  = document.createElement('video');
	bilboardVideo.src = "./Assets/testVideo.mp4"; // Set video address
	bilboardVideo.playsInline = true;
	bilboardVideo.muted = true;
	bilboardVideo.loop = true;
	bilboardVideoTex = new THREE.VideoTexture(bilboardVideo)


	videoMatBottleScene = new THREE.MeshBasicMaterial( {map: bilboardVideoTex,opacity:1,side: THREE.DoubleSide} );
	VideoPlayBottleScene = new THREE.Mesh( videoMeshBottleScene, videoMatBottleScene );

    window.addEventListener( 'resize', onWindowResize );
	
	clickTrigger()
}
// ENV MAP TEXTURE LOADER 
function getTexturesFromAtlasFile( atlasImgUrl, tilesNum ) {
	const textures = [];
	for ( let i = 0; i < tilesNum; i ++ ) {
		textures[ i ] = new THREE.Texture();
	}
	new THREE.ImageLoader(sceneManager)
		.load( atlasImgUrl, ( image ) => {

			let canvas, context;
			const tileWidth = image.height;

			for ( let i = 0; i < textures.length; i ++ ) {
				canvas = document.createElement( 'canvas' );
				context = canvas.getContext( '2d' );
				canvas.height = tileWidth;
				canvas.width = tileWidth;
				context.drawImage( image, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
				textures[ i ].image = canvas;
				textures[ i ].needsUpdate = true;
			}
		} );
	return textures;
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}
window.addEventListener('DeviceOrientationControls', function(e) {
	var gammaRotation = e.gamma ? e.gamma * (Math.PI / 180) : 0;
	bottleGroup.rotation.y = gammaRotation;
  });
function animate() {
	var dirVector = new THREE.Vector3();
	camera.getWorldDirection(dirVector)
	// Range is 0 to Math.PI radians.
	// controls.minPolarAngle = 0; // radians
	// controls.maxPolarAngle = Math.PI; // radians

	// // How far you can orbit horizontally, upper and lower limits.
	// // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
	// controls.minAzimuthAngle = - Infinity; // radians
	// controls.maxAzimuthAngle = Infinity; // radians

    // PLS DO NOT EDIT
    requestAnimationFrame( animate );
	renderer.autoClear = true;
	controls.update();
	camera.quaternion.copy( skydome.camera.quaternion );
	renderer.render(skydome.scene, skydome.camera);
	renderer.autoClear = false;
	renderer.render(scene, camera );
	runTween()

	// console.log(skydome.camera.position)
}
function runTween(){
	requestAnimationFrame(runTween)
	TWEEN.update()
}

// ENV MAP APPLIED TO THE BOX MESH
function envLoad(textureUrl){
	const textures = getTexturesFromAtlasFile( textureUrl, 6 );
	renderMaterials = [];
	for ( let i = 0; i < 6; i ++ ) {
		renderMaterials.push( new THREE.MeshBasicMaterial( { map: textures[ i ] ,opacity: 0, transparent: true, depthWrite:false, depthTest :false} ) );
	}
	skyBox = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), renderMaterials );
	skyBox.geometry.scale( 1, 1, -1 );
	setTimeout(function(){
		for ( let i = 0; i < 6; i ++ ) {
			renderMaterials[i].transparent = true
		}
	}, 500);
	skydome.scene.add( skyBox );
	
}

function sceneStartFunc(){
	if(startScenePos == 0){
		currentState = INTRO
		envLoad("./CubeMap/scene2.jpg")
	}
}
//POSTIONING THE ARROW
function toRadians(degrees) {
	var pi = Math.PI;
	return degrees * (pi/180);
}
// CLICK FUNCTIONS PLAY VIDEO, CHANGE ROOM
function clickTrigger(){
	const raycaster = new THREE.Raycaster();
	console.log("clickTrigger is run");
	renderer.domElement.addEventListener("touchstart", event => {
		console.log("touch event registered");
		// })
		// document.addEventListener("click", event => {
		console.log(event);
		mouse.x = event.touches[0].pageX / window.innerWidth * 2 - 1;
		mouse.y = -(event.touches[0].pageY / window.innerHeight) * 2 +1 ;
		raycaster.setFromCamera( mouse, camera );
		console.log(mouse)

		var intersectFirstRoom = raycaster.intersectObjects( firstRoomScene.children, false );
		var intersectSecondRoom = raycaster.intersectObjects( secondRoomScene.children, false );
		var intersectThirdRoom = raycaster.intersectObjects( thirdRoomScene.children, false );
		var intersectIntroRoom = raycaster.intersectObjects( introRoomScene.children, false );
		// INTRO TO SCENE1 
		if ( intersectFirstRoom.length > 0 ) {
			setTimeout(function(){
				envLoad("./CubeMap/THINKER_CUBEMAP_0007.jpg")
				currentState = SCENE1

			}, 500)
			resetFunc()
		} else if ( intersectSecondRoom.length > 0 ) {
			setTimeout(function(){
				envLoad("./CubeMap/THINKER_CUBEMAP_0001.jpg")
				currentState = SCENE2

			}, 500)
			resetFunc()
		}else if ( intersectThirdRoom.length > 0 ) {
			setTimeout(function(){
				envLoad("./CubeMap/THINKER_CUBEMAP_0000.jpg")
				currentState = SCENE3

			}, 500)
			resetFunc()
		}else if ( intersectIntroRoom.length > 0 ) {
			setTimeout(function(){
				envLoad("./CubeMap/THINKER_CUBEMAP_0002.jpg")
				currentState = INTRO

			}, 500)
			resetFunc()
		}
		
	});
}
//RESET EVERYTHING ON THE SCENE
function resetFunc(){
	let ArrowArray = [arrowScene1,arrowScene2,arrowScene3,arrowIntro,VideoPlayBottleScene]
	let ArrowScene = [firstRoomScene,secondRoomScene,thirdRoomScene,introRoomScene,Scene1Video]
	setTimeout(function(){
		for (var i = 0; i < ArrowArray.length; i++) {
			ArrowScene[i].remove(ArrowArray[i]);
		}
	}, 200);
}
// document.getElementById('content').addEventListener("click", function(e){
// 	console.log("clicked")
	
// 	isAnimated = false
// 	// controls.enabled = false;
// 		new TWEEN.Tween(skydome.camera.rotation).to( { 
// 			x:0,
// 			z:0
// 			}, 400 )
// 			.onComplete(function () {
// 					new TWEEN.Tween(skydome.camera.rotation).to( { 
// 						y:1.4771640961978156
// 						}, 1500 )
// 						.onComplete(function () {
// 							new TWEEN.Tween(skydome.camera.position).to( { 
// 								x:9.956197042690752e-14,
// 								y: -9.05306954682891e-16,
// 								z:9.305614650809995e-15
// 								}, 10 )
								
// 								.onComplete(function () {
					
// 									skydome.camera.updateMatrix()
// 									controls.update();
// 									controls.enabled = true;
// 									// isAnimated = true
									
// 								})
// 								.start();
											
// 						})
// 						.start();
// 			})
// 			.start();
// 		// new TWEEN.Tween(skydome.camera.quaternion).to( { 
// 		// 	x:-0.2,
// 		// 	y:0,
// 		// 	z:0.2,
// 		// 	w:0.7071067811865476
// 		// 	}, 10 )
			
// 		// 	.onComplete(function () {
			
// 		// 		skydome.camera.updateMatrix()
			
// 		// 		// controls.applyRotation()
// 		// 		// controls.enabled = true;
// 		// 		isAnimated = true
				
// 		// 	})
// 		// 	.start();	
				
// });

