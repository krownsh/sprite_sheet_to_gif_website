/**
 * Info & SPA Manager for Pixel Sprite Studio
 * Handles view switching between tool and static content pages
 */
const InfoManager = {
    init() {
        this.bindEvents();
        this.handleRouting();
        window.addEventListener('hashchange', () => this.handleRouting());
    },

    bindEvents() {
        // Handle links with data-view attribute
        document.querySelectorAll('[data-view]').forEach(el => {
            el.addEventListener('click', (e) => {
                const view = el.dataset.view;
                if (view === 'home') {
                    window.location.hash = '';
                } else {
                    window.location.hash = view;
                }
                e.preventDefault();
            });
        });
    },

    handleRouting() {
        const hash = window.location.hash.replace('#', '');
        if (!hash || hash === 'home') {
            this.showTool();
        } else if (hash.startsWith('blog-')) {
            const blogId = hash.replace('blog-', '');
            this.showBlog(blogId);
        } else {
            this.showPage(hash);
        }
    },

    showTool() {
        document.querySelector('main').style.display = 'flex';
        document.querySelector('#tutorial').style.display = 'block';
        document.querySelector('#hero-section').style.display = 'block';
        document.querySelector('#info-section').style.display = 'none';
        window.scrollTo(0, 0);
    },

    showPage(pageId) {
        document.querySelector('main').style.display = 'none';
        document.querySelector('#tutorial').style.display = 'none';
        document.querySelector('#hero-section').style.display = 'none';

        const infoSection = document.querySelector('#info-section');
        infoSection.style.display = 'block';

        const titleKey = `info.${pageId}.title`;
        const contentKey = `info.${pageId}.content`;

        const contentHtml = `
            <div class="info-content-wrapper">
                <button class="btn btn-secondary mb-4" onclick="window.location.hash=''"><i data-lucide="arrow-left"></i> ${Lang.get('nav.home')}</button>
                <h1 class="info-title">${Lang.get(titleKey)}</h1>
                <div class="info-body">${Lang.get(contentKey).replace(/\\n/g, '<br>')}</div>
            </div>
        `;

        infoSection.innerHTML = contentHtml;
        lucide.createIcons();
        window.scrollTo(0, 0);
    },

    showBlog(blogId) {
        document.querySelector('main').style.display = 'none';
        document.querySelector('#tutorial').style.display = 'none';
        document.querySelector('#hero-section').style.display = 'none';

        const infoSection = document.querySelector('#info-section');
        infoSection.style.display = 'block';

        const titleKey = `blog.${blogId}.title`;
        const contentKey = `blog.${blogId}.content`;

        const contentHtml = `
            <div class="info-content-wrapper blog-view">
                <button class="btn btn-secondary mb-4" onclick="window.location.hash=''"><i data-lucide="arrow-left"></i> ${Lang.get('nav.home')}</button>
                <h1 class="info-title">${Lang.get(titleKey)}</h1>
                <div class="blog-meta text-muted mb-4">Posted on 2026-01-02 | Category: Tutorials</div>
                <div class="info-body blog-body">${Lang.get(contentKey).replace(/\\n/g, '<br>')}</div>
                <div class="blog-footer mt-8 pt-4 border-t border-slate-700">
                    <p class="text-sm text-slate-400">Want to try creating your own? <a href="#" onclick="window.location.hash=''; return false;" class="text-emerald-500">Back to Studio</a></p>
                </div>
            </div>
        `;

        infoSection.innerHTML = contentHtml;
        lucide.createIcons();
        window.scrollTo(0, 0);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    InfoManager.init();
});
