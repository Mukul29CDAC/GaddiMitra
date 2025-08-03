import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  decimal,
  pgEnum,
  boolean,
  integer,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (mandatory for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User roles enum
export const userRoleEnum = pgEnum('user_role', ['customer', 'dealer', 'service_center']);

// Request status enum
export const requestStatusEnum = pgEnum('request_status', ['pending', 'quoted', 'accepted', 'rejected', 'completed']);

// Transaction status enum
export const transactionStatusEnum = pgEnum('transaction_status', ['pending', 'completed', 'failed', 'cancelled']);

// Request type enum
export const requestTypeEnum = pgEnum('request_type', ['service', 'purchase']);

// Users table (mandatory for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: userRoleEnum("role").notNull().default('customer'),
  companyName: varchar("company_name"), // For dealers and service centers
  location: varchar("location"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Vehicles table
export const vehicles = pgTable("vehicles", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  ownerId: varchar("owner_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  brand: varchar("brand").notNull(),
  model: varchar("model").notNull(),
  variant: varchar("variant"),
  year: integer("year").notNull(),
  fuelType: varchar("fuel_type").notNull(),
  transmission: varchar("transmission").notNull(),
  bodyType: varchar("body_type").notNull(),
  seatingCapacity: integer("seating_capacity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }),
  registrationNumber: varchar("registration_number"),
  isActive: boolean("is_active").default(true),
  imageUrl: varchar("image_url"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Requests table (for both service and purchase requests)
export const requests = pgTable("requests", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  vehicleId: uuid("vehicle_id").references(() => vehicles.id, { onDelete: 'set null' }),
  type: requestTypeEnum("type").notNull(),
  status: requestStatusEnum("status").notNull().default('pending'),
  description: text("description").notNull(),
  budget: decimal("budget", { precision: 10, scale: 2 }),
  preferredDate: timestamp("preferred_date"),
  location: varchar("location"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Quotations table
export const quotations = pgTable("quotations", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  requestId: uuid("request_id").notNull().references(() => requests.id, { onDelete: 'cascade' }),
  providerId: varchar("provider_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  validUntil: timestamp("valid_until"),
  isAccepted: boolean("is_accepted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Transactions table
export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  providerId: varchar("provider_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  quotationId: uuid("quotation_id").references(() => quotations.id, { onDelete: 'set null' }),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: transactionStatusEnum("status").notNull().default('pending'),
  paymentMethod: varchar("payment_method"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Notifications table
export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  type: varchar("type").notNull(), // 'info', 'success', 'warning', 'error'
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  vehicles: many(vehicles),
  requests: many(requests),
  quotations: many(quotations, { relationName: "provider" }),
  transactions: many(transactions, { relationName: "customer" }),
  providerTransactions: many(transactions, { relationName: "provider" }),
  notifications: many(notifications),
}));

export const vehiclesRelations = relations(vehicles, ({ one, many }) => ({
  owner: one(users, {
    fields: [vehicles.ownerId],
    references: [users.id],
  }),
  requests: many(requests),
}));

export const requestsRelations = relations(requests, ({ one, many }) => ({
  customer: one(users, {
    fields: [requests.customerId],
    references: [users.id],
  }),
  vehicle: one(vehicles, {
    fields: [requests.vehicleId],
    references: [vehicles.id],
  }),
  quotations: many(quotations),
}));

export const quotationsRelations = relations(quotations, ({ one, many }) => ({
  request: one(requests, {
    fields: [quotations.requestId],
    references: [requests.id],
  }),
  provider: one(users, {
    fields: [quotations.providerId],
    references: [users.id],
  }),
  transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  customer: one(users, {
    fields: [transactions.customerId],
    references: [users.id],
    relationName: "customer",
  }),
  provider: one(users, {
    fields: [transactions.providerId],
    references: [users.id],
    relationName: "provider",
  }),
  quotation: one(quotations, {
    fields: [transactions.quotationId],
    references: [quotations.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRequestSchema = createInsertSchema(requests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertQuotationSchema = createInsertSchema(quotations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});