# CCB-Multi

Multi-instance manager for [CCB (Claude Code Bridge)](https://github.com/bfly123/claude_code_bridge). Run multiple AI coding sessions in parallel with isolated workspaces and shared history.

Part of the [CCB Multi project](https://github.com/daniellee2015/ccb-multi).

## Install

```bash
npm install -g ccb-multi
```

**Prerequisites**: CCB installed, tmux running.

## Usage

```bash
# Start instances in separate terminals
ccb-multi 1 codex gemini claude
ccb-multi 2 codex gemini
ccb-multi 3 claude

# Management
ccb-multi-status     # View all instances
ccb-multi-history    # View shared history
ccb-multi-clean      # Clean up stale instances
```

## How It Works

Each instance runs in an isolated directory (`.ccb-instances/inst-<hash>-N/`) with symlinks back to the project root. Session history is shared across all instances via `.ccb/history/`.

Instance dirs use `inst-<hash>-N` format (8-char SHA-256 of project root) to prevent cross-project collisions in Gemini CLI 0.29.0's basename-based session storage. Old `instance-N` format is still recognized for backward compatibility.

## Links

- [CCB Multi (full project)](https://github.com/daniellee2015/ccb-multi) — Enhanced CCB fork with multi-instance support + LLM communication fixes
- [Upstream CCB](https://github.com/bfly123/claude_code_bridge) — Original Claude Code Bridge

## License

MIT
