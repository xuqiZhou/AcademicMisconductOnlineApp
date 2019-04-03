var seed = function(User) {
  User.find(function(err, user) {
    if (user.length) return;

    var admin = new User({
      email: "administrator",
      password: "2ac9cb7dc02b3c0083eb70898e549b63",
      type: "admin"
    }).save();
  });
};
//
module.exports.seed = seed;
