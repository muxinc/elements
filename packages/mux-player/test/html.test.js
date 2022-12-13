import { assert } from '@open-wc/testing';
import { html, render } from '../src/html.ts';

describe('html', () => {
  it('creates new TemplateResults with each call', () => {
    const main = (x = 'foo') => html`<div class="${x}"></div>`;
    const other = (x = 'foo') => html`<div class="${x}"></div>`;
    assert.notEqual(main(), main());
    assert.notEqual(main(), other());
    assert.notEqual(other(), other());
  });
});

describe('render', () => {
  let surface;
  beforeEach(() => {
    surface = document.createElement('section');
  });

  it('memoizes by TemplateResult#template, updating old templates with new values', () => {
    const main = (x = null) => html`<div class="${x}"></div>`;
    render(main('foo'), surface);
    assert.equal(surface.innerHTML, '<div class="foo"></div>');
    let div = surface.children[0];
    render(main('bar'), surface);
    assert.equal(surface.innerHTML, '<div class="bar"></div>');
    assert.equal(div, surface.children[0], 're-uses the same div');
  });

  it('re-uses templates by static parts value, not tagged template call site', () => {
    const main = (x = null) => html`<div class="${x}"></div>`;
    const same = (x = null) => html`<div class="${x}"></div>`;
    render(main('foo'), surface);
    assert.equal(surface.innerHTML, '<div class="foo"></div>');
    let div = surface.children[0];
    render(same('bar'), surface);
    assert.equal(surface.innerHTML, '<div class="bar"></div>');
    assert.equal(div, surface.children[0], 're-uses the same div');
  });

  it('renders the same template in different elements', () => {
    const main = (x, y) => html`<div class="${x}">${y}</div>`;
    render(main('foo', main('bar', 'baz')), surface);
    assert.equal(surface.innerHTML, '<div class="foo"><div class="bar">baz</div></div>');
    render(main('foos', main('bars', 'bazs')), surface);
    assert.equal(surface.innerHTML, '<div class="foos"><div class="bars">bazs</div></div>');
  });

  describe('nesting', () => {
    it('supports nested html calls', () => {
      const main = (child) => html`<div>${child}</div>`;
      const child = (message) => html`<span>${message}</span>`;
      render(main(child('Hello')), surface);
      assert.equal(surface.innerHTML, '<div><span>Hello</span></div>');
    });

    it('updates nodes from repeat calls', () => {
      const main = (child) => html`<div>${child}</div>`;
      const child = (message) => html`<span>${message}</span>`;
      render(main(child('Hello')), surface);
      assert.equal(surface.innerHTML, '<div><span>Hello</span></div>');
      render(main(child('Goodbye')), surface);
      assert.equal(surface.innerHTML, '<div><span>Goodbye</span></div>');
    });

    it('can nest document fragments and text nodes', () => {
      const main = (frag) => html`<span>${frag}</span>`;
      const fragment = document.createDocumentFragment();
      fragment.append(new Text('Hello World'));
      render(main(fragment), surface);
      assert.equal(surface.innerHTML, '<span>Hello World</span>');
      fragment.append(document.createTextNode('Hello Universe!'));
      render(main(fragment), surface);
      assert.equal(surface.innerHTML, '<span>Hello Universe!</span>');
    });
  });
});
