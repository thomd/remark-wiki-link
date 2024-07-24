import { visit } from 'unist-util-visit'

const remarkWikiLink = (opts) => {
   const defaultOptions = {}
   const options = { ...defaultOptions, ...opts }
   return (tree) => {
      visit(tree, 'text', (node, index, parent) => {
         node.value = node.value.replace(/\[\[([^\|]+)\|([^\]]+)\]\]/g, '[$2](/pages/$1)')
      })
   }
}
export default remarkWikiLink
