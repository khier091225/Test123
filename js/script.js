/**
 * Kestrel Daylight Static Architecture - Frontend Interactions
 * Pure Vanilla JavaScript | Accessible Mobile Drawer, WAI-ARIA Tabs, Token Clipboard, Scroll Reveal
 */
(function () {
  'use strict';

  document.documentElement.classList.add('js-ready');

  /* ==========================================================================
     1. Accessible Mobile Navigation Drawer
     ========================================================================== */
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  function setMobileMenuState(isOpen) {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
    if (isOpen) {
      mobileDrawer.removeAttribute('hidden');
    } else {
      mobileDrawer.setAttribute('hidden', '');
    }
  }

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', function () {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      setMobileMenuState(!expanded);
    });

    const mobileLinks = mobileDrawer.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        setMobileMenuState(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (
        event.key === 'Escape' &&
        menuToggle.getAttribute('aria-expanded') === 'true'
      ) {
        setMobileMenuState(false);
        menuToggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (
        window.innerWidth > 960 &&
        menuToggle.getAttribute('aria-expanded') === 'true'
      ) {
        setMobileMenuState(false);
      }
    });
  }

  /* ==========================================================================
     2. Accessible WAI-ARIA Tabbed Specification Workbench
     ========================================================================== */
  const tabButtons = Array.from(document.querySelectorAll('.workbench-tab[role="tab"]'));
  const tabPanels = Array.from(document.querySelectorAll('.workbench-panel[role="tabpanel"]'));

  function activateTab(selectedTab, shouldFocus) {
    tabButtons.forEach(function (tab) {
      const isMatch = tab === selectedTab;
      tab.classList.toggle('is-active', isMatch);
      tab.setAttribute('aria-selected', String(isMatch));
      tab.setAttribute('tabindex', isMatch ? '0' : '-1');
      if (isMatch && shouldFocus) {
        tab.focus();
      }
    });

    const targetPanelId = selectedTab.getAttribute('aria-controls');
    tabPanels.forEach(function (panel) {
      const isMatch = panel.id === targetPanelId;
      panel.classList.toggle('is-active', isMatch);
      if (isMatch) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });
  }

  tabButtons.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      activateTab(tab, false);
    });

    tab.addEventListener('keydown', function (event) {
      let nextIndex = null;
      if (event.key === 'ArrowRight') {
        nextIndex = (index + 1) % tabButtons.length;
      } else if (event.key === 'ArrowLeft') {
        nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      } else if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = tabButtons.length - 1;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        activateTab(tabButtons[nextIndex], true);
      }
    });
  });

  /* ==========================================================================
     3. Workbench Spatial Density Preview Switcher
     ========================================================================== */
  const workbenchCore = document.querySelector('.workbench-core');
  const densityButtons = document.querySelectorAll('.density-btn[data-density]');

  densityButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const mode = button.getAttribute('data-density');
      densityButtons.forEach(function (btn) {
        const isCurrent = btn === button;
        btn.classList.toggle('is-selected', isCurrent);
        btn.setAttribute('aria-pressed', String(isCurrent));
      });

      if (workbenchCore) {
        workbenchCore.classList.toggle('is-compact', mode === 'compact');
      }
    });
  });

  /* ==========================================================================
     4. CSS Custom Property & Rule Clipboard Copy Helper
     ========================================================================== */
  const toastBar = document.getElementById('copy-toast-bar');
  const toastMessage = document.getElementById('copy-toast-message');
  const copyButtons = document.querySelectorAll('[data-copy]');
  const copyAllBtn = document.getElementById('copy-all-tokens-btn');
  const copyAllLabel = document.getElementById('copy-all-tokens-label');

  function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () {
        return fallbackCopyText(text);
      });
    }
    return Promise.resolve(fallbackCopyText(text));
  }

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      // Ignore fallback error in restricted environments
    }
    document.body.removeChild(textArea);
  }

  function announceCopied(declarationText) {
    if (!toastBar || !toastMessage) return;
    toastBar.classList.add('is-copied');
    toastMessage.textContent = 'Copied to clipboard: ' + declarationText;
  }

  copyButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const valueToCopy = button.getAttribute('data-copy');
      if (!valueToCopy) return;

      copyTextToClipboard(valueToCopy).then(function () {
        announceCopied(valueToCopy);
        const actionBadge = button.querySelector('.token-action');
        if (actionBadge) {
          const originalLabel = actionBadge.textContent;
          actionBadge.textContent = 'Copied';
          setTimeout(function () {
            actionBadge.textContent = originalLabel;
          }, 1600);
        }
      });
    });
  });

  if (copyAllBtn && copyAllLabel) {
    const rootTokensBlock = [
      ':root {',
      '  --color-primary: #1D4ED8;',
      '  --color-primary-hover: #1E40AF;',
      '  --color-accent: #0284C7;',
      '  --color-background: #FFFFFF;',
      '  --color-surface: #FFFFFF;',
      '  --color-text: #0F172A;',
      '  --color-text-muted: #475569;',
      '  --color-border: #DCE6F5;',
      '}'
    ].join('\n');

    copyAllBtn.addEventListener('click', function () {
      copyTextToClipboard(rootTokensBlock).then(function () {
        copyAllLabel.textContent = 'Copied :root Tokens';
        announceCopied(':root { --color-primary: #1D4ED8; ... }');
        setTimeout(function () {
          copyAllLabel.textContent = 'Copy Root Tokens';
        }, 2000);
      });
    });
  }

  /* ==========================================================================
     5. IntersectionObserver Scroll-Entry Choreography (No scroll listeners)
     ========================================================================== */
  const revealElements = document.querySelectorAll('[data-reveal]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ==========================================================================
     6. Exclusive FAQ Details Accordion Behavior
     ========================================================================== */
  const faqItems = Array.from(document.querySelectorAll('.faq-item'));
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item && other.open) {
            other.open = false;
          }
        });
      }
    });
  });
})();
