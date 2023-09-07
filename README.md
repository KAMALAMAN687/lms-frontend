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

### Adding Plugins and Dependencies

npm install react-router-dom axios @reduxjs/toolkit react-redux react-icons chart.js daisyui react-hot-toast @taiwindcss/line-clamp chartjs-2


### Configure auto-import-sort eslint

1.Install Simple import sort

npm i _D eslint-plugin-simple-import-sort

2. 