# flaming-disk-usage [![npm-version][npm-badge]][npm-link]

Inspect disk usage with flame graph.

> After seeing Jordan Scales's article([I Peeked Into My Node_Modules Directory And You Won’t Believe What Happened Next](https://medium.com/friendship-dot-js/b89f63d21558)), I am surprised that so many people releasing package to npm so casually. I knew such a possibility but never thought it's so common. So I made this tool for catching these useless files wasting my precious SSD.

### Install

```bash
npm i -g fdu
```

### Usage

```bash
# will open a html showing current directory's disk usage
fdu

# view specific directory
fdu ~/git/a-repo
```

![flaming-disk-usage](https://cloud.githubusercontent.com/assets/215282/17704974/546e0cae-6409-11e6-9784-eedbc5e91c37.png)

[npm-badge]: https://img.shields.io/npm/v/fdu.svg?style=flat-square
[npm-link]: http://www.npmjs.com/package/fdu
