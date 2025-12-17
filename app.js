/**
 * Pixel Sprite Studio - Standalone Logic
 * Extracted from original project
 */

// --- STATE ---
const state = {
    library: [], // { id, type, src, imageElem, frameCount }
    equipped: [], // { instanceId, assetId, config: {x, y, scale, rotation, bobbing} }
    selectedCharId: null,
    activeInstanceId: null,
    view: {
        zoom: 1.0, // Default zoom multiplier
        bgColor: '#0d1117',
        bgTransparent: true
    },
    factory: {
        rawImage: null,
        processedImage: null,
        tolerance: 30,
        frameCount: 4,
        mode: 'character',
        selectionMode: 'size', // 'size' | 'order' | 'custom'
        customOrder: [], // array of indices for custom selection
        bgOverride: null, // {r,g,b,hex} when user manually picks background
        isPickingBg: false
    }
};

// --- CONSTANTS ---
const TARGET_FRAME_WIDTH = 256;

// --- HELPERS ---
function getFrameMeta(item, onLoad) {
    if (!item || !item.imageElem) return null;
    const img = item.imageElem;

    if (!img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) {
        if (onLoad && !img._metaLoadHooked) {
            img._metaLoadHooked = true;
            img.addEventListener('load', () => {
                item._frameMeta = null;
                img._metaLoadHooked = false;
                onLoad();
            }, { once: true });
        }
        return null;
    }

    if (item._frameMeta) return item._frameMeta;

    const frameCount = item.frameCount || 1;
    const frameW = Math.floor(img.naturalWidth / frameCount);
    const frameH = img.naturalHeight;

    const temp = document.createElement('canvas');
    temp.width = frameW;
    temp.height = frameH;
    const tctx = temp.getContext('2d');
    tctx.drawImage(img, 0, 0, frameW, frameH, 0, 0, frameW, frameH);
    const data = tctx.getImageData(0, 0, frameW, frameH).data;

    let minX = frameW, minY = frameH, maxX = -1, maxY = -1;
    for (let y = 0; y < frameH; y++) {
        for (let x = 0; x < frameW; x++) {
            const a = data[(y * frameW + x) * 4 + 3];
            if (a > 0) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    const hasPixels = maxX >= minX && maxY >= minY;
    const margin = 2;
    const srcX = hasPixels ? Math.max(0, minX - margin) : 0;
    const srcY = hasPixels ? Math.max(0, minY - margin) : 0;
    const srcW = hasPixels ? Math.min(frameW - srcX, (maxX - minX + 1) + margin * 2) : frameW;
    const srcH = hasPixels ? Math.min(frameH - srcY, (maxY - minY + 1) + margin * 2) : frameH;

    const meta = { frameW, frameH, srcX, srcY, srcW, srcH };
    item._frameMeta = meta;
    return meta;
}

function rgbToHex(r, g, b) {
    const toHex = (n) => n.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function detectBackgroundColorFromCorners(data, w, h) {
    const sampleSize = Math.max(3, Math.min(24, Math.floor(Math.min(w, h) * 0.06)));
    const corners = [
        { x0: 0, y0: 0 },
        { x0: Math.max(0, w - sampleSize), y0: 0 },
        { x0: 0, y0: Math.max(0, h - sampleSize) },
        { x0: Math.max(0, w - sampleSize), y0: Math.max(0, h - sampleSize) }
    ];

    const buckets = new Map(); // key -> {count, sumR, sumG, sumB}

    for (const c of corners) {
        for (let y = c.y0; y < c.y0 + sampleSize && y < h; y++) {
            for (let x = c.x0; x < c.x0 + sampleSize && x < w; x++) {
                const idx = (y * w + x) * 4;
                const a = data[idx + 3];
                if (a === 0) continue;
                const r = data[idx];
                const g = data[idx + 1];
                const b = data[idx + 2];

                // Quantize to reduce noise (4 bits per channel)
                const rq = r >> 4;
                const gq = g >> 4;
                const bq = b >> 4;
                const key = (rq << 8) | (gq << 4) | bq;

                let entry = buckets.get(key);
                if (!entry) {
                    entry = { count: 0, sumR: 0, sumG: 0, sumB: 0 };
                    buckets.set(key, entry);
                }
                entry.count += 1;
                entry.sumR += r;
                entry.sumG += g;
                entry.sumB += b;
            }
        }
    }

    if (buckets.size === 0) {
        return { r: 255, g: 255, b: 255, hex: '#ffffff' };
    }

    let best = null;
    for (const entry of buckets.values()) {
        if (!best || entry.count > best.count) best = entry;
    }

    const r = Math.round(best.sumR / best.count);
    const g = Math.round(best.sumG / best.count);
    const b = Math.round(best.sumB / best.count);
    return { r, g, b, hex: rgbToHex(r, g, b) };
}

function updateBgDetectUi(bg) {
    const swatch = document.getElementById('bg-color-swatch');
    const hexEl = document.getElementById('bg-color-hex');
    if (swatch && bg?.hex) swatch.style.background = bg.hex;
    if (hexEl && bg?.hex) hexEl.textContent = bg.hex;
}

function sampleAverageColorFromCanvas(canvas, x, y, size = 5) {
    const ctx = canvas.getContext('2d');
    const half = Math.floor(size / 2);
    const sx = Math.max(0, x - half);
    const sy = Math.max(0, y - half);
    const sw = Math.min(canvas.width - sx, size);
    const sh = Math.min(canvas.height - sy, size);
    const data = ctx.getImageData(sx, sy, sw, sh).data;

    let sumR = 0, sumG = 0, sumB = 0, count = 0;
    for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3];
        if (a === 0) continue;
        sumR += data[i];
        sumG += data[i + 1];
        sumB += data[i + 2];
        count += 1;
    }

    if (count === 0) return { r: 255, g: 255, b: 255, hex: '#ffffff' };
    const r = Math.round(sumR / count);
    const g = Math.round(sumG / count);
    const b = Math.round(sumB / count);
    return { r, g, b, hex: rgbToHex(r, g, b) };
}

// --- DOM ELEMENTS ---
const els = {
    libraryGrid: document.getElementById('library-grid'),
    noSelMsg: document.getElementById('no-selection-msg'),
    controlsForm: document.getElementById('controls-form'),
    inputs: {
        bobbing: document.getElementById('ctrl-bobbing'),
        scale: document.getElementById('ctrl-scale'),
        rotation: document.getElementById('ctrl-rotation'),
        globalZoom: document.getElementById('ctrl-global-zoom'), // New
        upload: document.getElementById('inp-upload-img'),
        tolerance: document.getElementById('inp-tolerance'),
        frames: document.getElementById('inp-frames'),
        framesDisplay: document.getElementById('val-frames'),
        frameSelectSize: document.getElementById('frame-select-size'),
        frameSelectOrder: document.getElementById('frame-select-order'),
        frameSelectCustom: document.getElementById('frame-select-custom'),
        bgColor: document.getElementById('ctrl-bg-color'),
        bgTransparent: document.getElementById('ctrl-bg-transparent')
    },
    btns: {
        addToLib: document.getElementById('btn-add-to-library'),
        openFactory: document.getElementById('btn-open-factory'),
        closeFactory: document.getElementById('btn-close-factory'),
        saveComp: document.getElementById('btn-save-comp'),
        exportGif: document.getElementById('btn-export-gif'),
        bgPick: document.getElementById('btn-bg-pick'),
        bgReset: document.getElementById('btn-bg-reset')
    },
    modals: {
        factory: document.getElementById('factory-modal')
    },
    previewBox: document.getElementById('factory-preview-box'),
    canvases: {
        main: document.getElementById('main-canvas'),
        gizmo: document.getElementById('gizmo-canvas')
    }
};

// --- INITIALIZATION ---
function init() {
    setupEventListeners();
    startAnimationLoops();
    renderLibrary();
    // Default Tab
    const defaultTab = document.querySelector('[data-tab="character"]');
    if (defaultTab) defaultTab.click();
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const group = e.target.parentElement;
            // If main library tabs
            if (group.classList.contains('library-tabs') && !group.closest('.modal-content')) {
                const type = e.target.dataset.tab;
                setLibraryTab(type);
            } else {
                group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    });

    // Factory
    els.btns.openFactory.onclick = () => {
        els.modals.factory.classList.add('open');
        setFactoryTab('character');
    };
    els.btns.closeFactory.onclick = () => els.modals.factory.classList.remove('open');

    // Upload
    els.inputs.upload.onchange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                const img = new Image();
                img.onload = () => {
                    state.factory.rawImage = img;
                    state.factory.customOrder = [];
                    state.factory.bgOverride = null;
                    setBgPicking(false);
                    runProcessingPipeline();
                };
                img.src = evt.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // Pipeline Controls
    els.inputs.tolerance.oninput = (e) => {
        document.getElementById('val-tolerance').textContent = e.target.value;
        state.factory.tolerance = parseInt(e.target.value);
        runProcessingPipeline();
    };
    els.inputs.frames.oninput = (e) => {
        document.getElementById('val-frames').textContent = e.target.value;
        state.factory.frameCount = parseInt(e.target.value);
        runProcessingPipeline();
    };

    // Background picker
    if (els.btns.bgPick) {
        els.btns.bgPick.onclick = () => {
            if (!state.factory.rawImage) return showToast(Lang.get('msg.upload_first'));
            setBgPicking(!state.factory.isPickingBg);
        };
    }
    if (els.btns.bgReset) {
        els.btns.bgReset.onclick = () => {
            state.factory.bgOverride = null;
            setBgPicking(false);
            if (state.factory.rawImage) runProcessingPipeline();
        };
    }

    // Frame selection mode
    if (els.inputs.frameSelectSize && els.inputs.frameSelectOrder) {
        els.inputs.frameSelectSize.onchange = () => {
            state.factory.selectionMode = 'size';
            state.factory.customOrder = [];
            runProcessingPipeline();
        };
        els.inputs.frameSelectOrder.onchange = () => {
            state.factory.selectionMode = 'order';
            state.factory.customOrder = [];
            runProcessingPipeline();
        };
        if (els.inputs.frameSelectCustom) {
            els.inputs.frameSelectCustom.onchange = () => {
                state.factory.selectionMode = 'custom';
                runProcessingPipeline();
            };
        }
    }

    // Add to Library
    els.btns.addToLib.onclick = () => {
        if (!state.factory.processedImage) return;

        const newItem = {
            id: crypto.randomUUID(),
            type: state.factory.mode,
            src: state.factory.processedImage.src,
            imageElem: state.factory.processedImage,
            frameCount: state.factory.mode === 'character' ? state.factory.frameCount : 1
        };

        state.library.push(newItem);

        if (newItem.type === 'character') {
            state.selectedCharId = newItem.id;
        } else {
            equipAccessory(newItem.id);
        }

        setLibraryTab(newItem.type);
        setLibraryTab(newItem.type);
        showToast(Lang.get('msg.added'));
        els.modals.factory.classList.remove('open');
        els.inputs.upload.value = '';
    };

    // Gizmo Controls
    els.inputs.bobbing.oninput = (e) => updateActiveConfig({ bobbing: parseFloat(e.target.value) });
    els.inputs.scale.oninput = (e) => updateActiveConfig({ scale: parseFloat(e.target.value) });
    els.inputs.rotation.oninput = (e) => updateActiveConfig({ rotation: parseFloat(e.target.value) });

    // Global Zoom
    if (els.inputs.globalZoom) {
        els.inputs.globalZoom.value = state.view.zoom;
        els.inputs.globalZoom.oninput = (e) => {
            state.view.zoom = parseFloat(e.target.value);
        };
    }

    // Background color / transparency
    if (els.inputs.bgColor && els.inputs.bgTransparent) {
        els.inputs.bgTransparent.onchange = (e) => {
            state.view.bgTransparent = e.target.checked;
        };
        els.inputs.bgColor.oninput = (e) => {
            state.view.bgColor = e.target.value;
            state.view.bgTransparent = false;
            els.inputs.bgTransparent.checked = false;
        };
        els.inputs.bgTransparent.checked = state.view.bgTransparent;
        els.inputs.bgColor.value = state.view.bgColor;
    }

    // Canvas Interactions (Gizmo)
    const c = els.canvases.gizmo;
    c.addEventListener('mousedown', handleGizmoDown);
    c.addEventListener('mousemove', handleGizmoHover);
    c.addEventListener('mouseleave', () => c.style.cursor = 'default');
    window.addEventListener('mousemove', handleGizmoMove);
    window.addEventListener('mouseup', handleGizmoUp);

    // Save Comp
    els.btns.saveComp.onclick = () => {
        if (!state.selectedCharId) return showToast(Lang.get('msg.no_char'));
        const link = document.createElement('a');
        link.download = 'womowomimo.com_spritesheet_to_gif.png';
        link.href = els.canvases.main.toDataURL();
        link.click();
        showToast(Lang.get('msg.saved_png'));
    };
    els.btns.exportGif.onclick = () => {
        exportGif();
    };

}

