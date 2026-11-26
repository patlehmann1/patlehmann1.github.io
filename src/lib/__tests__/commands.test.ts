import { buildCommands, filterCommands } from '../commands'

const posts = [{ slug: 'hello-world', title: 'Hello World' }]
const commands = buildCommands(posts)
const names = (query: string) => filterCommands(commands, query).map((c) => c.name)

describe('buildCommands', () => {
  it('includes sections, posts, themes, and links', () => {
    const all = commands.map((c) => c.name)
    expect(all).toEqual(expect.arrayContaining(['home', 'about', 'blog', 'read hello-world', 'theme synthwave', 'resume', 'github']))
  })

  it('points post commands at the post page', () => {
    expect(commands.find((c) => c.name === 'read hello-world')?.action).toEqual({ type: 'navigate', href: '/blog/hello-world' })
  })
})

describe('filterCommands', () => {
  it('shows every visible command for an empty query', () => {
    expect(names('')).toHaveLength(commands.filter((c) => !c.hidden).length)
    expect(names('')).not.toContain('sudo')
  })

  it('matches name and description case-insensitively', () => {
    expect(names('THEME oc')).toEqual(['theme ocean'])
    expect(names('hello world')).toEqual(['read hello-world'])
  })

  it('only reveals hidden commands on an exact name or with arguments', () => {
    expect(names('sud')).not.toContain('sudo')
    expect(names('sudo')).toContain('sudo')
    expect(names('sudo rm -rf /')).toEqual(['sudo'])
  })

  it('returns nothing for an unknown command', () => {
    expect(names('xyzzy')).toEqual([])
  })
})
