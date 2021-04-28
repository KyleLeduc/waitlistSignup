const {Builder, By, Key, until} = require('selenium-webdriver');

async function signup(idx) {
    const formInfo = {
        firstName: 'firstName',
        lastName: 'lastName',
        birthDate: '1990/01/01',
        address: {
            postalCode: 't8n1n1'
        },
        email: 'sdkljfs@gmail.com',
        phone: {
            cell: '7805555555'
        },
    }
    const radioXpaths = [
        '//*[@id="root"]/div/div[2]/div[2]/form/div[2]/div[3]/div/div[2]/div/div/label[2]/span[1]/span[1]/input',
        '//*[@id="root"]/div/div[2]/div[2]/form/div[2]/div[4]/div/div[2]/div/div/label[2]/span[1]/span[1]/input',
        '//*[@id="root"]/div/div[2]/div[2]/form/div[2]/div[10]/div/div[2]/div/div/label[2]/span[1]/span[1]/input',
        '//*[@id="root"]/div/div[2]/div[2]/form/div[2]/div[6]/div/div[2]/div/div/label[2]/span[1]/span[1]/input',
        '//*[@id="root"]/div/div[2]/div[2]/form/div[2]/div[7]/div/div[2]/div/div/label[2]/span[1]/span[1]/input',
        '//*[@id="root"]/div/div[2]/div[2]/form/div[2]/div[8]/div/div[2]/div/div/label[2]/span[1]/span[1]/input',
        '//*[@id="root"]/div/div[2]/div[2]/form/div[2]/div[9]/div/div[2]/div/div/label[2]/span[1]/span[1]/input',
        '//*[@id="root"]/div/div[2]/div[2]/form/div[2]/div[10]/div/div[2]/div/div/label[2]/span[1]/span[1]/input',
        '//*[@id="root"]/div/div[2]/div[2]/form/div[2]/div[11]/div/div[2]/div/div/label[2]/span[1]/span[1]/input',
        '//*[@id="root"]/div/div[2]/div[2]/form/div[2]/div[12]/div/div[2]/div/div/label[2]/span[1]/span[1]/input',
        '//*[@id="root"]/div/div[2]/div[2]/form/div[2]/div[13]/div/div[2]/div/div/label[2]/span[1]/span[1]/input'
    ]
    
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to Url
        await driver.get('https://saveonfoodspharmacy.medmeapp.com/schedule/');
        
        // click the appointment type button
        const apptType = await driver.wait(until.elementLocated(By.css('.jQzTcd')));
        apptType.click();

        // click continue button
        const button = await driver.wait(until.elementLocated(By.css('.gpcJkH')));
        button.click();

        // Allow list to fully load
        await driver.sleep(12000)
        
        // find all locations distance div
        const findLocations = await driver.wait(until.elementsLocated(By.css('.dOPlou')));

        // pick location based on index
        const selectedLocation = findLocations[idx];

        // parse distance
        const distance = await selectedLocation.getText();

        // if distance is below 30km click
        if (parseInt(distance.substring(0, distance.indexOf('.'))) < 30) {
            await selectedLocation.click();
        } else { driver.quit(); }

        // click continue for location
        const locationContinue = await driver.wait(until.elementLocated(By.css('.xTktv')));
        await locationContinue.click();

        // Enter form data from formInfo object
        await driver.wait(until.elementLocated(By.name('firstName'))).sendKeys(formInfo.firstName);
        await driver.wait(until.elementLocated(By.name('lastName'))).sendKeys(formInfo.lastName);
        await driver.wait(until.elementLocated(By.name('birthDate'))).sendKeys(formInfo.birthDate);
        await driver.wait(until.elementLocated(By.name('address.postalCode'))).sendKeys(formInfo.address.postalCode);
        await driver.wait(until.elementLocated(By.name('email'))).sendKeys(formInfo.email);
        await driver.wait(until.elementLocated(By.name('phone.cell'))).sendKeys(formInfo.phone.cell);

        // Select no on all radio buttons
        for (let i = 0; i < radioXpaths.length; i++) {
            await (await driver.wait(until.elementLocated(By.xpath(radioXpaths[i])))).click();
        }
        
        // Click continue after entering formInfo
        await (await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/div[2]/form/div[3]/button[2]')))).click();

        // Select all checkboxes and radio buttons
        const checkBoxes = await driver.wait(until.elementsLocated(By.css('.jss8')));
        
        // Check both boxes and select first radio button
        for (let i = 0; i < 3; i++) {
            await checkBoxes[i].click();
        }

        // Click 'Continue'
        await (await driver.wait(until.elementLocated(By.css('.gopAdt')))).click();

        // Select the 'I have reviewed' checkbox
        await (await driver.wait(until.elementLocated(By.css('.jss8')))).click();

        // Click 'Submit' button
        await (await driver.wait(until.elementLocated(By.css('.gopAdt')))).click();
        driver.sleep(3000);

        // Refresh the page to restart the singup process
        (await driver).navigate().refresh();

        // Wait for the alert to be displayed
        await driver.wait(until.alertIsPresent());

        // Store the alert in a variable
        let alert = await driver.switchTo().alert();

        //Press the Accept button
        await alert.accept();
    }
    finally{
        // driver.quit();
    }
};

async function loopSignup() {
    console.log('Starting the signup process....')
    let success = 0;
    let failure = 0;
    for (let i = 0; i < 22; i++) {
        try {
            await signup(i);
            console.log('Signup ',i);
            success++
        }
        catch (e) {
            console.log(`round ${i}`);
            console.log(e);
            failure++;
        }
    }
    console.log(`Signup finished`)
    console.log(`Successful: ${success}`)
    console.log(`Failed: ${failure}`)
};  

loopSignup();