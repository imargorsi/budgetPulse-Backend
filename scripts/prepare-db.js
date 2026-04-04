#!/usr/bin/env node

require("dotenv").config();

const bcrypt = require("bcrypt");
const { db } = require("../models");

async function cleanupDuplicateUsersByEmail() {
  const queryInterface = db.sequelize.getQueryInterface();
  const tableNamesRaw = await queryInterface.showAllTables();
  const tableNames = tableNamesRaw.map((table) => {
    if (typeof table === "string") {
      return table;
    }
    return table.tableName;
  });

  if (!tableNames.includes("Users")) {
    return;
  }

  await db.sequelize.query(`
    DELETE FROM Users
    WHERE rowid NOT IN (
      SELECT MIN(rowid)
      FROM Users
      WHERE email IS NOT NULL
      GROUP BY email
    )
    AND email IS NOT NULL;
  `);
}

async function prepareFundsUserMigration() {
  const queryInterface = db.sequelize.getQueryInterface();

  const tableNamesRaw = await queryInterface.showAllTables();
  const tableNames = tableNamesRaw.map((table) => {
    if (typeof table === "string") {
      return table;
    }
    return table.tableName;
  });

  if (!tableNames.includes("Funds")) {
    return;
  }

  await db.User.sync();

  const fundsDefinition = await queryInterface.describeTable("Funds");
  if (!fundsDefinition.userId) {
    await queryInterface.addColumn("Funds", "userId", {
      type: db.sequelize.Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  }

  let fallbackUser = await db.User.findOne({ where: { email: "legacy@budgetpulse.local" } });
  if (!fallbackUser) {
    const legacyPasswordHash = await bcrypt.hash("legacy-migrated-account", 10);
    fallbackUser = await db.User.create({
      name: "Legacy User",
      email: "legacy@budgetpulse.local",
      password: legacyPasswordHash,
    });
  }

  await queryInterface.bulkUpdate("Funds", { userId: fallbackUser.id }, { userId: null });
}

async function main() {
  try {
    await cleanupDuplicateUsersByEmail();
    await prepareFundsUserMigration();
    await db.sequelize.sync({ alter: true });

    console.log("Database preparation completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Database preparation failed:", error);
    process.exit(1);
  }
}

main();
