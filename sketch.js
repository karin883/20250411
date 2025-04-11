let snowflakes = []; // 儲存雪花的位置和旋轉角度
let lastMouseX = 0; // 儲存上一次滑鼠的 X 座標
let menu; // 儲存選單元素

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#f7e1d7'); // 設定背景顏色
  for (let i = 0; i < 30; i++) { // 隨機生成 30 個雪花
    snowflakes.push({ 
      x: random(width), // 隨機 X 座標
      y: random(height), 
      angle: random(TWO_PI), // 初始旋轉角度
      speed: random(0.0005, 0.005), // 調整為更慢的旋轉速度
      size: random(15, 60) // 固定大小
    });
  }
  menu = document.querySelector('.menu'); // 選取選單元素
}

function draw() {
  background('#f7e1d7'); // 確保背景顏色一致
  for (let flake of snowflakes) {
    flake.angle += flake.speed; // 更新旋轉角度
    flake.x += cos(flake.angle) * 0.5; // 水平緩慢移動
    flake.y += sin(flake.angle) * 0.5; // 垂直緩慢移動
    if (flake.x > width) flake.x = 0; // 畫布邊界處理
    if (flake.x < 0) flake.x = width; // 畫布邊界處理
    if (flake.y > height) flake.y = 0; // 畫布邊界處理
    if (flake.y < 0) flake.y = height;
    drawSnowflake(flake.x, flake.y, flake.size, flake.angle); // 使用固定大小
  }
  if (mouseY < 250) {
    menu.classList.add('show'); // 顯示選單
  } else {
    menu.classList.remove('show'); // 隱藏選單
  }
}

function drawSnowflake(x, y, size, angle) {
  push();// 保存當前狀態
  translate(x, y);
  rotate(angle); // 讓雪花自轉
  stroke(255); // 設定雪花顏色為白色
  strokeWeight(1);// 設定雪花邊框粗細
  noFill();
  for (let i = 0; i < 6; i++) { // 繪製六邊對稱的雪花
    line(0, 0, size / 2, 0);// 繪製雪花的主幹
    rotate(PI / 3);// 旋轉 60 度
  }
  pop();// 恢復之前的變換狀態
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
}
