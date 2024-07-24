import { remark } from 'remark'
import remarkWikiLink from '../index.js'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { read } from 'to-vfile'

const file = await remark()
   .use(remarkWikiLink, { linkPath: '/pages/' })
   .process(await read('../test/fixtures/wikiLinks/input.md'))

console.log(file.value)
