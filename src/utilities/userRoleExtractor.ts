const userRoleExtractor = (pathname: string) => {
  const roles = ["admin", "cashier", "manager", "staff"];

  const existRole = roles.find((role) => pathname.includes(role));

  return existRole as string;
};

export default userRoleExtractor;
