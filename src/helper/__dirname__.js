import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(join(import.meta.url, "../"));
const dirnamePath = dirname(__filename);
export { dirnamePath };
