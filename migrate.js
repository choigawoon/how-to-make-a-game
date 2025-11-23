import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCALE_PATH = path.join(__dirname, 'src/locales/ko.json');
const OUTPUT_DIR = path.join(__dirname, 'src/content/nodes');

const localeData = JSON.parse(fs.readFileSync(LOCALE_PATH, 'utf-8'));
const courseData = localeData.course;

// Helper to create MDX content
function createMdx(id, data, tags = []) {
    const frontmatter = {
        title: data.title,
        description: data.description,
        tags: tags,
        ...data // Include other fields like genre, year, etc.
    };

    // Remove content fields that we will put in the body
    delete frontmatter.concepts;
    delete frontmatter.usedIn;
    delete frontmatter.gameLoop; // Special case for nested content
    delete frontmatter.tickStructure;
    delete frontmatter.fps;
    delete frontmatter.physicsStep;
    delete frontmatter.multiplayer;
    delete frontmatter.references;
    delete frontmatter.determinism;
    delete frontmatter.center; // Remove center node data

    let content = `---
${Object.entries(frontmatter).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join('\n')}
---

# ${data.title}

${data.description}
`;

    // Append extra sections if they exist in the original data (simple conversion)
    if (data.keyFeatures) {
        content += `\n## Key Features\n${data.keyFeatures.map(f => `- ${f}`).join('\n')}\n`;
    }

    return content;
}

const mappings = [
    // Cases
    { id: 'super-mario', data: courseData.cases['super-mario'], tags: ['case', 'platformer'] },
    { id: 'maplestory', data: courseData.cases['maplestory'], tags: ['case', 'mmorpg'] },
    { id: 'overwatch', data: courseData.cases['overwatch'], tags: ['case', 'fps'] },
    { id: 'pubg', data: courseData.cases['pubg'], tags: ['case', 'battle-royale'] },
    { id: 'lol', data: courseData.cases['lol'], tags: ['case', 'moba'] },
    { id: 'starcraft', data: courseData.cases['starcraft'], tags: ['case', 'rts'] },
    { id: 'candy-crush', data: courseData.cases['candy-crush'], tags: ['case', 'puzzle'] },
    { id: 'fortnite', data: courseData.cases['fortnite'], tags: ['case', 'battle-royale'] },
    { id: 'counter-strike', data: courseData.cases['counter-strike'], tags: ['case', 'fps'] },

    // Fundamentals
    { id: 'modeling-simulation', data: courseData.fundamentals['modeling-simulation'], tags: ['fundamental'] },
    // Note: game-loop is extracted from modeling-simulation in the original JSON structure
    { id: 'game-loop', data: courseData.fundamentals['modeling-simulation'].gameLoop, tags: ['fundamental'] },

    // Placeholder for others not fully visible in my view_file output, but I'll try to map them if they exist
    // I need to check if these keys exist in the JSON
];

// Ensure output dir exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

mappings.forEach(({ id, data, tags }) => {
    if (data) {
        const mdx = createMdx(id, data, tags);
        fs.writeFileSync(path.join(OUTPUT_DIR, `${id}.ko.mdx`), mdx);
        console.log(`Generated ${id}.ko.mdx`);
    } else {
        console.warn(`Missing data for ${id}`);
    }
});

// Special handling for category nodes
const categories = [
    { id: 'main', data: courseData.main.center, tags: ['root'] },
    { id: 'cases', data: courseData.layers.cases.center, tags: ['category'] },
    { id: 'fundamentals', data: courseData.layers.fundamentals.center, tags: ['category'] },
    { id: 'decisions', data: courseData.layers.decisions.center, tags: ['category'] },
];

categories.forEach(({ id, data, tags }) => {
    if (data) {
        const mdx = createMdx(id, data, tags);
        fs.writeFileSync(path.join(OUTPUT_DIR, `${id}.ko.mdx`), mdx);
        console.log(`Generated ${id}.ko.mdx`);
    }
});

console.log('Migration complete.');
