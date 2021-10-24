(() => {
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/@tmg-js-modules/screen/index.js
  var require_screen = __commonJS({
    "node_modules/@tmg-js-modules/screen/index.js"(exports, module) {
      var Init = function(main) {
        if (main.debug)
          console.log("Screen Manager Loaded");
        for (let i = 0; i < main.canvas_list.length; ++i) {
          main.canvas_list[i].ca.width = main.resolution.w;
          main.canvas_list[i].ca.height = main.resolution.h;
          Resize(main, main.canvas_list[i].cx, main.canvas_list[i].ca);
        }
        window.addEventListener("resize", function(e) {
          for (let i = 0; i < main.canvas_list.length; ++i) {
            Resize(main, main.canvas_list[i].cx, main.canvas_list[i].ca);
          }
        });
      };
      var Resize = function(main, _ctx, _canvas) {
        const border = 50;
        const aspect = { w: 6.5, h: 4 };
        const img_smooth = true;
        let w = window.innerWidth;
        let h = w * (aspect.h / aspect.w);
        if (h < window.innerHeight) {
          w = window.innerWidth;
          h = w * (aspect.h / aspect.w);
        } else {
          h = window.innerHeight;
          w = h * (aspect.w / aspect.h);
        }
        if (main.debug)
          console.log("Resized", "W", Math.floor(w), "H", Math.floor(h));
        _canvas.style.width = `${w - border}px`;
        _canvas.style.height = `${h - border}px`;
        _ctx.mozImageSmoothingEnabled = img_smooth;
        _ctx.msImageSmoothingEnabled = img_smooth;
        _ctx.imageSmoothingEnabled = img_smooth;
      };
      module.exports = {
        Init,
        Resize
      };
    }
  });

  // node_modules/@tmg-js-modules/graphics/index.js
  var require_graphics = __commonJS({
    "node_modules/@tmg-js-modules/graphics/index.js"(exports, module) {
      var Text = function(_ctx, _text, _align, _font, _pos, _size, _color, _a) {
        _ctx.globalAlpha = _a;
        _ctx.textAlign = _align;
        _ctx.fillStyle = _color;
        if (_font) {
          _ctx.font = `${_size}px ${_font}`;
        } else {
          _ctx.font = `${_size}px ${"Noto Sans"}`;
        }
        _ctx.fillText(`${_text}`, _pos.x, _pos.y);
        _ctx.globalAlpha = 1;
      };
      var Box = function(_ctx, _pos, _size, _color, _a) {
        _ctx.globalAlpha = _a;
        _ctx.fillStyle = _color;
        _ctx.fillRect(_pos.x, _pos.y, _size.w, _size.h);
        _ctx.globalAlpha = 1;
      };
      var Bevel_Outline = function(_ctx, _pos, _size, _color, _r, _a) {
        _ctx.beginPath();
        _ctx.strokeStyle = _color;
        _ctx.globalAlpha = _a;
        _ctx.lineJoin = "round";
        _ctx.lineWidth = _r;
        _ctx.strokeRect(_pos.x + _r / 2, _pos.y + _r / 2, _size.w - _r, _size.h - _r);
        _ctx.closePath();
        _ctx.globalAlpha = 1;
      };
      var Circle = function(_ctx, _pos, _size, _radius, _thickness, _color) {
        let X = _pos.x + _size.w * 0.5;
        let Y = _pos.y + _size.h * 0.5;
        let R = _radius;
        if (_radius > 0) {
          _ctx.beginPath();
          _ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
          _ctx.lineWidth = _thickness;
          _ctx.strokeStyle = _color;
          _ctx.stroke();
        }
      };
      var Line = function(_ctx, _pos_start, _pos_end, offset, _thickness, _color) {
        _ctx.strokeStyle = _color;
        _ctx.lineWidth = _thickness;
        if (!offset) {
          offset = { w: offset.w, h: offset.h };
        }
        _ctx.beginPath();
        _ctx.moveTo(_pos_end.x + offset.w * 0.5, _pos_end.y + offset.h * 0.5);
        _ctx.lineTo(_pos_start.x + offset.w * 0.5, _pos_start.y + offset.h * 0.5);
        _ctx.stroke();
      };
      var Line_Guides = function(_ctx, _thickness, _line_count, _offset) {
        _ctx.lineWidth = _thickness;
        Line(_ctx, { x: canvas.width * 0.5, y: 0 }, { x: canvas.width * 0.5, y: canvas.height }, { w: 0, h: 0 }, _thickness, "Grey");
        Line(_ctx, { x: 0, y: canvas.height * 0.5 }, { x: canvas.width, y: canvas.height * 0.5 }, { w: 0, h: 0 }, _thickness, "Grey");
        for (let x = 0; x < _line_count.x * 0.5; ++x) {
          Line(_ctx, { x: canvas.width * 0.5 - _offset.x - _offset.x * x, y: 0 }, { x: canvas.width * 0.5 - _offset.x - _offset.x * x, y: canvas.height }, { w: 0, h: 0 }, _thickness, "Red");
        }
        for (let x = 0; x < _line_count.x * 0.5; ++x) {
          Line(_ctx, { x: canvas.width * 0.5 + _offset.x + _offset.x * x, y: 0 }, { x: canvas.width * 0.5 + _offset.x + _offset.x * x, y: canvas.height }, { w: 0, h: 0 }, _thickness, "Red");
        }
        for (let y = 0; y < _line_count.y * 0.5; ++y) {
          Line(_ctx, { x: 0, y: canvas.height * 0.5 - _offset.y - _offset.y * y }, { x: canvas.width, y: canvas.height * 0.5 - _offset.y - _offset.y * y }, { w: 0, h: 0 }, _thickness, "Red");
        }
        for (let y = 0; y < _line_count.y * 0.5; ++y) {
          Line(_ctx, { x: 0, y: canvas.height * 0.5 + _offset.y + _offset.y * y }, { x: canvas.width, y: canvas.height * 0.5 + _offset.y + _offset.y * y }, { w: 0, h: 0 }, _thickness, "Red");
        }
      };
      var Image = function(_ctx, _image, _frame, _spriteSize, _pos, _size, _rot, _a) {
        _ctx.globalAlpha = _a;
        _ctx.save();
        _ctx.translate(_pos.x, _pos.y);
        _ctx.rotate(_rot);
        _ctx.drawImage(_image, _frame.x, _frame.y, _spriteSize.w, _spriteSize.h, _pos.x - _pos.x - _size.w * 0.5, _pos.y - _pos.y - _size.h * 0.5, _size.w, _size.h);
        _ctx.restore();
        _ctx.globalAlpha = 1;
      };
      var Image_Simple = function(_ctx, _image, _pos, _size, _a) {
        _ctx.globalAlpha = _a;
        _ctx.drawImage(_image, _pos.x, _pos.y, _size.w, _size.h);
        _ctx.globalAlpha = 1;
      };
      module.exports = {
        Text,
        Line,
        Line_Guides,
        Box,
        Circle,
        Bevel_Outline,
        Image,
        Image_Simple
      };
    }
  });

  // node_modules/@tmg-js-modules/input-mouse/index.js
  var require_input_mouse = __commonJS({
    "node_modules/@tmg-js-modules/input-mouse/index.js"(exports, module) {
      var Mouse_Move = function(main, _canvas) {
        window.addEventListener("mousemove", function(e) {
          let bounds = _canvas.getBoundingClientRect();
          main.mouse.pos.x = e.pageX - bounds.left - scrollX;
          main.mouse.pos.y = e.pageY - bounds.top - scrollY;
          main.mouse.pos.x /= bounds.width;
          main.mouse.pos.y /= bounds.height;
          main.mouse.pos.x *= canvas.width;
          main.mouse.pos.y *= canvas.height;
          main.mouse.pos.x = main.mouse.pos.x - main.mouse.size.w * 0.5;
          main.mouse.pos.y = main.mouse.pos.y - main.mouse.size.h * 0.5;
        });
      };
      var Mouse_Leave = function(main) {
        window.addEventListener("mouseleave", function(e) {
          main.mouse.pos.x = null;
          main.mouse.pos.y = null;
          main.mouse.click = false;
        });
      };
      var Mouse_Down = function(main) {
        window.addEventListener("mousedown", function(e) {
          main.mouse.click = true;
        });
      };
      var Mouse_Up = function(main) {
        window.addEventListener("mouseup", function(e) {
          main.mouse.click = false;
        });
      };
      module.exports = {
        Mouse_Move,
        Mouse_Leave,
        Mouse_Up,
        Mouse_Down
      };
    }
  });

  // node_modules/@tmg-js-modules/touch/index.js
  var require_touch = __commonJS({
    "node_modules/@tmg-js-modules/touch/index.js"(exports, module) {
      var Init = function(main) {
        document.addEventListener("touchstart", touch2Mouse, true);
        document.addEventListener("touchmove", touch2Mouse, true);
        document.addEventListener("touchend", touch2Mouse, true);
        function touch2Mouse(e) {
          let theTouch = e.changedTouches[0];
          let mouseEv;
          switch (e.type) {
            case "touchstart":
              mouseEv = "mousedown";
              main.mouse.click = true;
              break;
            case "touchend":
              mouseEv = "mouseup";
              main.mouse.click = false;
              break;
            case "touchmove":
              mouseEv = "mousemove";
              break;
            default:
              return;
          }
          const mouseEvent = document.createEvent("MouseEvent");
          mouseEvent.initMouseEvent(mouseEv, true, true, window, 1, theTouch.screenX, theTouch.screenY, theTouch.clientX, theTouch.clientY, false, false, false, false, 0, null);
          theTouch.target.dispatchEvent(mouseEvent);
        }
      };
      module.exports = {
        Init
      };
    }
  });

  // dev/js/index.js
  var Screen = require_screen();
  var Graphics = require_graphics();
  var Mouse = require_input_mouse();
  var Touch = require_touch();
  window.addEventListener("load", function() {
    const ctx = canvas.getContext("2d");
    const overlayCtx = overlay.getContext("2d");
    class Game {
      constructor(size) {
        this.debug = false;
        this.resolution = { w: 1088, h: 640 };
        this.size = size;
        this.timeStamp = 1;
        this.images = {};
        this.canvas_list = [
          { cx: ctx, ca: canvas }
        ];
        this.mouse = {
          pos: { x: 0, y: 0 },
          size: { w: 64, h: 64 },
          click: false
        };
        this.objects = [];
      }
      init() {
        if (this.debug)
          console.log("Game Started");
      }
      update(deltaTime) {
        this.objects.forEach((ob) => ob.update(deltaTime));
      }
      draw() {
        if (game.debug) {
          Graphics.Line_Guides(game.canvas_list[0].cx, 2, { x: 2, y: 2 }, { x: 64 * 3, y: 64 * 3 });
        }
        this.objects.forEach((ob) => ob.draw());
        Graphics.Text(this.canvas_list[0].cx, "Blank JS Project", "center", "Noto Sans", { x: canvas.width * 0.5, y: canvas.height * 0.5 }, 40, "Gold", 1);
        if (game.mouse.pos.x || game.mouse.pos.y) {
          if (game.mouse.click) {
            Graphics.Bevel_Outline(this.canvas_list[0].cx, this.mouse.pos, this.mouse.size, "Red", 3, 1);
          } else {
            Graphics.Bevel_Outline(this.canvas_list[0].cx, this.mouse.pos, this.mouse.size, "Teal", 3, 1);
          }
        }
      }
      instance(_list, _ob, _pos, _size, _speed) {
        if (_ob !== null) {
          _list.push(new _ob(this, _pos, _size, _speed));
          _list[_list.length - 1].init();
          _list.sort(function(a, b) {
            return a.pos.y - b.pos.y;
          });
        }
      }
      remove_instance(_list, _ob) {
        _list = _list.filter((_ob2) => !_ob2.markedForDeletion);
      }
    }
    const game = new Game({ w: canvas.width, h: canvas.height });
    Screen.Init(game);
    game.init();
    Mouse.Mouse_Move(game, canvas);
    Mouse.Mouse_Leave(game);
    Mouse.Mouse_Down(game);
    Mouse.Mouse_Up(game);
    let lastTime = 1;
    function animate(timeStamp) {
      for (let i = 0; i < game.canvas_list.length; ++i)
        game.canvas_list[i].cx.clearRect(0, 0, game.canvas_list[i].ca.width, game.canvas_list[i].ca.height);
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      game.update(deltaTime);
      game.draw();
      requestAnimationFrame(animate);
    }
    animate();
  });
})();
//# sourceMappingURL=index.js.map
