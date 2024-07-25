import { findAndReplace } from 'mdast-util-find-and-replace'
import { slug } from 'github-slugger'

const remarkWikiLink = (opts) => {
   const defaultOptions = {
      path: '',
      slugger: false,
   }
   const options = { ...defaultOptions, ...opts }
   debugger
   const linkify = (href, text) => {
      if (options.slugger) {
         href = href.split('#')
         href = href[1] ? slug(href[0]) + '#' + slug(href[1]) : slug(href[0])
      }
      return {
         type: 'link',
         url: href.startsWith('#') ? href : options.path + href,
         children: [{ type: 'text', value: text }],
      }
   }

   return (tree) => {
      findAndReplace(tree, [[/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (match, href, text) => linkify(href, text)]])
      findAndReplace(tree, [[/\[\[([^\]]+)\]\]/g, (match, href) => linkify(href, href.replace(/.*#/, ''))]])
   }
}
export default remarkWikiLink
