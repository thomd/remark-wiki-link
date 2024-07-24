import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { remark } from 'remark'
import remarkWikiLink from '../index.js'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

test('remark-heading-lines', async function (t) {
   await t.test('should expose the public api', async function () {
      assert.deepEqual(Object.keys(await import('../index.js')).sort(), ['default'])
   })
})

test('fixtures', async function (t) {
   const root = './test/fixtures/'
   const fixtures = fs
      .readdirSync(root, { withFileTypes: true })
      .filter((item) => item.isDirectory())
      .map((item) => item.name)
   for (let fixture of fixtures) {
      await t.test(fixture, async function () {
         const files = fs
            .readdirSync(path.join(root, fixture), { withFileTypes: true })
            .filter((item) => !item.isDirectory())
            .map((item) => item.name)
         const inputFile = path.join(
            root,
            fixture,
            files.find((elem) => elem === 'input.md')
         )
         const outputFile = path.join(
            root,
            fixture,
            files.find((elem) => elem.startsWith('output'))
         )
         const outputType = path.extname(outputFile)
         const configFile = path.join(
            root,
            fixture,
            files.find((elem) => elem === 'config.json')
         )

         let config = JSON.parse(String(fs.readFileSync(configFile)))
         let input = String(fs.readFileSync(inputFile))
         let output = String(fs.readFileSync(outputFile))

         if (outputType === '.md') {
            try {
               const file = await remark().use(remarkWikiLink, config).process(input)
               assert.equal(String(file), output)
            } catch (error) {
               throw error
            }
         }

         if (outputType === '.html') {
            try {
               const file = await remark().use(remarkWikiLink, config).use(remarkRehype).use(rehypeStringify).process(input)
               assert.equal(String(file), output)
            } catch (error) {
               throw error
            }
         }
      })
   }
})
