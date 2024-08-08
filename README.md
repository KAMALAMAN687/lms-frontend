###Deployed Link
https://cousify.netlify.app
# LMS Backend Repo -
https://github.com/KAMALAMAN687/lms-backend

# LMS Frontend

### Setup Instruction

1. Clone the Project

git clone https://github.com/KAMALAMAN687/lms-frontend.git

2. Move into the Directory

cd lms-frontend

3. Install Dependencies

npm install

4. Run the server

npm run dev

### Setup Instructions for Tailwind

[Tailwind official instruction docs] (https://tailwindcss.com/docs/installation)

1.  Install Tailwindcss

    npm install -D tailwindcss

2.  Create Tailwind Config file

    npx tailwindcss init

3.  Add file Extension to tailwind config file int he contents property

    "./index.html",
    "./src/\*_/_.{js,ts,jsx,tsx}"

4.  Add the tailwind directives at the top of the directives.

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

5.  Add the following details in the plugin property of tailwind config

```
require("daisyui"), require("@tailwindcss/line-clamp")

```

### Adding Plugins and Dependencies

npm install react-router-dom axios @reduxjs/toolkit react-redux react-icons chart.js daisyui react-hot-toast @taiwindcss/line-clamp chartjs-2

### Configure auto-import-sort eslint

1.Install Simple import sort

npm i -D eslint-plugin-simple-import-sort

2.  Add rule in ".eslint.cjs

"simple-import-sort/imports" :"error"

3.  Add simple-import-sort plugin in ".eslint.cjs"
    plugins:[...,"simple-import-sort]

4.To enable Auto import sort on file save in vs-code

-Open setting.json
-add the following config

"editor.codeActionsOnSave":{"source.FixAll.eslint":true
}
