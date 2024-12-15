

import { uploadResource } from "../controllers/resource.js";
router.post("/upload", upload.single("resource"), uploadResource);

