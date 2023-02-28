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
  moveHorizontal(player:Player, tile:Tile, dx: number): void,
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
  pushHorizontal(tile: Tile, dx: number){
    if(map[this.y][this.x + dx + dx].isAIR()
    && !map[this.y + 1][this.x + dx].isAIR()) {
      map[this.y][this.x + dx + dx] = map[this.y][this.x + dx];
      this.moveToTile(this.x + dx, this.y);
    }
  }
  moveHorizontal(dx:number){
    map[this.y][this.x+dx].moveHorizontal(this, dx);
  }
  moveVertical(dy:number){
    this.moveToTile(this.x, this.y + dy);
  }
  move(dx: number, dy: number){
    this.moveToTile(this.x+dx, this.y+dy);
  }
  moveToTile(newx: number, newy: number) {
    map[this.y][this.x] = new Air();
    map[newy][newx]            = new PlayerTile();
    this.x = newx;
    this.y = newy;
  }
}
let player = new Player();

// 클래스 생성.
class Falling implements FallingState{
  drop(tile: Tile, x: number, y: number): void {
      map[y + 1][x] = tile;
      map[y][x] = new Air();
  }
  moveHorizontal(player:Player, tile: Tile, dx: number): void {
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
  moveHorizontal(player:Player, tile: Tile, dx: number): void {
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
    this.falling = map[y + 1][x].getBlockOnTopState();
    this.falling.drop(tile,x,y); 
  }
  moveHorizontal(player:Player, tile:Tile, dx:number){
    this.falling.moveHorizontal(player, tile, dx);
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
  }
  moveHorizontal(player:Player, dx: number): void {
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
  }
  moveHorizontal(player:Player, dx: number): void {
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
    this.fallStrategy.moveHorizontal(player, this, dx);
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
    this.fallStrategy.moveHorizontal(player, this, dx);
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
    player.moveVertical(dy);
  }
  moveHorizontal(player:Player, dx: number): void {
    this.keyConfigration.getremoveLock();
    player.moveHorizontal(dx);
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
//    map[player.getY()][player.getX() + 1].moveHorizontal(player, 1);
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
//    map[player.getY()][player.getX() + -1].moveHorizontal(player, -1);
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
//    map[player.getY()-1][player.getX()].moveVertical(player, -1);
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
    //map[player.getY()+1][player.getX()].moveVertical(player, 1);
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

// map 변경
let map: Tile[][];


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
function transtormMap(){
  map = new Array(rawMap.length);
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length);
    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transtormTile(rawMap[y][x]);  
    }   
  }
}

function removeLock(removeStrategy:RemoveStrategy) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (removeStrategy.check(map[y][x])) {
        map[y][x] = new Air();
      }
    }
  }
}

function moveToTile(player:Player, newx: number, newy: number) {
  player.moveToTile(newx, newy);
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
    current.handle(player);
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
      map[y][x].updateTile(x,y);
    }
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