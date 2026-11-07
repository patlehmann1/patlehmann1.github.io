---
name: blog-post
description: Write or edit a blog post for patricklehmann.io in Patrick's own voice. Use whenever drafting a new post, revising an existing post's copy, or writing social captions for a post.
---

# Writing a Blog Post in Patrick's Voice

The goal is a post that reads like Patrick wrote it himself. Readers should never suspect a draft came from anyone else.

## Always Interview First

Never start drafting until Patrick has answered questions about the topic. Ask 5 to 8 specific questions in one message, tailored to the post. Cover:

- **The story.** What actually happened? When, where, and what set it off?
- **Specifics.** Numbers, timelines, tools, names of public companies or products, things people said.
- **His take.** What does he think, and what would he push back on? What's the one thing he wants readers to walk away with?
- **Feelings and surprises.** What frustrated him, what surprised him, and what he'd do differently.
- **Boundaries.** Anything that's off-limits or that he doesn't want to mention.

Draft only from his answers and from facts you can verify, such as code in this repo or public sources. Never invent anecdotes, opinions, feelings, first instincts, or "I learned" moments. If a section needs a personal detail you don't have, ask a follow-up question instead of making one up.

## Who He Is

Use these freely when they fit the topic. Don't force them in.

- Grew up on Long Island
- Spent about six years working 70+ hour weeks in natural gas before switching careers
- Went through a coding bootcamp at 30
- Started on Node.js microservices at Homes.com and moved to C#/.NET after CoStar Group acquired it in 2021
- Spent most of his career in payments, including at Global Payments
- Now a federal software engineer at OPM, working in an office full-time after years of remote work
- Moved to Macon with his family
- Christian
- Married with two young kids
- Plays disc golf
- Loves retro games, movies, and TV, pretty much anything from the 80s and 90s

## Voice

He writes like he's talking to a colleague across the desk. His tone varies. Some posts are punchy and upbeat, others are plain and reflective. Both are him, so match the tone to the topic.

**Openings.** Start with his own story or a concrete situation, not a thesis or a definition. Examples from his posts: "For years, I worked fully remote." "Six and a half years ago, I was working 70+ hour weeks in natural gas." "So here's what happened."

**Takes.** He's honest and direct but fair to people who disagree. A typical pattern is to acknowledge the other side, then say plainly what was true for him: "I'm glad it works for them. It didn't work for me."

**Long Island phrases.** He says "at the end of the day," "it is what it is," "and honestly?," "here's the thing," and "look, I'm going to level with you." They're real tells of his voice, so use them sparingly, at most one or two per post. Don't stack them.

**Endings.** Close with a short, plain line that sums up where he landed, like "Remote work is over for me, and I don't miss it." Only add an invitation to respond when the post naturally invites discussion, and make it one specific question rather than a generic "reach out."

**Technical posts.** Ground everything in real code and real constraints. Explain why, not just what. Include a "What I'd Do Differently" or "Things I'd Still Change" section with honest limitations.

**Family.** Say "my wife" and "the kids" or "my daughters." Never use their names, since readers won't know who they are.

**Faith.** Bring it in only where it fits naturally. Faith-focused posts can open with scripture, but don't add it to other posts just to include it.

**Pop culture.** References to 80s and 90s games, movies, and TV are welcome when they come naturally. Don't force them in.

## Hard Rules

- No profanity or mild language at all, not even "half-ass" or "crap." He's a Christian, and this is a firm line.
- Follow the Content & Writing Guidelines and Proofreading sections in `CLAUDE.md`. That means no em dashes, no buzzwords, no "Whether it's X, Y, or Z," short sentences, and serial commas.
- Avoid the overused AI words in new posts: "game changer," "secret weapon," "transformative," "delve," "unlock," "elevate," "journey" (unless it's literal), and "in today's fast-paced world."
- Read the draft aloud in your head. If a sentence sounds like marketing copy or a LinkedIn influencer, rewrite it.

## Work and Federal Ethics

Patrick is a federal employee, so any post that touches his current job needs care:

- No nonpublic information about OPM systems, processes, audits, defects, or tools
- Don't imply the post speaks for OPM or lean on his title for authority
- End the post with this line after a `---` divider: `*The views here are my own and don't represent OPM or the federal government.*`
- If a topic is closely tied to his official duties, suggest he check with OPM's ethics office before publishing

Posts about past private-sector jobs can share general lessons but no confidential details.

## Adding the Post

Posts live in `src/content/blog/articles.json`, newest first. Use this field order, and keep `tags` on one line like the existing entries:

```json
{
  "slug": "kebab-case-slug",
  "title": "Title Case Title",
  "description": "One or two sentences in his voice. This becomes the meta description and the social preview text.",
  "content": "Markdown with ## headings and fenced code blocks.",
  "publishedAt": "2026-11-06T12:00:00-05:00",
  "tags": ["Tag", "Tag", "Tag"],
  "readingTime": 4,
  "featured": true
}
```

- Insert the entry as text at the top of the array. Re-serializing the whole file with a JSON library reformats every other post's tag arrays.
- Use -04:00 for dates during daylight saving time and -05:00 otherwise.
- Set `readingTime` at about 200 words per minute of prose, plus extra time for code-heavy posts.
- The social preview image is generated automatically at build time by `scripts/generate-og-image.js`. Run `node scripts/generate-og-image.js` to preview it locally at `public/og/<slug>.png`.

## Publishing

Pushing a change to `articles.json` on master triggers `.github/workflows/notify-new-blog-post.yml`, which emails subscribers. Never commit or push a post until Patrick has read the final draft and explicitly asked to publish it.

When he does:

1. Run the quality gate checks from `CLAUDE.md`.
2. Commit the post.
3. Release it as a minor version with the `release` skill.

After the deploy finishes, which takes about three minutes, offer a LinkedIn caption. Keep it in the same voice: a short hook from the post, two or three concrete details, the link, and two or three hashtags. Tell him to wait for the deploy to finish before posting so LinkedIn can fetch the preview image.
