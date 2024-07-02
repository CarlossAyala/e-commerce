/* eslint-disable no-undef */
import fs from "node:fs/promises";
import path from "node:path";
import { themes, generateTheme } from "./utils.js";

const STYLESHEET_PATH = path.join(process.cwd(), "src", "styles");
console.log("STYLESHEET_PATH", STYLESHEET_PATH);

const buildThemes = async () => {
  const themesTemplate = themes.map((theme) => generateTheme(theme)).join("\n");

  const filePath = path.join(STYLESHEET_PATH, "themes.css");

  await fs.unlink(filePath).catch(() => null);
  await fs.writeFile(filePath, themesTemplate, "utf8");
};

const run = async () => {
  try {
    console.log("Setting up the project...");
    await buildThemes();
    console.log("✅ Done!");
  } catch (error) {
    console.error("Script failed with error:", error);
    process.exit(1);
  }
};

run();
