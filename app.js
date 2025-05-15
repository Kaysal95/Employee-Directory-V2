import express from "express";
import router from "#api/post";
const app = express();
export default app;

import employees from "#db/employees";

//BODY PARSING MIDDLEWARE
app.use(express.json());

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", router)

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
app.route("/employees/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

app.route("/employees/:id").get((req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});



//CATCH ALL ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send("AN ERROR OCCURED" + err)
})