// --- FACTORY LOGIC ---
function setFactoryTab(mode) {
    state.factory.mode = mode;
    document.getElementById('factory-tab-char').classList.toggle('active', mode === 'character');
    document.getElementById('factory-tab-acc').classList.toggle('active', mode === 'accessory');
    document.getElementById('group-frame-count').classList.toggle('hidden', mode !== 'character');
    const frameSelectGroup = document.getElementById('group-frame-select');
    if (frameSelectGroup) frameSelectGroup.classList.toggle('hidden', mode !== 'character');

    if (mode !== 'character') {
        state.factory.selectionMode = 'size';
        state.factory.customOrder = [];
        if (els.inputs.frameSelectSize) els.inputs.frameSelectSize.checked = true;
        if (els.inputs.frameSelectOrder) els.inputs.frameSelectOrder.checked = false;
        if (els.inputs.frameSelectCustom) els.inputs.frameSelectCustom.checked = false;
        renderCustomOrderList();
    }

    // Stop bg picking when switching mode
    setBgPicking(false);

    if (state.factory.rawImage) runProcessingPipeline();
}

function setBgPicking(enabled) {
    state.factory.isPickingBg = !!enabled;
    if (state.factory.isPickingBg) {
        window.addEventListener('keydown', handleBgPickKeydown);
    } else {
        window.removeEventListener('keydown', handleBgPickKeydown);
    }
    updateBgPickerControls();
    renderFactoryPreview();
}

