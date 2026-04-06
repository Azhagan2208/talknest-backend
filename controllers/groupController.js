import Group from "../models/Group.js";

export const createGroup = async (req, res) => {
  const { name, members } = req.body;
  const group = await Group.create({
    name,
    members: [...members, req.user.id],
    admin: req.user.id,
  });
  res.json(group);
};

export const getUserGroups = async (req, res) => {
  const group = await Group.find({
    members: req.user.id,
  });
  res.json(groups);
};
