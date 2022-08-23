import { awscdk, TextFile } from 'projen';
import { ArrowParens } from 'projen/lib/javascript/prettier';

const cdkVersion = '2.37.1';
const eksBlueprintVersion = '1.2.0';
const nodejsVersion = 'v16.16.0';
const deps = [`aws-cdk-lib@${cdkVersion}`, 'ts-deepmerge', `@aws-quickstart/eks-blueprints@${eksBlueprintVersion}`];
const commonIgnore = ['.idea', '.Rproj', '.vscode', 'cdk.context.json', '.DS_Store'];

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Bryan Galvin',
  authorAddress: 'bcgalvin@gmail.com',
  cdkVersion: cdkVersion,
  defaultReleaseBranch: 'main',
  name: 'argo-workflows-eks-blueprints-addon',
  repositoryUrl: 'https://github.com/bcgalvin/argo-workflows-eks-blueprints-addon.git',
  release: false,
  deps: deps,
  projenrcTs: true,
  prettier: true,
  testdir: undefined,
  sampleCode: false,
  prettierOptions: {
    settings: {
      printWidth: 120,
      arrowParens: ArrowParens.ALWAYS,
      singleQuote: true,
    },
  },
  githubOptions: {
    pullRequestLint: false,
  },
  tsconfig: {
    exclude: ['docs', 'examples'],
    compilerOptions: {
      experimentalDecorators: true,
    },
  },
  eslintOptions: {
    dirs: ['src'],
    ignorePatterns: ['examples/'],
  },
  gitignore: [...commonIgnore],
  npmignore: [...commonIgnore],
});
new TextFile(project, '.nvmrc', {
  lines: [nodejsVersion],
});
project.synth();
