// Step 1-A
const express = require('express');
// Step 1-B
const app = express();
// Step 1-C (if we want to publish app we can use environment port number or use default port 5001)
const port = process.env.PORT || 5001;
// Step 1-D
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})




// NOTES:
// STEP 1 - Setup Express Server
// A - require express,
// B - initialize express
// C - setup port number
// D - listen to port number
//
// STEP 2 