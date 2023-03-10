var TILE_SIZE = 30;
var FPS = 30;
var SLEEP = 1000 / FPS;
/*
  step 7 Tile -> RawTile 이름 변경.
*/
var RawTile2;
(function (RawTile2) {
    RawTile2[RawTile2["AIR"] = 0] = "AIR";
    RawTile2[RawTile2["FLUX"] = 1] = "FLUX";
    RawTile2[RawTile2["UNBREAKABLE"] = 2] = "UNBREAKABLE";
    RawTile2[RawTile2["PLAYER"] = 3] = "PLAYER";
    RawTile2[RawTile2["STONE"] = 4] = "STONE";
    RawTile2[RawTile2["FALLING_STONE"] = 5] = "FALLING_STONE";
    RawTile2[RawTile2["BOX"] = 6] = "BOX";
    RawTile2[RawTile2["FALLING_BOX"] = 7] = "FALLING_BOX";
    RawTile2[RawTile2["KEY1"] = 8] = "KEY1";
    RawTile2[RawTile2["LOCK1"] = 9] = "LOCK1";
    RawTile2[RawTile2["KEY2"] = 10] = "KEY2";
    RawTile2[RawTile2["LOCK2"] = 11] = "LOCK2";
})(RawTile2 || (RawTile2 = {}));
var RAW_TILE = [
    RawTile2.AIR,
    RawTile2.FLUX,
    RawTile2.UNBREAKABLE,
    RawTile2.PLAYER,
    RawTile2.STONE, RawTile2.FALLING_STONE,
    RawTile2.BOX, RawTile2.FALLING_BOX,
    RawTile2.KEY1, RawTile2.KEY2,
    RawTile2.LOCK1, RawTile2.LOCK2
];
/*
  Player
*/
var Player = /** @class */ (function () {
    function Player() {
        this.x = 1;
        this.y = 1;
    }
    Player.prototype.draw = function (g) {
        // Draw player
        g.fillStyle = "#ff0000";
        g.fillRect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Player.prototype.moveHorizontal = function (map, dx) {
        map.moveHorizontal(this, this.x, this.y, dx);
    };
    Player.prototype.moveVertical = function (map, dy) {
        map.moveVertical(this, this.x, this.y, dy);
    };
    Player.prototype.move = function (map, dx, dy) {
        this.moveToTile(map, this.x + dx, this.y + dy);
    };
    Player.prototype.moveToTile = function (map, newx, newy) {
        map.movePlayer(newx, newy, this.x, this.y);
        this.x = newx;
        this.y = newy;
    };
    Player.prototype.pushHorizontal = function (map, tile, dx) {
        if (map.isAir(this.y, this.x + dx + dx)
            && !map.isAir(this.y + 1, this.x + dx)) {
            map.setTitle(this.y, this.x + dx + dx, this.x + dx);
            this.moveToTile(map, this.x + dx, this.y);
        }
    };
    return Player;
}());
var player = new Player();
// 클래스 생성.
var Falling = /** @class */ (function () {
    function Falling() {
    }
    Falling.prototype.drop = function (map, tile, x, y) {
        map.drop(tile, x, y);
    };
    Falling.prototype.moveHorizontal = function (map, tile, dx) {
    };
    Falling.prototype.isFalling = function () {
        return true;
    };
    Falling.prototype.isResting = function () {
        return false;
    };
    return Falling;
}());
var Resting = /** @class */ (function () {
    function Resting() {
    }
    Resting.prototype.drop = function (map, tile, x, y) {
    };
    Resting.prototype.moveHorizontal = function (map, tile, dx) {
        player.pushHorizontal(map, tile, dx);
    };
    Resting.prototype.isFalling = function () {
        return false;
    };
    Resting.prototype.isResting = function () {
        return true;
    };
    return Resting;
}());
var FallStrategy = /** @class */ (function () {
    function FallStrategy(falling) {
        this.falling = falling;
    }
    FallStrategy.prototype.update = function (map, tile, x, y) {
        this.falling = map.blockOnTopState(x, y);
        this.falling.drop(map, tile, x, y);
    };
    FallStrategy.prototype.moveHorizontal = function (map, tile, dx) {
        this.falling.moveHorizontal(map, tile, dx);
    };
    return FallStrategy;
}());
var PlayerTile = /** @class */ (function () {
    function PlayerTile() {
    }
    PlayerTile.prototype.getBlockOnTopState = function () {
        return new Resting();
    };
    PlayerTile.prototype.updateTile = function (map, x, y) {
    };
    PlayerTile.prototype.isFalling = function () {
        return false;
    };
    PlayerTile.prototype.moveVertical = function (map, player, dy) {
    };
    PlayerTile.prototype.moveHorizontal = function (map, player, dx) {
    };
    PlayerTile.prototype.isEdible = function () {
        return false;
    };
    PlayerTile.prototype.isPushaBle = function () {
        return false;
    };
    PlayerTile.prototype.draw = function (g, x, y) {
    };
    PlayerTile.prototype.isPLAYER = function () { return false; };
    PlayerTile.prototype.isAIR = function () { return false; };
    PlayerTile.prototype.isFLUX = function () { return false; };
    PlayerTile.prototype.isUNBREAKABLE = function () { return false; };
    PlayerTile.prototype.isKEY1 = function () { return false; };
    PlayerTile.prototype.isKEY2 = function () { return false; };
    PlayerTile.prototype.isLOCK1 = function () { return false; };
    PlayerTile.prototype.isLOCK2 = function () { return false; };
    return PlayerTile;
}());
var Air = /** @class */ (function () {
    function Air() {
    }
    Air.prototype.getBlockOnTopState = function () {
        return new Falling();
    };
    Air.prototype.updateTile = function (map, x, y) {
    };
    Air.prototype.isFalling = function () {
        return false;
    };
    Air.prototype.moveVertical = function (map, player, dy) {
        player.move(map, 0, dy);
    };
    Air.prototype.moveHorizontal = function (map, player, dx) {
        player.move(map, dx, 0);
    };
    Air.prototype.isEdible = function () {
        return true;
    };
    Air.prototype.isPushaBle = function () {
        return false;
    };
    Air.prototype.draw = function (g, x, y) {
    };
    Air.prototype.isPLAYER = function () { return false; };
    Air.prototype.isAIR = function () { return true; };
    Air.prototype.isFLUX = function () { return false; };
    Air.prototype.isUNBREAKABLE = function () { return false; };
    Air.prototype.isKEY1 = function () { return false; };
    Air.prototype.isKEY2 = function () { return false; };
    Air.prototype.isLOCK1 = function () { return false; };
    Air.prototype.isLOCK2 = function () { return false; };
    return Air;
}());
var Unbreakable = /** @class */ (function () {
    function Unbreakable() {
    }
    Unbreakable.prototype.getBlockOnTopState = function () {
        return new Resting();
    };
    Unbreakable.prototype.updateTile = function (map, x, y) {
    };
    Unbreakable.prototype.isFalling = function () {
        return false;
    };
    Unbreakable.prototype.moveVertical = function (map, player, dy) {
    };
    Unbreakable.prototype.moveHorizontal = function (map, player, dx) {
    };
    Unbreakable.prototype.isEdible = function () {
        return false;
    };
    Unbreakable.prototype.isPushaBle = function () {
        return false;
    };
    Unbreakable.prototype.draw = function (g, x, y) {
        g.fillStyle = "#999999";
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Unbreakable.prototype.isPLAYER = function () { return false; };
    Unbreakable.prototype.isAIR = function () { return false; };
    Unbreakable.prototype.isFLUX = function () { return false; };
    Unbreakable.prototype.isUNBREAKABLE = function () { return true; };
    Unbreakable.prototype.isKEY1 = function () { return false; };
    Unbreakable.prototype.isKEY2 = function () { return false; };
    Unbreakable.prototype.isLOCK1 = function () { return false; };
    Unbreakable.prototype.isLOCK2 = function () { return false; };
    return Unbreakable;
}());
var Flux = /** @class */ (function () {
    function Flux() {
    }
    Flux.prototype.getBlockOnTopState = function () {
        return new Resting();
    };
    Flux.prototype.updateTile = function (map, x, y) {
    };
    Flux.prototype.isFalling = function () {
        return false;
    };
    Flux.prototype.drop = function () {
    };
    Flux.prototype.rest = function () {
    };
    Flux.prototype.moveVertical = function (map, player, dy) {
        player.move(map, 0, dy);
    };
    Flux.prototype.moveHorizontal = function (map, player, dx) {
        player.move(map, dx, 0);
    };
    Flux.prototype.isEdible = function () {
        return true;
    };
    Flux.prototype.isPushaBle = function () {
        return false;
    };
    Flux.prototype.draw = function (g, x, y) {
        g.fillStyle = "#ccffcc";
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Flux.prototype.isPLAYER = function () { return false; };
    Flux.prototype.isAIR = function () { return false; };
    Flux.prototype.isFLUX = function () { return true; };
    Flux.prototype.isUNBREAKABLE = function () { return false; };
    Flux.prototype.isKEY1 = function () { return false; };
    Flux.prototype.isKEY2 = function () { return false; };
    Flux.prototype.isLOCK1 = function () { return false; };
    Flux.prototype.isLOCK2 = function () { return false; };
    return Flux;
}());
var Stone = /** @class */ (function () {
    // 생성자 초기값 세팅
    function Stone(falling) {
        this.fallStrategy = new FallStrategy(falling);
    }
    Stone.prototype.getBlockOnTopState = function () {
        return new Resting();
    };
    Stone.prototype.updateTile = function (map, x, y) {
        this.fallStrategy.update(map, this, x, y);
    };
    Stone.prototype.moveVertical = function (map, player, dy) {
    };
    Stone.prototype.moveHorizontal = function (map, player, dx) {
        this.fallStrategy.moveHorizontal(map, this, dx);
    };
    Stone.prototype.isEdible = function () {
        return false;
    };
    Stone.prototype.isPushaBle = function () {
        return true;
    };
    Stone.prototype.draw = function (g, x, y) {
        g.fillStyle = "#0000cc";
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Stone.prototype.isPLAYER = function () { return false; };
    Stone.prototype.isAIR = function () { return false; };
    Stone.prototype.isFLUX = function () { return false; };
    Stone.prototype.isUNBREAKABLE = function () { return false; };
    Stone.prototype.isKEY1 = function () { return false; };
    Stone.prototype.isKEY2 = function () { return false; };
    Stone.prototype.isLOCK1 = function () { return false; };
    Stone.prototype.isLOCK2 = function () { return false; };
    return Stone;
}());
var Box = /** @class */ (function () {
    // 생성자 초기값 세팅
    function Box(falling) {
        this.fallStrategy = new FallStrategy(falling);
    }
    Box.prototype.getBlockOnTopState = function () {
        return new Resting();
    };
    Box.prototype.updateTile = function (map, x, y) {
        this.fallStrategy.update(map, this, x, y);
    };
    Box.prototype.isStoney = function () {
        return false;
    };
    Box.prototype.isBoxy = function () {
        return true;
    };
    Box.prototype.moveVertical = function (map, player, dy) {
    };
    Box.prototype.moveHorizontal = function (map, player, dx) {
        this.fallStrategy.moveHorizontal(map, this, dx);
    };
    Box.prototype.isEdible = function () {
        return false;
    };
    Box.prototype.isPushaBle = function () {
        return true;
    };
    Box.prototype.draw = function (g, x, y) {
        g.fillStyle = "#8b4513";
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Box.prototype.isPLAYER = function () { return false; };
    Box.prototype.isAIR = function () { return false; };
    Box.prototype.isFLUX = function () { return false; };
    Box.prototype.isUNBREAKABLE = function () { return false; };
    Box.prototype.isKEY1 = function () { return false; };
    Box.prototype.isKEY2 = function () { return false; };
    Box.prototype.isLOCK1 = function () { return false; };
    Box.prototype.isLOCK2 = function () { return false; };
    return Box;
}());
var Key = /** @class */ (function () {
    function Key(keyConfigration) {
        this.keyConfigration = keyConfigration;
    }
    Key.prototype.getBlockOnTopState = function () {
        return new Resting();
    };
    Key.prototype.updateTile = function (map, x, y) {
    };
    Key.prototype.isStoney = function () {
        return false;
    };
    Key.prototype.isBoxy = function () {
        return false;
    };
    Key.prototype.moveVertical = function (map, player, dy) {
        this.keyConfigration.getremoveLock();
        player.move(map, 0, dy);
    };
    Key.prototype.moveHorizontal = function (map, player, dx) {
        this.keyConfigration.getremoveLock();
        player.move(map, dx, 0);
    };
    Key.prototype.isEdible = function () {
        return false;
    };
    Key.prototype.isPushaBle = function () {
        return false;
    };
    Key.prototype.draw = function (g, x, y) {
        this.keyConfigration.setColor(g);
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Key.prototype.isPLAYER = function () { return false; };
    Key.prototype.isAIR = function () { return false; };
    Key.prototype.isFLUX = function () { return false; };
    Key.prototype.isUNBREAKABLE = function () { return false; };
    Key.prototype.isLOCK1 = function () { return false; };
    Key.prototype.isLOCK2 = function () { return false; };
    return Key;
}());
var Locks = /** @class */ (function () {
    function Locks(keyConfigration) {
        this.keyConfigration = keyConfigration;
    }
    Locks.prototype.getBlockOnTopState = function () {
        return new Resting();
    };
    Locks.prototype.updateTile = function (map, x, y) {
    };
    Locks.prototype.isStoney = function () {
        return false;
    };
    Locks.prototype.isBoxy = function () {
        return false;
    };
    Locks.prototype.moveVertical = function (map, player, dy) {
    };
    Locks.prototype.moveHorizontal = function (map, player, dx) {
    };
    Locks.prototype.isEdible = function () {
        return false;
    };
    Locks.prototype.isPushaBle = function () {
        return false;
    };
    Locks.prototype.draw = function (g, x, y) {
        //    g.fillStyle = "#ffcc00";
        this.keyConfigration.setColor(g);
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Locks.prototype.isPLAYER = function () { return false; };
    Locks.prototype.isAIR = function () { return false; };
    Locks.prototype.isFLUX = function () { return false; };
    Locks.prototype.isUNBREAKABLE = function () { return false; };
    Locks.prototype.isKEY1 = function () { return false; };
    Locks.prototype.isKEY2 = function () { return false; };
    Locks.prototype.isLOCK1 = function () { return this.keyConfigration.is1(); };
    Locks.prototype.isLOCK2 = function () { return !this.keyConfigration.is1(); };
    return Locks;
}());
var RawInput;
(function (RawInput) {
    RawInput[RawInput["UP"] = 0] = "UP";
    RawInput[RawInput["DOWN"] = 1] = "DOWN";
    RawInput[RawInput["LEFT"] = 2] = "LEFT";
    RawInput[RawInput["RIGHT"] = 3] = "RIGHT";
})(RawInput || (RawInput = {}));
var right = /** @class */ (function () {
    function right() {
    }
    right.prototype.handle = function (player) {
        player.moveHorizontal(map, 1);
    };
    right.prototype.isRight = function () {
        return true;
    };
    right.prototype.isLeft = function () {
        return false;
    };
    right.prototype.isUp = function () {
        return false;
    };
    right.prototype.isDown = function () {
        return false;
    };
    return right;
}());
var left = /** @class */ (function () {
    function left() {
    }
    left.prototype.handle = function (player) {
        player.moveHorizontal(map, -1);
    };
    left.prototype.isRight = function () {
        return false;
    };
    left.prototype.isLeft = function () {
        return true;
    };
    left.prototype.isUp = function () {
        return false;
    };
    left.prototype.isDown = function () {
        return false;
    };
    return left;
}());
var up = /** @class */ (function () {
    function up() {
    }
    up.prototype.handle = function (player) {
        player.moveVertical(map, -1);
    };
    up.prototype.isRight = function () {
        return false;
    };
    up.prototype.isLeft = function () {
        return false;
    };
    up.prototype.isUp = function () {
        return true;
    };
    up.prototype.isDown = function () {
        return false;
    };
    return up;
}());
var down = /** @class */ (function () {
    function down() {
    }
    down.prototype.handle = function (player) {
        player.moveVertical(map, 1);
    };
    down.prototype.isRight = function () {
        return false;
    };
    down.prototype.isLeft = function () {
        return false;
    };
    down.prototype.isUp = function () {
        return false;
    };
    down.prototype.isDown = function () {
        return true;
    };
    return down;
}());
// step 8 이름 변경
var rawMap = [
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 3, 0, 1, 1, 2, 0, 2],
    [2, 4, 2, 6, 1, 2, 0, 2],
    [2, 8, 4, 1, 1, 2, 0, 2],
    [2, 4, 1, 1, 1, 9, 0, 2],
    [2, 2, 2, 2, 2, 2, 2, 2],
];
var Map = /** @class */ (function () {
    function Map() {
        this.map = new Array(rawMap.length);
        for (var y = 0; y < rawMap.length; y++) {
            this.map[y] = new Array(rawMap[y].length);
            for (var x = 0; x < rawMap[y].length; x++) {
                this.map[y][x] = transtormTile(RAW_TILE[rawMap[y][x]]);
            }
        }
    }
    Map.prototype.moveHorizontal = function (player, x, y, dx) {
        this.map[y][x + dx].moveHorizontal(this, player, dx);
    };
    Map.prototype.moveVertical = function (player, x, y, dy) {
        this.map[y + dy][x].moveVertical(this, player, dy);
    };
    Map.prototype.transtorm = function () {
        this.map = new Array(rawMap.length);
        for (var y = 0; y < rawMap.length; y++) {
            this.map[y] = new Array(rawMap[y].length);
            for (var x = 0; x < rawMap[y].length; x++) {
                this.map[y][x] = transtormTile(rawMap[y][x]);
            }
        }
    };
    Map.prototype.update = function () {
        for (var y = this.map.length - 1; y >= 0; y--) {
            for (var x = 0; x < this.map[y].length; x++) {
                this.map[y][x].updateTile(this, x, y);
            }
        }
    };
    Map.prototype.draw = function (g) {
        // Draw map
        for (var y = 0; y < this.map.length; y++) {
            for (var x = 0; x < this.map[y].length; x++) {
                this.map[y][x].draw(g, x, y);
            }
        }
    };
    Map.prototype.remove = function (removeStrategy) {
        for (var y = 0; y < this.map.length; y++) {
            for (var x = 0; x < this.map[y].length; x++) {
                if (removeStrategy.check(this.map[y][x])) {
                    this.map[y][x] = new Air();
                }
            }
        }
    };
    Map.prototype.movePlayer = function (newx, newy, x, y) {
        this.map[y][x] = new Air();
        this.map[newy][newx] = new PlayerTile();
    };
    Map.prototype.isAir = function (y, x) {
        return this.map[y][x].isAIR();
    };
    Map.prototype.setTitle = function (y, x1, x2) {
        this.map[y][x1] = this.map[y][x2];
    };
    Map.prototype.blockOnTopState = function (x, y) {
        return this.map[y + 1][x].getBlockOnTopState();
    };
    Map.prototype.drop = function (tile, x, y) {
        this.map[y + 1][x] = tile;
        this.map[y][x] = new Air();
    };
    return Map;
}());
var map = new Map();
var inputs = [];
// 메서드 전문화
function assertExhausted(tile) {
    return new Error("ERROR" + tile);
}
var keyConfigration = /** @class */ (function () {
    function keyConfigration(color, is_1, removeStrategy) {
        this.color = color;
        this.is_1 = is_1;
        this.removeStrategy = removeStrategy;
    }
    keyConfigration.prototype.setColor = function (g) {
        g.fillStyle = this.color;
    };
    keyConfigration.prototype.is1 = function () {
        return this.is_1;
    };
    keyConfigration.prototype.getremoveLock = function () {
        map.remove(this.removeStrategy);
    };
    return keyConfigration;
}());
// 클래스 생성
var RemoveLock1 = /** @class */ (function () {
    function RemoveLock1() {
    }
    RemoveLock1.prototype.check = function (tile) {
        return tile.isLOCK1();
    };
    return RemoveLock1;
}());
// 클래스 생성
var RemoveLock2 = /** @class */ (function () {
    function RemoveLock2() {
    }
    RemoveLock2.prototype.check = function (tile) {
        return tile.isLOCK2();
    };
    return RemoveLock2;
}());
var YELLOW_KEY = new keyConfigration("#ffcc00", true, new RemoveLock1());
var BLUE_KEY = new keyConfigration("#00ccff", false, new RemoveLock2());
// 메서드 전문화
function transtormTile(tile) {
    switch (tile) {
        case RawTile2.AIR: return new Air();
        case RawTile2.PLAYER: return new PlayerTile();
        case RawTile2.BOX: return new Box(new Resting());
        case RawTile2.UNBREAKABLE: return new Unbreakable();
        case RawTile2.FALLING_BOX: return new Box(new Falling());
        case RawTile2.FALLING_STONE: return new Stone(new Falling());
        case RawTile2.STONE: return new Stone(new Resting());
        case RawTile2.LOCK1: return new Locks(YELLOW_KEY);
        case RawTile2.LOCK2: return new Locks(BLUE_KEY);
        case RawTile2.KEY1: return new Key(YELLOW_KEY);
        case RawTile2.KEY2: return new Key(BLUE_KEY);
        case RawTile2.FLUX: return new Flux();
        default: assertExhausted(tile);
    }
}
function update() {
    handleInputs(); // 
    map.update();
}
function handleInputs() {
    while (inputs.length > 0) {
        var current = inputs.pop();
        current.handle(player);
    }
}
function draw() {
    var g = createGraphice();
    map.draw(g);
    player.draw(g);
}
/*
  step 2
  그래픽 함수 분리.
*/
function createGraphice() {
    var canvas = document.getElementById("GameCanvas");
    var g = canvas.getContext("2d");
    g.clearRect(0, 0, canvas.width, canvas.height);
    return g;
}
function gameLoop() {
    var before = Date.now();
    update();
    draw();
    var after = Date.now();
    var frameTime = after - before;
    var sleep = SLEEP - frameTime;
    setTimeout(function () { return gameLoop(); }, sleep);
}
window.onload = function () {
    map.transtorm();
    gameLoop();
};
var LEFT_KEY = "ArrowLeft";
var UP_KEY = "ArrowUp";
var RIGHT_KEY = "ArrowRight";
var DOWN_KEY = "ArrowDown";
window.addEventListener("keydown", function (e) {
    if (e.key === LEFT_KEY || e.key === "a")
        inputs.push(new left());
    else if (e.key === UP_KEY || e.key === "w")
        inputs.push(new up());
    else if (e.key === RIGHT_KEY || e.key === "d")
        inputs.push(new right());
    else if (e.key === DOWN_KEY || e.key === "s")
        inputs.push(new down());
});
