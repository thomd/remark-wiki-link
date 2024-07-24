import { findAndReplace } from 'mdast-util-find-and-replace'

const remarkWikiLink = (opts) => {
   const defaultOptions = {
      linkPath: '',
   }
   const options = { ...defaultOptions, ...opts }
   return (tree) => {
      findAndReplace(tree, [
         [
            /\[\[([^|\]]+)\|([^\]]+)\]\]/g,
            (match, href, text) => {
               return {
                  type: 'link',
                  url: options.linkPath + href,
                  children: [{ type: 'text', value: text }],
               }
            },
         ],
      ])
   }
}
export default remarkWikiLink
