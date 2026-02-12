# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-02-13

### Added

- Initial release of ccb-multi toolkit
- Multi-instance support for CCB (Claude Code Bridge)
- Professional ASCII art branding (CCB-MULTI logo)
- Four CLI commands:
  - `ccb-multi` - Start CCB instance with specified providers
  - `ccb-multi-status` - View status of all instances
  - `ccb-multi-history` - View shared session history
  - `ccb-multi-clean` - Clean up instance directories
- Shared session history across all instances via symlinks
- Isolated workspace for each instance
- Cross-platform compatibility (Windows, macOS, Linux)
- Comprehensive documentation with:
  - CCB background and single-instance problem explanation
  - Design philosophy and architecture diagram
  - Prerequisites and installation guide
  - Usage examples and comparison with git worktree

### Features

- Better solution than git worktree for parallel AI coding sessions
- Automatic instance isolation and cleanup
- Unified status tracking across all instances
- Shared resources (history, config) via symlinks
