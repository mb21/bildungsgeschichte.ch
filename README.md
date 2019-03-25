# Search portal on the history of education in Switzerland

Live on <https://www.bildungsgeschichte.ch>

## Develop

Install [`yarn`](https://yarnpkg.com), then `cd` into the directory.

Fetch dependencies:

    $ yarn install

Run development server:

    $ yarn start

- This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
- SASS according to [create-react-app#adding-a-css-preprocessor](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc)

## Deploy

To publish directly to GitHub Pages (after `git remote add github git@github.com:myUser/myRepo.git`):

    $ yarn deploy

Otherwise:

    $ yarn build

Then copy the `/build` folder to your web server.

## Common errrors when building on Archlinux

Your PATH must contain the `node_modules/.bin` folder, otherwise `react-snap` is not found.

Make sure to set this for headless Chrome mode: `sysctl -w kernel.unprivileged_userns_clone=1`
(otherwise react-snapp fails to start Chrome via puppeteer).
