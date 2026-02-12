# ccb-multi

Multi-instance manager for CCB (Claude Code Bridge) - Run multiple AI coding sessions in parallel.

## Why ccb-multi?

**Better than git worktree for parallel AI coding sessions.**

While `git worktree` allows multiple working directories, ccb-multi provides a superior solution for running multiple CCB instances:

| Feature | git worktree | ccb-multi |
|---------|-------------|-----------|
| **Shared History** | ❌ Separate history per worktree | ✅ All instances share conversation history |
| **Instance Management** | ❌ Manual terminal management | ✅ Automatic instance isolation and cleanup |
| **Context Switching** | ❌ Need to remember which worktree has what | ✅ Easy status checking across all instances |
| **Resource Efficiency** | ❌ Duplicate files and configs | ✅ Shared resources via symlinks |
| **Setup Complexity** | ❌ Manual worktree creation and cleanup | ✅ One command to start/stop instances |

**Use Case Example:**

```bash
# With git worktree (complex):
git worktree add ../project-feature-1 feature-1
git worktree add ../project-feature-2 feature-2
cd ../project-feature-1 && ccb codex
# Switch terminal, cd ../project-feature-2 && ccb gemini
# Manually track which worktree is doing what
# Cleanup: git worktree remove ../project-feature-1

# With ccb-multi (simple):
ccb-multi 1 codex    # Instance 1 working on feature-1
ccb-multi 2 gemini   # Instance 2 working on feature-2
ccb-multi-status     # See all instances at a glance
ccb-multi-clean      # Clean up everything
```

## Features

✅ **Multi-instance Support**: Run multiple CCB instances simultaneously
✅ **Shared History**: All instances share conversation history and memory
✅ **Cross-platform**: Works on Windows, macOS, and Linux
✅ **Easy to Use**: Simple CLI commands
✅ **Monorepo Friendly**: Works with any project structure

## Prerequisites

Before installing ccb-multi, you need to have the following installed:

### 1. CCB (Claude Code Bridge)

CCB must be installed and configured on your system.

```bash
# Install CCB (follow CCB's official installation guide)
# https://github.com/bfly123/claude_code_bridge
```

### 2. tmux

ccb-multi requires tmux to manage multiple terminal sessions.

**macOS:**
```bash
brew install tmux
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install tmux
```

**Linux (CentOS/RHEL):**
```bash
sudo yum install tmux
```

**Windows:**
```bash
# Use WSL (Windows Subsystem for Linux) and install tmux in WSL
```

### 3. Start tmux

**IMPORTANT**: You must run ccb-multi inside a tmux session.

```bash
# Start tmux
tmux

# Or attach to existing session
tmux attach
```

## Installation

```bash
npm install -g ccb-multi
```

## Usage

### Start an instance

```bash
# Start instance 1 with specific providers
ccb-multi 1 codex gemini claude

# Start instance 2
ccb-multi 2 codex gemini claude

# Start instance without specifying providers (uses config)
ccb-multi 1
```

### Check status

```bash
ccb-multi-status
```

### View history

```bash
ccb-multi-history
```

### Clean up instances

```bash
ccb-multi-clean
```

## How it Works

1. **Instance Isolation**: Each instance runs in its own directory (`.ccb-instances/instance-N`)
2. **Shared Resources**: All instances share:
   - `.ccb/history/` - Conversation history
   - `.ccb/ccb.config` - Configuration
3. **File Sync**: All file changes are synced to the project root via symlinks

## Project Structure

```
your-project/
  .ccb/
    history/              # Shared history (all instances)
    ccb.config           # Shared config
  .ccb-instances/
    instance-1/          # Instance 1
      .ccb/
        history -> ../../.ccb/history/
    instance-2/          # Instance 2
      .ccb/
        history -> ../../.ccb/history/
```

## Requirements

- Node.js >= 14.0.0
- CCB (Claude Code Bridge) installed
- tmux installed and running

## License

MIT

## Author

dalio willd

## Repository

https://github.com/waoooo/ccb-multi

