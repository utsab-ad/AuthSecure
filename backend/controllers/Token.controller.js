import jwt from "jsonwebtoken";

export const CreateToken = (user, maxAge) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: maxAge }
  );
};

export const CreateTokenHireme = (newRequest, maxAge) => {
  return jwt.sign(
    {
      _id: newRequest._id,
      companyName: newRequest.companyName,
      address: newRequest.address,
      email: newRequest.email,
      category: newRequest.category,
      contact: newRequest.contact,
      noOfEmployees: newRequest.noOfEmployees,
      description: newRequest.description,
      source: newRequest.source,
    },
    process.env.JWT_SECRET,
    { expiresIn: maxAge }
  );
};
