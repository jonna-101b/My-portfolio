import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import Admin from "../Models/admin.js";
import BlogModel from "../Models/blogs.js";
import ActivitiesModel from "../Models/activities.js";
import NotificationsModel from "../Models/notifications.js";
import ProfileModel from "../Models/profile.js";
import ProjectModel from "../Models/projects.js";
import QualificationsModel from "../Models/qualifications.js";
import { ConceptualSkillsModel, TechnicalSkillsModel } from "../Models/skills.js";
import TestimonialsModel from "../Models/testimonials.js";

import activities from "../../../client/src/Mock/trialActivities.js";
import blogs from "../../../client/src/Mock/trialBlogs.js";
import conceptualSkills from "../../../client/src/Mock/trialConceptualSkills.js";
import notifications from "../../../client/src/Mock/trialNotifications.js";
import profile from "../../../client/src/Mock/trialProfile.js";
import projects from "../../../client/src/Mock/trialProjects.js";
import qualifications from "../../../client/src/Mock/trialQualifications.js";
import technicalSkills from "../../../client/src/Mock/trialTechnicalSkills.js";
import testimonials from "../../../client/src/Mock/trialTestimonials.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const adminSeedEmail = (process.env.ADMIN_SEED_EMAIL || "admin@example.com").toLowerCase().trim();
const adminSeedPassword = process.env.ADMIN_SEED_PASSWORD || "Admin@12345!";

function buildProfileDocument(sourceProfile) {
  return {
    firstName: sourceProfile.firstName,
    lastName: sourceProfile.lastName,
    nickName: sourceProfile.nickName,
    gender: sourceProfile.gender,
    birthDate: new Date(sourceProfile.birthDate),
    profession: Array.isArray(sourceProfile.professions)
      ? sourceProfile.professions.join(" | ")
      : sourceProfile.profession,
    picture: sourceProfile.picture,
    bio: sourceProfile.bio,
    logo: sourceProfile.logo,
    description: {
      brief: sourceProfile.description.brief,
      detailed: sourceProfile.description.detailed,
    },
    phone: sourceProfile.phone,
    email: sourceProfile.email,
    address: sourceProfile.address,
    socialLinks: sourceProfile.socialLinks.map((link) => ({
      _id: link._id,
      name: link.name,
      icon: link.icon,
      url: link.url,
    })),
    resumeLink: sourceProfile.resumeLink,
  };
}

function buildProjectDocument(sourceProject) {
  return {
    title: sourceProject.title,
    domains: [...sourceProject.domains],
    description: {
      brief: sourceProject.description.brief,
      detailed: sourceProject.description.detailed,
    },
    image: sourceProject.image,
    features: Array.isArray(sourceProject.features) ? [...sourceProject.features] : [],
    techStack: sourceProject.techStack.map((tech) => ({
      _id: tech._id,
      name: tech.name,
      icon: tech.icon,
    })),
    projectLink: sourceProject.projectLink,
    githubLink: sourceProject.githubLink,
    contribution: sourceProject.contribution,
  };
}

function buildTechnicalSkillDocument(sourceCategory) {
  return {
    title: sourceCategory.title,
    techStack: sourceCategory.techStack.map((tech) => ({
      _id: tech._id,
      name: tech.name,
      icon: tech.icon,
    })),
  };
}

function buildConceptualSkillDocument(sourceSkill) {
  return {
    title: sourceSkill.title,
    description: sourceSkill.description,
    icon: sourceSkill.icon,
  };
}

function buildQualificationDocument(sourceQualification) {
  return {
    discipline: sourceQualification.discipline,
    organization: sourceQualification.organization,
    description: sourceQualification.description,
    duration: {
      from: new Date(sourceQualification.duration.from),
      to: new Date(sourceQualification.duration.to),
    },
    active: Boolean(sourceQualification.active),
    type: sourceQualification.type,
  };
}

