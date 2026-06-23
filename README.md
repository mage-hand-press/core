## Mage Hand Module Development

### Computer Setup

These steps will only be required once for your computer. If node and npm are already installed and up to date on your computer, skip down to **Module Setup**.

// TODO


### Module Setup

These steps should be performed when first setting up a module on your local computer for development.

#### 1. Create new repository

If you are starting work on a module that already has a previous repository on GitHub, skip to step 2.

If there isn't already a repository for the module you are working on, a new one on GitHub will need to be created. Navigate to the [Module Template repository](https://github.com/mage-hand-press/_module-template) on GitHub and click the "Use this template" button on the top right.

Under General > Repository Name, enter the name of the repo. This name should be the same as the final module ID without the leading company name (so for the module `mage-hand-press-complete-warmage`, the repository name would be `complete-warmage`).

Once the name is entered click "Create repository" and continue to the next step.

#### 2. Clone the repository

Before work can begin, the Git repository must be cloned to your local machine.

##### From the Terminal

If you are working from the terminal, then on the main tab of the GitHub repository click the "Code" button. In the dropdown there will be a URL `https://github.com/mage-hand-press/something.git`. Copy that URL and pop over to the terminal.

In terminal, navigate to the folder where you want to keep all of your modules for development. On a Mac, this can be done easily by typing `cd ` and then dragging the folder into the terminal, it should fill out the rest of the path automatically.

Now in the terminal type `git clone ` followed by the URL from GitHub and hit Enter.

##### From GitHub Desktop App

Within the GitHub Desktop app a new repository can be cloned by clicking File > Clone Repository in the menu. The window that pops up should list all of your available repositories. Find the one to clone and select it, then set the "Local Path" to the folder where the modules should be stored locally for development. Click "Clone".

#### 3. Navigate to the folder in terminal

// TODO

// TODO: Rename module folder if necessary

#### 4. Run install command

The NPM install command is used to set up all of the tooling required to work within a module:

```
npm install
```

#### 5. Create link from module folder to Foundry data (optional)

// TODO

### Compendium Pack Commands

There are several terminal commands needed to working with Git and compendium packs. All of these commands should be run from the terminal while inside the module's folder. **Note:** Do not run any of these commands while a Foundry world is open. Always return to the setup screen before doing anything with the compendiums.

#### `npm run extract`

This is the most important command. It will take the contents of the compendiums as they were built in Foundry and extract them to source `yaml` files. These are the actual files that will be added to Git and stored for later.

#### `npm run compile`

This will take the `yaml` source files and turn them into the database used by Foundry. This will need to be run whenever there are changes made by someone. Once you pull new changes from Git, run this command to make those changes available in Foundry. **Warning:** This will erase any changes made in Foundry, so be sure to only run it if there isn't any work you will lose.
