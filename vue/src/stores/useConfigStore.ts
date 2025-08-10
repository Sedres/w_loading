import { defineStore } from "pinia";

// 🔹 Define tipos para tus JSONs (ajusta según la estructura real)
interface Config {
   [key: string]: any;
}
interface Language {
   [key: string]: any;
}
interface Music {
   [key: string]: any;
}
interface News {
   [key: string]: any;
}
interface Socials {
   [key: string]: any;
}
interface Team {
   [key: string]: any;
}
interface Updates {
   [key: string]: any;
}

interface ConfigState {
   config: Config | null;
   language: Language | null;
   music: Music | null;
   news: News | null;
   socials: Socials | null;
   team: Team | null;
   updates: Updates | null;
}

export const useConfigStore = defineStore("config", {
   state: (): ConfigState => ({
      config: null,
      language: null,
      music: null,
      news: null,
      socials: null,
      team: null,
      updates: null,
   }),

   getters: {
      allDataReady: (state): boolean => {
         return Object.values(state).every((value) => value !== null);
      },
   },

   actions: {
      async loadJson<T = any>(filename: string): Promise<T | null> {
         try {
            const res = await fetch(`/config/${filename}`);
            if (!res.ok) throw new Error(`Failed to load ${filename}`);
            return await res.json();
         } catch (err) {
            console.error(`Error loading ${filename}:`, err);
            return null;
         }
      },

      async loadAllConfigs(): Promise<void> {
         const files: Record<keyof ConfigState, string> = {
            config: "Config.json",
            language: "Language.json",
            music: "Music.json",
            news: "News.json",
            socials: "Socials.json",
            team: "Team.json",
            updates: "Updates.json",
         };

         await Promise.all(
            Object.entries(files).map(async ([key, filename]) => {
               const data = await this.loadJson(filename);
               this[key as keyof ConfigState] = data;
            })
         );
      },
   },
});
