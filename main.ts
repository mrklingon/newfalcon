namespace SpriteKind {
    export const bldg = SpriteKind.create()
    export const asteroid = SpriteKind.create()
    export const cont = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
    blast = sprites.createProjectileFromSprite(assets.image`laser`, MF, 90, 0)
    blast.setFlag(SpriteFlag.DestroyOnWall, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.asteroid, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    scene.cameraShake(4, 500)
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.cont, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite, effects.fire, 500)
    info.changeScoreBy(-10)
})
function StartFlight () {
    scene.setBackgroundColor(15)
    scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`screen1`)
    scroller.setLayerImage(scroller.BackgroundLayer.Layer1, assets.image`screen0`)
    scroller.scrollBackgroundWithSpeed(-50, 0, scroller.BackgroundLayer.Layer0)
    scroller.scrollBackgroundWithSpeed(-32, 0, scroller.BackgroundLayer.Layer1)
    MF = sprites.create(assets.image`falcon`, SpriteKind.Player)
    controller.moveSprite(MF)
    MF.setStayInScreen(true)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
    sprites.destroy(sprite, effects.fire, 500)
    sprites.destroy(otherSprite, effects.fire, 500)
    info.changeScoreBy(50)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.asteroid, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite, effects.fire, 500)
    info.changeScoreBy(10)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.cont, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.rings, 100)
    info.changeScoreBy(randint(5, 20))
})
let Tie: Sprite = null
let container: Sprite = null
let asteroid: Sprite = null
let MF: Sprite = null
let blast: Sprite = null
StartFlight()
game.splash("Pilot the Millenium Falcon", "Collect cargo, destroy asteroids!")
let lifeAdder = 1
let Ties = 0
info.setLife(3)
let rocks = [
assets.image`rock0`,
assets.image`rock1`,
assets.image`rock2`,
assets.image`rock3`
]
let cargo = [
assets.image`myImage0`,
assets.image`myImage1`,
assets.image`myImage2`,
assets.image`myImage3`
]
forever(function () {
    if (6 < randint(0, 10)) {
        asteroid = sprites.create(rocks._pickRandom(), SpriteKind.asteroid)
        asteroid.setPosition(160, randint(12, 95))
        asteroid.setFlag(SpriteFlag.DestroyOnWall, true)
        asteroid.setVelocity(randint(-10, -50), randint(-5, 5))
        pause(randint(1, 6) * 500)
    }
})
forever(function () {
    if (6 < randint(0, 10)) {
        container = sprites.create(cargo._pickRandom(), SpriteKind.cont)
        container.setPosition(160, randint(12, 95))
        container.setFlag(SpriteFlag.DestroyOnWall, true)
        container.setVelocity(randint(-10, -50), randint(-5, 5))
        pause(randint(1, 6) * 500)
    }
    if (lifeAdder * 200 <= info.score()) {
        Tie = sprites.create(assets.image`TieFighter`, SpriteKind.Enemy)
        Tie.setPosition(randint(120, 140), randint(20, 100))
        Tie.setVelocity(0, randint(20, 40))
        Tie.setBounceOnWall(true)
        lifeAdder += 1
        info.changeLifeBy(2)
    }
})
