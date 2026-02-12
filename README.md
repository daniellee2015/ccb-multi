# ccb-multi

Multi-instance manager for CCB (Claude Code Bridge) - Run multiple AI coding sessions in parallel.

## Background

### What is CCB?

[CCB (Claude Code Bridge)](https://github.com/bfly123/claude_code_bridge) is a powerful tool for real-time multi-AI collaboration, supporting Claude, Codex, and Gemini with persistent context and minimal token overhead.

**CCB's Strengths:**
- 🤖 Multi-AI provider support (Claude, Codex, Gemini)
- 🔄 Powerful task scheduling and orchestration
- 💾 Persistent context across sessions
- ⚡ Efficient token usage

### The Single-Instance Problem

**CCB runs as a single instance**, which creates significant limitations during development:

**Common Development Scenarios:**

1. **Parallel Feature Development**
   - You're implementing Feature A with Claude
   - Suddenly need to fix a critical bug in Feature B
   - Must stop Feature A session, lose context, switch to Feature B
   - Can't leverage Codex for Feature A while Claude handles Feature B

2. **Multi-Provider Workflows**
   - Want Claude to review architecture
   - Want Codex to implement algorithms
   - Want Gemini to write documentation
   - Can only run one at a time, losing the parallel efficiency

3. **Context Switching Overhead**
   - Each time you switch tasks, you lose the current session context
   - Need to rebuild context when returning to previous task
   - Wastes time and tokens re-explaining the same context

**The Pain Point:** CCB's powerful capabilities are bottlenecked by single-instance limitation. You can't fully utilize multiple AI providers in parallel for different tasks.

## Our Solution: ccb-multi

ccb-multi solves the single-instance problem by enabling **multiple isolated CCB instances** while maintaining **shared session history**.

### Design Philosophy

**Instance Isolation + History Sharing**

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Project Root                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  .ccb/                                                       │
│  ├── history/          ← Shared across all instances        │
│  └── ccb.config        ← Shared configuration               │
│                                                              │
│  .ccb-instances/                                             │
│  ├── instance-1/       ← Isolated workspace (Feature A)     │
│  │   ├── .ccb/                                              │
│  │   │   └── history → ../../.ccb/history/  (symlink)       │
│  │   └── [working files]                                    │
│  │                                                           │
│  └── instance-2/       ← Isolated workspace (Feature B)     │
│      ├── .ccb/                                              │
│      │   └── history → ../../.ccb/history/  (symlink)       │
│      └── [working files]                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Key Design Decisions:**

1. **Isolated Workspaces**: Each instance has its own directory to avoid file conflicts
2. **Shared History**: All instances share `.ccb/history/` via symlinks for context continuity
3. **Shared Config**: Common configuration across all instances
4. **File Sync**: Changes sync back to project root automatically

### Why Not Git Worktree?

You might think: "Can't I just use `git worktree` for multiple working directories?"

**Git worktree** is a valid approach, but has limitations:

| Aspect | git worktree | ccb-multi |
|--------|-------------|-----------|
| **Session History** | ❌ Separate per worktree | ✅ Shared across instances |
| **Setup** | ❌ Manual worktree management | ✅ One command to start |
| **Cleanup** | ❌ Manual removal needed | ✅ Automatic cleanup |
| **Status Tracking** | ❌ No unified view | ✅ See all instances at once |

**ccb-multi** is purpose-built for CCB's multi-instance needs, with automatic history sharing and instance management.

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

