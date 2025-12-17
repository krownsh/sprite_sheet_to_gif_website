# Pixel Sprite Studio (Standalone)

這是一個從專案中萃取出的獨立網頁應用，用於處理像素精靈 (Pixel Sprite) 的生成、去背、組裝與換裝。

## 功能
1. **素材工廠**: 
   - 上傳圖片或使用 AI 生成 (需自行串接 API)。
   - 自動去背 (Flood Fill 演算法)。
   - 自動物件偵測與重新排列 (Blob Detection)。
   - 生成標準 Sprite Sheet。
2. **衣帽間**:
   - 角色與配飾的組合預覽。
   - 實時動畫預覽 (走路/跳動)。
   - Gizmo 編輯器: 調整配飾的位置、旋轉、縮放與跳動幅度 (Bobbing)。

## 使用方式
1. 直接在瀏覽器中打開 `index.html` 即可使用。
2. 為了獲得最佳體驗 (避免 Canvas 跨域問題)，建議使用簡易的 Local Server 運行：
   - VS Code: 安裝 "Live Server" 插件並點擊 "Go Live"。
   - Python: `python -m http.server 8000`
   - Node: `npx serve .`

## 開發者說明
- 核心邏輯位於 `app.js`。
- 樣式位於 `styles.css` (Vanilla CSS)。
- 無需編譯，原生 JS 實作。
- 若要串接真實的文生圖 API，請修改 `app.js` 中的 `els.btns.generate.onclick` 事件。

## 檔案結構
- `index.html`: 主介面
- `styles.css`: 樣式表
- `app.js`: 核心邏輯 (Canvas 處理、狀態管理)
