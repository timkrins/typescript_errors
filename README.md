## typescript_errors

A quick-n-dirty tool to generates a JSON list of TypeScript errors from a TypeScript project.

### usage

```sh
TSCONFIG='tsconfig.json' OUTPUT='errors.json' EXTRA_CONFIG='{"noImplicitAny":true}' npm exec --yes github:timkrins/typescript_errors#release
```

If you actually want the command to fail if errors are found:
```sh
THROW_ON_ERROR=true TSCONFIG='tsconfig.json' OUTPUT='errors.json' npm exec --yes github:timkrins/typescript_errors#release
```

### development

```sh
asdf install
yarn install

TSCONFIG='tsconfig.json' OUTPUT='errors.json' yarn start
```
