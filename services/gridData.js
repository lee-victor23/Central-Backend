const express = require("express");
const router = express.Router();
const sequelize = require("../database/database"); // The instance from step 2

router.get("/api/query", async (req, res) => {
  const { modelName, skip, take, orderBy, filterParam } = req.query;

  // Ensure the model exists
  const model = sequelize.models[modelName];
  if (!model) {
    return res.status(404).send({ error: `Model '${modelName}' not found.` });
  }

  // Construct the dynamic query
  let queryOptions = {
    where: {},
    offset: skip ? parseInt(skip, 10) : undefined,
    limit: take ? parseInt(take, 10) : undefined,
    order: [],
  };

  // Add ordering
  if (orderBy) {
    // Assuming orderBy is in 'field,direction' format
    const [field, direction] = orderBy.split(",");
    queryOptions.order.push([field, direction]);
  }

  // Add filtering
  if (filterParam) {
    // Assuming filterParam is a JSON string, e.g., '{"name": "John"}'
    try {
      const filters = JSON.parse(filterParam);
      queryOptions.where = { ...filters };
    } catch (error) {
      return res.status(400).send({ error: "Invalid filterParam format." });
    }
  }

  // Execute the query
  try {
    const results = await model.findAll(queryOptions);
    return res.send(results);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
