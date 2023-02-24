
const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

/*
  step 7 Tile -> RawTile 이름 변경.
*/
enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE, FALLING_STONE,
  BOX, FALLING_BOX,
  KEY1, LOCK1,
  KEY2, LOCK2
}


/*
  step 7 인터페이스로 변경.
         Tile2 -> Tile2 이름 변경.
  step 9 draw 함수 추가 하여 
  코드 중복 처리        
  step 11 복잡한 if 체인 구문 리팩터링
  isEdible() 추가
  isPushaBle() 추가
  추가 코드이관
  step 12 유사한 코드 웅합하기
  유사한 클래스 통합하기


*/
interface Tile{
  isPLAYER():boolean,
  isAIR():boolean,
  isFLUX(): boolean,  
  isUNBREAKABLE(): boolean,  
  isFALLING_STONE(): boolean,  
  isFALLING_BOX(): boolean,  
  isKEY1(): boolean,  
  isKEY2(): boolean,  
  isLOCK1(): boolean,  
  isLOCK2(): boolean,
  draw(g:CanvasRenderingContext2D, x:number, y:number):void  ,
  isEdible(): boolean,
  isPushaBle(): boolean,
  moveHorizontal(dx:number):void,
  moveVertical(dy:number):void,
  isStoney():boolean,
  isBoxy():boolean
}

