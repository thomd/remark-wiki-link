import { findAndReplace } from 'mdast-util-find-and-replace'
import GithubSlugger from 'github-slugger'

const remarkWikiLink = (opts) => {
   const defaultOptions = {
      linkPath: '',
      hashSlugger: false,
   }
   const options = { ...defaultOptions, ...opts }
   const slugger = new GithubSlugger()
   return (tree) => {
      findAndReplace(tree, [
         [
            /\[\[([^|\]]+)\|([^\]]+)\]\]/g,
            (match, href, text) => {
               if (options.hashSlugger) {
                  slugger.reset()
                  href = href.split('#')
                  href = href[1] ? href[0] + '#' + slugger.slug(href[1]) : href[0]
               }
               return {
                  type: 'link',
                  url: href.startsWith('#') ? href : options.linkPath + href,
                  children: [{ type: 'text', value: text }],
               }
            },
         ],
      ])
   }
}
export default remarkWikiLink
