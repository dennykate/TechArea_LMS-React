const checkPermission = (id: string) => {
  const userInfo = window.activeUser;

  if (userInfo.role_id == "3") return true;

  if (id == userInfo.id) return true;
  else return false;
};

export default checkPermission;
