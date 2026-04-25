let seaweeds = []; // 用來儲存所有水草的陣列
let bubbles = [];  // 用來儲存氣泡的陣列

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 產生 120 條水草的隨機屬性
  for (let i = 0; i < 120; i++) {
    seaweeds.push({
      x: random(width),                     // 位置：視窗最左到最右隨機分佈
      hRatio: random(0.2, 0.5),             // 高度：視窗高度的 20% ~ 50%
      weight: random(35, 50),               // 粗細：35 ~ 50
      col: color(random(255), random(255), random(255), 150), // 顏色：隨機顏色配上 150 的透明度
      speed: random(0.005, 0.02),           // 搖晃速度：隨機不一
      offset: random(1000)                  // 噪音偏移：確保每條水草形狀不同
    });
  }

  // 產生 50 個氣泡
  for (let i = 0; i < 50; i++) {
    bubbles.push({
      x: random(width),
      y: random(height),
      size: random(5, 15),
      speed: random(1, 3)
    });
  }
}

function draw() {
  background('#dd6fc5');

  // 每 1.2 秒 (約 72 禎) 更新一次所有水草的顏色，每根顏色隨機
  if (frameCount % 72 === 0) {
    for (let s of seaweeds) {
      s.col = color(random(255), random(255), random(255), 150);
    }
  }

  // 繪製氣泡
  noStroke();
  fill(255, 100); // 半透明白色
  for (let b of bubbles) {
    circle(b.x, b.y, b.size);
    b.y -= b.speed;       // 向上飄
    b.x += random(-1, 1); // 左右輕微擺動
    if (b.y < -b.size) {  // 飄出畫面後重置到底部
      b.y = height + b.size;
      b.x = random(width);
    }
  }

  noFill();
  
  blendMode(BLEND); // 設定混合模式，讓半透明顏色自然疊加
  // 繪製每一條水草
  for (let s of seaweeds) {
    stroke(s.col);
    strokeWeight(s.weight);
    
    beginShape();
    let numPoints = 20; 
    let plantHeight = height * s.hRatio;
    let spacing = plantHeight / numPoints;

    for (let i = 0; i < numPoints; i++) {
      let y = height - (i * spacing);
      // 使用個別的 offset 和 speed 讓每條水草動態都不一樣
      let noiseVal = noise(i * 0.05 + s.offset, frameCount * s.speed);
      let x = s.x + map(noiseVal, 0, 1, -50, 50) * (i / numPoints);
      
      curveVertex(x, y);
      if (i === 0 || i === numPoints - 1) curveVertex(x, y);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}