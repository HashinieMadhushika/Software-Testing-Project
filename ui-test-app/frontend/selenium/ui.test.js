const { Builder, By, until } = require("selenium-webdriver");

(async function runUITests() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // ✅ Test 1: Admin Signup
    await driver.get("http://localhost:3000/signup");
    await driver.findElement(By.css("[data-testid='username']")).sendKeys("admin123");
    await driver.findElement(By.css("[data-testid='password']")).sendKeys("password123");
    await driver.findElement(By.css("[data-testid='signup-btn']")).click();

    let signupMsg = await driver.wait(
      until.elementLocated(By.css("[data-testid='signup-msg']")),
      2000
    );
    console.log("Signup Test Result:", await signupMsg.getText());

    // ✅ Test 2a: Task Creation with valid date
    await driver.get("http://localhost:3000/task");
    await driver.findElement(By.css("[data-testid='task-name']")).sendKeys("My First Task");

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let validDate = tomorrow.toISOString().split("T")[0];
    await driver.findElement(By.css("[data-testid='due-date']")).sendKeys(validDate);

    await driver.findElement(By.css("[data-testid='task-btn']")).click();
    let taskSuccessMsg = await driver.wait(
      until.elementLocated(By.css("[data-testid='task-msg']")),
      2000
    );
    console.log("Task Creation (Valid) Result:", await taskSuccessMsg.getText());

    // ✅ Test 2b: Task Creation with past date
    await driver.get("http://localhost:3000/task");
    await driver.findElement(By.css("[data-testid='task-name']")).sendKeys("Old Task");

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let pastDate = yesterday.toISOString().split("T")[0];
    await driver.findElement(By.css("[data-testid='due-date']")).sendKeys(pastDate);

    await driver.findElement(By.css("[data-testid='task-btn']")).click();
    let taskErrorMsg = await driver.wait(
      until.elementLocated(By.css("[data-testid='task-msg']")),
      2000
    );
    console.log("Task Creation (Invalid Past Date) Result:", await taskErrorMsg.getText());

  } finally {
    await driver.quit();
  }
})();
