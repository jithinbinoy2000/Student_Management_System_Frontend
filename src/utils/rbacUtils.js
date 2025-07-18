// export const can = (user, module, action) => {
//   console.log("util",user)
//   if (user.role === 'SuperAdmin') return true;
//   return user.permissions?.some(p => p.module === module && p.action === action);
// };

export const can = (user, module, action) => {
  console.log(user,module,action)
  if (!user) return false;
  if (user.role === 'SuperAdmin') return true;

  if (!user.permissions || !Array.isArray(user.permissions)) {
    console.warn('User permissions not found or invalid:', user.permissions);
    return false;
  }

  const match = user.permissions.some(p => {
    console.log(`Checking permission: ${p.module}:${p.action} vs ${module}:${action}`);
    return p.module === module && p.action === action;
  });

  console.log('Permission result:', match);
  return match;
};
