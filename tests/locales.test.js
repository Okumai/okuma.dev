import test from 'node:test';
import assert from 'node:assert/strict';
import { languages, translations } from '../src/locales.js';
import { categories } from '../src/projects.js';

test('Omarchy contains all three tools and categories have translated descriptions', () => {
  assert.equal(categories[0].id, 'omarchy');
  assert.deepEqual(categories[0].projects.map(project => project.name), ['Dock', 'Launchpad', 'Bar']);
  assert.equal(new Set(categories.map(category => category.id)).size, categories.length);
  for (const category of categories) {
    for (const dictionary of Object.values(translations)) {
      assert.ok(dictionary[category.descriptionKey]);
      assert.ok(dictionary[category.compatibilityKey]);
      for (const project of category.projects) {
        for (const suffix of ['Tag', 'Desc', 'Features']) assert.ok(dictionary[`${project.key}${suffix}`]);
      }
    }
  }
});

test('User Script contains both YouTube scripts with source and install links', () => {
  const category = categories.find(category => category.id === 'user-script');
  assert.equal(category.name, 'User Script');
  assert.deepEqual(category.projects.map(project => project.key), ['youtubeHeader', 'youtubeShorts']);
  for (const [index, folder] of ['AutoHideYouTubeHeader', 'AutoYouTubeShorts'].entries()) {
    const project = category.projects[index];
    assert.equal(project.sourceUrl, `https://github.com/Okumai/UserScripts/tree/master/${folder}`);
    assert.equal(project.installUrl, `https://github.com/Okumai/UserScripts/raw/refs/heads/master/${folder}/${folder}.user.js`);
  }
  const total = categories.reduce((sum, category) => sum + category.projects.length, 0);
  assert.equal(total, 5);
  for (const dictionary of Object.values(translations)) assert.equal(Number(dictionary.count.match(/\d+/)[0]), total);
});

test('all five languages have a complete, non-empty translation set', () => {
  assert.deepEqual(Object.keys(languages), ['en', 'ja', 'ko', 'zh-Hans', 'zh-Hant']);
  const keys = Object.keys(translations.en).sort();
  for (const locale of Object.keys(languages)) {
    const dictionary = translations[locale];
    assert.deepEqual(Object.keys(dictionary).sort(), keys, locale);
    for (const [key, value] of Object.entries(dictionary)) {
      if (key === 'hero3') continue;
      if (Array.isArray(value)) {
        assert.equal(value.length, 3, `${locale}.${key}`);
        assert.ok(value.every(item => typeof item === 'string' && item.trim()), `${locale}.${key}`);
      } else {
        assert.ok(typeof value === 'string' && value.trim(), `${locale}.${key}`);
      }
    }
  }
});
