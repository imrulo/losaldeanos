import Fuse from "fuse.js";
import type { SearchDocument } from "@/types/content";

export function createSearch(docs: SearchDocument[]) {
  return new Fuse(docs, {
    keys: ["title", "description"],
    threshold: 0.35,
    includeScore: true,
  });
}
