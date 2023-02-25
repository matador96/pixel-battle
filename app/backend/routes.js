const testMethod = (req, res) => {
  try {
    return res.status(200).json({ status: 200, data: "opk" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const statRoutes = [{ path: "/api/v1/stats", type: "get", method: testMethod }];

const userRoutes = [{ path: "/api/v1/users", type: "get", method: testMethod }];

const pixelRoutes = [
  { path: "/api/v1/pixels", type: "get", method: testMethod },
];

module.exports = (route) => {
  [...statRoutes, ...userRoutes, ...pixelRoutes].map((currentRoute) =>
    route[currentRoute.type](currentRoute.path, currentRoute.method)
  );
};
