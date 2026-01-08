import app from "./app";
import { hello } from "receipts-shared";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(hello("Jacob"));
});
