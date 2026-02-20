# Changelog

All notable changes to Resora will be documented in this file.

The format follows semantic versioning principles.

## [Unreleased]

### Planned

- Case customization strategies
- Custom response structure configuration
- Metadata customization hooks
- `withResponse()` transport hook
- Data wrapping configuration
- Conditional attribute helpers

## [0.1.3] - [0.1.6] - Patch Releases

### Added

- Refactored CLI structure and added initialization command
- Enable minification in CLI build configuration

### Fixed

- General code cleanup and refactoring for improved maintainability
- Updated documentation to reflect CLI changes and new features

## [0.1.2] - Patch Release

### Fixed

- Refactored CLI initialization to use `baseCommands` to register commands as intended.

## [0.1.1] - Patch Release

### Changed

- Enhanced documentation for configuration and resource generation processes.
- Updated types to reflect new resource definitions and added metadata types.

### Added

- Introduced a CLI application for generating `Resource` and `ResourceCollection` classes.
- Added commands for creating single resources, collections, and both simultaneously.
- Implemented configuration file support for customizing behavior.
- Created stubs for resource and collection classes to streamline generation.

## [0.1.0] - Initial Release

### Added

- Automatic pagination extraction
- Automatic cursor extraction
- Structured JSON envelope
- Chainable transformation API
- `.response()` transport binding
- Header, cookie, and status support
- Awaitable resource instances
- Introduced `GenericResource` for single resources, collections, and pagination support.
- Added `ResourceCollection` for transforming resource collections with pagination and cursor metadata.
- Implemented base `Resource` class for single resource transformation with additional properties support.
- Created `ServerResponse` class for handling HTTP response in connect-style frameworks (Express) and H3.
- Developed comprehensive documentation for API usage, including guides for getting started and writing resources.
- Established a structured changelog and roadmap for future enhancements.

Initial stable foundation for structured API response handling.
