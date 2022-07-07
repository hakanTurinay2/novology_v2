document.getElementById('scene-button-acne').addEventListener('click', function(e) {
	// document.getElementById('info-card').style.display="none"
    removeIntroScene()
})
document.getElementById('scene-button-pigmentation').addEventListener('click', function(e) {
	// currentState = PIGMENTATION
})
document.getElementById('scene-button-skin').addEventListener('click', function(e) {
	// currentState = SKIN
})
document.getElementById('intro-scene-step1-button').addEventListener('click', function(e) {
	// document.getElementById('info-card').style.display="none"
    document.getElementById('scene-intro-step-2').style.display = 'flex'
    document.getElementById('scene-intro-step-1').style.display = 'none'
    document.getElementById('scene-intro-step-1-button').style.display = 'none'
})
function removeIntroScene(){
    document.getElementById('info-card').style.display = 'none'
    document.getElementById('menu-button').style.display = 'none'
    document.getElementById('scene-idendifier').style.display = 'none'
    document.getElementById('black-screen').style.display = 'block'
    document.getElementById('scene-intro-step-1').style.display = 'flex'
    document.getElementById('novology-logo-img').src = 'Assets/scene-logo.png'
    document.getElementById('scene-intro-step-1-button').style.display = 'flex'
    
    document.body.style.background ="url(Assets/dummy-scene.png) no-repeat"
    document.body.style.backgroundAttachment = "fixed"
    document.body.style.backgroundPosition = "center"
    document.body.style.backgroundSize = "cover"
}