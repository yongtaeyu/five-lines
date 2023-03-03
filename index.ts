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
interface FallingState{
  isFalling(): boolean,
  isResting(): boolean,
  moveHorizontal(tile:Tile, dx: number): void,
  drop(tile:Tile, x:number, y:number):void
}
/*
  Player
*/
class Player{
  private x:number = 1;
  private y:number = 1;
  draw(g:CanvasRenderingContext2D){
    // Draw player
    g.fillStyle = "#ff0000";
    g.fillRect(
        this.x * TILE_SIZE, 
        this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {
    map.getMap()[this.y][this.x + dx].moveHorizontal(this, dx);
  }
  moveVertical(dy: number) {
    map.getMap()[this.y + dy][this.x].moveVertical(this, dy);
  }
  move(dx:number, dy:number){
    this.moveToTile(this.x + dx, this.y + dy);
  }
  moveToTile(newx: number, newy: number) {
    map.getMap()[this.y][this.x] = new Air();
    map.getMap()[newy][newx] = new PlayerTile();
    this.x = newx;
    this.y = newy;
  }
  pushHorizontal(tile: Tile, dx: number){
    if(map.getMap()[this.y][this.x + dx + dx].isAIR()
    && !map.getMap()[this.y + 1][this.x + dx].isAIR()) {
      map.getMap()[this.y][this.x + dx + dx] = map.getMap()[this.y][this.x + dx];
      this.moveToTile(this.x + dx, this.y);
    }
  }
}
let player = new Player();

// 클래스 생성.
class Falling implements FallingState{
  drop(tile: Tile, x: number, y: number): void {
    map.getMap()[y + 1][x] = tile;
    map.getMap()[y][x] = new Air();
  }
  moveHorizontal(tile: Tile, dx: number): void {
  }
  isFalling(): boolean {
    return true;
  }
  isResting(): boolean {
    return false;
  }
}
class Resting implements FallingState{
  drop(tile: Tile, x: number, y: number): void {
  }
  moveHorizontal(tile: Tile, dx: number): void {
    player.pushHorizontal(tile, dx);
  }
  isFalling(): boolean {
    return false;
  }
  isResting(): boolean {
    return true;
  }
}


interface Tile{
  isPLAYER():boolean,
  isAIR():boolean,
  isFLUX(): boolean,  
  isUNBREAKABLE(): boolean,  
  isLOCK1(): boolean,  
  isLOCK2(): boolean,
  draw(g:CanvasRenderingContext2D, x:number, y:number):void  ,
  isEdible(): boolean,
  isPushaBle(): boolean,
  moveHorizontal(player:Player, dx:number):void,
  moveVertical(player:Player, dy:number):void,
  updateTile(x:number, y:number):void,
  getBlockOnTopState(): FallingState;
}
// 새로운 클래스 생성.
class FallStrategy {

  private falling:FallingState;
  constructor(falling:FallingState){
    this.falling = falling;
  }

  update(tile:Tile, x:number, y:number){
    this.falling = map.getMap()[y + 1][x].getBlockOnTopState();
    this.falling.drop(tile,x,y); 
  }

  moveHorizontal(tile:Tile, dx:number){
    this.falling.moveHorizontal(tile, dx);
  }
}

/*
  클래스들 생성.
  메서드 전문화
  step 11 복잡한 if 체인 구문 리팩터링
*/
class PlayerTile implements Tile{
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
  updateTile(x: number, y: number): void {
  }
  isFalling(): boolean {
    return false;
  }
  moveVertical(player:Player, dy: number): void {
  }
  moveHorizontal(player:Player, dx: number): void {
  }
  isEdible(): boolean {
    return false;
  }
  isPushaBle(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
  }
  isPLAYER(): boolean { return false;  }
  isAIR(): boolean { return false;  }
  isFLUX(): boolean { return false;  }
  isUNBREAKABLE(): boolean { return false;  }
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return false; }
}
class Air implements Tile{
  getBlockOnTopState(): FallingState {
    return new Falling();
  }
  updateTile(x: number, y: number): void {
  }
  isFalling(): boolean {
    return false;
  }
  moveVertical(player:Player, dy: number): void {
    player.move(0, dy);
  }
  moveHorizontal(player:Player, dx: number): void {
    player.move(dx, 0);
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
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return false; }
}
class Unbreakable implements Tile{
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
  updateTile(x: number, y: number): void {
  }
  isFalling(): boolean {
    return false;
  }
  moveVertical(player:Player, dy: number): void {
  }
  moveHorizontal(player:Player, dx: number): void {
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
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return false; }
}
class Flux implements Tile{
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
  updateTile(x: number, y: number): void {
  }
  isFalling(): boolean {
    return false;
  }
  drop(): void {
  }
  rest(): void {
  }
  moveVertical(player:Player, dy: number): void {
    player.move(0, dy);
  }
  moveHorizontal(player:Player, dx: number): void {
    player.move(dx, 0);
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
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return false; }
}
class Stone implements Tile{
  // falling 변수를 추가.
  private fallStrategy:FallStrategy;
  // 생성자 초기값 세팅
  constructor(falling:FallingState){
    this.fallStrategy = new FallStrategy(falling);
  }
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
  updateTile(x: number, y: number): void {
    this.fallStrategy.update(this, x,y);
  }
  moveVertical(player:Player, dy: number): void {
  }
  moveHorizontal(player:Player, dx: number): void {
    this.fallStrategy.moveHorizontal(this, dx);
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
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return false; }
}
class Box implements Tile{
  // falling 변수를 추가.
  private fallStrategy:FallStrategy;
  // 생성자 초기값 세팅
  constructor(falling:FallingState){
    this.fallStrategy = new FallStrategy(falling);
  }
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
  updateTile(x: number, y: number): void {
    this.fallStrategy.update(this, x,y);
  }
  isStoney(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return true;
  }
  moveVertical(player:Player, dy: number): void {
  }
  moveHorizontal(player:Player, dx: number): void {
    this.fallStrategy.moveHorizontal(this, dx);
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
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return false; }
}
class Key implements Tile{
  
