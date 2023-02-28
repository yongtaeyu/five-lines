var TILE_SIZE = 30;
var FPS = 30;
var SLEEP = 1000 / FPS;
/*
  step 7 Tile -> RawTile 이름 변경.
*/
var RawTile;
(function (RawTile) {
    RawTile[RawTile["AIR"] = 0] = "AIR";
    RawTile[RawTile["FLUX"] = 1] = "FLUX";
    RawTile[RawTile["UNBREAKABLE"] = 2] = "UNBREAKABLE";
    RawTile[RawTile["PLAYER"] = 3] = "PLAYER";
    RawTile[RawTile["STONE"] = 4] = "STONE";
    RawTile[RawTile["FALLING_STONE"] = 5] = "FALLING_STONE";
    RawTile[RawTile["BOX"] = 6] = "BOX";
    RawTile[RawTile["FALLING_BOX"] = 7] = "FALLING_BOX";
    RawTile[RawTile["KEY1"] = 8] = "KEY1";
    RawTile[RawTile["LOCK1"] = 9] = "LOCK1";
    RawTile[RawTile["KEY2"] = 10] = "KEY2";
    RawTile[RawTile["LOCK2"] = 11] = "LOCK2";
})(RawTile || (RawTile = {}));
// 클래스 생성.
var Falling = /** @class */ (function () {
    function Falling() {
    }
    Falling.prototype.moveHorizontal = function (tile, dx) {
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
    Resting.prototype.moveHorizontal = function (tile, dx) {
        if (map[playery][playerx + dx + dx].isAIR()
            && !map[playery + 1][playerx + dx].isAIR()) {
            map[playery][playerx + dx + dx] = map[playery][playerx + dx];
            moveToTile(playerx + dx, playery);
        }
    };
    Resting.prototype.isFalling = function () {
        return false;
    };
    Resting.prototype.isResting = function () {
        return true;
    };
    return Resting;
}());
// 새로운 클래스 생성.
var FallStrategy = /** @class */ (function () {
    function FallStrategy(falling) {
        this.falling = falling;
    }
    FallStrategy.prototype.update = function (tile, x, y) {
        this.falling = map[y + 1][x].isAIR() ? new Falling() : new Resting();
        this.drop(tile, x, y);
    };
    FallStrategy.prototype.getFalling = function () {
        return this.falling;
    };
    FallStrategy.prototype.drop = function (tile, x, y) {
        if (this.falling.isFalling()) {
            map[y + 1][x] = tile;
            map[y][x] = new Air();
        }
    };
    return FallStrategy;
}());
/*
  클래스들 생성.
  메서드 전문화
  step 11 복잡한 if 체인 구문 리팩터링
*/
var Player = /** @class */ (function () {
    function Player() {
    }
    Player.prototype.updateTile = function (x, y) {
    };
    Player.prototype.isFalling = function () {
        return false;
    };
    Player.prototype.moveVertical = function (dy) {
    };
    Player.prototype.moveHorizontal = function (dx) {
    };
    Player.prototype.isEdible = function () {
        return false;
    };
    Player.prototype.isPushaBle = function () {
        return false;
    };
    Player.prototype.draw = function (g, x, y) {
    };
    Player.prototype.isPLAYER = function () { return false; };
    Player.prototype.isAIR = function () { return false; };
    Player.prototype.isFLUX = function () { return false; };
    Player.prototype.isUNBREAKABLE = function () { return false; };
    Player.prototype.isKEY1 = function () { return false; };
    Player.prototype.isKEY2 = function () { return false; };
    Player.prototype.isLOCK1 = function () { return false; };
    Player.prototype.isLOCK2 = function () { return false; };
    return Player;
}());
var Air = /** @class */ (function () {
    function Air() {
    }
    Air.prototype.updateTile = function (x, y) {
    };
    Air.prototype.isFalling = function () {
        return false;
    };
    Air.prototype.moveVertical = function (dy) {
        moveToTile(playerx, playery + dy);
    };
    Air.prototype.moveHorizontal = function (dx) {
        moveToTile(playerx + dx, playery);
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
    Unbreakable.prototype.updateTile = function (x, y) {
    };
    Unbreakable.prototype.isFalling = function () {
        return false;
    };
    Unbreakable.prototype.moveVertical = function (dy) {
    };
    Unbreakable.prototype.moveHorizontal = function (dx) {
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
    Flux.prototype.updateTile = function (x, y) {
    };
    Flux.prototype.isFalling = function () {
        return false;
    };
    Flux.prototype.drop = function () {
    };
    Flux.prototype.rest = function () {
    };
    Flux.prototype.moveVertical = function (dy) {
        moveToTile(playerx, playery + dy);
    };
    Flux.prototype.moveHorizontal = function (dx) {
        moveToTile(playerx + dx, playery);
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
    Stone.prototype.updateTile = function (x, y) {
        this.fallStrategy.update(this, x, y);
    };
    Stone.prototype.moveVertical = function (dy) {
    };
    Stone.prototype.moveHorizontal = function (dx) {
        this.fallStrategy
            .getFalling()
            .moveHorizontal(this, dx);
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
    Box.prototype.updateTile = function (x, y) {
        this.fallStrategy.update(this, x, y);
    };
    Box.prototype.isStoney = function () {
        return false;
    };
    Box.prototype.isBoxy = function () {
        return true;
    };
    Box.prototype.moveVertical = function (dy) {
    };
    Box.prototype.moveHorizontal = function (dx) {
        this.fallStrategy
            .getFalling()
            .moveHorizontal(this, dx);
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
    Key.prototype.updateTile = function (x, y) {
    };
    Key.prototype.isStoney = function () {
        return false;
    };
    Key.prototype.isBoxy = function () {
        return false;
    };
    Key.prototype.moveVertical = function (dy) {
        removeLock(this.keyConfigration.getRemoveStrategy());
        moveToTile(playerx, playery + dy);
    };
    Key.prototype.moveHorizontal = function (dx) {
        removeLock(this.keyConfigration.getRemoveStrategy());
        moveToTile(playerx + dx, playery);
    };
    Key.prototype.isEdible = function () {
        return false;
    };
    Key.prototype.isPushaBle = function () {
        return false;
    };
    Key.prototype.draw = function (g, x, y) {
        g.fillStyle = this.keyConfigration.getColor();
        //"#ffcc00";
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
    Locks.prototype.updateTile = function (x, y) {
    };
    Locks.prototype.isStoney = function () {
        return false;
    };
    Locks.prototype.isBoxy = function () {
        return false;
    };
    Locks.prototype.moveVertical = function (dy) {
    };
    Locks.prototype.moveHorizontal = function (dx) {
    };
    Locks.prototype.isEdible = function () {
        return false;
    };
    Locks.prototype.isPushaBle = function () {
        return false;
    };
    Locks.prototype.draw = function (g, x, y) {
        //    g.fillStyle = "#ffcc00";
        g.fillStyle = this.keyConfigration.getColor();
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
/*
  input -> RawInput 으로 변경.
*/
var RawInput;
(function (RawInput) {
    RawInput[RawInput["UP"] = 0] = "UP";
    RawInput[RawInput["DOWN"] = 1] = "DOWN";
    RawInput[RawInput["LEFT"] = 2] = "LEFT";
    RawInput[RawInput["RIGHT"] = 3] = "RIGHT";
})(RawInput || (RawInput = {}));
// step5 새로운 클래스 생성.
// step6 handle() 메소드 구현.
var right = /** @class */ (function () {
    function right() {
    }
    right.prototype.handle = function () {
        map[playery][playerx + 1].moveHorizontal(1);
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
    left.prototype.handle = function () {
        map[playery][playerx + -1].moveHorizontal(-1);
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
    up.prototype.handle = function () {
        map[playery - 1][playerx].moveVertical(-1);
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
    down.prototype.handle = function () {
        map[playery + 1][playerx].moveVertical(1);
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
var playerx = 1;
var playery = 1;
// step 8 이름 변경
var rawMap = [
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 3, 0, 1, 1, 2, 0, 2],
    [2, 4, 2, 6, 1, 2, 0, 2],
    [2, 8, 4, 1, 1, 2, 0, 2],
    [2, 4, 1, 1, 1, 9, 0, 2],
    [2, 2, 2, 2, 2, 2, 2, 2],
];
// map 변경
var map;
//let inputs: Input[] = [];
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
    keyConfigration.prototype.getColor = function () {
        return this.color;
    };
    keyConfigration.prototype.is1 = function () {
        return this.is_1;
    };
    keyConfigration.prototype.getRemoveStrategy = function () {
        return this.removeStrategy;
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
        case RawTile.AIR: return new Air();
        case RawTile.PLAYER: return new Player();
        case RawTile.BOX: return new Box(new Resting());
        case RawTile.UNBREAKABLE: return new Unbreakable();
        case RawTile.FALLING_BOX: return new Box(new Falling());
        case RawTile.FALLING_STONE: return new Stone(new Falling());
        case RawTile.STONE: return new Stone(new Resting());
        case RawTile.LOCK1: return new Locks(YELLOW_KEY);
        case RawTile.LOCK2: return new Locks(BLUE_KEY);
        case RawTile.KEY1: return new Key(YELLOW_KEY);
        case RawTile.KEY2: return new Key(BLUE_KEY);
        case RawTile.FLUX: return new Flux();
        default: assertExhausted(tile);
    }
}
function transtormMap() {
    map = new Array(rawMap.length);
    for (var y = 0; y < rawMap.length; y++) {
        map[y] = new Array(rawMap[y].length);
        for (var x = 0; x < rawMap[y].length; x++) {
            map[y][x] = transtormTile(rawMap[y][x]);
        }
    }
}
function removeLock(removeStrategy) {
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
            if (removeStrategy.check(map[y][x])) {
                map[y][x] = new Air();
            }
        }
    }
}
function moveToTile(newx, newy) {
    map[playery][playerx] = new Air();
    map[newy][newx] = new Player();
    playerx = newx;
    playery = newy;
}
/*
  step 3 update 메소드가 2개의 일을 동시에 하기 때문에 분리함.
*/
function update() {
    handleInputs(); // 
    updateMap();
}
/*
  step 3 update 메소드가 2개의 일을 동시에 하기 때문에 분리함.
  1 그룹
  step 4 함수 중간에 있는 if문을 하나의 메소드로 분리
  step 6 메소드 삭제 및 handle 메소드 사용으로 변경.
*/
function handleInputs() {
    while (inputs.length > 0) {
        var current = inputs.pop();
        current.handle();
        //  handleInput(current);
    }
}
/*
  step 3 update 메소드가 2개의 일을 동시에 하기 때문에 분리함.
  2 그룹
  step 4 함수 중간에 있는 if문을 하나의 메소드로 분리
*/
function updateMap() {
    for (var y = map.length - 1; y >= 0; y--) {
        for (var x = 0; x < map[y].length; x++) {
            map[y][x].updateTile(x, y);
        }
    }
}
function draw() {
    // step 2
    var g = createGraphice();
    /*
      step 1
      메소드 쪼개기
    */
    drawMap(g);
    drawPlayer(g);
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
/*
  step 1 메소드 쪼개기
  step 7 if문 colorOfTile ()메소드 추출
  step 10 메소드 인라인화
*/
function drawMap(g) {
    // Draw map
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
            map[y][x].draw(g, x, y);
        }
    }
}
/*
  step 1
  메소드 쪼개기
*/
function drawPlayer(g) {
    // Draw player
    g.fillStyle = "#ff0000";
    g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
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
    transtormMap();
    gameLoop();
};
var LEFT_KEY = "ArrowLeft";
var UP_KEY = "ArrowUp";
var RIGHT_KEY = "ArrowRight";
var DOWN_KEY = "ArrowDown";
// step5 input을 클래스로 변경.
// 
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
