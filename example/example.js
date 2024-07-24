import { remark } from 'remark'
import remarkWikiLink from '../index.js'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { read } from 'to-vfile'

const file = await remark()
   .use(remarkWikiLink, { linkPath: '/pages/' })
   .use(remarkRehype)
   .use(rehypeStringify)
   .process(await read('example.md'))

console.log(file.value)
