# Maintainers

<!-- MarkdownTOC autolink=true bracket=round -->

- [Pull Requests](#pull-requests)
- [Development](#development)
  - [Setup](#setup)
  - [Scripts](#scripts)
    - [Runnings scripts for individual packages](#runnings-scripts-for-individual-packages)
  - [Dependencies](#dependencies)
- [Releases](#releases)
  - [Canary releases](#canary-releases)
- [Changelogs](#changelogs)
  - [GitHub API Token](#github-api-token)
  - [Pushing `CHANGELOG.md`](#pushing-changelogmd)
- [Packages](#packages)
  - [List packages](#list-packages)
  - [List updated packages](#list-updated-packages)

<!-- /MarkdownTOC -->

## Pull Requests

When merging Pull Requests on GitHub, use the [squash and merge](https://github.com/blog/2141-squash-your-commits) button, so that our timeline of master branch is linear.

Also make sure every Pull Request has a `PR` label, and one of the semver labels (`patch`, `minor`, or `major`).

These labels later help generate automated changelogs.

## Development

We use [Lerna](https://github.com/lerna/lerna/) for managing our monorepo. All our packages can be found in [packages](./packages) directory.

To start developing the packages:

### Setup

Clone the repository, and run:

```
$ npm install
$ npm run bootstrap
```

### Scripts

Now you can run the `npm` scripts:

```
$ npm run lint
$ npm run test
$ npm run cover
```

Which are shortcuts for:

```
$ ./node_modules/.bin/lerna run lint
$ ./node_modules/.bin/lerna run test
$ ./node_modules/.bin/lerna run cover
```

#### Runnings scripts for individual packages

To run npm scripts at individual package level:

```
$ ./node_modules/.bin/lerna run --scope proppy test
```

### Dependencies

We keep all the `devDependencies` at root `package.json` for avoiding unnecessary duplication.

To install dependencies at individual package level, just update their `package.json` (even if the dependency is a package from this repo itself), and run this from root:

```
$ npm run bootstrap
```

The `bootstrap` script takes care of installing and linking the dependencies in your packages.

## Releases

To publish a new release:

```
$ make release
```

You will be prompted to select a semver (patch/minor/major), and once chosen, all your packages (that have changed) will be published to `npm`.

### Canary releases

If you wish to release your packages as canary versions:

```
$ make release-canary
```

Doing so would only publish your packages to `npm`, without affecting your git repository in any way.

And the versions on `npm` would look like `1.0.0-alpha.12345678`, where the last part is your commit hash.

Canary releases are useful if you want to publish nightly releases for example.

## Changelogs

Since we use [lerna](https://github.com/lerna/lerna/) for managing our monorepo, we are using [lerna-changelog](https://github.com/lerna/lerna-changelog) for generating our changelogs.

Changelog for a particular version can be generated as follows:

```
$ make changelog GITHUB_API_TOKEN="..." FROM_TAG="v1.0.0" TO_TAG="v2.0.0"
```

Doing so would output the changelog in your Terminal, which you can later add to the `CHANGELOG.md` file.

### GitHub API Token

You can generate a token [here](https://github.com/settings/tokens/new?description=GitHub%20Changelog%20Generator%20token)

Since this is a public repository, you only need `public_repo` access for the token.

### Pushing `CHANGELOG.md`

Once the `CHANGELOG.md` file is updated, it is up to you to commit and push it to GitHub.

There is a handy command available:

```
$ make push-changelog
```

We also copy the generated changelog text of a specific version to [GitHub Releases](https://github.com/fahad19/proppy/releases) section.

## Packages

### List packages

Show all the packages with their versions in the repository:

```
$ make list-packages
```

### List updated packages

Show packages that have been updated locally, and needs publishing:

```
$ make list-updated
```
