# Waitlist Signup Automation
## About
This script enters the users provided info and submits it to up to 22 Save-On-Foods covid vaccine waitlists within a 30km radius.  
On average it takes about 8 minutes to finish.

## Requirements
NodeJS
Selenium
Xvfb
Chromium based web browser

## Usage
[Set up Xvfb, Nodejs, and Selenium (Ubuntu setup)](https://medium.com/@muhammetenginar/selenium-nodejs-on-ubuntu-vm-18-04-chrome-78-x-bbbcb30d674e)
Navigate to the [Save-On-Foods pharmacy signup page](https://saveonfoodspharmacy.medmeapp.com/schedule/) and allow location tracking
In `index.js`, enter your personal info in the `formInfo` object
Run the script using `xvfb-run node index.js`