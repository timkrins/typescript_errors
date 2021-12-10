## typescript_errors

A quick-n-dirty tool to generates a JSON list of TypeScript errors from a TypeScript project.

### usage

```sh
TSCONFIG='repo/tsconfig.json' OUTPUT='errors.json' npm exec github:timkrins/typescript_errors#release
```

### development

```sh
asdf install
yarn install

TSCONFIG='tsconfig.json' OUTPUT='errors.json' yarn start
```
