const Screen = require( '@tmg-js-modules/screen' );
const Graphics = require('@tmg-js-modules/graphics');
const Mouse = require( '@tmg-js-modules/input-mouse' );
const Touch = require( '@tmg-js-modules/touch' );

window.addEventListener('load', function(){

    const ctx = canvas.getContext('2d');
    const overlayCtx = overlay.getContext('2d');

    // Main Game Class ----------------------------------------
    class Game {
        constructor(size){
            this.debug = false;
            this.resolution = {w: 1088, h: 640};
            this.size = size;
            this.timeStamp = 1;

            this.images = {};

            this.canvas_list = [
                {cx: ctx, ca: canvas}, 
            ];

            this.mouse = {
                pos:{x:0, y:0},
                size:{w:64, h:64},
                click:false,
            }

            this.objects = [];
        }

        init(){
            if (this.debug) console.log("Game Started");
        }

        update(deltaTime){
            // Update Objects
            this.objects.forEach(ob => ob.update(deltaTime));
        }

        draw(){

            // Graphics.Box(game.canvas_list[0].cx, {x: 0, y: 0}, {w: canvas.width, h: canvas.height}, 'Black', 1);

            // Show guide lines
            if ( game.debug ) {
                Graphics.Line_Guides(game.canvas_list[0].cx, 2, {x:2, y: 2}, { x: 64*3, y: 64*3 });
            }

            // Draw Objects
            this.objects.forEach(ob => ob.draw());

            // Draw Title Text
            Graphics.Text(this.canvas_list[0].cx, "Blank JS Project", 'center', 'Noto Sans', {x:canvas.width*0.5, y:canvas.height*0.5}, 40, 'Gold', 1);

            // Show Mouse Position
            if ( game.mouse.pos.x || game.mouse.pos.y ) {
                if ( game.mouse.click ) {
                    Graphics.Bevel_Outline(this.canvas_list[0].cx, this.mouse.pos, this.mouse.size, 'Red', 3, 1);
                } else {
                    Graphics.Bevel_Outline(this.canvas_list[0].cx, this.mouse.pos, this.mouse.size, 'Teal', 3, 1);
                }
            }
        }

        instance(_list, _ob, _pos, _size, _speed) {
            if (_ob !== null){
                _list.push(new _ob(this, _pos, _size, _speed));
                _list[_list.length-1].init();

                _list.sort(function(a,b){
                    return a.pos.y - b.pos.y;
                });
            }
        }

        remove_instance(_list, _ob){
            _list = _list.filter(_ob => !_ob.markedForDeletion)
        }

    }


    // Update loop ---------------------------------------
    const game = new Game( {w:canvas.width, h:canvas.height} );
    Screen.Init(game);
    game.init();

    Mouse.Mouse_Move(game, canvas);
    Mouse.Mouse_Leave(game);
    Mouse.Mouse_Down(game);
    Mouse.Mouse_Up(game);

    let lastTime = 1;
    function animate(timeStamp) {
        for (let i = 0; i < game.canvas_list.length; ++i) game.canvas_list[i].cx.clearRect(0,0,game.canvas_list[i].ca.width, game.canvas_list[i].ca.height);

        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    }
    animate();
});