/*
  클래스들 생성.
  메서드 전문화
  step 11 복잡한 if 체인 구문 리팩터링
*/
class Player implements Tile{
  isStoney(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {
  }
  moveHorizontal(dx: number): void {
  }
  isEdible(): boolean {
    throw new Error("Method not implemented.");
  }
  isPushaBle(): boolean {
    throw new Error("Method not implemented.");
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
  }
  isPLAYER(): boolean { return false;  }
  isAIR(): boolean { return false;  }
  isFLUX(): boolean { return false;  }
  isUNBREAKABLE(): boolean { return false;  }
  isFALLING_STONE(): boolean { return false;  }
  isFALLING_BOX(): boolean { return false; }
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return false; }
}
class Air implements Tile{
  isStoney(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {
    moveToTile(playerx, playery + dy);
  }
  moveHorizontal(dx: number): void {
    moveToTile(playerx + dx, playery);
  }
  isEdible(): boolean {
    return true;
  }
  isPushaBle(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
  }
  isPLAYER(): boolean { return false;  }
  isAIR(): boolean { return true;  }
  isFLUX(): boolean { return false;  }
  isUNBREAKABLE(): boolean { return false;  }
  isFALLING_STONE(): boolean { return false;  }
  isFALLING_BOX(): boolean { return false; }
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return false; }
}
class Unbreakable implements Tile{
  isStoney(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {
  }
  moveHorizontal(dx: number): void {
  }
  isEdible(): boolean {
    return false;
  }
  isPushaBle(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#999999";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isPLAYER(): boolean { return false;  }
  isAIR(): boolean { return false;  }
  isFLUX(): boolean { return false;  }
  isUNBREAKABLE(): boolean { return true;  }
  isFALLING_STONE(): boolean { return false;  }
  isFALLING_BOX(): boolean { return false; }
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return false; }
}
class Flux implements Tile{
  isStoney(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {
    moveToTile(playerx, playery + dy);
  }
  moveHorizontal(dx: number): void {
    moveToTile(playerx + dx, playery);
  }
  isEdible(): boolean {
    return true;
  }
  isPushaBle(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#ccffcc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isPLAYER(): boolean { return false;  }
  isAIR(): boolean { return false;  }
  isFLUX(): boolean { return true;  }
  isUNBREAKABLE(): boolean { return false;  }
  isFALLING_STONE(): boolean { return false;  }
  isFALLING_BOX(): boolean { return false; }
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return false; }
}
class Stone implements Tile{
  isStoney(): boolean {
    return true;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {
  }
  moveHorizontal(dx: number): void {
    if(map[playery][playerx + dx + dx].isAIR()
    && !map[playery + 1][playerx + dx].isAIR()) {
      map[playery][playerx + dx + dx] = map[playery][playerx + dx];
      moveToTile(playerx + dx, playery);
    }  
  }
  isEdible(): boolean {
    return false;
  }
  isPushaBle(): boolean {
    return true;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#0000cc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isPLAYER(): boolean { return false;  }
  isAIR(): boolean { return false;  }
  isFLUX(): boolean { return false;  }
  isUNBREAKABLE(): boolean { return false;  }
  isFALLING_STONE(): boolean { return false;  }
  isFALLING_BOX(): boolean { return false; }
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return false; }
}
class FallingStone implements Tile{
  isStoney(): boolean {
    return true;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {
  }
  moveHorizontal(dx: number): void {
  }
  isEdible(): boolean {
    return false;
  }
  isPushaBle(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#0000cc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isPLAYER(): boolean { return false;  }
  isAIR(): boolean { return false;  }
  isFLUX(): boolean { return false;  }
  isUNBREAKABLE(): boolean { return false;  }
  isFALLING_STONE(): boolean { return true;  }
  isFALLING_BOX(): boolean { return false; }
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return false; }
}
class Box implements Tile{
  // falling 변수를 추가.
  private falling:boolean = false;
  // 생성자 초기값 세팅
  constructor(falling:boolean){
    this.falling = falling;
  }
  isStoney(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return true;
  }
  moveVertical(dy: number): void {
  }
  moveHorizontal(dx: number): void {
    if(this.isFALLING_BOX() === false){
      if(map[playery][playerx + dx + dx].isAIR()
      && !map[playery + 1][playerx + dx].isAIR()) {
        map[playery][playerx + dx + dx] = map[playery][playerx + dx];
        moveToTile(playerx + dx, playery);
      }
    }
  }
  isEdible(): boolean {
    return false;
  }
  isPushaBle(): boolean {
    return true;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#8b4513";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isPLAYER(): boolean { return false;  }
  isAIR(): boolean { return false;  }
  isFLUX(): boolean { return false;  }
  isUNBREAKABLE(): boolean { return false;  }
  isFALLING_STONE(): boolean { return false;  }
  isFALLING_BOX(): boolean { return this.falling; }
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return false; }
}
class Key1 implements Tile{
  isStoney(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {
    removeLock1();
    moveToTile(playerx, playery + dy);
  }
  moveHorizontal(dx: number): void {
    removeLock1();
    moveToTile(playerx + dx, playery);
  }
  isEdible(): boolean {
    return false;
  }
  isPushaBle(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#ffcc00";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isPLAYER(): boolean { return false;  }
  isAIR(): boolean { return false;  }
  isFLUX(): boolean { return false;  }
  isUNBREAKABLE(): boolean { return false;  }
  //isSTONE(): boolean { return false; }
  isFALLING_STONE(): boolean { return false;  }
  isBOX(): boolean { return false; }
  isFALLING_BOX(): boolean { return false; }
  isKEY1(): boolean { return true; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return false; }
}
class Key2 implements Tile{
  isStoney(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {
    removeLock2();
    moveToTile(playerx, playery + dy);
  }
  moveHorizontal(dx: number): void {
    removeLock2();
    moveToTile(playerx + dx, playery);
  }
  isEdible(): boolean {
    return false;
  }
  isPushaBle(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#00ccff";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isPLAYER(): boolean { return false;  }
  isAIR(): boolean { return false;  }
  isFLUX(): boolean { return false;  }
  isUNBREAKABLE(): boolean { return false;  }
  isFALLING_STONE(): boolean { return false;  }
  isFALLING_BOX(): boolean { return false; }
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return true; }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return false; }
}
class Lock1 implements Tile{
  isStoney(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {
  }
  moveHorizontal(dx: number): void {
  }
  isEdible(): boolean {
    return false;
  }
  isPushaBle(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#ffcc00";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isPLAYER(): boolean { return false;  }
  isAIR(): boolean { return false;  }
  isFLUX(): boolean { return false;  }
  isUNBREAKABLE(): boolean { return false;  }
  isFALLING_STONE(): boolean { return false;  }
  isFALLING_BOX(): boolean { return false; }
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return true; }
  isLOCK2(): boolean { return false; }
}
class Lock2 implements Tile{
  isStoney(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {
  }
  moveHorizontal(dx: number): void {
  }
  isEdible(): boolean {
    return false;
  }
  isPushaBle(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#00ccff";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isPLAYER(): boolean { return false;  }
  isAIR(): boolean { return false;  }
  isFLUX(): boolean { return false;  }
  isUNBREAKABLE(): boolean { return false;  }
  isFALLING_STONE(): boolean { return false;  }
  isFALLING_BOX(): boolean { return false; }
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return true; }
}

/*
  input -> RawInput 으로 변경.
*/
enum RawInput {
  UP, DOWN, LEFT, RIGHT
}

// step5. 새로운 인터페이스 생성.
// Input2 -> Input 으로 다시변경 적용.
// step6 핸들 메서드 추가.
interface Input{
  isRight():boolean,
  isLeft():boolean,
  isUp():boolean,
  isDown():boolean,
  handle():void
}
// step5 새로운 클래스 생성.
// step6 handle() 메소드 구현.
class right implements Input{
  handle(): void {
    map[playery][playerx + 1].moveHorizontal(1);
  }
  isRight(): boolean {
    return true;
  }
  isLeft(): boolean {
    return false;
  }
  isUp(): boolean {
    return false;
  }
  isDown(): boolean {
    return false;
  }
}
class left implements Input{
  handle(): void {
    map[playery][playerx + -1].moveHorizontal(-1);
  }
  isRight(): boolean {
    return false;
  }
  isLeft(): boolean {
    return true;
  }
  isUp(): boolean {
    return false;
  }
  isDown(): boolean {
    return false;
  }
}
class up implements Input{
  handle(): void {
    map[playery-1][playerx].moveVertical(-1);
  }
  isRight(): boolean {
    return false;
  }
  isLeft(): boolean {
    return false;
  }
  isUp(): boolean {
    return true;
  }
  isDown(): boolean {
    return false;
  }
}
class down implements Input{
  handle(): void {
    map[playery+1][playerx].moveVertical(1);
  }
  isRight(): boolean {
    return false;
  }
  isLeft(): boolean {
    return false;
  }
  isUp(): boolean {
    return false;
  }
  isDown(): boolean {
    return true;
  }
}

let playerx = 1;
let playery = 1;

// step 8 이름 변경
let rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

// map 변경
let map: Tile[][];


//let inputs: Input[] = [];
let inputs: Input[] = [];

// 메서드 전문화
function assertExhausted(tile:RawTile){
  return new Error("ERROR"+tile);
}
// 메서드 전문화
function transtormTile(tile: RawTile){
  switch(tile){
    case RawTile.AIR: return new Air();
    case RawTile.PLAYER: return new Player();
    case RawTile.BOX: return new Box(false);
    case RawTile.UNBREAKABLE: return new Unbreakable();
    case RawTile.FALLING_BOX: return new Box(true);
    case RawTile.FALLING_STONE: return new FallingStone();
    case RawTile.STONE: return new Stone();
    case RawTile.LOCK1: return new Lock1();
    case RawTile.LOCK2: return new Lock2();
    case RawTile.KEY1: return new Key1();
    case RawTile.KEY2: return new Key2();
    case RawTile.FLUX: return new Flux();
    default: assertExhausted(tile);
  }
}
function transtormMap(){
  map = new Array(rawMap.length);
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length);
    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transtormTile(rawMap[y][x]);  
    }   
  }
}

function removeLock1() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLOCK1()) {
        map[y][x] = new Air();
      }
    }
  }
}
function removeLock2() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLOCK2()) {
        map[y][x] = new Air();
      }
    }
  }
}


