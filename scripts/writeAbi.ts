const fs = require("fs/promises");

async function writeAbi() {
  try {
    const folders = await fs.readdir("./artifacts/contracts/");
    folders.forEach(async (folder: string) => {
      const [name] = folder.split(".");
      const file = `./artifacts/contracts/${name}.sol/${name}.json`;

      const rawData = await fs.readFile(file, "utf8");
      const { abi } = JSON.parse(rawData);
      const data = `export const ${name}Abi = ` + JSON.stringify(abi);
      await fs.writeFile(`./client/abis/${name}.abi.js`, data);
    });
  } catch (error) {
    console.error(error);
  }
}

export default writeAbi;