function handleBgPickKeydown(e) {
    if (e.key === 'Escape') {
        setBgPicking(false);
    }
}

function updateBgPickerControls() {
    const hintEl = document.getElementById('bg-detect-hint');
    const modeEl = document.getElementById('bg-color-mode');

    if (els.btns.bgPick) {
        els.btns.bgPick.textContent = state.factory.isPickingBg ? Lang.get('factory.bg.cancel_prod') : Lang.get('factory.bg.pick_btn');
    }
    if (els.btns.bgReset) {
        els.btns.bgReset.disabled = !(state.factory.bgOverride || state.factory.isPickingBg);
    }

    if (modeEl) {
        modeEl.classList.remove('badge-auto', 'badge-manual', 'badge-picking');
        if (state.factory.isPickingBg) {
            modeEl.textContent = Lang.get('factory.bg.picking');
            modeEl.classList.add('badge-picking');
        } else if (state.factory.bgOverride) {
            modeEl.textContent = Lang.get('factory.bg.manual');
            modeEl.classList.add('badge-manual');
        } else {
            modeEl.textContent = Lang.get('factory.bg.auto');
            modeEl.classList.add('badge-auto');
        }
    }

    if (hintEl) {
        if (state.factory.isPickingBg) {
            hintEl.textContent = Lang.get('factory.bg.hint.picking');
        } else if (state.factory.bgOverride) {
            hintEl.textContent = Lang.get('factory.bg.hint.manual');
        } else {
            hintEl.textContent = Lang.get('factory.bg.hint.auto');
        }
    }
}

function renderFactoryPreview() {
    if (!els.previewBox) return;
    els.previewBox.innerHTML = '';

    if (!state.factory.rawImage) {
        els.previewBox.innerHTML = `<span class="text-muted text-sm">${Lang.get('factory.preview.placeholder')}</span>`;
        return;
    }

    if (state.factory.isPickingBg) {
        const wrap = document.createElement('div');
        wrap.style.position = 'relative';
        wrap.style.width = '100%';
        wrap.style.height = '100%';
        wrap.style.display = 'flex';
        wrap.style.alignItems = 'center';
        wrap.style.justifyContent = 'center';

        const rawCanvas = document.createElement('canvas');
        rawCanvas.width = state.factory.rawImage.width;
        rawCanvas.height = state.factory.rawImage.height;
        rawCanvas.style.maxWidth = '100%';
        rawCanvas.style.maxHeight = '100%';
        rawCanvas.style.width = 'auto';
        rawCanvas.style.height = 'auto';
        rawCanvas.style.imageRendering = 'pixelated';
        rawCanvas.style.cursor = 'crosshair';

        const rctx = rawCanvas.getContext('2d');
        rctx.imageSmoothingEnabled = false;
        rctx.drawImage(state.factory.rawImage, 0, 0);

        rawCanvas.addEventListener('click', (e) => {
            const rect = rawCanvas.getBoundingClientRect();
            const px = Math.floor((e.clientX - rect.left) * (rawCanvas.width / rect.width));
            const py = Math.floor((e.clientY - rect.top) * (rawCanvas.height / rect.height));
            const color = sampleAverageColorFromCanvas(rawCanvas, px, py, 5);
            state.factory.bgOverride = color;
            setBgPicking(false);
            runProcessingPipeline();
        }, { once: true });

        const hint = document.createElement('div');
        hint.textContent = Lang.get('factory.bg.hint.picking');
        hint.style.position = 'absolute';
        hint.style.left = '8px';
        hint.style.top = '8px';
        hint.style.padding = '4px 8px';
        hint.style.borderRadius = '6px';
        hint.style.background = 'rgba(0,0,0,0.5)';
        hint.style.color = 'white';
        hint.style.fontSize = '12px';

        wrap.appendChild(rawCanvas);
        wrap.appendChild(hint);
        els.previewBox.appendChild(wrap);
        return;
    }

    if (state.factory.processedImage) {
        els.previewBox.appendChild(state.factory.processedImage);
        return;
    }

    const img = new Image();
    img.src = state.factory.rawImage.src;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.objectFit = 'contain';
    img.style.imageRendering = 'pixelated';
    els.previewBox.appendChild(img);
}

