scene.setBackgroundColor(15)
scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`screen1`)
scroller.setLayerImage(scroller.BackgroundLayer.Layer1, assets.image`screen0`)
scroller.scrollBackgroundWithSpeed(-50, 0, scroller.BackgroundLayer.Layer0)
scroller.scrollBackgroundWithSpeed(-32, 0, scroller.BackgroundLayer.Layer1)
let MF = sprites.create(assets.image`falcon`, SpriteKind.Player)
controller.moveSprite(MF)
MF.setStayInScreen(true)
