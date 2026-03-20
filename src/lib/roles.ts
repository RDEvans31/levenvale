export const ROLES = {
  basic: 1,
  member: 2,
  free_member: 2,
  co_owner: 3,
  tester: 4,
  manager: 5,
  admin: 6,
  owner: 7,
};

export type UserRole = keyof typeof ROLES;

export function hasMinimumRole(userRole: UserRole, requiredRole: number) {
  return ROLES[userRole] >= requiredRole;
}
