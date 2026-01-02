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
        } else if (hash === 'blog') {
            this.showBlogList();
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

        let contentHtml = '';
        if (pageId === 'faq') {
            contentHtml = this.renderFAQ();
        } else {
            const titleKey = `info.${pageId}.title`;
            const contentKey = `info.${pageId}.content`;
            const content = Lang.get(contentKey);

            contentHtml = `
                <div class="info-content-wrapper">
                    <button class="btn btn-secondary mb-4" onclick="window.location.hash=''"><i data-lucide="arrow-left"></i> ${Lang.get('nav.home')}</button>
                    <h1 class="info-title">${Lang.get(titleKey)}</h1>
                    <div class="info-body">${content.replace(/\\n/g, '<br>')}</div>
                </div>
            `;
        }

        infoSection.innerHTML = contentHtml;
        lucide.createIcons();
        window.scrollTo(0, 0);
    },

    renderFAQ() {
        let faqItems = '';
        for (let i = 1; i <= 10; i++) {
            const qKey = `info.faq.q${i}`;
            const aKey = `info.faq.a${i}`;
            const q = Lang.get(qKey);
            const a = Lang.get(aKey);

            if (q === qKey) break;

            faqItems += `
                <div class="faq-item mb-8">
                    <h3 class="faq-question text-emerald-400 font-bold text-lg mb-2">Q: ${q}</h3>
                    <div class="faq-answer text-slate-300 leading-relaxed pl-4 border-l-2 border-slate-700">${a.replace(/\\n/g, '<br>')}</div>
                </div>
            `;
        }

        return `
            <div class="info-content-wrapper">
                <button class="btn btn-secondary mb-4" onclick="window.location.hash=''"><i data-lucide="arrow-left"></i> ${Lang.get('nav.home')}</button>
                <h1 class="info-title">${Lang.get('info.faq.title')}</h1>
                <div class="info-body">${faqItems}</div>
            </div>
        `;
    },

    showBlogList() {
        document.querySelector('main').style.display = 'none';
        document.querySelector('#tutorial').style.display = 'none';
        document.querySelector('#hero-section').style.display = 'none';

        const infoSection = document.querySelector('#info-section');
        infoSection.style.display = 'block';

        let blogCards = '';
        for (let i = 1; i <= 10; i++) {
            const titleKey = `blog.p${i}.title`;
            const summaryKey = `blog.p${i}.summary`;
            const title = Lang.get(titleKey);
            const summary = Lang.get(summaryKey);

            if (title === titleKey) break;

            blogCards += `
                <div class="blog-card bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer mb-6 group" onclick="window.location.hash='blog-p${i}'">
                    <h3 class="text-xl font-bold mb-2 text-white group-hover:text-emerald-400 transition-colors">${title}</h3>
                    <p class="text-slate-400 text-sm mb-4 leading-relaxed">${summary}</p>
                    <span class="text-emerald-500 text-sm font-medium">Read More →</span>
                </div>
            `;
        }

        const contentHtml = `
            <div class="info-content-wrapper blog-list-view">
                <button class="btn btn-secondary mb-4" onclick="window.location.hash=''"><i data-lucide="arrow-left"></i> ${Lang.get('nav.home')}</button>
                <h1 class="info-title">${Lang.get('nav.blog')}</h1>
                <div class="blog-list mt-8">
                    ${blogCards}
                </div>
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
                <button class="btn btn-secondary mb-4" onclick="window.location.hash='blog'"><i data-lucide="arrow-left"></i> ${Lang.get('nav.blog')}</button>
                <h1 class="info-title">${Lang.get(titleKey)}</h1>
                <div class="blog-meta text-slate-500 text-sm mb-6 pb-4 border-b border-slate-700">Posted on 2026-01-02 | Category: Tutorials</div>
                <div class="info-body blog-body">${Lang.get(contentKey).replace(/\\n/g, '<br>')}</div>
                <div class="blog-footer mt-12 pt-6 border-t border-slate-700">
                    <p class="text-sm text-slate-400">Want to try creating your own? <a href="#" onclick="window.location.hash=''; return false;" class="text-emerald-500 hover:underline">Back to Studio</a></p>
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
