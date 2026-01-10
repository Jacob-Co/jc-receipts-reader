import app from "./app";
import {initializeDb, initializeDefaultCategories} from "./model/init"

const PORT = process.env.PORT || 3001;


(async () => {
    initializeDb();
    await initializeDefaultCategories();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
})();

