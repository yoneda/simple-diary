exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments("id");
      table.string("mail");
      table.string("pass");
      table.boolean("showCalendar");
      table.boolean("showDateEditor");
      table.integer("calendarStart");
      table.string("bio");
    })
    .createTable("notes", table => {
      table.increments("id");
      table.string("body");
      table.datetime("createdAt");
      table.datetime("updatedAt");
      table.integer("user");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users").dropTable("notes");
};
