import { defineConfig } from "fumapress";
import { fumadocsMdx } from "fumapress/adapters/mdx";
import { defineI18n } from "fumadocs-core/i18n";
import { uiTranslations } from "fumadocs-ui/i18n";
import { fumapressTranslations } from "fumapress/i18n";
import { flexsearchPlugin } from "fumapress/plugins/flexsearch";
import { llmsPlugin } from "fumapress/plugins/llms.txt";
import { takumiPlugin } from "fumapress/plugins/takumi";
import { docs } from "./.source/server";

const i18n = defineI18n({
  languages: ["id", "en"],
  defaultLanguage: "en",
});

const translations = i18n
  .translations()
  .extend(uiTranslations())
  .extend(fumapressTranslations());

export default defineConfig({
  content: docs.toFumadocsSource(),
  site: {
    name: "Keynest",
  },
})
  .layouts({
    defaultProps: () => ({
      githubUrl: "https://github.com/prananda21/keynest",
    }),
  })
  .plugins(flexsearchPlugin(), llmsPlugin(), takumiPlugin())
  .adapters(fumadocsMdx());
