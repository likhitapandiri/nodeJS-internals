import http from "http";

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Alice" },
];

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost:3000");
  const pathname = url.pathname;

  // Tell the client we're returning JSON
  res.setHeader("Content-Type", "application/json");

  // ==========================
  // GET /users
  // ==========================
  if (req.method === "GET" && pathname === "/users") {
    res.statusCode = 200;
    return res.end(JSON.stringify(users));
  }

  // ==========================
  // GET /users/:id
  // ==========================
  if (req.method === "GET" && pathname.startsWith("/users/")) {
    const id = Number(pathname.split("/")[2]);

    const user = users.find((u) => u.id === id);

    if (!user) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ message: "User not found" }));
    }

    res.statusCode = 200;
    return res.end(JSON.stringify(user));
  }

  // ==========================
  // POST /users
  // ==========================
  if (req.method === "POST" && pathname === "/users") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        const newUser = {
          id: users.length + 1,
          name: data.name,
        };

        users.push(newUser);

        res.statusCode = 201;
        res.end(JSON.stringify(newUser));
      } catch {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: "Invalid JSON" }));
      }
    });

    return;
  }

  // ==========================
  // DELETE /users/:id
  // ==========================
  if (req.method === "DELETE" && pathname.startsWith("/users/")) {
    const id = Number(pathname.split("/")[2]);

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ message: "User not found" }));
    }

    users.splice(index, 1);

    res.statusCode = 204;
    return res.end();
  }

  // ==========================
  // Unknown Route
  // ==========================
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
