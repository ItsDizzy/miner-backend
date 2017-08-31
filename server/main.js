import { Meteor } from 'meteor/meteor';

import '../imports/server';

Meteor.startup(() => {
  const theOnlyUser = Meteor.users.find().fetch();
  if (!theOnlyUser.length) {
    Accounts.createUser({
      email: 'admin@admin.com',
      password: 'pass'
    });
  }
});
