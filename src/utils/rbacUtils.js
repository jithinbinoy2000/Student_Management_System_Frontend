

export const can = (user, module, action) => {
  if (!user) return false;
  if (user.role === 'SuperAdmin') return true;

  if (!user.permissions || !Array.isArray(user.permissions)) {
    console.warn('User permissions not found or invalid:', user.permissions);
    return false;
  }

  const match = user.permissions.some(p => {
  
    return p.module === module && p.action === action;
  });

 
  return match;
};
