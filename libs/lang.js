/**
 * Simple I18n Manager
 * Supports: zh-TW, en, ja, ko, th, vi, id, ms, fr, de, es
 */
const Lang = {
    current: 'zh-TW', // Default
    translations: {
        'zh-TW': {
            meta: {
                description: 'Pixel Sprite Studio 是一個強大的線上像素精靈製作工具。輕鬆去背、組裝角色、調整動畫，並輸出為 PNG 或 GIF 動圖。適合遊戲開發者與像素藝術愛好者。',
                keywords: '像素製作, Sprite Maker, sprite sheet, 去背工具, 像素藝術, Pixel Art, 遊戲素材, GIF 產生器'
            },
            'app.title': 'Pixel Sprite Studio - 像素精靈製作與編輯工具',
            'ui.brand': 'Pixel Sprite Studio',
            'ui.settings': '設置',
            'ui.library': '素材庫',
            'ui.add': '新增',
            'ui.tab.character': '角色',
            'ui.tab.accessory': '配飾',
            'ui.preview.title': '實時預覽',
            'ui.preview.desc': '最終輸出效果',
            'ui.editor.title': '編輯器',
            'ui.editor.desc': '調整配飾位置與大小',
            'ui.controls.title': '配飾調整',
            'ui.msg.no_selection': '請選中配飾以編輯',
            'ctrl.bobbing': '跳動幅度 (Bobbing)',
            'ctrl.scale': '縮放 (Scale)',
            'ctrl.rotation': '旋轉 (Rotation)',
            'ctrl.zoom': '角色縮放 (Zoom) [預覽]',
            'ctrl.bgcolor': '背景顏色 / 透明',
            'ctrl.transparent': '透明背景',
            'ctrl.bg_desc': '影響預覽與輸出；勾選透明時忽略顏色。',
            'btn.save_png': '輸出 PNG',
            'btn.save_gif': '輸出 GIF',
            'tutorial.title': '快速上手指南',
            'tutorial.subtitle': '三步驟輕鬆完成專屬像素精靈！',
            'step.1.title': '1. 素材生成 (Upload)',
            'step.1.desc': '開啟「素材生成工廠」，上傳您的圖片。調整去背容許度，讓 Nano Banana 幫您自動去背並提取物件！',
            'step.2.title': '2. 角色組裝 (Equip)',
            'step.2.desc': '在左側庫存點選角色與配飾。點擊配件即可裝備，享受自由搭配的樂趣！',
            'step.3.title': '3. 細節調整 (Edit)',
            'step.3.desc': '使用下方編輯器微調位置、旋轉與動畫跳動幅度。完成後點擊下載，將您的作品帶回家！',
            'factory.title': '素材生成工廠',
            'factory.tab.char': '角色生成',
            'factory.tab.acc': '配飾生成',
            'factory.source': '來源',
            'factory.preview.placeholder': '請上傳圖片',
            'factory.tolerance': '去背容許度 (Tolerance):',
            'factory.bg.status': '背景色',
            'factory.bg.auto': '自動',
            'factory.bg.manual': '手動',
            'factory.bg.picking': '吸取中',
            'factory.bg.pick_btn': '手動吸取背景色',
            'factory.bg.cancel_prod': '取消吸取',
            'factory.bg.reset_btn': '回到自動',
            'factory.bg.hint.auto': '自動：取四角多數顏色。手動：按「吸取背景色」後點圖（5×5 平均）。',
            'factory.bg.hint.picking': '吸取中：點擊上方圖片的背景色（5×5 平均），或按 Esc / 點「取消吸取」。',
            'factory.bg.hint.manual': '手動：已覆寫背景色。可再次吸取或按「回到自動」恢復自動偵測。',
            'factory.frames': '目標格數 (Frames):',
            'factory.select_method': '格擷取方式',
            'factory.select_desc': '依像素數量：較能過濾雜點；原圖順序：保留排列但可能保留雜點；自定義排列：拖拉排序 / 刪除格子。',
            'factory.method.size': '依像素數量（去雜質）',
            'factory.method.order': '原圖順序（左至右，上至下）',
            'factory.method.custom': '自定義排列',
            'factory.custom_hint': '拖拉格子可重新排序，叉叉可移除。重新上傳或切換模式會重置自定義排列。',
            'btn.add_to_library': '加入庫存',
            'msg.added': '已加入庫存',
            'msg.upload_first': '請先上傳圖片',
            'msg.saved_png': '已下載組合圖片',
            'msg.no_char': '請先選擇角色',
            'msg.no_obj': '未偵測到物件',

            // New Navbar/Footer
            'nav.about': '關於我們',
            'nav.faq': '常見問題',
            'nav.blog': '教學部落格',
            'nav.privacy': '隱私政策',
            'nav.terms': '服務條款',
            'nav.contact': '聯絡我們',
            'nav.home': '回首頁',

            // Hero Section
            'hero.title': '釋放你的創意，客製化專屬像素精靈',
            'hero.desc': 'Pixel Sprite Studio 是一個強大的線上像素精靈製作工具。輕鬆去背、組裝角色、調整動畫。',

            // About Us
            'info.about.title': '關於 Pixel Sprite Studio',
            'info.about.content': 'Pixel Sprite Studio 誕生於對像素藝術的熱愛。我們致力於為獨立遊戲開發者、數位藝術家以及所有熱愛復古美學的人提供最直觀、流暢的像素精靈製作體驗。無論是簡單的角色組裝還是複雜的動畫調整，我們的工具都能幫助您專注於創意，而非繁琐的技術細節。',

            // FAQ
            'info.faq.title': '常見問題 (FAQ)',
            'info.faq.q1': '如何匯出我的作品？',
            'info.faq.a1': '點擊右側面板的「輸出 PNG」或「輸出 GIF」按鈕，系統會自動處理並提示下載。',
            'info.faq.q2': '我可以商業使用產出的素材嗎？',
            'info.faq.a2': '如果您是使用自己上傳的素材進行編輯，您擁有完整的版權。內建素材請參考我們的服務條款。',
            'info.faq.q3': '支持哪些圖片格式？',
            'info.faq.a3': '目前支持主流的 PNG, JPG 格式上傳，並能輸出帶有透明背景的 PNG 與動畫 GIF。',

            // Privacy Policy
            'info.privacy.title': '隱私權政策',
            'info.privacy.content': '我們非常重視您的隱私。本站不會主動搜集您的個人識別資料。所有的圖片處理均在您的瀏覽器本地完成，或透過加密連線傳輸至我們的伺服器進行處理，處理後我們不會保留您的原始圖片檔案。我們使用 Google AdSense 服務來展示廣告，這可能會使用 Cookie 來提供您感興趣的廣告內容。',

            // Terms
            'info.terms.title': '服務條款',
            'info.terms.content': '歡迎使用 Pixel Sprite Studio。使用本網站即表示您同意遵守以下條款：您不得利用本工具製作非法、侵權或令人反感的內容。我們不對使用本工具產生的任何間接損害承擔責任。本站保留隨時更新功能與調整條款的權利。',

            // Contact
            'info.contact.title': '聯絡我們',
            'info.contact.content': '如果您有任何建議、錯誤回報或商業合作提案，歡迎聯繫我們：\\nEmail: contact@pixel-sprite-studio.com\\n我們通常會在 1-3 個工作天內回覆。',

            // Blog Posts
            'blog.p1.title': '像素精靈製作入門：從零開始創作者指南',
            'blog.p1.summary': '了解像素藝術的基本原則，從網格設定到色彩選擇，一步步打造您的第一個像素角色。',
            'blog.p1.content': '像素藝術（Pixel Art）是一種經久不衰的數位藝術形式，它依賴著單個像素的精確排列來構建圖像。在製作像素精靈時，比例（Scale）與解析度（Resolution）是首要考慮的因素。對於初學者，建議從 16x16 或 32x32 的畫布開始，以免被過大的範圍分散注意力。像素藝術的精髓在於「限制」，在有限的像素與色彩中表現出細節。\\n\\n色彩的選擇同樣關鍵。使用受限的色盤（Limited Color Palette）能讓作品展現出獨特的復古韻味與視覺一致性。在創作過程中，請確保您的線條是「乾淨」的，避開所謂的「雙重線」現象，這能讓角色輪廓更分明。此外，光影處理（Shading）也是提升質感的秘訣。透過三段色（亮部、中間色、陰影）的運用，可以讓平面的像素圖展現出立體感。\\n\\n在 Pixel Sprite Studio 中，您可以將這些完成的小圖上傳到「素材工廠」。我們建議您在繪製時保持背景為單一純色，這將大幅提升去背的精確度。當您完成多個組件（如頭部、身體、頭髮）後，進入我們的組裝介面，您就能看到這些像素點是如何構成一個活生生的遊戲角色的。記住，像素藝術的核心是耐性與對細微差別的觀察，每一次點擊都是在為您的數位世界添磚加瓦。',

            'blog.p2.title': '什麼是 Sprite Sheet？遊戲開發者必備基礎知識',
            'blog.p2.summary': '深入解析 Sprite Sheet 的運作原理，以及如何優化您的遊戲素材資源。',
            'blog.p2.content': '在遊戲開發中，Sprite Sheet（精靈圖集）是一種將多張小圖整合進一張大圖的常見技術。這不僅能減少檔案載入的次數（減少 HTTP 請求），還能顯著提升遊戲引擎的渲染效能。對於一個 2D 遊戲來說，所有角色的行走、攻擊、跳躍動作都應該被存放到一張或幾張 Sprite Sheet 中，讓 GPU 能夠更有效率地處理紋理切換。\\n\\n一個標準的循環動畫通常包含 4 到 8 幀的動作。在設計 Sprite Sheet 時，幀與幀之間的間距（Padding）與偏移量（Offset）必須保持一致，否則在遊戲執行時角色會出現抖動感。我們的工具特別優化了這個過程，當您在「素材工廠」擷取格位時，您可以選擇「依像素數量」或「原圖順序」，系統會自動計算每格的邊界。\\n\\n此外，為了讓開發者更輕鬆，我們支持匯出帶有透明通道的 PNG。這意味著您的角色可以直接放入 Unity、Godot 或 Phaser 等引擎，而不需要額外處理背景。優化 Sprite Sheet 的另一個技巧是「空間最大化」，也就是盡可能收緊每幀的邊緣，去除多餘的透明像素。在 Pixel Sprite Studio 中，去背功能會自動幫您完成這項繁瑣的工作，確保您的遊戲素材既美觀又高效。掌握了 Sprite Sheet 的邏輯，您就掌握了 2D 遊戲流暢度的鎖鑰。',

            'blog.p3.title': '優化您的像素動畫：流暢度與細節調整技巧',
            'blog.p3.summary': '提升動畫質感的秘訣，包括如何利用運動曲線與反彈效果增加角色活力。',
            'blog.p3.content': '流暢的動畫是像素角色的靈魂。如果只是單純地循環幾張圖片，角色往往會顯得僵硬。要讓動畫「動起來」，關鍵在於微小的節奏變化。首先是「跳動效果」（Bobbing），在待機動畫中加入 1-2 像素的高度變化，能模擬生物的呼吸或身體起伏。這就是為什麼我們在編輯器中特別加入了 Bobbing 參數，讓您可以一鍵增強角色的生命感。\\n\\n一個重要的概念是「擠壓與拉伸」（Squash and Stretch）。當角色跳躍或著地時，像素形態的微調能表現出動能。雖然像素藝術受限於格子，但您可以透過改變色塊的寬窄來模擬這種物理效果。此外，旋轉（Rotation）也是裝備表現力的來源。在 Pixel Sprite Studio 中，您可以針對頭髮、武器等配飾單獨調整旋轉角度，甚至讓它們隨著身體的跳動幅度進行相位差旋轉，這會產生非常真實的律動。\\n\\n最後，不要忽視「色彩動畫」。例如在受傷或充能時，改變部分像素的亮度能產生閃爍效果。我們的實時預覽介面能讓您一邊調整數值一邊觀察結果，這是提升動畫質感的最高效率途徑。記住，優秀的動畫不在於幀數的多寡，而在於每一幀是否都精確傳達了運動的方向與力度。善用本工具的各項細節控制項，您也能做出專業級的像素動態效果。'
        },
        'en': {
            meta: {
                description: 'Pixel Sprite Studio is a powerful online tool for creating pixel art sprites. Remove backgrounds, assemble characters, adjust animations, and export as PNG or GIF. Perfect for game devs and artists.',
                keywords: 'pixel art, sprite maker, sprite sheet, background remover, game assets, gif generator, pixel editor'
            },
            'app.title': 'Pixel Sprite Studio - Sprite Maker & Editor',
            'ui.brand': 'Pixel Sprite Studio',
            'ui.settings': 'Settings',
            'ui.library': 'Library',
            'ui.add': 'Add',
            'ui.tab.character': 'Character',
            'ui.tab.accessory': 'Accessory',
            'ui.preview.title': 'Live Preview',
            'ui.preview.desc': 'Final Output',
            'ui.editor.title': 'Editor',
            'ui.editor.desc': 'Adjust Position & Size',
            'ui.controls.title': 'Adjustments',
            'ui.msg.no_selection': 'Select an accessory to edit',
            'ctrl.bobbing': 'Bobbing',
            'ctrl.scale': 'Scale',
            'ctrl.rotation': 'Rotation',
            'ctrl.zoom': 'View Zoom [Preview]',
            'ctrl.bgcolor': 'Background Color / Transparent',
            'ctrl.transparent': 'Transparent',
            'ctrl.bg_desc': 'Affects preview & output; overrides color when checked.',
            'btn.save_png': 'Export PNG',
            'btn.save_gif': 'Export GIF',
            'tutorial.title': 'Quick Start Guide',
            'tutorial.subtitle': 'Create your custom pixel sprite in 3 steps!',
            'step.1.title': '1. Generate (Upload)',
            'step.1.desc': 'Open "Sprite Factory", upload your image. Adjust tolerance to auto-remove background and extract sprites!',
            'step.2.title': '2. Assemble (Equip)',
            'step.2.desc': 'Select characters and accessories from the library. Click to equip and mix & match freely!',
            'step.3.title': '3. Edit (Adjust)',
            'step.3.desc': 'Use the editor to tweak position, rotation, and bobbing. Click export to take your sprite home!',
            'factory.title': 'Sprite Factory',
            'factory.tab.char': 'Character',
            'factory.tab.acc': 'Accessory',
            'factory.source': 'Source',
            'factory.preview.placeholder': 'Please upload an image',
            'factory.tolerance': 'Tolerance:',
            'factory.bg.status': 'BG Color',
            'factory.bg.auto': 'Auto',
            'factory.bg.manual': 'Manual',
            'factory.bg.picking': 'Picking',
            'factory.bg.pick_btn': 'Pick Color',
            'factory.bg.cancel_prod': 'Cancel',
            'factory.bg.reset_btn': 'Reset Auto',
            'factory.bg.hint.auto': 'Auto: Majority color from corners. Manual: Click "Pick Color" then click image.',
            'factory.bg.hint.picking': 'Picking: Click background on image (5x5 avg), or Esc / Cancel.',
            'factory.bg.hint.manual': 'Manual: Overridden. Pick again or Reset to Auto.',
            'factory.frames': 'Target Frames:',
            'factory.select_method': 'Extraction Method',
            'factory.select_desc': 'Size: Filters noise; Order: Preserves layout; Custom: Drag & Drop.',
            'factory.method.size': 'By Pixel Size (Clean)',
            'factory.method.order': 'Original Order (L-R, T-B)',
            'factory.method.custom': 'Custom Order',
            'factory.custom_hint': 'Drag to reorder, click X to remove. Reset on re-upload or mode switch.',
            'btn.add_to_library': 'Add to Library',
            'msg.added': 'Added to Library',
            'msg.upload_first': 'Please upload an image first',
            'msg.saved_png': 'Composition saved',
            'msg.no_char': 'Please select a character first',
            'msg.no_obj': 'No objects detected',

            // New Navbar/Footer
            'nav.about': 'About Us',
            'nav.faq': 'FAQ',
            'nav.blog': 'Blog',
            'nav.privacy': 'Privacy Policy',
            'nav.terms': 'Terms',
            'nav.contact': 'Contact',
            'nav.home': 'Home',

            // Hero Section
            'hero.title': 'Unleash Your Creativity with Custom Pixel Sprites',
            'hero.desc': 'Pixel Sprite Studio is a powerful online tool for creating pixel art sprites. Easily remove backgrounds, assemble characters, and adjust animations.',

            // About Us
            'info.about.title': 'About Pixel Sprite Studio',
            'info.about.content': 'Pixel Sprite Studio was born from a passion for pixel art. We are committed to providing independent game developers, digital artists, and retro aesthetic enthusiasts with the most intuitive and smooth pixel sprite creation experience. Whether it is simple character assembly or complex animation adjustment, our tools can help you focus on creativity rather than tedious technical details.',

            // FAQ
            'info.faq.title': 'Frequently Asked Questions (FAQ)',
            'info.faq.q1': 'How to export my work?',
            'info.faq.a1': 'Click the "Export PNG" or "Export GIF" buttons on the right panel, and the system will automatically process and prompt for download.',
            'info.faq.q2': 'Can I use the generated assets commercially?',
            'info.faq.a2': 'If you use your own uploaded assets for editing, you have full copyright. For built-in assets, please refer to our Terms of Service.',
            'info.faq.q3': 'Which image formats are supported?',
            'info.faq.a3': 'Currently supports mainstream PNG and JPG uploads, and can export PNGs with transparent backgrounds and animated GIFs.',

            // Privacy Policy
            'info.privacy.title': 'Privacy Policy',
            'info.privacy.content': 'We take your privacy seriously. This site does not actively collect your personally identifiable information. All image processing is done locally in your browser or transmitted to our server via an encrypted connection for processing; we do not keep your original image files after processing. We use Google AdSense to display advertisements, which may use cookies to provide interest-based advertising.',

            // Terms
            'info.terms.title': 'Terms of Service',
            'info.terms.content': 'Welcome to Pixel Sprite Studio. By using this website, you agree to comply with the following terms: You may not use this tool to create illegal, infringing, or objectionable content. We are not liable for any indirect damages resulting from the use of this tool. This site reserves the right to update functions and adjust terms at any time.',

            // Contact
            'info.contact.title': 'Contact Us',
            'info.contact.content': 'If you have any suggestions, bug reports, or business cooperation proposals, please feel free to contact us:\\nEmail: contact@pixel-sprite-studio.com\\nWe usually respond within 1-3 business days.',

            // Blog Posts
            'blog.p1.title': 'Pixel Sprite Creation 101: A Creator\'s Guide',
            'blog.p1.summary': 'Learn the basic principles of pixel art, from grid settings to color selection, and build your first pixel character step by step.',
            'blog.p1.content': 'Pixel Art is a timeless digital art form that relies on the precise arrangement of individual pixels to build images. When making pixel sprites, Scale and Resolution are the primary factors to consider. For beginners, it is recommended to start with a 16x16 or 32x32 canvas to avoid being overwhelmed by a large area. The essence of pixel art lies in "restriction," expressing detail within limited pixels and colors.\\n\\nColor choice is also crucial. Using a Limited Color Palette can give your work a unique retro charm and visual consistency. During the creation process, ensure your lines are "clean," avoiding the phenomenon known as "double lines," which helps make character outlines more distinct. Additionally, Shading is the secret to enhancing quality. By using a three-tone system (highlights, midtones, shadows), you can give your flat pixel art a three-dimensional feel.\\n\\nIn Pixel Sprite Studio, you can upload these finished sprites to the "Sprite Factory." We recommend keeping the background a single solid color when drawing, which will significantly improve the accuracy of background removal. Once you have completed multiple components (such as head, body, hair), enter our assembly interface, and you can see how these pixels constitute a lifelike game character. Remember, the core of pixel art is patience and observation of subtle differences; every click is adding a block to your digital world.',

            'blog.p2.title': 'What is a Sprite Sheet? Essential Knowledge for Game Developers',
            'blog.p2.summary': 'In-depth analysis of how Sprite Sheets work and how to optimize your game asset resources.',
            'blog.p2.content': 'In game development, a Sprite Sheet is a common technique that integrates multiple small images into one large image. This not only reduces the number of file loads (reducing HTTP requests) but also significantly improves game engine rendering performance. For a 2D game, all character movements such as walking, attacking, and jumping should be stored in one or several Sprite Sheets, allowing the GPU to handle texture switching more efficiently.\\n\\nA standard looping animation usually consists of 4 to 8 frames. When designing a Sprite Sheet, the Padding and Offset between frames must remain consistent; otherwise, the character will appear jittery during game execution. Our tool specifically optimizes this process; when you extract frames in the "Sprite Factory," you can choose "By Pixel Size" or "Original Order," and the system will automatically calculate the boundaries of each frame.\\n\\nFurthermore, to make it easier for developers, we support exporting PNGs with an alpha channel. This means your characters can be placed directly into engines like Unity, Godot, or Phaser without additional background processing. Another tip for optimizing Sprite Sheets is "space maximization," which means tightening the edges of each frame as much as possible to remove redundant transparent pixels. In Pixel Sprite Studio, the background removal function will automatically complete this task for you, ensuring your game assets are both beautiful and efficient. Mastering the logic of Sprite Sheets gives you the key to 2D game smoothness.',

            'blog.p3.title': 'Optimizing Your Pixel Animation: Tips for Smoothness and Detail',
            'blog.p3.summary': 'Secrets to improving animation texture, including how to use motion curves and bounce effects to add vitality to characters.',
            'blog.p3.content': 'Smooth animation is the soul of a pixel character. If you simply cycle through a few images, the character will often appear stiff. The key to making an animation "come alive" lies in subtle rhythm changes. First is the "Bobbing effect," adding a 1-2 pixel height variation in the idle animation to simulate biological breathing or body fluctuations. This is why we have specifically added a Bobbing parameter in the editor, allowing you to enhance the life of your character with one click.\\n\\nAnother important concept is "Squash and Stretch." When a character jumps or lands, subtle adjustments to the pixel form can express kinetic energy. Although pixel art is limited by the grid, you can simulate this physical effect by changing the width or narrowness of color blocks. Additionally, Rotation is a source of expressiveness for equipment. In Pixel Sprite Studio, you can individually adjust the rotation angle for accessories like hair and weapons, and even have them rotate with a phase difference relative to the body\'s bobbing amplitude, creating a very realistic rhythm.\\n\\nFinally, do not overlook "color animation." For example, when damaged or charging, changing the brightness of some pixels can create a flickering effect. Our real-time preview interface allows you to adjust values while observing the results, which is the most efficient way to improve animation quality. Remember, excellent animation is not about the number of frames, but whether each frame accurately conveys the direction and force of motion. By skillfully using the detailed controls of this tool, you can also create professional-grade pixel dynamic effects.'
        },
        'ja': {
            meta: {
                description: 'Pixel Sprite Studioは、強力なオンラインドット絵スプライト作成ツールです。背景削除、キャラクター組み立て、アニメーション調整、PNGやGIFへの書き出しが簡単に行えます。',
                keywords: 'ドット絵, スプライト作成, スプライトシート, 背景透過, ゲーム素材, GIF作成, ピクセルアート'
            },
            'app.title': 'Pixel Sprite Studio - ドット絵エディタ & 生成',
            'ui.brand': 'Pixel Sprite Studio',
            'ui.settings': '設定',
            'ui.library': 'ライブラリ',
            'ui.add': '追加',
            'ui.tab.character': 'キャラクター',
            'ui.tab.accessory': 'アクセサリー',
            'ui.preview.title': 'プレビュー',
            'ui.preview.desc': '最終出力',
            'ui.editor.title': 'エディタ',
            'ui.editor.desc': '位置とサイズを調整',
            'ui.controls.title': 'プロパティ',
            'ui.msg.no_selection': 'アクセサリーを選択して編集',
            'ctrl.bobbing': '揺れ幅 (Bobbing)',
            'ctrl.scale': 'サイズ (Scale)',
            'ctrl.rotation': '回転 (Rotation)',
            'ctrl.zoom': '表示ズーム (Zoom)',
            'ctrl.bgcolor': '背景色 / 透明',
            'ctrl.transparent': '透明背景',
            'ctrl.bg_desc': 'プレビューと出力に影響します。チェック時は色を無視します。',
            'btn.save_png': 'PNG出力',
            'btn.save_gif': 'GIF出力',
            'tutorial.title': 'クイックスタート',
            'tutorial.subtitle': '3ステップであなただけのドット絵を作成！',
            'step.1.title': '1. 生成 (Upload)',
            'step.1.desc': '「スプライト工場」で画像をアップロード。許容値を調整して背景を自動削除し、パーツを抽出！',
            'step.2.title': '2. 組み立て (Equip)',
            'step.2.desc': 'ライブラリからキャラとアクセを選択。クリックで装備して自由に組み合わせよう！',
            'step.3.title': '3. 調整 (Edit)',
            'step.3.desc': 'エディタで位置や揺れを微調整。完成したら書き出しボタンでダウンロード！',
            'factory.title': 'スプライト工場',
            'factory.tab.char': 'キャラ生成',
            'factory.tab.acc': 'アクセ生成',
            'factory.source': 'ソース',
            'factory.preview.placeholder': '画像をアップロードしてください',
            'factory.tolerance': '許容値 (Tolerance):',
            'factory.bg.status': '背景色',
            'factory.bg.auto': '自動',
            'factory.bg.manual': '手動',
            'factory.bg.picking': 'スポイト中',
            'factory.bg.pick_btn': 'スポイトツール',
            'factory.bg.cancel_prod': 'キャンセル',
            'factory.bg.reset_btn': '自動に戻す',
            'factory.bg.hint.auto': '自動：四隅の色から判定。手動：「スポイト」で画像をクリック。',
            'factory.bg.hint.picking': 'スポイト中：背景色をクリック（5x5平均）、Escでキャンセル。',
            'factory.bg.hint.manual': '手動：設定済み。再指定するか「自動に戻す」を押してください。',
            'factory.frames': 'フレーム数:',
            'factory.select_method': '抽出モード',
            'factory.select_desc': 'サイズ順：ノイズ除去； 元順：レイアウト維持； カスタム：ドラッグ並べ替え。',
            'factory.method.size': 'サイズ順 (クリーン)',
            'factory.method.order': '元の順序 (左→右)',
            'factory.method.custom': 'カスタム並べ替え',
            'factory.custom_hint': 'ドラッグで並べ替え、×で削除。再アップロードでリセット。',
            'btn.add_to_library': 'ライブラリに追加',
            'msg.added': 'ライブラリに追加しました',
            'msg.upload_first': '先に画像をアップロードしてください',
            'msg.saved_png': '画像を保存しました',
            'msg.no_char': '先にキャラクターを選択してください',
            'msg.no_obj': 'オブジェクトが見つかりません'
        },
        'ko': {
            meta: {
                description: 'Pixel Sprite Studio는 강력한 온라인 픽셀 아트 스프라이트 제작 도구입니다. 배경 제거, 캐릭터 조립, 애니메이션 조정을 손쉽게 하고 PNG 또는 GIF로 내보내세요.',
                keywords: '픽셀 아트, 스프라이트 메이커, 도트 찍기, 배경 제거, 게임 자산, GIF 생성기'
            },
            'app.title': 'Pixel Sprite Studio - 픽셀 스프라이트 제작 도구',
            'ui.brand': 'Pixel Sprite Studio',
            'ui.settings': '설정',
            'ui.library': '라이브러리',
            'ui.add': '추가',
            'ui.tab.character': '캐릭터',
            'ui.tab.accessory': '액세서리',
            'ui.preview.title': '미리보기',
            'ui.preview.desc': '최종 결과물',
            'ui.editor.title': '에디터',
            'ui.editor.desc': '위치 및 크기 조정',
            'ui.controls.title': '속성',
            'ui.msg.no_selection': '편집할 액세서리를 선택하세요',
            'ctrl.bobbing': '움직임 (Bobbing)',
            'ctrl.scale': '크기 (Scale)',
            'ctrl.rotation': '회전 (Rotation)',
            'ctrl.zoom': '화면 확대 (Zoom)',
            'ctrl.bgcolor': '배경색 / 투명',
            'ctrl.transparent': '투명 배경',
            'ctrl.bg_desc': '미리보기 및 출력에 적용됩니다. 체크 시 색상 무시.',
            'btn.save_png': 'PNG 내보내기',
            'btn.save_gif': 'GIF 내보내기',
            'tutorial.title': '시작 가이드',
            'tutorial.subtitle': '3단계로 나만의 픽셀 캐릭터 완성!',
            'step.1.title': '1. 생성 (Upload)',
            'step.1.desc': '「스프라이트 공장」에서 이미지 업로드. 허용치를 조절해 배경을 자동 제거하고 파츠를 추출하세요!',
            'step.2.title': '2. 조립 (Equip)',
            'step.2.desc': '라이브러리에서 캐릭터와 장식을 선택. 클릭하여 장착하고 자유롭게 꾸며보세요!',
            'step.3.title': '3. 조정 (Edit)',
            'step.3.desc': '에디터로 위치와 애니메이션을 미세 조정. 완료되면 내보내기 버튼으로 다운로드!',
            'factory.title': '스프라이트 공장',
            'factory.tab.char': '캐릭터 생성',
            'factory.tab.acc': '장식 생성',
            'factory.source': '원본',
            'factory.preview.placeholder': '이미지를 업로드하세요',
            'factory.tolerance': '허용치 (Tolerance):',
            'factory.bg.status': '배경색',
            'factory.bg.auto': '자동',
            'factory.bg.manual': '수동',
            'factory.bg.picking': '스포이드',
            'factory.bg.pick_btn': '배경색 추출',
            'factory.bg.cancel_prod': '취소',
            'factory.bg.reset_btn': '자동 복귀',
            'factory.bg.hint.auto': '자동: 모서리 색상 기준. 수동: 「추출」 클릭 후 이미지 클릭.',
            'factory.bg.hint.picking': '추출 중: 배경 클릭 (5x5 평균), Esc로 취소.',
            'factory.bg.hint.manual': '수동: 설정됨. 다시 추출하거나 자동 복귀.',
            'factory.frames': '프레임 수:',
            'factory.select_method': '추출 모드',
            'factory.select_desc': '크기순: 노이즈 제거; 원래순서: 레이아웃 유지; 사용자지정: 드래그 정렬.',
            'factory.method.size': '크기순 (깔끔함)',
            'factory.method.order': '원래 순서 (좌-우)',
            'factory.method.custom': '사용자 지정 정렬',
            'factory.custom_hint': '드래그하여 재정렬, X로 삭제. 재업로드 시 초기화.',
            'btn.add_to_library': '라이브러리에 추가',
            'msg.added': '추가되었습니다',
            'msg.upload_first': '먼저 이미지를 업로드하세요',
            'msg.saved_png': '이미지가 저장되었습니다',
            'msg.no_char': '먼저 캐릭터를 선택하세요',
            'msg.no_obj': '객체를 찾을 수 없습니다'
        },
        'th': {
            meta: {
                description: 'Pixel Sprite Studio เป็นเครื่องมือออนไลน์ที่มีประสิทธิภาพสำหรับการสร้างพิกเซลอาร์ตสไปรต์ ลบพื้นหลัง ประกอบตัวละคร ปรับแต่งแอนิเมชั่น และส่งออกเป็น PNG หรือ GIF',
                keywords: 'พิกเซลอาร์ต, สร้างสไปรต์, ลบพื้นหลัง, ทรัพย์สินเกม, GIF, พิกเซล'
            },
            'app.title': 'Pixel Sprite Studio - สร้างและแก้ไขสไปรต์พิกเซล',
            'ui.brand': 'Pixel Sprite Studio',
            'ui.settings': 'ตั้งค่า',
            'ui.library': 'ไลบรารี',
            'ui.add': 'เพิ่ม',
            'ui.tab.character': 'ตัวละคร',
            'ui.tab.accessory': 'เครื่องประดับ',
            'ui.preview.title': 'พรีวิว',
            'ui.preview.desc': 'ผลลัพธ์สุดท้าย',
            'ui.editor.title': 'แก้ไข',
            'ui.editor.desc': 'ปรับตำแหน่งและขนาด',
            'ui.controls.title': 'ปรับแต่ง',
            'ui.msg.no_selection': 'เลือกเครื่องประดับเพื่อแก้ไข',
            'ctrl.bobbing': 'การเด้ง (Bobbing)',
            'ctrl.scale': 'ขนาด (Scale)',
            'ctrl.rotation': 'การหมุน (Rotation)',
            'ctrl.zoom': 'ซูมมุมมอง (Zoom)',
            'ctrl.bgcolor': 'สีพื้นหลัง / โปร่งใส',
            'ctrl.transparent': 'พื้นหลังโปร่งใส',
            'ctrl.bg_desc': 'มีผลกับพรีวิวและการส่งออก; หากติ๊กจะเพิกเฉยต่อสี',
            'btn.save_png': 'ส่งออก PNG',
            'btn.save_gif': 'ส่งออก GIF',
            'tutorial.title': 'คู่มือเริ่มต้น',
            'tutorial.subtitle': 'สร้างสไปรต์ของคุณใน 3 ขั้นตอน!',
            'step.1.title': '1. สร้าง (Upload)',
            'step.1.desc': 'เปิด "โรงงานสไปรต์" อัปโหลดภาพ ปรับค่าความคลาดเคลื่อนเพื่อลบพื้นหลังอัตโนมัติและแยกชิ้นส่วน!',
            'step.2.title': '2. ประกอบ (Equip)',
            'step.2.desc': 'เลือกตัวละครและเครื่องประดับจากไลบรารี คลิกเพื่อสวมใส่และผสมผสานได้ตามใจ!',
            'step.3.title': '3. ปรับแต่ง (Edit)',
            'step.3.desc': 'ใช้ตัวแก้ไขเพื่อปรับตำแหน่งและการเคลื่อนไหว เมื่อเสร็จแล้วคลิกส่งออกเพื่อบันทึกงานของคุณ!',
            'factory.title': 'โรงงานสไปรต์',
            'factory.tab.char': 'สร้างตัวละคร',
            'factory.tab.acc': 'สร้างของตกแต่ง',
            'factory.source': 'ต้นฉบับ',
            'factory.preview.placeholder': 'กรุณาอัปโหลดภาพ',
            'factory.tolerance': 'ความคลาดเคลื่อน:',
            'factory.bg.status': 'สีพื้นหลัง',
            'factory.bg.auto': 'อัตโนมัติ',
            'factory.bg.manual': 'กำหนดเอง',
            'factory.bg.picking': 'กำลังดูดสี',
            'factory.bg.pick_btn': 'ดูดสีพื้นหลัง',
            'factory.bg.cancel_prod': 'ยกเลิก',
            'factory.bg.reset_btn': 'รีเซ็ตเป็นอัตโนมัติ',
            'factory.bg.hint.auto': 'อัตโนมัติ: สีส่วนใหญ่จากมุมภาพ',
            'factory.bg.hint.picking': 'คลิกที่สีพื้นหลังในภาพ (เฉลี่ย 5x5) หรือกด Esc',
            'factory.bg.hint.manual': 'กำหนดเอง: ถูกเขียนทับแล้ว',
            'factory.frames': 'จำนวนเฟรม:',
            'factory.select_method': 'วิธีการแยก',
            'factory.select_desc': 'ขนาด: กรองจุดรบกวน; ลำดับ: คงเลย์เอาต์; กำหนดเอง: ลากวาง',
            'factory.method.size': 'ตามขนาด (สะอาด)',
            'factory.method.order': 'ลำดับเดิม',
            'factory.method.custom': 'กำหนดลำดับเอง',
            'factory.custom_hint': 'ลากเพื่อเรียงใหม่, X เพื่อลบ',
            'btn.add_to_library': 'เพิ่มลงไลบรารี',
            'msg.added': 'เพิ่มแล้ว',
            'msg.upload_first': 'กรุณาอัปโหลดภาพก่อน',
            'msg.saved_png': 'บันทึกภาพแล้ว',
            'msg.no_char': 'กรุณาเลือกตัวละครก่อน',
            'msg.no_obj': 'ไม่พบวัตถุ'
        },
        'vi': {
            meta: {
                description: 'Pixel Sprite Studio là công cụ trực tuyến mạnh mẽ để tạo sprite pixel art. Xóa nền, lắp ráp nhân vật, điều chỉnh hoạt ảnh và xuất ra PNG hoặc GIF.',
                keywords: 'pixel art, tạo sprite, xóa phông, tài nguyên game, tạo gif'
            },
            'app.title': 'Pixel Sprite Studio - Trình tạo & Chỉnh sửa Sprite',
            'ui.brand': 'Pixel Sprite Studio',
            'ui.settings': 'Cài đặt',
            'ui.library': 'Thư viện',
            'ui.add': 'Thêm',
            'ui.tab.character': 'Nhân vật',
            'ui.tab.accessory': 'Phụ kiện',
            'ui.preview.title': 'Xem trước',
            'ui.preview.desc': 'Kết quả xuất',
            'ui.editor.title': 'Trình chỉnh sửa',
            'ui.editor.desc': 'Chỉnh vị trí & kích thước',
            'ui.controls.title': 'Điều chỉnh',
            'ui.msg.no_selection': 'Chọn phụ kiện để sửa',
            'ctrl.bobbing': 'Độ nhún (Bobbing)',
            'ctrl.scale': 'Tỷ lệ (Scale)',
            'ctrl.rotation': 'Xoay (Rotation)',
            'ctrl.zoom': 'Thu phóng (Zoom)',
            'ctrl.bgcolor': 'Màu nền / Trong suốt',
            'ctrl.transparent': 'Nền trong suốt',
            'ctrl.bg_desc': 'Ảnh hưởng đến xem trước và xuất file.',
            'btn.save_png': 'Xuất PNG',
            'btn.save_gif': 'Xuất GIF',
            'tutorial.title': 'Hướng dẫn nhanh',
            'tutorial.subtitle': 'Tạo sprite của bạn trong 3 bước!',
            'step.1.title': '1. Tạo (Upload)',
            'step.1.desc': 'Mở "Xưởng Sprite", tải ảnh lên. Chỉnh độ sai số để tự động xóa nền và tách vật thể!',
            'step.2.title': '2. Lắp ráp (Equip)',
            'step.2.desc': 'Chọn nhân vật và phụ kiện từ thư viện. Nhấn để trang bị và phối đồ tự do!',
            'step.3.title': '3. Chỉnh sửa (Edit)',
            'step.3.desc': 'Dùng trình chỉnh sửa để tinh chỉnh. Nhấn nút xuất để tải về tác phẩm của bạn!',
            'factory.title': 'Xưởng Sprite',
            'factory.tab.char': 'Tạo NV',
            'factory.tab.acc': 'Tạo PK',
            'factory.source': 'Nguồn',
            'factory.preview.placeholder': 'Vui lòng tải ảnh',
            'factory.tolerance': 'Độ sai số:',
            'factory.bg.status': 'Màu nền',
            'factory.bg.auto': 'Tự động',
            'factory.bg.manual': 'Thủ công',
            'factory.bg.picking': 'Đang chọn',
            'factory.bg.pick_btn': 'Chọn màu nền',
            'factory.bg.cancel_prod': 'Hủy',
            'factory.bg.reset_btn': 'Về tự động',
            'factory.bg.hint.auto': 'Tự động: Lấy màu đa số từ góc.',
            'factory.bg.hint.picking': 'Click vào màu nền trên hình (TB 5x5) hoặc Esc.',
            'factory.bg.hint.manual': 'Thủ công: Đã ghi đè.',
            'factory.frames': 'Số khung hình:',
            'factory.select_method': 'Cách trích xuất',
            'factory.select_desc': 'Kích thước: Lọc nhiễu; Thứ tự: Giữ bố cục; Tùy chỉnh: Kéo thả.',
            'factory.method.size': 'Theo kích thước',
            'factory.method.order': 'Thứ tự gốc',
            'factory.method.custom': 'Tùy chỉnh thứ tự',
            'factory.custom_hint': 'Kéo để sắp xếp, X để xóa.',
            'btn.add_to_library': 'Thêm vào kho',
            'msg.added': 'Đã thêm vào kho',
            'msg.upload_first': 'Vui lòng tải ảnh trước',
            'msg.saved_png': 'Đã lưu ảnh',
            'msg.no_char': 'Chọn nhân vật trước',
            'msg.no_obj': 'Không tìm thấy vật thể'
        },
        'id': {
            meta: {
                description: 'Pixel Sprite Studio adalah alat online canggih untuk membuat sprite seni piksel. Hapus latar belakang, rakit karakter, sesuaikan animasi, dan ekspor sebagai PNG atau GIF.',
                keywords: 'seni piksel, pembuat sprite, lembar sprite, penghapus latar belakang, aset game'
            },
            'app.title': 'Pixel Sprite Studio - Pembuat & Editor Sprite',
            'ui.brand': 'Pixel Sprite Studio',
            'ui.settings': 'Pengaturan',
            'ui.library': 'Koleksi',
            'ui.add': 'Tambah',
            'ui.tab.character': 'Karakter',
            'ui.tab.accessory': 'Aksesori',
            'ui.preview.title': 'Pratinjau',
            'ui.preview.desc': 'Hasil Akhir',
            'ui.editor.title': 'Editor',
            'ui.editor.desc': 'Atur Posisi & Ukuran',
            'ui.controls.title': 'Penyesuaian',
            'ui.msg.no_selection': 'Pilih aksesori untuk diedit',
            'ctrl.bobbing': 'Bobbing (Naik-Turun)',
            'ctrl.scale': 'Skala',
            'ctrl.rotation': 'Rotasi',
            'ctrl.zoom': 'Zoom Tampilan',
            'ctrl.bgcolor': 'Warna Latar / Transparan',
            'ctrl.transparent': 'Latar Transparan',
            'ctrl.bg_desc': 'Mempengaruhi pratinjau & hasil; abaikan warna saat dicentang.',
            'btn.save_png': 'Ekspor PNG',
            'btn.save_gif': 'Ekspor GIF',
            'tutorial.title': 'Panduan Cepat',
            'tutorial.subtitle': 'Buat sprite kustom Anda dalam 3 langkah!',
            'step.1.title': '1. Buat (Upload)',
            'step.1.desc': 'Buka "Pabrik Sprite", unggah gambar. Atur toleransi untuk hapus background otomatis!',
            'step.2.title': '2. Rakit (Equip)',
            'step.2.desc': 'Pilih karakter dan aksesori dari koleksi. Klik untuk pakai dan kombinasikan sesuka hati!',
            'step.3.title': '3. Edit (Adjust)',
            'step.3.desc': 'Gunakan editor untuk atur posisi dan animasi. Klik ekspor untuk simpan karya Anda!',
            'factory.title': 'Pabrik Sprite',
            'factory.tab.char': 'Karakter',
            'factory.tab.acc': 'Aksesori',
            'factory.source': 'Sumber',
            'factory.preview.placeholder': 'Silakan unggah gambar',
            'factory.tolerance': 'Toleransi:',
            'factory.bg.status': 'Warna BG',
            'factory.bg.auto': 'Otomatis',
            'factory.bg.manual': 'Manual',
            'factory.bg.picking': 'Memilih',
            'factory.bg.pick_btn': 'Ambil Warna',
            'factory.bg.cancel_prod': 'Batal',
            'factory.bg.reset_btn': 'Reset Otomatis',
            'factory.bg.hint.auto': 'Otomatis: Warna mayoritas dari sudut.',
            'factory.bg.hint.picking': 'Klik warna latar pada gambar (rata-rata 5x5), atau Esc.',
            'factory.bg.hint.manual': 'Manual: Diganti. Ambil lagi atau Reset.',
            'factory.frames': 'Jumlah Frame:',
            'factory.select_method': 'Metode Ekstraksi',
            'factory.select_desc': 'Ukuran: Filter noise; Urutan: Jaga tata letak; Kustom: Seret & Lepas.',
            'factory.method.size': 'Berdasarkan Ukuran',
            'factory.method.order': 'Urutan Asli',
            'factory.method.custom': 'Urutan Kustom',
            'factory.custom_hint': 'Seret untuk urutkan, klik X untuk hapus.',
            'btn.add_to_library': 'Tambah ke Koleksi',
            'msg.added': 'Ditambahkan ke Koleksi',
            'msg.upload_first': 'Unggah gambar dulu',
            'msg.saved_png': 'Tersimpan',
            'msg.no_char': 'Pilih karakter dulu',
            'msg.no_obj': 'Objek tidak ditemukan'
        },
        'ms': {
            meta: {
                description: 'Pixel Sprite Studio adalah alat dalam talian yang hebat untuk mencipta sprite seni piksel. Buang latar belakang, pasang watak, laraskan animasi, dan eksport sebagai PNG atau GIF.',
                keywords: 'seni piksel, pembuat sprite, helaian sprite, pembuang latar belakang, aset permainan'
            },
            'app.title': 'Pixel Sprite Studio - Pembuat & Editor Sprite',
            'ui.brand': 'Pixel Sprite Studio',
            'ui.settings': 'Tetapan',
            'ui.library': 'Pustaka',
            'ui.add': 'Tambah',
            'ui.tab.character': 'Watak',
            'ui.tab.accessory': 'Aksesori',
            'ui.preview.title': 'Pratonton',
            'ui.preview.desc': 'Hasil Akhir',
            'ui.editor.title': 'Editor',
            'ui.editor.desc': 'Laraskan Posisi & Saiz',
            'ui.controls.title': 'Pelarasan',
            'ui.msg.no_selection': 'Pilih aksesori untuk edit',
            'ctrl.bobbing': 'Deyutan (Bobbing)',
            'ctrl.scale': 'Skala',
            'ctrl.rotation': 'Putaran',
            'ctrl.zoom': 'Zum Paparan',
            'ctrl.bgcolor': 'Warna Latar / Lutsinar',
            'ctrl.transparent': 'Latar Lutsinar',
            'ctrl.bg_desc': 'Mempengaruhi pratonton & hasil.',
            'btn.save_png': 'Eksport PNG',
            'btn.save_gif': 'Eksport GIF',
            'tutorial.title': 'Panduan Pantas',
            'tutorial.subtitle': 'Cipta sprite anda dalam 3 langkah!',
            'step.1.title': '1. Cipta (Upload)',
            'step.1.desc': 'Buka "Kilang Sprite", muat naik imej. Laraskan toleransi untuk buang latar belakang secara auto!',
            'step.2.title': '2. Pasang (Equip)',
            'step.2.desc': 'Pilih watak dan aksesori. Klik untuk pakai dan padankan secara bebas!',
            'step.3.title': '3. Edit (Adjust)',
            'step.3.desc': 'Gunakan editor untuk ubah suai. Klik butang eksport untuk simpan karya anda!',
            'factory.title': 'Kilang Sprite',
            'factory.tab.char': 'Watak',
            'factory.tab.acc': 'Aksesori',
            'factory.source': 'Sumber',
            'factory.preview.placeholder': 'Sila muat naik imej',
            'factory.tolerance': 'Toleransi:',
            'factory.bg.status': 'Warna BG',
            'factory.bg.auto': 'Auto',
            'factory.bg.manual': 'Manual',
            'factory.bg.picking': 'Memilih',
            'factory.bg.pick_btn': 'Pilih Warna',
            'factory.bg.cancel_prod': 'Batal',
            'factory.bg.reset_btn': 'Reset Auto',
            'factory.bg.hint.auto': 'Auto: Warna majoriti dari sudut.',
            'factory.bg.hint.picking': 'Klik warna latar pada imej (purata 5x5), atau Esc.',
            'factory.bg.hint.manual': 'Manual: Diganti. Pilih semula atau Reset.',
            'factory.frames': 'Jumlah Bingkai:',
            'factory.select_method': 'Kaedah Ekstrak',
            'factory.select_desc': 'Saiz: Tapis hingar; Urutan: Kekalkan susun atur; Tersuai: Seret & Lepas.',
            'factory.method.size': 'Ikut Saiz',
            'factory.method.order': 'Urutan Asal',
            'factory.method.custom': 'Urutan Tersuai',
            'factory.custom_hint': 'Seret untuk susun semula, X untuk buang.',
            'btn.add_to_library': 'Tambah ke Pustaka',
            'msg.added': 'Ditambah ke Pustaka',
            'msg.upload_first': 'Sila muat naik imej dulu',
            'msg.saved_png': 'Disimpan',
            'msg.no_char': 'Pilih watak dulu',
            'msg.no_obj': 'Objek tidak dijumpai'
        },
        'fr': {
            meta: {
                description: 'Pixel Sprite Studio est un outil en ligne puissant pour créer des sprites en pixel art. Supprimez l\'arrière-plan, assemblez des personnages, ajustez les animations et exportez en PNG ou GIF.',
                keywords: 'pixel art, créateur de sprites, sprite sheet, détourage, assets de jeu, générateur de gif'
            },
            'app.title': 'Pixel Sprite Studio - Créateur de Sprites',
            'ui.brand': 'Pixel Sprite Studio',
            'ui.settings': 'Paramètres',
            'ui.library': 'Bibliothèque',
            'ui.add': 'Ajouter',
            'ui.tab.character': 'Perso',
            'ui.tab.accessory': 'Accessoire',
            'ui.preview.title': 'Aperçu',
            'ui.preview.desc': 'Résultat Final',
            'ui.editor.title': 'Éditeur',
            'ui.editor.desc': 'Position & Taille',
            'ui.controls.title': 'Réglages',
            'ui.msg.no_selection': 'Sélectionnez un accessoire',
            'ctrl.bobbing': 'Rebond (Bobbing)',
            'ctrl.scale': 'Échelle (Scale)',
            'ctrl.rotation': 'Rotation',
            'ctrl.zoom': 'Zoom Vue',
            'ctrl.bgcolor': 'Couleur de fond',
            'ctrl.transparent': 'Fond Transparent',
            'ctrl.bg_desc': 'Affecte l\'aperçu et l\'export.',
            'btn.save_png': 'Exporter PNG',
            'btn.save_gif': 'Exporter GIF',
            'tutorial.title': 'Guide Rapide',
            'tutorial.subtitle': 'Créez votre sprite en 3 étapes !',
            'step.1.title': '1. Générer (Upload)',
            'step.1.desc': 'Ouvrez "Usine à Sprites", chargez votre image. Réglez la tolérance pour détourer automatiquement !',
            'step.2.title': '2. Assembler (Equip)',
            'step.2.desc': 'Choisissez perso et accessoires. Cliquez pour équiper et mélanger librement !',
            'step.3.title': '3. Éditer (Edit)',
            'step.3.desc': 'Utilisez l\'éditeur pour ajuster. Cliquez sur exporter pour sauvegarder votre œuvre !',
            'factory.title': 'Usine à Sprites',
            'factory.tab.char': 'Personnage',
            'factory.tab.acc': 'Accessoire',
            'factory.source': 'Source',
            'factory.preview.placeholder': 'Veuillez charger une image',
            'factory.tolerance': 'Tolérance:',
            'factory.bg.status': 'Couleur Fond',
            'factory.bg.auto': 'Auto',
            'factory.bg.manual': 'Manuel',
            'factory.bg.picking': 'Pipette',
            'factory.bg.pick_btn': 'Pipette',
            'factory.bg.cancel_prod': 'Annuler',
            'factory.bg.reset_btn': 'Reset Auto',
            'factory.bg.hint.auto': 'Auto: Coins de l\'image.',
            'factory.bg.hint.picking': 'Cliquez sur le fond (moy. 5x5), ou Esc.',
            'factory.bg.hint.manual': 'Manuel: Défini.',
            'factory.frames': 'Cadres:',
            'factory.select_method': 'Méthode',
            'factory.select_desc': 'Taille: Filtre bruit; Ordre: Garde layout; Custom: Glisser-déposer.',
            'factory.method.size': 'Par Taille',
            'factory.method.order': 'Ordre Original',
            'factory.method.custom': 'Ordre Personnalisé',
            'factory.custom_hint': 'Glissez pour réorganiser, X pour supprimer.',
            'btn.add_to_library': 'Ajouter',
            'msg.added': 'Ajouté',
            'msg.upload_first': 'Chargez une image d\'abord',
            'msg.saved_png': 'Image sauvegardée',
            'msg.no_char': 'Sélectionnez un personnage',
            'msg.no_obj': 'Aucun objet détecté'
        },
        'de': {
            meta: {
                description: 'Pixel Sprite Studio ist ein leistungsstarkes Online-Tool zum Erstellen von Pixel-Art-Sprites. Hintergrund entfernen, Charaktere zusammenstellen, Animationen anpassen und als PNG oder GIF exportieren.',
                keywords: 'pixel art, sprite maker, sprite sheet, hintergrund entferner, game assets, gif generator'
            },
            'app.title': 'Pixel Sprite Studio - Sprite-Editor',
            'ui.brand': 'Pixel Sprite Studio',
            'ui.settings': 'Einstellungen',
            'ui.library': 'Bibliothek',
            'ui.add': 'Neu',
            'ui.tab.character': 'Charakter',
            'ui.tab.accessory': 'Zubehör',
            'ui.preview.title': 'Vorschau',
            'ui.preview.desc': 'Ergebnis',
            'ui.editor.title': 'Editor',
            'ui.editor.desc': 'Position & Größe',
            'ui.controls.title': 'Anpassung',
            'ui.msg.no_selection': 'Zubehör auswählen',
            'ctrl.bobbing': 'Hüpfen (Bobbing)',
            'ctrl.scale': 'Skalierung',
            'ctrl.rotation': 'Drehung',
            'ctrl.zoom': 'Ansicht Zoom',
            'ctrl.bgcolor': 'Hintergrundfarbe',
            'ctrl.transparent': 'Transparent',
            'ctrl.bg_desc': 'Beeinflusst Vorschau und Export.',
            'btn.save_png': 'PNG Export',
            'btn.save_gif': 'GIF Export',
            'tutorial.title': 'Schnellstart',
            'tutorial.subtitle': 'Erstelle dein Sprite in 3 Schritten!',
            'step.1.title': '1. Erstellen (Upload)',
            'step.1.desc': 'Öffne "Sprite-Fabrik", lade Bild hoch. Toleranz anpassen für automatische Freistellung!',
            'step.2.title': '2. Ausrüsten (Equip)',
            'step.2.desc': 'Wähle Charakter und Zubehör. Klicke zum Ausrüsten und Kombinieren!',
            'step.3.title': '3. Bearbeiten (Edit)',
            'step.3.desc': 'Nutze den Editor für Feinabstimmung. Klicke Export zum Speichern!',
            'factory.title': 'Sprite-Fabrik',
            'factory.tab.char': 'Charakter',
            'factory.tab.acc': 'Zubehör',
            'factory.source': 'Quelle',
            'factory.preview.placeholder': 'Bitte Bild hochladen',
            'factory.tolerance': 'Toleranz:',
            'factory.bg.status': 'Hintergrund',
            'factory.bg.auto': 'Auto',
            'factory.bg.manual': 'Manuell',
            'factory.bg.picking': 'Wählen',
            'factory.bg.pick_btn': 'Farbe wählen',
            'factory.bg.cancel_prod': 'Abbrechen',
            'factory.bg.reset_btn': 'Reset Auto',
            'factory.bg.hint.auto': 'Auto: Farbe aus Ecken.',
            'factory.bg.hint.picking': 'Klicke auf Hintergrund (5x5 Durschnitt), oder Esc.',
            'factory.bg.hint.manual': 'Manuell: Gewählt.',
            'factory.frames': 'Frames:',
            'factory.select_method': 'Methode',
            'factory.select_desc': 'Größe: Filtert Rauschen; Reihenfolge: Behält Layout; Custom: Drag & Drop.',
            'factory.method.size': 'Nach Größe',
            'factory.method.order': 'Original Reihenfolge',
            'factory.method.custom': 'Benutzerdefiniert',
            'factory.custom_hint': 'Ziehen zum Sortieren, X zum Löschen.',
            'btn.add_to_library': 'Hinzufügen',
            'msg.added': 'Hinzugefügt',
            'msg.upload_first': 'Bitte erst Bild hochladen',
            'msg.saved_png': 'Gespeichert',
            'msg.no_char': 'Erst Charakter wählen',
            'msg.no_obj': 'Kein Objekt gefunden'
        },
        'es': {
            meta: {
                description: 'Pixel Sprite Studio es una potente herramienta en línea para crear sprites de pixel art. Elimina fondos, ensambla personajes, ajusta animaciones y exporta como PNG o GIF.',
                keywords: 'pixel art, creador de sprites, hoja de sprites, eliminador de fondo, recursos de juego, generador gif'
            },
            'app.title': 'Pixel Sprite Studio - Creador de Sprites',
            'ui.brand': 'Pixel Sprite Studio',
            'ui.settings': 'Ajustes',
            'ui.library': 'Biblioteca',
            'ui.add': 'Añadir',
            'ui.tab.character': 'Personaje',
            'ui.tab.accessory': 'Accesorio',
            'ui.preview.title': 'Vista Previa',
            'ui.preview.desc': 'Resultado Final',
            'ui.editor.title': 'Editor',
            'ui.editor.desc': 'Posición y Tamaño',
            'ui.controls.title': 'Ajustes',
            'ui.msg.no_selection': 'Selecciona accesorio',
            'ctrl.bobbing': 'Rebote (Bobbing)',
            'ctrl.scale': 'Escala',
            'ctrl.rotation': 'Rotación',
            'ctrl.zoom': 'Zoom Vista',
            'ctrl.bgcolor': 'Color Fondo',
            'ctrl.transparent': 'Transparente',
            'ctrl.bg_desc': 'Afecta vista previa y exportación.',
            'btn.save_png': 'Exportar PNG',
            'btn.save_gif': 'Exportar GIF',
            'tutorial.title': 'Guía Rápida',
            'tutorial.subtitle': '¡Crea tu sprite en 3 pasos!',
            'step.1.title': '1. Generar (Upload)',
            'step.1.desc': 'Abre "Fábrica de Sprites", sube imagen. ¡Ajusta tolerancia para quitar fondo automáticamente!',
            'step.2.title': '2. Equipar (Equip)',
            'step.2.desc': 'Elige personaje y accesorios. ¡Clic para equipar y combinar libremente!',
            'step.3.title': '3. Editar (Edit)',
            'step.3.desc': 'Usa el editor para ajustar. ¡Clic en exportar para guardar tu obra!',
            'factory.title': 'Fábrica Sprites',
            'factory.tab.char': 'Personaje',
            'factory.tab.acc': 'Accesorio',
            'factory.source': 'Fuente',
            'factory.preview.placeholder': 'Sube una imagen',
            'factory.tolerance': 'Tolerancia:',
            'factory.bg.status': 'Color Fondo',
            'factory.bg.auto': 'Auto',
            'factory.bg.manual': 'Manual',
            'factory.bg.picking': 'Seleccionando',
            'factory.bg.pick_btn': 'Tomar Color',
            'factory.bg.cancel_prod': 'Cancelar',
            'factory.bg.reset_btn': 'Reset Auto',
            'factory.bg.hint.auto': 'Auto: Color de esquinas.',
            'factory.bg.hint.picking': 'Clic en fondo (promedio 5x5), o Esc.',
            'factory.bg.hint.manual': 'Manual: Sobrescrito.',
            'factory.frames': 'Fotogramas:',
            'factory.select_method': 'Método',
            'factory.select_desc': 'Tamaño: Filtra ruido; Orden: Mantiene diseño; Personal: Arrastrar.',
            'factory.method.size': 'Por Tamaño',
            'factory.method.order': 'Orden Original',
            'factory.method.custom': 'Orden Personalizado',
            'factory.custom_hint': 'Arrastra para ordenar, X para borrar.',
            'btn.add_to_library': 'Añadir',
            'msg.added': 'Añadido',
            'msg.upload_first': 'Sube imagen primero',
            'msg.saved_png': 'Guardado',
            'msg.no_char': 'Elige personaje primero',
            'msg.no_obj': 'No se detectaron objetos'
        }
    },

    init() {
        // Detect language: LocalStorage -> Navigator -> Default
        const stored = localStorage.getItem('pss_lang');
        const nav = navigator.language || navigator.userLanguage;

        if (stored && this.translations[stored]) {
            this.current = stored;
        } else if (nav) {
            // Try to match partial (e.g., 'ja-JP' -> 'ja')
            const code = nav.split('-')[0];
            if (this.translations[code]) {
                this.current = code;
            } else if (code === 'en') {
                this.current = 'en';
            } else {
                this.current = 'zh-TW';
            }
        } else {
            this.current = 'zh-TW';
        }

        this.updatePage();
        this.updateSelectElement();
    },

    setLanguage(lang) {
        if (this.translations[lang]) {
            this.current = lang;
            localStorage.setItem('pss_lang', lang);
            this.updatePage();
            return true;
        }
        return false;
    },

    get(key) {
        return this.translations[this.current][key] || key;
    },

    updatePage() {
        // Update elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (this.translations[this.current][key]) {
                // If it's an input button or submit, update value, else innerText
                if (el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit')) {
                    el.value = this.translations[this.current][key];
                } else {
                    el.innerText = this.translations[this.current][key];
                }
            }
        });

        // Update document title
        if (this.translations[this.current]['app.title']) {
            document.title = this.translations[this.current]['app.title'];
        }

        // Update SEO Meta Tags
        const meta = this.translations[this.current].meta;
        if (meta) {
            this.setMeta('description', meta.description);
            this.setMeta('keywords', meta.keywords);
            this.setMetaProp('og:description', meta.description);
            this.setMetaProp('twitter:description', meta.description);
        }

        // Trigger custom event for other components
        window.dispatchEvent(new CustomEvent('lang-changed', { detail: { lang: this.current } }));
    },

    setMeta(name, content) {
        let el = document.querySelector(`meta[name="${name}"]`);
        if (!el) {
            el = document.createElement('meta');
            el.name = name;
            document.head.appendChild(el);
        }
        el.content = content;
    },

    setMetaProp(prop, content) {
        // For OG and Twitter tags
        let el = document.querySelector(`meta[property="${prop}"]`);
        if (!el) {
            el = document.createElement('meta');
            el.setAttribute('property', prop);
            document.head.appendChild(el);
        }
        el.content = content;
    },

    updateSelectElement() {
        const sel = document.getElementById('lang-select');
        if (sel) sel.value = this.current;
    }
};

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Lang.init();
    const sel = document.getElementById('lang-select');
    if (sel) {
        sel.addEventListener('change', (e) => {
            Lang.setLanguage(e.target.value);
        });
    }
});
