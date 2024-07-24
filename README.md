# remark-wiki-link

![Build][build-badge]

`remark-wiki-link` is a [remark][remark] plugin which translates 

    [[relative-url|link-name]]

to

    <a href="relative-url">link-name</a>

## Usage

Say we have the following file `example.md`:

```markdown
# Headline

paragraph with an [[internal|internal]] link
```

and a module `example.js`:

```js
import { remark } from 'remark'
import remarkWikiLink from 'remark-wiki-link'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { read } from 'to-vfile'

const file = await remark()
    .use(remarkWikiLink)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(await read('example.md'))

console.log(file.value)
```

then running `node example.js` yields:

```html
<h1>Headline</h1>
<p>paragraph with an <a href="internal">internal</a> link</p>
```

## API

The default export is `remarkWikiLink`.

[remark]: https://github.com/remarkjs/remark
[build-badge]: https://github.com/thomd/remark-wiki-link/workflows/plugin-test/badge.svg
