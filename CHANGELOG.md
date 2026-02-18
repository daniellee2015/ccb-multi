# Changelog

## [1.0.0] - 2026-02-18

### Changed

- **Instance dir naming**: Changed from `instance-N` to `inst-<hash>-N` (8-char SHA-256 of project root) to prevent cross-project collisions in Gemini CLI 0.29.0's basename-based session storage
- **Backward compat**: Old `instance-N` directories are still recognized and used during transition
- **Version bump**: Aligned with CCB Multi v1.0.0 independent version line

## [0.1.1] - 2026-02-13

### Fixed

- Fix module resolution error by restructuring source directory
- Move `src/lib/*` files to `src/` root to fix import paths
- Compiled files now correctly placed in `lib/` instead of `lib/lib/`

## [0.1.0] - 2026-02-13

### Added

- Initial release of ccb-multi toolkit
- Multi-instance support for CCB (Claude Code Bridge)
- Four CLI commands: `ccb-multi`, `ccb-multi-status`, `ccb-multi-history`, `ccb-multi-clean`
- Shared session history across all instances via symlinks
- Isolated workspace for each instance
- Cross-platform compatibility (Windows, macOS, Linux)