async function runProcessingPipeline() {
    if (!state.factory.rawImage) return;

    const img = state.factory.rawImage;
    const w = img.width;
    const h = img.height;

    // Flood Fill and Blob Logic remains same...
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;

    const tolerance = state.factory.tolerance;
    const autoBg = detectBackgroundColorFromCorners(data, w, h);
    const bg = state.factory.bgOverride || autoBg;
    updateBgDetectUi(bg);
    updateBgPickerControls();

    const isBg = (idx) => {
        const a = data[idx + 3];
        if (a === 0) return true;
        return Math.abs(data[idx] - bg.r) <= tolerance &&
            Math.abs(data[idx + 1] - bg.g) <= tolerance &&
            Math.abs(data[idx + 2] - bg.b) <= tolerance;
    };

    const visited = new Uint8Array(w * h);
    const stack = [];

    // Seed flood fill from background pixels near corners (more robust than exact corner pixel)
    const seedSize = Math.max(3, Math.min(16, Math.floor(Math.min(w, h) * 0.03)));
    const seedCorners = [
        { x0: 0, y0: 0 },
        { x0: Math.max(0, w - seedSize), y0: 0 },
        { x0: 0, y0: Math.max(0, h - seedSize) },
        { x0: Math.max(0, w - seedSize), y0: Math.max(0, h - seedSize) }
    ];
    seedCorners.forEach(c => {
        let found = false;
        for (let y = c.y0; y < c.y0 + seedSize && y < h && !found; y++) {
            for (let x = c.x0; x < c.x0 + seedSize && x < w; x++) {
                const idx = (y * w + x) * 4;
                if (isBg(idx)) {
                    stack.push(idx);
                    found = true;
                    break;
                }
            }
        }
    });

    while (stack.length > 0) {
        const idx = stack.pop();
        const pIdx = idx / 4;
        if (visited[pIdx]) continue;
        visited[pIdx] = 1;

        data[idx + 3] = 0; // Transparent

        const x = pIdx % w;
        const y = Math.floor(pIdx / w);

        if (y > 0) { const i = idx - w * 4; if (!visited[i / 4] && isBg(i)) stack.push(i); }
        if (y < h - 1) { const i = idx + w * 4; if (!visited[i / 4] && isBg(i)) stack.push(i); }
        if (x > 0) { const i = idx - 4; if (!visited[i / 4] && isBg(i)) stack.push(i); }
        if (x < w - 1) { const i = idx + 4; if (!visited[i / 4] && isBg(i)) stack.push(i); }
    }

    ctx.putImageData(imageData, 0, 0);

    const blobs = [];
    const visitedBlob = new Uint8Array(w * h);

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const pIdx = y * w + x;
            if (data[pIdx * 4 + 3] > 0 && !visitedBlob[pIdx]) {
                let minX = x, maxX = x, minY = y, maxY = y, count = 0;
                const blobStack = [pIdx];
                visitedBlob[pIdx] = 1;

                while (blobStack.length > 0) {
                    const curr = blobStack.pop();
                    const cx = curr % w;
                    const cy = Math.floor(curr / w);
                    count++;

                    if (cx < minX) minX = cx;
                    if (cx > maxX) maxX = cx;
                    if (cy < minY) minY = cy;
                    if (cy > maxY) maxY = cy;

                    const neighbors = [curr - 1, curr + 1, curr - w, curr + w];
                    for (const n of neighbors) {
                        if (n >= 0 && n < w * h) {
                            const nx = n % w;
                            if (Math.abs(nx - cx) > 1) continue;
                            if (!visitedBlob[n] && data[n * 4 + 3] > 0) {
                                visitedBlob[n] = 1;
                                blobStack.push(n);
                            }
                        }
                    }
                }

                if (count > 50 && (maxX - minX) > 5 && (maxY - minY) > 5) {
                    blobs.push({ minX, maxX, minY, maxY, pixelCount: count });
                }
            }
        }
    }

    if (blobs.length === 0) {
        if (blobs.length === 0) {
            showToast(Lang.get('msg.no_obj'));
            return;
        }

        // Update frames slider max based on blob count (character mode)
        if (state.factory.mode === 'character' && els.inputs.frames) {
            const maxFrames = Math.max(1, blobs.length);
            els.inputs.frames.max = maxFrames;
            if (state.factory.frameCount > maxFrames) {
                state.factory.frameCount = maxFrames;
            }
            els.inputs.frames.value = state.factory.frameCount;
            document.getElementById('val-frames').textContent = state.factory.frameCount;
        }

        const finalCanvas = document.createElement('canvas');
        const finalCtx = finalCanvas.getContext('2d');
        finalCtx.imageSmoothingEnabled = false;

        if (state.factory.mode === 'character') {
            // prepare ordered lists
            const originalOrder = [...blobs].sort((a, b) => {
                if (a.minY === b.minY) return a.minX - b.minX;
                return a.minY - b.minY;
            });
            state.factory.blobsOrdered = originalOrder;
            state.factory.sourceCanvas = canvas;

            let targetFrames = state.factory.frameCount;
            let mainBlobs;

            if (state.factory.selectionMode === 'custom') {
                const total = originalOrder.length;
                let order = Array.isArray(state.factory.customOrder) ? state.factory.customOrder.slice() : [];
                order = order.filter(i => Number.isInteger(i) && i >= 0 && i < total);
                if (order.length === 0) {
                    order = originalOrder.map((_, i) => i);
                }
                state.factory.customOrder = order;
                mainBlobs = order.map(i => originalOrder[i]).filter(Boolean);
                targetFrames = Math.max(1, mainBlobs.length);
                state.factory.frameCount = targetFrames;
                renderCustomOrderList(originalOrder, order, canvas);
                if (els.inputs.frames) {
                    els.inputs.frames.disabled = true;
                    els.inputs.frames.value = targetFrames;
                    document.getElementById('val-frames').textContent = targetFrames;
                }
            } else if (state.factory.selectionMode === 'order') {
                if (els.inputs.frames) els.inputs.frames.disabled = false;
                renderCustomOrderList();
                mainBlobs = originalOrder.slice(0, targetFrames);
            } else {
                if (els.inputs.frames) els.inputs.frames.disabled = false;
                renderCustomOrderList();
                // Default: pixel count desc, then left-to-right for consistency
                blobs.sort((a, b) => {
                    if (b.pixelCount === a.pixelCount) return a.minX - b.minX;
                    return b.pixelCount - a.pixelCount;
                });
                mainBlobs = blobs.slice(0, targetFrames);
                mainBlobs.sort((a, b) => a.minX - b.minX);
            }

            const maxW = Math.max(...mainBlobs.map(b => b.maxX - b.minX));
            const maxH = Math.max(...mainBlobs.map(b => b.maxY - b.minY));

            const frameW = Math.max(TARGET_FRAME_WIDTH / 2, maxW * 1.2);
            const frameH = Math.max(frameW, maxH * 1.2);

            finalCanvas.width = frameW * targetFrames;
            finalCanvas.height = frameH;

            mainBlobs.forEach((blob, i) => {
                const bw = blob.maxX - blob.minX + 1;
                const bh = blob.maxY - blob.minY + 1;
                const tx = (i * frameW) + (frameW - bw) / 2;
                const ty = (frameH - bh) / 2;

                finalCtx.drawImage(canvas, blob.minX, blob.minY, bw, bh, tx, ty, bw, bh);
            });

        } else {
            renderCustomOrderList();
            // Accessory: use union of all non-transparent pixels (no blob picking)
            const allMinX = Math.min(...blobs.map(b => b.minX));
            const allMaxX = Math.max(...blobs.map(b => b.maxX));
            const allMinY = Math.min(...blobs.map(b => b.minY));
            const allMaxY = Math.max(...blobs.map(b => b.maxY));

            const bw = allMaxX - allMinX + 1;
            const bh = allMaxY - allMinY + 1;

            finalCanvas.width = bw;
            finalCanvas.height = bh;
            finalCtx.drawImage(canvas, allMinX, allMinY, bw, bh, 0, 0, bw, bh);
        }

        const resImg = new Image();
        resImg.src = finalCanvas.toDataURL();
        resImg.onload = () => {
            state.factory.processedImage = resImg;
            els.btns.addToLib.disabled = false;
            renderFactoryPreview();
        };
    }

    // Switch main library tab programmatically and render
    function setLibraryTab(type) {
        const tabs = document.querySelectorAll('.library-panel .library-tabs .tab-btn');
        tabs.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === type));
        renderLibrary(type);
    }

    // --- LIBRARY ---
    function renderLibrary(activeType) {
        if (!activeType) {
            const activeTab = document.querySelector('.tab-btn.active');
            activeType = activeTab ? activeTab.dataset.tab : 'character';
            if (!activeType) activeType = 'character';
        }

        els.libraryGrid.innerHTML = '';

        const items = state.library.filter(i => i.type === activeType);

        if (items.length === 0) {
            return;
        }

        items.forEach(item => {
            const div = document.createElement('div');
            div.className = `library-item ${state.selectedCharId === item.id ? 'selected' : ''}`;

            // CSS Style fix for centering and robust sizing
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            div.style.padding = '4px';

            const cvs = document.createElement('canvas');
            div.appendChild(cvs);

            const ctx = cvs.getContext('2d');
            const dpr = window.devicePixelRatio || 1;

            const meta = getFrameMeta(item, () => renderLibrary(activeType));
            if (!meta) {
                cvs.width = cvs.height = 10;
                return;
            }

            const { srcX, srcY, srcW, srcH } = meta;

            // Draw thumbnail onto a fixed-size square canvas to avoid overflow/cropping
            const thumbSize = 72;
            const padding = 4;
            const drawArea = thumbSize - padding * 2;
            const safeSrcW = srcW || 1;
            const safeSrcH = srcH || 1;
            const scale = Math.min(drawArea / safeSrcW, drawArea / safeSrcH);
            const drawW = safeSrcW * scale;
            const drawH = safeSrcH * scale;
            const dx = (thumbSize - drawW) / 2;
            const dy = (thumbSize - drawH) / 2;

            cvs.width = thumbSize * dpr;
            cvs.height = thumbSize * dpr;
            cvs.style.width = '100%';
            cvs.style.height = '100%';
            cvs.style.maxWidth = '100%';
            cvs.style.maxHeight = '100%';
            cvs.style.minWidth = '0';
            cvs.style.minHeight = '0';
            cvs.style.imageRendering = 'pixelated';

            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, thumbSize, thumbSize);
            ctx.drawImage(item.imageElem, srcX, srcY, safeSrcW, safeSrcH, dx, dy, drawW, drawH);

            div.onclick = () => {
                if (activeType === 'character') {
                    state.selectedCharId = item.id;
                    renderLibrary('character');
                } else {
                    equipAccessory(item.id);
                }
            };

            els.libraryGrid.appendChild(div);
        });
    }

    function equipAccessory(assetId) {
        const asset = state.library.find(i => i.id === assetId);
        if (!asset) return;

        const instanceId = crypto.randomUUID();
        state.equipped.push({
            instanceId,
            assetId,
            config: { x: 0, y: -50, scale: 0.33, rotation: 0, bobbing: 2 } // default scale to one-third size
        });
        state.activeInstanceId = instanceId;
        updateControlsUI();
    }

    function updateActiveConfig(changes) {
        if (!state.activeInstanceId) return;
        const acc = state.equipped.find(a => a.instanceId === state.activeInstanceId);
        if (acc) {
            Object.assign(acc.config, changes);
            updateControlsUI();
        }
    }

    function updateControlsUI() {
        const acc = state.equipped.find(a => a.instanceId === state.activeInstanceId);

        if (acc) {
            els.noSelMsg.classList.add('hidden');
            els.controlsForm.classList.remove('hidden');

            els.inputs.bobbing.value = acc.config.bobbing;
            els.inputs.scale.value = acc.config.scale;
            els.inputs.rotation.value = acc.config.rotation;
        } else {
            els.noSelMsg.classList.remove('hidden');
            els.controlsForm.classList.add('hidden');
        }
    }

    // --- VIEW SCALING ---
    function getViewScale(cvs) {
        const charItem = state.library.find(i => i.id === state.selectedCharId);
        const charMeta = getFrameMeta(charItem);

        // Base scale calculation to FIT content
        let baseScale = 1.0;

        if (charMeta) {
            const dpr = window.devicePixelRatio || 1;
            const fw = charMeta.srcW;
            const fh = charMeta.srcH;

            // Use small padding so角色可放大到接近灰底框大小
            const padding = 4;
            const logicalW = (cvs.width || 0) / dpr;
            const logicalH = (cvs.height || 0) / dpr;
            const availableW = Math.max(1, logicalW - padding * 2);
            const availableH = Math.max(1, logicalH - padding * 2);

            // Safety check
            if (availableW <= 0 || availableH <= 0 || fw === 0 || fh === 0) return 0.6 * state.view.zoom;

            const scaleX = availableW / fw;
            const scaleY = availableH / fh;

            // Fit by default
            baseScale = Math.min(scaleX, scaleY);
        } else {
            baseScale = 0.6;
        }

        // Return fit-to-container scale; character zoom handled separately
        return baseScale;
    }

    // Interactions
    let interaction = {
        mode: 'none',
        startMx: 0,
        startMy: 0,
        startVal: {},
        viewScale: 1,
        centerX: 0,
        centerY: 0,
        startScale: 1,
        startDist: 0,
        startAngle: 0,
        startRotation: 0,
        handle: null
    };

    let gifWorkerUrl = null; // cache for gif.js worker blob URL
    const GIF_WORKER_CDN = 'https://cdn.jsdelivr.net/npm/gif.js@0.2.0/dist/gif.worker.js';

    function getHitAccessory(mx, my, cvs) {
        const viewScale = getViewScale(cvs);
        const dpr = window.devicePixelRatio || 1;
        const cw = (cvs.width || 0) / dpr;
        const ch = (cvs.height || 0) / dpr;
        const cx = cw / 2; const cy = ch / 2;

        for (let i = state.equipped.length - 1; i >= 0; i--) {
            const item = state.equipped[i];
            const asset = state.library.find(a => a.id === item.assetId);
            const meta = getFrameMeta(asset);
            if (!asset || !meta) continue;

            const { x, y, scale, rotation } = item.config;
            const finalX = cx + (x * viewScale);
            const finalY = cy + (y * viewScale);
            const aw = meta.srcW * scale * viewScale;
            const ah = meta.srcH * scale * viewScale;
            const halfW = aw / 2;
            const halfH = ah / 2;

            const rotRad = rotation * Math.PI / 180;
            const cosR = Math.cos(-rotRad);
            const sinR = Math.sin(-rotRad);
            const dx = mx - finalX;
            const dy = my - finalY;
            const localX = dx * cosR - dy * sinR;
            const localY = dx * sinR + dy * cosR;

            const pad = 10; // allow hit slightly outside bbox
            const handlePad = 8;
            const handleSize = 14;
            const rotOffset = 18;

            // Hit rotation first
            const rotHit = Math.abs(localX - 0) <= handleSize && Math.abs(localY - (-halfH - handlePad - rotOffset)) <= handleSize;
            if (rotHit) {
                return { item, meta, finalX, finalY, viewScale, mode: 'rotate' };
            }

            // Hit scale handles
            const handles = [
                { name: 'tl', hx: -halfW - handlePad, hy: -halfH - handlePad, cursor: 'nwse-resize' },
                { name: 'tr', hx: halfW + handlePad, hy: -halfH - handlePad, cursor: 'nesw-resize' },
                { name: 'bl', hx: -halfW - handlePad, hy: halfH + handlePad, cursor: 'nesw-resize' },
                { name: 'br', hx: halfW + handlePad, hy: halfH + handlePad, cursor: 'nwse-resize' }
            ];
            for (const h of handles) {
                if (Math.abs(localX - h.hx) <= handleSize && Math.abs(localY - h.hy) <= handleSize) {
                    return { item, meta, finalX, finalY, viewScale, mode: 'scale', handle: h };
                }
            }

            // Body hit
            if (localX >= -halfW - pad && localX <= halfW + pad &&
                localY >= -halfH - pad && localY <= halfH + pad) {
                return { item, meta, finalX, finalY, viewScale, mode: 'move' };
            }
        }
        return null;
    }

    function handleGizmoDown(e) {
        const cvs = els.canvases.gizmo;
        const rect = cvs.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        const hit = getHitAccessory(mx, my, cvs);

        if (hit) {
            const { item, viewScale, finalX, finalY, mode, handle } = hit;
            state.activeInstanceId = item.instanceId;
            interaction.mode = mode || 'move';
            interaction.startMx = mx;
            interaction.startMy = my;
            interaction.startVal = { ...item.config };
            interaction.viewScale = viewScale;
            interaction.centerX = finalX;
            interaction.centerY = finalY;
            interaction.startScale = item.config.scale;
            interaction.startDist = Math.max(1e-3, Math.hypot(mx - finalX, my - finalY) / viewScale);
            interaction.startAngle = Math.atan2(my - finalY, mx - finalX);
            interaction.startRotation = item.config.rotation;
            interaction.handle = handle;
            cvs.style.cursor = mode === 'rotate' ? 'crosshair' : (mode === 'scale' ? (handle?.cursor || 'nwse-resize') : 'grabbing');
            updateControlsUI();
        } else {
            state.activeInstanceId = null;
            interaction.mode = 'none';
            cvs.style.cursor = 'default';
            updateControlsUI();
        }
    }

    function handleGizmoMove(e) {
        if (interaction.mode === 'none' || !state.activeInstanceId) return;

        const cvs = els.canvases.gizmo;
        const rect = cvs.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        const dx = mx - interaction.startMx;
        const dy = my - interaction.startMy;

        if (interaction.mode === 'move') {
            const logicalDx = dx / interaction.viewScale;
            const logicalDy = dy / interaction.viewScale;
            updateActiveConfig({
                x: interaction.startVal.x + logicalDx,
                y: interaction.startVal.y + logicalDy
            });
            cvs.style.cursor = 'grabbing';
        } else if (interaction.mode === 'scale') {
            const dpr = window.devicePixelRatio || 1;
            const cw = (cvs.width || 0) / dpr;
            const ch = (cvs.height || 0) / dpr;
            const cx = cw / 2; const cy = ch / 2;
            const asset = state.equipped.find(a => a.instanceId === state.activeInstanceId);
            if (!asset) return;
            const centerX = cx + (asset.config.x * interaction.viewScale);
            const centerY = cy + (asset.config.y * interaction.viewScale);

            const dist = Math.hypot(mx - centerX, my - centerY);
            const logicalDist = dist / interaction.viewScale;
            const ratio = Math.max(0.05, logicalDist / interaction.startDist);
            const newScale = Math.max(0.05, interaction.startScale * ratio);
            updateActiveConfig({ scale: newScale });
            cvs.style.cursor = interaction.handle?.cursor || 'nwse-resize';
        } else if (interaction.mode === 'rotate') {
            const dpr = window.devicePixelRatio || 1;
            const cw = (cvs.width || 0) / dpr;
            const ch = (cvs.height || 0) / dpr;
            const cx = cw / 2; const cy = ch / 2;
            const asset = state.equipped.find(a => a.instanceId === state.activeInstanceId);
            if (!asset) return;
            const centerX = cx + (asset.config.x * interaction.viewScale);
            const centerY = cy + (asset.config.y * interaction.viewScale);
            const angleNow = Math.atan2(my - centerY, mx - centerX);
            const deltaDeg = (angleNow - interaction.startAngle) * 180 / Math.PI;
            const newRot = interaction.startRotation + deltaDeg;
            updateActiveConfig({ rotation: newRot });
            cvs.style.cursor = 'crosshair';
        }
    }

    function handleGizmoHover(e) {
        if (!els.canvases.gizmo) return;
        const cvs = els.canvases.gizmo;
        if (interaction.mode !== 'none') return;
        const rect = cvs.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const hit = getHitAccessory(mx, my, cvs);
        if (!hit) {
            cvs.style.cursor = 'default';
        } else if (hit.mode === 'rotate') {
            cvs.style.cursor = 'crosshair';
        } else if (hit.mode === 'scale') {
            cvs.style.cursor = hit.handle?.cursor || 'nwse-resize';
        } else {
            cvs.style.cursor = 'grab';
        }
    }

    function handleGizmoUp(e) {
        const cvs = els.canvases.gizmo;
        setInteractionMode('none');
        if (!cvs) return;
        const rect = cvs.getBoundingClientRect();
        const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
        if (inside) {
            handleGizmoHover(e);
        } else {
            cvs.style.cursor = 'default';
        }
    }

    function setInteractionMode(m) {
        interaction.mode = m;
        if (m === 'none') {
            interaction.handle = null;
        }
    }

    function renderCustomOrderList(blobs, order, srcCanvas) {
        const wrapper = document.getElementById('custom-order-wrapper');
        const listEl = document.getElementById('custom-order-list');
        if (!wrapper || !listEl) return;

        if (!blobs || state.factory.mode !== 'character' || state.factory.selectionMode !== 'custom') {
            wrapper.classList.add('hidden');
            listEl.innerHTML = '';
            return;
        }

        wrapper.classList.remove('hidden');
        listEl.innerHTML = '';

        const thumbSize = 64;
        const pad = 6;
        let dragFrom = null;

        order.forEach((idx, pos) => {
            const blob = blobs[idx];
            if (!blob) return;
            const item = document.createElement('div');
            item.className = 'custom-item';
            item.draggable = true;
            item.dataset.pos = pos;

            const btn = document.createElement('button');
            btn.className = 'custom-remove';
            btn.textContent = '×';
            btn.onclick = (ev) => {
                ev.stopPropagation();
                if (order.length <= 1) {
                    showToast('至少保留一格');
                    return;
                }
                state.factory.customOrder = order.filter((_, i) => i !== pos);
                runProcessingPipeline();
            };

            const c = document.createElement('canvas');
            c.width = thumbSize;
            c.height = thumbSize;
            c.className = 'custom-thumb';
            const ctx = c.getContext('2d');
            const bw = blob.maxX - blob.minX + 1;
            const bh = blob.maxY - blob.minY + 1;
            const scale = Math.min((thumbSize - pad * 2) / bw, (thumbSize - pad * 2) / bh);
            const dw = bw * scale;
            const dh = bh * scale;
            const dx = (thumbSize - dw) / 2;
            const dy = (thumbSize - dh) / 2;
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(srcCanvas, blob.minX, blob.minY, bw, bh, dx, dy, dw, dh);

            item.appendChild(c);
            item.appendChild(btn);

            item.addEventListener('dragstart', () => {
                dragFrom = pos;
                item.classList.add('dragging');
            });
            item.addEventListener('dragend', () => item.classList.remove('dragging'));
            item.addEventListener('dragover', (ev) => ev.preventDefault());
            item.addEventListener('drop', (ev) => {
                ev.preventDefault();
                const targetPos = parseInt(item.dataset.pos, 10);
                if (isNaN(targetPos) || dragFrom === null) return;
                if (targetPos === dragFrom) return;
                const newOrder = state.factory.customOrder.slice();
                const [moved] = newOrder.splice(dragFrom, 1);
                newOrder.splice(targetPos, 0, moved);
                state.factory.customOrder = newOrder;
                runProcessingPipeline();
            });

            listEl.appendChild(item);
        });
    }

    // Loop
    function startAnimationLoops() {
        let lastTime = 0;
        let frameIndex = 0;

        const setupCanvas = (cvs) => {
            const dpr = window.devicePixelRatio || 1;
            const cssW = cvs.clientWidth || cvs.width;
            const cssH = cvs.clientHeight || cvs.height;
            const targetW = Math.max(1, Math.round(cssW * dpr));
            const targetH = Math.max(1, Math.round(cssH * dpr));
            if (cvs.width !== targetW || cvs.height !== targetH) {
                cvs.width = targetW;
                cvs.height = targetH;
                const ctx = cvs.getContext('2d');
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                ctx.imageSmoothingEnabled = false;
            }
            return dpr;
        };

        const previewLoop = (time) => {
            const ctx = els.canvases.main.getContext('2d');
            const cvs = els.canvases.main;

            const dpr = setupCanvas(cvs);

            const cw = (cvs.width) / dpr; const ch = (cvs.height) / dpr;
            if (state.view.bgTransparent) {
                ctx.clearRect(0, 0, cw, ch);
            } else {
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.fillStyle = state.view.bgColor || '#000000';
                ctx.fillRect(0, 0, cvs.width, cvs.height);
                ctx.restore();
            }

            const charItem = state.library.find(i => i.id === state.selectedCharId);
            const charMeta = getFrameMeta(charItem);
            if (time - lastTime > 150) {
                if (charItem) {
                    const fc = charItem.frameCount;
                    frameIndex = (frameIndex + 1) % fc;
                }
                lastTime = time;
            }

            const centerX = cw / 2;

            // Base fit scale (used for accessories); character has additional zoom
            const baseScale = getViewScale(cvs);
            const charScale = baseScale * state.view.zoom;

            if (charItem && charMeta) {
                const { frameW, frameH, srcX, srcY, srcW, srcH } = charMeta;
                const fw = frameW;
                const fh = frameH;

                // Use same viewScale as Gizmo for consistency of size
                const destW = srcW * charScale;
                const destH = srcH * charScale;

                // Center Vertically based on viewScale
                const cy = ch / 2;

                const frameOffsetX = frameIndex * fw + srcX;
                ctx.drawImage(charItem.imageElem,
                    frameOffsetX, srcY, srcW, srcH,
                    centerX - destW / 2, cy - destH / 2, destW, destH
                );

                const isBobbing = (frameIndex % 2 !== 0);

                state.equipped.forEach(eq => {
                    const asset = state.library.find(a => a.id === eq.assetId);
                    const assetMeta = getFrameMeta(asset);
                    if (!asset || !assetMeta) return;

                    const { x, y, scale, rotation, bobbing } = eq.config;
                    const bobY = isBobbing ? -bobbing : 0;

                    const finalX = centerX + (x * baseScale);
                    const finalY = cy + (y * baseScale) + (bobY * baseScale);

                    const aw = assetMeta.srcW * scale * baseScale;
                    const ah = assetMeta.srcH * scale * baseScale;

                    ctx.save();
                    ctx.translate(finalX, finalY);
                    ctx.rotate(rotation * Math.PI / 180);
                    ctx.drawImage(asset.imageElem, assetMeta.srcX, assetMeta.srcY, assetMeta.srcW, assetMeta.srcH,
                        -aw / 2, -ah / 2, aw, ah);
                    ctx.restore();
                });
            }

            requestAnimationFrame(previewLoop);
        };

        const gizmoLoop = () => {
            const ctx = els.canvases.gizmo.getContext('2d');
            const cvs = els.canvases.gizmo;

            const dpr = setupCanvas(cvs);

            const cw = (cvs.width) / dpr; const ch = (cvs.height) / dpr;
            const cx = cw / 2; const cy = ch / 2;

            if (state.view.bgTransparent) {
                ctx.clearRect(0, 0, cw, ch);
            } else {
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.fillStyle = state.view.bgColor || '#000000';
                ctx.fillRect(0, 0, cvs.width, cvs.height);
                ctx.restore();
            }

            const charItem = state.library.find(i => i.id === state.selectedCharId);
            const charMeta = getFrameMeta(charItem);
            const baseScale = getViewScale(cvs);
            const charScale = baseScale * state.view.zoom;

            if (charItem && charMeta) {
                const { frameW, frameH, srcX, srcY, srcW, srcH } = charMeta;
                const fw = frameW;
                const fh = frameH;

                const dw = srcW * charScale;
                const dh = srcH * charScale;

                ctx.drawImage(charItem.imageElem,
                    srcX, srcY, srcW, srcH,
                    cx - dw / 2, cy - dh / 2, dw, dh
                );
            }

            state.equipped.forEach(eq => {
                const asset = state.library.find(a => a.id === eq.assetId);
                const assetMeta = getFrameMeta(asset);
                if (!asset || !assetMeta) return;
                const { x, y, scale, rotation } = eq.config;

                const finalX = cx + (x * baseScale);
                const finalY = cy + (y * baseScale);
                const aw = assetMeta.srcW * scale * baseScale;
                const ah = assetMeta.srcH * scale * baseScale;

                ctx.save();
                ctx.translate(finalX, finalY);
                ctx.rotate(rotation * Math.PI / 180);
                ctx.drawImage(asset.imageElem, assetMeta.srcX, assetMeta.srcY, assetMeta.srcW, assetMeta.srcH,
                    -aw / 2, -ah / 2, aw, ah);

                if (eq.instanceId === state.activeInstanceId) {
                    ctx.strokeStyle = '#10b981';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(-aw / 2, -ah / 2, aw, ah);

                    // Handles for scale/rotate
                    ctx.fillStyle = 'white';
                    const hs = 8;
                    const pad = 8;
                    ctx.fillRect(-aw / 2 - pad - hs / 2, -ah / 2 - pad - hs / 2, hs, hs);
                    ctx.fillRect(aw / 2 + pad - hs / 2, -ah / 2 - pad - hs / 2, hs, hs);
                    ctx.fillRect(-aw / 2 - pad - hs / 2, ah / 2 + pad - hs / 2, hs, hs);
                    ctx.fillRect(aw / 2 + pad - hs / 2, ah / 2 + pad - hs / 2, hs, hs);

                    // Rotation handle (top-center)
                    const rotOffset = 18;
                    const rotPad = 8;
                    const rotX = 0;
                    const rotY = -ah / 2 - rotPad - rotOffset;
                    ctx.beginPath();
                    ctx.moveTo(0, -ah / 2);
                    ctx.lineTo(rotX, rotY);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(rotX, rotY, 7, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.restore();
            });

            requestAnimationFrame(gizmoLoop);
        };

        requestAnimationFrame(previewLoop);
        requestAnimationFrame(gizmoLoop);
    }

    // --- UTILS ---
    function drawPreviewFrame(targetCvs, frameIndex) {
        const dpr = window.devicePixelRatio || 1;
        const ctx = targetCvs.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        const cw = (targetCvs.width || 0) / dpr;
        const ch = (targetCvs.height || 0) / dpr;
        if (state.view.bgTransparent) {
            ctx.clearRect(0, 0, cw, ch);
        } else {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.fillStyle = state.view.bgColor || '#000000';
            ctx.fillRect(0, 0, targetCvs.width, targetCvs.height);
            ctx.restore();
        }

        const charItem = state.library.find(i => i.id === state.selectedCharId);
        const charMeta = getFrameMeta(charItem);
        const baseScale = getViewScale(targetCvs);
        const charScale = baseScale * state.view.zoom;
        const centerX = cw / 2;
        const cy = ch / 2;

        if (charItem && charMeta) {
            const { frameW, srcX, srcY, srcW, srcH } = charMeta;
            const destW = srcW * charScale;
            const destH = srcH * charScale;
            const frameOffsetX = frameIndex * frameW + srcX;
            ctx.drawImage(charItem.imageElem,
                frameOffsetX, srcY, srcW, srcH,
                centerX - destW / 2, cy - destH / 2, destW, destH
            );
        }

        const isBobbing = frameIndex % 2 !== 0;
        state.equipped.forEach(eq => {
            const asset = state.library.find(a => a.id === eq.assetId);
            const assetMeta = getFrameMeta(asset);
            if (!asset || !assetMeta) return;

            const { x, y, scale, rotation, bobbing } = eq.config;
            const bobY = isBobbing ? -bobbing : 0;

            const finalX = centerX + (x * baseScale);
            const finalY = cy + (y * baseScale) + (bobY * baseScale);

            const aw = assetMeta.srcW * scale * baseScale;
            const ah = assetMeta.srcH * scale * baseScale;

            ctx.save();
            ctx.translate(finalX, finalY);
            ctx.rotate(rotation * Math.PI / 180);
            ctx.drawImage(asset.imageElem, assetMeta.srcX, assetMeta.srcY, assetMeta.srcW, assetMeta.srcH,
                -aw / 2, -ah / 2, aw, ah);
            ctx.restore();
        });
    }

    async function exportGif() {
        const btn = els.btns.exportGif;
        if (!state.selectedCharId) return showToast('請先選擇角色');
        if (!window.GIF) return showToast('GIF 引擎未載入');
        if (state.view.bgTransparent) {
            setGifError('提示：GIF 只有 1-bit 透明，邊緣可能吃掉線條');
        }
        if (!state.view.bgTransparent) {
            showToast('GIF 會套用背景色：' + state.view.bgColor);
        }

        btn.disabled = true;
        btn.textContent = '輸出中...';
        setGifError('');

        try {
            // Ensure worker script is same-origin via blob to avoid file:// or CORS issues
            const workerScript = await ensureGifWorkerScript();

            const mainCvs = els.canvases.main;
            const off = document.createElement('canvas');
            off.width = mainCvs.width;
            off.height = mainCvs.height;

            const charItem = state.library.find(i => i.id === state.selectedCharId);
            const frameCount = charItem ? Math.max(1, charItem.frameCount || 1) : 1;
            const delay = 150;

            const gifOptions = {
                workers: 2,
                quality: 2,
                width: off.width,
                height: off.height,
                workerScript
            };
            if (state.view.bgTransparent) {
                gifOptions.transparent = 0x00ff00; // reserve a chroma key for transparency
            }

            const gif = new GIF(gifOptions);

            for (let i = 0; i < frameCount; i++) {
                drawPreviewFrame(off, i);
                gif.addFrame(off, { copy: true, delay });
            }

            gif.on('finished', (blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'womowomimo.com_spritesheet_to_gif.gif';
                link.click();
                setTimeout(() => URL.revokeObjectURL(url), 5000);
                showToast('已下載 GIF');
                setGifError('');
                btn.disabled = false;
                btn.textContent = '輸出 GIF';
            });

            gif.render();
        } catch (err) {
            console.error(err);
            showToast('輸出 GIF 失敗');
            setGifError('輸出 GIF 失敗，請確認網路，或使用 http/https 伺服器開啟頁面');
            btn.disabled = false;
            btn.textContent = '輸出 GIF';
        }
    }

    async function ensureGifWorkerScript() {
        if (gifWorkerUrl) return gifWorkerUrl;
        try {
            const res = await fetch(GIF_WORKER_CDN);
            if (!res.ok) throw new Error('fetch worker failed');
            const code = await res.text();
            gifWorkerUrl = URL.createObjectURL(new Blob([code], { type: 'application/javascript' }));
            return gifWorkerUrl;
        } catch (err) {
            console.error('load gif worker failed', err);
            throw new Error('無法載入 GIF worker，請確認網路或使用 http/https 伺服器重新開啟頁面');
        }
    }

    function showToast(msg) {
        const t = document.getElementById('toast');
        t.textContent = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 3000);
    }

    function setGifError(msg) {
        const el = document.getElementById('gif-error');
        if (!el) return;
        el.textContent = msg || '';
        el.classList.toggle('hidden', !msg);
    }

    // Run
    window.addEventListener('load', init);
