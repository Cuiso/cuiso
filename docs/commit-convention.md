# Emoji convention (commits & PR titles)

Use these emojis as **prefixes** in commit messages and PR titles:

| Emoji | Intent |
|-------|--------|
| ✨ | feat — New feature |
| 🐛 | fix — Bug fix |
| ♻️ | refactor — Code refactor (no feature/fix change) |
| 🎨 | style — Formatting, missing semicolons, etc. |
| 📝 | docs — Documentation only |
| 🧪 | test — Adding or updating tests |
| 🚀 | perf — Performance improvement |
| 🔧 | chore — Build, config, dependencies |
| 🗑️ | remove — Removing code or files |
| 🔒 | security — Security fix or improvement |
| 🚧 | wip — Work in progress (draft commits only) |

## Rules

- **One** emoji per commit. Pick the primary intent.
- Format: `<emoji> <scope>: <short description>` → e.g. `✨ auth: add google oauth login`
- Scope is **optional** but encouraged (module, feature, or file area).
- Description in **lowercase**, **imperative** mood, **max 72 characters** for the subject line.
- **No** emoji in branch names.
