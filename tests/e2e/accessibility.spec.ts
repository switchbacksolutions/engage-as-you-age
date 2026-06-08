/**
 * tests/e2e/accessibility.spec.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Accessibility checks powered by axe-core, with extra emphasis on color
 * contrast and text legibility — this site serves an older-adult audience,
 * so WCAG AA contrast and readable minimum font sizes matter more than usual.
 *
 * Run: npm run test:e2e -- accessibility
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = ['/', '/about', '/why-engage', '/services', '/service-area', '/contact', '/work-for-us', '/blog'];

// Minimum body copy size for an older-adult audience. Browsers default to
// 16px; we want body text comfortably above that floor.
const MIN_BODY_FONT_PX = 16;

test.describe('Accessibility — axe-core scan', () => {
  for (const path of PAGES) {
    test(`${path} has no WCAG2 A/AA violations`, async ({ page }) => {
      await page.goto(path);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();

      const summary = results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        nodes: violation.nodes.map((node) => node.target.join(' ')),
      }));

      expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
    });
  }
});

test.describe('Accessibility — color contrast', () => {
  for (const path of PAGES) {
    test(`${path} has no color-contrast violations (light mode)`, async ({ page }) => {
      await page.goto(path);

      const results = await new AxeBuilder({ page })
        .withRules(['color-contrast'])
        .analyze();

      const summary = results.violations.flatMap((violation) =>
        violation.nodes.map((node) => ({
          target: node.target.join(' '),
          summary: node.failureSummary,
        }))
      );

      expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
    });

    test(`${path} has no color-contrast violations (dark mode)`, async ({ page }) => {
      await page.goto(path);
      await page.evaluate(() => document.documentElement.classList.add('dark'));

      const results = await new AxeBuilder({ page })
        .withRules(['color-contrast'])
        .analyze();

      const summary = results.violations.flatMap((violation) =>
        violation.nodes.map((node) => ({
          target: node.target.join(' '),
          summary: node.failureSummary,
        }))
      );

      expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
    });
  }
});

test.describe('Accessibility — text legibility', () => {
  test('body copy renders at or above the minimum legible size', async ({ page }) => {
    await page.goto('/');

    // Sample paragraph text across the home page — the bulk of body copy
    // readers will scan — and confirm none renders below the floor.
    const undersized = await page.evaluate((minPx) => {
      const candidates = Array.from(document.querySelectorAll('p, li, a, span'));
      return candidates
        .filter((el) => (el.textContent ?? '').trim().length > 0)
        .map((el) => {
          const size = parseFloat(getComputedStyle(el).fontSize);
          return { text: (el.textContent ?? '').trim().slice(0, 60), size };
        })
        .filter((entry) => entry.size < minPx);
    }, MIN_BODY_FONT_PX);

    expect(undersized, JSON.stringify(undersized, null, 2)).toEqual([]);
  });

  test('blog post body copy renders at or above the minimum legible size', async ({ page }) => {
    await page.goto('/blog');
    await page.getByTestId('blog-post-list').getByRole('link').first().click();

    const undersized = await page.evaluate((minPx) => {
      const article = document.querySelector('article');
      if (!article) return [];
      const candidates = Array.from(article.querySelectorAll('p, li'));
      return candidates
        .filter((el) => (el.textContent ?? '').trim().length > 0)
        .map((el) => {
          const size = parseFloat(getComputedStyle(el).fontSize);
          return { text: (el.textContent ?? '').trim().slice(0, 60), size };
        })
        .filter((entry) => entry.size < minPx);
    }, MIN_BODY_FONT_PX);

    expect(undersized, JSON.stringify(undersized, null, 2)).toEqual([]);
  });

  test('line-height gives body copy comfortable spacing (>= 1.4x font size)', async ({ page }) => {
    await page.goto('/');

    const cramped = await page.evaluate(() => {
      const candidates = Array.from(document.querySelectorAll('p'));
      return candidates
        .filter((el) => (el.textContent ?? '').trim().length > 0)
        .map((el) => {
          const styles = getComputedStyle(el);
          const fontSize = parseFloat(styles.fontSize);
          const lineHeight = parseFloat(styles.lineHeight);
          return { text: (el.textContent ?? '').trim().slice(0, 60), ratio: lineHeight / fontSize };
        })
        .filter((entry) => entry.ratio < 1.4);
    });

    expect(cramped, JSON.stringify(cramped, null, 2)).toEqual([]);
  });
});
