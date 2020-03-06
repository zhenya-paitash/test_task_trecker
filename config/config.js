if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()  // {PORT, SECRET, DB_NAME, DB_USER, DB_PASS}
}

let status = () => {
  console.log(`TASK TRECKER has been started HERE: http://localhost:3000`);
  console.log("=".repeat(75));
};



module.exports = {status};