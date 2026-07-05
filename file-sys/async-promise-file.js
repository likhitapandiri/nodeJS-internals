
const fs = require("fs/promises");

async function main() {
  console.log("Before");

  try {
    const data = await fs.readFile("notes.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }


  try {
    const data = await fs.readFile("README.md", "utf8");
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }



  console.log("After");
}

main();