function moveToTile(newx: number, newy: number) {
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
function handleInputs(){
  while (inputs.length > 0) {
    let current = inputs.pop();
    current.handle();
//  handleInput(current);
  }
}

/*
  step 3 update 메소드가 2개의 일을 동시에 하기 때문에 분리함.
  2 그룹
  step 4 함수 중간에 있는 if문을 하나의 메소드로 분리
*/
function updateMap(){
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      updateTile(x,y);
    }
  }
}
/*
  step 4 함수 중간에 있는 if문을 하나의 메소드로 분리
  step 11 박스에 대한 공력
*/
function updateTile(x:number, y:number){
  if ((map[y][x].isStoney())
    && map[y + 1][x].isAIR()) {
    map[y + 1][x] = new FallingStone();
    map[y][x] = new Air();
  } else if (map[y][x].isBoxy()
    && map[y + 1][x].isAIR()) {
    map[y + 1][x] = new Box(true);
    map[y][x] = new Air();
  } else if (map[y][x].isFALLING_STONE()) {
    map[y][x] = new Stone();
  } else if (map[y][x].isFALLING_BOX()) {
    map[y][x] = new Box(false);
  }
}

function draw() {
  // step 2
  let g = createGraphice();
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
function createGraphice(){
  let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  let g = canvas.getContext("2d");
  g.clearRect(0, 0, canvas.width, canvas.height);
  return g;
}

/*
  step 1 메소드 쪼개기
  step 7 if문 colorOfTile ()메소드 추출
  step 10 메소드 인라인화
*/
function drawMap(g:CanvasRenderingContext2D){
  // Draw map
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].draw(g, x, y); 
    }
  }
}

/*
  step 1
  메소드 쪼개기
*/
function drawPlayer(g:CanvasRenderingContext2D){
  // Draw player
  g.fillStyle = "#ff0000";
  g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}


function gameLoop() {
  let before = Date.now();
  update();
  draw();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  transtormMap();
  gameLoop();
}

const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";

// step5 input을 클래스로 변경.
// 
window.addEventListener("keydown", e => {
  if (e.key === LEFT_KEY || e.key === "a") inputs.push(new left());
  else if (e.key === UP_KEY || e.key === "w") inputs.push(new up());
  else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new right());
  else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new down());
});