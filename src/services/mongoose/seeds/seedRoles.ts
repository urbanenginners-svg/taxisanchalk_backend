import mongoose from 'mongoose';
import { roles } from './roles';
import { Role, RoleSchema } from '../schemas/role.schema';
import { Permission, PermissionSchema } from '../schemas/permission.schema';

const RoleModel = mongoose.model(Role.name, RoleSchema);
const PermissionModel = mongoose.model(Permission.name, PermissionSchema);

function normalizePermissionId(id: unknown): string {
  if (id == null) return '';
  if (typeof id === 'string') return id;
  if (id instanceof mongoose.Types.ObjectId) return id.toString();
  if (typeof id === 'object' && '_id' in id) {
    return normalizePermissionId((id as { _id: unknown })._id);
  }
  return String(id);
}

export async function up(): Promise<void> {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING);

  // Process all roles in parallel
  const rolePromises = roles.map(async (role) => {
    if (role.permissions === 'ALL') {
      const allPermissions = await PermissionModel.find({}).exec();
      const permissionIds = allPermissions.map((p) => p._id);
      const roleData = {
        name: role.name,
        slug: role.slug,
        description: role.description,
        permissions: permissionIds,
      };

      const existingRole = await RoleModel.findOne({ name: role.name });
      if (!existingRole) {
        await RoleModel.create(roleData);
        console.log(
          `Created role: ${role.name} with ${permissionIds.length} permissions`,
        );
      } else {
        await RoleModel.updateOne({ name: role.name }, roleData);
        console.log(
          `Updated role: ${role.name} with ${permissionIds.length} permissions`,
        );
      }
      return;
    }

    // Get permission IDs from permission slugs in parallel
    const permissionSlugs = role.permissions as string[];
    const permissionPromises = permissionSlugs.map(async (permissionSlug) => {
      const permission = await PermissionModel.findOne({
        slug: permissionSlug,
      });
      if (permission) {
        return permission._id;
      } else {
        console.warn(
          `Permission with slug '${permissionSlug}' not found for role '${role.name}'`,
        );
        return null;
      }
    });

    const permissionResults = await Promise.all(permissionPromises);
    const permissionIds = permissionResults.filter((id) => id !== null);

    // Prepare role data with permission IDs instead of slugs
    const roleData = {
      name: role.name,
      slug: role.slug,
      description: role.description,
      permissions: permissionIds,
    };

    const existingRole = await RoleModel.findOne({ name: role.name });
    if (!existingRole) {
      await RoleModel.create(roleData);
      console.log(
        `Created role: ${role.name} with ${permissionIds.length} permissions`,
      );
    } else {
      const existingPermissionIds = existingRole.permissions
        .map(normalizePermissionId)
        .filter(Boolean);
      const seedPermissionIds = permissionIds
        .map(normalizePermissionId)
        .filter(Boolean);
      const mergedPermissionIds = [
        ...new Set([...existingPermissionIds, ...seedPermissionIds]),
      ];

      const addedCount =
        mergedPermissionIds.length - existingPermissionIds.length;

      await RoleModel.updateOne(
        { name: role.name },
        {
          name: role.name,
          slug: role.slug,
          description: role.description,
          permissions: mergedPermissionIds,
        },
      );
      console.log(
        `Updated role: ${role.name} — added ${addedCount} seed permission(s), total ${mergedPermissionIds.length} permissions`,
      );
    }
  });

  await Promise.all(rolePromises);
}

export async function down(): Promise<void> {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
  await RoleModel.deleteMany({});
}