  constructor(private keyConfigration:keyConfigration){
  }
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
  updateTile(x: number, y: number): void {
  }
  isStoney(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(player:Player, dy: number): void {
    this.keyConfigration.getremoveLock();
    player.move(0, dy);
  }
  moveHorizontal(player:Player, dx: number): void {
    this.keyConfigration.getremoveLock();
    player.move(dx, 0);
  }
  isEdible(): boolean {
    return false;
  }
  isPushaBle(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    this.keyConfigration.setColor(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isPLAYER(): boolean { return false;  }
  isAIR(): boolean { return false;  }
  isFLUX(): boolean { return false;  }
  isUNBREAKABLE(): boolean { return false;  }
  isLOCK1(): boolean { return false; }
  isLOCK2(): boolean { return false; }
}
class Locks implements Tile{
  constructor(private keyConfigration:keyConfigration){}
  getBlockOnTopState(): FallingState {
    return new Resting();
  }
  updateTile(x: number, y: number): void {
  }
  isStoney(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(player:Player, dy: number): void {
  }
  moveHorizontal(player:Player, dx: number): void {
  }
  isEdible(): boolean {
    return false;
  }
  isPushaBle(): boolean {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
//    g.fillStyle = "#ffcc00";
    this.keyConfigration.setColor(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isPLAYER(): boolean { return false;  }
  isAIR(): boolean { return false;  }
  isFLUX(): boolean { return false;  }
  isUNBREAKABLE(): boolean { return false;  }
  isKEY1(): boolean { return false; }
  isKEY2(): boolean { return false; }
  isLOCK1(): boolean { return this.keyConfigration.is1(); }
  isLOCK2(): boolean { return !this.keyConfigration.is1(); }
}
enum RawInput {
  UP, DOWN, LEFT, RIGHT
}
interface Input{
  isRight():boolean,
  isLeft():boolean,
  isUp():boolean,
  isDown():boolean,
  handle(player:Player):void
}
// step5 새로운 클래스 생성.
// step6 handle() 메소드 구현.
class right implements Input{
  handle(player:Player): void {
    player.moveHorizontal(1);
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
  handle(player:Player): void {
    player.moveHorizontal(-1);
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
  handle(player:Player): void {
    player.moveVertical(-1);
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
  handle(player:Player): void {
    player.moveVertical(1);
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

// step 8 이름 변경
let rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];


class Map{
  private map: Tile[][];
  getMap(){
    return this.map;
  }
  setMap(map:Tile[][]){
    this.map = map;
  }
  
  transtorm(){
    map.setMap(new Array(rawMap.length));
    for (let y = 0; y < rawMap.length; y++) {
      map.getMap()[y] = new Array(rawMap[y].length);
      for (let x = 0; x < rawMap[y].length; x++) {
        map.getMap()[y][x] = transtormTile(rawMap[y][x]);  
      }   
    }
  }
  update(){
    for (let y = map.getMap().length - 1; y >= 0; y--) {
      for (let x = 0; x < map.getMap()[y].length; x++) {
        map.getMap()[y][x].updateTile(x,y);
      }
    }
  }
  draw(g:CanvasRenderingContext2D){
    // Draw map
    for (let y = 0; y < map.getMap().length; y++) {
      for (let x = 0; x < map.getMap()[y].length; x++) {
        map.getMap()[y][x].draw(g, x, y); 
      }
    }
  }
}

// map 변경
//let map: Tile[][];
let map = new Map();


//let inputs: Input[] = [];
let inputs: Input[] = [];

// 메서드 전문화
function assertExhausted(tile:RawTile){
  return new Error("ERROR"+tile);
}
class keyConfigration{
  constructor(private color:string, private is_1:boolean, private removeStrategy:RemoveStrategy){
  }
  setColor(g:CanvasRenderingContext2D) {
    g.fillStyle = this.color;
  } 
  is1(){
    return this.is_1;
  }
  getremoveLock(){
    removeLock(this.removeStrategy);
  }
}
// 인터페이스 생성
interface RemoveStrategy{
  check(tile:Tile):boolean;
}

// 클래스 생성
class RemoveLock1 implements RemoveStrategy{
  check(tile: Tile): boolean {
    return tile.isLOCK1();
  }
}
// 클래스 생성
class RemoveLock2 implements RemoveStrategy{
  check(tile: Tile): boolean {
    return tile.isLOCK2();
  }
}
const YELLOW_KEY = new keyConfigration("#ffcc00", true , new RemoveLock1());
const BLUE_KEY   = new keyConfigration("#00ccff", false, new RemoveLock2());

// 메서드 전문화
function transtormTile(tile: RawTile){
  switch(tile){
    case RawTile.AIR: return new Air();
    case RawTile.PLAYER: return new PlayerTile();
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

function removeLock(removeStrategy:RemoveStrategy) {
  for (let y = 0; y < map.getMap().length; y++) {
    for (let x = 0; x < map.getMap()[y].length; x++) {
      if (removeStrategy.check(map.getMap()[y][x])) {
        map.getMap()[y][x] = new Air();
      }
    }
  }
}

function update() {
  handleInputs(); // 
  map.update();
}

function handleInputs(){
  while (inputs.length > 0) {
    let current = inputs.pop();
    current.handle(player);
  }
}

function draw() {
  let g = createGraphice();
  map.draw(g);
  player.draw(g);
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
  map.transtorm();
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