function buildTestimonialDocument(sourceTestimonial) {
  return {
    name: sourceTestimonial.name,
    position: sourceTestimonial.position,
    picture: sourceTestimonial.picture,
    testimony: sourceTestimonial.testimony,
    company: sourceTestimonial.company,
    email: sourceTestimonial.email,
  };
}

function buildBlogDocument(sourceBlog) {
  return {
    author: sourceBlog.author,
    title: sourceBlog.title,
    intro: sourceBlog.intro,
    description: sourceBlog.description,
    datePublished: sourceBlog.createdAt ? new Date(sourceBlog.createdAt) : undefined,
    tags: Array.isArray(sourceBlog.tags) ? [...sourceBlog.tags] : [],
    image: sourceBlog.image,
    links: sourceBlog.links.map((link) => ({
      _id: link._id,
      title: link.title,
      url: link.url,
    })),
  };
}

function buildActivityDocument(sourceActivity) {
  return {
    action: sourceActivity.action,
    destination: sourceActivity.destination,
    title: sourceActivity.title,
    date: new Date(sourceActivity.date),
  };
}

function buildNotificationDocument(sourceNotification) {
  return {
    name: sourceNotification.name,
    email: sourceNotification.email,
    subject: sourceNotification.subject,
    message: sourceNotification.message,
    date: new Date(sourceNotification.date),
  };
}

async function upsertDocument({ model, filter, document }) {
  const result = await model.updateOne(
    filter,
    { $set: document },
    { upsert: true, runValidators: true }
  );

  if (result.upsertedCount > 0) {
    return "created";
  }

  if (result.modifiedCount > 0) {
    return "updated";
  }

  return "unchanged";
}

async function seedCollection(label, model, items, buildDocument, filterForItem) {
  const summary = { label, created: 0, updated: 0, unchanged: 0 };

  for (const item of items) {
    const document = buildDocument(item);
    const filter = filterForItem(item);
    const result = await upsertDocument({ model, filter, document });
    summary[result] += 1;
  }

  return summary;
}

async function seedProfile() {
  const document = buildProfileDocument(profile);
  const result = await upsertDocument({
    model: ProfileModel,
    filter: {},
    document,
  });

  return { label: "profile", created: result === "created" ? 1 : 0, updated: result === "updated" ? 1 : 0, unchanged: result === "unchanged" ? 1 : 0 };
}

async function main() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing from Server/.env");
  }

  await mongoose.connect(mongoUri);

  const summary = [];

  summary.push(await seedAdminAdmin());
  summary.push(await seedProfile());
  summary.push(
    await seedCollection("projects", ProjectModel, projects, buildProjectDocument, (item) => ({ _id: item._id }))
  );
  summary.push(
    await seedCollection(
      "technical skills",
      TechnicalSkillsModel,
      technicalSkills,
      buildTechnicalSkillDocument,
      (item) => ({ _id: item._id })
    )
  );
  summary.push(
    await seedCollection(
      "conceptual skills",
      ConceptualSkillsModel,
      conceptualSkills,
      buildConceptualSkillDocument,
      (item) => ({ _id: item._id })
    )
  );
  summary.push(
    await seedCollection(
      "qualifications",
      QualificationsModel,
      qualifications,
      buildQualificationDocument,
      (item) => ({ _id: item._id })
    )
  );
  summary.push(
    await seedCollection(
      "testimonials",
      TestimonialsModel,
      testimonials,
      buildTestimonialDocument,
      (item) => ({ email: item.email })
    )
  );
  summary.push(
    await seedCollection("blogs", BlogModel, blogs, buildBlogDocument, (item) => ({ _id: item._id }))
  );
  summary.push(
    await seedCollection("activities", ActivitiesModel, activities, buildActivityDocument, (item) => ({ _id: item._id }))
  );
  summary.push(
    await seedCollection(
      "notifications",
      NotificationsModel,
      notifications,
      buildNotificationDocument,
      (item) => ({ _id: item._id })
    )
  );

  console.log("Seeding complete.");
  console.table(summary);
}

main()
  .catch((error) => {
    console.error("Seeder failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });