# Novia Frontend

Web frontend-nya Novia

Semangat skripsi!!!

## Install and Run
```bash
$ npm install gulp gulp-sass browser-sync --save-dev
$ npm install chart.js --save
$ npm run gulp watch
```

## Copy all JS to src/js
```bash
$ npm run gulp copyjs
```

## Package List

- npm = package manager
- gulp = toolkit for automating painful or time-consuming tasks in your development workflow
- gulp-sass =  part of gulp for generate sass preprocessor to css
- browser-sync = time-saving synchronised browser testing
- chart js = javascript library for chart

## Wireframe

![](https://erdiawan.com/wireframe/wireframe-1.jpeg)

Figure 1 - Homepage

![](https://erdiawan.com/wireframe/wireframe-2.jpeg)

Figure 2 - The Result

![](https://erdiawan.com/wireframe/wireframe-3.jpeg)

Figure 3 - Insight / Analytics

## FAQ

#### How to deploy?

Just run

`npm run gulp watch`

and copy all **src** folder 

#### How to edit styling?

You can edit **style.sass** on *src/sass/style.sass*

And generate the css using this command

`npm run gulp watch`