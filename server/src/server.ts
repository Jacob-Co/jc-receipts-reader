import app from "./app";
import {initializeDb, initializeDefaultCategories, initializeTestTag} from "./model/init"

const PORT = process.env.PORT || 3001;


(async () => {
    initializeDb();
    await initializeDefaultCategories();
    await initializeTestTag();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
})();

