const getRecipientEmail = (users, user) => {
  return users.find((myUser) => myUser !== user?.email);
};

export default getRecipientEmail;
