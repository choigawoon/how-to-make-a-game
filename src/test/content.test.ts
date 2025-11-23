import { describe, it, expect } from 'vitest'
import { loadContent } from '@/lib/content'

describe('Content Loader', () => {
    it('should load simple MDX content', async () => {
        const content = await loadContent('test', 'ko')
        expect(content).toBeDefined()
        // Frontmatter should be empty since we removed the plugin and manual parser handles raw
        // But wait, manual parser expects --- ... ---
        // My test.ko.mdx has no frontmatter.
        // So frontmatter should be empty object.
        expect(content?.frontmatter).toEqual({})
        expect(content?.Content).toBeDefined()
    })
})
