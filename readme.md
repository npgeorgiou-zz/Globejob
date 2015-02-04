# GlobeJob

This project is the server and client part of a larger application that crawls the web for english-speaking jobs in Denmark



## Getting Started

If you want to download it and see how it works,  you can simply clone the seed repository and install the dependencies:

This seed is inspired by several other seeds including the Angular seed.

### Prerequisites

You need git to clone the angular-seed repository.
I also use a number of node.js tools to initialize and test angular-seed. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Install Dependencies

I have two kinds of dependencies in this project: tools and angular framework code.  The tools help manage and test the application.

* To get the tools we depend upon `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

I have preconfigured `npm` to automatically run `bower` so you can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

The simplest way to start the project is;

```
npm start
```

Now browse to the app at `http://localhost:3000`.
