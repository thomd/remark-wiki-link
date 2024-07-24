# remark-wiki-link

![Build](https://github.com/thomd/remark-wiki-link/workflows/plugin-test/badge.svg)

`remark-wiki-link` is a very simple [remark](https://github.com/syntax-tree/mdast-util-find-and-replace) plugin which translates

    [[relative-url|link-name]]

to

    <a href="relative-url">link-name</a>

using the [mdast-util-find-and-replace](https://github.com/syntax-tree/mdast-util-find-and-replace) package.

## Usage

Say we have the following file `example.md`:

```markdown
# Headline

paragraph with an [[relative-url|link-name]] link
```

and a module `example.js`:

```js
import { remark } from 'remark'
import remarkWikiLink from 'remark-wiki-link'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { read } from 'to-vfile'

const file = await remark()
   .use(remarkWikiLink, { linkPath: '/pages/' })
   .use(remarkRehype)
   .use(rehypeStringify)
   .process(await read('example.md'))

console.log(file.value)
```

then running `node example.js` yields:

```html
<h1>Headline</h1>
<p>paragraph with an <a href="/pages/relative-url">link-name</a> link</p>
```

## API

The default export is `remarkWikiLink`.

### Options

-  `linkPath` (`string`, optional) — path to be preprended to the link url. Default is to have no path prefix.
