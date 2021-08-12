# Setup Environment

## Setup development environment for mdbooks

OSX
1. brew install mdbook
2. brew install git

Window
1. Install Node.js
2. Install mdbook binary <https://github.com/rust-lang/mdBook/releases/download/v0.4.12/mdbook-v0.4.12-x86_64-pc-windows-msvc.zip>

### Run mdbooks
1. git clone <https://github.com/hungrymonkey/super-duper-octo-system.git>
2. `cd $PROJECT_ROOT/documentation/`
3.  mdbook watch  --open
4. Navigate to file://path/to/PROJECT_ROOT/documentation/book/index.html
   * This set might be done automatically by mdbook


## Setup development environtment for frontend
1. brew install gatsby-cli 
2. brew install git

Windows
1. Install Node.js
2. `cd $PROJECT_ROOT/frontend`
3. git clone <https://github.com/hungrymonkey/super-duper-octo-system.git>
4. npm install 

### Run frontend
1. git clone <https://github.com/hungrymonkey/super-duper-octo-system.git>
2. `cd $PROJECT_ROOT/frontend/`
3.  `gatsby clean && gatsby develop`
4. Open `localhost:8000` in the browser
   * This set might be done automatically by gatsby


### Run gatsby

## Hosting Options

1. S3 compatible
2. Heroku

