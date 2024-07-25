# remark-wiki-link

![Build](https://github.com/thomd/remark-wiki-link/workflows/plugin-test/badge.svg)

`remark-wiki-link` is a very simple [remark](https://github.com/syntax-tree/mdast-util-find-and-replace) plugin which translates for example

    [[page]]
    [[#headline]]
    [[page|name]]

to

    <a href="page">page</a>
    <a href="#headline">headline</a>
    <a href="page">name</a>

The `[[...]]` syntax is a custom markdown syntax typically used in **wikis** to have links to other wiki pages or to have in-page links (a.k.a. hash links).

## Usage

Say we have the following file `example.md`:

```markdown
# Headline

paragraph with [[page|name]] link
```

and a module `example.js`:

```js
import { remark } from 'remark'
import remarkWikiLink from 'remark-wiki-link'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { read } from 'to-vfile'

const file = await remark()
   .use(remarkWikiLink, { path: '/pages/' })
   .use(remarkRehype)
   .use(rehypeStringify)
   .process(await read('example.md'))

console.log(file.value)
```

then running `node example.js` yields:

```html
<h1>Headline</h1>
<p>paragraph with <a href="/pages/page">name</a> link</p>
```

## API

The default export is `remarkWikiLink`.

### Options

-  `path` (`string`, optional) — path to be preprended to the link url. Default is to have no path prefix.

-  `slugger` (`Boolean`, optional) — Slug URLs using [github-slugger](https://github.com/Flet/github-slugger). Using the slugger has a minor flaw, if a page
   has headlines with the same name and you want to have in-page links. Default is `false`.
