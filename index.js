const express = require("express");
var bodyParser = require("body-parser");
const supabaseClient = require("@supabase/supabase-js");
const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

const supabaseUrl = "https://hdzwectanbumouvbmbrx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkendlY3RhbmJ1bW91dmJtYnJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0NDgwNTAsImV4cCI6MjAxNzAyNDA1MH0.hwYK8y3prCi0naKr2N0jF4c3RME1Uj_fRVzCmxyghTY";
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get("/", (req, res) => {
  res.sendFile("public/home.html", { root: __dirname });
});

app.get("/", async (req, res) => {
  console.log(`Getting Team`);

  const { data, error } = await supabase.from("Team").select();

  if (error) {
    console.log(error);
  } else if (data) {
    res.send(data);
  }
});

app.listen(port, () => {
  console.log("APP IS ALIVEEEEEE");
});
